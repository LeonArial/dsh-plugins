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
 * 标志用蒙版绘制：图片只提供轮廓，颜色取蓝宝深蓝。
 * 直接在插件里固定为较深的品牌蓝，不依赖主题插件是否启用，也不随文字色变化。
 */
function markStyle(size: number, color: string): CSSProperties {
  return {
    width: size,
    height: size,
    flex: 'none',
    backgroundColor: color,
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
/** 头部浅蓝与身体深蓝。 */
const HEAD_COLOR = '#24C0EB'
const BODY_COLOR = '#0056B3'

/** 身体在 logo 高度中的起始比例，用于把头与身子分开着色。 */
const BODY_TOP = 60

/** 头部层保留上部，身体层保留下部，两层互补裁剪、共用同一轮廓。 */
const HEAD_CLIP = `inset(0 0 ${100 - BODY_TOP}% 0)`
const BODY_CLIP = `inset(${BODY_TOP}% 0 0 0)`

/**
 * 黑色眼睛：原图里眼睛是面罩内的两个竖长圆角条，
 * 单独覆盖一层纯黑，避免随头部一起被染成蓝色。
 */
function Eyes() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <rect x="49.2" y="32.8" width="5.9" height="16" rx="2.95" fill="#000000" />
      <rect x="63.7" y="32.8" width="5.9" height="16" rx="2.95" fill="#000000" />
    </svg>
  )
}

/**
 * 侧栏品牌标志，展开的品牌行和折叠后的窄栏共用。
 * @param props - 宿主给出的正方形边长。
 * @returns 显示标志的元素。
 */
export function LanbaoBrandMark({ size }: SidebarBrandMarkOwnerProps) {
  return (
    <span aria-hidden="true" style={{ position: 'relative', display: 'inline-block', width: size, height: size }}>
      <span style={{ ...markStyle(size, HEAD_COLOR), position: 'absolute', inset: 0, clipPath: HEAD_CLIP, WebkitClipPath: HEAD_CLIP }} />
      <span style={{ ...markStyle(size, BODY_COLOR), position: 'absolute', inset: 0, clipPath: BODY_CLIP, WebkitClipPath: BODY_CLIP }} />
      <Eyes />
    </span>
  )
}

/**
 * 欢迎页标题左侧的标志。沿用宿主传入的类名，保持该位置原有的颜色和排版。
 * @param props - 宿主给出的边长和定位类名。
 * @returns 显示标志的元素。
 */
export function LanbaoHeroMark({ size, className }: HeroBrandMarkOwnerProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      data-lanbao-hero-mark=""
      style={{ position: 'relative', display: 'inline-block', width: size, height: size }}
    >
      <span style={{ ...markStyle(size, HEAD_COLOR), position: 'absolute', inset: 0, clipPath: HEAD_CLIP, WebkitClipPath: HEAD_CLIP }} />
      <span style={{ ...markStyle(size, BODY_COLOR), position: 'absolute', inset: 0, clipPath: BODY_CLIP, WebkitClipPath: BODY_CLIP }} />
      <Eyes />
    </span>
  )
}
