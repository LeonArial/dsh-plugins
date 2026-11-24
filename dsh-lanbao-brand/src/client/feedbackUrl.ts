/**
 * 账号菜单“意见反馈”的跳转地址。
 * 上游把问卷地址放在插件配置 contactFormUrl 里，但 profile 的配置补丁会整段替换该行的配置，
 * 在 bundle 层设置的值会被用户 profile 的补丁覆盖，所以改为在打开时替换目标地址：
 * 只改写指向官方问卷域名的请求，其他链接原样放行。
 */

/** 官方问卷地址的域名。 */
const OFFICIAL_FORM_HOST = 'trtgsjkv6r.feishu.cn'

/** 企业自己的反馈表单地址。 */
export const FEEDBACK_FORM_URL = 'https://ecnpiyytkpgg.feishu.cn/share/base/form/shrcnSumQ47bWOxs8nwCn8r76Eb'

/**
 * 开始接管问卷跳转。
 * @returns 停止接管并还原 window.open 的函数。
 */
export function installFeedbackRedirect(): () => void {
  const original = window.open
  window.open = function patchedOpen(
    url?: string | URL,
    target?: string,
    features?: string,
  ): Window | null {
    let destination = url
    if (typeof url === 'string') {
      try {
        if (new URL(url, location.href).hostname === OFFICIAL_FORM_HOST) destination = FEEDBACK_FORM_URL
      } catch {
        // 无法解析的地址不是问卷，原样传递。
      }
    }
    return original.call(window, destination, target, features)
  } as typeof window.open
  return () => { window.open = original }
}