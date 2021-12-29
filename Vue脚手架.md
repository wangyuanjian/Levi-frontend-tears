<!-- TOC -->

- [Vue cli 脚手架](#vue-cli-脚手架)
  - [安装与项目分析](#安装与项目分析)
  - [render 函数](#render-函数)
  - [修改脚手架默认配置](#修改脚手架默认配置)

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
    - 报错的内容: 我们使用的 `Vue` 版本是不包含模板编译器的运行时版本, 所以不能使用 `template` 配置项. 并且报错信息给我们指明了两条路, 要么将模板放入 `render` 函数提前编译, 要么使用包含编译器的 `Vue` 版本.
      - 🐖注意, 我们说 render 是在创建 vm 时候使用的, 至于单文件组件中(`.vue`文件)的 `<template></template>` 部分, Vue 单独引入了 `vue-template-compiler` 进行解析编译
      - ![](../image/Snipaste_2021-12-28_20-47-10.png)
2. 如果我们在 `import Vue from 'vue'` 中摁住 `Ctrl` 并点击 `vue`, 就可以直接进入 `vue` 所在
    - ![](../image/Snipaste_2021-12-27_22-32-39.png)
    - 在 `package.json` 中, `module` 指明了要进入的 `js` 文件(`esm`: `es module`)
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
    - 为什么要使用阉割版的 `Vue`? 因为完整版的 `vue.js` 有很大一部分是模板解析器. 而且我们使用 `webpack` `build` 生成的 `html`, `js`, `css` 之后, 就不再需要模板解析器了, 使用阉割版的可以减少打包的 `js` 文件体积
3. `render`
    - 是一个函数. 而且这个函数必须有返回值, 且接收一个函数作为参数. 参数函数的名字是 `createElement`
    - 虚拟 `DOM`
      - `Vue` 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 `DOM`.
      - `createElement` 返回的不是一个实际的 `DOM` 元素, 更准确的是 `createNodeDescription`, `createNodeDescription` 告诉 `Vue` 页面上需要渲染什么样的节点包括其子节点的描述信息. 我们将这样的节点称为`虚拟节点(virtual node), VNode`, `虚拟 DOM` 是我们对由 `Vue` 组件树建立起来的整个 `VNode` 树的称呼
4. `createElement`
    - 这个函数接收三个参数
      - 一个 `HTML` 标签名或组件选项对象
      - 一个与模板中 `attribute` 对应的数据对象
        - 比如, 我们可以指定原生的 `style`, `class`, `id` 这些属性, 也可以指定 `Vue` 中独有的 `key`, `ref` 等
      - 子级虚拟节点 (`VNodes`)
        - 就是子节点, 但是说白了, 子节点可以是文本节点, 也可以是由 `createElement` 创建的节点
    - 下面演示一个简单的例子, 创建一个 `h1` 节点, 设置背景色为 `skyblue`, 设置子元素为文本节点 `Hello, World`
      - ```js
        render(createElemet) {
          let h1Style = {
            backgroundColor: 'skyblue'
          }
          let vNode = createElemet('h1', {style: h1Style}, 'Hello, World');
          console.log(vNode);
          return vNode;
        }
      - ![](../image/Snipaste_2021-12-28_20-19-12.png)
      - ![](../image/Snipaste_2021-12-28_20-20-23.png)
    - 下面再写一个例子, 这个例子使用 `createElemet` 创建子元素. 创建 `ul` 的子元素 `li`, 并且给每个 `li` 增加点击事件
      - ```js
        render(createElemet) {
          let personList = ['zhang', 'li', 'wang'];
          let vNode = createElemet('ul', {},
            personList.map(name => createElemet('li', {
              on: {
                click: function (event) { console.log(event.target.textContent); }
              }
            }, name))
          );
          return vNode;
        }
      - ![](../image/Snipaste_2021-12-28_20-26-33.png)
    - 如果我们想创建组件, 那么第一个参数就传组件即可, 就像
      - ```js
        render: h => h(App),
      - 🐖注意: 上面使用了 `lambda` 表达式的简写形式
### 修改脚手架默认配置
1. Vue 将所有重要的配置文件都隐藏了. 输入 `vue inspect > output.js` 就可以将所有配置信息输出到 `output.js`. 输入的内容是一个对象, 所以在 js 文件中会飘红报错, 手动在对象前加 `const a = ` 就行了.
    - ![](../image/Snipaste_2021-12-28_22-26-00.png)
    - 从上图我们就知道入口文件究竟是哪个了!
    - 究竟哪些配置可以修改, [☞看这里](https://cli.vuejs.org/zh/config/)
2. `vue.config.js`
    - 是一个可选的配置文件， 如果项目的根目录(和 `package.json` 同级) 存在这个文件, 那么它将会被 `@vue/cli-service` 自动加载. 这个文件应该导出一个包含了选项的对象
      - `例1`: 修改入口文件地址
      - ![](../image/Snipaste_2021-12-29_22-46-30.png)






















      