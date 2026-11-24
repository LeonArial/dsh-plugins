// 构建脚本：产出 Loader 加载的 Node 半边，以及页面模块加载器加载的浏览器半边。
// 浏览器半边的封装格式照官方客户端包的产物：window.__ModuleLoader__.load({ id, factory })。
// 官方的 clientBundle 构建预设没有作为 npm 包发布，仓库外的包需要自己产出同样的格式。
import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const libDir = join(root, 'lib')
const assetsDir = join(libDir, 'assets')
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))

/**
 * 把标志图片复制到 lib/assets，文件名带上内容哈希（SHA-1 前 12 位），与官方构建的资源命名一致。
 * @param name - src/client/assets 下的图片文件名。
 * @returns 浏览器半边里传给 require.asset 的资源路由引用。
 */
async function emitAsset(name) {
  const bytes = await readFile(join(root, 'src/client/assets', name))
  const hash = createHash('sha1').update(bytes).digest('hex').slice(0, 12)
  const file = name.replace(/(\.[a-z]+)$/, ext => `-${hash}${ext}`)
  await mkdir(assetsDir, { recursive: true })
  for (const stale of await readdir(assetsDir)) await rm(join(assetsDir, stale), { recursive: true })
  await writeFile(join(assetsDir, file), bytes)
  return `plugins/${pkg.name}/assets/${file}`
}

const assetRef = await emitAsset('lanbao-mark.png')

// 浏览器半边：React 和官方共享基础组件等基线模块由页面提供，不打进包里，工厂执行时通过 require 获取。
const client = await build({
  entryPoints: [join(root, 'src/client/index.tsx')],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-ui-primitives'],
  define: { __BRAND_MARK_ASSET__: JSON.stringify(assetRef) },
  legalComments: 'none',
  logLevel: 'warning',
})
const clientFile = join(libDir, 'client.js')
await writeFile(clientFile, [
  `window.__ModuleLoader__.load({id:${JSON.stringify(pkg.name)},factory:require=>{`,
  'var module={exports:{}};var exports=module.exports;',
  client.outputFiles[0].text,
  'return module.exports}});',
  '',
].join('\n'))

// Node 半边：普通 ESM，Loader 直接导入。
const indexFile = join(libDir, 'index.js')
await build({
  entryPoints: [join(root, 'src/index.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  outfile: indexFile,
  logLevel: 'warning',
})

for (const file of [indexFile, clientFile, ...(await readdir(assetsDir)).map(name => join(assetsDir, name))]) {
  console.log(`${file.slice(root.length + 1)}  ${(await stat(file)).size} 字节`)
}
