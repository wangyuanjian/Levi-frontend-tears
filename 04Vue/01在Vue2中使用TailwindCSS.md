# 在 Vue2 中使用 TainwindCSS
## 安装
- 下载依赖
  - 📕: 注意下载指定版本, 不然报错
  - ```shell
    npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
- 生成对应的配置文件: `tailwind.config.js` 和 `postcss.config.js` 
  - ```
    npx tailwindcss init -p
  - `tailwind.config.js`
    - ```js
      module.exports = {
        content: [],
        theme: {
          extend: {},
        },
        plugins: [],
      }
  - `postcss.config.js`
    - ```js
      module.exports = {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      }
- 在 `main.js` 中引入 `css`
  - ```js
    import "tailwindcss/tailwind.css"
  - 网上有些教程还让在 `vue.config.js` 中配置其他东西, 我没有配置也成功了
- 安装 `VS Code` 插件, 我没有配置任何东西也生效了
  - `Tailwind CSS IntelliSense`
- 启动项目
  - ![](../../image/Snipaste_2022-04-10_17-34-17.png)
