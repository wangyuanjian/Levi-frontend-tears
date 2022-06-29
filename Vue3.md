# `Vue3`

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
### `ref`
1. `Vue3` 也提供了一个 `ref()` 方法来允许我们创建可以使用任何值类型的响应式 `ref`
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
    - 
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
## 新的组件


![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)