# Shopify Horizon Theme - 项目结构说明

这是基于 Shopify Horizon 主题的定制版本，包含移动端优化和多语言支持增强。

## 项目信息

- **主题名称:** Horizon
- **主题版本:** 3.0.0
- **主题作者:** Shopify
- **仓库地址:** https://github.com/huangyue4727603/shopify_index

---

## 目录结构

```
shopify_index/
├── assets/          # 资源文件（JS、CSS、SVG图标）
├── blocks/          # 可重用的区块组件
├── config/          # 主题配置文件
├── layout/          # 页面布局模板
├── locales/         # 多语言翻译文件
├── sections/        # 页面区段模板
├── snippets/        # 可重用的模板片段
├── templates/       # 页面模板
├── CHANGELOG.md     # 修改记录
├── CLAUDE.md        # 开发指南（供 AI 参考）
└── README.md        # 本文件
```

---

## 核心目录详解

### 📁 `/assets` - 静态资源
包含所有前端资源文件，遵循 Shopify 主题资源命名规范。

**JavaScript (66 个文件):**
- Web Components 组件（如 `product-card.js`, `cart-drawer.js`）
- 基础组件类 `component.js`（所有自定义元素的基类）
- 工具函数 `utilities.js`
- 主题编辑器支持 `theme-editor.js`

**CSS (3 个文件):**
- `base.css` - 基础样式
- `template-giftcard.css` - 礼品卡模板样式
- `overflow-list.css` - 溢出列表工具样式

**SVG 图标 (28 个文件):**
- 系统图标（如 `icon-cart.svg`, `icon-account.svg`）
- 功能图标（如 `icon-search.svg`, `icon-menu.svg`）

**TypeScript 定义:**
- `global.d.ts` - 全局类型定义
- `jsconfig.json` - JavaScript 配置

### 📁 `/blocks` - 区块组件
可重用的内容区块，用于在 sections 中组合使用。

**命名规范:**
- `_` 前缀：内部使用的区块（如 `_product-card.liquid`）
- 无前缀：可在主题编辑器中添加的区块（如 `accordion.liquid`）

**主要区块类型:**
- 产品相关：`product-card`, `product-price`, `buy-buttons`
- 内容展示：`heading`, `text`, `image`, `video`
- 交互组件：`accordion`, `button`, `email-signup`
- 布局组件：`group`, `spacer`, `divider`

### 📁 `/config` - 配置文件
主题的全局配置和设置定义。

- `settings_schema.json` - 定义主题设置的结构（颜色、字体、布局等）
- `settings_data.json` - 存储当前主题设置的值

### 📁 `/layout` - 布局模板
定义页面的整体 HTML 结构。

- `theme.liquid` - 主布局（包含 header、footer、主内容区）
- `password.liquid` - 密码保护页面布局

### 📁 `/locales` - 多语言支持
包含 51 种语言的翻译文件。

**文件类型:**
- `*.json` - 前端翻译（按钮文字、提示信息等）
- `*.schema.json` - 主题编辑器翻译

**支持的语言:**
- 中文：`zh-CN.json`（简体中文）、`zh-TW.json`（繁体中文）
- 英语：`en.default.json`（默认）
- 其他：日语、韩语、法语、德语、西班牙语等 48 种语言

### 📁 `/sections` - 页面区段
定义页面的主要内容区域。

**特殊文件:**
- `_blocks.liquid` - 通用区块渲染器
- `header-group.json` - 头部区段组
- `footer-group.json` - 底部区段组

**主要区段类型:**
- **主页面:** `main-*.liquid`（collection、product、blog 等）
- **功能区段:** `hero.liquid`, `slideshow.liquid`, `product-list.liquid`
- **搜索:** `predictive-search.liquid`, `search-results.liquid`
- **购物车:** `main-cart.liquid`

### 📁 `/snippets` - 模板片段
可重用的 Liquid 代码片段，通过 `{% render 'snippet-name' %}` 调用。

**核心片段:**
- **产品相关:** `product-card.liquid`, `product-media.liquid`, `price.liquid`
- **导航:** `header-menu.liquid`, `header-drawer.liquid`, `mega-menu.liquid`
- **本地化:** `localization-form.liquid`, `dropdown-localization.liquid`
- **购物车:** `cart-drawer.liquid`, `cart-products.liquid`, `cart-summary.liquid`
- **工具片段:** `icon.liquid`, `button.liquid`, `media.liquid`

### 📁 `/templates` - 页面模板
定义不同类型页面的结构。

**JSON 模板 (配置型):**
- `index.json` - 首页
- `product.json` - 产品详情页
- `collection.json` - 产品集合页
- `cart.json` - 购物车页
- `blog.json`, `article.json` - 博客和文章页

**Liquid 模板:**
- `gift_card.liquid` - 礼品卡页面

---

## 核心技术栈

### 前端框架
- **Liquid** - Shopify 模板语言
- **Vanilla JavaScript** - 原生 ES6+ 模块
- **Web Components** - 自定义元素（Custom Elements）
- **CSS** - 原生 CSS（CSS Variables + 现代特性）

### JavaScript 架构
- **基类:** `Component` (继承自 `DeclarativeShadowElement`)
- **模式:** Refs 引用管理、声明式事件绑定
- **模块化:** ES6 模块系统，`@theme/` 别名

### 样式系统
- **CSS 变量:** 用于主题配置（颜色、间距、字体等）
- **响应式:** 移动优先设计，断点 `750px`
- **内联样式:** 组件样式通过 `{% stylesheet %}` 标签内联

---

## 自定义修改记录

### 移动端语言选择器
**修改日期:** 2025-01-07
**提交 ID:** `c8436a8`

在移动端头部添加语言/国家选择器，显示在用户账户按钮左侧。

**修改的文件:**
- `snippets/header-actions.liquid` - 添加移动端语言选择器
- `snippets/dropdown-localization.liquid` - 支持移动端显示
- `snippets/localization-form.liquid` - 添加移动端样式

**效果:**
- 移动端 (< 750px)：语言选择器显示在 account button 左侧
- 桌面端 (≥ 750px)：保持原有位置不变

详细信息请查看 [CHANGELOG.md](./CHANGELOG.md)

---

## 开发指南

### 本地开发
由于这是 Shopify 主题，需要使用 Shopify CLI 或主题编辑器：

```bash
# 使用 Shopify CLI
shopify theme dev

# 或使用在线主题编辑器
# 访问 Shopify 管理后台 > 在线商店 > 主题
```

### 修改流程
1. 修改相应的 Liquid/JS/CSS 文件
2. 在 Shopify 主题编辑器中预览
3. 更新 `CHANGELOG.md` 记录修改
4. 提交到 Git

### 文件命名规范
- **内部片段/区块:** `_` 前缀（如 `_product-card.liquid`）
- **公开区块:** 无前缀（如 `accordion.liquid`）
- **JavaScript 组件:** kebab-case（如 `product-card.js`）
- **CSS 类名:** kebab-case（如 `.product-card__title`）

### 代码规范
遵循 KISS、YAGNI、SOLID 原则：
- 保持代码简洁，避免过度设计
- 只添加必需的功能
- 保持代码清晰、可维护

详细开发指南请参考 [CLAUDE.md](./CLAUDE.md)

---

## 相关资源

### 官方文档
- [Shopify 主题文档](https://shopify.dev/themes)
- [Liquid 模板语言](https://shopify.dev/docs/api/liquid)
- [主题架构](https://shopify.dev/themes/architecture)

### 主题支持
- [Horizon 主题文档](https://help.shopify.com/manual/online-store/themes)
- [Shopify 支持中心](https://support.shopify.com/)

---

## 许可证

基于 Shopify Horizon 主题（版本 3.0.0）进行定制开发。

---

## 更新日志

完整的修改记录请查看 [CHANGELOG.md](./CHANGELOG.md)

**最近更新:**
- 2025-01-07: 迁移仓库到 GitHub
- 2025-01-07: 添加移动端语言选择器
- 2025-01-07: 创建项目文档和修改记录
