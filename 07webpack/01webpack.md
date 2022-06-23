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
![](../../image/)
![](../../image/)
![](../../image/)
`webpack`