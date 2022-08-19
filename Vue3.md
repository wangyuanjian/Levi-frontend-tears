# `Vue3`
<!-- TOC -->

- [`Vue3`](#vue3)
  - [创建 `Vue3.0` 工程](#创建-vue30-工程)
    - [使用 `vue-cli`](#使用-vue-cli)
    - [使用 vite](#使用-vite)
  - [工程](#工程)
    - [`createApp()`](#createapp)
    - [`App.vue`](#appvue)
  - [模板语法](#模板语法)
  - [`Composition API`](#composition-api)
    - [`setup`](#setup)
    - [`ref`](#ref)
    - [`reactive`](#reactive)
    - [`Vue2` 和 `Vue3` 的响应式原理](#vue2-和-vue3-的响应式原理)
    - [计算属性(`computed`)](#计算属性computed)
    - [侦听器(`watch`)](#侦听器watch)
      - [侦听基础](#侦听基础)
      - [第三个参数](#第三个参数)
      - [停止侦听器](#停止侦听器)
      - [`watchEffect`](#watcheffect)
    - [回调的刷新时间](#回调的刷新时间)
    - [生命周期](#生命周期)
    - [`hook`](#hook)
    - [`toRef` 和 `toRefs`](#toref-和-torefs)
    - [`shallowReactive` 和 `shallowRef`](#shallowreactive-和-shallowref)
    - [`readonly` 和 `shallowReadonly`](#readonly-和-shallowreadonly)
    - [`toRaw` 和 `markRaw`](#toraw-和-markraw)
    - [`customRef`](#customref)
    - [`provide` 和 `inject`](#provide-和-inject)
    - [`isRef`, `isReactive`, `isProxy`, `isReadonly`](#isref-isreactive-isproxy-isreadonly)
  - [新的组件](#新的组件)
    - [`Fragment`](#fragment)
    - [`Teleport`](#teleport)
  - [内置特殊元素](#内置特殊元素)
  - [其他改变](#其他改变)
  - [单文件组件`<setup>`](#单文件组件setup)
    - [基本语法](#基本语法)
    - [`defineProps()` 和 `defineEmits()`](#defineprops-和-defineemits)
    - [`defineExpose`](#defineexpose)
    - [`useSlots` 和 `useAttrs`](#useslots-和-useattrs)
    - [与普通的 `<script>` 一起使用](#与普通的-script-一起使用)
  - [`CSS` 功能](#css-功能)
    - [`CSS` 作用域](#css-作用域)
    - [`CSS Module`](#css-module)
    - [CSS 中的 `v-bind`](#css-中的-v-bind)
- [`vue-router@4`](#vue-router4)
  - [安装与使用](#安装与使用)
  - [动态路由匹配](#动态路由匹配)
    - [路由的匹配语法](#路由的匹配语法)
    - [嵌套路由](#嵌套路由)
    - [命名视图](#命名视图)
    - [重定向](#重定向)
    - [路由传参](#路由传参)
    - [路由传参](#路由传参-1)
    - [过渡效果](#过渡效果)
    - [滚动行为](#滚动行为)
      - [延迟滚动](#延迟滚动)
    - [导航故障](#导航故障)

<!-- /TOC -->


## 创建 `Vue3.0` 工程
### 使用 `vue-cli`
> 📕要求版本 `4.5.0+` 哦
1. 过程与步骤
    - 输入命令
      - ```
        vue create vue3_test
    - 选择 `Vue 3`
      - ![](../image/Snipaste_2022-06-29_09-49-10.png)
    - 执行命令 `npm run serve`
### 使用 vite
1. 是一种新型前端构建工具, 能够显著提升前端开发体验
    - 优势
      - 开发环境中, 无需打包操作, 可快速的冷启动
      - 轻量快速的热模块替换(`HMR`)
      - 真正的按需编译, 不要再等待整个应用编译完成
    - 和 `webpack` 的对比图
      - ![](../image/bundler.37740380.png)
      - ![](../image/esm.3070012d.png)
2. 创建
    - 执行命令 `npm init vite-app vue3_vite`
    - 进入项目目录
    - 执行 `npm install`
    - 执行 `npm run dev`
    - ![](../image/Snipaste_2022-06-29_10-33-51.png)
## 工程
### `createApp()`
1. 在 `main.js` 中不是通过 `new Vue({})` 的形式构造 `Vue` 实例对象, 而是通过
    - ```js
      import { createApp } from 'vue'
      import App from './App.vue'

      createApp(App).mount('#app')
2. `createApp()`
    - 接收两个参数
      - `rootComponent`: 跟组件
      - `rootProps`: 可选, 是传递给跟组件的 `prop`
    - 修改 `main.js`
      - ```js
        createApp(App, {
          name: 'levi',
          age: 19
        }).mount('#app')
    - 在 `App.vue` 中接收 `prop`
      - ```js
        export default {
          props: {
            name: String,
            age: Number,
          },
          name: 'App',
          components: {
            HelloWorld
          }
        }
    - ![](../image/Snipaste_2022-06-29_10-55-38.png)
3. 查看 `createApp()` 的返回结果
    - 类似 `Vue2` 中的 `vm`, 但是更轻量了
    - ![](../image/Snipaste_2022-06-29_11-08-06.png)
### `App.vue`
1. 可以不使用唯一根标签
## 模板语法
1. 动态绑定多个值
    - 如果一个对象包含多个 `attribute`, 那么可以使用不带参数的 `v-bind` 将这个对象的每个属性都绑定到元素上.
    - ```js
      let attributeObject = {
        id: 'title',
        class: 'title2'
      }
    - ```html
      <h1 v-bind="attributeObject">Hello, World</h1>
    - ![](../image/Snipaste_2022-07-27_14-13-06.png)
## `Composition API`
### `setup`
1. `Vue3` 中的新配置项, 值为一个函数
    - ```js
      export default {
        setup() {
        }
      }
2. 组件中所用到的数据, 方法等都需要写在 `setup` 中.
    - ```js
      export default {
        setup() {
          let name = 'Tom';
          let age = 8;
          function getInfo() {
            alert(`I am ${name} and ${age} years old.`) 
          }

          return {
            name,
            age,
            getInfo,
          }
        }
      }
    - ```html
      <div>{{name}} by {{age}}</div>
      <button @click="getInfo">CLICK ME!</button>
    - ![](../image/Snipaste_2022-06-29_12-46-08.png)
3. `setup` 的返回值
    - 返回对象, 则对象中的属性方法在 `template` 中均可使用
    - 返回渲染函数: 可自定义渲染内容.
      - 首先需要从 `vue` 中引入
      - ```js
        import {h} from 'vue'

        export default {
          setup() {
            let name = 'Tom';
            let age = 8;
            function getInfo() {
              alert(`I am ${name} and ${age} years old.`) 
            }

            return () => h('h1', 'Hello, World')
          }
        }
      - ![](../image/Snipaste_2022-06-29_15-42-07.png)
4. 尽量不要与 `Vue2.x` 混用
    - `Vue2` 中的 `data`, `methods` 等可以访问 `setup` 中的属性方法, 但是反之不成立.
5. 无法访问选项式 `API` 的原因是 `setup 中的 `this` 是 `undefined`. 
6. 执行时间
    - 早于 `beforeCreate`
    - ```js
      export default {
        setup() {
          console.log('i am TestSetUp --- setup');
        },
        beforeCreate() {
          console.log('i am TestSetUp --- beforeCreate');
        },
      }
    - ![](../image/Snipaste_2022-07-02_17-33-21.png)
7. `setup` 接收到的参数
    - `props`: 第一个参数
    - `context`: 第二个参数
    - `props`
      - 首先在父中创建传递
        - ```html
          <TestSetup name="tom" :age="19" />
      - 其次在子组件中生命接收
        - ```js
          export default {
            props: {
              name: {
                type: String,
              },
              age: Number
            },
            setup(props) {
              console.log('props in TestSetUp', props);
            },
          }
        - ![](../image/Snipaste_2022-07-03_10-30-54.png)
8. `setup` 的第二个参数 `context`
    - ![](../image/Snipaste_2022-07-03_10-32-41.png)
    - **`attrs`** 参数
      - 包含了父组件中不作为 `prop` 被识别的 `attribute` 绑定, `class` 和 `style` 除外.
      - 大意就是, 如果父组件传递了一些参数, 但是没有作为子组件的 `prop` 声明接收, 那么这些参数就会进入到 `attrs` 中.
      - 父组件
        - ```html
          <TestSetup name="tom" :age="19" />
      - 子组件: 只声明以一个 `prop` `name`
        - ```js
          export default {
            props: {
              name: {
                type: String,
              },
            },
            setup(props, context) {
              console.log('props in TestSetUp', props, context);
              // console.log('i am TestSetUp --- setup');
            },
            beforeCreate() {
              // console.log('i am TestSetUp --- beforeCreate');
            },
          }
      - ![](../image/Snipaste_2022-07-03_10-37-39.png)
    - **`emit`** 参数
      - 这个就是 `Vue2` 中的 `$emit`
      - 父组件
        - ```html
          <TestSetup @sayYourName="receiveName"/>
        - ```js
          <script setup>
            import TestSetup from './components/TestSetup.vue'

            function receiveName(name) {
              console.log('from son, ', name);
            }
          </script>
      - 子组件
        - ```html
          <div>
            TestSetup
            <button @click="getParentName">getParentName</button>
          </div>
        - ```js
          setup(props, context) {
            function getParentName() {
              context.emit('sayYourName', 'BALABALA')
            }
            return {
              getParentName
            }
          },
      - ![](../image/Snipaste_2022-07-04_17-08-11.png)
    - **`slots`**
      - 插槽. 
      - 首先在子组件中声明两个插槽, 分别为默认插槽和具名插槽
        - ```html
          <div>
            TestSetup
            <slot></slot>
            <slot name="test1"></slot>
          </div>
        - ```js
          setup(props, context) {
            console.log('props in TestSetUp', props, context);
          },
      - 在父组件中放入内容
        - ```html
          <TestSetup @sayYourName="receiveName" name="tom" :age="19">
            <span>123</span>
            <template v-slot:test1>
                asdasd
            </template>
          </TestSetup>
      - ![](../image/Snipaste_2022-07-04_19-03-14.png)
### `ref`
1. `Vue3` 也提供了一个 `ref()` 方法来允许我们创建可以使用任何值类型的响应式 `ref`
    - 如果是基本数据类型, 其响应式仍然通过 `Object.defineProperty` 实现;
    - 如果过是对象类型, 其响应式是通过 `Proxy` 实现;
    - ```js
      import { ref } from 'vue'

      export default {
        setup() {
          let name = ref('Tom');
          let age = ref(8);
          console.log('name is', name)
          function getInfo() {
            alert(`I am ${name} and ${age} years old.`) 
          }

          return {
            name,
            age,
            getInfo,
          }
        }
      }
    - 可以看到 `ref()` 从参数中获得值, 将其包装到一个带 `.value` 属性的 `ref` 对象. 当然, `.value` 也是 **`响应式`** 的.
    - ![](../image/Snipaste_2022-06-29_20-53-20.png)
2. 但是在 `<template>` 中, 使用 `ref` 对象时却不需要使用 `.value` 才能获取到 `ref` 对象的值, `Vue` 自动为我们解包.
    - ```html
      <h2>Ref</h2>
      <hr>
      <div>{{name}} by {{age}}</div>
    - ![](../image/Snipaste_2022-06-29_21-34-19.png)
    - 然后, 却不一定总是奏效, 只有当 `ref` 对象是`顶层` `property` 才会生效.
      - ```js
        export default {
          setup() {
            const person = {
              age: ref(18)
            }
            const { age } = person

            return {
              person,
              age,
            }
          }
        }
      - ```html
        <div>{{person.age + 1}}</div>
        <div>{{person.age}}</div>
        <div>{{age}}</div>
      - 看上面的代码和下面的显示
      - ![](../image/Snipaste_2022-06-29_21-41-17.png)
      - `{{person.age + 1}}` 渲染结果是 `[object Object]1`, 因为 `person.age` 是一个 `ref` 对象, 我们可以通过解构赋值 `const { age } = person` 将 `age` 变成顶级 `property` 来解决这个问题
      - 📕但是, 如果 `ref` 是文本插值符号, 即 `{{}}` 这个符号计算的 **`最终值`**, 那么它也会被解包, 这就是为什么 `<div>{{person.age}}</div>` 可以正常显示的原因.
3. 修改 `ref` 对象的值
    - 通过 `.value`
    - ```js
      function changeName() {
        name.value = 'Jerry';
        age.value = 28;
      }
    - ```html
      <button @click="changeName">改名字啦</button>
4. `ref` 处理对象类型的值
    - ```js
      setup() {
        let user = ref({
          name: 'tom',
          age: 18,
        });
        console.log('user', user);
      }
    - ![](../image/Snipaste_2022-07-01_22-57-55.png)
    - 📕注意, `value` 值为 `Proxy` 的代理对象. 所以, 我们如果修改 `age` 要这样写
      - ```js
        function addAge() {
          user.value.age++;
        }
### `reactive`
1. 定义 **`对象类型`** 的响应式数据, 返回代理类型的对象. 基本类型请用 `ref`
    - 对象类型包括对象, 数组和 `Map`, `Set` 这样的集合类型
    - ```js
      const where = reactive('shanghai')
    - ![](../image/Snipaste_2022-07-02_07-43-38.png)
    - ```js
      const person = reactive({
        name: 'tom',
        age: 18,
        home: {
          province: {
            name: 'Shanghai'
          }
        }
      })
      const hobby = reactive([1, 2, 3])
      console.log('person', person);
    - ![](../image/Snipaste_2022-07-02_08-04-54.png)
2. 修改 `reactive` 定义的返回值
    - `reactive` 可以对对象进行了深层次的响应式, 同时数组的响应式不再仅依赖 `Vue2` 中的 `push` 等方法, 可以通过下标直接修改了
    - ```js
      function changePerson() {
        person.home.province.name = 'Beijing'
      }
      function changeHobby() {
        hobby[0] = -1;
      }
3. `reactive` 对比 `ref`
    - 定义数据
      - `ref` 定义基本类型数据
      - `reactive` 定于对象或数组类型数据
      - `ref` 也可以定义对象或数组类型数据, 内部会自动通过 `reactive` 转为代理对象
    - 原理角度
      - `ref` 通过 `Object.defineProperty` 实现响应式
      - `reactive` 通过 `Proxy` 实现响应式并通过 `Reflect` 操作源对象的内部数据
    - 使用角度
      - `ref` 定义的数据需要使用 `.value` 读取和修改, 但是用在`<template>` 中不需要 `.value`
      - `reactive` 定义的数据, 读取和修改军不需要 `.value`
### `Vue2` 和 `Vue3` 的响应式原理
1. `Vue2`
    - 实现原理
      - 对象类型: 通过 `Object.defineProperty` 对属性的读取, 修改进行拦截(数据劫持)
      - 数组类型: 通过重写更新数组的一系列方法
    - 存在问题
      - 新增或删除属性, 界面不会更新
      - 直接通过下标修改数组, 界面不会自动更新
2. `Vue3`
    - 实现原理
      - 通过 `Proxy(代理)`: 拦截对象中任意属性的变换, 包括属性的`读写`, `添加`和`删除`;
      - 通过 `Reflect(反射)`: 对被代理对象的属性操作
    - 先看下面的简单代码
      - `Proxy` 的第一个参数是要代理的都西昂
      - ```js
        let person = {
          name: 'tom',
          age: 19
        }

        let p = new Proxy(person, {})
      - ![](../image/Snipaste_2022-07-02_09-44-04.png)
    - 基于 `Proxy` 作响应式
      - `Proxy` 的第二个参数: 处理器
        - `get`: `读取`属性时调用
        - `set`: `修改`或`新增`属性时调用
        - `deleteProperty`: `删除`属性时调用 
          - 📕返回 `delete` 操作的结果, 表示是否删除成功.
      - ```js
        let p = new Proxy(person, {
          get(target, prop) {
            console.log(`有人读取了${target}的属性${prop}`);
            return target[prop];
          },
          set(target, prop, value) {
            console.log(`有人修改或新增了${target}的属性${prop}, 值为${value}`);
            target[prop] = value;
          },
          deleteProperty(target, prop) {
            console.log(`有人刹车农户了${target}的属性${prop}`);
            return delete target[prop];
          }
        })
      ![](../image/Snipaste_2022-07-02_10-03-08.png)
    - 但是源码中并不是上面这样写的, 而是使用 `Reflect` `API`
      - ```js
        let p = new Proxy(person, {
          get(target, prop) {
            console.log(`有人读取了${target}的属性${prop}`);
            return Reflect.get(target, prop);
          },
          set(target, prop, value) {
            console.log(`有人修改或新增了${target}的属性${prop}, 值为${value}`);
            Reflect.set(target, prop, value);
          },
          deleteProperty(target, prop) {
            console.log(`有人刹车农户了${target}的属性${prop}`);
            return Reflect.deleteProperty(target, prop);
          }
        })
      - `Reflect` 身上有很多 `Object` 的方法, 但是又有点不一样, 具体的对比可以看[👉MDN官网👈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods), 我们举一个简单的例子
        - ```js
          const obj = {};
          Object.defineProperty(obj, 'from', {
            get() {
              return 'heaven'
            }
          });
          Object.defineProperty(obj, 'from', {
            get() {
              return 'heaven'
            }
          });
        - 当我们使用 `Object.defineProperty` 重复定义相同数据时, 会发生报错
        - ![](../image/Snipaste_2022-07-02_10-34-58.png)
        - 但是使用 `Reflect.defineProperty` 时会返回操作的结果, 从而判断这次操作是否成功, 而避免编写大量 `try...catch`
        - ```js
          const obj = {};
          const result1 = Reflect.defineProperty(obj, 'from', {
            get() {
              return 'heaven'
            }
          });
          const result2 = Reflect.defineProperty(obj, 'from', {
            get() {
              return 'heaven'
            }
          });
          console.log('result1', result1);
          console.log('result2', result2);
        - ![](../image/Snipaste_2022-07-02_10-37-40.png)
### 计算属性(`computed`)
1. 仅有 `getter` 的计算属性
    - 使用计算属性时需引入 `computed`, 并传递回调函数
    - ```html
      <div>
        {{longNames}}
      </div>
    - ```js
      import { reactive, computed } from 'vue'

      let names = reactive(['tom', 'jerry', 'peiqi']);

      const longNames = computed(() => {
        return names.filter(name => name.length > 4);
      })
      console.log('longNames, ', longNames)
    - ![](../image/Snipaste_2022-07-04_19-12-36.png)
    - 计算属性的返回值是一个 `ref`. 在模板中可以直接拆箱使用
    - ![](../image/Snipaste_2022-07-04_19-18-27.png)
2. 带有 `setter` 的计算属性
    - 计算属性默认仅能通过计算函数得到结果, 当尝试修改计算属性时会得到运行时警告
      - ```js
        longNames.value = [1, 2, 3]
      - ![](../image/Snipaste_2022-07-04_19-21-09.png)
    - 如果需要可写属性, 可以提供 `setter`
      - ```html
        <div>
          <label for="first-name">First Name: </label>
          <input type="text" id="first-name" v-model="firstName">
          <br>
          <label for="last-name">Last Name: </label>
          <input type="text" id="last-name" v-model="lastName">
          <br>
          <span>{{fullName}}</span>
          <button @click="changeName">changeName</button>
        </div>
      - ```js
        let firstName = ref('');
        let lastName = ref('');
        const fullName = computed({
          get() {
            return firstName.value + '-' + lastName.value
          },
          set(newValue) {
            [firstName.value, lastName.value] = newValue.split(' ');
          }
        })
        function changeName() {
          fullName.value = 'li si'
        }
      - ![](../image/Snipaste_2022-07-04_19-30-17.png)
3. 最佳实践
    - 计算属性的计算函数之应该用来计算, 而不应该有其他任何副作用. 🙅‍不要在计算属性中发异步请求或修改 `DOM`🙅‍
    - 避免直接修改计算属性的值. 可以把计算属性返回值当作派生的快照, 只有源发生了改变, 快照才会改变. 更改快照是没有意义的.
### 侦听器(`watch`)
#### 侦听基础
1. 使用 `watch` 函数在每次响应式专改发生变化时触发回调函数. 侦听器可以侦听不同类型的数据
2. 侦听 `ref`
    - 直接将 `ref` 作为 `watch` 的第一个参数传递
    - ```html
      <div>
        {{count}}
        <button @click="addCount">addCount</button>
      </div>
    - ```js
      import { ref, watch } from 'vue';

      let count = ref(0);
      watch(count, (newValue, oldValue) => {
        console.log('newValue, oldValue', newValue, oldValue);
      })
      function addCount() {
        count.value++;
      }
    - ![](../image/Snipaste_2022-07-04_19-52-06.png)
3. 侦听一个 `reactive` 的一个普通属性
    - 传递一个 `getter` 函数. 比如我们想侦听 `person` 这个对象中 `age` 属性的变化.
    - ```html
      {{person.age}}
      <button @click="person.age++">addAge</button>
    - ```js
      let person = reactive({
        name: 'tom',
        age: 18,
        address: {
          province: 'NY',
        }
      });
      watch(() => person.age, (newValue, oldValue) => {
        console.log('age newValue, oldValue', newValue, oldValue);
      })
    - ![](../image/Snipaste_2022-07-05_08-40-55.png)
    - 📕但是如果写成下面的样子. 就会出现告警.
      - ```js
        watch(person.age, (newValue, oldValue) => {
          console.log('age newValue, oldValue', newValue, oldValue);
        })
      - ![](../image/Snipaste_2022-07-05_08-40-37.png)
4. 侦听一个 `reactive` 的多个普通属性
    - 需要将一个数组传递给 `watch` 的第一个参数, 数组的每个值都是一个 `getter`. 同样, 回调函数中的参数也是数组形式
    - ```html
       {{person.age}}
        <button @click="person.age++">addAge</button>
    - ```js
      watch([() => person.age, () => person.name], (newValue, oldValue) => {
        console.log('age/name newValue, oldValue', newValue, oldValue);
      })
    - ![](../image/Snipaste_2022-07-05_10-34-27.png)
    - 当然, 还可以换一种形式, `watch` 的第一个参数仍然是 `getter`, 但是这个 `getter` 返回数组
    - ```js
      watch(() => [person.age, person.name], (newValue, oldValue) => {
        console.log('age/name array newValue, oldValue', newValue, oldValue);
      })
    - ![](../image/Snipaste_2022-07-05_10-38-33.png)
5. 侦听一个 `reactive` 对象
    - 直接给 `watch` 传入一个响应式对象, 会`隐式`地创建一个`深层`侦听器, 回调函数在所有嵌套的变更时都会被触发
    - ```js
      watch(person, (newValue, oldValue) => {
        console.log('person newValue, oldValue', newValue, oldValue);
      })  
    - 📕官网文档中有说, 如果是因为这个响应式对象的某个属性发生了变化, 此时 `newValue` 和 `oldValue` 是相同的, 因为它们是同一个对象.
      - 下面的例子, 年龄 `age` 的侦听器侦听到了 `age` 的变化, 但是 `person` 侦听器回调函数中的 `age` 却没有改变. 
      - ![](../image/Snipaste_2022-07-05_09-34-07.png)
    - 📕即便此时手动增加 `deep: false`, 也没有办法取消深层侦听.
      - ```js
        watch(person, (newValue, oldValue) => {
          console.log('person newValue, oldValue', newValue, oldValue);
        }, { deep: false })  // not working
6. 侦听 `reactive` 的一个对象属性
    - 那什么时候 `deep: false` 有效果呢? 当侦听 `reactive` 的某个对象, 比如 `person` 的 `address` 时有效.
      - ```html
        {{person.address.province}}
        <button @click="changeAddress">changeAddress</button>
      - ```js
        watch(() => person.address, (newValue, oldValue) => {
          console.log('address newValue, oldValue', newValue, oldValue);
        }, {deep: true,}) 
        function changeAddress() {
          person.address.province = 'LA'
        }
    - 📕不过可惜的是, 仍然新旧对象一致. 官网原话是 `在深层级模式时, 如果回调函数由于深层级的变更而被触发, 那么新值和旧值将是同一个对象`
    - ![](../image/Snipaste_2022-07-05_10-30-36.png)
#### 第三个参数
7. `watch` 的第三个参数: 配置项
    - `immediate(boolean)`: 在侦听器创立时立即触发回调. 第一次调用时旧值为 `undefined`. 默认为 `false`;
    - `deep(boolean)`: 如果源是对象, 强制深度遍历. 默认为 `false`;
    - `flash(string)`: 调整回调函数的刷新时机. 可选值为 `pre`, `post`, `sync`. 默认为 `pre`; 
    - `onTrack`: 调试侦听器的依赖. 是个函数;
    - `onTrigger`: 调试侦听器的依赖. 是个函数.
#### 停止侦听器
1. `watch` 的返回值是一个函数, 调用该函数可以停止侦听
    - ```js
      let count = ref(0);
      let stopWatchingCount = watch(count, (newValue, oldValue) => {
        console.log('newValue, oldValue', newValue, oldValue);
      })
      function stopWatchCount() {
        stopWatchingCount();
      }
#### `watchEffect`
1. 立即运行一个函数, 同时响应式地追踪其依赖, 并在依赖更改时重新执行
    - 两个参数:
      - 参数 `1`: 要运行的副作用函数. 副作用函数的参数也是一个函数, 用来注册清理回调. 清理回调会在该副作用下一次执行前被调用, 可以用来清理无效的副作用, 例如等待中的异步请求.
      - 参数 `2`: 可选, 用来调整副作用的刷新时机或调试副作用的依赖.
    - 一个返回值: 用来停止该副作用的函数.
    - ```html
      {{name}}
      <button @click="name+='!'">changeName</button>
    - ```js
      let name = ref('tom');
      watchEffect(() => {
        console.log('name', name.value);
      });
    - ![](../image/Snipaste_2022-07-05_14-32-54.png)
2. 来看副作用函数的参数, 用来注册清理回调.
    - 它接收一个函数为参数, 并且在副作用下一次执行前被调用. `watchEffect` 立即运行时不会调用.
    - ```js
      watchEffect((onCleanup) => {
        console.log('name', name.value);
        onCleanup(() => console.log('i am cleanup'));
      });
    - ![](../image/Snipaste_2022-07-05_14-41-21.png)
4. `watch` 和 `watchEffect` 的区别
    - 区别主要是追踪响应式依赖的方式
    - `watch`: 只追踪明确侦听的源. 不会追踪任何在回调中访问到的东西. 另外, 尽在响应源确实改变时才会触发回调. `watch` 会避免在发生副作用时追踪依赖, 因此可以更加精确地控制回调函数的触发时机.
    - `watchEffect`, 则会在副作用发生期间最终依赖. 他会在同步执行过程中, 自动追踪所有能访问到的响应式 `property`, 这更方便和简洁, 但是响应式依赖关系不那么明显.
### 回调的刷新时间
1. 当修改了响应式状态, 可能会触发 `Vue` 组件更新和侦听器回调. 
    - 默认情况下, 用户创建的侦听器回调, 都会在 `Vue` 组件更新`之前`被调用, 这意味着在侦听器回调中访问的 `DOM` 将是被 `Vue` 更新前的状态
    - 如果想在侦听器回调中能访问 `Vue` 更新之后的 `DOM`, 需要指明 `flust: 'post'` 选项, 
    - 后置刷新的 `watchEffect` 有个别名别名 `watchPostEffect`
      - 注意体会下面两种的区别, 使用 `watch` 手动指定了侦听源, 但是使用 `watchPostEffect` 的话, 必须在 `callback` 内部使用了对象才会侦听对象哦~
    - ```js
      watch(count, () => {
        console.log('watch-更新之后', document.getElementById('testSpan').innerHTML)
      }, {
        flush: 'post'
      });
      
      watchPostEffect(() => {
        console.log('watchPostEffect-更新之后', document.getElementById('testSpan').innerHTML)
        let a = count.value;
      })
### 生命周期
![](../image/lifecycle.16e4c08e.png)
1. Vue3 中可以继续使用 Vue2 的生命周期钩子, 但有两个给更名
    - `beforeDestroy` 改为 `beforeUnmount`
    - `destroyed` 改为 `unmounted`
2. Vue3 中也提供了组合式 API 的生命周期钩子, 与 Vue2 中生命周期钩子的对应关系如下
    - |Vue2|Vue3|
      |---|---|
      |beforeCreate|setup|
      |created|setup|
      |beforeMount|onBeforeMount|
      |mounted|onMounted|
      |beforeUpdate|onBeforeUpdate|
      |updated|onUpdated|
      |beforeUnmount|onBeforeUnmount|
      |Unmounted|onUnmounted|
3. 代码
    - 首先是子组件
      - ```html
        <div>
          {{count}}
          <button @click="add">count++</button>
        </div>
      - ```js
        <script setup>
          import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
          let count = ref(0);
          function add() {
            count.value++;
          }
          onBeforeMount(() => {
            console.log('---onBeforeMount---');
          })
          onMounted(() => {
            console.log('---onMounted---');
          }) 
          onBeforeUpdate(() => {
            console.log('---onBeforeUpdate---');
          }) 
          onUpdated(() => {
            console.log('---onUpdated---');
          })
          onBeforeUnmount(() => {
            console.log('---onBeforeUnmount---');
          }) 
          onUnmounted(() => {
            console.log('---onUnmounted---');
          }) 
          </script>
    - 父组件
      - ```html
        <TestLifeCycle v-if="lifeCircleVisible" />
        <hr>
        <button @click="lifeCircleVisible = false">卸载Life-Cycle</button>
      - ```js
        import TestLifeCycle from './components/TestLifeCycle.vue'
        import { ref } from 'vue'

        function receiveName(name) {
          console.log('from son, ', name);
        }
        let lifeCircleVisible = ref(true);
      - ![](../image/Snipaste_2022-07-09_10-30-54.png)
### `hook`
1. `hook` 本质是一个函数, 把 `setup` 函数中的组合式 `API` 进行封装, 类似 `Vue2` 中的 `mixin`. 从而复用代码.
2. 代码
    - 创建 `src/hooks/usePoint.js`
      - 一般将 `hook` 命名为 `useXxx` 的形式. 在 hook 中我们创建并返回了一个响应式对象, 添加了生命周期钩子用来注册页面点击事件.
      - ```js
        import { reactive, onMounted, onBeforeUnmount  } from 'vue';

        export default function() {
          let point = reactive({
            x: 0,
            y: 0,
          });

          function savePoint(event) {
            point.x = event.pageX;
            point.y = event.pageY;
          }

          onMounted(() => {
            window.addEventListener('click', savePoint);
          })

          onBeforeUnmount(() => {
            window.removeEventListener('click', savePoint);
          })

          return point;
        }
    - 子组件: 引入 `hook`, 调用这个暴露的函数
      - ```html
        <div>
          <h2>Mouse Click at, X:{{point.x}}, Y:{{point.y}}</h2>
        </div>
      - ```js
        <script setup>
          import usePoint from '../hooks/usePoint'
          let point = usePoint();
        </script>
    - ![](../image/Snipaste_2022-07-09_11-39-19.png)
3. 如果有其他组件也需要获取鼠标坐标, 就可以直接引入这个钩子, 来实现组件的复用.
### `toRef` 和 `toRefs`
1. 可以从一个 `reactive` 对象的某个属性创建一个 `ref` 对象. 如果修改 `ref`, `reactive` 中的属性将会发生改变, 反之相同.
    - 这解决的一个问题是, 如果对象属性嵌套太深, 在模板中使用该属性就会写很多代码.
    - 语法
      - `toRef(object, key)`
    - ```js
      import { reactive, toRef } from 'vue';
      export default {
        setup() {
          let person = reactive({
            name: 'tom',
            salary: {
              count: '20K'
            }
          });
          return {
            count: toRef(person.salary, 'count'),
            person
          }
        }
      }
    - ```html
      <div>
        <h3>count: {{count}}</h3>
        <button @click="person.salary.count='30K'">changeCount</button>
      </div>
    - ![](../image/Snipaste_2022-07-10_10-32-38.png)
    - 📕注意下面两种写法的区别
      - ```js
        return {
          count: toRef(person.salary, 'count'),
          count: ref(person.salary.count),
        }
      - 两种写法都创建了一个 `ref` 对象, 但只有第一种写法将 `ref` 对象和源对象关联了起来. 
2. 如果定义的是一个原 `reactive` 不存在的属性时, 不会将该属性保存到原 `reactive` 上, 但是如果修改了这个属性, 就会了.
    - 📕注意这里使用了 `toRef` 的第三个参数, 默认值
    - ```js
      setup() {
        let person = reactive({
          name: 'tom',
          salary: {
            count: '20K'
          }
        });
        return {
          count: toRef(person.salary, 'count'),
          peiqi: toRef(person.salary, 'peiqi', 100),
          person
        }
      }
    - ```html
      <h3>count: {{count}}-{{peiqi}}</h3>
      <button @click="peiqi=200">changePeiqi</button>
    - ![](../image/Snipaste_2022-07-10_10-42-59.png)
3. `toRefs`
    - 如果某个 `reactive` 的很多属性都需要转成 `ref`, 一个一个地用 `toRef` 就太慢了. 因此 `toRefs` 将 `reactive` 对象转成一个普通对象, 这个普通对象的每个属性都是一个指向 `reactive` 中对应属性的 `ref`.
    - ```js
      setup() {
        let person = reactive({
          name: 'tom',
          salary: {
            count: '20K'
          }
        });
        return {
          count: toRef(person.salary, 'count'),
          peiqi: toRef(person.salary, 'peiqi', 100),
          person,
          ...toRefs(person),
        }
      }
    - ```html
      {{name}}-{{salary}}
      <button @click="salary.count='40k'">changeSalary</button>
    - 使用扩展运算符(`...`)之后, 就暴露出了 `name` 和 `salary` 两个属性.
      - 📕注意我们修改 `salary`, 剩余两处的值也发生了变化
    - ![](../image/Snipaste_2022-07-10_11-09-16.png)
### `shallowReactive` 和 `shallowRef`
1. `shallowReactive`
    - `shallowReactive` 是 `reactive` 的 `shallow` 版本, 只有对象的根属性才是响应式的.
    - ```html
      <div>
        {{person}}
        <button @click="changePersonNation">changePersonNation</button>
        <button @click="changePersonName">changePersonName</button>
      </div>
    - ```js
      <script setup>
        import { reactive, shallowReactive, shallowRef } from 'vue';
        let person = shallowReactive({
          name: 'tom',
          address: {
            nation: 'USA'
          },
        });
        function changePersonNation() {
          person.address.nation = 'UK';
          console.log('person', person);
        }
        function changePersonName() {
          person.name = 'Sherlok'
        }
        </script>
    - 可以看到修改数据后, 页面没有发生了变化, 但是数据确实改变了, 因为丢失了响应式. 📕如果在修改之前点开开发者工具, 那么修改数据后开发者工具内容不会改变, 但是数据的确改变了.📕
    - ![](../image/Snipaste_2022-07-10_20-34-08.png)
    - 如果接下来修改名字, 那么整个页面都会改变,
    - ![](../image/Snipaste_2022-07-10_20-37-38.png)
2. `shallowRef`
    - 同样的, `shallowRef` 只处理基本数据类型的响应式, 对于对象类型, 不会深度响应式处理, 只有 `.value` 是响应式的.
    - ```html
      {{count}}
      <button @click="count++">count++</button>
      <hr>
      {{point}}
      <button @click="changeX">changeX</button>
      <button @click="changePoint2">changePoint2</button>
    - ```js
      let count = shallowRef(0);
      let point = shallowRef({
        x: 0,
        y: 0,
      })
      function changeX() {
        point.value.x = 2;
        console.log('point in changeX', point);
      }
      function changePoint2() {
        point.value = {
          x: 2,
          y: 2
        }
        console.log('point in changePoint2', point);
      }
    - 可以看到, 单独修改 `x` 并不会触发响应式虽然数据已经更改, 只有通过 `.value` 修改数据才可以.
    - ![](../image/Snipaste_2022-07-11_18-56-55.png)
### `readonly` 和 `shallowReadonly`
1. `readonly`
    - 接受一个对象(不论是否为响应式)或是一个 `ref`, 返回一个原值的只读代理.
    - 只读代理是深层次的, 任何嵌套的 `property` 的访问都是只读的
    - 如果修改只读代理, 将会收到一个警告; 如果修改原值, 只读代理会同步修改
      - ```html
         <div>
          <span>{{user}}</span>
          <span>{{userCopy}}</span>
          <button @click="changeSalary">changeSalary</button>
          <button @click="changeSalarySource">changeSalarySource</button>
        </div>
      - ```js
        import { reactive, readonly, watchEffect } from 'vue';
        const user = reactive({
          name: 'levi',
          age: 18,
          salary: {
            month: 29
          }
        })
        let userCopy = readonly(user);

        watchEffect(() => {
          console.log('user.salary.month, ', user.salary.month);
        })
        function changeSalary() {
          userCopy.salary.month++;
        }
        function changeSalarySource() {
          user.salary.month++;
        }
    - 看下面的截图, 先修改两次源数据的值, 再修改两次只读副本的值. (`watchEffect` 输出三次打印的原因是 `watchEffect` 是立即执行的.)
    - ![](../image/Snipaste_2022-07-13_19-28-32.png)
  - 对 `ref` 的只读设置是同样的. 
    - 而且 `ref` 只读副本的解包也是同样的, 在模板中不需要使用 `.value` 就可以访问其值.
    - 同样修改原值只读副本的值也会发生变化
    - ```html
      <span>{{count}}</span>|
      <span>{{countCopy}}</span>
      <button @click="changeCount">changeCount</button>
      <button @click="changeCountCopy">changeCountCopy</button>
    - ```js
      const count = ref(0);
      let countCopy = readonly(count);
      console.log('countCopy', countCopy);
      function changeCount() {
        count.value++;
      }
      function changeCountCopy() {
        countCopy.value++;
      }
    - ![](../image/Snipaste_2022-07-13_19-38-13.png)
2. `shallowReadonly`
    - `readonly` 的浅层作用形式. 没有深层次的转换, 只有根层级的 `property` 变成了只读.
    - 修改 `shallowReadonly` 的深层属性会使页面响应式修改, 并且原值和原值的 `readonly` 副本也会同步修改
    - ```js
      import { ref, reactive, shallowReadonly } from 'vue';
      const user = reactive({
        name: 'levi',
        age: 18,
        salary: {
          month: 29
        }
      })
      let userShallowCopy = shallowReadonly(user);
      console.log('userShallowCopy', userShallowCopy);
      function changeSalaryShallowCopy() {
        userShallowCopy.salary.month++;
        // 值改变
      }
      function changeAgeShallowCopy() {
        userShallowCopy.age++;
        // 控制台收到警告: Set operation on key "age" failed: target is readonly. 
      }
### `toRaw` 和 `markRaw`
1. `toRaw`
    - 创建一个 `Vue` 创建的代理返回其原始对象.
    - `toRaw` 可以返回由 `reactive`, `readonly`, `shallowReactive` 或者 `shallowReadonly` 创建的代理对应的原始对象.
    - 通过这个方法, 我们拿到原始对象然后修改原始对象但不会引起页面的刷新, 这是一种应用场景. 📕但是官网不建议保存对原始对象的持久引用, 需要谨慎使用!
    - ```html
      <span>{{userReactive}}</span>
      <button @click="changeRawUserAge">changeRawUserAge</button>
      <button @click="changeReactiveUserAge">changeReactiveUserAge</button>
      <button @click="changeSourceUserAge">changeSourceUserAge</button>
    - ```js
      import { reactive, toRaw } from 'vue';
      let userSource = {
        name: 'levi',
        age: 18,
        salary: {
          month: 29
        }
      };
      const userReactive = reactive(userSource);
      const userRaw = toRaw(userReactive);
      console.log('userRaw', userRaw);
      console.log('==', userRaw === userSource);
      console.log('plain object Raw', toRaw({}));

      function changeRawUserAge() {
        userRaw.age++;
      }
      function changeReactiveUserAge() {
        userReactive.age++;
      }
      function changeSourceUserAge() {
        userSource.age++;
      }
    - 从下图可以看出, `toRaw` 也可以接受一个非响应式对象做参数. 而且原对象, 响应式对象和 `toRaw` 返回的对象中, 任意修改一个, 剩下两个也会修改
    - ![](../image/Snipaste_2022-07-14_09-08-25.png)
2. `markRaw`
    - 将一个对象标记为不可被转为代理. 使用场景是
      - 有些值不应该是响应式的, 例如复杂的第三方类实例或者 `Vue` 组件对象.
      - 当呈现带有不可变数据源的大型列表时, 跳过代理转换可以提高性能.
    - ```js
      let user1 = {
        name: 'abc',
        age: {
          tomorrow: 20
        }
      };
      let userMarkRaw = markRaw(user1);
      console.log('userMarkRaw', userMarkRaw);
    - ![](../image/Snipaste_2022-07-14_14-03-52.png)
### `customRef`
1. 创建一个自定义的 `ref`, 显式声明对其依赖追踪和更新触发的控制方式
    - `customRef` 接收一个工参数厂函数作为参数, 这个工厂函数接受 `track` 和 `trigger` 两个函数作为参数, 并返回一个带有 `get` 和 `set` 方法的对象.
    - 一般来说 `track()` 应该在 `get()` 方法中调用, 而 `trigger()` 应该在 `set` 中调用. 事实上, 我们对他们何时调用有完全的控制权
2. 实现一个案例. 防抖的输入框, 用户最后一次输入的一秒后才更新页面 `<h3>` 的值
    - ```html
      <input type="text" v-model="input1">
      <h3>{{input1}}</h3>
    - ```js
      import { customRef } from 'vue';

      const input1 = myRef('what', 1000)
      function myRef(value, timeout) {
        let timeoutId;
        return customRef((track, trigger) => {
          return {
            get() {
              track();
              return value;
            },
            set(newValue) {
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => {
                value = newValue;
                trigger();
              }, timeout)
            }
          }
        })
      }
### `provide` 和 `inject`
1. 为了解决跨层级传递 `props` 的问题, 可以使用 `provide` 和 `inject`.
    - 一个父组件相对于其所有的后代组件, 会作为依赖`提供(Provide)`者. 任何后代的组件树, 无论层级多深, 都可以`注入(Inject)` 由父组件提供给整条链路的依赖.
    - ![](../image/prop-drilling.11201220.png)
    - ![](../image/provide-inject.3e0505e4.png)
2. 案例
    - 要为组件后代供给数据, 需要使用到 `provide()` 函数. 其接收两个参数
      - `注入名`: 可以是一个字符串或 `Symbole`. 后代组件会用注入名查找期望注入的值. 
      - `值`: 值可以是任意类型, 包括响应式的状态, 比如一个 `ref`
      - 一个组件可以多次调用 `provide()`, 使用不同的注入名注入不同的依赖
    - 要注入祖先组件供给的数据, 需使用 `inject()` 函数
      - 第一个参数就是 `注入名`
      - 如果供给的值是一个 `ref`, 注入进来的就是它本身, 而不会自动解包.这使得被注入的组件保持了和供给者的响应性链接, 也就是可以在孙子组件中直接修改爷爷组件的值
      - 默认情况下, `inject` 假设传入的注入名会被某个祖先链上的组件提供. 如果该注入名的确没有任何组件提供, 则会抛出一个运行时警告
        - ![](../image/Snipaste_2022-07-14_19-43-34.png)
      - 可以提供第二个参数作为 `默认值`
    - `爷爷组件`
      - ```html
        <div class="grand-father">
          <div>{{name}}</div>
          <div>{{age}}</div>
          <div>{{address}}</div>
          <Father/>
        </div>
      - ```js
        import { provide, ref, reactive } from 'vue';
        import Father from './Father.vue'

        let name = 'tom';
        let age = ref(18);
        let address = reactive({
          postcode: 200200
        });
        provide('name', name);
        provide('age', age);
        provide('address', address);
    - `父组件`
      - ```html
        <div class="father">
          <Son/>
        </div>
      - ```js
        import Son from './Son.vue'
    - `子组件`
      - ```html
        <div class="son">
          <button @click="age++">changeAge</button>
          <button @click="address.postcode++">changeAddress</button>
        </div>
      - ```js
        import { inject } from 'vue';
        const name = inject('name', '123');
        const age = inject('age');
        const address = inject('address');
        const notExisted = inject('not-existed');
    - ![](../image/Snipaste_2022-07-14_19-45-03.png)
3. 配合响应式
    - 当使用响应式 `provide` / `inject` 的值时, **应尽可能将对响应式状态的修改都保持在 `provide` 内**.
    - 所以, 在调用 `provide` 时可以同时传入数据和更改数据的方法.
    - 如果不想后代组件修改 provide 传递的值, 可以将传递的值使用 `readonly` 包装.
    - `爷爷组件`
      - ```js
        let salary = ref(1000);
        function updateSalary(bonus) {
          salary.value += bonus;
        }
        provide('salary', {
          salary,
          updateSalary
        })
    - `孙子组件`
      - ```html
        <button @click="up">涨薪</button>
      - ```js
        const { salary, updateSalary } = inject('salary');
        function up() {
          updateSalary(100);
        }
4. 使用 `Symbol` 作为注入名
    - 如果构建大型应用程序或者编写提供给其他开发者使用的组件库时, 最好使用 `Symbol` 作为注入名来避免冲突.
    - 📕建议在一个单独的文件中导出这些注入名的 `Symbol`
    - 在同级目录下创建 `key.js`
      - ```js
        export const HOBBY = Symbol();
    - 爷爷组件
      - ```js
        import { HOBBY } from './key'
        provide(HOBBY, 'running');
    - 孙子组件
      - ```html
        <h3>{{ hobby }}</h3>
      - ```js
        import { HOBBY } from './key'
        const hobby = inject(HOBBY, '');
    - ![](../image/Snipaste_2022-07-15_09-20-30.png)
5. `app.provide`
    - 除了攻击一个组件的数据, 还可以在整个应用层面供给
    - `main.js`
      - 📕一定要注意 `provide` 和 `mount` 的`调用顺序`!!!
      - ```js
        const app = createApp(App);

        app.provide('author', 'Levi');
        app.mount('#app');
    - 孙子组件
      - ```html
        <h3>{{ hobby }} by {{author}}</h3>
      - ```js
        const author = inject('author');
    - ![](../image/Snipaste_2022-07-15_09-40-01.png)
### `isRef`, `isReactive`, `isProxy`, `isReadonly`
1. 官网定义
    - `isRef()`: 检查某个值是否为 `ref`
    - `isProxy()`: 检查一个对象是否是由 `reactive()`,`readonly()`, `shallowReactive()` 或 `shallowReadonly()` 创建的代理
    - `isReactive()`: 检查一个对象是否是由 `reactive()` 或 `shallowReactive()` 创建的代理
    - `isReadonly()`: 检查一个对象是否是由 `readonly()` 或 `shallowReadonly()` 创建的代理
    - ```js
      import { ref, reactive, readonly, isRef,  isReactive, isReadonly, isProxy } from 'vue'
      
      const count = ref(1);
      const person = reactive({
        name: 'tom',
        age: 18
      });
      const personReadonly = readonly(person);
      
      console.log('isRef(count)', isRef(count));
      console.log('isReactive(person)', isReactive(person));
      console.log('isProxy(count)', isProxy(count));
      console.log('isProxy(person)', isProxy(person));
      console.log('isProxy(personReadonly)', isProxy(personReadonly));
      console.log('isReadonly(personReadonly)', isReadonly(personReadonly));
    - ![](../image/Snipaste_2022-07-15_17-40-57.png)
## 新的组件
### `Fragment`
1. 在 `Vue2` 中组件必须有一个跟标签, 在 `Vue3` 中组件可以没有跟标签, 内部会将多个标签包含在一个 `Fragment` 的虚拟元素中.
    - 好处, 减少标签层级, 减少内存占用
    - ```html
      <template>
        <h1>asd</h1>
        <h1>qwe</h1>
      </template>
    - ![](../image/Snipaste_2022-07-16_09-51-48.png)
2. 当然上面的代码还是可以写成
    - ```html
      <template>
        <Fragment>
          <h1>asd</h1>
          <h1>qwe</h1>
        </Fragment>
      </template>
    - ![](../image/Snipaste_2022-07-16_09-57-08.png)
    - 这时候开发者工具的 `fragment` 就消失了.
### `Teleport`
1. `<Teleport>` 是一个内置组件, 使我们可以将一个组件的一部分模板"传送"到该组件的 `DOM` 层次结构之外的 `DOM` 节点中.
2. 有时我们可能会遇到一下情况: 组件模板的一部分在逻辑上属于它, 但是从视图角度来看, 在 `DOM` 中它应该显示在 `Vue` 应用之外的其他地方.
    - 最常见的例子是构建一个全屏的模态框. 理想情况下, 模态框的按钮和模态框本身是在同一个组件, 因为他们都与组件的开关状态有关.
    - 但是这意味着模态框与打开模态框的按钮要一起出现, 并且位于应用程序的 `DOM` 更深层次的结构. 想要通过 `CSS` 选择器定位该模态框时非常困难.
    - 下面时经常实现的模态框写法
      - ```html
        <template>
          <button @click="open = true">打开</button>
          <div class="modal" v-if="open">
            <p>来自模态框的问候</p>
            <button @click="open = false">关闭</button>
          </div>
        </template>
        <style scoped>
        .modal {
          position: fixed;
          z-index: 999;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: aliceblue;
          padding: 1rem;
          border-radius: 5px;
          box-shadow: 0 0 10px 10px rgba(0, 0, 0, .1);
        }
        </style>
      - ```js
        <script setup>
        import { ref } from 'vue';
        const open = ref(false);
        </script> 
    - ![](../image/Snipaste_2022-07-16_15-18-45.png)
    - 当在 HTML 结构中使用这个组件时, 会有一些潜在问题
      - `position: fixed;` 能够相对于视口放置的条件是: **没有任何组件元素设置了 `transform`, `perspectivem` 或者 `filter` 属性**.
        - ![](../image/Snipaste_2022-07-16_15-25-25.png)
      - 模态框的 `z-index` 被包含它的元素制约. 如果有其他元素与父元素重叠并由更高的 `z-index`, 就会覆盖的模态框
        - 下图就是为模态框增加叔叔元素, 且叔叔元素的 `z-index` 比模态框更大, 遮挡了模态框
        - ![](../image/Snipaste_2022-07-16_15-30-17.png)
3. `<Teleport>` 提供一个更简洁的方式解决此类问题, 使我们无需考虑那么多层 `DOM` 结构的问题.
    - ```html
      <template>
        <button @click="open = true">打开</button>
        <Teleport to="body">
          <div class="modal" v-if="open">
            <p>来自模态框的问候</p>
            <button @click="open = false">关闭</button>
          </div>
        </Teleport>
      </template>
    - 为 `<Teleport>` 指定的目标 `to` 期望接收一个 `CSS` 选择器字符串或者一个真实的 `DOM` 节点. 就是告诉 `Vue` 将 `<Teleport>` 包裹的模板片段传送到 `body` 标签下.
    - ![](../image/Snipaste_2022-07-16_15-35-24.png)
    - 📕 `<Teleport>` 挂载时, 传送门的 `to` 目标`必须是已经存在`于 `DOM` 之中. 理想情况下, 应该是这个 `Vue` 应用程序之外的一个元素. 
    - 📕 `<Teleport>` 只改变了渲染的 `DOM` 结构, 不会影响组件间的逻辑关系. 也就是是说如果 `<Teleport>` 包含了一个组件 `A`, 那么 `A` 始终和使用了 `<Teleport>` 的组件保持逻辑上的父子关系. 传入的 `props` 和触发的事件也会照常工作.
4. 禁用 `<Teleport>`
    - 有些情况我们想要在桌面端将一个组件作为弹框使用, 但是在移动段作为行内组件使用. 就可以传入 `disabled` 这个 `prop` 处理.
    - ```html
      <Teleport to="body" :disabled="true">
        <div class="modal" v-if="open">
          <p>来自模态框的问候</p>
          <button @click="open = false">关闭</button>
        </div>
      </Teleport>
    - ![](../image/Snipaste_2022-07-16_15-47-27.png)
    - 注意模态框不再作为 `body` 的子元素出现
5. 同一目标上多个传送门
    - 如果多个 `<Teleport>` 将内容挂载到同一目标元素, 顺序就是简单的顺次追加, 后挂载的将排在目标元素下更后面的位置上.
    - ```html
      <Teleport to="body" :disabled="false">
        <div class="modal" v-if="open">
          <p>来自模态框的问候</p>
          <button @click="open = false">关闭</button>
        </div>
      </Teleport>
      <Teleport to="body" :disabled="false">
        <div class="modal" v-if="open">
          <p>来自模态框的问候2222</p>
          <button @click="open = false">关闭</button>
        </div>
      </Teleport>
    - ![](../image/Snipaste_2022-07-16_16-01-23.png)
## 内置特殊元素
1. `<component>`
    - 这是用于渲染动态组件或元素的原组件
    - 这个组件只有一个 `prop` 就是 `is`. 
      - 当 `is` 是字符串, 它既可以是 `HTML` 标签名也可以是组件的注册名.
      - 或者 `is` 也可以直接绑定到组件的定义
    - 案例
      - ```html
        <button @click="coundPlus">{{ count }}</button>
        <Son></Son>
        <hr>
        <component :is="count % 2 === 0 ? Son : 'a'"></component>
      - ```js
        import { ref } from 'vue'
        import Son from './Son.vue'

        const count = ref(0);
        function coundPlus() {
          count.value++;
        }
      - ![](../image/Snipaste_2022-07-23_16-32-01.png)
## 其他改变
1. `Vue3` 中将这些全局的 `API` 调整到了应用实例 `app` 上
    - |Vue2 全局 API|Vue3 API|
      |---|---|
      |Vue.config.xxx|app.config.xxx|
      |Vue.config.productionTip|`移除`|
      |Vue.component|app.component|
      |Vue.directive|app.directive|
      |Vue.mixin|app.mixin|
      |Vue.use|app.use|
      |Vue.prototype|app.config.globalProperties|
2. 其他修改
    - `data` 应该始终被声明为一个函数
    - 移除 `keyCode` 作为 `v-on` 的修饰符, 同时不再支持 `config.keyCodes`
    - 移除 `v-on.native` 修饰符
    - 移除过滤器 `filter`
## 单文件组件`<setup>`
1. `<script setup>` 是单文件组件 (`SFC`) 中使用组合式 API 编译时的语法糖. 比起普通的 `setup(){}` 语法, 具有一下优势
### 基本语法
1. 使用这个语法只需要将 `setup` 这个 `attribute` 添加到 `script` 代码块
    - ```html
      <script setup>
      </script>
    - 里面的代码会被编译成 `setup()` 函数中的内容. 这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同, `<script setup>` 中的代码会在每次组件实例被创建的时候执行.
2. 顶层的绑定会被暴露给模板
    - 任何顶层的绑定, 包括变量, 函数声明和 `import` 引入的内容都能在模板中直接使用.
      - ```html
        <template>
          <div>
            <button @click="coundPlus">{{ count }}</button>
            <Son></Son>
          </div>
        </template>
      - ```js
        <script setup>
        import { ref } from 'vue'
        import Son from './Son.vue'

        const count = ref(0);
        function coundPlus() {
          count.value++;
        }
        </script>
    - 使用组件
      - `Son` 被当作一个变量引用. 官网建议使用驼峰命名的风格保持一致性. 
3. 递归组件
    - 一个单文件组件是可以通过文件名被自己引用. 例如, 名为 `FooBar.vue` 的组件可以在其模板中用 `<FooBar/>` 引用自己.
### `defineProps()` 和 `defineEmits()`
1. 为了在声明 `props` 和 `emits` 选项时获得完整的类型推断支持, 可以使用 `defineProps` 和 `defineEmits`
    - 他们都是只能在 `<script setup>` 中使用的编译器宏, 不需要导入.
    - 传入到 `defineProps()` 和 `defineEmits()` 的选项会从 `setup` 中提升到模块的作用域, 因此传入的选项`不能`引用在 `setup` 作用域中声明的局部变量, 但是可以引用 `import` 的绑定.
2. `defineProps()`
    - 其接收与 `prop` 相同选项的值.
    - 子组件
      - ```html
        <h3>Son:{{name}}</h3>
      - ```js
        const props = defineProps({
          name: {
            type: String,
            default: 'tom',
            validator(value) {
              return ['tom', 'jerry'].includes(value)
            }
          }
        })
        console.log('props are', props)
      - ![](../image/Snipaste_2022-07-23_17-00-16.png)
    - 父组件
      - ```html
        <Son name="tom"></Son>
        <Son></Son>
3. `defineEmits()`
    - 组件要触发的事件可以显示地通过 `defineEmits()` 宏来声明. 可以以两种形式声明触发地事件
      - 使用字符串数组的简易形式
      - 使用对象的完整形式. 该对象的每个属性都是事件的名称, 值是一个验证函数或者 `null`(表示没有验证函数)
        - 验证函数给接收传递给组件的 `$emit` 调用的额外参数. 例如, 如果 `$emit('foo', 1)` 被调用, 那么 `foo` 函数的验证函数将接受参数 `1`. 验证函数返回 `boolean`, 以表明时间参数是否有效.
    - 父组件
      - ```html
        <Son @click="parentClick" @showAlert="parentShowAlert"></Son>
      - ```js
        function parentClick() {
          console.log('Son 触发了 click')
        }
        function parentShowAlert(n) {
          console.log('Son 触发了 parentShowAlert, 参数是', n)
        }
    - 子组件
      - ```html
        <button @click="$emit('click')">触发click</button>
        <button @click="showAlertEmiter">触发showAlert</button>
      - ```js
        const emit = defineEmits({
          click: null,
          showAlert: (payload) => {
            console.log('payload', payload)
            return true
          }
        })
        console.log('emit', emit);
        function showAlertEmiter() {
          emit('showAlert', 1);
        }
    - 如下图, 子组件在触发 `showAlert` 事件时, 传递了额外参数, 这个参数被传递给了 `showAlert` 的验证函数
    - ![](../image/Snipaste_2022-07-24_21-23-04.png)
    - 如果验证函数返回了 false, 那么控制台会打印下面
    - ![](../image/Snipaste_2022-07-24_21-24-47.png)
### `defineExpose`
1. 使用 `<script setup>` 的组件是**默认关闭**的, 即通过模板 `ref` 或者 `$parent` 链获取到的组件的实例不会暴露任何在 `<script setup>` 中的声明
    - 比如在子组件中定义一个 `count`
      - ```js
        let count = ref(0)
    - 在父组件通过 `ref` 拿到这个 子组件
      - ```html
        <Son ref="sonRef" @click="parentClick" @showAlert="parentShowAlert"></Son>
      - ```js
        const sonRef = ref(null);
        console.log('son', sonRef)
    - ![](../image/Snipaste_2022-07-24_21-39-41.png)
2. 通过 `defineExpose` 这个编译器宏来显示指定要在 `<script setup>` 组件中暴露出去的 `property`. 当父组件通过 `ref` 的方式获得当前的组件时
    - 子组件
      - ```js
        let count = ref(0)
        defineExpose({
          count
        })
    - 父组件
      - ```js
        const sonRef = ref(null);
        console.log('son', sonRef)
        onMounted(() => {
          console.log('son in mounted', sonRef.value.count)
        })
        // console.log('son', sonRef.value.count)
    - ![](../image/Snipaste_2022-07-24_21-55-01.png)
    - 📕只能在父组件`挂载`后才能访问 `ref`, 如果想在模板 `<script setup>` 中访问 `sonRef` 中的值将会得到 `null`, 因为在 `<script setup>` 执行期间, 子组件根本不存在呢!!!
### `useSlots` 和 `useAttrs`
1. 在 `<script setup>` 中使用 `slots` 与 `attrs` 的情况应该相对较为罕见, 因为可以在模板中直接通过 `$slots` 和 `$attrs` 访问它们.
    - 但是可以使用 `useSlots` 和 `useAttrs` 访问.
    - ```js
      import { ref, useSlots, useAttrs } from "vue"

      const slots = useSlots();
      const attrs = useAttrs();
      console.log('slots', slots);
      console.log('attrs', attrs);
    - ```html
      <div>{{ $attrs.sayBye }}</div>
    - ![](../image/Snipaste_2022-07-25_11-01-27.png)
    - `slots` 一般用在手写 `render` 函数渲染, 所以没法在模板渲染.
### 与普通的 `<script>` 一起使用
1. 普通的 `<script>` 在有些情况下或许会被使用得到
    - 无法在 `<script setup>` 声明的选项, 例如 `inheritAttrs` 或通过插件启动的自定义选项.
    - 声明命名导出
    - 运行副作用或者创建只需要执行一次的对象
2. 来看示例
    - 📕在 `<script>` 中无法访问 `<script setup>` 中定义的数据, 但是反过来可以. 这个规则与两个标签书写顺序无关.
    - 另外的一些区别
      - 普通 `<script>`, 在模块作用域下执行 (仅一次)
      - 而 `<script setup>` 在 `setup()` 作用域中执行 (对每个实例皆如此)
    - 执行顺序, 先执行 `<script>` 再执行 `<script setup>`
    - ```js
      <script>
      // 普通 <script>, 在模块作用域下执行 (仅一次)
      runSideEffectOnce()

      let a = 'asd';
      setTimeout(() => {
        console.log('count in script', count)
      })
      // 声明额外的选项
      export default {
        inheritAttrs: false,
        customOptions: {}
      }
      </script>

      <script setup>
      // 在 setup() 作用域中执行 (对每个实例皆如此)
      console.log('a in script', a)
      let count = ref(0)
      </script>
    - ![](../image/Snipaste_2022-07-25_11-12-12.png)
## `CSS` 功能
### `CSS` 作用域
1. 使用 `scoped` 后, 父组件的样式将不会渗透到子组件中. 不过子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响.
2. 深度选择器 `:deep()`
    - 处于 `scoped` 样式中的选择器如果想要做更深度的选择, 即影响到子组件, 可以使用 `:deep` 这个伪类
    - 父组件
      - ```html
        <div class="test">
          <h3>Father-h3</h3>
          <Son></Son>
        </div>
      - ```css
        <style scoped>
        .test h3 {
          background-color: #2ecc71;
        }
        .test h2 {
          background-color: #2ecc71;
        }
        </style>
    - 子组件
      - ```html
        <div>
          <h3>Son-h3</h3>
          <h2>Son-h2</h2>
        </div>
    - 只有父组件的 `<h3>` 背景颜色发生了改变
    - ![](../image/Snipaste_2022-07-25_08-38-15.png)
    - 如果修改父组件中的代码
      - ```css
        .test :deep(h3) {
          background-color: #2ecc71;
        }
    - ![](../image/Snipaste_2022-07-25_08-40-04.png)
    - 📕通过
3. 插槽选择器 `:slotted()`
    - 默认情况下, 作用域样式不会影响到 `<slot/>` 渲染出来的内容, 因为他们被认为是父组件所持有并传递进来的
    - 父组件
      - ```html
        <Son>
          <h4>哈哈哈,我是父组件传入的数据</h4>
        </Son>
    - 子组件
      - ```html
        <div>
          <h3>Son-h3</h3>
          <h2>Son-h2</h2>
          <slot></slot>
        </div>
      - ```css
        <style scoped>
        h4 {
          background-color: #e67e22;
        }
        </style>
    - 如下图, 传入 `<slot>` 的 `<h4>` 元素背景颜色并没有发生改变
    - ![](../image/Snipaste_2022-07-25_09-20-21.png)
    - 修改子组件, 使用 `:slotted` 选择器
      - ```css
        :slotted(h4) {
          background-color: #e67e22;
        }
      - ![](../image/Snipaste_2022-07-25_09-21-47.png)
4. 全局选择器 `:global()`
    - 如果想让一个样式规则应用到全局, 有两种方式
      - 第一, 创建两个 `<style>` 节点, 一个全局, 一个局部
      - 第二, 使用 `:global()` 选择器
    - 父组件
      - ```html
        <div class="red">Father-red</div>
    - 子组件
      - ```html
        <div class="red">Son-red</div>
      - ```css
        :global(.red) {
          background-color: #e74c3c;
        }
    - ![](../image/Snipaste_2022-07-25_09-30-30.png)
5. 作用域样式提示
    - 作用域样式并没有消除对 `class` 的需求. 由于浏览器渲染各种各样 `CSS` 选择器的方式, `p` 标签选择器结合作用域样式(属性选择器)会慢很多, 如果使用类选择器或者 `id` 选择器就几乎可以避免性能的损失.
### `CSS Module`
1. 一个 `<style module>` 标签会被编译为 `CSS Modules` 并且将生成的 `CSS class` 作为 `$style` 对象暴露给组件.
    - [关于 css-modules 看这里](https://github.com/css-modules/css-modules). 一个 `CSS Module` 就是一个 CSS 文件, 这个文件中所有的 `class` 名和 `animation` 名都只能局部使用.
    - ```html
      <div :class="$style.yellow">Yellow by Coldplay</div>
      <div :class="$style.yellowWhite">Yellow by  Coldplay</div>
    - ```css
      <style module>
      .yellow {
        background-color: #f1c40f;
      }
      .yellow-white {
        background-color: #f1c40f;
        color: #fff;
      }
      </style>
    - ![](../image/Snipaste_2022-07-25_10-11-01.png)
2. 注入自定义的名字
    - ```CSS
      <style module="levi">
      .yellow {
        background-color: #f1c40f;
      }
      </style>
    - ```html
      <div :class="levi.yellow">Yellow by Coldplay</div>
3. 与组合式 `API` 一同使用
    - 可以通过 `useCssModule` `API` 在 `setup` 或者 `<script setup>` 中访问注入的 `class`,  对于使用自定义诸如名称的 `module`, 在调用 `useCssModule` 时需要接收一个新的参数.
    - ```js
      <script setup>
      import { useCssModule  } from 'vue'

      // 没有起别名
      // const module = useCssModule(); 
      
      const levi = useCssModule('levi');
      console.log('levi', levi)
      </script>
    - ![](../image/Snipaste_2022-07-25_10-14-26.png)
### CSS 中的 `v-bind`
1. 但文件中的 `<style>` 标签支持使用 `v-bind` `CSS` 函数将 `CSS` 的值链接到组件的状态
    - 📕如果访问对象属性, 需要使用引号
    - ```html
      <div class="what">What R U Doing now?</div>
    - ```js
      <script setup>
      import { reactive } from 'vue';

      let theme = reactive({
        color: '#9b59b6',
      })
      let fontColor = '#fff';
      </script>
    - ```css
      .what {
        background-color: v-bind('theme.color');
        color: v-bind(fontColor);
      }
    - ![](../image/Snipaste_2022-07-25_10-28-54.png)
2. 实际的值会被编译成哈希化的 `CSS` 自定义 `property`, 因此 `CSS` 本身仍然是静态的. 
    - ![](../image/Snipaste_2022-07-25_10-27-39.png)
    - 自定义 `property` 会通过内联样式的方式应用到组件的根元素上, 并且在源值变更的时候响应式地更新
    - ```html
      <button @click="changeBgColor">changeBgColor</button>
    - ```js
      function changeBgColor() {
        theme.color === '#9b59b6' ? theme.color = '#1abc9c' : theme.color = '#9b59b6';
      }
    - ![](../image/Snipaste_2022-07-25_10-32-09.png)
# `vue-router@4`
> 这里仅探讨 `Vue3` 带来的更新和 `vue-router@3` 中没学过的知识点
## 安装与使用
1. 安装
    - ```shell
      npm install vue-router@4
2. 使用
    - 创建两个页面 `src/views/home/index.vue` 和 `src/views/about/index.vue`
    - 创建 `src/router/index.ts`
      - ```ts
        import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
        import Home from '../views/home/index.vue';
        import About from '../views/about/index.vue';

        const routes: RouteRecordRaw[] = [
          {
            path: '/',
            component: Home,
          },
          {
            path: '/about',
            component: About,
          },
        ];

        const router = createRouter({
          history: createWebHashHistory(),
          routes,
        });

        export default router;
    - 在 `main.js` 中引入路由
      - ```js
        import router from './router'
        const app = createApp(App);
        app.use(router);
    - ![](../image/Snipaste_2022-08-02_10-18-35.png)
2. 在组件中访问
    - ```js 
      <script setup>
      import { useRoute, useRouter } from 'vue-router'
      const route = useRoute();
      const router = useRouter();
      console.log('route', route);
      console.log('router', router);
      </script>
    - ![](../image/Snipaste_2022-08-02_10-19-46.png)
    - ![](../image/Snipaste_2022-08-02_10-20-10.png)
## 动态路由匹配
1. 响应路由参数的变化
    - 在使用带有参数的路由时, 需要注意当用户从 `/user/123` 导航到 `/user/456` 时, 相同的组件实例将被重复使用. 由于两个路由都渲染同个组件, 比起销毁再创建复用的逻辑更加高效, 不过这也意味着`组件的生命周期钩子不会被调用`
      - 创建 `src/views/uer/index.vue`
      - ```js
        import { useRoute, onBeforeRouteUpdate } from 'vue-router'
        import { ref } from 'vue';

        const id = ref(useRoute().params.id || 999999999);

        onBeforeRouteUpdate((to, from, next) => {
          id.value = to.params.id;
          console.log('======to', to)
          next();
        })
      - ```html
        <div>
          <h1>User: {{ id }}</h1>
        </div>
      - ![](../image/Snipaste_2022-08-02_11-27-28.png)
### 路由的匹配语法
1. 在参数中自定义正则
    - 当定义类似 `id` 类型参数时, 如果想要显示参数一定匹配数字, 可以配置路由规则时增加静态的正则表达式部分
      - ```js
        const routes = [
          {
            path: '/user/:id(\\d+)',
            component: User
          }
        ];
      - 上面的代码表示仅匹配 `id` 为数字的路由.
      - ![](../image/Snipaste_2022-08-02_11-41-47.png)
2. `sensitive` 和 `strict` 路由配置
    - 默认情况下, 所有的路由是不匹配大小写的, 并且能匹配带有或不带有尾部斜线的路由
      - ![](../image/Snipaste_2022-08-02_11-45-19.png)
    - 这种行为可以通过 `strict` 和 `sensitive` 选项来修改, 这两个配置既可以应用在全局路由上, 又可以应用在单个路由上
      - ```js
        const routes: RouteRecordRaw[] = [
          {
            path: '/user/:id(\\d+)',
            component: User,
            sensitive: true,
          }
        ];

        const router = createRouter({
          history: createWebHashHistory(),
          routes,
          strict: true,
        });
      - ![](../image/Snipaste_2022-08-02_11-50-35.png)
3. 可选的路由参数
    - 通过 `?` 将参数标记为可选
    - ```js
      const routes: RouteRecordRaw[] = [
        {
          path: '/user/:id(\\d+)?',
          component: User,
          sensitive: true,
        }
      ];
    - ![](../image/Snipaste_2022-08-02_11-55-47.png)
### 嵌套路由
1. 创建 `src/views/about/posts/index.vue` 和 `src/views/about/profile/index.vue`
    - 使用嵌套路由
      - ```js
        const routes: RouteRecordRaw[] = [
          {
            path: '/about',
            component: About,
            children: [
              {
                path: 'profile',
                component: Profile,
              },
              {
                path: 'posts',
                component: Post,
              }
            ]
          },
        ];
    - ![](../image/Snipaste_2022-08-02_14-18-51.png)
2. 这时, 如果访问 `/about` 的话, 在 `<router-view>` 中就会什么都显示不出来. 如果确实想要显示一些东西, 可以提供一个空的嵌套路径
    - 📕记得加上 `name` 属性, 不然控制台会有警告
    - ```js
      {
        path: '/about',
        component: About,
        children: [
          {
            path: '',
            name: 'aboutFallback',
            component: Fallback
          },
          // other children routes
        ]
      },
    - ![](../image/Snipaste_2022-08-02_14-24-18.png)  
### 命名视图
1. 如果想要在页面同时(同级)显示多个视图, 而不是嵌套展示, 例如创建一个布局, 这时候命名视图就排上用场了.
    - 可以在界面中拥有多个单独命名的 `<router-view>`, 如果没有名字, 那么默认为 `default`
      - ```html 
        <template>
          <router-view class="header" name="header"></router-view>
          <div class="non-header">
            <router-view class="aside" name="aside"></router-view>
            <router-view class="main"></router-view>
          </div>
        </template>
    - 一个 `<router-view>` 使用一个组件渲染, 因此对于同一个路由就需要多个组件, 所以不再使用 `component` 而是 `components`
      - 其中 `key` 就是 `<router-view>` 的 `name`, 对应的 `value` 就是组件.
      - ```js
        {
          path: '/layout',
          components: {
            default: Main,
            header: Header,
            aside: Aside
          },
        },
    - ![](../image/Snipaste_2022-08-03_22-53-13.png)
    - 此时仍然可以使用 `children` 增加子路由, 不过要注意的时只能 `Main`, `Header`, `Aside` 中的一个有 `<router-view>`. 如果三个都写, 那么就会显示三次.
      - ```js
        {
          path: '/layout',
          components: {
            default: Main,
            header: Header,
            aside: Aside
          },
          children: [
            {
              path: 'test',
              component: User
            }
          ]
        },
      - ![](../image/Snipaste_2022-08-03_22-54-43.png)
### 重定向
1. 使用重定向的三种方法: `字符串`, `对象`, `函数`
    - 字符串
      - ```js
        {
          path: '/home',
          redirect: '/'
        },
        {
          path: '/',
          component: Home,
        },
      - ![](../image/Snipaste_2022-08-03_22-58-09.png)
    - 对象
      - ```js
        {
          path: '/index',
          redirect: {
            name: 'home'
          }
        },
        {
          path: '/',
          name: 'home',
          component: Home,
        },
      - ![](../image/Snipaste_2022-08-03_22-58-59.png)
    - 函数
      - 函数接收 `to` 这个路由地址为参数.
      - ```js
        {
          path: '/oops',
          redirect: (to: RouteLocation) => {
            const { age } = to.query;
            let path = age && +age > 18 ? '/layout' : '/'
            return {
              path,
            };
          }
        },
      - ![](../image/Snipaste_2022-08-04_08-30-19.png)
2. 别名
    - 重定向是值当用户访问 `/home` 时, `URL` 会被 `/` 替换, 并且路由匹配规则匹配的是 `/`
    - 将 `/home` 别名为 `/`, 意味着当用户访问 `/` 时, `URL` 仍然是 `/`, 但是路由规则匹配的是 `/home`
      - ```js
        {
          path: '/goodbye',
          component: Goodbye,
          alias: '/bye'
        },
      - ![](../image/Snipaste_2022-08-04_15-24-25.png)
      - 从上图可以看到, 访问 `/goodbye` 可以的匹配, 访问别名`/bye` 规则匹配的是 `/goodbye`.
    - 📕如果将别名设置为别的路由规则的 `path`, 那么别名失效哦
      - ```js
        {
          path: '/goodbye',
          component: Goodbye,
          alias: '/index'
        },
        {
          path: '/index',
          redirect: {
            name: 'home'
          }
        },
      - ![](../image/Snipaste_2022-08-04_16-07-45.png)
    - 别名还可以是一个数组, 用一个数组提供多个别名
      - ```js
        {
          path: '/goodbye',
          component: Goodbye,
          alias: ['/bye', '/night']
        },
      - ![](../image/Snipaste_2022-08-04_16-11-43.png)
### 路由传参
1. 命名视图
    - 对于有命名的视图, 你必须为每个命名视图定义 `props` 配置
      - 下面的配置表示只有 `default` 的路由视图会接收参数
      - ```js
        {
          path: '/layout/:id(\\d+)',
          components: {
            default: Main,
            header: Header,
            aside: Aside
          },
          props: {
            default: true,
            header: false,
            aside: false,
          }
        },
      - 在 `Main` 和 `Header` 组件接收参数. 但是最后只有 `Main` 组件会收到参数
      - ```js
        const props = defineProps({
          id: {
            type: String,
          }
        })
      - ```html
        <div>
          main-{{id}}
        </div>
      - ![](../image/Snipaste_2022-08-04_16-28-31.png)
### 路由传参
1. `TypeScript` 扩展 `RouteMeta` 接口
    - 创建 `src/types/router.ts`
      - ```ts
        import 'vue-router';

        declare module 'vue-router' {
          interface RouteMeta {
            isAdmin?: boolean;
            requireAuth?: boolean;
          }
        }
    - 这样在 `src/router/index.ts` 的 `meta` 项中就会出现语法提示
      - ![](../image/Snipaste_2022-08-05_21-16-48.png)
### 过渡效果
1. 如果想要在路径组件中始终转场,并对导航进行动画处理, 需要使用 `v-slot` `API`
    - ```html
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    - ```css
      .fade-enter-active,
      .fade-leave-active {
        transition: transform .5s ease;
      }
      .fade-enter-from,
      .fade-leave-to {
        transform: translateX(100%)
      }
    - ![](../image/router-transition-view-router.gif)
2. 上面的用法会对所有的路由使用相同的过渡, 如果想要让每个路由的组件有不同的过渡信息和动态的 `name` 结合在一起, 放在 `transition` 上
    - 先在路由配置信息中配置过渡的类名
      - ```js
        {
          path: '/about',
          component: About,
          name: 'about',
          children: [
            {
              path: 'profile',
              component: Profile,
              meta: {
                transition: 'sparkle'
              }
            },
            {
              path: 'posts',
              component: Post,
            }
          ]
        },
    - 接着, 使用 `v-slot` 暴露出来的更多信息
      - ```html
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
    - ![](../image/router-transition-view-scale.gif)
### 滚动行为
1. 使用前端路由, 当切换到新路由时, 想要页面滚动到顶部或是保持原先的滚动位置, 可以自定义路由切换是页面如何滚动
    - 📕这个功能只在支持 `history.pushState` 的浏览器中使用, 下图是 `pushState` 的浏览器兼容性
    - ![](../image/Snipaste_2022-08-14_19-04-25.png)
2. 在创建 `Router` 实例时, 可以提供一个 `scrollBehavior` 方法
    - 通过 `return` 一个对象, 期望滚动到哪个的位置
    - ```js
      import { createRouter} from 'vue-router';

      const router = createRouter({
        history: createWebHashHistory(),
        routes,
        strict: true,
        scrollBehavior (to, from, savedPosition) {
          console.log('to', to)
          console.log('from', from)
          console.log('savedPosition', savedPosition)
        }
      });
    - ![](../image/Snipaste_2022-08-14_19-14-56.png)
    - 哎, 如果通过 `<router-link>` 跳转的话, 你会发现第三个参数没有值. 没错, 只有当这是一个 `popstate` 导航时才可用(由浏览器的后退/前进按钮触发)
    - ![](../image/Snipaste_2022-08-14_19-31-51.png)
    - `savedPosition` 就是记录当前页面的滚动位置, 如果从其他页面在回到当前页面, 就会打印出这个位置啦~
3. 返回一个对象, 这个对象可以配置 `top`, `left`, `behavior` 三个属性来表示路由切换时要滚动的位置
    - ```js
      scrollBehavior (to, from, savedPosition) {

        // 返回一个对象
        return {
          top: 0,
          left: 0,
          behavior: 'smooth',
        }
      }
    - ![](../image/router_scroll_smooth.gif)
4. 通过 `el` 属性传递一个 `CSS` 选择器或者 `DOM` 元素, 这种情况下, `top` 和 `left` 将被视为该元素的相对偏移量
    - 我们在 `/scroll2` 这个路由的组件的某个元素修改下面的代码
      - ```html
        <div>
          scroll2
          <h1>Lorem ipsum ...</h1>
          <h1>Lorem ipsum ...</h1>
          <h1 class="target">Lorem ipsum ...</h1>
          <router-link to="/scroll1">TO scroll1</router-link>
          <h1>Lorem ipsum ...</h1>
          <h1>Lorem ipsum ...</h1>
        </div>
      - 可以看到, 当从 `/scroll1` 跳转到 `/scroll2` 时, 页面定位到了 `target` 元素. 但是反过来, 在 `/scroll1` 中没有 `target` 的元素
      - ![](../image/router_scroll_target2.gif)
5. 返回空对象或者 `falsy` 的值, 不会发生滚动
    - ```js
      return {}
      return null
6. 返回 `savedPosition`, 在按下 后退/前进 按钮时, 就会像浏览器的原生表现那样
#### 延迟滚动
1. 如果需要页面在过渡动画之后再滚动, 可以返回一个 `Promise`. 例如下面的例子, 在滚动前等待 `2s`
    - ```js
      scrollBehavior (to, from, savedPosition) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              left: 0, 
              top: 0,
            })
          }, 2000);
        });
      }
    - 增加路由的过渡
    - ```html
      <router-view v-slot="{ Component }" class="main">
        <transition mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    - ```css
      .v-enter-active,
      .v-leave-active {
        transition: opacity 1s ease;
      }

      .v-enter-from,
      .v-leave-to {
        opacity: 0;
      }
    - 📕注意需要等待 `2s`, 因为两个路由的过渡时间分别为 `1s`, 加起来就是 `2s`. 可以看到, 当 `/scroll2` 过渡效果完成之后才进行滚动.
    - ![](../image/router_scroll_transition.gif)
### 导航故障
1. 等待导航结果
    - 如果我们想要在路由导航之后进行一些操作, 比如关闭菜单显示, 要记住📕**导航是异步的**, 需要 `await`
    - ```js
      async function goRouter(newRoute) {
        await router.push(newRoute);
        menuVisible.value = false;
      }
2. 上面的情况是, 只是导航完毕后关闭菜单, 如果导航被阻止也很会关闭. 我们需要方法检查是否真正改变了页面
    - 首先阻止导航. 通过路由守卫
      - ```js
        router.beforeEach((to, from) => {
          if (to.path === '/test/test1') {
            console.log('NOT GOING ANYWHERE!');
            return false;
          }
          return true;
        })
    - 接着, 获取导航结果
      - ```js
        async function goRouter(newRoute) {
          const navigationResult = await router.push(newRoute);
          console.log('navigationResult', navigationResult);
          if (navigationResult) {
            // 导航被阻止
            alert('导航失败')
          } else {
            // 关闭菜单
            menuVisible.value = false;
          }
        }
    - ![](../image/Snipaste_2022-08-16_08-40-22.png)
    - 📕如果导航被阻止, 导致用户停留在同一个页面上, 由 `router.push` 返回的 `Promise` 的解析值将会是 `Navigation Failure`, 否则将会是一个 `falsy` 的值(通常为 `undefined`)
    - ![](../image/Snipaste_2022-08-16_22-34-25.png)
2. 鉴别导航故障
    - `Navigation Failure` 是带有一些额外属性的 Error 实例, 从而让我们可以知道哪些导航被阻止了以及为什么被阻止, 要检查导航结果的性质, 可以使用 `isNavigationFailure` 函数
    - 总共有三个不同类型的失败, 可以使用 `NavigationFailureType` 区分
      - `aborted`: 在路由导航中返回 `false`, 中断了本次导航
      - `cancelled`: 在当前导航还没有完成之前又有了新的导航. 比如在导航守卫中又调用了 `router.push`
      - `duplicated`: 导航被阻止, 因为已经在目标位置了
    - 先看一下路由导航的代码
      - ```js
        async function goRouter(newRoute) {
          const navigationResult = await router.push(newRoute);
          console.log('navigationResult', navigationResult);

          if (isNavigationFailure(navigationResult, NavigationFailureType.aborted)) {
            console.log('返回了false');
          } else if (isNavigationFailure(navigationResult, NavigationFailureType.cancelled)) {
            console.log('其他地方又来导航');
          } else if (isNavigationFailure(navigationResult, NavigationFailureType.duplicated)) {
            console.log('导航到当前位置, 重复啦');
            console.log(navigationResult.to);
          } else {
            console.log('导航成功');
          }
        }
    - 第一种情况
      - 下面是路由守卫的代码
      - ```js
        router.beforeEach((to, from) => {
          if (to.path === '/test/test1') {
            console.log('NOT GOING ANYWHERE!');
            return false;
          }
          return true;
        })
      - ![](../image/Snipaste_2022-08-17_08-47-53.png)
    - 第二种情况
      - 下面是路由守卫的代码
      - ```js
        router.beforeEach((to, from) => {
          if (to.path === '/test/test1') {
            console.log('NOT GOING ANYWHERE!');
            
            router.push('/')
          }
          return true;
        })
      - ![](../image/Snipaste_2022-08-17_08-49-11.png)
    - 第三种情况
      - 只需要点两次路由导航的按钮即可
      - ![](../image/Snipaste_2022-08-17_08-52-00.png)
3. 导航故障的属性
    - 虽然上面打印的结果没有属性, 但是所有导航失败都会暴露 `to` 和 `from` 属性, 以反映失败导航的当前位置和目标位置. 在所有情况下, `to` 和 `from` 都是规范化的路由地址.
    - ```js
      if (isNavigationFailure(navigationResult, NavigationFailureType.duplicated)) {
        console.log('导航到当前位置, 重复啦');
        console.log(navigationResult.to);
        console.log(navigationResult.from);
      }
    - ![](../image/Snipaste_2022-08-17_08-56-41.png)
4. 检测重定向
    - 如果在导航守卫中返回了一个新的位置, 那么就会触发一个新的导航覆盖正在进行的导航. 与其他返回值不同的是, 重定向不会阻止导航而是创建新的导航. 通过 `redirectedFrom` 属性即可
    - 下面的测试
      - 在路由导航中返回 `/` 新的地址
      - ```js
        router.beforeEach((to, from) => {
          if (to.path === '/test/test1') {
            console.log('NOT GOING ANYWHERE!');

            return {
              path: '/'
            }
          }
          return true;
        })
      - 在路由导航函数中 📕在路由导航中返回 `/` 不属于路由导航故障的三种情况之一哦~
      - ```js
        async function goRouter(newRoute) {
          const navigationResult = await router.push(newRoute);

          console.log('router.currentRoute', router.currentRoute)
        }
      - 从下图可以看到, 跳转到 `/` 之后从 `redirectedFrom` 中读取到跳转之前的路由
      - ![](../image/Snipaste_2022-08-17_22-52-21.png)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)