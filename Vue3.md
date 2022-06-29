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
    - 
## `Composition API`
### 常用
### 其他
## 新的组件





![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)