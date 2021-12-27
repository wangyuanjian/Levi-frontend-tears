<!-- TOC -->

- [Vue cli 脚手架](#vue-cli-脚手架)
  - [安装与项目分析](#安装与项目分析)
  - [render 函数](#render-函数)

<!-- /TOC -->

## Vue cli 脚手架
> cli: Command Line Interface
### 安装与项目分析
1. `Vue Cli` 是 `Vue` 官方提供的标准化开发工具.
2. 安装具体步骤
    - 全局安装 `@vue/cli`
      - ```shell
        npm install @vue/cli -g
      - 如果以前安装过, 就先卸载吧
      - ```shell
        npm uninstall vue-cli -g
    - 安装完后, 关闭 `cmd` 窗口, 然后再打开 `cmd`, 执行命令
      - ```shell
        vue -V
      - ![](../image/Snipaste_2021-12-26_10-02-29.png)
3. 创建项目
    - 切换到自己要创建项目的目录, 然后执行
      - ```shell
        vue create vue_test(项目名)
      - 如果执行完这个命令后窗口一动不动, 摁一下回车😅
    - 选择默认的 `Vue 2`
      - ![](../image/Snipaste_2021-12-26_10-10-21.png)
    - 安装完成后, 进入安装的项目
      - ```shell
        cd vue_test
    - 启动项目
      - ```shel
        npm run serve
    - 进入 `cmd` 显示的网址
      - ![](../image/Snipaste_2021-12-26_10-20-01.png)
4. 项目结构
    - ![](../image/Snipaste_2021-12-26_10-25-26.png)
    - `babel.config.js`: 不需要修改
    - `package.json`: npm 项目都有的文件, 记录项目的一些信息
    - `package-lock.json`: 包版本文件. 里面记录了各个包和对应依赖的版本, 下载地址等, 方便再次安装到指定版本等.
    - `readme.md`: 项目说明
5. `src`
    - `main.js`: 该文件是整个项目的入口文件 
    - `assets`: 存放静态资源(图片等)文件夹
    - `components`: 所有自己写的组件都要放在这个目录
6. `public`: 打包后的文件
    - `favicon.ico`: 页签图标
    - `index.html`: 主页面
      - ```html
        <!-- 针对 IE 浏览器的特殊配置, 意在告诉IE浏览器以最高渲染级别渲染页面 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
      - ```html
        <!-- 开启移动端的理想视口 -->
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
### render 函数
1. 正常情况下, 我们会使用没有 render 的配置项. 如下, 但是会报错
    - ```js
      new Vue({
        // render: h => h(App),
        template: `
          <div>
            <App></App>
          </div>
        `
      }).$mount('#app')
    - ![](../image/Snipaste_2021-12-27_22-23-18.png)
    - 报错的内容: 我们使用的 `Vue` 版本是不包含模板编译器的运行时版本. 并且报错信息给我们指明了两条路, 要么将模板放入 `render` 函数提前编译, 要么使用包含编译器的 `Vue` 版本
2. 如果我们在 `import Vue from 'vue'` 中摁住 `Ctrl` 并点击 `vue`, 就可以直接进入 `vue` 所在
    - ![](../image/Snipaste_2021-12-27_22-32-39.png)
    - 在 `package.json` 中, `module` 指明了要进入的 `js` 文件
    - ![](../image/Snipaste_2021-12-27_22-35-05.png)
    - 所以我们可以在引入 vue 时指定引入的版本, 从而解决上面的问题, 就是第二个方法
    - ```js
      import Vue from 'vue/dist/vue.js'

      Vue.config.productionTip = false

      new Vue({
        template: `
          <div>
            <h1>你好</h1>
          </div>
        `
      }).$mount('#app')
    - 


























      