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
- [全局事件总线](#全局事件总线)
- [消息订阅与发布](#消息订阅与发布)
- [`$nextTick`](#nexttick)
- [过渡与动画](#过渡与动画)
  - [单元素/组件的过渡](#单元素组件的过渡)
  - [多个元素的过渡](#多个元素的过渡)
  - [集成第三方动画库(animate.css)](#集成第三方动画库animatecss)

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






























































































      