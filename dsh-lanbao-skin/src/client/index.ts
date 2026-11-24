/**
 * 蓝宝界面皮肤的浏览器半边。
 * 只注入一份样式表，不改动上游组件的结构与行为。
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import { installSkin } from './skin.ts'

/** 本插件不依赖任何客户端服务。 */
export const inject: string[] = []

/**
 * 安装皮肤。
 * @param ctx - 浏览器侧的插件上下文。
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => installSkin())
}