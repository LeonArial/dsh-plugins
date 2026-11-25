/**
 * 蓝宝界面主题的浏览器半边。
 * 通过官方 theme 服务叠加 token，再注入一张只依赖稳定锚点的样式表。
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import { installStyles } from './styles.ts'
import { TOKENS } from './tokens.ts'

/** 必需服务：主题运行时。 */
export const inject = ['theme']

/**
 * 应用蓝宝主题。
 * @param ctx - 浏览器侧的插件上下文。
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.theme.overrideTokens('dsh-lanbao-theme', TOKENS))
  ctx.effect(() => installStyles())
}