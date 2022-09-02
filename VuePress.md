<!-- TOC -->

- [VuePress 静态网站生成器](#vuepress-%E9%9D%99%E6%80%81%E7%BD%91%E7%AB%99%E7%94%9F%E6%88%90%E5%99%A8)
  - [快速上手](#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)
  - [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
  - [基本配置](#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)
    - [配置文件](#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
    - [应用级别的配置](#%E5%BA%94%E7%94%A8%E7%BA%A7%E5%88%AB%E7%9A%84%E9%85%8D%E7%BD%AE)
  - [静态资源](#%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90)
  - [Markdown 扩展](#markdown-%E6%89%A9%E5%B1%95)

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
![](../image/)
![](../image/)
![](../image/)
![](../image/)