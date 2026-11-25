/**
 * 把界面上的 DeepSeek 品牌文案改写为蓝宝。
 *
 * 语言包对已注册的命名空间再次注册会抛错，官方也没有提供覆盖内置文案的接口，
 * 因此只能在渲染后对文本与无障碍属性做改写。改写会跳过对话正文、代码块与输入控件，
 * 避免影响用户内容和可能被复制、引用的文字。
 */

/** 替换规则，长词必须排在前面，避免 "DeepSeek Harness" 被先拆成 "蓝宝 Harness"。 */
const REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/DeepSeek\s+Harness/g, '蓝宝'],
  [/DeepSeek\s+Account/gi, '蓝宝账号'],
  [/DeepSeek\s*账号/g, '蓝宝账号'],
  [/DeepSeek/g, '蓝宝'],
]

/** 不进入的区域：用户内容、代码、输入控件。 */
const SKIP_SELECTOR = [
  'script',
  'style',
  'noscript',
  'code',
  'pre',
  'textarea',
  'input',
  '[contenteditable="true"]',
  '[data-slot="conversation.chat.flow"]',
  '[data-slot="conversation.composer"]',
].join(', ')

/** 需要改写的可见属性。 */
const ATTRIBUTES = ['placeholder', 'title', 'aria-label', 'alt'] as const

/** 已改写过的文本节点及原名，卸载时用来精确还原。 */
const textOriginals = new Map<Text, string>()
/** 已改写过的元素属性及原值，卸载时用来精确还原。 */
const attributeOriginals = new Map<Element, Map<string, string>>()

/**
 * 改写一段文本；没有命中时返回原值。
 * @param value - 待改写的文本。
 * @returns 改写后的文本。
 */
function rewriteText(value: string): string {
  let next = value
  for (const [pattern, replacement] of REPLACEMENTS) next = next.replace(pattern, replacement)
  return next
}

/**
 * 判断节点是否位于不参与改写的区域。
 * @param node - 待判断的节点。
 * @returns 是否应跳过。
 */
function isSkipped(node: Node): boolean {
  const element = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement
  return element !== null && element.closest(SKIP_SELECTOR) !== null
}

/**
 * 改写一个文本节点。
 * @param node - 文本节点。
 */
function rewriteTextNode(node: Text): void {
  if (isSkipped(node)) return
  const next = rewriteText(node.data)
  if (next === node.data) return
  if (!textOriginals.has(node)) textOriginals.set(node, node.data)
  node.data = next
}

/**
 * 改写一个元素上的可见属性。
 * @param element - 目标元素。
 */
function rewriteAttributes(element: Element): void {
  if (isSkipped(element)) return
  for (const name of ATTRIBUTES) {
    const value = element.getAttribute(name)
    if (value === null) continue
    const next = rewriteText(value)
    if (next === value) continue
    let saved = attributeOriginals.get(element)
    if (saved === undefined) {
      saved = new Map()
      attributeOriginals.set(element, saved)
    }
    if (!saved.has(name)) saved.set(name, value)
    element.setAttribute(name, next)
  }
}

/**
 * 处理一棵子树：元素的可见属性与其中的全部文本节点。
 * @param root - 子树的根节点。
 */
function rewriteTree(root: Node): void {
  if (root.nodeType === Node.TEXT_NODE) {
    rewriteTextNode(root as Text)
    return
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return
  if (isSkipped(root)) return
  const element = root as Element
  rewriteAttributes(element)
  for (const child of element.querySelectorAll('*')) rewriteAttributes(child)
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
    rewriteTextNode(node as Text)
  }
}

/**
 * 开始接管界面中的 DeepSeek 品牌文案。
 * 上游重新渲染或切换语言后文字会被写回，观察器随即再次改写。
 * @returns 停止接管、还原已改写文本与属性的函数。
 */
export function installBrandCopy(): () => void {
  let scheduled = false
  const pending = new Set<Node>()
  const flush = (): void => {
    scheduled = false
    for (const node of pending) rewriteTree(node)
    pending.clear()
  }
  const schedule = (node: Node): void => {
    pending.add(node)
    if (scheduled) return
    scheduled = true
    queueMicrotask(flush)
  }
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'attributes' || record.type === 'characterData') {
        schedule(record.target)
        continue
      }
      for (const node of record.addedNodes) schedule(node)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...ATTRIBUTES],
  })
  rewriteTree(document.body)
  return () => {
    observer.disconnect()
    for (const [node, original] of textOriginals) node.data = original
    for (const [element, attributes] of attributeOriginals) {
      for (const [name, value] of attributes) element.setAttribute(name, value)
    }
    textOriginals.clear()
    attributeOriginals.clear()
  }
}