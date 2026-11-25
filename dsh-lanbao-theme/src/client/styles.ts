/**
 * 蓝宝主题的材质、细节与动效层。
 *
 * 颜色与圆角由 tokens.ts 通过 overrideTokens 提供，这里只写组件级规则。
 * 只依赖官方稳定锚点（`data-slot`、`data-*`、语义角色），不依赖 CSS Modules 哈希类名。
 * 整体遵循 Codex 网页版的取向：靠亮度差与 1px 边框分层，主界面不用重阴影与毛玻璃。
 */

/** 注入的样式表 id，卸载时按它移除。 */
const STYLE_ID = 'lanbao-theme'

const CSS = String.raw`
/* ── 1. 顶栏：与画布同色，底部一条流光光线 ───────────────────── */
header[data-window-drag] {
  position: relative;
  background: var(--dsw-alias-bg-base);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
}

html body:not([data-ds-dark-theme]) header[data-window-drag]::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  pointer-events: none;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--lanbao-line-strong) 22%,
    var(--lanbao-glow-soft) 50%,
    var(--lanbao-line-strong) 78%,
    transparent 100%);
  opacity: 0.9;
  box-shadow: 0 0 10px var(--lanbao-line-strong);
}

/* ── 2. 输入卡：流光白高光 + 缓慢扫光 ───────────────────────── */
[data-composer-card] {
  position: relative;
  isolation: isolate;
  background:
    linear-gradient(180deg,
      color-mix(in srgb, var(--dsw-alias-bg-layer-2) 86%, white) 0%,
      var(--dsw-alias-bg-layer-2) 48%);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-panel);
  box-shadow:
    inset 0 1px 0 var(--lanbao-glow-soft),
    0 0 0 1px color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent),
    0 18px 50px -26px var(--lanbao-glow-strong);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

[data-composer-card]::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  clip-path: inset(0 round var(--dsw-radius-panel));
  background: linear-gradient(115deg,
    transparent 35%,
    var(--lanbao-shimmer) 50%,
    transparent 65%);
  background-size: 240% 100%;
  opacity: 0.45;
  animation: lanbao-shimmer 7s linear infinite;
}

/* ── 3. 菜单与弹层：1px 边框 + 轻阴影 ───────────────────────── */
[role="menu"][data-menu-material] {
  background: var(--dsw-specific-menu);
  border: 1px solid var(--dsw-alias-border-l2);
  box-shadow:
    inset 0 1px 0 var(--lanbao-glow-soft),
    0 8px 24px rgba(0, 0, 0, 0.35);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

html body:not([data-ds-dark-theme]) [role="menu"][data-menu-material] {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* ── 4. 侧栏：贴边面板 + 1px 分隔 ──────────────────────────── */
[data-slot="sidebar"] > div {
  margin: 0;
  height: 100%;
  border-right: 1px solid var(--dsw-alias-border-l1);
  border-radius: 0;
  box-shadow: none;
  background-color: var(--dsw-specific-sidebar-fill);
}

/* macOS 桌面端上游把侧栏交给系统 vibrancy，这里用更高特异性压成实色。 */
html[data-platform="darwin"] body [data-slot="sidebar"] > div {
  background-color: var(--dsw-specific-sidebar-fill);
}

/* ── 5. 右栏：细边框面板；折叠时去掉描边，避免在中栏画竖线 ─── */
[data-dockkit-surface] {
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-md);
  box-shadow: none;
}

[data-rightbar-collapsed="true"] [data-dockkit-surface] {
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

/* ── 6. 代码块：统一圆角与边框 ──────────────────────────────── */
[data-slot="conversation.chat.markdown.fence"] pre {
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: var(--dsw-radius-md);
}

/* ── 7. 选区与焦点环 ───────────────────────────────────────── */
::selection {
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 24%, transparent);
}

:where(button, a[href], [role="menuitem"], [role="option"], input, textarea, select, [contenteditable="true"]):focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 5px var(--lanbao-glow-strong);
}

/* ── 8. 滚动条：细、圆、低存在感 ───────────────────────────── */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--dsw-alias-scrollbar-bg-l1);
  border: 3px solid transparent;
  border-radius: 999px;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 65%, var(--dsw-alias-scrollbar-hover-l1));
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* ── 9. 动效：短、轻、无弹跳；按下只变亮度，不缩放 ─────────── */
/* 弹窗：科技感高光边（静态，不依赖动效偏好） */
[role="dialog"][aria-modal="true"] {
  box-shadow:
    0 0 0 1px var(--lanbao-line),
    0 30px 90px -34px var(--lanbao-glow-strong);
}

@media (prefers-reduced-motion: no-preference) {
  [data-icon] {
    transition: color 120ms ease-out, opacity 120ms ease-out;
  }

  button:not(:disabled) {
    transition: background-color 120ms ease-out, color 120ms ease-out, opacity 120ms ease-out;
  }

  [role="menu"] {
    transition: opacity 120ms ease-out, transform 120ms ease-out;
  }

  [role="menu"][data-anchor-side="top"] {
    transform-origin: center bottom;
  }

  [role="menu"][data-anchor-side="bottom"] {
    transform-origin: center top;
  }

  [role="menu"][data-anchor-side="left"] {
    transform-origin: right center;
  }

  [role="menu"][data-anchor-side="right"] {
    transform-origin: left center;
  }

  @starting-style {
    [role="menu"] {
      opacity: 0;
      transform: translateY(4px);
    }
  }

  [role="dialog"][aria-modal="true"] {
    animation: lanbao-theme-dialog-in 180ms ease-out;
  }

  html body {
    transition: background-color 180ms ease-out, color 180ms ease-out;
  }
}

@keyframes lanbao-theme-dialog-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
}

/* 输入卡的流光扫过：白色（深色主题）或科技蓝（浅色主题）缓慢划过。 */
@keyframes lanbao-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -100% 0;
  }
}


@media (prefers-reduced-motion: reduce) {
  [role="dialog"][aria-modal="true"] {
    animation: none;
  }

  [data-composer-card]::after {
    animation: none;
    opacity: 0.15;
  }
}

/* ── 10. 纸质感：暖白纸面 + 极细纤维 ───────────────────────── */
/* 浅色主题：纸白画布上叠极淡的横纵纤维，近看才有纹理，不干扰阅读。 */
html body:not([data-ds-dark-theme]) {
  background-image:
    repeating-linear-gradient(0deg, rgba(70, 110, 160, 0.020) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(70, 110, 160, 0.012) 0 1px, transparent 1px 4px);
}

html body:not([data-ds-dark-theme]) [data-slot="sidebar"] > div {
  background-image:
    repeating-linear-gradient(0deg, rgba(70, 110, 160, 0.022) 0 1px, transparent 1px 3px);
}

html body:not([data-ds-dark-theme]) [role="menu"][data-menu-material] {
  background-image:
    repeating-linear-gradient(0deg, rgba(70, 110, 160, 0.022) 0 1px, transparent 1px 3px);
}

/* 输入卡：纸纹在最上层，渐变在下，保留原有的流光层。 */
html body:not([data-ds-dark-theme]) [data-composer-card] {
  background:
    repeating-linear-gradient(0deg, rgba(70, 110, 160, 0.022) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(70, 110, 160, 0.014) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, #FBFDFF 0%, var(--dsw-alias-bg-layer-2) 48%);
}

/* 深色主题保持最初的中性表面，不叠加额外光晕与纹理。 */
`

/**
 * 注入主题样式；页面里已经有一份时不再重复插入。
 * @returns 移除注入样式的函数。
 */
export function installStyles(): () => void {
  const existing = document.getElementById(STYLE_ID)
  if (existing !== null) return () => {}
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = CSS
  document.head.append(style)
  return () => { style.remove() }
}