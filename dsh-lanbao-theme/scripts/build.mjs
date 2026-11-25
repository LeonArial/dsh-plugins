// 构建脚本：产出 Loader 加载的 Node 半边，以及页面模块加载器加载的浏览器半边。
// 浏览器半边的封装格式照官方客户端包的产物：window.__ModuleLoader__.load({ id, factory })。
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const libDir = join(root, 'lib')
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
await rm(libDir, { recursive: true, force: true })
await mkdir(libDir, { recursive: true })

// 浏览器半边：不依赖 React 或页面基线模块，样式全部在插件里内联。
const client = await build({
  entryPoints: [join(root, 'src/client/index.ts')],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
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

for (const file of [indexFile, clientFile]) {
  console.log(`${file.slice(root.length + 1)}  ${(await readFile(file)).length} 字节`)
}