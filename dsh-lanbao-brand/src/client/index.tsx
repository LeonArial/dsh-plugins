/**
 * 蓝宝品牌的浏览器半边。
 * 官方品牌包被 cordis.patch.yml 停用后，由这里占用它让出的品牌位置。
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { LanbaoBrandMark, LanbaoHeroMark } from './BrandMark.tsx'
import { LanbaoBrandName } from './BrandName.tsx'
import { installDocumentTitle } from './documentTitle.ts'
import { installFeedbackRedirect } from './feedbackUrl.ts'
import { installHeroCopy } from './heroCopy.ts'

/** 必需服务：界面插槽注册表。 */
export const inject = ['slots']

/**
 * 注册蓝宝的品牌标志与名称。
 * @param ctx - 浏览器侧的插件上下文。
 */
export function apply(ctx: ClientContext): void {
  ctx.slots.inject('sidebar.brand.mark', () =>
    ctx.slots.inject('sidebar.brand.name', function* () {
      yield ctx.slots.register({ name: 'sidebar.brand.mark' }, LanbaoBrandMark)
      yield ctx.slots.register({ name: 'sidebar.brand.name' }, LanbaoBrandName)
    }))
  ctx.slots.inject('conversation.hero.brand.mark', () =>
    ctx.slots.register({ name: 'conversation.hero.brand.mark' }, LanbaoHeroMark))
  // 首次启动引导：宿主一次只挂载顺序最靠前、本次会话未完成的步骤，由该步骤自己决定何时完成。
  // 这里占住最靠前的位置并始终渲染空内容，内置的预览版说明和登录引导就不会自动弹出；
  // 用户从账号菜单主动登录、或显式请求某个引导步骤时，走的是各自独立的入口，不受影响。
  ctx.slots.inject('settings.onboarding', () =>
    ctx.slots.register({ name: 'settings.onboarding', id: 'lanbao-skip-onboarding', order: -1000 }, () => null))
  ctx.effect(() => installDocumentTitle())
  ctx.effect(() => installFeedbackRedirect())
  ctx.effect(() => installHeroCopy())
}
