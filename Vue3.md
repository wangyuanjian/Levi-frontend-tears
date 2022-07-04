# `Vue3`
<!-- TOC -->

- [`Vue3`](#vue3)
  - [创建 `Vue3.0` 工程](#创建-vue30-工程)
    - [使用 `vue-cli`](#使用-vue-cli)
    - [使用 vite](#使用-vite)
  - [工程](#工程)
    - [`createApp()`](#createapp)
    - [`App.vue`](#appvue)
  - [`Composition API`](#composition-api)
    - [`setup`](#setup)
    - [`ref`](#ref)
    - [`reactive`](#reactive)
    - [`Vue2` 和 `Vue3` 的响应式原理](#vue2-和-vue3-的响应式原理)
  - [新的组件](#新的组件)

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

![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
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
      - 对象类型: 通过 `Object.defineProperty` 对属性的读取, 修改进行拦截(数据劫持);
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
## 新的组件






![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)