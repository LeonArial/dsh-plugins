/** 蓝宝标志：侧栏品牌行和欢迎页标题共用的同一份图形。 */
import type { CSSProperties } from 'react'
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'

/** 构建时注入：标志图片在插件资源路由上的引用，指向 lib/assets 下带内容哈希的文件。 */
declare const __BRAND_MARK_ASSET__: string
/** 页面模块加载器传入的同步 require；asset() 把资源路由的引用解析成当前文档可用的地址。 */
declare const require: { asset(path: string): string }

const markImage = `url("${require.asset(__BRAND_MARK_ASSET__)}")`

/** 按桌面 logo 采样的配色：统一蓝主体、深色面罩、白眼睛、浅蓝脸颊高光。 */
const BODY_COLOR = '#029AE0'
const VISOR_COLOR = '#30314E'
const EYE_COLOR = '#FDFDFD'
const CHEEK_COLOR = '#96E9FA'

/**
 * 标志用蒙版绘制：图片只提供轮廓，主体填充统一蓝色。
 * 面罩、眼睛与脸颊高光由单独的 SVG 层按原图透明区域的坐标叠加。
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
 * 脸部层：深色面罩、左脸颊浅蓝高光、两只白眼睛。
 * 坐标来自原图透明/不透明区域的分析，按 100×100 的 viewBox 换算。
 */
function Face() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {/* 深色面罩 */}
      <rect x="31.2" y="27.3" width="50.4" height="27" rx="13.5" fill={VISOR_COLOR} />
      {/* 左脸颊浅蓝高光 */}
      <ellipse cx="18.2" cy="41.8" rx="3.7" ry="6.6" fill={CHEEK_COLOR} />
      {/* 白色眼睛 */}
      <rect x="49.2" y="32.8" width="5.9" height="16" rx="2.95" fill={EYE_COLOR} />
      <rect x="63.7" y="32.8" width="5.9" height="16" rx="2.95" fill={EYE_COLOR} />
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
      <span style={{ ...markStyle(size, BODY_COLOR), position: 'absolute', inset: 0 }} />
      <Face />
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
      <span style={{ ...markStyle(size, BODY_COLOR), position: 'absolute', inset: 0 }} />
      <Face />
    </span>
  )
}