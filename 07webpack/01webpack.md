# `Webpack`
> `webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器(`module bundler`). 当 `webpack` 处理应用程序时, 它会递归地构建一个依赖关系图(`dependency graph`), 其中包含应用程序需要的每个模块, 然后将所有这些模块打包成一个或多个 `bundle`

<!-- TOC -->

- [`Webpack`](#webpack)
  - [`Hello World`](#hello-world)
  - [五大概念与配置](#五大概念与配置)
    - [五大概念](#五大概念)
    - [基本配置](#基本配置)
    - [开发模式和生产模式](#开发模式和生产模式)
  - [处理样式资源](#处理样式资源)
    - [处理 `CSS` 资源](#处理-css-资源)
    - [处理 `LESS` 资源](#处理-less-资源)
    - [处理 `SASS/SCSS` 资源](#处理-sassscss-资源)
    - [处理 `CSS` 资源为单独的文件](#处理-css-资源为单独的文件)
    - [处理样式兼容性问题](#处理样式兼容性问题)
    - [代码优化](#代码优化)
    - [`CSS` 压缩](#css-压缩)
  - [处理模块资源](#处理模块资源)
  - [处理 `js` 资源](#处理-js-资源)
    - [`ESLint`](#eslint)
    - [`Babel`](#babel)
  - [处理 `HTML` 资源](#处理-html-资源)
  - [输出 `output`](#输出-output)
  - [搭建开发服务器](#搭建开发服务器)
  - [`SourceMap`](#sourcemap)
  - [提升打包构建速度](#提升打包构建速度)
    - [`HMR(hot module replacement)`](#hmrhot-module-replacement)
    - [`oneOf`](#oneof)
    - [`Include/Exclude`](#includeexclude)
    - [Cache](#cache)
    - [Thread](#thread)
  - [减少代码体积](#减少代码体积)
    - [`Tree Shaking`](#tree-shaking)
    - [`Babel`](#babel-1)
  - [优化代码运行性能](#优化代码运行性能)
    - [`Code Split`](#code-split)
      - [多入口文件](#多入口文件)
    - [多入口文件提取公共组件](#多入口文件提取公共组件)
      - [动态加载-按需引入](#动态加载-按需引入)
    - [`Preload & Prefetch`](#preload--prefetch)
    - [`Network Cache`](#network-cache)
    - [`Core-js`](#core-js)
    - [`PWA(Progressive Web Application)`](#pwaprogressive-web-application)
  - [`Webpack` 的总结](#webpack-的总结)
  - [搭载 `React` 脚手架](#搭载-react-脚手架)
    - [开发环境配置](#开发环境配置)
    - [生产配置文件](#生产配置文件)
    - [合并配置文件](#合并配置文件)
    - [`antd` 主题配置](#antd-主题配置)
    - [打包优先级](#打包优先级)
    - [关闭性能分析](#关闭性能分析)
  - [搭建 `Vue` 脚手架](#搭建-vue-脚手架)
    - [开发环境配置文件](#开发环境配置文件)
    - [生产环境配置文件](#生产环境配置文件)
    - [合并开发生产配置文件](#合并开发生产配置文件)
    - [打包优先级](#打包优先级-1)
    - [使用 `element-plus`](#使用-element-plus)

<!-- /TOC -->

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
### 处理 `CSS` 资源为单独的文件
1. 之前写的代码 `CSS` 都在 `JS` 中处理, 然后才加入到 `HTML`, 这样就到这页面的 `HTML` 结构已经出现但是没有样式, 体验不好.
    - 从下面的的动图可以看到, 当页面出现后, `js` 文件又花费了 `3s` 的时间才加载完成, 导致页面在 `js` 文件加载过程中是没有样式的
    - ![](../../image/webpack_css_in_js.gif)
2. 安装和使用 `MiniCssExtractPlugin`
    - 作用就是将 `CSS` 提取到单独的文件, 为每个包含 `CSS` 的 `JS` 文件创建一个 `CSS` 文件并支持 `CSS` 的按需加载
    - 安装
      - ```shell
        npm install --save-dev mini-css-extract-plugin@2.6.0
    - 修改 `webpack.config.js`
      - 配置插件, 并将所有的 `style-loader` 替换为 `MiniCssExtractPlugin.loader`
      - ```js
        plugins: [
          new MiniCssExtractPlugin(),
        ],
        module: {
          rules: [
            {
              test: /\.css$/i,
              // use: ['style-loader', 'css-loader']
              use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
              test: /\.less$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
              test: /\.s[ac]ss$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
          ]
        },
    - 重新执行 `npx webpack` 打包, 打包完成后, dist 目录下就会多出 `main.css` 文件并且也不会出现页面无样式的问题了
      - ![](../../image/Snipaste_2022-06-22_09-59-39.png)
    - 修改之后, 可以看到页面 HTML 出来时样式也同步出现.
      - ![](../../image/webpack_css_in_js_plugin.gif)
    - 而且 `index.html` 中自动通过 `link` 引入了 `CSS`
      - ![](../../image/Snipaste_2022-06-22_12-11-08.png)
3. 修改打包之后的 `CSS` 文件地址
    - ```js
      new MiniCssExtractPlugin({
        filename: 'css/main.css'
      }),
    - ![](../../image/Snipaste_2022-06-22_12-43-42.png)
### 处理样式兼容性问题
1. 兼容性问题大概就是 CSS 中的某些语法在不同浏览器不同, 比如 `-webkit-` 前缀啦这些. 使用 PostCSS 会自动添加这些语法.
2. 安装与配置
    - 安装
      - ```shell
        npm i postcss@8.4.13 postcss-loader@6.2.1 postcss-preset-env@7.5.0 -D
    - 配置: 修改 `webpack.config.js`
      - 需要将 `postcss-loader` 配置在 `css-loader` 之后, `less/sass` 等预处理器之前
      - ```js
        {
          test: /\.css$/i,
          // loader: 'css-loader' // 只能使用一个 loader
          // use: ['style-loader', 'css-loader']
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-preset-env' // 能解决大多数样式兼容性问题
                  ]
                }
              }
            }
          ] // use 使用多个 loader
        },
        {
          test: /\.less$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', 
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-preset-env' // 能解决大多数样式兼容性问题
                  ]
                }
              }
            },
            'less-loader'
          ]
        },
    - 配置: `package.json` 中说明究竟腰兼容到哪些浏览器的什么版本
      - ```json
        "browserslist": [
          "ie >= 8"
        ]
    - 重新打包 `npx webpack`. 可以看到, 代码中的 `display: flex` 被兼容性处理后增加了 `display: -ms-flexbox;`
    - ![](../../image/Snipaste_2022-06-22_15-18-08.png)
3. 真实的兼容性配置
    - ```json
      "browserslist": [
        "last 2 version",
        "> 1%",
        "not dead"
      ]
    - `"last 2 version"`: 所有浏览器最新的两个版本
    - `"> 1%"`: 支持 `99%` 的浏览器
    - `"not dead"`: 仍然被浏览器厂商支持的版本.
    - 使用 **`,`** 连接表示以上条件为并集
### 代码优化
1. 之前的 `loader` 都写在一起, 没有代码复用
    - 首先定义重复的 `loader` 数组
    - ```js
      const styleLoaders = [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-preset-env' // 能解决大多数样式兼容性问题
              ]
            }
          }
        }
      ];
    - 然后在重复的地方调用使用展开运算符展开
    - ```js
      {
        test: /\.css$/i,
        use: [...styleLoaders] // use 使用多个 loader
      },
      {
        test: /\.less$/i,
        use: [...styleLoaders, 'less-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...styleLoaders, 'sass-loader']
      },
### `CSS` 压缩
1. 安装与使用
    - 安装
      - ```shell
         npm install css-minimizer-webpack-plugin@3.4.1 --save-dev
    - 配置: `webpack.config.js`
      - ```js
        const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
        
        plugins: [
          new CssMinimizerPlugin(),
        ],
    - 重新打包 `npx webpack`
      - 📕一定是 `production` 模式下才有效哦📕, 记得验证之前将 `webpack.config.js` 中的 `mode` 改为 `production`
    - ![](../../image/Snipaste_2022-06-22_15-48-35.png)
2. `html` 和 `js` 不需要手动指定压缩, 只要在 `production` 下打包, 就会压缩
## 处理模块资源
> 资源模块(`asset module`)是一种模块类型, 它允许使用资源文件（字体, 图标等）而无需配置额外的 `loader`.
1. 在 `webpack 5` 之前, 通常使用
    - `raw-loader`: 将文件导入为字符串;
    - `url-loader`: 将文件作为 `data URI`(默认是呈现为使用 `Base64` 算法编码的文件内容) 内联到 `bundle` 中;
    - `file-loader`: 将文件发送到输出目录
2. 资源模块类型(`asset module type`), 通过添加四种新的模块类型来替换上面的 `loader`
    - `asset/resource`: 发送一个单独的文件并导出 `URL`.
    - `asset/inline`: 带出一个资源的 `data URI`
    - `asset/source`: 导出资源的源代码
    - `asset`: 在导出一个 `data URI` 和发送一个单独的文件之间自动选择
3. 过程与步骤
    - 首先增加几张图片到 `src/asset`, 其中 `1.jpg` 大小为 `5kb`, `2.png` 和 `3.gif` 的大小超过 `100kb`
    - 增加 `css` 代码, 修改 `src/css/index.css`
      - ```css
        .box3 {
          width: 100px;
          height: 100px;
          background-image: url(../assets/1.jpeg);
          background-size: cover;
        }
        .box4 {
          width: 100px;
          height: 100px;
          background-image: url(../assets/2.png);
          background-size: cover;
        }
        .box5 {
          width: 100px;
          height: 100px;
          background-image: url(../assets/3.gif);
          background-size: cover;
        }
    - 修改 `webpack.config.js` 配置 `loader`
      - 📕`type: 'asset'` 就是将资源声明为 `asset` 类型并通过 `dataUrlCondition` 里的条件, 如果图片大小小于 `10kb` 就转成 `data URI`(`Base64`) 否则仍单独文件.
      - ```js
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024 // 10kb
            }
          }
        }
    - 删除之前的 `dist` 目录, 重新执行打包
    - ![](../../image/Snipaste_2022-06-21_10-23-54.png)
    - 实际打包完成 `dist` 目录下也只有 `2` 张图片
    - ![](../../image/Snipaste_2022-06-21_10-24-54.png)
4. 修改生成的图片目录
    - 目前的文件和入口 `main.js` 在同一级, 如果我们想要其出现在 `dist/images` 下, 就可以增加 `generator` 配置
    - ```js
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: "image/[hash][ext][query]"
        }
      }
    - ![](../../image/Snipaste_2022-06-21_10-59-47.png)
    - 其中 `[hash]` 是根据文件内容生成的, 可以通过 `[hash:10]` 只取前 `10` 位.
    - `[ext]` 就是文件的扩展名.
    - `[query]` 是获取文件时的查询参数
6. 处理字体图标资源相同, 快速过一下
    - 将下载的 `css` 和 字体文件分别保存至 `src/css/iconfont.css` 和 `src/assets/font` 下, 并修改 `css` 文件中字体文件的相对路径
    - 在 `main.js` 中引入 `iconfont.css`
    - 修改 `webpack.config.js` 配置 `loader`
      - 📕注意这里配置的 `type: 'asset/resource'`, 因为我们就想保留原来的文件, 不需要生成 `data URI`.
      - ```js
        {
          test: /\.(ttf|woff2?)$/i,
          type: 'asset/resource',
          generator: {
            filename: "font/[hash][ext][query]"
          }
        }
    - 执行构建
      - ![](../../image/Snipaste_2022-06-21_12-23-33.png)
      - ![](../../image/Snipaste_2022-06-21_12-24-32.png)
7. 实际开发中的还可能处理其他资源, 比如音视频或者文档类, 这时候, 我们只需要将处理字体的配置加上其他资源的就可以了, 因为这些资源都不需要转化只要原封不动的保留
    - ```js
      {
          test: /\.(ttf|woff2?|mp3|mp4|doc|ppt)$/i,
          type: 'asset/resource',
          generator: {
            filename: "media/[hash][ext][query]"
          }
        }
## 处理 `js` 资源
### `ESLint`
> 可组装的 `JavaScript` 或 `JSX` 检查工具
1. 使用 `ESLint` 关键是写 `ESLint` 配置文件, 配置为文件里写各种 `rules` 规则, 作为代码检查的依据
2. 配置文件
    - 位于项目根目录
    - 配置文件有很多种写法: `.eslintrc.*`
      - `.eslintrc`
      - `.eslintrc.js`
      - `.eslintrc.json`
      - 这些不同的写法仅在语法上不同
    - 在 `package.json` 中通过 `eslintConfig` 可以指定不需要配置文件而在 `package.json` 中写
    - `ESLint` 会查找和读取配置文件, 所以上述配置文件只需存在一个
3. 安装与使用
    - ```
      npm i eslint@8.14.0 eslint-webpack-plugin@3.1.1 -D
    - 引入, 修改 `webpack.config.js`
      - ```js
        const ESLintPlugin = require('eslint-webpack-plugin');

        plugins: [
          // plugin 的配置
          new ESLintPlugin({
            context: path.resolve(__dirname, 'src')
          })
        ],
      - `context`: 指定文件根目录
4. 具体配置(以`.eslintrc.js`配置文件为例)
    - 总体看一下
    - ```js
      module.exports = {
        // 解析选项
        parserOptions: {},
        // 具体规则检查
        rules: {},
        // 继承其他规则
        extends: [],
        // 环境变量相关
        env: {}
      }
    - `parserOptions`: 解析选项
      - ```js
        parserOptions: {
          ecmaVersion: 6, // es6
          sourceType: 'module', // es 模块化
          ecmaFeatures: {
            jsx: true // 如果是 react 需要开启 jsx
          }
        },
    - `rules`: 具体规则
      - 采用 `key-value` 的形式. 其中 key 是规则, value 是触发对应规则的报警级别
        - `off` 或 `0`: 关闭规则, 即规则不生效
        - `warn` 或 `1`: 开启规则, 使用告警级别的错误, 不会导致程序退出
        - `error` 或 `2`: 开启规则, 使用错误级别的错误, 程序会退出
      - ```js
        rules: {
          "no-var": 'error',
          "semi": 2
        },
    - `extends`: 开发中手写所有规则太费劲, 可以继承以下比较有名的规则
      - `eslint:recommended`: `ESLint` 官方的规则
      - `plugin:vue/essential`: `Vue Cli` 官方规则
      - `react-app`: `React Cli` 官方规则
      - ```js
        extends: ['eslint:recommended'],
    - `env`: 允许使用 node 或浏览器中的全局变量
      - ```js
        env: {
          node: true, // 启用node中的全局变量
          browser: true, // 启用浏览器中的全局变量, 比如 console
        }
    - 完整的配置文件
      - ```js
        module.exports = {
          // 解析选项
          parserOptions: {
            ecmaVersion: 6, // es6
            sourceType: 'module', // es 模块化
            ecmaFeatures: {
              jsx: true // 如果是 react 需要开启 jsx
            }
          },
          // 具体规则检查
          rules: {
            "no-var": 'error'
          },
          // 继承其他规则
          extends: ['eslint:recommended'],
          // 环境变量相关
          env: {
            node: true, // 启用node中的全局变量
            browser: true, // 启用浏览器中的全局变量, 比如 console
          }
        }
    - 手动写一个错误然后执行 `npx webpack` 看看报错
    - ![](../../image/Snipaste_2022-06-21_16-03-50.png)
5. 老师推荐了 `ESLint` 这个 `VS Code` 插件, 但是这个插件会检查 `dist` 目录下的代码, 为此需要在根目录下创建 `.eslintignore` 文件, 指出不需要检查 `dist` 文件夹下的文件
    - ```js
      dist
### `Babel`
> `JavaScript` 编译器
1. 配置文件
    - 配置文件有很多中写法, 都需要在项目根目录下
    - 写法一: `babel.config.*`
      - `babel.config.js`
      - `babel.config.json`
    - 写法二: `.babelrc.*`
      - `.babelrc`
      - `.babelrc.js`
      - `.babelrc.json`
    - 在 `package.json` 中 `babel`: 不需要创建文件在原有基础上写
2. 安装与配置
    - ```shell
      npm i @babel/core@7.17.10 @babel/preset-env@7.17.10 babel-loader@8.2.5 -D
    - 在 `webpack.config.js` 中配置 `loader`
      - ```js
        {
          test: /\.js$/,
          exclude: /node_modules/, // 排除 node_modules中的js文件
          loader: 'babel-loader'
        }
3. 具体内容
    - `presets` 预设: 简单来说, 就是一组 Babel 插件, 用来扩展 Bebel 功能
      - `@babel/preset-env`: 智能预设, 允许使用最新 `Javascript` 语法
      - `@babel/preset-react`: 用来编译 `React JSX` 语法的预设
      - `@babel/preset-typescript`: 用来编译 `TypeScript` 语法的预设
    - 下面就是 `babel.config.js` 的全部内容
    - ```js
      module.exports = {
        presets: ['@babel/preset-env']
      }
    - 执行 `npx webpack` 打包构建
## 处理 `HTML` 资源
1. 目前在 `HTML` 目录中的 `js` 是我们手动加入的, 如果以后有很多`js` 或者需要维护, 就比较麻烦. 可以使用 HtmlWebpackPlugin 更加简便
    - 安装
      - ```shell
        npm install --save-dev html-webpack-plugin@5.5.0
    - 引入并配置
      - `webpack.config.js`
      - ```js
        const HtmlWebpackPlugin = require('html-webpack-plugin');

        plugins: [
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
          })
        ],
    - 执行 `npx webpack` 打包构建
    - ![](../../image/Snipaste_2022-06-21_17-08-18.png)
## 输出 `output`
1. 自动删除上次打包的内容
    - 在 `webpack 4` 还需要安装插件.
    - ```js
      output: {
        // 输出的路径 : 当前路径下的 dist 文件夹
        path: path.resolve(__dirname, 'dist'), 
        // 输出的文件名
        filename: 'main.js',
        // 自动清除上次打包的内容
        clean: true
      },
## 搭建开发服务器
1. 为了避免每次修改代码后都需要手动 `npx webpack` 才能看到效果, 需要搭建开发服务器. 开发模式不需要有文件输出, 也就是 `dist` 文件夹下没有打包后的文件
2. 安装与配置
    - 安装依赖
      - ```shell
        npm i webpack-dev-server@4.8.1 -D
    - 增加 `webpack.config.js` 的配置
      - ```js
        // 开发服务器
        devServer: {
          host: 'localhost',
          port: '3000',
          open: true, // 自动打开浏览器
        },
    - 运行 `npx webpack serve`
3. 报错
    - ![](../../image/Snipaste_2022-06-21_20-01-54.png)
    - [👉Github👈]](https://github.com/webpack/webpack/issues/15951) 上要更新 `webpack-cli` 版本为 `4.10.0`
    - ```json
      "webpack": "^5.72.0",
      "webpack-cli": "^4.10.0",
      "webpack-dev-server": "^4.8.1"
    - 报错解决, 服务启动成功
    - ![](../../image/Snipaste_2022-06-21_20-03-44.png)
## `SourceMap`
> [就是编译后的代码如何与源代码映射, 从而快速定位到源代码](https://webpack.docschina.org/configuration/devtool/#root)
1. 我们手动在代码中添加错误
    - ```js
      export default function sumArray(...args) {
      return args.reduce((prev, cur) => prev + cur, 0)();
    }
    - ![](../../image/Snipaste_2022-06-22_17-34-57.png)
    - 如果点进去, 看到的编译后的代码报错位置
    - ![](../../image/Snipaste_2022-06-22_17-35-32.png)
    - 这样对于生产上排查错误不友好.
2. `SourceMap` 是一个用来生成源代码与构建后代码一一映射的文件的方案. 
    - 它会生成一个 `.map` 文件, 里面包含源代码和构建后代码每一行每一列的关系. 当构建后代码出错时就会通过 `.map` 文件从构建后代码出错位置找到源代码出错位置.
3. 使用
    - 修改 `webpack.config.js` 增加 `devtool` 配置项
    - 开发模式
      - ```js
        devtool: 'cheap-module-source-map',
      - 优点: 打包编译速度快, 只包含行映射
      - 缺点: 没有列映射
    - 生产模式
      - ```js
        devtool: 'source-map',
      - 优点: 包含行/列映射
      - 缺点: 打包编译速度更慢
    - 下面使用生产配置重新打包, 可以看到 `main.js` 多了对应的 `main.js.map` 而且浏览器找到了源代码文件
    - ![](../../image/Snipaste_2022-06-22_17-45-35.png)
    - ![](../../image/Snipaste_2022-06-22_17-46-33.png)
## 提升打包构建速度
### `HMR(hot module replacement)`
1. 开发环境中, 如果更新单个文件, 那么整个代码都会重新构建执行. 热模块替换(`HMR`)会在应用程序运行过程指令, 替换, 添加或删除模块, 而无需加载整个页面.
    - `HMR` 是默认开启的, 如果要关闭可以修改下面的配置
    - ```js
      devServer: {
        host: 'localhost',
        port: '3000',
        open: true, // 自动打开浏览器
        hot: true, // 开启 HMR
      },
2. 但是这样配置之后, 修改 JS 文件仍会导致页面更新. 该需要在 `main.js` 中修改
    - ```js
      // 判断是否支持HMR
      if (module.hot) {
        module.hot.accept('./js/sum');
        module.hot.accept('./js/sumArray', () => {
          console.log('sumArray udpated')
        });
      }
    - 其中 `accept` 接受第二个回调函数形式的参数, 当第一个参数指定的文件发生变化时调用回调函数
3. 另一个问题时, 开发时有很多文件那么这样写就会很繁琐. 所以我们需要其他 loader 来解决, 比如 `vue-loader` 或 `react-hot-loader`
### `oneOf`
1. 在使用 `loader` 处理文件时, 一个文件匹配到某个规则后, 并不会停止而是会继续向下匹配, 这就造成打包的浪费. 使用 `oneOf` 就会在文件和 `loader` 规则匹配时, 只使用第一个匹配规则.
    - 修改 `webpack.config.js`
    - ```js
      module: {
        rules: [
          {
            oneOf: [
              {
                test: /\.css$/i,
                use: [...styleLoaders]
              },
              {
                test: /\.less$/i,
                use: [...styleLoaders, 'less-loader']
              },
              // 省略剩下
            ]
          }
        ]
      },
### `Include/Exclude`
1. 开发中使用第三方 `loader` 或者 `plugin` 时, 所有文件都下载到了 `node_modules` 中, 这些文件不需要编译可以直接使用因此在对文件处理时, 要排除 `node_modules` 下面的文件
    - `include`: 只处理某些资源
    - `exclude`: 排除某些资源不处理.
    - `include` 和 `exclude` 只能选择一个
    - `webpack.config.js`
    - ```js
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules中的js文件
        loader: 'babel-loader'
      }
    - 或者
    - ```js
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader'
      }
### Cache
1. 每次打包文件时 JS 文件都要经过 ESLint 检查和 Babel 编译, 我们可以缓存检查和编译结果, 使得已经检查和编译而没有修改的文件不需要重新检查或编译
    - `webpack.config.js` 中修改 `babel-loader`
    - ```js
      {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除 node_modules中的js文件
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 开启 babel
          cacheCompression: false, // 关闭缓存文件压缩
        }
      }
    - 修改 `ESLint` 插件
    - ```js
      new ESLintPlugin({
        context: path.resolve(__dirname, 'src'),
        cache: true, // 开启缓存
        cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslintcache')
      }),
    - ![](../../image/Snipaste_2022-06-23_17-03-47.png)
### Thread
1. 当项目越来越庞大时, 打包速度越来越慢, 主要是打包 `JS` 文件速度. 对 `JS` 文件处理主要是 `ESLint`, `Babel` 和 `Terser`(内置的压缩插件), 开启多进程同时处理 `JS` 来提升打包速度.
2. 安装与使用
    - 安装依赖
      - ```shell
        npm install --save-dev thread-loader@3.0.4
    - 修改配置文件
      - 修改 `JS loader`, 加在 `babel-loader` 前面
      - ```js
        const os = require('os');
        const TerserWebpackPlugin = require('terser-webpack-plugin');

        const cpuNum = os.cpus().length;
        {
          test: /\.js$/,
          // exclude: /node_modules/, // 排除 node_modules中的js文件
          include: path.resolve(__dirname, './src'),
          use: [
            {
              loader: 'thread-loader', // 开启多进程
              options: {
                works: cpuNum
              }
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, // 开启 babel
                cacheCompression: false, // 关闭缓存文件压缩
              }
            }
          ]
        }
      - 修改 `ESLint` 配置
      - ```js
        new ESLintPlugin({
          context: path.resolve(__dirname, 'src'),
          cache: true, // 开启缓存
          cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslintcache'),
          threads: cpuNum // 开启多进程
        }),
      - 增加 `optimization` 根配置项
      - ```js
        optimization: {
          // 压缩的操作
          minimizer: [
            new TerserWebpackPlugin({
              parallel: cpuNum
            })
          ]
        },
      - 重新打包
## 减少代码体积
### `Tree Shaking`
1. 开发时定义一些函数库或者引入第三方工具函数库, 实际上我们只能用到函数库中的一部分代码, 这时就需要 `Tree Shaking` 将没有用上的 `JS` 代码移除
    - `Tree Shaking` 依赖 `ES Module`
    - `Webpack` 默认开启
### `Babel`
1. `Babel` 为编译的每个文件都插入了辅助代码, 比如 `_extend`, 使代码体积过大. 我们可以将辅助代码作为一个独立模块, 在需要它的地方引入而不是重复定义
    - `@babel/plugin-transform-runtime` 禁用了 `Babel` 自动对每个文件的 `runtime` 注入, 而是引入 `@babel/plugin-transform-runtime` 了 并且使所有的辅助代码都从这里引入
2. 安装与使用
    - 安装
      - ```js
        npm i -D @babel/plugin-transform-runtime@7.17.10
    - 配置
      - `webpack.config.js` 修改 `babel-loader`
      - ```js
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // 开启 babel
            cacheCompression: false, // 关闭缓存文件压缩
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
    - 重新打包
## 优化代码运行性能
### `Code Split`
1. 打包时所有 `JS` 文件都打包到一个文件会导致体积太大, 如果只请求首页就会把其他页面的 `JS` 也请求了.
    - 因此需要将所有打包的文件进行代码分隔, 生成多个 `JS` 文件.
#### 多入口文件
1. 创建项目
    - ![](../../image/Snipaste_2022-06-24_10-03-17.png)
    - `src` 下的两个文件分别只输出对应的文件名
    - 初始化 `NPM` 项目: `npm init -y`
    - 安装依赖
      - ```js
        npm i webpack@5.72.0 webpack-cli@4.9.2 html-webpack-plugin@5.5.0 -D
    - `webpack.config.js`
      - ```js
        const path = require('path')
        const HtmlWebpackPlugin = require('html-webpack-plugin')

        module.exports = {
          // entry: './src/main.js',
          // 多个入口文件
          entry: {
            app1: './src/app.js',
            main: './src/main.js'
          },
          output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
          },
          plugins: [
            new HtmlWebpackPlugin({
              template: path.resolve(__dirname, './public/index.html'),
            })
          ],

          // npm i webpack@5.72.0 webpack-cli@4.9.2 html-webpack-plugin@5.5.0 -D
          mode: 'production'
        }
      - 在多入口文件下, `entry` 的写法由字符串写法变成了对象写法. `key` 为什么, 打包完成后的文件名就是什么
        - ![](../../image/Snipaste_2022-06-24_10-07-37.png)
    - 打包之后的 `HTML` 将两个 `JS` 文件都引入了
    - ![](../../image/Snipaste_2022-06-24_10-08-39.png)
2. 多入口就多输出, 因此如果想要让代码分隔的一个方式就是写多个入口文件.
### 多入口文件提取公共组件
1. 创建一个 `math.js` 然后在 `app.js` 和 `main.js` 中都引入其暴露的函数
    - ```js
      export default function add(num1, num2) {
        return num1 + num2;
      }
    - 执行打包构建, 打包完成后 `add` 函数在每个地方都出现了. 现实情况是如果 `add` 函数很长, 被调用的地方很多, 那么就会增大打包后的代码体积
    - ![](../../image/Snipaste_2022-06-24_10-21-38.png)
2. 增加配置
    - ![](../../image/5128488-5b3e4374a890a6d9.webp)
    - ```js
      optimization: {
        // 代码分割配置
        splitChunks: {
          chunks: "all", // 对所有模块都进行分割
          // 以下是默认值
          // minSize: 20000, // 分割代码最小的大小
          // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
          // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
          // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
          // maxInitialRequests: 30, // 入口js文件最大并行请求数量
          // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
          // cacheGroups: { // 组，哪些模块要打包到一个组
          //   defaultVendors: { // 组名
          //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          //     priority: -10, // 权重（越大越高）
          //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          //   },
          //   default: { // 其他没有写的配置会使用上面的默认值
          //     minChunks: 2, // 这里的minChunks权重更大
          //     priority: -20,
          //     reuseExistingChunk: true,
          //   },
          // },
          // 修改配置
          cacheGroups: {
            // 组，哪些模块要打包到一个组
            // defaultVendors: { // 组名
            //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
            //   priority: -10, // 权重（越大越高）
            //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            // },
            default: {
              // 其他没有写的配置会使用上面的默认值
              minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    - 执行打包构建. 看起来 `app1.js` 的文件内容似乎更多了, 但是这是为了做到拆分必要的代码
      - ![](../../image/Snipaste_2022-06-24_10-48-46.png)
3. 如果是单文件入口, 那么只需要加入下面一点点额外的配置
    - ```js
      optimization: {
        // 代码分割配置
        splitChunks: {
          chunks: "all",
        },
      },
    - 其中 `ESLint` 不能识别 `import` 语法, 可以增加配置
    - ```js
      plugins: ['import']
#### 动态加载-按需引入
1. 在页面增加一个按钮, 想要点击这个按钮的时候才加载 `JS` 文件并调用其中的某个方法.
    - 创建 `count.js`
    - ```js
      export default function subtract(a, b) {
        return a - b;
      }
      export function subtractReverse(a, b) {
        return b - a;
      }
    - 在 `public/index.html` 中添加按钮
    - ```html
      <button id="test">test</button>
    - 在 `main.js` 中添加处理按钮点击函数
    - ```js
      document.getElementById('test').onclick = (e) => {
        import('./count.js')
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
        })
      }
    - 打包构建
    - ![](../../image/Snipaste_2022-06-24_15-55-20.png)
    - ![](../../image/Snipaste_2022-06-24_15-24-06.png)
    - 因此我们可以使用调用 `default`
    - ```js
      document.getElementById('test').onclick = (e) => {
        import('./count.js')
        .then(res => {
          console.log('res', res);
          console.log('res', res.default(1, 2))
          console.log('res', res.subtractReverse(1, 2))
        })
        .catch(err => {
        })
      }
    - ![](../../image/Snipaste_2022-06-24_15-25-55.png)
2. 修改文件命名
    - 第一步, 首先在 `import` 语句中做如下修改
    - ```js
      import(/* webpackChunkName: "math" */'./count.js')
      .then(res => {
      })
      .catch(err => {
      })
    - 第二步, 在 `webpack.config.js` 的 `output` 中增加 `chunkFilename`. 加上`chunk` 是为了和入口文件区分
    - ```js
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        clean: true
      },
### `Preload & Prefetch`
1. 在动态加载时, 如果加载的文件体积很大就会出现卡顿. 我们想在浏览器空闲时间加载后续需要使用的资源, 需要用 `Preload` 或 `Prefetch`
    - `prefetch(预获取)`: 将来某些导航下可能需要的资源
    - `preload(预获取)`: **`当前`** 导航下可能需要的资源
    - 共同点
      - 只加载资源, 并不执行
      - 都有缓存
    - 不同点
      - `preload` `chunk` 会在父 `chunk` **加载时**, 以并行方式开始加载. `prefetch` `chunk` 会在父 `chunk` 加载**结束后**开始加载; 
      - `preload` `chunk` 具有中等优先级, 并立即下载.  `prefetch` `chunk` 在浏览器闲置时下载;
      - `preload` `chunk` 会在父 `chunk` 中立即请求, 用于当下时刻. `prefetch` `chunk` 会用于未来的某个时刻;
      - 浏览器支持程度不同
2. 使用
    - ```js
      import(/* webpackChunkName: "math", webpackPrefetch: true */'./count.js')
      .then(res => {
      })
      .catch(err => {
      })
    - 可以看到截图中的部分, `math.chunk.js` 一共有两次请求, 只不过第二次请求是从 `cache` 中获取得到的.
    - ![](../../image/Snipaste_2022-06-24_16-48-32.png)
### `Network Cache`
1. 在文件命中增加 `hash` 的一个目的是避免浏览器的缓存导致文件更新失效. 下面我们就给出口文件和 `chunk` 文件都加上 `hash`
    - ```js
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:10].js',
        chunkFilename: '[name].chunk.[contenthash:10].js',
        clean: true
      },
    - `[contenthash:10]` 顾名思义就是根据文件内生成 `hash`, 并取 `hash` 值得前 `10` 位. 如果文件内容不变, `hash` 值就不变, 文件名也不会变
    - ![](../../image/Snipaste_2022-06-24_17-16-24.png)
    - 注意在 `main.js` 中引入了 `count.js` 并修改其 `chunk` 名为 `math` 下面我们修改 `count.js`
    - ```js
      // 随便增加点内容
      export function subtractReverse111(a, b) {
        return b - a;
      }
    - 再次执行打包
    - ![](../../image/Snipaste_2022-06-24_17-18-13.png)
    - 发现不仅 `math.js` 的文件名改变了, `main.js` 的文件名也改变了. 这是因为 `main.js` 中有 `math.js` 的文件名.
    - ![](../../image/Snipaste_2022-06-24_17-19-44.png)
2. 这样的后果就是, `main.js` 自身内容明明没有改变只是其引用的一个模块的内容改变了, `main.js` 的文件名也改变了, 浏览器的缓存失效.
    - 思路是生成一个中间 `runtime` 文件, 加入 `A` 依赖 `B, C, D`. 不管 `B, C, D` 中的哪一个发生了改变, `runtime` 和其一起发生改变, 而 `A` 只需从 `runtime` 中获取对应的依赖的文件名即可.  
    - 增加 `webpack.config.js`
    - ```js
      optimization: {
        runtimeChunk: {
          name: entrypoint => `runtime-${entrypoint.name}.js`
        },
      }
    - ![](../../image/Snipaste_2022-06-24_17-28-08.png)
### `Core-js`
1. `@babel/preset-env` 可以将 `ES6` 的一些语法转换但是对于 `Promise` 等语法仍是无能为力, `core-js` 就是专门用来做 `ES6` 及以上语法的 `polyfill`
2. 安装与使用
    - ```js
      npm i core-js@3.23.2
    - 引入
      - ```js
        import 'core-js'
        new Promise((resolve, reject) => {
          resolve(1);
        })
    - 重新执行打包命令. 就可以看到生成了新的文件, 这个文件就是 `polyfill`
    - ![](../../image/Snipaste_2022-06-24_19-33-27.png)
    - 但是完全引入 core-js 生成的文件很大, 有 200+KB
    - ![](../../image/Snipaste_2022-06-24_19-35-15.png)
3. 按需引入: 只需引入 `core-js/es/promise` 即可
    - ![](../../image/Snipaste_2022-06-24_19-35-51.png)
    - ```js
      // 完整引入
      // import 'core-js'
      // 按需引入
      import 'core-js/es/promise'
    - 重新执行打包构建
    - ![](../../image/Snipaste_2022-06-24_19-38-27.png)
4. 自动引入
    - 如果每次使用对应语法的地方都需要引入, 那么会比较麻烦. 设置 `Bebel` 自动按需引入, 修改 Babel 的配置文件
    - ```js
      module.exports = {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage', //按需自动引入
              corejs: 3,
            }
          ]
        ]
      }
    - 
### `PWA(Progressive Web Application)`
1. 介绍
    - 渐进式网络应用程序, 是一种可以提供类似于远程应用程序体验的` Web App` 技术, 主要是在离线时应用程序依然可以使用这方面类似.
    - 内部通过 `server worker` 实现
2. 安装与使用
    - 安装
      - ```shell
        npm i workbox-webpack-plugin@6.5.3 -D
    - 增加新的 `Plugin` 配置
      - ```js
        new WorkboxPlugin.GenerateSW({
          /// 快速启动serviceworkers, 且不允许一六任何旧的servicerworker
          clientsClaim: true,
          skipWaiting: true,
        })
    - 在 `main.js` 中增加配置. 如果浏览器支持 `Service Worker` 就可以离线访问, 如果不支持, 那么大不了就不能离线访问呗
      - ```js
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator
              .serviceWorker
              .register('/service-worker.js')
              .then(registration => {
                console.log('SW success', registration);
              })
              .catch(error => {
                console.log('SW error', error);
              })
          });
        }
    - 重新执行打包. 完成之后不能立即使用 `Live Server` 启动 `index.html`,  因为请求路径不同
    - ![](../../image/Snipaste_2022-06-25_09-18-41.png)
3. 安装全局静态服务器 `serve`
    - ```
      npm i serve -g
    - 启动以 dist 目录为根目录的静态文件服务器
      - ```
        serve dist
      - 📕这个命令执行的地方一定是在 `dist` 的父路径下
    - 访问网站之后在浏览器开发者工具中将网络改为 `offline`, 刷新页面发现页面仍然有效
    - ![](../../image/webpack_pwa.gif)
## `Webpack` 的总结
1. 提升开发体验
    - 使用 `Source Map` 让上线时代码报错能有更加准确的错误提示
2. 提升打包构建速度
    - 使用 `HMR(Hot Module Replacement)` 让开发时只重新编译打包发生改变了的代码, 不变的代码使用缓存
    - 使用 `Oneof` 让资源文件只被一个 `loader` 处理, 不会继续向后匹配而被多个 `loader` 处理
    - 使用 `Include/Exclude` 排除某些文件, 比如 `node_modules`, 使得处理的文件更少, 速度更快
    - 使用 `Cache` 缓存 `ESLint` 和 `Babel` 的处理结果, 让之后的打包速度更快
    - 使用 Thread 多进程处理 `ESLint` 和 `Babel` 任务
3. 减少代码体积
    - 使用 `Tree Shaking` 剔除没有使用的多于代码, 让代码体积更小
    - 使用 `@babel/plugin-transform-runtime` 插件对 `Babel` 处理, 引入辅助代码而不是直接将辅助代码加入到文件中, 减小文件体积
4. 优化代码运行性能
    - 使用 `Code Split` 将代码分割为多个 `JS` 文件并通过 import 动态导入语法进行按需加载. 
    - 使用 `Preload/Prefetch` 提前加载代码, 提高用户体验 
    - 使用 `Network Cache` 从 `runtime` 中引入辅助代码, 避免被引入的文件改变时引入的文件改变而 `hash` 值改变导致浏览器缓存失效 
    - 使用 `Core-js` 对 `JS` 进行兼容性处理, 比如 `Promise` 语法 
    - 使用 `PWA` 使得代码可以离线运行 
## 搭载 `React` 脚手架
### 开发环境配置
1. 基本环境
    - `webpack.config.js`
    - ```js
      const path = require('path');
      const ESLintWebpackPlugin = require('eslint-webpack-plugin');
      const HtmlWebpackPlugin = require('html-webpack-plugin')

      const styleLoaders = [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-preset-env' // 能解决大多数样式兼容性问题
              ]
            }
          }
        }
      ];

      module.exports = {
        entry: './src/main.js',
        output: {
          path: undefined,
          filename: 'js/[name].js',
          chunkFilename: 'js'
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [...styleLoaders],
            },
            {
              test: /\.s[ac]ss$/,
              use: [...styleLoaders, 'sass-loader'],
            },
            {
              test: /\.(png|jpe?g|gif|webp|svg)$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024
                }
              },
              generator: {
                filename: 'image/[name][hash][ext][query]'
              }
            },
            {
              test: /\.(ttf|woff2?)$/i,
              type: 'asset/resource',
              generator: {
                filename: "font/[hash][ext][query]"
              }
            },
            {
              test: /.jsx?$/,
              include: path.resolve(__dirname, './src'),
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
              }
            }
          ]
        },
        plugins: [
          new ESLintWebpackPlugin({
            context: path.resolve(__dirname, './src'),
            exclude: 'node_modules',
            cache: true,
            cacheLocation:  path.resolve(__dirname, './node_modules/.cache/.eslintcache'),
          }),
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
          })
        ],
        mode: 'development',
        devtool: 'cheap-module-source-map',
        optimization: {
          splitChunks: {
            chunks: 'all'
          },
          runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}.js`,
          }
        },
        devServer: {
          host: 'localhost',
          port: '4000',
          hot: true,
          open: true
        }
      }
    - `babel.config.js`: 需要使用 `babel-preset-react-app` 预设的内容
    - ```js
      module.exports = {
        presets: ['react-app']
      }
    - `.eslintrc.js`: 需要使用 `eslint-config-react-app` 的配置
    - ```js
      module.exports = {
        extends: ['react-app'], // 继承 react 官方规则
        parserOptions: {
          babelOptions: {
            presets: [
              // 解决页面报错
              ['babel-preset-react-app', false],
              'babel-preset-react-app/prod'
            ]
          }
        }
      }
    - 使用 `npm` 安装对应依赖
    - 修改 `package.json` 创建启动命令
      - ```json
        "scripts": {
          "start": "npm run dev",
          "dev": "webpack serve --config ./webpack.dev.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
2. 创建基本文件
    - `App.jsx`
      - ```js
        import React from 'react';

        export default function App() {
          return <h1>App</h1>
        }
    - `main.js`
      - ```js
        import React from 'react';
        import ReactDOM from 'react-dom/client'
        import './App'

        const root = ReactDOM.createRoot(document.getElementById('app'));
        root.render(<App />)
    - 最后的结果
      - ![](../../image/Snipaste_2022-06-25_12-38-42.png)
    - 启动 `npm start`
    - 报错😅
      - ![](../../image/Snipaste_2022-06-25_12-41-23.png)
3. 解决报错
    - 大意就是使用 `babel-preset-react-env` 时需要指定环境
    - 因此需要安装包 `cross-env`
      - ```
        npm i cross-env@7.0.3 -D
      - 修改启动命令
      - ```js
        "scripts": {
          "start": "npm run dev",
          "dev": "cross-env NODE_ENV=development webpack serve --config ./webpack.dev.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
    - 再次报错: 因为 webpack 只能处理后缀名为 `.js` 的省略, 而不能处理 `App.jsx` 的引入.
    - ![](../../image/Snipaste_2022-06-25_15-19-04.png)
      - 修改 `webpack.config.js`, 增加 `resolve` 这个根配置项
      - ```
        resolve: {
          // 自动补全文件扩展名
          extensions: ['.jsx', '.js', '.json']
        },
    - 再次报错: 找不到 `eslint`
      - ![](../../image/Snipaste_2022-06-25_15-29-17.png)
      - 安装即可
      - `npm i eslint -D`
    - 成功
    - ![](../../image/Snipaste_2022-06-25_15-30-09.png)
4. `JS` 的 `HMR`
    - 安装插件
      - ```js
        npm install @pmmmwh/react-refresh-webpack-plugin@0.5.5 react-refresh@0.13.0 -D
    - 增加配置 `webpack.config.js`
      - ```js
        const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

        // babel-loader
        {
          test: /.jsx?$/,
          include: path.resolve(__dirname, './src'),
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            plugins: [
              'react-refresh/babel'
            ]
          }
        }

        // plugins
        plugins: [
          new ReactRefreshWebpackPlugin()
        ],
      - 然后修改 `App.jsx` 看效果
      - ![](../../image/Snipaste_2022-06-25_15-39-00.png)
5. 解决 `React` 路由 `404` 问题
    - 分别创建 Home 和 About 两个组件
    - 安装路由
      - `npm i react-router-dom`
    - 修改 `main.js`
      - ```js
        import React from 'react';
        import ReactDOM from 'react-dom/client'
        import App from './App'
        import { BrowserRouter } from 'react-router-dom'

        const root = ReactDOM.createRoot(document.getElementById('app'));
        root.render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
        )
    - 修改 `App.js`
      - ```js
        import React from 'react';
        import Home from './components/Home/Home'
        import About from './components/About/About'
        import { Link, Routes, Route } from 'react-router-dom' 

        export default function App() {
          return (
            <>
              <h1>App!!!</h1>
              <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
              <hr />
              <Routes>
                <Route path='/home' element={ <Home /> }></Route>
                <Route path='/about' element={ <About /> }></Route>
              </Routes>
            </>
          )
        }
    - 效果就是, 可以通过点击访问路由, 但是如果到了 `/about` 路由再刷新页面就会报错. 这是因为 `http://localhost:4000/about` 实际请求的是 dist 目录下的资源而目录下根本没有这个资源
    - ![](../../image/Snipaste_2022-06-25_16-02-17.png)
    - 解决方法: 当页面访问子路由 `URL` 时返回 `index.html`
      - 修改 `webpack.config.js`
      - ```js
        devServer: {
          host: 'localhost',
          port: '4000',
          hot: true,
          open: true,
          historyApiFallback: true, // 解决前端路由404
        }
### 生产配置文件
1. 在复制开发配置文件的基础上所做的修改
    - 打包输出需要有路径, 文件名和 `chunk` 名需要有 `hash` 做缓存;
    - 样式需要单独生成 `CSS` 文件并压缩;
    - `JS` 文件压缩;
    - 删除 `HMR` 功能;
    - 删除 `devServer`;
    - 修改 `mode` 为 `production'`;
    - 修改 `devtool` 为 `source-map`;
2. 步骤
    - 安装依赖
      - ```
        npm i mini-css-extract-plugin@2.6.0 css-minimizer-webpack-plugin@3.4.1 -D
    - ```js
      const path = require('path');
      const ESLintWebpackPlugin = require('eslint-webpack-plugin');
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
      const TerserWebpackPlugin = require('terser-webpack-plugin')

      const styleLoaders = [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-preset-env' // 能解决大多数样式兼容性问题
              ]
            }
          }
        }
      ];

      module.exports = {
        entry: './src/main.js',
        output: {
          path: path.resolve(__dirname, './dist'),
          filename: 'js/[name].[contenthash:10].js',
          chunkFilename: 'js/[name].[contenthash:10].chunk.js',
          clean: true
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [...styleLoaders],
            },
            {
              test: /\.s[ac]ss$/,
              use: [...styleLoaders, 'sass-loader'],
            },
            {
              test: /\.(png|jpe?g|gif|webp|svg)$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024
                }
              },
              generator: {
                filename: 'image/[name][hash][ext][query]'
              }
            },
            {
              test: /\.(ttf|woff2?)$/i,
              type: 'asset/resource',
              generator: {
                filename: "font/[hash][ext][query]"
              }
            },
            {
              test: /.jsx?$/,
              include: path.resolve(__dirname, './src'),
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
              }
            }
          ]
        },
        plugins: [
          new ESLintWebpackPlugin({
            context: path.resolve(__dirname, './src'),
            exclude: 'node_modules',
            cache: true,
            cacheLocation:  path.resolve(__dirname, './node_modules/.cache/.eslintcache'),
          }),
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
          }),
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:10].css',
            chunkFilename: 'css/[name].[contenthash:10].chunk.css'
          })
        ],
        mode: 'production',
        devtool: 'source-map',
        resolve: {
          // 自动补全文件扩展名
          extensions: ['.jsx', '.js', '.json']
        },
        optimization: {
          splitChunks: {
            chunks: 'all'
          },
          runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}.js`,
          },
          minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
          ]
        }
      }
    - 运行 `serve dist`
    - ![](../../image/Snipaste_2022-06-25_16-37-23.png)
4. 解决 `public` 目录下资源未打包的问题
    - 必须需要在 `public` 下放页签的图标, 打包时候直接将图标移动到 `dist` 目录下即可
    - 安装插件
      - ```js
         npm i copy-webpack-plugin@10.2.4 -D
    - 修改 `webpack.config.js`
      - ```js
        const CopyWebpackPlugin = require
        ('copy-webpack-plugin')
        
        plugins: [
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, './public'),
                to: path.resolve(__dirname, './dist'),
                globOptions: {
                  ignore: ['**/index.html']
                }
              }
            ]
          })
        ],
    - 在 index.html 中引入 `.ico`
      - ```html
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    - ![](../../image/Snipaste_2022-06-25_16-55-11.png)
### 合并配置文件
1. 通过 `process.env.NODE_ENV` 获取 `cross-env` 设置的指令, 从而判断当前是指令执行的是生产环境还是开发环境指令.
    - 创建 `webpack.config.js`
      - 第一处: 生产环境提取单独的 `CSS` 文件, 开发环境生成 `style` 标签
      - ```js
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      - 第二处: 关于输出, 生产环境输出到 `dist`, 文件名加上 `hash`, 开发环境不需要加 `hash`
      - ```js
        output: {
          path: isProduction ? path.resolve(__dirname, './dist') : undefined,
          filename: isProduction ? 'js/[name].[contenthash:10].js' : 'js/[name].js',
          chunkFilename: isProduction ? 'js/[name].[contenthash:10].chunk.js' : 'js/[name].chunk.js',
          clean: true
        },
      - 第三处: 开发环境使用 `HMR`, 生产环境不需要
      - ```js
        {
          test: /.jsx?$/,
          include: path.resolve(__dirname, './src'),
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            plugins: isProduction ? [] : [ 'react-refresh/babel' ]
          }
        }
      - 第四处: 插件(省略了配置). 最后在数组过滤了 `filter` 为 `true` 的元素
      - ```js
        plugins: [
          new ESLintWebpackPlugin({}),
          new HtmlWebpackPlugin({}),
          isProduction && new MiniCssExtractPlugin({}),
          isProduction && new CopyWebpackPlugin({}),
          !isProduction && new ReactRefreshWebpackPlugin(),
        ].filter(Boolean),
      - 第四处: `mode` 和 `tree-shaking` 的级别
      - ```js
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
      - 第五处: 是否文件压缩. 如果 `minimize` 为真, 才会使用 `minimizer` 的配置
      - ```js
        optimization: {
          minimize: isProduction,
          minimizer: [
          ]
        }
      - 第六处: `devServer` 启动需要命令中加 `serve` 选项. 但是生产 `build` 的命令中没有 `serve` 因此也就不用担心.
      - ```js
        devServer: {
          host: 'localhost',
          port: '4000',
          hot: true,
          open: true,
          historyApiFallback: true, // 解决前端路由
        }
    - 修改 `package.json`
      - ```json
        "scripts": {
          "start": "npm run dev",
          "dev": "cross-env NODE_ENV=development webpack serve --config ./webpack.config.js",
          "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
### `antd` 主题配置
1. 安装和使用 `antd`
    - ```
      npm i antd
    - 在 `main.js` 中引入 `css` 文件
    - ```js
      import 'antd/dist/antd.css'
    - 在 `App.jsx` 中引入 `Button` 组件
    - ```jsx
      import { Button } from 'antd'
      <Button type='primary'>CLICK ME!</Button>
    - ![](../../image/Snipaste_2022-06-25_22-45-49.png)
2. 配置主题
    - 需要安装 `less-loader`
      - ```js
        npm i less-loader@10.2.0 less@4.1.2 -D
    - 增加 `less-loader` 的配置
      - ```js
        {
          test: /\.less$/,
          use: [
            ...styleLoaders,
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: { '@primary-color': '#1DA57A' },
                  javascriptEnabled: true,
                },
              }
            }
          ],
        },
    - 在 `main.js` 中引入 `less` 而不是 `css`
      - ```js
        // import 'antd/dist/antd.css'
        import 'antd/dist/antd.less'
    - 按钮的颜色由蓝色变成了绿色
    - ![](../../image/Snipaste_2022-06-25_22-45-03.png)
### 打包优先级
1. 先看一下目前打包出来的文件
    - 因为所有的第三方 node_modules 下的文件都打包到 `946.js` 中了, 所以导致这个 JS 文件体积很大, 加载时响应会变慢.
    - ![](../../image/Snipaste_2022-06-26_08-44-46.png) 
2. 一个优化的方向是, 将关联的且包提交比较大的第三方包合并一起打包, 剩下的一起打包, 比如将 `react`, `react-dom`, `react-router-dom` 合并单独打包, 将 `antd` 单独打包, 剩下的所有第三方单独打包.
    - ```js
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
            name: 'chunk-react',
            priority: 40,
          },
          antd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            name: 'chunk-antd',
            priority: 30,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-lib',
            priority: 20,
          }
        }
      }
    - 这样原来的 `JS` 文件被拆分成三个独立的文件大小更小的 `JS`. 📕但是不能拆分过多, 因为多了的话请求数量也会变多
    - ![](../../image/Snipaste_2022-06-26_08-56-33.png)
    - ![](../../image/Snipaste_2022-06-26_08-59-18.png)
3. 看一下写法
    - `test`: 满足 `test` 的所有第三方被打包在一起. 
      - `[\\/]`: 表示路径分隔符是 `\` 或者 `/`, 因为 `/` 需要转义, 所以就写成 `[\\/]`
      - `react(.*)?`: 表示所有以 `react` 开头的第三方库
    - `name`: 打包后的文件名
    - `priority`: 优先级相同的一起打包
### 关闭性能分析
1. 在打包过程中会提示哪些文件太大可以优化之类的, 如果不想看到这些, 可以通过在配置文件中增加 `performance: false`
## 搭建 `Vue` 脚手架
### 开发环境配置文件
1. 复制 `React` 脚手架下的开发配置文件
    - 做下面几处修改
      - 删除 `react` `HMR`;
      - 删除 `babel` 对 `jsx` 的处理;
      - 修改自动补全文件后缀, 将 `.jsx` 替换为 `.vue`
2. 安装 `loader`
    - ```
      npm install -D vue-loader vue-template-compiler vue-style-loader
      ```
      - `vue-style-loader`: 是专门代替 `style-loader` 的
    - 修改配置文件
      - ```js
        const { VueLoaderPlugin } = require('vue-loader')
        
        const styleLoaders = [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            ...
          }
        ];

        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }

        plugins: [
          new VueLoaderPlugin(),
        ],
    - 不需要 `HMR` 配置, 因为 `vue-loader` 和 `vue-style-loader` 已经可以做到 `HMR`
3. 配置 `.eslintrc.js`
    - ```js
      module.exports = {
        root: true, // 根目录
        env: {
          node: true,
        },
        extends: [
          'plugin:vue/vue3-essential',
          'eslint:recommended'
        ],
        parserOptions: {
          parser: '@babel/eslint-parser'
        }
      }
4. 配置 `babel.config.js`
    - ```js
      module.exports = {
        presets: ['@vue/cli-plugin-babel/preset']
      }
5. 配置 `package.json`
    - ```json
      "scripts": {
        "start": "npm run dev",
        "dev": "cross-env NODE_ENV=development webpack serve --config ./webpack.dev.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "browerslist": [
        "last 2 version",
        "> 1%",
        "not dead"
      ]
6. 搭建文件
    - 创建 `public/index.html`
      - ```html
        <div id="app"></div>
    - `main.js`
      - ```js
        import { createApp } from 'vue';
        import App from './App'

        createApp(App).mount(document.getElementById('app'));
    - `App.vue`
      - ```html
        <template>
          <h1 class="title">App</h1>
        </template>

        <script>
        export default {
          name: 'App'
        }
        </script>

        <style scoped>
        .title {
          background-color: salmon;
          color: #f0f0f0;
        }
        </style>
      - ![](../../image/Snipaste_2022-06-26_10-05-44.png)
7. 解决一个警告
    - ![](../../image/Snipaste_2022-06-26_10-30-50.png)
    - 就是 Vue3 中需要手动指定 `__VUE_OPTIONS_API__` 和 `__VUE_PROD_DEVTOOLS__` 两个环境变量. 
      - 📕注意 `cross-env` 定义的环境变量是给 `webpack` 这种打包工具用的;
      - `DefinePlugin` 这个 `webpack` 内部插件是给源代码使用的;
    - 修改 `webpack.dev.js`
    - ```js
      const { DefinePlugin } = require('webpack')
      plugins: [
        new DefinePlugin({
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
        })
      ],
### 生产环境配置文件
1. 和开发环境一样, 不过我们不需要使用 `vue-style-loader`,
    - ```js
      const styleLoaders = [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-preset-env' // 能解决大多数样式兼容性问题
              ]
            }
          }
        }
      ];
### 合并开发生产配置文件
1. 上代码
    - 第一处: 开发环境用 `vue-style-loader` 生产环境用 `MiniCssExtractPlugin.loader`
    - ```js
      const isProduction = process.env.NODE_ENV === 'production';
      const styleLoaders = [
        isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        'css-loader',
        ...
      ];
    - 第二处: 输出 
    - ```js
      output: {
        path: isProduction ? path.resolve(__dirname, './dist') : undefined,
        filename: isProduction ? 'js/[name].[contenthash:10].js' : 'js/[name].js',
        chunkFilename: isProduction ? 'js/[name].[contenthash:10].chunk.js' : 'js/[name].chunk.js',
        clean: true
      },
    - 第三处: 生产环境提取 `CSS` 为单独文件并复制 `public` 下的文件 
    - ```js
      plugins: [
        new ESLintWebpackPlugin({}),
        new HtmlWebpackPlugin({}),
        isProduction && new MiniCssExtractPlugin({}),
        isProduction && new CopyWebpackPlugin({}),
        new VueLoaderPlugin(),
        new DefinePlugin({})
      ].filter(Boolean),
    - 第四处: `mode` 和 `devtools` 
    - ```js
      mode: isProduction ? 'production' : 'development',
      devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    - 第五处: 生产需要文件压缩
    - ```js
      minimize: isProduction,
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin(),
      ]
    - 第六处: `dev-server` 
    - ```js
      devServer: {
        host: 'localhost',
        port: '4000',
        hot: true,
        open: true,
        historyApiFallback: true, // 解决前端路由
      }
    - 第七处: 修改 `package.json`
    - ```json
      "scripts": {
        "start": "npm run dev",
        "dev": "cross-env NODE_ENV=development webpack serve --config ./webpack.config.js",
        "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
### 打包优先级
1. 设置不同的分组
### 使用 `element-plus`
1. 全局使用
    - 安装
      - ```js
        npm i element-plus@2.2.0
    - 在 `main.js` 中引入样式文件
      - ```js
        import ElementPlus from 'element-plus'
        import 'element-plus/dist/index.css'

        createApp(App)
        .use(ElementPlus)
        .mount(document.getElementById('app'));
    - 在 `App.vue` 中直接使用组件
      - ```html
        <el-button type="primary">Button</el-button>
    - 启动项目
    - ![](../../image/Snipaste_2022-06-26_16-58-05.png)
2. 按需引入
    - 安装插件
      - ```js
        npm install -D unplugin-vue-components@0.19.3 unplugin-auto-import@0.7.1
    - 增加配置 `webpack.config.js`
      - ```js
        const AutoImport = require('unplugin-auto-import/webpack')
        const Components = require('unplugin-vue-components/webpack')
        const { ElementPlusResolver }  = require('unplugin-vue-components/resolvers')

        plugins: [
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        ]
    - 取消 `main.js` 中的代码
      - ```js
        // import ElementPlus from 'element-plus'
        // import 'element-plus/dist/index.css'

        createApp(App)
        // .use(ElementPlus)
        .mount(document.getElementById('app'));
    - 引入并使用 `App.vue`
      - ```html
        <el-button type="primary">Button</el-button>

        import { ElButton } from 'element-plus'
3. 定制主题
    - 创建 `src/style/element/index.scss`
      - ```scss
        @forward 'element-plus/theme-chalk/src/common/var.scss' with (
          $colors: (
            'primary': (
              'base': salmon,
            ),
          ),
        );
    - 修改配置文件 `webpack.config.js`
      - 修改 `sass-loader` 来使用上面创建的文件
      - ```js
        {
          test: /\.s[ac]ss$/,
          use: [
            ...styleLoaders,
            {
              loader: 'sass-loader',
              options: {
                additionalData: `@use "@/style/element/index.scss" as *;`,
              }
            }
          ],
        },
      - 配置路径别名, 使用 `@` 表示 `src` 目录
      - ```js
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          }
        },
      - 增加 `plugin` 的配置
      - ```js
        Components({
          resolvers: [ElementPlusResolver({
            importStyle: 'sass',
          })],
        }),
    - ![](../../image/Snipaste_2022-06-26_17-44-50.png)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
`webpack`