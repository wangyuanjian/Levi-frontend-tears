<!-- TOC -->

- [VuePress 静态网站生成器](#vuepress-%E9%9D%99%E6%80%81%E7%BD%91%E7%AB%99%E7%94%9F%E6%88%90%E5%99%A8)
  - [快速上手](#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)
  - [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)

<!-- /TOC -->

# VuePress 静态网站生成器

## 快速上手
1. 安装
    - 创建目录 `vuepress_test` 并进入, 初始化项目
      - ```
        yarn init
    - 将 VuePress 安装为本地依赖(不推荐使用全局安装)
      - ```
        yarn add -D vuepress
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
    - `docs/.vuepress/templates`: 存储 HTML 模板文件。
    - `docs/.vuepress/templates/dev.html`: 用于开发环境的 `HTML` 模板文件。
    - `docs/.vuepress/templates/ssr.html`: 构建时基于 `Vue SSR` 的 `HTML` 模板文件。
    - `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml。`
    - `docs/.vuepress/enhanceApp.js`: 客户端应用的增强

![](../image/)
![](../image/)  
![](../image/)