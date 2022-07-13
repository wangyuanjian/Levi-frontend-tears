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
    - [计算属性(`computed`)](#计算属性computed)
    - [侦听器(`watch`)](#侦听器watch)
      - [侦听基础](#侦听基础)
      - [第三个参数](#第三个参数)
      - [停止侦听器](#停止侦听器)
      - [`watchEffect`](#watcheffect)
    - [生命周期](#生命周期)
    - [`hook`](#hook)
    - [`toRef` 和 `toRefs`](#toref-和-torefs)
    - [`shallowReactive` 和 `shallowRef`](#shallowreactive-和-shallowref)
    - [`readonly` 和 `shallowReadonly`](#readonly-和-shallowreadonly)

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
        </div>\
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
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)
![](../image/)