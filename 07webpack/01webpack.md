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
      const path = require('path');

      module.exports = {
        // 入口
        entry: './src/main.js',
        // 出口
        output: {
          // 输出的路径 : 当前路径下的 dist 文件夹
          path: path.resolve(__dirname, 'dist'), 
          // 输出的文件名
          filename: 'main.js'
        },
        // 加载器
        module: {
          rules: [
            // loader 的配置
          ]
        },
        plugins: [
          // plugin 的配置
        ],
        mode: 'development'
      }
2. 执行 `npx webpack` 命令
    - 📕不需要在命令后面加参数
    - 📕弹幕有人打包失败, 其他人提示如果上面的配置项为空删了之后就行了.
    - ![](../../image/)Snipaste_2022-06-21_07-23-34.png
### 开发模式和生产模式
1. 开发模式
    - 即开发代码时使用的模式.
    - 开发模式主要两件事
      - 编译代码, 使浏览器可以识别运行
      - 代码质量检查和编码风格
2. 生产模式
    - 111
## 处理样式资源
1. 先看报错
    - 创建 `src/css/index.css`
    - ```css
      body {
        padding: 0;
        margin: 0;
        background-color: salmon;
      }
    - 在 `main.js` 中引入该资源(📕不引入就不会被编译)
    - ```js 
      import './css/index.css'
    - 执行 `npx webpack`
    - ![](../../image/Snipaste_2022-06-21_07-48-37.png)
### 处理 `CSS` 资源
1. 过程与步骤
    - 安装 `loader`
      - ```shell
        npm i css-loader@6.7.1 style-loader@3.3.1 -D
    - 在 `main.js` 中引入 `CSS` 资源
      - ```js
        import './css/index.css'
    - 修改 `webpack.config.js` 配置 `loader`
      - ```js
        module: {
          rules: [
            // loader 的配置
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader']
            }
          ]
        }
    - 再次执行打包. 可以看到 `CSS` 已经生效
    - ![](../../image/Snipaste_2022-06-21_08-11-13.png)
2. 一些规则
    - ```js
      {
        test: /\.css$/i,
        // loader: 'css-loader' // 只能使用一个 loader
        use: ['style-loader', 'css-loader'] // use 使用多个 loader
      }
    - 📕`test`: 表示哪些文件需要使用 `loader`.
    - 📕`use`: 表示使用哪些 `loader`, 使用顺序从右到左.
      - `css-loader`: 将 `CSS` 资源编译成 `commonJS` 的模块到 `js` 文件中
      - `style-loader`: 将 `js` 中的 `CSS` 通过创建 `<style>` 标签的形式添加到 `HTML` 中.
    - 📕`loader`: 该配置项只能使用 `1` 个 `loader`, `use` 则可以使用多个 `loader`
### 处理 `LESS` 资源
1. 过程与步骤
    - 创建 `src/less/index.less` 文件
      - ```less
        @width: 10px;
        @height: @width + 10px;

        .box {
          width: @width;
          height: @height;
          background-color: cornflowerblue;
        }
    - 在 `main.js` 中引入 `less` 资源
      - ```js
        import './less/index.less'
    - 安装 `loader`
      - ```shell
        npm i less@4.1.2 less-loader@10.2.0 -D
    - 修改 `webpack.config.js` 配置 `loader`
      - ```js
        module: {
          rules: [
            {
              test: /\.less$/i,
              use: ['style-loader', 'css-loader', 'less-loader']
            }
          ]
        }
    - 再次执行构建
    - ![](../../image/Snipaste_2022-06-21_09-08-55.png)
### 处理 `SASS/SCSS` 资源
1. 过程与步骤
    - 创建 `src/sass/index.sass` 和 `src/sass/index.scss` 文件
      - 📕`.sass` 只能缩进, 不能写分号
      - ```sass
        .box2
          width: 100px
          height: 100px
          background-color: red
      - ```scss
        $width: 100px;
        .box1 {
          width: $width;
          height: $width;
          background-color: bisque;
        }
    - 在 `main.js` 中引入 `sass` 资源
      - ```js
        import './sass/index.scss'
        import './sass/index.sass'
    - 安装 `loader`
      - ```shell
        npm i sass@1.51.0 sass-loader@12.6.0 -D
    - 修改 `webpack.config.js` 配置 `loader`
      - ```js
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: ['style-loader', 'css-loader', 'sass-loader']
            }
          ]
        }
    - 再次执行构建
    - ![](../../image/Snipaste_2022-06-21_09-25-27.png)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
`webpack`