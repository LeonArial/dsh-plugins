/** 蓝宝名称：显示在侧栏品牌行的标志右侧。 */
import { BrandWordmark } from '@deepseek-ai/dsh-client-ui-primitives'
import { BRAND_NAME } from './brand.ts'

/** 官方字标不含鲸鱼标志时的画布宽度，以及其中 HARNESS 徽标的宽度；数值对应 24 像素高度时的像素值。 */
const WORDMARK_WIDTH = 156
const BADGE_WIDTH = 52

/**
 * 品牌名称，后跟官方字标里的 HARNESS 徽标。
 * 官方组件只能整幅输出（DEEPSEEK 字样加徽标），所以徽标放在一个固定宽度的容器里整体左移，
 * 只露出最右侧的那一段；图形和配色因此始终跟随当前安装的版本，不需要把图形数据复制进来。
 * 名称的字号、字重和颜色沿用宿主品牌行的样式，这里只负责文字本身。
 * @returns 名称与徽标两个并排的元素。
 */
export function LanbaoBrandName() {
  return (
    <>
      <span style={{ whiteSpace: 'nowrap' }}>{BRAND_NAME}</span>
      <span
        aria-hidden="true"
        style={{ display: 'inline-block', flex: 'none', width: BADGE_WIDTH, height: 24, overflow: 'hidden' }}
      >
        <span style={{ display: 'flex', width: WORDMARK_WIDTH, marginLeft: BADGE_WIDTH - WORDMARK_WIDTH }}>
          <BrandWordmark includeMark={false} />
        </span>
      </span>
    </>
  )
}
