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
1. `state` 就是我们要定义的数据, 如果定义 `store` 时传入的第二个参数是对象, 那么 `state` 需要是一个函数, 这个函数的返回值才是状态的初始值.
    - 这样设计的原因是为了让 `Pinia` 在客户端和服务端都可以工作
    - 📕官方推荐使用箭头函数(`()=>{}`)获得更好的类型推断
    - ```js
      import { defineStore } from 'pinia';

      const userStore = defineStore('user', {
        state: () => {
          return {
            user: {
              name: 'tom',
              age: 18
            },
            color: 'red',
            userList: [],
          }
        }
      })
2. `TypeScript`
    - 可以定义 `interface` 来标记类型
    - ```js
      import { defineStore } from 'pinia';

      interface UserInfo {
        name: string;
        age: number;
      }

      export const userStore = defineStore('user', {
        state: () => {
          return {
            color: 'red' as string,
            userList: [] as UserInfo[],
            user: {
              name: 'tom',
              age: 18
            } as UserInfo | null
          }
        }
      })
3. 访问 `state`
    - 默认可以直接通过 `store` 实例访问和修改 `state`.
    - ```js
      const user = userStore();
      function changeColor() {
        user.color = 'black'
      }
      function changeAge() {
        user.user.age++;
      }
4. 重置 `state`
    - 调用 `store` 的 `$reset()`
    - ```js
      function resetStore() {
        user.$reset();
      }
5. 修改 `state`
    - 除了直接通过 `store` 修改 `state`, 还可以调用 `store` 的 `$patch` 方法. 这个方法允许一次进行多处修改
    - ```js
      function patchChange() {
        user.$patch({
          color: 'skyblue',
          user: {
            age: user.user.age + 10
          }
        })
      }
    - 但是这种语法有时会很麻烦, 比如我们想要对数组进行增删时, 这种语法会要求创建一个新的数组. 所以 `$patch` 方法可以接收一个函数为参数. 函数的参数
    - ```js
      function patchChangeFunction() {
        user.$patch((state) => {
          state.userList.push({ name: 'mike', age: 19 });
          state.user.age++;
          state.color = 'pink';
        });
      }
    - 📕也直接通过 `store` 的 `$state` 属性修改 `state`, 因为其内部会调用 `$patch`
    - ```js
      function stupidChange() {
        user.$state = {
          color: 'hahha'
        }
        // 实际上内部调用了
        // user.$patch({ color: 'hahha' })
      }
6. 订阅状态
    - 我们可以通过 `store` 的 `$subscribe` 方法侦听 `state` 的改变. 使用 `$subscribe` 而不是` watch()` 的好处是 `$subscribe` 总是在 `state` 修改之后执行一次.
    - ```js
      user.$subscribe((mutation, state) => {
        console.log('mutation', mutation);
      })
    - ![](../image/Snipaste_2022-07-30_09-03-54.png)
    - 参数 `state`: 最新的 `state`
    - 参数 `mutation`
      - `type`: 表示通过那种方式修改的值
        - `direct`: 直接修改, 例如 `user.user.age++`
        - `patch object`: 通过 `$patch({...})` 传递对象的方式修改
        - `patch function`: 通过 `$patch(() => {...})` 传递对象的方式修改
      - `storeId`: 定义 `defineStore` 的第一个参数, 也就是 `store.$id` 属性
      - `payload`: 只有 `type` 值为 `plain object` 才会有这个值, 即为传递给 `$patch` 的对象参数.
      - `$subscribe` 的返回值是一个函数, 调用这个函数将取消订阅
        - ```js
          const stopSubscribeFunc = user.$subscribe((mutation, state) => {
            console.log('mutation', mutation);
            console.log('state', state);
          })
          function stopSubscribe() {
            stopSubscribeFunc()
        }
    - 📕如果在组件内调用 `store.$subscribe()`, 那么组件卸载时会自动清理定于, 除非将 `detached` 设置为 `true`
      - ```js
        user.$subscribe((mutation, state) => {
          // do something...
        }, {
          detached: true
        })
    - 如果要实现保存数据到 `localStorage`, 可以使用 `watch`
      - `main.js`
      - ```js
        const pinia = createPinia();
        app.use(pinia);

        watch(
          pinia.state,
          (state) => {
            console.log(state)
            localStorage.setItem('piniaState', JSON.stringify(state));
          },
          {
            deep: true,
            immediate: true
          }
        )
### `Getters`
1. `getters` 就像计算属性一样, 通过 `defineStore` 的 `getters` 配置项来定义. 每一个 `getter` 都是一个函数, 这个函数接收 `state` 作为第一个参数, 官网鼓励使用箭头函数
    - ```js
      export const userStore = defineStore('user', {
        state: () => {
          return {
            color: 'red' as string,
            userList: [] as UserInfo[],
            user: {
              name: 'tom',
              age: 18
            } as UserInfo | null
          }
        },
        getters: {
          doubleAge: (state) => {
            return state.user.age * 2;
          }
        }
      })
    - 大多数时间, `getter` 都仅仅依赖于 `state`, 但是有时候也会依赖其他 `getter`. 所以呢, 如果 `getter` 定义为非箭头函数就可以通过 `this` 拿到整个 `store` 实例, 但是由于 `TS` 又必须为函数返回值定义类型. 但是这并不影响将 `getters` 定义为箭头或者, 也不影响不使用 `this` 的 `getters`
      - ```js
        getters: {
          doubleAge: (state) => {
            return state.user.age * 2;
          },

          doubleAgePlus3(): number {
            return this.doubleAge + 3;
          }
        }
2. 在页面或者组件使用 `getters`
    - 直接通过 `store` 实例对象
      - ```js
        import { userStore } from '../store/user';
        const user = userStore();
      - ```html
        <h2>{{ user.color }} | 【{{ user.doubleAge }}】</h2>
      - ![](../image/Snipaste_2022-07-30_10-06-40.png)
3. 向 `getters` 传递参数
    - `getters` 可以通过返回一个函数 `A` 来接收参数, 这个 `A` 的返回值也就是 `getter` 的值.
      - ```js
        getters: {
          plusAgeBy: (state) => {
            return (moreAge: number) => state.user.age + moreAge
          }
        }
      - ```html
        <h2>{{ user.color }} | 【{{ user.doubleAge }}】 | 【{{ user.plusAgeBy(10) }}】</h2>
      - ![](../image/Snipaste_2022-07-30_10-08-42.png)
    - 📕如果传递参数, `getters` 就不会再缓存了❗❗❗.
4. 使用其他 `store` 中的 `getters`
    - 直接在 getter 内部使用即可
    - ```js
      import { useCounterStore } from './index'

      getters: {
        addCounterFromOtherStore: (state) => {
          const useCounter = useCounterStore();
          return state.user.age + useCounter.count;
        }
      }
    - ```html
      <h2>{{ user.addCounterFromOtherStore }}</h2>
    - ![](../image/Snipaste_2022-07-31_10-25-42.png)
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