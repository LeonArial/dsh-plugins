/**
 * 蓝宝眼睛的颜色：浅色主题黑色，深色主题白色。
 * 眼睛是 logo 上单独覆盖的一层 SVG，颜色需要跟随主题，所以用一小段样式表控制。
 */

/** 注入的样式表 id，卸载时按它移除。 */
const STYLE_ID = 'lanbao-eye-color'

const CSS = String.raw`
[data-lanbao-eye] {
  fill: #000000;
}

html body[data-ds-dark-theme] [data-lanbao-eye] {
  fill: #FFFFFF;
}
`

/**
 * 注入眼睛颜色样式；页面里已经有一份时不再重复插入。
 * @returns 移除注入样式的函数。
 */
export function installEyeStyles(): () => void {
  const existing = document.getElementById(STYLE_ID)
  if (existing !== null) return () => {}
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = CSS
  document.head.append(style)
  return () => { style.remove() }
}