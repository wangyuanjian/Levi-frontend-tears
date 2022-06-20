# `Webpack`
> `webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器(`module bundler`). 当 `webpack` 处理应用程序时, 它会递归地构建一个依赖关系图(`dependency graph`), 其中包含应用程序需要的每个模块, 然后将所有这些模块打包成一个或多个 `bundle`
## `Hello World`
1. 创建项目
    - 项目结构
      - ![](../../image/Snipaste_2022-06-20_22-16-07.png)
    - 初始化 `npm` 项目
      - ```shell
        npm init -y
      - 需要将下面的 `main` 改为 `src/main.js`
      - ```json
        {
          "name": "webpack_002",
          "version": "1.0.0",
          "description": "",
          "main": "src/main.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
        }
    - 安装依赖
      - ```shell
         npm i webpack@5.72.0 webpack-cli@4.9.2 -D
2. 打包版本
    - ```shell
      npx webpack ./src/main.js --mode=development
    - 📕一些注意点
      - `./src/main.js` 是入口文件, 注意如果你用 VS Code 的提示, 会变成 `.\src\main.js` 然后执行就报错😅
      - `--mode=development` 表示当前为开发模式. 开发者模式只打包不压缩. 使用 `--mode=development` 切换到生产模式, 既打包又压缩.
    - ![](../../image/Snipaste_2022-06-20_22-23-55.png)
    - 在 `public/index.html` 文件中引入打包之后的 `JS` 文件
    - ```html
      <body>
        Hello
        <script src="../dist/main.js"></script>
      </body>
    - ![](../../image/Snipaste_2022-06-21_06-59-31.png)
## 五大概念与配置
### 五大概念
> 入口(`entry`) : 指示 `webpack` 从哪个文件开始打包 \
> 输出(`output`) : 指示 `webpack` 打包完的文件输出到哪里, 如何命名等 \
> 加载器(`loader`) : `webpack` 本身只能处理 `js/json` 等资源, 其他类型的资源需要借助 `loader` 才能解析. \
> 插件(`plugin`) : 扩展 `webpack` 的功能\
> 模式(`mode`) : 开发模式或生产模式.
### 基本配置
1. 在项目根目录创建 `webpack.config.js`
    - ```js 
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
`webpack`