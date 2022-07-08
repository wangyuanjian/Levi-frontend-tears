<!-- TOC -->

- [Vue cli 脚手架](#vue-cli-脚手架)
  - [安装与项目分析](#安装与项目分析)
  - [render 函数](#render-函数)
  - [修改脚手架默认配置](#修改脚手架默认配置)
- [ref 属性](#ref-属性)
- [props 属性](#props-属性)
  - [简单接收](#简单接收)
  - [对象接收](#对象接收)
  - [完整接收](#完整接收)
  - [其他注意点](#其他注意点)
- [混入(Mixin)](#混入mixin)
- [插件](#插件)
  - [开发插件](#开发插件)
  - [使用插件](#使用插件)
- [scoped](#scoped)
- [组件自定义事件](#组件自定义事件)
  - [`.sync`](#sync)
- [全局事件总线](#全局事件总线)
- [消息订阅与发布](#消息订阅与发布)
- [`$nextTick`](#nexttick)
- [过渡与动画](#过渡与动画)
  - [单元素/组件的过渡](#单元素组件的过渡)
  - [多个元素的过渡](#多个元素的过渡)
  - [集成第三方动画库(animate.css)](#集成第三方动画库animatecss)
- [配置代理](#配置代理)
  - [使用 axios](#使用-axios)
  - [前端解决跨域](#前端解决跨域)
- [小 tips💡](#小-tips💡)
- [插槽](#插槽)
  - [默认插槽](#默认插槽)
  - [具名插槽](#具名插槽)
  - [作用域插槽](#作用域插槽)
- [Vuex](#vuex)
  - [简介与安装](#简介与安装)
  - [求和案例](#求和案例)
  - [getters](#getters)
  - [`mapState` & `mapGetters`](#mapstate--mapgetters)
  - [`mapActions` 👫 `mapMutations`](#mapactions-👫-mapmutations)
  - [模块化编码(Module)](#模块化编码module)
- [路由(vue-router)](#路由vue-router)
  - [基础](#基础)
  - [使用路由](#使用路由)
  - [声明式路由](#声明式路由)
  - [嵌套路由](#嵌套路由)
  - [路由传参](#路由传参)
    - [query 方式](#query-方式)
    - [params 方式](#params-方式)
  - [命名路由](#命名路由)
  - [路由 Props](#路由-props)
  - [<router-link>](#router-link)
  - [编程式路由导航](#编程式路由导航)
  - [缓存路由组件](#缓存路由组件)
  - [两个新的生命周期钩子 `activated` 和 `deactivated`](#两个新的生命周期钩子-activated-和-deactivated)
  - [导航路由守卫](#导航路由守卫)
    - [全局前置守卫](#全局前置守卫)
    - [全局后置守卫](#全局后置守卫)
    - [路由独享的守卫](#路由独享的守卫)
    - [组件内的守卫](#组件内的守卫)
    - [全局解析守卫](#全局解析守卫)
    - [完整的导航解析流程](#完整的导航解析流程)
  - [路由元信息](#路由元信息)
  - [HTML5 History 模式](#html5-history-模式)
  - [路由懒加载](#路由懒加载)

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
## ref 属性
1. 被用来给元素或子组件注册引用信息.
    - 引用信息将会注册在父组件的 `$refs` 对象上. 如果使用在普通 DOM 上, 引用信息就会注册在当期组件上.
    - 如果在普通的 `DOM` 元素上使用, 引用指向的就是 `DOM` 元素; 如果用在子组件上, 引用就指向`组件实例`
2. `DOM` 元素上使用
    - ```html
      <div>
        <h2>学校名称: {{schoolName}}</h2>
        <h2 ref="addressRef">学校地址: {{address}}</h2>
        <button @click="showName">showName</button>
        <button @click="showDOM">show DOM</button>
      </div>
    - ```js
      showDOM() {
        console.log(this.$refs.addressRef);
      }
    - ![](../image/Snipaste_2021-12-30_22-32-30.png)
    - 实际上, `ref` 属性并没有转换为 `HTML` 标准的 `attribute` 显示在页面上哦
    - ![](../image/Snipaste_2021-12-30_22-37-20.png)
3. `组件` 上使用
    - ```html
      <Student ref="student"></Student>
      <button @click="showComponentRef">showComponentRef</button>
    - ```js
      showComponentRef() {
        console.log(this.$refs.student);
      }
    - ![](../image/Snipaste_2021-12-30_22-35-12.png)
4. `$refs` 只会在组件渲染完成之后生效, 并且它们不是响应式的. 这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在`模板`或`计算属性`中访问 `$refs`
## props 属性
1. 需求: 同样使用 Student 组件, 但是展示的姓名和地址. 这里要做到组件的复用, 相同组件结构相同, 但是使用组件时传递的数据不同
### 简单接收
1. `props` 为数组
    - 在使用组件标签时, 加上自定义的 `attribute`
    - ```html
      <Student schoolName="TSU" address="beijing" age="100"></Student>
      <Student schoolName="HKU" address="Hong Kong" age="100"></Student>
    - 使用全新的配置项 `props` 用来接收传入的数据
    - ```js
      {
        props: ['schoolName', 'address', 'age'],
        name: 'Student',
        data() {
          return {
            msg: '我是一个尚硅谷学生'
          }
        },
      }
    - ![](../image/Snipaste_2021-12-31_20-41-34.png)
2. 传入一个 `Number` 值
    - 如果我们在使用传入的 `age` 时将其 `+1`, 其结果并不会变成 `101`, 而是会变成 `1001`, 因为这时传入的 `100` 是一个字符串
    - 如果想要传入一个数字, 就需要使用 `v-bind` 告诉 `Vue` 传递的是一个 `js` 表达式, 而不是字符串
    - ```html
      <Student schoolName="TSU" address="beijing" age="100"></Student>
      <!-- 正确传递数字 -->
      <Student schoolName="HKU" address="Hong Kong" :age="100"></Student>`
    - ```html
      <h2>学校历史: {{age+1}}</h2>
    - ![](../image/Snipaste_2021-12-31_20-44-46.png)
3. 传入一个 `Boolean` 值
    - 如果 `prop` 没有值, 表示值为 `true`
    - 如果 `prop` 有值, 仍需要使用 `v-bind` 表示传入的是表达式而不是字符串
    - ```html
      <!-- 传递boolean -->
      <Student schoolName="TSU" inHK></Student>
      <Student schoolName="HKU" :inHK="false"></Student>
    - 🐖注意: 如果第一种写法想要生效, 不能使用数组类型的 `props`, 必须指定接收的 `prop` 类型. 否则接收到的数据就是 `""(空串)`
    - ```js
      props: {
        schoolName: String,
        address: String, 
        age: Number,
        inHK: Boolean
      },
4. 传入一个 `Array` 值
    - 只能使用 `v-bind`
    - ```html
      <Student schoolName="TSU" inHK :freeOpenDay="['Sat', 'Sun']"></Student>
    - ```js
      props: ['schoolName', 'address', 'age', 'inHK', `freeOpenDay`],
    - ```html
      <h2>免费参观日: {{freeOpenDay[0]}}</h2>
5. 传入一个对象
    - 只能使用 `v-bind`
    - ```html
      <Student schoolName="TSU" inHK :leader="{name: 'Peter', age: 19}"></Student>
    - ```js
      props: ['schoolName', 'address', 'age', 'inHK', `freeOpenDay`, 'leader']
    - ```html
      <h2>校长: {{leader.name}}</h2>
    - ![](../image/Snipaste_2021-12-31_21-23-53.png)
    - 我怀疑下面的源码是导致这样的原因, 但是我不很确定
    - ![](../image/Snipaste_2022-01-01_11-10-22.png)
6. 传入一个对象所有属性
    - 只能使用 `v-bind`
    - 我们提前定义一个对象
    - ```js
      data() {
        return {
          subjects: {
            math: 'good',
            cs: 'best'
          }
        }
      }
    - ```html
      <Student schoolName="TSU" inHK :subjects="subjects"></Student>
    - ```js
      props: ['schoolName', 'address', 'age', 'inHK', `freeOpenDay`, 'leader', 'subjects'],
    - ```html
      <h2>科目: {{Object.keys(subjects)}}</h2>
    - ![](../image/Snipaste_2021-12-31_21-28-13.png)
7. 传入一个 `Function` 函数 - `data` 定义
    - 当然也要用 `v-bind`. 我们要先定义一个在 `data` 函数
    - ```js
      data() {
        return {
          sayName: function() {
            alert(this.msg);
            return "hhh";
          },
        };
      }
    - ```html
      <Student schoolName="TSU" inHK :func1="sayName"></Student>
    - 接收函数
    - ```html
      <!-- <h2>科目: {{Object.keys(subjects)}}</h2> -->
      <h2>执行了一个函数: {{func1()}}</h2>
    - ```js
      props: ['schoolName', 'address', 'age', 'inHK', `freeOpenDay`, 'leader', 'subjects', 'func1'],
    - 🐖注意: 我没有向组件传递 `subjects` 参数, 所以我在组件模板中注掉那一行, 不然就会报错
    - ![](../image/Snipaste_2022-01-01_09-59-03.png)
8. 传入一个 `Function` 函数 - `methods` 定义
    - 如果我们需要在 `methods` 定义一个函数, 那么写法和 `data` 中定义有点点不同
    - 第一, 定义时必须有返回值
    - ```js
      sayName() {
        return function() {
          alert(this.msg);
          return "hhh";
        };
      }
    - 第二, 传参时, 必须显示调用该方法, 即使用函数调用运算符 `()`
    - ```js
      <Student schoolName="TSU" inHK :func1="sayName()"></Student>
    - 首先, 这样一定是对的, 看截图
    - ![](../image/Snipaste_2022-01-01_10-26-46.png)
    - 但是, 如果你说, `sayName` 本身就是一个方法, 那我完全不需要 `return`, 直接传 `sayName` 进去, 就像下面的写法
    - ```js
      sayName() {
        console.dir(this);
        alert(this.msg);
        return "hhh";
      },
    - ```html
      <Student schoolName="TSU" inHK :func1="sayName"></Student>
    - 那真是不好意思😅, 压根没有拿到 `this.msg` 的值
    - ![](../image/Snipaste_2022-01-01_10-28-49.png)
    - 为什么会这样呢? 我们可以打印一下两种方法中 `this` 的值究竟是什么🤨. 显然第一种写法 `this` 是子组件实例对象, 而第二种写法 `this` 是父组件实例对象.
    - ![](../image/Snipaste_2022-01-01_10-32-33.png)
### 对象接收
1. `props` 为对象
    - ```js
      props: {
        schoolName: String,
        address: String, 
        age: Number,
        inHK: Boolean,
        freeOpenDay: Array,
        leader: Object,
        subjects: Object
      }
### 完整接收
1. 完整接收时, 每个属性都可以写如下的配置项
    - `type`: 可以时原生构造函数中的一种, `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol` 
    - `default`: 为该 `prop` 指定一个默认值. 如果该 `prop` 没有被传入, 则换做用这个值. 对象或数组的默认值必须从一个工厂函数返回.
    - `required`: 定义该 `prop` 是否是必填项. 在非生产环境中, 如果这个值为 `truthy` 且该 `prop` 没有被传入的, 则一个控制台警告将会被抛出.
    - `validator`: 自定义验证函数会将该 `prop` 的值作为唯一的参数代入. 在非生产环境下, 如果该函数返回一个 `falsy` 的值 (也就是验证失败), 一个控制台警告将会被抛出. 
2. 看看改写后的例子
    - ```js
      props: {
        schoolName: {
          type: String,
          required: true
        },
        address: {
          type: String,
        },
        age: {
          type: Number,
        },
        inHK: {
          type: Boolean,
          default: false
        },
        freeOpenDay: {
          type: Array,
          validator: function(value) {
            return value !== null && value.length <= 1
          }
        },
        leader: {
          type: Object
        },
        func1: {
          type: Function
        }
      }
    - ```html
      <Student schoolName="TSU" inHK :func1="sayName()" :freeOpenDay="['Sat', 'Sun', 'Mon']"></Student>
    - ![](../image/Snipaste_2022-01-01_11-23-45.png)
3. 多个可能的类型.
    - 如果 `prop` 既可以是 `String`, 也可以是 `Number`, 那么可以用数组指定该 `prop`
    - ```js
      schoolName: {
        type: [String, Number],
        required: true
      }
4. 对象或数组的默认值必须从一个工厂函数获取
    - ```js
      subjects: {
        type: Object,
        default: function () {
          return {
            history: 'good',
            physics: 'not bad'
          }
        }
      }
### 其他注意点
1. 如果我们接收一个没有传入的 `prop`, 那么其值将为 `undefined`
2. 不允许修改传入的 `prop`, 否则报错
    - ![](../image/Snipaste_2022-01-01_13-20-58.png)- 大意就是, 避免直接修改 `prop` 因为父组件重新渲染的时候更改的值将会被覆盖. 建议我们使用一个基于 `prop` 的计算属性或者 `data`
    - 所以, 划重点❗❗❗`Vue` 对 `prop` 的处理在 `data` 之前, 所以 `data` 可以依赖 `prop` 的数据, 反之不行❗❗❗
3. 不能使用 `key`, `ref` 等 `Vue` 特殊属性
    - 如果要看到下面的报错, 不仅要传递 `prop`, 而且在 `props` 中要接收
    - ![](../image/Snipaste_2022-01-01_13-38-54.png)
4. `prop` 的大小写
    - `HTML` 中的 `attribute` 时大小写不敏感的, 所以浏览器会把所有大写字符解释为小写字符(这句话的意思并不代表我们的传递数据的 `prop` 也是这样, 我们怎样传也必须怎样接). 如果我们在传递 `prop` 时使用 `kebab-cas`e (短横线分隔命名), 那么接收时就要使用 `camelCase` 驼峰命名.
    - ```html
      <Student is-famous='true'></Student>
    - ```js
      props: { isFamous: String }
5. 数组和对象通过引用传入的, 所以对一个数组或对象类型的 prop 来说, 在子组件中改变这个对象或数组本身 **`将会`** 影响父组件的状态哦!!!
    - ```js
      <button @click="subjects.math = 'kkk'">修改父组件传入的 Object</button>
    - 上面的修改是可以的, 如果我们写成下面这样, 则不会生效
    - ```js
      <button @click="subjects = {a: 1}">修改父组件传入的 Object</button>
    - 为什么下面的不会生效呢? 我的理解是, 因为 prop 本身没有响应式, 但是其属性有响应式 // todo
    - ![](../image/Snipaste_2022-01-02_08-34-28.png)
## 混入(Mixin)
1. 混入 (`mixin`) 提供了一种非常灵活的方式, 来分发 `Vue` 组件中的可复用功能. 一个混入对象可以包含任意组件选项
    - 比如两个组件都使用了打印名称这个方法. 为了代码复用, 不希望一个方法出现多次
    - ![](../image/Snipaste_2022-01-02_09-13-51.png)
2. 使用混入
    - 创建 `mixin.js` 并暴露混入对象
    - ```js
      export const mixin = {
        methods: {
          showAddress() {
            console.log(this.address);
          }
        },
      }
    - 分别在需要的组件中引入并配置该对象. 🐖注意, 这里使用了全新的配置项 `mixins`
    - ```js
      import {mixin} from '../mixin.js'
      export default {
        name: 'Student',
        data() {
          return {
            studentName: 'Wang',
            address: 'CHINA'
          }
        },
        mixins: [mixin]
      }
    - 
3. 除了可以配置 `methods`, 我们还可以配置 `data`, 生命周期钩子等等. 当在 `mixin` 的配置和组件配置冲突时, 会出现不同的解决策略
    - `data` 对象在内部会进行递归合并，并在发生冲突时以组件数据优先
      - ```js
        import {mixin, mixinData} from '../mixin.js'
        export default {
          name: 'Student',
          data() {
            return {
              studentName: 'Wang',
              address: 'CHINA',
              x: 2
            }
          },
          mixins: [mixin, mixinData]
        }
      - ```js
        export const mixin = {
          methods: {
            showAddress() {
              console.log(this.address);
            }
          },
        }
        export const mixinData = {
          data() {
            return {
              x: 1
            }
          }
        }
      - ![](../image/Snipaste_2022-01-02_09-31-36.png)
      - 在这个例子中, `mixin.js` 暴露了两个对象哦! 而且最终的结果以组件数据有限
    - 同名`钩子函数`将被合并为一个数组, 因此都将被调用. 另外, 混入对象的钩子将在组件自身钩子之前调用.
      - ![](../image/Snipaste_2022-01-02_17-27-47.png)
    - 值为对象的选项, 如 `methods`, `components` 和 `directives`, 将被合并为同一个对象. 两个对象键名冲突时, 取`组件对象`的键值对.
5. 全局混入
    - 混入也可以全局注册. 一旦使用全局混入, 它将影响`每一个`之后创建的 Vue 实例 (包括第三方组件)
    - 使用步骤
      - `import` 混入, 并使用新的 API: `Vue.mixin()`
      - ```js
        import {mixin, mixinData} from './mixin'
        Vue.mixin(mixin);
        Vue.mixin(mixinData);
## 插件
1. 插件通常为 `Vue` 添加全局功能, 一般有以下功能范围
    - 添加全局方法或 `property`
    - 添加全局资源: 指令/过滤器/过渡等
    - 通过全局混入添加组件
    - 添加 `Vue` 实例方法, 通过把它们添加到 `Vue.prototype` 上实现
    - 一个库, 提供自己的 `API`, 同时提供上面提到的一个或多个功能
### 开发插件
1. `Vue` 的插件应该暴露一个 `install` 方法, 这个方法的第一个参数是 `Vue` 构造器, 第二个是一个可选的对象
    - 创建 `plugin.js`
    - ```js
      export default {
        install(Vue, options) {
          // 1. 添加全局方法 或 property
          Vue.myGlobalMethod = function() {

          } 
          // 2. 添加全局资源
          Vue.directive('my-directive', {
            bind(el, binding, vnode, oldVnode) {

            }
          })
          // 3. 注入组件选项
          Vue.mixin({
            data() {
              return {
                csl: 'hahah'
              }
            }
          })
          // 4. 添加实例方法
          Vue.prototype.$myMethod = function (methodOptions) {
            
          }
        }
      }
### 使用插件
1. 通过全局方法 `Vue.use()` 使用插件, 应该在 `new Vue()` 之前完成
    - ```js
      import plugin from './plugin'
      Vue.use(plugin);
      // Vue.use(plugin, {...})
2. `Vue` 会自动阻止多次注册相同插件, 即使多次调用也只会注册一次
3. `Vue` 官方提供的一些插件, 如`vue-router` 在检测到 `Vue` 是可访问的全局变量时会自动调用 `Vue.use()`, 我们应该显示调用 `Vue.use()`
## scoped
1. `<style>` 标签中使用 `scoped` 表示样式仅用于当前 `.vue` 文件, 不会污染其他文件. 如果不加, 样式就会成为全局样式
2. `<style>` 中另一个属性 `lang` 表示样式的语言, 可以指定 `sass` 或者 `less` 或者 `css`. 不写 `lang` 默认就是 `css`
## 组件自定义事件
1. 子组件点击按钮, 将学生名传递给父组件(`props` 方法)
    - APP 组件需要定义方法, 并传给子组件
    - ```js
      methods: {
        getStudentName(name) {
          alert(`APP 组件收到了子组件的学生名: ${name}`)
        }
      }
    - ```html
      <Student :getStudentName="getStudentName"></Student>
    - Student 组件要接收并调用该方法
    - ```js
      props: ['getStudentName'],
      name: 'Student',
      data() {
        return {
          schoolName: 'MIT',
          address: 'USA'
        }
      },
      methods: {
        sendName() {
          this.getStudentName(this.schoolName)
        }
      },
    - ```html
      <button @click="sendName">showName</button>
    - ![](../image/Snipaste_2022-01-08_09-07-46.png)
2. 相同的功能(自定义事件)
    - 使用 `v-on` 指令给组件的实例对象身上绑定名为 `atguigu` 的自定义事件, 该事件被触发时, 自动调用 `getStudentName`
    - ```html
      <Student v-on:atguigu="getStudentName"></Student>
    - 在子组件上, 需要使用 `$emit` 触发自定义事件
    - ```html
      <button @click="sendName1" >showName by $emit</button>
    - ```js
      sendName1() {
        this.$emit('atguigu', this.schoolName)
      }
    - 🐖注意: 这里我们只传递了一个参数, 实际上可以传多个, 定义 `getStudentName` 的时候可以多定义几个
    - 🐖注意: 自定义事件只是给绑定的组件实例对象, 比如下面的代码, 第二个组件实例对象就没有 `atguigu` 方法, 因此就无法触发. 
    - ```html
      <Student :getStudentName="getStudentName" v-on:atguigu="getStudentName"></Student>
      <Student :getStudentName="getStudentName"></Student>
3. `$on()`
    - 除了在组件标签上绑定, 还可以在调用 `API` 绑定自定义事件哦
    - ```html
      <Student ref="student"></Student>
    - ```js
      mounted() {
        this.$refs.student.$on('atguigu', this.getStudentName)
      }
4. `$once` `.once`
    - 如果只希望自定义事件被触发一次, 就可以使用下面的写法
    - ```js
      this.$refs.student1.$once('atguigu', this.getStudentName)
    - 或者
    - ```html
      <Student @atguigu.once="getStudentName"></Student>
5. `$off()`
    - 解绑组件实例对象身上的自定义事件
    - ```js
      unbind() {
        this.$off('atguigu')
      }
    - 如果我们有多个事件呢?
    - ```js
      unbind() {
        this.$off(['atguigu', 'hello'])
      }
    - 解绑所有事件
    - ```js
      unbind() {
        this.$off()
      }
    - 一般在 `beforeDestory()` 钩子中解绑所有自定义事件
    - ```js
      beforeDestroy() {
        this.$off();
      }
6. 一个注意点 `this`
    - 如果我们想给 Student 注册自定义事件, 并在触发事件时将姓名传递给父组件. 可以修改上面的案例
      - ```js
        methods: {
          getStudentName(name) {
            console.log(this);
            alert(`APP 组件收到了子组件的学生名: ${name}`)
            this.studentName = name;
          }
        }
      - ```html
        <Student :getStudentName="getStudentName" @atguigu="getStudentName"></Student>
      - 这样写时没有问题的
    - 但是, 如果使用 `$on` 而且没有在 `methods` 中定义方法, 因为你想说, 反正这个方法只用一次, 不如在传参的时候定义咯, 像下面的写法
      - ```js
        mounted() {
          this.$refs.student.$on('atguigu', function (name) {
            console.log(this);
            alert(`APP 组件收到了子组件的学生名: ${name}`)
            this.studentName = name;
          })
        }
      - ❌失败, 因为这个函数中的 `this` 不再是 `App` 组件实例对象, 而是 `Student` 组件实例对象
      - 但是如果把函数写成箭头函数就没有这个问题, 因为箭头函数的 `this` 会向外找, 最终和 `mounted` 中的一样
7. `.native`
    - 如果我们想给组件绑定原生的 `DOM` 事件, 比如 `click`, 但是下面的写法也会让 `Vue` 认为 `click` 是自定义事件
    - ```html
      <Student @click="getStudentName"></Student>
    - 要这样写
    - ```html
      <Student @click.native="getStudentName"></Student>
### `.sync`
1. 有些情况下, 我们需要修改 `prop`, 但是直接修改会引起报错. 真正的双向绑定会带来维护上的问题, 因为子组件可以更改父组件的值, 父子组件两侧都没有明显的变更来源.
    - ![](../image/Snipaste_2022-07-08_08-40-41.png)
2. 如果真的要更改, 官网推荐使用 `update:propName` 的模式触发事件. 比如
    - 父组件. 绑定了 `title` 这个 `prop`, 也绑定了自定义事件. 在子组件触发自定义事件时 `$event` 就是传来的新值.
      - ```html
        <Student :title="title" @update:title="title = $event"></Student>
    - 子组件
      - ```html
        <div>
          <h2>{{title}}</h2>
          <button @click="changeTitle">修改title</button>
        </div>
      - ```js
        export default {
          name: 'Student',
          props: {
            title: String
          },
          methods: {
            changeTitle() {
              this.$emit('update:title', 'NEW');
            }
          },
        }
    - ![](../image/vue_sync.gif)
3. 如果我们要十个 prop 需要双向绑定, 那么这样写十遍也挺麻烦的, 所以 Vue 为我们提供了 `.sync` 修饰符作为这种模式的缩写
    - 我们只需要改动父组件即可
      - ```html
        <!-- <Student :title="title" @update:title="title = $event"></Student> -->
        <Student :title.sync="title"></Student>
4. 使用 `v-bind.sync`
    - 如果在父组件中一个对象中的每个属性都需要作为 `prop` 传入的话, 可以使用 `v-bind.sync` 将每个属性都作为独立的 `prop` 传入.
      - ```html
        <School v-bind.sync="person"></School>
      - ```js
        export default {
          data() {
            return {
              title: 'OLD',
              person: {
                name: 'tom',
                age: 19
              }
            }
          },
        }
    - 子组件
      - ```html
        <div>
          {{name}}-{{age}}
          <button @click="changeName">修改Name</button>
          <button @click="changeAge">修改Age</button>
        </div>
      - ```js
        export default {
          name: 'School',
          props: {
            name: String,
            age: Number
          },
          methods: {
            changeName() {
              this.$emit('update:name', 'jerry')
            },  
            changeAge() {
              this.$emit('update:age', 20)
            },
          }
        }
    - ![](../image/vue_sync_vbind.gif)
## 全局事件总线
1. 这并不是一个 `Vue` 的 `API` 或技术, 只是我们自己用来组件间传值的方式, 是总结出来的经验
    - ![](../image/Snipaste_2022-01-08_17-11-15.png)
    - 解析一下道理, 如果 `D` 像给 `A` 传数据, 那么 `A` 在 `X` 上定义自定义事件, 然后 `D` 触发该事件就可以了.
    - `X` 需要具备哪些条件?
      - 所有组件都能访问 `X`
      - `X` 可以调用 `$on`, `$off`, `$emit`
    - 要满足第一个条件, 很好实现, `Vue.prototype` 是 `vm` 和 `vc` 都可以访问到的
    - 第二个, 如果要能调用, 必须要知道这些方法都在哪里? 在 `Vue.prototype` 上
      - ![](../image/Snipaste_2022-01-08_17-45-49.png)
2. 实现
    - 我们可以创建使用非单文件组件的方式, 创建一个组件 `d`, 然后将其绑定在 Vue.prototype 上
    - ```js
      const Demo = Vue.extend({})
      Vue.prototype.x = new Demo();
    - `Vue.extend` 方法返回 `VueComponent`, 一个构造函数, 我们可以通过 `new` 创建组件实例对象
    - `School` 要想 `Student` 发送组件, 所以 `Student` 需要在 `x` 上注册自定义事件, 然后 `School` 来触发该事件
      - `Student`
      - ```js
        methods: {
          getSchoolname(name) {
            console.log(`name from School.vue is ${name}`);
          }
        },
        mounted() {
          this.x.$on('atguigu', this.getSchoolname);
        }
      - School
      - ```html
        <button @click="sendName">sendName</button>
      - ```js
        methods: {
          sendName() {
            this.x.$emit('atguigu', this.schoolName)
          }
        },
    - ![](../image/Snipaste_2022-01-09_09-52-41.png)
3. 优化
    - 不仅 `vc` 可以访问 `$on`, `vm` 也可以访问, 所以没必要单独创建一个组件
    - ```js
      new Vue({
        render: h => h(App),
        beforeCreate() {
          Vue.prototype.$bus = this;
        },
      }).$mount('#app')
    - 🐖注意: 我们还需要在 `beforeDestroy` 解绑自定义事件
    - ```js
      beforeDestroy() {
        this.x.$off('atguigu');
      }
## 消息订阅与发布
1. 是另一种实现全局间组件通信的方法.
2. 使用步骤
    - 安装
      - ```shell
        npm install pubsub-js
    - 引入
      - ```js
        import pubsub from 'pubsub-js'
    - 订阅消息(`Student`)
      - ```js
        methods: {
          getSchoolnamePubSub(name) {
            console.log(`name from School.vue is ${name}`);
          }
        },
        mounted() {
          this.pubId = pubsub.subscribe('atguigu', this.getSchoolnamePubSub)
        },
    - 发布消息(`School`)
      - ```js
        sendName() {
          pubsub.publish('atguigu', this.schoolName)
        }
    - 取消订阅
      - ```js
        beforeDestroy() {
          pubsub.unsubscribe(this.pubId)
        }
## `$nextTick`
1. 同样是 Student 组件, 我们想实现一个功能, 即当我们点击编辑按钮, 学校的地址变成输入框展示.
  - 首先考虑增加一个属性 `isEdit`, 当 `isEdit` 为真时, 显示 `input` 输入框, 当 `input` 为假时, 展示文字. 在 `blur` 函数中我们也改变 `isEdit` 的属性
  - ```html
    <div>
      <h2 v-show="!isEdit">学校地址: {{address}}</h2>
      <input type="text" v-model="address"  v-show="isEdit" @blur="handleBlur" ref="addressInput">
      <button @click="editAddress">修改学校地址</button>
    </div>
  - ```js
    data() {
      return {
        schoolName: "MIT",
        address: "USA",
        isEdit: false
      };
    },
    methods: {
      editAddress() {
        this.isEdit = true;
      },
      handleBlur() {
        this.isEdit = false;
      }
    }
  - 这个功能可以实现, 但是一个缺陷是, 当我们点击修改按钮后, 输入框没法自动获取焦点. 如果你觉得很容易, 加上就行了
  - ```js
    editAddress() {
      this.isEdit = true;
      this.$refs.addressInput.focus();
    }
  - 🙅‍不, 这并没有工作.
2. 为什么没有工作? 因为 `isEdit` 更新完后, 页面还没有更新, `input` 输入框还没有出现在 `DOM` 中, 根本拿不到 `input` 元素
  - `Vue` 官方推荐使用 `Vue.$nextTick`, 这个方法接收一个函数作为回调, 回调的 `this` 会自动绑定到调用它的实例. 
  - `Vue.$nextTick` 是在下一次 DOM 更新结束后执行指定的回调. 
  - ```js
    editAddress() {
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs.addressInput.focus();
      });
    }
  - 有些程序员也会写不加时间的 `setTimeout`, 这样也能实现, 但是还是使用官方的吧
  - ```js
    setTimeout(() => {
      this.$refs.addressInput.focus();
    })
## 过渡与动画
1. `Vue` 在插入, 更新或移除 `DOM` 时, 提供多种不同方式的应用过渡效果, 包括
    - 在 `CSS` 过渡和动画中自动应用 `class`
    - 可以配合使用第三方 `CSS` 动画库，如` Animate.css`
    - 在过渡钩子函数中使用 `JavaScript` 直接操作 `DOM`
    - 可以配合使用第三方 `JavaScript` 动画库，如 `Velocity.js`
### 单元素/组件的过渡
1. `Vue` 提供了 `transition` 的封装组件, 在下列情形中, 可以给任何元素和组件添加进入/离开过渡
    - 条件渲染 (使用 `v-if`)
    - 条件展示 (使用 `v-show`)
    - 动态组件
    - 组件根节点
2. 当插入或删除包含在 `transition` 组件中的元素时, `Vue` 将会做以下处理
    - 自动嗅探目标元素是否应用了 `CSS` 过渡或动画, 如果是, 在恰当的时机添加/删除 `CSS` 类名
    - 如果过渡组件提供了 `JavaScript` 钩子函数, 这些钩子函数将在恰当的时机被调用
    - 如果没有找到 `JavaScript` 钩子并且也没有检测到 `CSS` 过渡/动画, `DOM` 操作 (插入/删除) 在下一帧中立即执行. (注意: 此指浏览器逐帧动画机制)
3. 过渡的类名
    - 在进入/离开的过渡中, 会有 `6` 个 `class` 切换
    - `v-enter`: 定义进入过渡的开始状态.
    - `v-enter-active`: 定义进入过渡生效时的状态. 这个类可以被用来定义过渡的过程时间, 延迟和曲线函数
    - `v-enter-to`: 定义过渡的结束状态. 与此同时, `v-enter` 被移除.
    - `v-leave`: 定义离开过渡的开始状态
    - `v-leave-active`: 定义离开过渡生效时的状态. 个类可以被用来定义过渡的过程时间, 延迟和曲线函数
    - `v-leave-to`: 定义离开过渡的结束状态
    - ![](https://cn.vuejs.org/images/transition.png)
    - 如果你使用了一个没有名字的 `<transition>`, 那么 `v-` 是这些类的默认前缀. 如果你使用了 `<transition name="hello-world">`, 那么, `v-enter` 会被替换为 `hello-world-enter` 
4. 一个使用`动画`的 `demo`
    - 点击按钮, 控制元素显示与隐藏
    - ```html
      <div>
        <button @click="toggleShow">显示与隐藏</button>
        <transition>
          <h1 v-if="isShow">Hello, World</h1>
        </transition>
      </div>
    - ```css
      .v-enter-active {
        animation: atguigu .5s;
      }
      .v-leave-active {
        animation: atguigu .5s reverse;
      }

      @keyframes atguigu {
        from {
          transform: translateX(-100%)
        }
        to {
          /* 下面这个写不写都行 */
          /* transform: translateX(0) */
        }
      }
    - 理解: 当元素进入过程中, `Vue` 会把 `v-enter-active` 这个 `class` 加入到元素上. 然后就会执行从 `translateX(-100%)` 到这个元素原本应该在的位置. 反过来也是, 从原本应该在的位置, 到 `translateX(-100%)`
5. `appear`
    - 第一次加载页面的时候是没有动画的, 如果需要第一次加载页面就有动画, 需要 `appear`
    - ```html
      <transition appear>
        <h1 v-if="isShow">Hello, World</h1>
      </transition>
    - 或者
    - ```html
      <transition :appear="true">
        <h1 v-if="isShow">Hello, World</h1>
      </transition>
6. 使用`过渡`改写上面的例子
    - 我们需要精准定义 6 个 class
    - ```css
      .v-enter {
        transform: translateX(-100%);
      }
      .v-enter-to {

      }
      .v-enter-active {
        transition: transform .5s linear;
      }
    - 理解:
      - 过渡还没开始, 应用 `.v-enter`, 元素在 `translateX(-100%)` 的位置,
      - 过渡结束, 应用 `.v-enter-to`, 元素在其本来应该出现的位置
      - 过渡进行时, 应用 `.v-enter-active`, 加上过渡效果
    - 既然离开和进入是完全相反的效果, 那离开的起点就是进入的终点, 离开的终点就是进入的起点, 我们简写
    - ```css
      .v-enter, .v-leave-to {
        transform: translateX(-100%);
      }
      .v-enter-to, .v-enter {

      }
      .v-enter-active, .v-leave-active {
        transition: transform .5s linear;
      }
### 多个元素的过渡
1. 多个元素的过渡最常见的情形是, 一个表格和描述这个表格为空的消息
    - ```html
      <transition :appear="true">
        <table v-if="isShow" key="table">
          <thead>
            <th>
              <td>姓名</td>
              <td>年龄</td>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>张三</td>
              <td>18</td>
            </tr>
            <tr>
              <td>李四</td>
              <td>19</td>
            </tr>
          </tbody>
        </table>
        <p v-else key="empty">表格无内容</p>
      </transition>
    - 如果在 `<transition>` 中切换元素为相同标签名时, 需要 `key` 设置唯一的值来标记让 `Vue` 区分他们, 否则 `Vue` 为了效率只会替换相同标签内部的内容. 
      - ```html
        <transition :appear="true">
          <p v-if="isShow">Hello</p>
          <p v-else>World</p>
        </transition>
      - 两个过渡的元素都是 `p`, 所以实际过程中并没有动画, `Vue` 只是替换了 `p` 标签的内容
    - `Vue` 官网推荐给 `<transition>` 组件中的多个元素设置 `key` 是一个更好的实践.
### 集成第三方动画库(animate.css)
1. 安装
    - ```shell
      npm install animate.css
2. 引入
    - ```js
      import 'animate.css'
3. 使用
    - ```html
      <transition appear name="animate__animated animate__bounce" enter-active-class="animate__swing" leave-active-class="animate__backOutUp">
        <h1 v-if="isShow">Hello, World</h1>
      </transition>
    - 我们可以通过 `attribute` 自定义过渡类名
      - `enter-class`
      - `enter-active-class`
      - `enter-to-class`
      - `leave-class`
      - `leave-active-class`
      - `leave-to-class`
    - 这些优先级高于普通类型, 对于结合第三方库很有用
## 配置代理
### 使用 axios
1. 使用 axios
    - 安装
    - ```shell
      npm install axios
    - 引入
    - ```js
      import axios from 'axios'
    - 使用
    - ```js
      axios.get('http://localhost:3000/getUser?name=tom&age=12').then(
        response => {
          console.log(response.data);
        },
        error => {
          console.log(error.message);
        }
      )
    - 报错!
    - ![](../image/Snipaste_2022-01-14_22-05-31.png)
### 前端解决跨域
1. 思路
    - 浏览器和服务器之间请求会出现跨域, 但是服务器和服务器之间不会出现跨域, 不受同源策略影响, 所以, 配置一个代理服务器, 进行请求转发
    - ![](../image/Snipaste_2022-01-14_22-16-42.png)
    - 🐖注意: 这里的代理服务器和浏览器中的端口号相同
2. 配置代理服务器
    - `vue.config.js`: `devServer.proxy`
    - 这个属性可以为一个 **`指向服务器 API`** 的字符串, 注意, 这回告诉代理服务器将任何未知请求 **(没有匹配到静态文件的请求)** 代理到 `http://localhost:3000`
      - 或者请求的资源 `8080` 代理服务器本身就有, 那么就不会转发请求
    - ```js
      devServer: {
        proxy: 'http://localhost:3000'
      }
    - 🐖注意: 修改完 `vue.config.js` 之后要重启项目
    - 🐖注意: 还有一处需要改, 以前我们是直接找服务器要数据, 但是现在改成找代理要数据了, 所以 `axios` 请求中的端口要改为 `8080`
    - ```js
      axios.get('http://localhost:8080/getUser?name=tom&age=12').then(
        response => {
          console.log(response.data);
        },
        error => {
          console.log(error.message);
        }
      )
    - 完美拿到数据🆒
    - ![](../image/Snipaste_2022-01-14_22-28-10.png)
3. 配置多个代理
    - 如果需要配置多个代理, 或者只想某些请求被代理, 就可以使用 proxy 的对象写法
    - ```js
      proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        },
        // ws: true,
        // changeOrigin: true
      },
      '/api2': {
        target: 'http://localhost:5000',
        pathRewrite: {
          '^/api': ''
        },
      }
    }
    - 解释:
      - `/api`: 表示以 `/api` 开头的请求代理方式
        - 所以, 在真实发请求的时候需要改写下面的代码, 在端口号后面加上 `/api`
        - ```js
          axios.get('http://localhost:8080/api/getUser?name=tom&age=12').then(
          response => {
            console.log(response.data);
          },
          error => {
            console.log(error.message);
          }
        )
      - `target`: 表示需要被代理到哪里
      - `pathRewrite`: 对象, 用来重写请求. 为什么? 因为我们发的请求是 `http://localhost:8080/api/getUser`, 但是真实服务器上的地址是 `http://localhost:8080/getUser`, 没有 `/api` 前缀. 所以如果我们不改, 就会出现 `404`
        - `'^/api': ''`: 规则, `key` 表示正则表达式, `value` 表示用来替换匹配上的部分
      - `ws`: `true`, 用于支持 `webSocket`
      - `changeOrigin`: `true`, 改变请求头中的 `host` 字段. `host` 表示请求将要发送到的服务器主机名和端口号. 在我们 `demo` 中, 如果为 `true`, 端口就是 `3000`; 如果 `false`, 端口就是 `8080`
        - 服务端代码中打印 `host` 头
        - ```js
          app.get('/getUser', (req, res) => {
            // 解构赋值获取参数
            let { name } = req.query;
            let age = req.query.age;
            console.log(req.header('host'));
            res.send(req.query);
          });
        - ![](../image/Snipaste_2022-01-15_14-37-09.png) 
        - 我测试过程中, 如果改了 `changeOrigin` 配置后, 需要多次重启项目, 经常会出现 `404` 错误.
    - 更多配置参考[👉这里](https://github.com/chimurai/http-proxy-middleware#proxycontext-config)
## 小 tips💡
1. 如果我们要引入 `bootstrap` 文件, 一个思路是把 `bootstrap.css` 放在 `src/assets` 下, 然后再需要的页面中 `import`, 但是这种引用方式会报错, 因为 `bootstrap.css` 中引入了同级目录 `font` 下的一个字体文件. 这时因为使用 `import` 引入会很严格, 即便引入的文件中有引用了其他我们目前不需要的东西, 比如字体文件, 这样引入也会报错
2. 但是我们只想要 `bootstrap` 样式, 而不像要这个文件. 怎么办? 换另一种方式, 在 `public` 下, 创建 `css` 目录, 然后在 `index.html` 使用 `<style>` 标签引入 


## 插槽
### 默认插槽
1. 要实现下面的效果
    - ![](../image/Snipaste_2022-01-15_17-47-11.png)
    - 思路: 创建一个组件 `Student`, 然后传值
2. `Vue` 实现了一套内容分发的 `API`, 将 `<slot>` 元素作为承载分发内容的出口
    - 首先我们在组件中使用 `<slot></slot>` 表示一个插槽, 其实就是一个坑, 等着别人来填东西. 在这个插槽中可以提供一些默认值, 如果别人不填就展示默认值.
    - 当组件渲染时, `<slot></slot>` 就会被替换为传递的内容, 可以是任何模板代码, 包括 `HTML`
    - ```html
      <div class="box">
        <h3>{{title}}</h3>
        <slot>你好啊</slot>
      </div> 
    - 我们在使用组件时, 可以使用标签的完整结束方式, 传递数据
    - ```html
      <Student title="美食">
        <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="">
      </Student>
      <Student title="电影"></Student>
      <Student title="音乐"></Student>
    - ![](../image/Snipaste_2022-01-15_18-00-43.png)
### 具名插槽
1. 如果我们想在上面的例子下再加入链接, 用于界面跳转
    - ![](../image/Snipaste_2022-01-15_18-15-36.png)
2. `name` 属性
    - 自然, 我们可以写多个 `<slot>`, 但是要给每个 `<slot>` 起名字, 用上 `name` 属性
    - ```html
      <div class="box">
        <h3>{{title}}</h3>
        <slot>你好啊</slot>
        <slot name="footer">链接</slot>
      </div>
    - 那么在给向插槽中放内容时, 也需要制定究竟放在哪个插槽
    - ```html
      <Student title="美食">
        <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="">
        <a slot="footer" href="https://www.bilibili.com">更多美食</a>
      </Student>
    - ![](../image/Snipaste_2022-01-15_18-27-02.png)
    - 🐖注意1: `<slot></slot>` 这样的写法, 也是有 name 属性的, 不过其默认的名字就是 default, 所以下面的写法和上面的写法是一样的
      - ```html
        <Student title="美食">
          <img slot="default" src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="">
          <a slot="footer" href="https://www.bilibili.com">更多美食</a>
        </Student>
3. `<template>`
    - 如果一次想要向一个插槽中提供多个内容, 直接的想法是用 div 包裹, 如下.
      - ```html
        <div slot="footer">
          <a href="https://www.bilibili.com">肖申克的救赎</a>
          <a href="https://www.bilibili.com">怦然心动</a>
        </div>
      - 这样写法的弊端就是多引入了一个 div 标签
    - 可以用 `<template>` 代替
      - ```html
        <template slot="footer">
          <a href="https://www.bilibili.com">肖申克的救赎</a>
          <a href="https://www.bilibili.com">怦然心动</a>
        </template>
      - 一旦这样写, 就可以使用 `Vue@2.6.0` 引入的新命令 `v-slot`(简写形式看`作用域插槽部分`)
      - 该指令的参数是 `插槽名` (可选, 默认值是 `default` )
      - ```html
        <template v-slot:default>
          我是哈哈哈
        </template>
        <template v-slot:footer>
          <a href="https://www.bilibili.com">肖申克的救赎</a>
          <a href="https://www.bilibili.com">怦然心动</a>
        </template>
      - 
### 作用域插槽
1. 有时让插槽内容能够访问子组件中才有的数据是很有用的. 比如下面的功能, 数组在组件中, 但是我们使用组件时, 想以不同形式的结构展示数据. 
    - ![](../image/Snipaste_2022-01-15_20-48-44.png)
    - 如果我们在 `App.vue` 中使用 `Student` 组件, 那么传值给插槽时, 值只能定义在 `App` 组件中
    - 如果插槽内容定义在子组件中, 如何能拿到呢?
2. `Student.vue` 组件
    - 我们在组件中定义数据
    - ```js
      data() {
        return {
          songs: ['任性', '风筝', '雨还是不停的落下', '不同'],
          singer: '孙燕姿'
        };
      },
    - 在定义 `<slot>` 时, 需要给这个标签绑定数据
    - ```html
      <div class="box">
        <h3>{{title}}</h3>
        <slot :songs="songs" :singer="singer">你好啊</slot>
      </div>
3. `App.vue`
    - 1️⃣首先: 必须使用 `<template>` 
    - 2️⃣使用 `scope` 或者 `slot-scope` 接收传来的值 (`slot-scope` 是比较新的 `API`)
    - ```html
      <Student title="音乐">
        <template slot="default" slot-scope="paramPassed">
          <div>
            <pre>
              {{paramPassed}}
            </pre>
          </div>
        </template>
      </Student>
    - ![](../image/Snipaste_2022-01-15_21-03-24.png)
    - 🐖注意: 我们传递了两个数据, 第一个是一个数组, 第二个是一个字符串, 所以 `paramPassed` 是一个对象. 所以我们可以使用解构赋值的语法, 拿到传来的对象
    - ```html
      <Student title="音乐">
        <template slot="default" slot-scope="{songs, singer}">
          <div>
            <ul>
              <li v-for="(song, index) in songs" :key="index">{{song}}</li>
            </ul>
            <h4>by {{singer}}</h4>
          </div>
        </template>
      </Student>
    - ![](../image/Snipaste_2022-01-15_21-09-04.png)
4. `v-slot`
    - 如果使用新的 `API` `v-slot` 需要这样写
    - ```html
      <Student title="音乐">
        <template v-slot:default="{songs, singer}">
          <div>
            <ol>
              <li v-for="(song, index) in songs" :key="index">{{song}}</li>
            </ol>
            <h4>by {{singer}}</h4>
          </div>
        </template>
      </Student>
    - 和其他指令一样 `v-slot` 也有简写形式 **`#`**
    - ```html
      <Student title="音乐">
        <template #default="{songs, singer}">
          <div>
            <h4 v-for="(song, index) in songs" :key="index">{{song}}</h4>
            <h4>by {{singer}}</h4>
          </div>
        </template>
      </Student>
    - 如果使用简写形式, 当使用默认插槽时不能省略默认插槽名 `default`, 即下面的写法会报错
    - ```html
      <template #="{songs, singer}">
## Vuex
### 简介与安装
1. `Vuex` 是一个专为 `Vue.js` 应用程序开发的`状态管理模式`. 它采用集中式存储管理应用的所有组件的状态, 并以相应的规则保证状态以一种可预测的方式发生变化.
    - 为什么不用全局事件总线呢? 看下面的图, 如果我们要在 4 个组件之间实现仅 1 个数据 `x` 的共享, 依赖全局事件总线就至少要 6 次的方法. 共享的数据也越多, 维护起来越复杂
    - ![](../image/Snipaste_2022-01-16_08-16-02.png)
    - 使用 `Vuex` 的话, `Vuex` 不属于任何一个组件, 故此更加简单, 逻辑更清晰
    - ![](../image/Snipaste_2022-01-16_08-19-31.png)
2. 什么情况下使用 Vuex
    - 多个组件依赖同一状态
    - 来自不同组件的行为需要变更同一状态
3. 工作原理
    - ![](https://vuex.vuejs.org/vuex.png)
4. 搭建环境
    - 安装
      - ```shell
        npm install vuex
    - 引入和使用
      - ```js
        import Vuex from 'vuex';
        Vue.use(Vuex);
    - 传入 `store` 配置项
      - 在 `src` 下创建 `store` 文件夹, 在 `store` 文件夹下创建 `index.js`
      - ```js
        import Vuex from 'vuex'

        // 用于响应组件中的动作
        const actions = {};
        // 用于操作数据(state)
        const mutations = {};
        // 用于存储数据
        const state = {}
        // 创建并暴露 store
        export default new Vuex.Store({
          actions,
          mutations,
          state
        })
      - `main.js`
      - ```js
        import store from './store'
        new Vue({
          render: h => h(App),
          store,
          beforeCreate() {
            Vue.prototype.x = this;
          },
        }).$mount('#app')
      - ❌报错: 必须在创建 store 实例之前调用 `Vue.use(Vuex)`
      - ![](../image/Snipaste_2022-01-16_21-16-51.png)
      - 改写 `store/index.js`
      - ```js
        import Vuex from 'vuex'
        import Vue from 'vue'

        Vue.use(Vuex);

        // 用于响应组件中的动作
        const actions = {};
        // 用于操作数据(state)
        const mutations = {};
        // 用于存储数据
        const state = {}
        // 创建并暴露 store
        export default new Vuex.Store({
          actions,
          mutations,
          state
        })
      - 疑问😮为什么在 `main.js` 不可以写成下面的样子呢? 因为 `ES6` 模块化的语法, `import` 语句会提升, 所以下面第二个 `import` 实际上还是在 `use` 之前
      - ```js
        import Vuex from 'vuex'
        Vue.use(Vuex);
        import store from './store'
    - 来看看 `store` 究竟是什么
      - ![](../image/Snipaste_2022-01-20_21-57-04.png)
### 求和案例
1. 先来演示非 Vuex 版本的
    - ```html
      <div>
        <h2>当前和为{{sum}}</h2>  
        <select name="select" id="select" v-model.number="n">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementOdd">和为奇数才能加</button>
        <button @click="incrementWait">等等再加</button>
      </div>
    - ```js
      export default {
        data() {
          return {
            sum: 0,
            n: 1
          };
        },
        methods: {
          increment () {
            this.sum += this.n;
          },
          decrement () {
            this.sum -= this.n;
          },
          incrementOdd () {
            if (this.sum % 2 === 0) {
              alert('和为奇数才能加');
              return;
            }
            this.increment();
          },
          incrementWait () {
            setTimeout(() => {
              this.increment();
            }, 1000);
          }
        }
      };
2. 开始改写
    - 将 `sum` 放在 `Vuex` 的 `state` 中
      - ```js
        const state = {
          sum: 0
        };
    - 在 `actions` 定义 `plus` 方法, 并调用 `mutations` 中的方法
      - ```js
        const actions = {
          plus(context, value) {
            console.log(context);
            context.commit('PLUS', value);
          }
        };
      - 方法接收的第一个参数, 是一个与 `store` 实例具有相同方法和属性的 `context` 对象
      - ![](../image/Snipaste_2022-01-20_22-02-47.png)
      - 方法接收的其余参数就是调用方法时传过来的
    - 在 `mutations` 定义 `PLUS` 方法
      - 开发中约定将 `mutations` 中的方法名写为大写形式
      - ```js
        const mutations = {
          PLUS(state, value) {
            state.sum += value;
          }
        };
      - 方法会接受 `state` 作为第一个参数
      - ![](../image/Snipaste_2022-01-20_22-10-37.png)
      - 方法接收的其余参数就是调用方法时传过来的
    - 使用 `$store.dispatch` 调用 `plus` 方法
      - ```js
        methods: {
          increment () {
            this.$store.dispatch('plus', this.n)
          } 
        }
    - 在页面展示时, 同样需要从 $store 中拿数据
      - ```html
        <h2>当前和为{{$store.state.sum}}</h2>  
3. 直接调用 `commit`
    - 如果我们的方法不需要通过 `actions`, 那么也可以直接调用 `mutations`
    - ```js
      decrement () {
        //this.$store.dispatch('minus', this.n);
        this.$store.commit('minus', this.n);
      }
    - 
### getters
1. 有时候需要中 `store` 中的 `state` 数据中派生一些状态出来, 例如对列表就行过滤. `Vuex` 中允许在 `store` 中定义 `getter`(可以理解为 `store` 的计算属性), `getter` 返回值会根据它的依赖被缓存, 只有依赖的值发生了变化才会被重新计算.
2. `getter` 接受 `state` 作为其第一个参数
    - ```js
      const getters = {
        bigSum(state) {
          return state.sum * 10;
        }
      }
      export default new Vuex.Store({
        actions,
        mutations,
        state,
        getters
      })
3. 使用 `getters`
    - ```html
      <h2>当前和放大10倍为为{{$store.getters.bigSum}}</h2> 
4. 开发者工具
    - ![](../image/Snipaste_2022-01-21_21-29-56.png)
### `mapState` & `mapGetters`
1. 目前的代码有一个问题
    - ```html
      <h2>当前和为{{$store.state.sum}}</h2>  
      <h2>当前和放大10倍为为{{$store.getters.bigSum}}</h2>
    - 如果我们在模板字符串中使用很多 `state` 或 `getters` 数据, 这个模板就会特别冗余. 当然我们可以使用计算属性解决, 如下
    - ```js
      computed: {
        mySum() {
          return this.$store.state.sum;
        },
        myBigSum() {
          return this.$store.getters.bigSum;
        }
      },
    - ```html
      <!-- 使用计算属性 -->
      <h2>当前和为{{mySum}}</h2>  
      <h2>当前和放大10倍为为{{myBigSum}}</h2>  
    - 计算属性的局限: 只能用于当前组件, 如果某个值需要在很多组件显示, 就会出现问题
2. `mapState`
    - `mapState` 辅助函数帮助我们生成计算属性
    - 要想生成计算属性, 首先我们要给计算属性起个名, 然后指出这个计算属性是依赖哪个变量计算的. 刚好, 这两个就是床给 `mapState` 的值
    - 要使用 `mapState` 首先需要引入
    - ```js
      import { mapState } from 'vuex';
    - 首先看看这个函数的返回值是什么
    - ```js
      mounted() {
        const x = mapState({ vuexSum: 'sum', vuexSchool: 'school' });
        console.log(x);
      },
    - ![](../image/Snipaste_2022-01-21_22-04-06.png)
    - 是一个对象, 每一个键值对就是定义计算属性的形式, 所以使用 `ES6` 的 `spread` 语法, 直接把返回值放入 `computed` 即可
    - ```js
      computed: {
        // mySum() {
        //   return this.$store.state.sum;
        // },
        // myBigSum() {
        //   return this.$store.getters.bigSum;
        // }
        ...mapState({ vuexSum: 'sum', vuexSchool: 'school' }),
      }
    - 模板中直接使用
    - ```html
      <!-- 使用 mapState -->
      <h2>当前和为{{vuexSum}}</h2>  
      <h2>当前和放大10倍为为{{vuexSchool}}</h2>  
    - 如果我们需要的计算属性和其依赖的值是同一个名字, 比如计算属性是 `sum`, 其依赖 `sum`, 那么就可以使用 `mapState` 的数组写法
    - ```js
      computed: {
        // mapState 数组写法
        ...mapState(['sum', 'school']),
      },
    - 模板中直接使用
    - ```html
      <!-- 使用 mapState 数组写法 -->
      <h2>当前和为{{sum}}</h2>  
      <h2>当前和放大10倍为为{{school}}</h2>  
3. `mapGetters`
    - 引入
    - ```js
      import { mapGetters } from 'vuex';
    - 对象写法
    - ```js
      ...mapGetters({vuexBigSum: 'bigSum'})
    - 数组写法
    - ```js
      ...mapGetters(['bigSum'])
### `mapActions` 👫 `mapMutations`
1. 代码中的问题
    - 就是同样的内容, 写的太多.
    - ![](../image/Snipaste_2022-01-23_10-14-42.png)
2. `mapActions` 
    - 引入
      - ```js
        import { mapActions } from 'vuex';
    - 照例, 先来看一下这个函数的返回值
      - ```js
        mounted() {
          let x = mapActions({vuexPlus:'plus', vuexMinus:'minus'})
          console.log(x);
        },
      - ![](../image/Snipaste_2022-01-23_10-35-09.png)
    - 所以, 仍然使用 spread 语法将其放入 methods 中
      - ```js
        methods: {
          ...mapActions({increment: 'plus', decrement: 'minus'}),
        },
      - 结果💥
      - ![](../image/Snipaste_2022-01-23_10-48-19.png)
    - 为啥🤨
      - ![](../image/Snipaste_2022-01-23_11-05-20.png)
      - 来看官网的例子, 因为 `this.add()` 映射为 `this.$store.dispatch('increment')`, 所以 `this.add()` 的第一个参数也就成为了 `this.$store.dispatch('increment')` 的第一个参数.
      - 看一下我们在模板中怎么调用的
        - ```html
          <button @click="increment">+</button>
      - 还记得吗, 如果我们这样写, 其实是可以接收到一个默认参数, `$event`, 所以, `0` 和一个事件做加法, 得到的就是图片中展示的结果了. 
      - 要想避免这样, 只能在模板中调用函数时手动传参
        - ```html
          <button @click="increment(n)">+</button>
2. `mapMutations` 
    - 引入
      - ```js
        import { mapMutations } from 'vuex';
    - 使用
      - ```js
        methods: {
          ...mapMutations({ DECREMENT: 'MINUS' }),
        }
      - ```html
        <button @click="DECREMENT(n)"> - BY Mutation</button>
### 模块化编码(Module)
1. 使用单一状态树, 所有的应用状态会集中到一个比较大的对象, 当应用变得非常复杂时, `store` 对象就会很臃肿. `Vuex` 允许我们将 `store` 分割成 `模块(Module)`, 每个模块都有自己的 `state`, `action`, `mutation`, `getter`
    - ```js
      const moduleA = {
        state: () => ({ ... }),
        mutations: { ... },
        actions: { ... },
        getters: { ... }
      }

      const moduleB = {
        state: () => ({ ... }),
        mutations: { ... },
        actions: { ... }
      }

      const store = new Vuex.Store({
        modules: {
          a: moduleA,
          b: moduleB
        }
      })
2. 改写代码
    - 首先将 `store/index.js` 改写为模块化形式
    - ```js
      import Vuex from 'vuex'
      import Vue from 'vue'

      Vue.use(Vuex);

      const countModule = {
        state: {
          sum: 0,
        },
        actions: {
          plus (context, value) {
            context.commit('PLUS', value);
          },
          minus (context, value) {
            context.commit('MINUS', value);
          },  
        },
        mutations: {
          PLUS(state, value) {
            console.log(state);
            state.sum += value;
          },
          MINUS(state, value) {
            console.log(state);
            state.sum -= value;
          }
        },
        getters: {
          bigSum(state) {
            return state.sum * 10;
          }
        },
      };

      const schoolModule = {
        state: {
          school: 'MIT'
        },
        action: {
          get(context, value) {
            return context.commit('GET', value);
          },
        },
        mutations: {
          GET(state, value) {
            return state.school;
          }
        },
        getters: {
          bigSchool(state) {
            return `${state.school} is great!`
          },
        },
      }

      export default new Vuex.Store({
        modules: {
          count: countModule,
          school: schoolModule,
        }
      })
    - 模板中的代码也需要修改, 先看看此时的 `this.$store` 对象有什么变化, 变化就是原来直接暴露的变量, 变成了这个变量所在对象
      - ![](../image/Snipaste_2022-01-30_15-43-49.png)
      - ```js
        computed: {
          ...mapState(['count', 'school']),
          ...mapGetters(['bigSum']),
        }
      - 所以代码中, 需要在在获取 `state` 之前加上这个 `state` 所在的对象
      - ```html
        <h2>当前和为{{count.sum}}</h2>  
        <h2>当前和放大10倍为为{{bigSum}}</h2>  
        <h2>我再{{school.school}}</h2>  
3. `namespaced`
    - 🐖注意: 默认情况下, 模块内部的 `action`, `mutation` 和 `getter` 是注册在 **`全局命名空间`** 的. 所以我们上面改写的代码并不涉及这三个部分
    - 如果我们希望模块具有更高的封装度和服用性, 可以通过添加 `namespaced: true` 的方式使其成为带有命名空间的模块, 之后, 其所有的 `action`, `mutation` 和 `getter` 都会自动根据模块注册的路径调用命名
    - 改写代码
      - ```js
        const schoolModule = {
          namespaced: true,
          state: {
            school: 'MIT'
          },
          action: {
            get(context, value) {
              return context.commit('GET', value);
            },
          },
          mutations: {
            GET(state, value) {
              return state.school;
            }
          },
          getters: {
            bigSchool(state) {
              return `${state.school} is great!`
            },
          },
        }
        // 创建并暴露 store
        export default new Vuex.Store({
          modules: {
            count: countModule,
            school: schoolModule,
          }
        })
      - 再看看这次的 `this.$store` 又发生了什么变化? 😅没变化
        - ![](../image/Snipaste_2022-01-30_17-46-22.png)
      - 改写代码
        - 首先改写 `getters` 因为其由全局命名空间转到了局部命名空间
        - ```js
          // ...mapGetters(['bigSum']),
          ...mapGetters({bigSum: 'count/bigSum'}),
        - 接下来改写 `action` 和 `mutation`, 我们需要传入注册模块的时候使用的模块名
        - ```js
          methods: {
            ...mapMutations('count', { DECREMENT: 'MINUS' }),
            ...mapActions('count', {increment: 'plus', decrement: 'minus'}),
            incrementOdd () {
              if (this.$store.state.sum % 2 === 0) {
                alert('和为奇数才能加');
                return;
              }
              this.increment();
            },
            incrementWait () {
              setTimeout(() => {
                this.increment();
              }, 1000);
            }
          }
        - 有没有发现, 在 `mapState` 和 `mapGetters` 的时候, 在模板语法中写的东西很长, 仿佛又回到了最初解决这个问题的时候的毛病. 其实, 在 `mapState` 和 `mapGetters` 的时候也可以传入注册模块时使用的模块名
        - ```js
          computed: {
            ...mapState('count', ['sum', 'school']),
            ...mapGetters('count', ['bigSum']),
          }
        - 在模板文件中, 也可以简写
        - ```html
          <h2>当前和为{{sum}}</h2>  
          <h2>当前和放大10倍为为{{bigSum}}</h2>  
          <h2>我再{{school}}</h2> 
      - 如果我们没有使用 `mapActions` 但同时使用了模块化编码怎么样呢? 
        - ```html
          <button @click="incrementByDispatch(n)">+(by dispatch)</button>
        - ```js
          methods: {
            incrementByDispatch() {
              this.$store.dispatch('count/plus', this.n);
            },
          }
        -
4. `rootState` 和 `rootGetters`
    - 当我们将不同的业务分到不同的模块时, 还是有一些业务是全局共享的, 比如登录的用户信息
    - 如果要在带命名空间的模块内访问全局内容, `rootState` 和 `rootGetters` 会作为第三和第四个参数传入 `getter`, 也会通过 `context` 对象的属性传入 `action`
    - 首先加入全局 `state`
      - ```js
        export default new Vuex.Store({
          modules: {
            count: countModule,
            school: schoolModule,
          },
          state: {
            name: 'wang'
          }
        })
    - 通过 `getters` 访问全局共享内容
      - ```js
        getters: {
          bigSum(state, getters, rootState, rootGetters) {
            return state.sum * 10 + ' ' + rootState.name;
          }
        },
      - ```html
        <h2>当前和放大10倍为为{{bigSum}}</h2>
      - 从下面的图能看出, 其实 `rootState` 中可以访问所有模块中的 `state` 属性
        - ![](../image/Snipaste_2022-02-01_16-04-10.png)
    - 通过 `actions` 的第一个参数 `context` 访问全局共享内容
      - ```js
        plus (context, value) {
          console.log('in plus', context.rootState);
          context.commit('PLUS', value);
        }
      - ![](../image/Snipaste_2022-02-01_16-04-54.png)
5. 最后的优化
    - 既然将 Vuex 中的内容组件化, 那么完全可以将这些内容写在单独的 js 文件中, 然后在 `store/index.js` 中可以引入哦
## 路由(vue-router)
### 基础
1. `vue-router` 是一个插件库, 专门用来实现 `SPA` 应用
    - `SPA`
      - 单页 `Web` 应用 `(Single Page Web Application, SPA)`
      - 整个应用只有一个完整的页面
      - 点击页面中的导航链接不会刷新页面, 只会做页面的局部更新
      - 数据需要通过 `AJAX` 请求获取
2. 路由
    - 在 `Vue` 中简单理解一个路由就是一组映射关系 (`key-value`), `key` 为路径, `value` 可能是 `function` 或 `component`
3. 安装
    - ```shell
      npm install vue-router
    - 引入和使用
    - ```js
      import VueRouter from 'vue-router'; 
      Vue.use(VueRouter);
### 使用路由
1. 使用
    - 在 `src` 下创建 `router/index.js`
      - ```js
        import VueRouter from 'vue-router';
        import About from '../components/About';
        import Home from '../components/Home';

        export default new VueRouter({
          routes: [
            {
              path: '/about',
              component: About,
            },
            {
              path: '/home',
              component: Home,
            },
          ]
        });
      - 从上可以直到, VueRouter 是一个构造函数
    - 在 `main.js` 下引入, 并在创建 `Vue` 实例时传入全新配置项
      - ```js
        import router from './router'
        const vm = new Vue({
          render: h => h(App),
          // store,
          beforeCreate() {
            Vue.prototype.x = this;
          },
          router,
        }).$mount('#app')
    - 成功使用后, 浏览器导航栏会出现 `/#/`
      - ![](../image/Snipaste_2022-02-02_19-49-41.png) 
### 声明式路由
1. 导航生效
    - 需求: 点击不同按钮, 跳转不同页面
    - 以前要写页面跳转, 都是用 `a` 标签, 但是在 VueRouter 中需要使用 `<router-link>` 组件来导航, 并传入 `to` 属性指定链接, 最后 `<router-link>` 会被渲染为一个 `a` 标签
    - 路由出口
      - 路由匹配到的组件将渲染在 `<router-view>` 标签内
    - ```html
      <div>
        <router-link to="/home">去Home</router-link>
        <router-link to="/about">去About</router-link>
      </div>
      <!-- 导航区 -->
      <div>
        <router-view>默认内容呗</router-view>
      </div>
    - ![](../image/Snipaste_2022-02-02_20-13-38.png)
2. 🐖注意点
    - `<router-view>` 组件内写的元素不起作用, 并不会作为路由不匹配时的默认展示
    - 来看一下解析后的路由
      - ![](../image/Snipaste_2022-02-02_20-14-55.png)
      - `a` 的 `href` 属性是 `#/home`
      - 当前生效的路由还会多两个 `class`
        - `router-link-exact-active`
        - `router-link-active`
    - `active-class`
      - 可以看到上面的路由仅从样式无法区分哪个路由正在生效, 故此, 可以在 `<router-link>` 标签加上 `active-class` 表示激活时使用的 CSS 类名, 默认是 `router-link-active`
      - 因为 Vue 会自己加上
      - ```html
        <router-link active-class="custom-router-link-active" to="/home">去Home</router-link>
        <router-link active-class="custom-router-link-active" to="/about">去About</router-link>
      - ```css
        .custom-router-link-active {
          border: 3px solid #d20;
          padding: 3px;
        }
      - ![](../image/Snipaste_2022-02-03_09-15-59.png)
    - 如果直接而在浏览器导航栏中输入 `http://localhost:8080/#/about`, 那么页面对应的路由也会直接生效
    - 路由组件和一般组件
      - 路由组件: 靠路由渲染出来的组件, 并没有固定写在模板语法中, 比如, `<Home/>` 和 `<About/>` 组件
      - 在开发中, 可以将一般组件和路由组件放在不同的文件夹, 比如路由组件放在 `pages` 下, 一般组件放在 `components` 组件
    - 切换组件时组件被销毁
      - ```js
        mounted () {
          console.log('Home 组件创建了');
        },
        beforeDestroy () {
          console.log('Home 组件销毁了');
        }  
      - ![](../image/Snipaste_2022-02-04_09-15-18.png)
3. `$route` 和 `$router`
    - 每个组件都有自己的 `$route`, 但是整个应用只有一个 `$router`
    - ![](../image/Snipaste_2022-02-04_09-24-20.png)
    - ![](../image/Snipaste_2022-02-04_09-25-11.png)
    - 并且有一个关系
      - ```js
        this.$router.currentRoute === this.$route // true
### 嵌套路由
1. 需求: 当前路由下, 还可以选择更多路由
2. 创建子页面 `HomeMessage` 和 `HomeNews`
3. `children` 嵌套子路由
    - ```js
      {
        path: '/home',
        component: Home,
        children: [
          {
            path: 'news',
            component: HomeNews
          },
          {
            path: 'message',
            component: HomeMessage
          },
        ]
      },
    - 🐖注意: 子路由的 `path` 不要写 `/news`, 前面不要写 `/`
4. 修改 `Home.vue` 
    - ```html
      <div>
        Home.vue
        <div>
          <nav>
            <ul>
              <li>
                <router-link to="/home/news">read news</router-link>
              </li>
              <li>
                <router-link to="/home/message">read message</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <hr>
        <router-view></router-view>
      </div>
    - 🐖注意: 二级导航路由时, `to` 要写完整的路由 `/home/news` 而不能只写 `/news`
5. 效果
    - ![](../image/Snipaste_2022-02-04_09-58-59.png)
    - 注意蓝色箭头, 多级路由时, 生效的不仅是最深的一级, 每级都会生效 
### 路由传参
#### query 方式
1. 需求: 点击不同消息, 传递对应的参数给 `Detail.vue`
2. 配置新路由
    - ```js
      {
        path: '/home',
        component: Home,
        children: [
          {
            path: 'news',
            component: HomeNews
          },
          {
            path: 'message',
            component: HomeMessage,
            children: [
              {
                path: 'detail',
                component: Detail,
              },
            ]
          },
        ]
      },
3. 修改 `HomeMessage.vue`
    - ```html
      <div>
        <ul>
          <li v-for="(msg) in msgList" :key="msg.id">
            <router-link :to="`/home/message/detail?id=${msg.id}`">{{msg.msg}}</router-link>
          </li>
        </ul>
        <router-view></router-view>
      </div>
4. 创建 `Detail.vue`
    - ```html
      <div>
        <h3>我是Detail.vue, 传来的参数是: {{$route.query.id}}</h3>
      </div>
    - ```js
      mounted () {
        console.log(`$route in detail.vue`, this.$route.query);
      }
    - 再次回到 `$route`, 其中的 `query` `property` 帮助我们获取路由的参数
      - ![](../image/Snipaste_2022-02-04_10-53-39.png)
    - 整个页面
      - ![](../image/Snipaste_2022-02-04_10-54-30.png)
      - 有一个小问题, 因为使用 `v-for` 生成路由导航, 它们的 `to` 都是一样的, 只不过后面的 `query` 部分不同, 导致点哪一个, 都会生效
5. `to` 的对象写法
    - 如果在跳转路由时要携带很多参数, `to` 的字符串写法就很复杂, 改造🚗
    - ```html
      <router-link :to="{
        path: '/home/message/detail',
        query: {
          id: msg.id
        }
      }">{{msg.msg}}</router-link>
#### params 方式
1. 这种方式传参就是直接在 `url` 中加上参数, 类似 `SpringMVC` 中的 `@PathVariable` 注解
    - 首先在配置路由时加入参数, 使用 `:参数名` 的形式
    - ```js
      {
        path: 'message',
        component: HomeMessage,
        children: [
          {
            name: 'myDetail',
            path: 'detail/:id/:title',
            component: Detail,
          },
        ]
      },
2. 在 `to` 属性直接加上参数
    - `to` 的 `string` 类型
      - ```html
        <router-link :to="`/home/message/detail/${msg.id}/${msg.msg}`">{{msg.msg}}</router-link>
    - `to` 的 `对象` 类型
      - ```html
        <router-link :to="{
          name: 'myDetail',
          params: {
            id: msg.id,
            title: msg.msg,
          }
        }">{{msg.msg}}</router-link>
      - 🐖❗如果使用 `params` 传参, 只能使用 `name`, 不能使用 `path`
3. 接收参数
    - 首先打印 `this.$route`
    - ![](../image/Snipaste_2022-02-04_20-46-15.png)
    - 所以在模板中也需要改
      - ```html
        <div>
          <h3>我是Detail.vue, query 传来的参数是: {{$route.query.id}}</h3>
          <h3>params 传来的 id 是: {{$route.params.id}}</h3>
          <h3>params 传来的 title 是: {{$route.params.title}}</h3>
        </div>
    - ![](../image/Snipaste_2022-02-04_20-58-43.png)
    - 🐖注意: 定义路由时写了两个参数, 但是如果传的时候只用一个参数, 就会找不到该路由
    - ![](../image/Snipaste_2022-02-04_21-01-22.png)
### 命名路由
1. 在配置路由时, 可以多传递一个参数 `name` 用来标识一个路由
    - ```js
      {
        path: 'message',
        component: HomeMessage,
        children: [
          {
            name: 'myDetail',
            path: 'detail',
            component: Detail,
          },
        ]
      },
2. 跳转时使用命名路由
    - ```html
      <router-link :to="{
        path: '/home/message/detail',
        query: {
          id: msg.id
        }
      }">{{msg.msg}}</router-link>
    - 上面使用 `path` 也可以跳转路由, 但是 `path` 可能会很长不方便书写, 那么我们可以换用 `name`
    - ```html
      <router-link :to="{
        name: 'myDetail',
        query: {
          id: msg.id
        }
      }">{{msg.msg}}</router-link>
    - 使用命名路由跳转必须配合 `to` 的对象写法, 不然, 我们来看看使用 `to` 的字符串写法会怎样
      - 我们改造 `About.vue`, 给 其加上 `myAbout` 的 `name` 属性
      - ```js
        {
          name: 'myAbout',
          path: '/about',
          component: About,
        },
      - ```html
        <!-- to 使用 name -->
        <router-link active-class="custom-router-link-active" to="myAbout">去About</router-link>
      - 🐖注意: `myAbout` 前面没有 `/`. (🤫其实使用 `path` 写法时前面不加 `/` 也可以跳转成功, 但是还是加上吧)
      - 页面仍然可以跳转, 但是浏览器导航栏变了. 一般, 简短的路由跳转可以使用 `path`, 而只在复杂的 `path` 时使用 `name` 替换
      - ![](../image/Snipaste_2022-02-04_11-35-15.png)
### 路由 Props
1. 如果在路由中传递很多参数, 那么路由组件的模板语法中会写很多的 `$route.query` 或 `$route.params`, 这样很不优雅. 所以改用 `Props` 用来传递参数并简化模板语法
    - 使用 `Props` 需要在定义路由时加上 `props` 配置项
2. `props` 第一种写法: 对象写法
    - 直接将属性和值写进对象
    - ```js
      {
        path: 'message',
        component: HomeMessage,
        children: [
          {
            name: 'myDetail',
            path: 'detail/:id/:title',
            component: Detail,
            // props 的第一种写法
            props: {
              a: 1, 
              b: 'hello',
            },
          },
        ]
      },
    - 在 `Detail.vue` 中使用 `props` 接收
      - ```js
        props: ['a', 'b'],
      - ```html
        <span>Props: a->{{a}}, b->{{b}}</span>
    - ![](../image/Snipaste_2022-02-05_09-31-50.png)
    - 这种写法比较局限, 因为传过去的内容都是固定写好的
2. `props` 第二种写法: `boolean` 写法
    - 如果 `boolean` 值为真, 会把该路由组件收到的所有 `params` 参数, 以 `props` 的形式接收
    - ```js
      {
        path: 'message',
        component: HomeMessage,
        children: [
          {
            name: 'myDetail',
            path: 'detail/:id/:title',
            component: Detail,
            // props 的第一种写法
            // props: {
            //   a: 1, 
            //   b: 'hello',
            // },

            // props 的第二种写法
            props: true,
          },
        ]
      },
    - 在 `Detail.vue` 中使用 `props` 接收
      - ```js
        props: ['id', 'title'],
      - ```html
        <h3>props boolean 写法</h3>
        <h3>params by props 传来的 id 是: {{id}}</h3>
        <h3>params by props 传来的 title 是: {{title}}</h3>
    - ![](../image/Snipaste_2022-02-05_09-40-23.png)
3. `props` 第二种写法: `函数` 写法
    - 函数接收 `$route` 为参数, 依靠返回对象来给路由组件传值
    - 注意, 如果要接收 `query` 参数, 记得 `path` 中不能写路径变量
    - ```js
      {
        path: 'message',
        component: HomeMessage,
        children: [
          {
            name: 'myDetail',
            path: 'detail',
            component: Detail,
            props: (route) => {
              return {
                id: route.query.id,
              }
            }
          },
        ]
      },
    - 这次使用 `query` 传参. `HomeMessage.vue`
      - ```html
        <router-link :to="{
          path: '/home/message/detail',
          query: {
            id: msg.id
          }
        }">{{msg.msg}}</router-link>
    - `Detail.vue`
      - ```js
        props: ['id'],
      - ```html
        <h3>props function 写法</h3>
        <h3>query by props 传来的 id 是: {{id}}</h3>
    - ![](../image/Snipaste_2022-02-05_10-04-18.png)
### <router-link>
1. `replace`
    - 设置 `replace` 属性的话, 当点击时, 会调用 `router.replace()` 而不是 `router.push()`,于是导航后不会留下 `history` 记录.
### 编程式路由导航
1. 有时声明式路由导航并不能满足所有路由需求, 比如登陆成功后自动跳转, 路由控制需要放在登录成功的回调函数里
2. 使用 `$router.push` 和 `$router.replace` 可以进行路由控制
    - 在 `HomeMessage.vue`
      - ```html
        <router-link :to="{
          path: '/home/message/detail',
          query: {
            id: msg.id
          }
        }">{{msg.msg}}</router-link>
        <button @click="pushShow(msg)">push跳转</button>
        <button @click="replaceShow(msg)">replace跳转</button>
      - ```js
        methods: {
          pushShow(msg) {
            this.$router.push({
              path: '/home/message/detail',
              query: {
                id: msg.id
              }
            })
          },
          replaceShow(msg) {
            this.$router.replace({
              path: '/home/message/detail',
              query: {
                id: msg.id
              }
            })
          },
        }
      - 可以看出编程时路由导航和声明式路由导航的 `API` 设计一致性
3. 控制页面前进, 后退, 刷新
    - ```html
      <h3>Vue-router</h3>
      <button @click="forward">前进</button>
      <button @click="back">后退</button>
      <button @click="go">go刷新</button>
    - ```js
      methods: {
        forward() {
          this.$router.forward();
        },
        back() {
          this.$router.back();
        },
        go() {
          this.$router.go(0);
        },
      }
    - `this.$router.go()`
      - 接收参数, 如果是 `0`, 就刷新当前页面; 如果正整数, 就前进几个路由; 如果负整数, 就后退几个路由; 
### 缓存路由组件
1. 需求: 在新闻页的每条新闻后面加上输入框.
    - 因为切换 `News` 和 `Message` 组件, `News` 会被销毁, 所以输入的内容会被清空,
2. 修改 `Home.vue`
    - 使用 [`<keep-alive>`](https://cn.vuejs.org/v2/api/#keep-alive)
    - 是一个抽象组件: 它自身不会渲染一个 `DOM` 元素, 也不会出现在组件的父组件链中.
    - 当组件在 `<keep-alive>` 内被切换, 它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行.
    - ```html
      <keep-alive include="HomeNews">
        <router-view></router-view>
      </keep-alive>
3. 属性
    - `include`: 字符串或正则表达式. 只有名称匹配的组件会被缓存.
      - 其值为组件的 `name` 属性
      - ```js
        export default {
          name: 'HomeNews'
        }
      - 所以, 如果要缓存多个, 可以写
      - ```html
        <keep-alive include="HomeNews,HomeMessage">
          <router-view></router-view>
        </keep-alive>
    - `exclude`: 字符串或正则表达式. 任何名称匹配的组件都不会被缓存. 
    - `max`: 数字. 最多可以缓存多少组件实例
### 两个新的生命周期钩子 `activated` 和 `deactivated`
> [参考👉](https://cn.vuejs.org/v2/api/#activated)
1. 了解
    - `activated`: 被 `keep-alive` 缓存的组件`激活`时调用
      - 其执行顺序在 `mounted` 之后
      - ![](../image/Snipaste_2022-02-05_17-27-52.png)
    - `deactivated`: 被 `keep-alive` 缓存的组件`失活`时调用
      - 其执行顺序在 `beforeDestory` 之前
      - ![](../image/Snipaste_2022-02-05_18-34-50.png)
    - 有三个声明周期钩子没有出现在官方文档的生命周期图中, 上面是其中两个, 还有一个是 `$nextTick`
2. 案例
    - 之前写一个东西控制启不停显示和隐藏
    - `HomeNews.vue`
      - ```html
        <ul>
          <li :style="{ opacity }">欢迎学习 Vue</li>
          <li>news 1 <input type="text"></li>
          <li>news 2 <input type="text"></li>
          <li>news 3 <input type="text"></li>
        </ul>
      - ```js
        data () {
          return {
            opacity: 1
          }
        },
        mounted() {
          console.log('news is created');
          this.timer = setInterval(() => {
            console.log('@');
            this.opacity -= 0.01;
            if (this.opacity < 0) {
              this.opacity = 1;
            }
          }, 16);
        },
    - 之前的写法是在 `beforeDestory` 钩子中销毁定时器, 但是由于 `HomeNews` 组件被缓存, 并不会调用 `beforeDestory` 钩子, 所以即便该组件处于 `deactivated` 状态, 定时器仍在运行, 造成浪费🙅‍
    - 所以, 改写代码, 将定时器逻辑改变位置
      - ```js
        activated() {
          console.log("news is activated");
          this.timer = setInterval(() => {
            console.log("@");
            this.opacity -= 0.01;
            if (this.opacity < 0) {
              this.opacity = 1;
            }
          }, 16);
        },
        deactivated() {
          console.log("news is deactivated");
          clearInterval(this.timer);
        }
### 导航路由守卫
> 导航: 表示路由正在发生改变 \
> `vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航, 有多种机会植入路由导航过程: 全局的, 单个路由独享的 或者是组件级的. \
> `params` 或 `query` 的改变并不会触发进入或离开导航守卫
#### 全局前置守卫
1. `route人.beforeEach`
    - 使用该方法注册全局的前置守卫. 在路由跳转完成前执行. 当一个导航触发时, 全局前置守卫按照创建顺序调用. 
    - 守卫是异步解析, 此时导航在所有守卫 `resolve` 之前一直处于 `等待中`
    - 每个守卫接收三个参数
      - `to`: 即将进入的目标路由
        - ![](../image/Snipaste_2022-02-05_18-26-45.png)
      - `from`: 正要离开的路由. 同 `to` 属于相同对象
      - `next: Function`: 一定要调中这个方法 `resolve`, 执行效果依赖 `next` 发放调用参数
    - `router/index.js`
      - ```js
        router.beforeEach((to, from, next) => {
          console.log('我是守卫1');
          if (to.path === '/home/about') {
            alert('无权限访问');
          } else {
            next();
          }
        });

        router.beforeEach((to, from, next) => {
          console.log('我是守卫2');
          next();
        });
      - 执行的顺序
        - ![](../image/Snipaste_2022-02-05_18-37-25.png)
        - 而且, 只要有一个全局前置守卫没有 `resolve`, 导航就不会通过
    - 返回值
      - `2.5.0+` 版本, 该方法返回一个移除已注册守卫/钩子的函数. 大概意思就是调用这个返回值函数, 那么其对应的前置导航守卫将会失效.
      - ```js
        const whoAmI = router.beforeEach((to, from, next) => {
          console.log('我是守卫2');
          // next();
        });
        console.log(`whoAmI is `, whoAmI);
        whoAmI();
      - ![](../image/Snipaste_2022-02-05_18-45-59.png)
      - 上面代码中, 第二个导航守卫的 `next()` 已经被注释, 而且调用了其返回值, 所以即便没有 `next()` 路由仍然不受改导航守卫的影响, 因为该导航守卫已经被移除
2. `next()`
    - `next()`: 进行下一个钩子(理解为如果注册了多个导航守卫, 那么执行下一个导航守卫), 如果所有的钩子都执行完, 那么导航的状态就是 `confirmed(已确认)`.
    - `next(false)`: 中断当前导航. 如果浏览器的 `URL` 改变(用户手动输入或者浏览器后退), 那么 `URL` 会重置为 `from` 路由对应的地址. 页面就是点了没效果
    - `next('/')` 或 `next({ path: '/' })`: 跳转到一个不同的地址. 可以向 `next` 传递任意位置的对象
      - ```js
        next('/home/message');
    - `next(error)`: 如果传入 `next` 的参数是一个 `Error` 实例, 那么导航将会被种植并且该错误会被传递给 `router.onError()` 注册过的回调
      - ```js
        router.beforeEach((to, from, next) => {
          console.log('我是守卫1');
          if (to.path === '/myAbout') {
            next(new Error('hahaha'));
          } else {
            next();
          }
        });
      - ![](../image/Snipaste_2022-02-05_18-56-43.png)
#### 全局后置守卫
1. 和前置守卫不同, 这个钩子不会接受 next 函数作为参数. 为啥🤨因为导航已经结束了
    - ```js
      router.afterEach((to, from) => {
        document.title = 'haha';
      });
    - 可以在后置路由守卫中设置 `tab` 页的 `title`, 如果在前置路由守卫中设置, 会因为是否需要鉴权而进行复杂判断从而将设置 `title` 的语句放在不同位置, 不如后置来的干脆
#### 路由独享的守卫
1. 可以在配置路由时直接定义 `beforeEnter` 守卫
    - ```js
      {
        path: 'news',
        component: HomeNews,
        beforeEnter(to, from, next) {
          // 这里的逻辑和全局前置路由守卫一样
        },
      },
2. 只有 `beforeEnter`, ❗**没有** `afterEnter`
#### 组件内的守卫
> 这些守卫都是定义在组件内部
1. `beforeRouteEnter`
    - 在渲染该组件的对应路由被 comfirm 前被调用
    - 🙅‍不能🙅‍获取组件实例 `this`. 因为当守卫执行前, 组件实例还没有被创建
    - ```js
      beforeRouteEnter (to, from, next) {
        console.log('组件内守卫--beforeRouteEnter');
      }
2. `beforeRouteUpdate`
    - 在当前路由改变, 但是该组件被复用时调用.
    -  对于一个带有动态参数的路径, `/home/message/detail/:id`, 在 `/home/message/detail/001` 和 `/home/message/detail/002` 之间跳转时, 由于会渲染相同的 `Detail.vue` 组件, 因此组件实例会被复用, 此时会调用 `beforeRouteUpdate` 钩子, 可访问组件实例 `this`
    - ```js
      beforeRouteUpdate (to, from, next) {
        console.log('组件内路由 - beforeRouteUpdate');
        next();
      }
    - ![](../image/Snipaste_2022-02-06_08-36-38.png)
3. `beforeRouteLeave`
    - 导航离开该组件的对应路由时调用
    - 可以访问组件实例 `this`
    - ```js
      beforeRouteLeave (to, from, next) {
        console.log('组件内守卫--beforeRouteLeave');
        next();
      }
4. 先看一下顺序
    - 我在 `HomeNews.vue` 中加入了所有的导航, 包括全局前置, 全局后置, 路由独享守卫, 组件内路由守卫, 并且全部放行
    - 点击顺序, `home` -> `news` -> `about`. 可以看到都是先进行路由守卫, 守卫通过后才会创建组件执行生命周期钩子. 而且全局的最先执行, 然后是路由独享守卫, 最后组件内路由守卫
    - ![](../image/Snipaste_2022-02-05_19-56-48.png)
    - 还有一个现象, 每一次进行路由导航, 都会完整地执行全局前置和全局后置
#### 全局解析守卫
1. 这个导航守卫时 (`2.5.0+`) 版本可以使用的, 在导航被确认前, 同时在所有组件内守卫和异步路由组件被解析之后, 该路由守卫调用
#### 完整的导航解析流程
1. 完整的导航解析流程
    - 导航被触发;
    - 在失活的组件里调用 `beforeRouteLeave` 守卫;
    - 调用全局的 `beforeEach` 守卫;
    - 在重用的组件里调用 `beforeRouteUpdate` 守卫 `(2.2+)`;
    - 在路由配置里调用 `beforeEnter`;
    - 解析异步路由组件;
    - 在被激活的组件里调用 `beforeRouteEnter`;
    - 调用全局的 `beforeResolve` 守卫 `(2.5.0+)`;
    - 导航被确认;
    - 调用全局的 `afterEach` 钩子;
    - 触发 `DOM` 更新;
    - 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入;
### 路由元信息
1. 定义路由的时候可以配置 `meta` 字段. 其值是一个对象, 可以添加一些我们需要的自定义的属性
    - ```js
      {
        path: 'news',
        component: HomeNews,
        beforeEnter(to, from, next) {
          // 这里的逻辑和全局前置路由守卫一样
          console.log('路由独享守卫--beforeEnter');
          next();
        },
        meta: {
          requireAuth: true,
          title: '新闻',
        },
      },
2. 看看之前写代码的弊端
    - `1️⃣`: 全局后置路由守卫中将所有页面的 `title` 都设置为 `haha`, 这是不合适的, 每个页面应该有自己的 `title`
      - 改写代码
      - ```js
        router.afterEach((to, from) => {
          console.log('全局后置路由守卫 -- afterEach');
          // document.title = 'haha';
          document.title = to.meta.title || '首页'
        });
      - 解释为什么要加 `|| '首页'`🤨因为我们没法给 `/` 加上 `meta` 属性. 只能这样做. 而且这样做在刷新页面时有抖动, 所以完美的解决方案是修改 `package.json` 中的 `name` 属性, 因为 `public/index.html` 下的 `title` 就是从 `package.json` 中读取的
        - ```html
          <title><%= htmlWebpackPlugin.options.title %></title> 
    - `2️⃣`: 如果很多组件页面都需要访问控制, 不可能在在全局前置守卫中写很多个 `to.path === '/xx/xx'` 这样, 也不可能在很多个路由独享守卫中写相同的逻辑
3. 解决第二个问题
    - 在 `routes` 中配置的每个路由对象都是一个 `路由记录`, 路由记录是可以记录的, 比如 `/home/message` 将会匹配到父路由记录 (`/home`) 和 本身路由记录 (`/message`)
    - 一个路由匹配到的所有路有记录都会暴露为 `$route.matched` 数组, 所以检查这个数组就行, 而不需要一级一级一个一个判断
    - ```js
      router.beforeEach((to, from, next) => {
        console.log('全局前置路由守卫 -- beforeEach');
        if (to.matched.some((record) => record.meta.requireAuth)) {
          next(new Error('hahaha'));
        } else {
          next();
        }
      });
### HTML5 History 模式
1. `vue-router` 默认使用 `hash` 模式, 使用 `URL` 的 `hash` 模拟一个完整的 `URL`, 当 `URL` 改变时页面不会发生重新加载
    - `hash` 模式很丑, 可以开启路由的 `history` 模式
2. 使用 `mode` 配置开启 `history` 模式
    - ```js
      const router = new VueRouter({
        mode: 'history',
        routes: [...]
      })
    - 使用 `history` 模式时, `URL` 就像正常的 `url`, 比如 `http://localhost/user/wang`, 但是这种模式需要后端配合, 比如用户刷新当前页面就会直接向浏览器发送 `/user/wang` 的 `GET` 请求, 这时会报错 `404`.
### 路由懒加载
1. 在打包构建应用时, JavaScript 包会变得很大, 影响首页加载. 如果把不同路由对应的组件分割成不同的代码块, 当路由被访问的时候才加载对应组件, 这样更加高效.
2. 结合之前的代码, 







































      