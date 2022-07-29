## `Pinia`(`/piːnjʌ/`)

## Hello, World
1. `Pinia` 是一个为 `Vue` 设计的存储库, 允许跨组件/页面共享状态(`state`).
2. 对比 `Vuex 3/4`
    - 没有 `mutations`;
    - 没有命名 `module`
### 安装与快速上手(`Vue3@3.2.37+Vite@1.0.0`)
1. 安装
    - ```shell
      npm install pinia@2.0.17
2. 在 `main.js` 中引入和使用
    - ```js
      import { createPinia } from 'pinia'

      const app = createApp(App);
      app.use(createPinia());
3. 创建 `src/store/index.ts`
    - ```ts
      import { defineStore } from 'pinia';

      export const useCounterStore = defineStore('counter', {
        state: () => {
          return {
            count: 0,
          }
        },
        getters: {
          doubleCount: (state) => {
            return state.count * 2;
          }
        },
        actions: {
          increment(a: number) {
            this.count += a
          }
        }
      })
4. 在组件使用
    - ```js   
      import { useCounterStore } from '../store/';
      import TestPiniaSon from './TestPiniaSon.vue'

      const store = useCounterStore();

      function countPlus() {
        store.increment(1);
      }
    - ```html
      <div>
        <h2>{{store.count}}</h2>
        <button @click="countPlus">countPlus</button>
      </div>
    - ![](../image/Snipaste_2022-07-29_15-09-00.png)
## 核心概念
### `Store`
1. `Store` 是保存状态(`state`)和业务逻辑的实体, store 不应该与我们的组件绑定. 换句话说, `store` 就是全局状态.
2. store 有三个关键概念, 分别是 `state`, `getters` 和 `actions`, 这与 `Vue` 组件中的 `data`, `computed` 和 `methods` 是相等的概念.
#### 定义 `store`
1. 通过 `defineStore` 函数定义 `store`.
    - `defineStore` 接收两个参数
      - `id`: 唯一的标识, `string` 类型. `Pinia` 使用 `id` 与开发者工具建立联系.
      - 第二个参数可以是一个函数, 也可以是一个对象.
    - `defineStore` 返回一个函数, 一般约定将返回值命名为 `use...`.
2. 第二个参数: 对象类型
    - 如果要传入对象类型作为第二个参数, 在对象中可以配置
      - `state`: 状态, 即数据. 📕注意 state 是一个函数, 函数的返回值才是真正定义的数据
      - `getters`: 计算属性
      - `actions`: 修改状态的方法
      - ```js
        export const useCounterStore = defineStore('counter', {
          state: () => {
            return {
              count: 0,
            }
          },
          getters: {
            doubleCount: (state) => {
              return state.count * 2;
            }
          },
          actions: {
            increment(a: number) {
              this.count += a
            }
          }
        })
3. 第二个参数: 函数类型
    - 在函数中可以通过 `ref`/`reactive` 定义响应式数据, 通过 `computed` 和 `watch` 定义计算属性和侦听器, 再定义一些修改数据的方法, 并通过返回对象的形式将其中一些数据暴露出去.
      - ```js
        import { defineStore } from 'pinia';
        import { ref } from 'vue';

        export const useNameStore = defineStore('name', () => {
          const name = ref('tom');
          function setName(newName: string) {
            name.value = newName;
          }
          return { 
            name,
            setName
          }
        });
#### 使用 `store`
1. 无论定义 store 时传入的参数是对象类型还是函数类型, 调用方法一致的. 我们需要在 `setup()` 函数或 `<script setup>` 中使用
    - ```js
      import { useCounterStore } from '../store';
      import { useNameStore } from '../store/index2'

      // 第一个store: count
      const store = useCounterStore();
      function countPlus() {
        store.increment(1);
      }

      // 第二个store: name
      const name1 = useNameStore();
      function updateName1() {
        name1.setName('jerry1' + Math.random())
      }
    - 📕`store` 实例并不会被创建直到调用 `useNameStore`
    - 可以直接通过 **`store.`** 的方式访问 store 的 state, 和 
    - ```html
      <h2>{{store.count}}</h2>
      <button @click="countPlus">countPlus</button>
      <hr>
      <h2>{{ name1.name }}</h2>
      <button @click="updateName1">updateName1</button>
    - ![](../image/pinia_use_store.gif)
    - 📕注意修改数据时, 页面并没有失去响应式, 调用 `isProxy` 可以看出 `use...` 返回的结果统统都是响应式的数据
    - ![](../image/Snipaste_2022-07-29_17-06-38.png)
2. 失去响应式的陷阱
    - 如果解构 `use..` 的返回值, 那么将失去响应式❗❗❗❗❗
    - ```js
      const { name, setName } = useNameStore();
      function updateName() {
        setName('jerry' + Math.random());
      }
    - ```html
      <h2>{{ name }}</h2>
      <button @click="updateName">updateName</button>
    - ![](../image/Snipaste_2022-07-29_17-25-51.png)
3. `storeToRefs`
    - 为了从 `store` 中解构出属性并且保持其响应式, 需要调用 `storeToRefs`. storeToRefs 将为每个响应式数据创建 `ref`.
    - 先看传入函数类型的 `store`
      - ```js
        const nameStore2 = storeToRefs(useNameStore());
        console.log('nameStore2', nameStore2)
      - ![](../image/Snipaste_2022-07-29_17-35-05.png)
      - 📕注意返回的 `storeToRefs` 返回的对象中只有 `name`, 而没有 `setName`, 因此完整的写法应该是
      - ```js
        const nameStore = useNameStore();  
        const { setName } = nameStore;
        const { name } = storeToRefs(useNameStore());
    - 再看传入对象类型的 `store`
      - ```js
        const store = useCounterStore();
        const countStore2 = storeToRefs(store)
        console.log('countStore2', countStore2);
      - ![](../image/Snipaste_2022-07-29_17-53-59.png)
      - 📕只有 `state` 和 `getters`, 没有 `actions`, 因此要从 `useCounterStore()` 的返回值中解构出 `actions` 中的方法
      - ```js
        const store = useCounterStore();
        const { count, doubleCount } = storeToRefs(store);
        const { increment } = store;
        function countPlus1() {
          increment(2);
        }
### `State`
### `Getters`
### `Actions`
### `Plugins`




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