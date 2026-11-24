/**
 * 窗口与标签页标题里的产品名。
 * 标题由上游的 DocumentTitle 组件写入，没有对应的插槽，所以这里观察 head 的变化，
 * 在它每次写入之后把其中的上游产品名换成蓝宝。
 */
import { BRAND_NAME } from './brand.ts'

/** 官方构建里写进界面的产品名。 */
const UPSTREAM_PRODUCT_TITLE = 'DeepSeek Harness'

/** 最近一次被改写的标题，以及它改写前的原文，卸载时用来精确还原。 */
let rewritten: string | undefined
let original: string | undefined

/** 标题里出现上游产品名时才改写；没有出现时保持原样，因此不会和上游互相触发。 */
function rewriteDocumentTitle(): void {
  const title = document.title
  if (!title.includes(UPSTREAM_PRODUCT_TITLE)) return
  rewritten = title.replaceAll(UPSTREAM_PRODUCT_TITLE, BRAND_NAME)
  original = title
  document.title = rewritten
}

/**
 * 开始接管文档标题中的产品名。
 * @returns 停止接管的函数；标题此后仍被上游改写时，只在内容未被别处变动的前提下还原。
 */
export function installDocumentTitle(): () => void {
  const observer = new MutationObserver(rewriteDocumentTitle)
  observer.observe(document.head, { childList: true, subtree: true, characterData: true })
  rewriteDocumentTitle()
  return () => {
    observer.disconnect()
    if (rewritten !== undefined && original !== undefined && document.title === rewritten) {
      document.title = original
    }
    rewritten = original = undefined
  }
}
