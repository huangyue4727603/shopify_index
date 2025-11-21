# 生肖测试页面设置指南

## 📦 已完成的工作

✅ 所有文件已成功上传到Shopify：
- ✅ Section文件：`sections/zodiac-test.liquid`
- ✅ 页面模板：`templates/page.zodiac-test.json`
- ✅ JavaScript组件：`assets/zodiac-calculator.js`
- ✅ CSS样式：`assets/zodiac-test.css`
- ✅ 所有图片资源（12个生肖图片 + 背景图）

## 🎯 创建页面步骤

### 方法一：在Shopify后台创建（推荐）

1. **登录Shopify后台**
   - 访问：https://rapy06-gu.myshopify.com/admin

2. **创建新页面**
   - 进入 `Online Store > Pages`
   - 点击 `Add page` 按钮

3. **配置页面**
   - **标题（Title）**：生肖测试
   - **内容（Content）**：可以留空或添加简单说明
   - **模板（Template）**：在右侧下拉菜单选择 `page.zodiac-test`
   - **URL Handle**：zodiac-test（自动生成）

4. **保存并自定义**
   - 点击 `Save` 保存页面
   - 点击 `Customize` 进入主题编辑器

5. **上传背景图片**
   - 在主题编辑器中，选择"生肖测试"section
   - 找到 `Background Image` 设置
   - 上传图片：`/Users/hy/shopify_index/assets/zodiac-bg.jpg`

6. **发布页面**
   - 完成设置后点击 `Save` 保存
   - 页面URL将是：`https://rapy06-gu.myshopify.com/pages/zodiac-test`

### 方法二：使用Shopify CLI（如需自动化）

```bash
# 创建页面的GraphQL mutation
curl -X POST \
  'https://rapy06-gu.myshopify.com/admin/api/2024-01/graphql.json' \
  -H 'Content-Type: application/json' \
  -H 'X-Shopify-Access-Token: YOUR_ACCESS_TOKEN' \
  -d '{
    "query": "mutation CreatePage { pageCreate(page: { title: \"生肖测试\", handle: \"zodiac-test\", body: \"<p>通过查询你的生日来了解你的前世，并测算出本年的运势！</p>\", templateSuffix: \"zodiac-test\" }) { page { id title handle onlineStoreUrl } userErrors { field message } } }"
  }'
```

## 🎨 自定义设置

在主题编辑器中，您可以自定义以下内容：

### 欢迎页设置
- 标题文字
- 副标题文字
- 开始按钮文字
- 装饰图片（可选）

### 输入页设置
- 标题文字
- 日期标签文字
- 计算按钮文字

### 结果页设置
- 结果标题前缀
- 详情标题
- 重新测试按钮文字
- 是否显示产品推荐
- 产品推荐标题模板

## 🎯 功能说明

### 三个交互屏幕

1. **欢迎页**
   - 显示引导文案
   - "开始测试"按钮
   - 可选的装饰图片

2. **输入页**
   - 日期选择器
   - 输入验证
   - "开始测试"按钮（输入日期后激活）

3. **结果页**
   - 生肖图片展示
   - 详细的运势信息：
     - 性格特点
     - 幸运元素（颜色、数字）
     - 适合职业
     - 2026年运势预测
     - 开运建议
   - 产品推荐区域（可选）
   - "重新测试"按钮

### 生肖数据

已内置完整的12生肖数据：
- 🐭 鼠、🐮 牛、🐯 虎、🐰 兔
- 🐲 龙、🐍 蛇、🐴 马、🐑 羊
- 🐵 猴、🐔 鸡、🐶 狗、🐷 猪

每个生肖包含：
- 专属图片
- 性格特点
- 幸运颜色和数字
- 适合职业
- 运势预测
- 开运建议

## 📱 响应式设计

- ✅ 完全支持移动端
- ✅ 平板设备优化
- ✅ 桌面端完美展示
- ✅ 流畅的动画效果

## 🔧 技术栈

- **Liquid** - Shopify模板语言
- **Web Components** - 原生JavaScript组件
- **CSS3** - 现代CSS特性
- **无需构建工具** - 直接运行

## 📞 问题排查

### 页面无法访问
- 确认页面已保存并发布
- 检查URL是否正确：`/pages/zodiac-test`

### 样式显示异常
- 清除浏览器缓存
- 确认CSS文件已成功上传

### 日期选择器不工作
- 检查JavaScript控制台是否有错误
- 确认JS文件已成功加载

### 生肖图片不显示
- 检查图片文件是否已上传到assets目录
- 确认图片命名正确（zodiac-鼠.png等）

## 🎉 完成！

按照以上步骤，您的生肖测试页面应该已经可以正常使用了。

页面地址：`https://rapy06-gu.myshopify.com/pages/zodiac-test`

祝生意兴隆！🎊
