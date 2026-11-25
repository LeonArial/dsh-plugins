/**
 * 蓝宝主题的 token 覆盖表。
 *
 * 通过 `ctx.theme.overrideTokens` 叠加在官方主题之上：按来源分层，卸载自动恢复，
 * 不需要 `!important`，并且强制浅色 / 深色成对，避免切换主题后不可读。
 *
 * 色彩语言借鉴 ChatGPT Codex 网页版：中性画布、靠亮度差与 1px 边框分层、
 * 低饱和语义色；品牌主色使用蓝宝蓝 #0071E3（深色主题用 #0A84FF 提高对比）。
 */

/** 一个 token 的浅色 / 深色取值。 */
export interface TokenPair {
  light: string
  dark: string
}

/** token 名 → 浅深取值。 */
export type TokenOverrides = Record<string, TokenPair>

export const TOKENS: TokenOverrides = {
  // ── 画布与表面 ────────────────────────────────────────────────
  '--dsw-alias-bg-base': { light: '#EEF4FB', dark: '#1E1E1E' },
  '--dsw-alias-bg-layer-1': { light: '#F7FAFE', dark: '#212121' },
  '--dsw-alias-bg-layer-2': { light: '#E6EEF8', dark: '#303030' },
  '--dsw-alias-bg-layer-3': { light: '#DCE7F3', dark: '#393939' },
  '--dsw-alias-bg-overlay': { light: 'rgba(20, 32, 46, 0.32)', dark: 'rgba(0, 0, 0, 0.55)' },

  // ── 文字 ──────────────────────────────────────────────────────
  '--dsw-alias-label-primary': { light: '#14202E', dark: '#FFFFFF' },
  '--dsw-alias-label-secondary': { light: '#51606F', dark: '#AFAFAF' },
  '--dsw-alias-label-tertiary': { light: '#7E8B99', dark: '#8F8F8F' },
  '--dsw-alias-label-caption': { light: '#7E8B99', dark: '#8F8F8F' },
  '--dsw-alias-label-dimmed': { light: '#A8B4C0', dark: '#6E6E6E' },
  '--dsw-alias-label-on-color': { light: '#FFFFFF', dark: '#FFFFFF' },
  '--dsw-alias-label-primary-foreground': { light: '#FFFFFF', dark: '#0D0D0D' },

  // ── 边框 ──────────────────────────────────────────────────────
  '--dsw-alias-border-l1': { light: '#DDE7F1', dark: '#353535' },
  '--dsw-alias-border-l2': { light: '#CFDCE9', dark: '#414141' },
  '--dsw-alias-border-l3': { light: '#C0D0E0', dark: '#4A4A4A' },
  '--dsw-alias-border-l4': { light: '#B2C4D6', dark: '#555555' },
  '--dsw-alias-border-selected': { light: '#0071E3', dark: '#0A84FF' },

  // ── 品牌 ──────────────────────────────────────────────────────
  '--dsw-alias-brand-primary': { light: '#0071E3', dark: '#0A84FF' },
  '--dsw-alias-brand-text': { light: '#0066CC', dark: '#409CFF' },
  '--dsw-alias-link': { light: '#0066CC', dark: '#409CFF' },
  '--dsw-alias-state-business-primary': { light: '#0071E3', dark: '#0A84FF' },

  // ── 按钮 ──────────────────────────────────────────────────────
  '--dsw-alias-button-primary-fill': { light: '#0071E3', dark: '#0A84FF' },
  '--dsw-alias-button-primary-hover': { light: '#0077ED', dark: '#3395FF' },
  '--dsw-alias-button-primary-dimmed': { light: 'rgba(0, 113, 227, 0.35)', dark: 'rgba(10, 132, 255, 0.40)' },
  '--dsw-alias-button-info-fill': { light: '#0071E3', dark: '#0A84FF' },
  '--dsw-alias-button-info-hover': { light: '#0077ED', dark: '#3395FF' },
  '--dsw-alias-button-floating-fill': { light: '#FBFDFF', dark: '#303030' },
  '--dsw-alias-button-floating-hover': { light: '#EAF2FA', dark: '#3A3A3A' },

  // ── 卡片与浮层 ────────────────────────────────────────────────
  '--dsw-alias-card-fill': { light: '#FBFDFF', dark: '#262626' },
  '--dsw-alias-card-fill-hover': { light: '#EAF2FA', dark: '#303030' },
  '--dsw-alias-settings-card-fill': { light: '#FBFDFF', dark: '#262626' },
  '--dsw-alias-settings-card-stroke': { light: '#DDE7F1', dark: '#3A3A3A' },
  '--dsw-alias-menu-group-header-fill': { light: '#EAF2FA', dark: '#2A2A2A' },
  '--dsw-alias-toast-bg': { light: '#14202E', dark: '#F8F8F8' },
  '--dsw-alias-toast-label': { light: '#FBFDFF', dark: '#0D0D0D' },
  '--dsw-alias-tooltip-bg': { light: '#14202E', dark: '#F8F8F8' },
  '--dsw-alias-tooltip-label': { light: '#FBFDFF', dark: '#0D0D0D' },

  // ── 状态 ──────────────────────────────────────────────────────
  '--dsw-alias-state-success-primary': { light: '#489F4D', dark: '#489F4D' },
  '--dsw-alias-state-success-secondary': { light: 'rgba(72, 159, 77, 0.14)', dark: 'rgba(72, 159, 77, 0.20)' },
  '--dsw-alias-state-warn-primary': { light: '#B25000', dark: '#D08700' },
  '--dsw-alias-state-warn-secondary': { light: 'rgba(178, 80, 0, 0.14)', dark: 'rgba(208, 135, 0, 0.20)' },
  '--dsw-alias-state-error-primary': { light: '#CF4035', dark: '#CF4035' },
  '--dsw-alias-state-error-secondary': { light: 'rgba(207, 64, 53, 0.14)', dark: 'rgba(207, 64, 53, 0.20)' },
  '--dsw-alias-state-done-primary': { light: '#489F4D', dark: '#489F4D' },
  '--dsw-alias-state-idle-primary': { light: '#8F8F8F', dark: '#8F8F8F' },

  // ── 代码与 diff ───────────────────────────────────────────────
  '--dsw-alias-markdown-code-block': { light: '#EAF2FA', dark: '#171717' },
  '--dsw-alias-markdown-inline-code': { light: '#E3ECF6', dark: '#2A2A2A' },
  '--dsw-alias-code-diff-added': { light: '#E6FFEC', dark: '#13221D' },
  '--dsw-alias-code-diff-deleted': { light: '#FFEBE9', dark: '#2C191D' },
  '--dsw-alias-file-diff-added-bg': { light: '#E6FFEC', dark: '#13221D' },
  '--dsw-alias-file-diff-added-gutter': { light: '#CCFFD8', dark: '#1A3C26' },
  '--dsw-alias-file-diff-added-marker': { light: '#2DA44E', dark: '#489F4D' },
  '--dsw-alias-file-diff-deleted-bg': { light: '#FFEBE9', dark: '#2C191D' },
  '--dsw-alias-file-diff-deleted-gutter': { light: '#FFD7D5', dark: '#782A2B' },
  '--dsw-alias-file-diff-deleted-marker': { light: '#CF4035', dark: '#CF4035' },

  // ── 滚动条 ────────────────────────────────────────────────────
  '--dsw-alias-scrollbar-bg-l1': { light: 'rgba(0, 0, 0, 0.18)', dark: 'rgba(255, 255, 255, 0.20)' },
  '--dsw-alias-scrollbar-hover-l1': { light: 'rgba(0, 0, 0, 0.32)', dark: 'rgba(255, 255, 255, 0.34)' },
  '--dsw-alias-scrollbar-bg-l2': { light: 'rgba(0, 0, 0, 0.14)', dark: 'rgba(255, 255, 255, 0.16)' },
  '--dsw-alias-scrollbar-hover-l2': { light: 'rgba(0, 0, 0, 0.26)', dark: 'rgba(255, 255, 255, 0.28)' },

  // ── 侧栏与专用表面 ────────────────────────────────────────────
  '--dsw-specific-sidebar-fill': { light: '#E6EEF8', dark: '#191919' },
  '--dsw-specific-sidebar-tint': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-sidebar-wash-top': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-sidebar-wash-bottom': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-sidebar-wash-top-clear': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-sidebar-wash-bottom-clear': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-sidebar-nav-item-active': { light: 'rgba(0, 0, 0, 0.06)', dark: 'rgba(255, 255, 255, 0.08)' },
  '--dsw-specific-sidebar-nav-item-active-accent': { light: 'rgba(0, 113, 227, 0.10)', dark: 'rgba(10, 132, 255, 0.18)' },
  '--dsw-specific-sidebar-glass-fill': { light: 'rgba(0, 0, 0, 0.05)', dark: 'rgba(255, 255, 255, 0.06)' },
  '--dsw-specific-sidebar-glass-hover': { light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(255, 255, 255, 0.10)' },
  '--dsw-specific-menu': { light: '#FBFDFF', dark: '#2F2F2F' },
  '--dsw-specific-input-major': { light: '#FBFDFF', dark: '#262626' },
  '--dsw-specific-bubble': { light: '#E6EEF8', dark: '#393939' },
  '--dsw-specific-bubble-highlight': { light: '#DCE7F3', dark: '#414141' },
  '--dsw-specific-selector': { light: '#E3ECF6', dark: '#3A3A3A' },
  '--dsw-specific-tip': { light: '#EDF3FA', dark: '#2C2C2C' },
  '--dsw-specific-guide-hero': { light: '#E3ECF6', dark: '#262626' },
  '--dsw-specific-login-input': { light: '#EDF3FA', dark: '#262626' },
  '--dsw-specific-file-upload-track': { light: '#DDE7F1', dark: '#353535' },

  // ── 圆角 ──────────────────────────────────────────────────────
  '--dsw-radius-sm': { light: '8px', dark: '8px' },
  '--dsw-radius-md': { light: '12px', dark: '12px' },
  '--dsw-radius-lg': { light: '16px', dark: '16px' },
  '--dsw-radius-xl': { light: '20px', dark: '20px' },
  '--dsw-radius-panel': { light: '24px', dark: '24px' },

  // ── 科技感光效（插件自定义变量，供 styles.ts 使用）────────────
  '--lanbao-glow-soft': { light: 'rgba(255, 255, 255, 0.95)', dark: 'rgba(255, 255, 255, 0.14)' },
  '--lanbao-glow-strong': { light: 'rgba(0, 113, 227, 0.16)', dark: 'rgba(10, 132, 255, 0.40)' },
  '--lanbao-line': { light: 'rgba(0, 113, 227, 0.30)', dark: 'rgba(10, 132, 255, 0.55)' },
  '--lanbao-line-strong': { light: 'rgba(0, 78, 166, 0.72)', dark: 'rgba(10, 132, 255, 0.88)' },
  '--lanbao-shimmer': { light: 'rgba(0, 113, 227, 0.22)', dark: 'rgba(255, 255, 255, 0.30)' },
  '--lanbao-grid': { light: 'rgba(0, 113, 227, 0.05)', dark: 'rgba(255, 255, 255, 0.05)' },
}