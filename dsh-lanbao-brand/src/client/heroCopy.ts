/**
 * 欢迎页标题与预览徽标。
 * 上游把这两段文字直接渲染在组件里：既没有对应的插槽，也无法用语言包覆盖（同名命名空间重复注册会抛错），
 * 所以按结构定位后直接改写 DOM。定位锚点是插件自己渲染的标志，不依赖上游可能变化的类名。
 */
import { HERO_HEADLINE } from './brand.ts'

/** 插件在欢迎页标志上留下的定位标记。 */
const HERO_MARK_SELECTOR = '[data-lanbao-hero-mark]'

/** 每个被改写的标题组在改写前的原样，卸载时用来还原。 */
const originals = new WeakMap<HTMLElement, { title: string; badgeDisplay: string }>()

/**
 * 从插件渲染的标志找到标题组。
 * 插槽渲染会在贡献项外再包一层 `display: contents` 的元素，所以先认回插槽容器，再向上找到同一行的标题组。
 * 标题组内依次是标题和预览徽标；结构不符时返回 undefined，宁可不动，也不误改其他文字。
 * @param mark - 欢迎页中由插件渲染的品牌标志。
 * @returns 包含标题与预览徽标的标题组。
 */
function findTitleGroup(mark: Element): HTMLElement | undefined {
  const slot = mark.closest('[data-slot="conversation.hero.brand.mark"]') ?? mark
  const group = slot.parentElement?.parentElement?.lastElementChild
  if (group instanceof HTMLElement && group.children.length === 2 && !group.contains(mark)) return group
  // 插槽容器所在的层级如果变化，逐层向上，找同级里恰好有两个子元素的标题组。
  for (let el: Element | null = slot.parentElement; el !== null && el !== document.body; el = el.parentElement) {
    for (const sibling of [el.nextElementSibling, el.previousElementSibling]) {
      if (sibling instanceof HTMLElement && sibling.children.length === 2 && !sibling.contains(mark)) return sibling
    }
  }
  return undefined
}

/** 改写标题文字并隐藏预览徽标；重复执行不会产生新的改写。 */
function applyHeroCopy(): void {
  for (const mark of document.querySelectorAll(HERO_MARK_SELECTOR)) {
    const group = findTitleGroup(mark)
    if (group === undefined) continue
    const [title, badge] = group.children
    if (!(title instanceof HTMLElement) || !(badge instanceof HTMLElement)) continue
    const saved = originals.get(group)
    if (saved === undefined) {
      originals.set(group, { title: title.textContent ?? '', badgeDisplay: badge.style.display })
    } else if (title.textContent !== HERO_HEADLINE) {
      // 上游重新渲染或切换语言后写回了原文，保留最初记录的原样并重新改写。
      saved.title = title.textContent ?? ''
    }
    if (title.textContent !== HERO_HEADLINE) title.textContent = HERO_HEADLINE
    if (badge.style.display !== 'none') badge.style.display = 'none'
  }
}

/**
 * 开始接管欢迎页标题与预览徽标。
 * 欢迎页重新出现或上游重新渲染后文字会被写回，观察器随即再次改写。
 * @returns 停止接管、把预览徽标恢复显示并还原标题的函数。
 */
export function installHeroCopy(): () => void {
  let scheduled = false
  const schedule = (): void => {
    if (scheduled) return
    scheduled = true
    queueMicrotask(() => {
      scheduled = false
      applyHeroCopy()
    })
  }
  const observer = new MutationObserver(schedule)
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })
  applyHeroCopy()
  return () => {
    observer.disconnect()
    for (const mark of document.querySelectorAll(HERO_MARK_SELECTOR)) {
      const group = findTitleGroup(mark)
      if (group === undefined) continue
      const saved = originals.get(group)
      if (saved === undefined) continue
      const [title, badge] = group.children
      if (title instanceof HTMLElement && title.textContent === HERO_HEADLINE) title.textContent = saved.title
      if (badge instanceof HTMLElement) badge.style.display = saved.badgeDisplay
      originals.delete(group)
    }
  }
}