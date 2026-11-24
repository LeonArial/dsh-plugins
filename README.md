# 蓝宝 dsh 插件

面向企业定制的 DeepSeek Harness（dsh）插件仓库。

| 插件 | 说明 |
|---|---|
| [dsh-lanbao-brand](dsh-lanbao-brand/) | 蓝宝品牌与界面定制 |

## 安装

插件是 dsh bundle，需要先构建，再装进 profile。以桌面客户端的 `desktop` profile 为例，先完全退出客户端：

```sh
cd dsh-lanbao-brand
pnpm install
pnpm build

CLI="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$CLI" plugin --profile desktop add /Users/leon/Documents/code/agents/plugins/dsh-lanbao-brand
```

以本地路径安装时是 `link` 方式，之后改代码只需重新 `pnpm build`，客户端会实时加载，不需要重装。

## dsh-lanbao-brand

### 功能

- 侧栏品牌：蓝宝标志（蒙版绘制，跟随主题文字色）+“蓝宝”+ 官方 HARNESS 徽标
- 欢迎页：蓝宝标志 + 标题“来和蓝宝一起创造吧”，隐藏“预览版”徽标
- 窗口与标签页标题：`DeepSeek Harness` 替换为“蓝宝”
- 账号菜单“意见反馈”：跳转到企业飞书表单
- 首次启动引导：不再自动弹出“预览版说明”和“登录 / API Key”弹窗；账号菜单里的手动登录、显式添加 API Key 照常可用

### 修改点

| 文件 | 内容 |
|---|---|
| `src/client/brand.ts` | `BRAND_NAME`、`HERO_HEADLINE` |
| `src/client/feedbackUrl.ts` | `FEEDBACK_FORM_URL`（反馈表单地址） |
| `src/client/assets/lanbao-mark.png` | 标志素材（256px 方形蒙版） |

### 实现方式

- `cordis.patch.yml` 停用官方品牌包 `ui-brand-official`，插入本插件；官方包占着侧栏两个单占位品牌位，不停用无法替换
- 浏览器半边注册到 `sidebar.brand.mark`、`sidebar.brand.name`、`conversation.hero.brand.mark` 三个插槽
- 注册一个顺序最靠前、永不完成的 `settings.onboarding` 步骤，挡住内置的自动引导弹窗
- 窗口标题、欢迎页标题与徽标通过 DOM 改写实现：上游没有对应插槽，语言包也不支持覆盖已有命名空间
- 拦截 `window.open`，只把官方问卷域名的跳转换成企业表单，其他链接原样放行

### 已知限制

- 应用名、Dock / 菜单栏文字、应用图标属于客户端外壳，插件改不了
- 账号页、插件页等处写死的 `DeepSeek Harness` 文案无法覆盖
- 原生欢迎窗由客户端主进程判断：未登录且没有已配置的模型凭据时出现，插件无法隐藏；在 profile 里配置模型提供方并存入凭据后不再出现
- 欢迎页标题的定位依赖当前 DOM 结构，上游调整后插件会静默跳过，不报错
- 自动引导被整体屏蔽，包括上游以后新增的引导步骤；需要保留某个引导时要单独放行

### 兼容性

- `engines.dsh` 限定 `>=0.2.2-rc.3 <0.2.3`，类型依赖固定在 `0.2.2-rc.3`
- 用到的插槽名在 0.2.3 上未发生变化，但没有验证
- 升级 dsh 时重点核对：插槽契约、欢迎页 DOM 结构、引导步骤排序

## 开发

```sh
cd dsh-lanbao-brand
pnpm install
pnpm typecheck   # 用 0.2.2-rc.3 的类型包校验插槽名和属性
pnpm build       # 产出 lib/index.js、lib/client.js、lib/assets/
```

浏览器半边必须按官方 lazy-CJS 格式封装（`window.__ModuleLoader__.load({ id, factory })`）。官方的 `clientBundle` 构建预设没有发布成 npm 包，仓库外的插件需要自己产出同样格式，本仓库用 `scripts/build.mjs`（esbuild）复现。

`node_modules/` 和 `lib/` 不入库，克隆后需要先安装并构建。