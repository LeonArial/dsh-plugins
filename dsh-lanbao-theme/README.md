# dsh-lanbao-theme

蓝宝界面主题插件：借鉴 ChatGPT Codex 网页版的中性、克制、专业视觉，保留蓝宝品牌色。

## 功能

- 通过官方 `ctx.theme.overrideTokens` 覆盖配色、表面、文字、边框、状态、代码与 diff、滚动条、圆角。
- 注入一张只依赖稳定 `data-*` / `[data-slot]` 锚点的样式表，负责材质、细节与动效。
- 浅色 / 深色成对定义；不修改客户端本体。

## 修改点

| 文件 | 内容 |
|---|---|
| `src/client/tokens.ts` | 浅色 / 深色 token 覆盖表 |
| `src/client/styles.ts` | 材质、细节、动效 CSS |

## 设计取向

- 画布：浅色 `#FFFFFF`，深色 `#1E1E1E`；表面靠亮度差与 1px 边框分层。
- 主色：浅色 `#0071E3`，深色 `#0A84FF`；用于主按钮、选中态、焦点环。
- 圆角：Composer / 大面板 24px，卡片 12px，按钮 8px。
- 动效：120–180ms ease-out，无弹跳；尊重 `prefers-reduced-motion`。

## 开发

```sh
pnpm install
pnpm typecheck
pnpm build
```

产出 `lib/index.js` 与 `lib/client.js`。以 link 方式装入 profile 后，改代码重新构建即可实时加载。

## 兼容性

- `engines.dsh` 限定 `>=0.2.2-rc.3 <0.2.3`。
- 升级 dsh 时重点核对：token 名、`data-*` 锚点、theme 服务 API。