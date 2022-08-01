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
1. `actions` 类似组件的方法, 通过 `actions` 这个配置项配置
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
        actions: {
          plusAgeOne() {
            this.user.age++;
          }
        }
      })
    - 通过将 `action` 配置为非函数方式, `action` 就可以通过 `this` 访问整个 `store` 实例.
    - 📕actions 可以是异步的
      - 服务端代码
      - ```js
        app.get('/age', (req, res) => {
          res.json({
            age: 5
          });
        });
      - 客户端代码
      - ```js
        actions: {
          async plusAgeAsync() {
            const result = await fetch('http://localhost:5000/age');
            const data = await result.json();
            this.user.age += data.age;
          }
        }
      - ![](../image/Snipaste_2022-07-31_10-55-00.png)
2. 给 `actions` 传递参数
    - ```js
      actions: {
        plueAgeBy(moreAge: number) {
          this.user.age += moreAge;
        },
      }
    - ```js
      function plusAgeParams(moreAge) {
        user.plueAgeBy(moreAge);
      }
    - ```html
      <button @click="plusAgeParams(1)">plusAgeParams</button>
3. 使用其他 `store` 中的 `actions`
    - ```js
      actions: {
        plusFromOtherStore() {
          const useCounter = useCounterStore();
          useCounter.increment(1);
          this.plueAgeBy(useCounter.count)
        },
        plueAgeBy(moreAge: number) {
          this.user.age += moreAge;
        },
      }
4. 订阅 `actions`
    - `$onAction()` 允许设置一个回调函数, 这个回调函数在 `action` 每次被调用时被调用. 回调函数接收一个对象参数, 这个对象参数和当前被调用的 `action` 有关系.
      - `store`: ``action`` 所在的 `store`
      - `name`: `action` 的名字, 即函数名
      - `args`: 传递给 `action` 的参数
    - 对象除了这三个参数外, 还会两个函数参数, 分别在 `action` 成功或失败时调用
      - `after()`: 设置一个钩子, 一旦 `action` 完成就调用. 这个钩子接收 `action` 的返回值作为参数
      - `onError()`: 设置一个钩子, 一旦 `action` 失败就调用. 钩子可以返回 `false` 来捕获 `error` 并阻止 `error` 传播.
    - ```js
      user.$onAction(({
        store,
        name,
        args,
        after,
        onError
      }) => {
        console.log(`start action [${name}] with params [${args.join(', ')}] in store `, store);
        after((result) => {
          console.log(`action finished with result ${result}`);
        });
        onError((error) => {
          console.log(`Oops, something bad happens ${error}`);
          return false;
        })
      });
    - 调用传递参数的 `action` `plusAgeBy`
      - ![](../image/Snipaste_2022-07-31_21-02-49.png)
    - 如果函数出错
      - 自定义一个会报错的函数
      - ```js
        badAction() {
          console.log(asd);
        }
      - ![](../image/Snipaste_2022-07-31_21-07-48.png)
    - 📕默认订阅 `actions` 会与使用 `store` 的组件绑定(需要 `store` 在 `setup` 中), 也就是说如果组件卸载那么对 `actions` 的订阅同样会被移除. 如果在组件被卸载时想要保留, 需要传递 `{ detach: true }` 这个对象作为 `$onActions` 的第二个参数
    - `$onActions` 的返回值为一个函数, 调用这个函数会移除对 `actions` 的订阅
      - ```js
        const removeActionsSubscribe = user.$onAction(() => {
          // ...
        });
        function removeOnActions() {
          removeActionsSubscribe();
        }
### `Plugins`
1. `plugin` 是一个函数, 其接收一个 `context` 作为参数, 其返回值将会被添加到 `store` 上.
    - `context` 参数
      - `pinia`: `createPinia()` 返回的 `Pinia` 实例
      - `app`: `createApp()` 返回的 `app`
      - `store`: 被插件作用的 `store`
      - `options`: 定义 `defineStore` 时传入第三个参数
    - 返回值
      - 返回对象, 其中的属性将被添加到 `store`. 或者返回 `void`
    - 📕只有 `pinia` 实例被传给 `app` 之后创建的 `store` 才会被 `plugin` 作用.
2. `plugin` 的简单使用
    - 创建 `src/store/plugin/test.ts`
      - ```js
        import { PiniaPluginContext } from 'pinia'

        export default function (context: PiniaPluginContext) {
          console.log('context.pinia', context.pinia);
          console.log('context.app', context.app);
          console.log('context.store', context.store);
          console.log('context.options', context.options);
          return {
            secret: 'don\'t tell anyone!'
          }
        }
    - `main.js`
      - ```js
        import { createPinia } from 'pinia'
        import myPiniaPlugin from './store/plugin/test'

        const app = createApp(App);
        const pinia = createPinia();
        app.use(pinia);
        pinia.use(myPiniaPlugin);
    - 看下面的截图, 只有 `user` 和 `counter` 两个 `store` 被插件作用了, 而且每个 `store` 上都有 `plugin` 返回的参数.
    - ![](../image/Snipaste_2022-08-01_08-36-42.png)
    - ![](../image/Snipaste_2022-08-01_08-42-08.png)
    - 当然可以通过 `store.[属性]` 的方式直接使用
      - ```html
        <h2>By Plugin: {{ user.secret }}</h2>
      - ![](../image/Snipaste_2022-08-01_08-44-33.png)
    - 📕返回的参数每个 `store` 各自一份, 并不共享. 即如果你修改了 `store A` 的 `secret`, `store B` 的 `secret` 不会被影响.
3. 给 `store` 添加参数
    - 可以直接通过 `store.[属性]` 的方式给 `store` 添加参数, 但是官网建议尽量使用返回值的方式来从而被开发者工具跟踪
      - 📕这种方式同样每个 `store` 都有自己的数据, 互不影响.
      - 📕这种方式其实就是给 store 添加新的 `state`
      - ```js
        export default function (context: PiniaPluginContext) {

          context.store.hello = 'world';
          return {
            secret: 'don\'t tell anyone!'
          }
        } 
      - 这样的方式开发者工具并不会侦测到属性的添加, 只有在控制台打印 `store` 时才可以看到
      - ![](../image/Snipaste_2022-08-01_09-06-18.png)
      - 如果一定要在开发者工具中看到这个属性, 请保证 **`仅`** 在 `开发环境` 下使用 `_customProperties`. 因为生产环境下会被移除
        - ```js
          context.store.hello = 'world';
          if (process.env.NODE_ENV === 'development') {
            context.store._customProperties.add('hello');
          }
        - ![](../image/Snipaste_2022-08-01_09-15-14.png)
4. 给 `store` 添加响应式参数
    -  📕另外, 如果定义属性时使用响应式数据, 那么每个 `store` 都会有自己的属性; 
    - 由于 `store` 本身是 `reactive`, 其会自动解包内部的 `ref` 或者 `reactive`, 因此在访问器内部响应式数据时不需要使用 `.value`
    - ```js
      context.store.good = ref('bye');
      console.log('no unwrapping', context.store.good);
    - 在组件中使用
      - ```html
        <h2>By Plugin Reactive: {{ user.good }}</h2>
      - ```js
        function updateRefGood() {
          user.good = 'hahaha'
          console.log('after changing user good ', count.good)
        }
    - ![](../image/Snipaste_2022-08-01_09-58-41.png)
  - 但是响应式数据定义在插件之外, 那么所有的 `store` 共享一个属性.
    - 同样的套路, 现在 `plugin` 中定义数据
    - ```js
      const bad = ref('sad')
        export default function (context: PiniaPluginContext) {

          context.store.hello = 'world';

          // each store has its own good
          context.store.good = ref('bye');
          console.log('no unwrapping', context.store.good);

          // all store share the same bad
          context.store.bad = bad;

          return {
            secret: 'don\'t tell anyone!'
          }
        }
    - 在组建中
      - ```html
        <h2>By Plugin nonReactive: {{ user.bad }}</h2>
        <button @click="updateRefBad">updateRefBad</button>
      - ```js    
        function updateRefBad() {
          user.bad = 'happy';
          console.log('after changing user bad ', count.bad)
        } 
      - ![](../image/Snipaste_2022-08-01_10-08-53.png)   
5. 给 `store` 添加新的 `state`
    - 如果想给 store 添加新的 state property 可以通过下面两种方式
      - 直接通过 `store.[属性名]`
      - 通过 `store.$state` 这样才能在开发者工具中使用, 并且在 `SSR` 过程中被序列化.
    - 下面看第二种
      - ```js
        export default function({ store } : PiniaPluginContext) {
          if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
            const hasError = ref(false);
            store.$state.hasError = hasError;
          }
          store.hasError = toRef(store.$state, 'hasError');
        }
      - `1️⃣` 首先, 为了正确处理 `SSR`, 需要确保不覆盖任何已存在的值. 因此先判断是否存在 `hasError`
      - `2️⃣` 如果不存在, 那么使用 `ref` 定义. 这样每个 `store` 都会有自己独立的 `hasError`
      - `3️⃣` 其次, 如果已经存在 `hasError`, 我们需要将 `hasError` 从 `state` 转移到 `store`, 这样既可以通过 `store.hasError` 访问, 也可以通过 `store.$state.hasError` 访问.
    - 📕这种情况下, 最后不要在 `return` 时返回 `hasError` 了. 因为返回值会被展示在开发者工具中的 `state` 部分, 又定义又返回就会展示两次了.
    - 📕在 `plugin` 中的增加 `state` 或修改 `state`, 都不触发任何的订阅, 因为这时 `store` 并不活跃 
6. 添加外部属性
    - 如果要添加外部属性, 添加来自其他库的类的实例, 添加其他非响应式的数据, 我们应该使用 `markRaw` 包装一下再传递给 `pinia`.
    - ```js
      context.store.language = markRaw({
        locale: 'zh-CN',
      });
7. 调用 `$onAction` 和 `$subscribe`
    - ```js
      context.store.$subscribe((mutation, state) => {
        // ...
      });
      context.store.$onAction(() => {
        // ...
      });
8. 添加新的 `options` 参数
    - 在调用 `defineStore` 时可以传入第三个参数, 这个参数会被 `plugin` 得到
      - ```js
        


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
![](../image/)
![](../image/)
![](../image/)
![](../image/)