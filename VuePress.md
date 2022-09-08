<!-- TOC -->

- [VuePress 静态网站生成器](#vuepress-%E9%9D%99%E6%80%81%E7%BD%91%E7%AB%99%E7%94%9F%E6%88%90%E5%99%A8)
  - [快速上手](#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)
  - [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
  - [基本配置](#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)
    - [配置文件](#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
    - [应用级别的配置](#%E5%BA%94%E7%94%A8%E7%BA%A7%E5%88%AB%E7%9A%84%E9%85%8D%E7%BD%AE)
  - [静态资源](#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90)
  - [Markdown 扩展](#markdown-%E6%89%A9%E5%B1%95)
  - [主题](#%E4%B8%BB%E9%A2%98)
    - [默认主题配置](#%E9%BB%98%E8%AE%A4%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE)
    - [导航栏](#%E5%AF%BC%E8%88%AA%E6%A0%8F)
    - [侧边栏](#%E4%BE%A7%E8%BE%B9%E6%A0%8F)

<!-- /TOC -->

# VuePress 静态网站生成器

## 快速上手
1. 安装
    - 创建目录 `vuepress_test` 并进入, 初始化项目
      - ```
        yarn init
    - 将 VuePress 安装为本地依赖(不推荐使用全局安装)
      - ```
        yarn add -D vuepress@1.9.7
2. 创建文档并启动
    - 创建 `docs/README.md`
      - ```md
        # ❤️
    - 在 package.json 中增加脚本
      - ```json
        {
          "scripts": {
            "docs:dev": "vuepress dev docs",
            "docs:build": "vuepress build docs"
          }
        }
    - 启动, 就会启动一个热重载的开发服务器
      - ```shell
        yarn docs:dev
    - ![](../image/Snipaste_2022-08-31_08-49-21.png)
## 目录结构
1. VuePress 遵循 约定大于配置 的规则
    - ```md
      .
      ├── docs
      │   ├── .vuepress (可选的)
      │   │   ├── components (可选的)
      │   │   ├── theme (可选的)
      │   │   │   └── Layout.vue
      │   │   ├── public (可选的)
      │   │   ├── styles (可选的)
      │   │   │   ├── index.styl
      │   │   │   └── palette.styl
      │   │   ├── templates (可选的, 谨慎配置)
      │   │   │   ├── dev.html
      │   │   │   └── ssr.html
      │   │   ├── config.js (可选的)
      │   │   └── enhanceApp.js (可选的)
      │   │ 
      │   ├── README.md
      │   ├── guide
      │   │   └── README.md
      │   └── config.md
      │ 
      └── package.json
    - `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等
    - `docs/.vuepress/components`: 该目录中的 Vu`e 组件将会被自动注册为全局组件
    - `docs/.vuepress/theme`: 用于存放本地主题。
    - `docs/.vuepress/styles`: 用于存放样式相关的文件。
    - `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件, 会生成在最终的 `CSS` 文件结尾, 具有比默认样式更高的优先级。
    - `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量, 或者设置新的 `stylus` 颜色常量。
    - `docs/.vuepress/public`: 静态资源目录。
    - `docs/.vuepress/templates`: 存储 `HTML` 模板文件。
    - `docs/.vuepress/templates/dev.html`: 用于开发环境的 `HTML` 模板文件。
    - `docs/.vuepress/templates/ssr.html`: 构建时基于 `Vue SSR` 的 `HTML` 模板文件。
    - `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml。`
    - `docs/.vuepress/enhanceApp.js`: 客户端应用的增强
2. 默认的页面路由
    - 默认将 `docs` 目录作为 `targetDir`. 因此当访问 `http://localhost:8080/` 也就是根目录 `/` 的时候, 就是访问 `docs` 下面的 `README.md` 文件
## 基本配置
### 配置文件
1. 一个 `VuePress` 网站必要的配置文件是 `.vuepress/config.js`, 默认暴露一个对象
    - ```js
      module.exports = {
        title: 'Levi',
        description: 'God so Love the world'
      }
    - 启动项目可以看到页面的页头包含一个标题和一个搜索框, 标题就是上面的 `title`
      - ![](../image/Snipaste_2022-08-31_21-31-32.png)
    - `VuePress` 内置了机遇 `headers` 的搜索————会自动为所有页面的标题, `h2` 和 `h3` 构建起一个简单的索引
### 应用级别的配置
1. 由于 `VuePress` 是一个标准的 `Vue` 应用, 可以通过创建一个 `.vuepress/enhanceApp.js` 文件来做一些应用级别的配置, 当该文件存在时就会被导入到应用内部. `enhanceApp.js` 应该采用默认暴露的形式暴露一个钩子函数, 这个函数接受一些应用级别属性的对象作为参数. 可以使用这个钩子函数安装一些附加的 `Vue` 插件, 注册全局路由组建或者增加额外的路由钩子等
    - ```js
      export default ({
        Vue, // VuePress 正在使用的 Vue 构造函数
        options, // 附加到根实例的一些选项
        router, // 当前应用的路由实例
        siteData, // 站点元数据
        isServer // 当前应用配置是处于 服务端渲染 或 客户端
      }) => {
        console.log('Vue',Vue)
        console.log('options',options)
        console.log('router',router)
        console.log('siteData',siteData)
        console.log('isServer',isServer)
      }
    - 
    - ![](../image/Snipaste_2022-08-31_21-52-03.png) 
## 静态资源
1. 相对路径
    - 所有的 `Markdown` 文件都会被 `webpack` 编译成 `Vue` 组件, 因此我们可以去且更**倾向于**使用相对路径来引用静态资源
    - 这在 `*.vue` 文件的模板中可以一样工作.
      - 创建 `docs/.vuepress/public/img` 文件夹, 然后在 `docs` 下的 `README.md` 引用图片
      - ```md
        ![](./.vuepress/public/img/sunset.jpg)
      - ![](../image/Snipaste_2022-09-01_09-04-15.png)
    - 除此之外, 使用 `~` 前缀明确指出这是一个 `webpack` 的模板请求
      - 在 `.vuepress/config.js` 中增加别名配置. 注意的是配置文件和 `public` 处于同一目录 
      - ```js
        const path = require('path')

        module.exports = {
          configureWebpack: {
            resolve: {
              alias: {
                '@': path.resolve(__dirname, './public/img')
              }
            }
          }
        }
      - 然后在 `README.md` 文件中引用
      - ```md
        ![](~@/sunset.jpg)
2. 公共文件
    - 如果一些静态资源, 不被引用, 比如 `favicon.ico` 或者 `PWA` 图标, 这种情况下可以将这些资源放在 `.vuepress/public` 中, 最终这些资源被复制到生成的静态文件夹中.
3. 基础路径
    - 如果你的网站被部署到一个非根路径, 需要在 `.vuepress/config.js` 中设置 `base`, 比如, 如果你希望将网络部署到 `https://foo.github.io/bar/` 那么 `base` 的值就应该设置为 `/bar/`(以斜杠开始, 以斜杠结束)
    - 有了基础路径, 如果希望引用一张放在 `.vuepress/public` 中的图片, 就需要使用 `/bar/xxx.png`, `VuePress` 提供了一个内置的 `$withBase` (已经被注入到了 `Vue` 的原型对象)来帮助我们生成正确的路径.
      - ```js
        module.exports = {
          base: '/v1/',
        }
      - ```html
        <img :src="$withBase('/w644.jpeg')" alt="sunset" />
        <img :src="$withBase('/img/sunset.jpg')" alt="sunset" />
      - ![](../image/Snipaste_2022-09-02_07-57-32.png)
      - 一件很奇怪的事情就是, 头天晚上 img 路径下的图片怎么都加载不出来, 第二天早上就好了
4. 最后, 一旦 `base` 路径被设置, 它将会自动地作为前缀插入到 `.vuepress/config.js` 中所有以 `/` 开始的资源路径中
## `Markdown` 扩展
1. `Header Anchors`
    - 所有的标题都会自动地应用 `anchor` 链接, `anchor` 的渲染可以通过 `markdown.anchor` 配置
    - ![](../image/Snipaste_2022-09-02_08-20-15.png)
2. 链接
    - 内部链接
      - 网站内部的链接, 会被转换为 `<router-link>` 用于 `SPA` 导航.
      - 同时, 站内每个文件夹下的 `README.md` 或者 `index.md` 都会被自动编译为 `index.html` 对应的链接将被视为 `/`
      - ```md
        [to dairy](./dairy/README.md)
      - ![](../image/Snipaste_2022-09-02_20-53-48.png)
    - 页面后缀
      - 生成页面和内部链接时, 默认使用 `.html` 作为后缀
      - 可以通过 `markdown.pageSuffix` 自定义配置
    - 外部链接
      - 外部的链接将会被自动被设置为 `target="_blank" rel="noopener noreferrer"`
      - ```md
        [https://cn.bing.com/](https://cn.bing.com/)
      - ![](../image/Snipaste_2022-09-02_20-58-38.png)
3. `Front Matter`
    - `VuePress` 提供了对 `YAML front matter` 开箱即用的支持
    - ```md
      ---
      title: Blogging
      lang: zh-CN
      ---
    - ![](../image/Snipaste_2022-09-02_21-18-07.png)
4. `Emoji`
    - ```md
      :sparkling_heart: :raising_hand_woman:
    - ![](../image/Snipaste_2022-09-02_21-34-12.png)
    - 可以在 [这个列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json) 找到所有可用的 `Emoji`
5. 目录
    - ```md
      [[toc]]
      # ❤️
      ## 😄
      ### 🀄️
      ## 🌹
    - ![](../image/Snipaste_2022-09-03_10-20-43.png)
    - 📕如果只有一级标题的话, 是不会展示目录结构的, 如果想要展示一级标题或者自定义展示标题, 可以在 config.js 中增加配置
      - ```js
        module.exports = {
          markdown: {
            toc: {
              includeLevel: [1, 2, 3, 4, 5]
            }
          }
        }
      - ![](../image/Snipaste_2022-09-03_10-56-08.png)
6. 自定义容器
    - ```md
      ::: tip
      这是提示
      :::

      ::: warning
      这是警告
      :::

      ::: danger
      这是危险
      :::

      ::: details
      让我猜猜你是属
      :::
    - ![](../image/Snipaste_2022-09-03_10-26-36.png)
    - 也可以自定义块中的标题
    - ```md
      ::: danger 禁止通行
      这是危险
      :::

      ::: details 点击查看细节
      让我猜猜你是属
      :::
    - ![](../image/Snipaste_2022-09-03_10-28-50.png)
7. 代码块中的行高亮
    - 单行高亮
      - ```md
        ``` js {4}
        export default {
          data () {
            return {
              msg: 'Highlighted!'
            }
          }
        }
        ```
      - ![](../image/Snipaste_2022-09-03_10-46-32.png)
    - 行数区间高亮
      - ```md
        ``` js{6-7}
        export default {
          data () {
            return {
              msg: `123!
              This line isn't 345,
              but this and the next 2 are.`,
              motd: 'VuePress is awesome',
              lorem: 'ipsum',
            }
          }
        }
        ```
      - ![](../image/Snipaste_2022-09-03_10-56-57.png)
    - 多个单行高亮
      - 📕注意多个逗号之间不要有空格
      - ```md
        ``` js{1,4,6}
        export default {
          data () {
            return {
              msg: `123!
              This line isn't 345,
              but this and the next 2 are.`,
              motd: 'VuePress is awesome',
              lorem: 'ipsum',
            }
          }
        }
        ```
      - ![](../image/Snipaste_2022-09-03_10-49-48.png)
    - 上面的集中组合
      - ```md
        ``` js{1,4,6-8}
        export default {
          data () {
            return {
              msg: `123!
              This line isn't 345,
              but this and the next 2 are.`,
              motd: 'VuePress is awesome',
              lorem: 'ipsum',
            }
          }
        }
        ```
      - ![](../image/Snipaste_2022-09-03_10-51-06.png)
8. 代码块行号
    - ```js
      module.exports = {
        markdown: {
          lineNumbers: true
        }
      }
    - ![](../image/Snipaste_2022-09-03_10-53-21.png)
## 主题
### 默认主题配置
1. 首页
    - ```md
      ---
      home: true
      heroImage: ./w644.jpeg
      heroText: I'm Levi
      tagline: null
      actionText: visit now →
      actionLink: ./diary/README.md
      features:
      - title: Front-end Developer
        details: It's interesting.
      - title: Christian
        details: Jesus ❤️ You.
      - title: Blogger
        details: I write blogs.
      footer: Copyright © 2022-present Levi
      ---
    - ![](../image/Snipaste_2022-09-03_16-22-20.png)
    - 📕需要注意的是, 官网说要在根级 `README.md` 使用, 但实际上应该是 `docs` 下的 `README.md`
    - 另外, 图片中的链接应该放在 `docs/.vuepress/public` 下面, 因为打包完成后, `public` 目录下文件会原封不动地移动到 `dist` 目录下, 而 `docs/REAMDME.md` 会被打包为 `dist/index.html`, 这样他们就成为了同级目录下
    - `YAML front matter` 之后的额外内容将会以普通的 `markdown` 被渲染, 并被插入到 `features` 的后面
2. 富文本 `footer`
    - 使用 `markdown` 的 `Slot` 语法设置富文本 `footer`
    - ```md
      ::: slot footer
      Copyright © 2022-present [Levi](https://wangyuanjian.github.io/)
      :::
    - ![](../image/Snipaste_2022-09-03_16-45-44.png)
### 导航栏
1. 导航栏`logo`
    - 通过 `themeConfig.logo` 增加导航栏 `logo`, `logo` 可以放在 `.vuepress/public`
    - ```js
      module.exports = {
        themeConfig: {
          logo: 'favicon.png'
        }
      }
    - ![](../image/Snipaste_2022-09-03_17-01-26.png)
    - 📕同样注意的是, 目前将 `logo` 位置是 `./vuepress/public/favicon.png`, 打包之后 `logo` 就在 `dist` 的根目录哦
    - ![](../image/Snipaste_2022-09-03_17-04-16.png)
2. 导航栏链接
    - 通过 `themeConfig.nav` 增加一些导航栏链接
      - ```js
        themeConfig: {
          nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/dairy/' },
            { text: 'Github', link: 'https://github.com/wangyuanjian' },
          ]
        }
      - ![](../image/Snipaste_2022-09-04_21-16-16.png)
    - 外部链接 `<a>` 标签的特性将默认包含 `target="_blank" rel="noopener noreferrer"` 我们可以提供 `target` 和 `rel`, 它们将被作为特性被增加到 `<a>` 上
      - ```js
        nav: [
          { text: 'Home', link: '/', target: '_blank', rel: 'noopener noreferrer' },
        ]
    - 当提供了一个 `items` 数组而不是一个单一的 `link` 时, 它将显示为一个下拉列表
      - ```js
        nav: [
          { text: 'Home', link: '/', target: '_blank', rel: 'noopener noreferrer' },
          { text: 'Guide', link: '/dairy/' },
          { 
            text: 'My',
            ariaLabel: 'My',
            items: [
              { text: 'Github', link: 'https://github.com/wangyuanjian' },
              { text: 'CSDN', link: 'https://blog.csdn.net/broken_promise' },
              { text: '掘金', link: 'https://juejin.cn/user/3227821868068184' },
            ]
          },
        ]
      - ![](../image/Snipaste_2022-09-05_21-20-10.png)
3. 禁用导航栏
    - 使用 `themeConfig.navbar` 禁用页面所有的导航栏
      - ```js
        themeConfig: {
          logo: 'favicon.png',
          navbar: false
        }
      - ![](../image/Snipaste_2022-09-05_21-23-44.png)
    - 或者使用 `YAML front matter` 来禁用某个指定页面的导航栏
      - ```md
        ---
        navbar: false
        ---
      - ![](../image/Snipaste_2022-09-05_21-29-16.png)
### 侧边栏
1. 想要使侧边栏生效, 需要配置 `themeConfig.sidebar`.
    - 基本配置就是一个包含了多个链接的数组. 可以省略 `.md` 拓展名, 同时以 `/` 结尾的路径将被视为 `*/README.md`
    - ```js
      themeConfig: {
        sidebar: [
          '/',
          '/dairy/'
        ]
      }
    - ![](../image/Snipaste_2022-09-06_09-00-39.png)
    - 当然, 也可以自定义菜单名字
    - ```js
      sidebar: [
        '/',
        ['/dairy/', '日记']
      ]
    - ![](../image/Snipaste_2022-09-06_09-01-50.png)
2. 嵌套的标题链接
    - 默认情况下, 侧边栏会自动地显示由当前页面的标题组成的链接, 并按照页面本身的结构进行嵌套. 默认深度是 `1`, 表示将提取到 `h2` 的标题. 设置成 `0` 将会禁用标题链接. 同时最大深度为 `2`, 表示将同时提取到 `h2` 和 `h3` 标题
      - ![](../image/Snipaste_2022-09-06_21-12-39.png)
    - 也可以使用 YAML front matter 来为某个页面重写这个值
      - ```md
        ---
        sidebarDepth: 2
        ---
      - ![](../image/Snipaste_2022-09-06_21-14-16.png)
    - 默认情况下, 侧边栏只会显示当前活动页面的标题组成的链接, 可以将 `themeConfig.displayAllHeaders` 设置为 `true` 来显示所有页面的标题链接
      - ```js
        themeConfig: {
          logo: 'favicon.png',
          displayAllHeaders: true,
        }
      - 📕但是可以看到的是原本应该展示的 `h3` 标题被折叠了起来
      - ![](../image/Snipaste_2022-09-06_21-34-31.png)
    - 活动的标题链接
      - 默认情况下, 当用户通过滚动查看页面不同的部分时, 嵌套的标题链接和 `URL` 中的 `Hash` 值会实时更新, 这个行为可以通过 `themeConfig.activeHeaderLinks` 配置禁用
      - ```js
        themeConfig: {
          activeHeaderLinks: false,
        }
      - ![](../image/)
      - 📕当禁用此选项时, 此功能对应的脚本将不会被加载
3. 侧边栏分组
    - 可以使用对象将侧边栏划分成多个组
    - ```js
      sidebar: [
        {
          title: '早上吃什么?',
          children: [
            ['/dairy/', '日记'],
          ]
        },
        {
          title: '中午吃东北菜',
          children: [
            ['/dairy/milk', '牛奶'],
          ]
        }
      ]
    - ![](../image/Snipaste_2022-09-07_08-48-27.png)
    - 设置侧边栏自动展开(可选)
      - ```js
        sidebar: [
          {
            title: '中午吃东北菜',
            children: [
              ['/dairy/milk', '牛奶'],
            ],
            collapsable: false
          }
        ]
      - ![](../image/Snipaste_2022-09-07_08-52-43.png)
    - 设置目录深度(可选)
      - 
- ```js

- ```md



- ![](../image/)
- ![](../image/)
- ![](../image/)
- ![](../image/)
- ![](../image/)