/** 蓝宝标志：侧栏品牌行和欢迎页标题共用的同一份图形。 */
import type { CSSProperties } from 'react'
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'

/** 构建时注入：标志图片在插件资源路由上的引用，指向 lib/assets 下带内容哈希的文件。 */
declare const __BRAND_MARK_ASSET__: string
/** 页面模块加载器传入的同步 require；asset() 把资源路由的引用解析成当前文档可用的地址。 */
declare const require: { asset(path: string): string }

const markImage = `url("${require.asset(__BRAND_MARK_ASSET__)}")`

/**
 * 标志用蒙版绘制：图片只提供轮廓，颜色取 currentColor。
 * 这样同一个文件在深色主题下是浅色标志、浅色主题下是深色标志，跟随宿主位置的文字色。
 */
function markStyle(size: number): CSSProperties {
  return {
    width: size,
    height: size,
    flex: 'none',
    backgroundColor: 'currentColor',
    WebkitMaskImage: markImage,
    maskImage: markImage,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  }
}

/**
 * 侧栏品牌标志，展开的品牌行和折叠后的窄栏共用。
 * @param props - 宿主给出的正方形边长。
 * @returns 显示标志的元素。
 */
export function LanbaoBrandMark({ size }: SidebarBrandMarkOwnerProps) {
  return <span aria-hidden="true" style={{ ...markStyle(size), display: 'inline-block' }} />
}

/**
 * 欢迎页标题左侧的标志。沿用宿主传入的类名，保持该位置原有的颜色和排版。
 * @param props - 宿主给出的边长和定位类名。
 * @returns 显示标志的元素。
 */
export function LanbaoHeroMark({ size, className }: HeroBrandMarkOwnerProps) {
  return <span aria-hidden="true" className={className} data-lanbao-hero-mark="" style={markStyle(size)} />
}
