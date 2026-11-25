/**
 * 蓝宝界面皮肤：一套 Apple 风格的视觉层。
 * 全部改动都是 CSS，按三层组织：语义 token 重定色板；稳定锚点上的材质与光影；滚动条、焦点环等细节。
 * 锚点只用上游的 data-* 属性（slot 名、composer、header、dockkit），不依赖会随版本变化的哈希类名。
 */

/** 注入的样式表 id，卸载时按它移除。 */
const SKIN_STYLE_ID = 'lanbao-skin'

const CSS = String.raw`
/* ============ 1. 语义 token：中性灰阶 + 系统蓝 ============ */

/* 浅色：Apple 式的灰色画布 + 白色浮起表面。
   变量必须声明在 body 上：主题运行时把浅色变量直接声明在 body，
   元素自身的声明优先于从 html 继承的值，挂在 html 上会被它盖住。 */
html body {
  --dsw-alias-bg-base: #ffffff !important;
  --dsw-alias-bg-layer-1: #ffffff !important;
  --dsw-alias-bg-layer-2: #ffffff !important;
  --dsw-alias-bg-layer-3: #ffffff !important;
  --dsw-alias-label-primary: #1d1d1f !important;
  --dsw-alias-label-secondary: #6e6e73 !important;
  --dsw-alias-label-tertiary: #86868b !important;
  --dsw-alias-label-primary-foreground: #ffffff !important;
  --dsw-alias-label-on-color: #ffffff !important;
  --dsw-alias-border-l1: rgba(0, 0, 0, 0.06) !important;
  --dsw-alias-border-l2: rgba(0, 0, 0, 0.10) !important;
  --dsw-alias-border-l3: rgba(0, 0, 0, 0.15) !important;
  --dsw-alias-border-l4: rgba(0, 0, 0, 0.20) !important;
  --dsw-alias-brand-primary: #0071e3 !important;
  --dsw-alias-brand-text: #0066cc !important;
  --dsw-alias-interactive-bg-hover: rgba(0, 0, 0, 0.045) !important;
  --dsw-alias-interactive-bg-active: rgba(0, 0, 0, 0.08) !important;
  --dsw-alias-card-fill: #ffffff !important;
  --dsw-alias-settings-card-fill: #ffffff !important;
  --dsw-alias-settings-card-stroke: rgba(0, 0, 0, 0.08) !important;
  --dsw-alias-button-primary-fill: #0071e3 !important;
  --dsw-alias-button-primary-hover: #0077ed !important;
  --dsw-alias-button-primary-dimmed: rgba(0, 113, 227, 0.35) !important;
  --dsw-alias-menu-group-header-fill: rgba(245, 245, 247, 0.85) !important;
  --dsw-alias-toast-bg: rgba(29, 29, 31, 0.93) !important;
  --dsw-alias-tooltip-bg: rgba(29, 29, 31, 0.93) !important;
  --dsw-alias-scrollbar-bg-l1: rgba(0, 0, 0, 0.16) !important;
  --dsw-alias-scrollbar-hover-l1: rgba(0, 0, 0, 0.30) !important;
  --dsw-alias-scrollbar-bg-l2: rgba(0, 0, 0, 0.12) !important;
  --dsw-alias-scrollbar-hover-l2: rgba(0, 0, 0, 0.24) !important;
  --dsw-alias-state-success-primary: #248a3d !important;
  --dsw-alias-state-warn-primary: #b25000 !important;
  --dsw-alias-state-error-primary: #d70015 !important;

  /* 侧栏、菜单、气泡等专用 token：统一成同一套中性色，去掉原配色的蓝紫色偏 */
  --dsw-specific-sidebar-fill: #ffffff !important;
  --dsw-specific-sidebar-tint: transparent !important;
  --dsw-specific-sidebar-wash-top: transparent !important;
  --dsw-specific-sidebar-wash-bottom: transparent !important;
  --dsw-specific-sidebar-wash-top-clear: transparent !important;
  --dsw-specific-sidebar-wash-bottom-clear: transparent !important;
  --dsw-specific-sidebar-nav-item-active: rgba(0, 0, 0, 0.05) !important;
  --dsw-specific-sidebar-nav-item-active-accent: rgba(0, 113, 227, 0.10) !important;
  --dsw-specific-sidebar-glass-fill: rgba(0, 0, 0, 0.05) !important;
  --dsw-specific-sidebar-glass-hover: rgba(0, 0, 0, 0.08) !important;
  --dsw-specific-menu: rgba(247, 247, 249, 0.84) !important;
  --dsw-specific-input-major: #ffffff !important;
  --dsw-specific-bubble: #eef3fa !important;
  --dsw-specific-bubble-highlight: #e2ecfa !important;
  --dsw-specific-selector: #efeff2 !important;
  --dsw-specific-tip: #f2f2f4 !important;
  --dsw-specific-guide-hero: #ececef !important;
  --dsw-specific-login-input: #fafafb !important;
}

/* 深色：近黑的画布 + 逐级抬升的表面 */
html body[data-ds-dark-theme] {
  --dsw-alias-bg-base: #1c1c1e !important;
  --dsw-alias-bg-layer-1: #232326 !important;
  --dsw-alias-bg-layer-2: #2a2a2d !important;
  --dsw-alias-bg-layer-3: #313135 !important;
  --dsw-alias-label-primary: #f5f5f7 !important;
  --dsw-alias-label-secondary: #a1a1a6 !important;
  --dsw-alias-label-tertiary: #8e8e93 !important;
  --dsw-alias-label-primary-foreground: #ffffff !important;
  --dsw-alias-label-on-color: #ffffff !important;
  --dsw-alias-border-l1: rgba(255, 255, 255, 0.07) !important;
  --dsw-alias-border-l2: rgba(255, 255, 255, 0.11) !important;
  --dsw-alias-border-l3: rgba(255, 255, 255, 0.16) !important;
  --dsw-alias-border-l4: rgba(255, 255, 255, 0.22) !important;
  --dsw-alias-brand-primary: #0a84ff !important;
  --dsw-alias-brand-text: #409cff !important;
  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.06) !important;
  --dsw-alias-interactive-bg-active: rgba(255, 255, 255, 0.10) !important;
  --dsw-alias-card-fill: #2c2c2e !important;
  --dsw-alias-settings-card-fill: #2c2c2e !important;
  --dsw-alias-settings-card-stroke: rgba(255, 255, 255, 0.10) !important;
  --dsw-alias-button-primary-fill: #0a84ff !important;
  --dsw-alias-button-primary-hover: #3395ff !important;
  --dsw-alias-button-primary-dimmed: rgba(10, 132, 255, 0.40) !important;
  --dsw-alias-menu-group-header-fill: rgba(28, 28, 30, 0.85) !important;
  --dsw-alias-toast-bg: rgba(58, 58, 60, 0.93) !important;
  --dsw-alias-tooltip-bg: rgba(58, 58, 60, 0.93) !important;
  --dsw-alias-scrollbar-bg-l1: rgba(255, 255, 255, 0.18) !important;
  --dsw-alias-scrollbar-hover-l1: rgba(255, 255, 255, 0.32) !important;
  --dsw-alias-scrollbar-bg-l2: rgba(255, 255, 255, 0.14) !important;
  --dsw-alias-scrollbar-hover-l2: rgba(255, 255, 255, 0.26) !important;
  --dsw-alias-state-success-primary: #30d158 !important;
  --dsw-alias-state-warn-primary: #ff9f0a !important;
  --dsw-alias-state-error-primary: #ff453a !important;

  /* 专用 token 的深色对应值：表面比画布略亮，层级靠明度差表达 */
  --dsw-specific-sidebar-fill: #232326 !important;
  --dsw-specific-sidebar-tint: transparent !important;
  --dsw-specific-sidebar-wash-top: transparent !important;
  --dsw-specific-sidebar-wash-bottom: transparent !important;
  --dsw-specific-sidebar-wash-top-clear: transparent !important;
  --dsw-specific-sidebar-wash-bottom-clear: transparent !important;
  --dsw-specific-sidebar-nav-item-active: rgba(255, 255, 255, 0.08) !important;
  --dsw-specific-sidebar-nav-item-active-accent: rgba(10, 132, 255, 0.18) !important;
  --dsw-specific-sidebar-glass-fill: rgba(35, 35, 38, 0.60) !important;
  --dsw-specific-sidebar-glass-hover: rgba(44, 44, 46, 0.85) !important;
  --dsw-specific-menu: rgba(38, 38, 41, 0.84) !important;
  --dsw-specific-input-major: #2a2a2d !important;
  --dsw-specific-bubble: #262d39 !important;
  --dsw-specific-bubble-highlight: #2d3644 !important;
  --dsw-specific-selector: #2c2c2e !important;
  --dsw-specific-tip: #2c2c2e !important;
  --dsw-specific-guide-hero: #2a2a2d !important;
  --dsw-specific-login-input: #1e1e20 !important;
}

/* ============ 2. 字体：系统优先，贴近 Apple 平台的默认排版 ============ */

html {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
    "PingFang SC", "Helvetica Neue", "Segoe UI Variable", "Segoe UI", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* 启动样式把页面底色写死成白色，这里改回主题的画布色 */
html body {
  background-color: var(--dsw-alias-bg-base);
}

/* ============ 3. 材质：只在浮动层使用毛玻璃，让底下的内容透出来 ============ */

/* 菜单：根容器透明、材质由子层绘制，所以在根上叠加背景模糊 */
[role="menu"][data-menu-material][data-menu-material] {
  backdrop-filter: blur(26px) saturate(180%);
  -webkit-backdrop-filter: blur(26px) saturate(180%);
  transition:
    background-color 240ms ease,
    box-shadow 240ms ease,
    opacity 160ms ease,
    transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* 输入卡片：半透明表面 + 分层投影，读作一张浮在对话之上的纸 */
[data-composer-card][data-composer-card] {
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 78%, transparent);
  backdrop-filter: blur(24px) saturate(170%);
  -webkit-backdrop-filter: blur(24px) saturate(170%);
  box-shadow:
    inset 0 0 0 0.5px var(--dsw-alias-border-l2),
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 12px 32px rgba(0, 0, 0, 0.10),
    0 28px 64px rgba(0, 0, 0, 0.08);
}

[data-ds-dark-theme] [data-composer-card][data-composer-card] {
  box-shadow:
    inset 0 0 0 0.5px var(--dsw-alias-border-l2),
    0 1px 2px rgba(0, 0, 0, 0.30),
    0 14px 36px rgba(0, 0, 0, 0.45),
    0 30px 70px rgba(0, 0, 0, 0.35);
}

/* 顶栏：内容从下面滚过时自然透出模糊，没有内容经过时读作页面本身 */
header[data-window-drag][data-window-drag] {
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 72%, transparent);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
}

/* 侧栏：做成浮在画布上的圆角面板，与外框留出呼吸间距 */
div:has(> [data-slot="sidebar"]) {
  border-right-color: transparent !important;
}

[data-slot="sidebar"] > div {
  margin: 6px 0 6px 6px;
  height: calc(100% - 12px);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: inset 0 0 0 0.5px var(--dsw-alias-border-l1);
}

/* 侧栏表面的底色。macOS 桌面端上游把侧栏设成透明（背景交给系统 vibrancy），
   所以普通规则会被 [data-platform=darwin] 的透明背景压掉；darwin 下用更高的特异性覆盖，
   把系统材质的灰压下去，只保留极轻微的通透感。 */
html body [data-slot="sidebar"] > div {
  background-color: #ffffff;
}

html body[data-ds-dark-theme] [data-slot="sidebar"] > div {
  background-color: #232326;
  box-shadow: none;
}

[data-platform="darwin"] [data-slot="sidebar"] > div {
  background-color: rgba(255, 255, 255, 0.97);
}

[data-platform="darwin"] body[data-ds-dark-theme] [data-slot="sidebar"] > div {
  background-color: rgba(35, 35, 38, 0.95);
}

/* 折叠的右侧面板仍然挂载并覆盖在中栏上，它自身的内嵌描边会在中栏里画出一条竖线。
   折叠时去掉材质效果，展开时再恢复圆角与投影。 */
[data-rightbar-collapsed="true"] [data-dockkit-surface] {
  border-radius: 0;
  box-shadow: none !important;
}

[data-dockkit-surface][data-dockkit-surface] {
  border-radius: 16px;
  box-shadow:
    inset 0 0 0 0.5px var(--dsw-alias-border-l1),
    0 8px 24px rgba(0, 0, 0, 0.08);
}

/* ============ 4. 细节：选区、焦点环、滚动条 ============ */

::selection {
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 26%, transparent);
}

:where(button, a[href], [role="menuitem"], [role="option"], input, textarea, select, [contenteditable="true"]):focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);
  outline-offset: 2px;
}

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
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
  background-color: var(--dsw-alias-scrollbar-hover-l1);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* ============ 5. 动效与交互反馈 ============ */

/* 图标颜色跟随状态平滑过渡 */
[data-icon] {
  transition: color 160ms ease, opacity 160ms ease;
}

@media (prefers-reduced-motion: no-preference) {
  [data-composer-card][data-composer-card],
  header[data-window-drag][data-window-drag] {
    transition: background-color 240ms ease, box-shadow 240ms ease;
  }

  /* 侧栏保留上游的宽度过渡，折叠和展开用结尾更慢的减速曲线；
     同时让切换深浅色时底色渐变 */
  [data-slot="sidebar"] > div {
    transition:
      width var(--ds-transition-duration-slow) cubic-bezier(0.32, 0.72, 0, 1),
      background-color 320ms ease,
      color 320ms ease;
  }

  /* 画布底色随主题渐变，避免整屏闪切 */
  html body {
    transition: background-color 320ms ease, color 320ms ease;
  }

  /* 按压反馈发生在按下的一瞬间，而不是抬起之后 */
  button:not(:disabled) {
    transition: transform 120ms ease, background-color 160ms ease, opacity 160ms ease;
  }

  button:not(:disabled):active {
    transform: scale(0.97);
  }

  /* 菜单从锚点方向展开：方向由上游写在 data-anchor-side 上 */
  [role="menu"] {
    transition: opacity 160ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
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
      transform: scale(0.96);
    }
  }

  /* 弹窗以轻微下沉和放大入场，与菜单共用同一条曲线 */
  [role="dialog"][aria-modal="true"] {
    animation: lanbao-dialog-in 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }
}

@keyframes lanbao-dialog-in {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.985);
  }
}

/* 系统要求降低透明度时，退回不透明表面 */
@media (prefers-reduced-transparency: reduce) {
  [data-composer-card][data-composer-card] {
    background: var(--dsw-alias-bg-layer-2);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  [role="menu"][data-menu-material][data-menu-material] {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  header[data-window-drag][data-window-drag] {
    background: var(--dsw-alias-bg-base);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
`

/**
 * 注入皮肤样式；页面里已经有一份时不再重复插入。
 * @returns 移除注入样式的函数。
 */
export function installSkin(): () => void {
  const existing = document.getElementById(SKIN_STYLE_ID)
  if (existing !== null) return () => {}
  const style = document.createElement('style')
  style.id = SKIN_STYLE_ID
  style.textContent = CSS
  document.head.append(style)
  return () => { style.remove() }
}