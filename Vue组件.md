<!-- TOC -->

- [Vue 组件](#vue-组件)
  - [初见组件](#初见组件)
  - [非单文件组件](#非单文件组件)
    - [非单文件组件](#非单文件组件-1)
    - [组件的嵌套](#组件的嵌套)
    - [VueComponent](#vuecomponent)
    - [一个重要的内置关系](#一个重要的内置关系)
  - [单文件组件](#单文件组件)
    - [编写单文件组件](#编写单文件组件)
    - [引入单文件组件](#引入单文件组件)
  - [处理边界情况](#处理边界情况)
    - [程序化的事件监听器](#程序化的事件监听器)

<!-- /TOC -->

# Vue 组件
## 初见组件
1. 传统方式编写应用
    - ![](../image/Snipaste_2021-12-21_20-09-25.png)
    - 存在的问题:
      - 依赖关系混乱, 不好维护
      - 代码复用率不高
2. 使用组件编写应用
    - `组件`: 实现应用中`局部`功能`代码`和`资源`的`集合`
    - ![](../image/Snipaste_2021-12-21_20-19-14.png)
    - ![](../image/Snipaste_2021-12-21_20-20-56.png)
## 非单文件组件
> 非单文件组件: 一个文件中包含多个组件 \
单文件组件: 一个文件(`.vue`)只包含一个组件
### 非单文件组件
1. 拆分组件
    - 现在有一个业务, 我们需要将下面的代码拆成 `school` 和 `student` 两个组件
    - ```html
      <div id="root">
        <h2>学校名称: {{schoolName}}</h2>
        <h2>学校地址: {{address}}</h2>
        <hr>
        <h2>学生姓名: {{studentName}}</h2>
        <h2>学生年龄: {{18}}</h2>
      </div>
    - ```js
      new Vue({
        el: '#root',
        data: {
          schoolName: 'MIT',
          address: 'USA',
          studentName: 'John',
          age: 18
        },
      })
2. 创建组件: `Vue.extend()`
    - 使用基础 `Vue` 构造器, 创建一个“子类”. 参数是一个包含组件选项的对象. 
    - 一定不要🙅‍写 `el`配置项, 因为最终所有的组件都要被一个 `vm` 管理, 由 `vm` 决定组件服务于哪个容器
    - `data`: 必须是函数, 在函数中返回真正定义的数据
      - ```js
        data: function () {
          return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
          }
        }
      - 为什么❓
      - 如果写成对象形式, 当该组件在不同的地方被引用时, data 被共享, 导致一处修改, 其他地方都修改了. 如果写成函数并在其中返回, 那么即便组件在不同的地方被引用, 没处的数据并不共享
      - ![](../image/Snipaste_2021-12-21_20-47-26.png)
      - ```js
        const school = Vue.extend({
          data() {
            return {
              schoolName: 'MIT',
              address: 'USA',
            }
          }
        });
    - `template`
      - 显然每个组件都需要有自己的 `HTML` 结构, 这时候, 就要使用 `template` 来定义组件自身的结构
      - ```js
        const school = Vue.extend({
          template: `
            <div>
              <h2>学校名称: {{schoolName}}</h2>
              <h2>学校地址: {{address}}</h2>
            </div>
          `,
          data() {
            return {
              schoolName: 'MIT',
              address: 'USA',
            }
          }
        });
    - 组件的简写
      - `const school = Vue.extend(options)`
      - 可以被简写为
      - `const school = options`
      - <hr>
      - 其实没有啥, 只是在注册组件的时候, 如果 `Vue` 发现传入的如果是对象, 就会自动帮你调用 `Vue.extend`
      - ```js
        const school = {
          template: `
            <div>
              <h2>学校名称: {{schoolName}}</h2>
              <h2>学校地址: {{address}}</h2>
            </div>
          `,
          data() {
            return {
              schoolName: 'MIT',
              address: 'USA',
            }
          }
        };
3. 注册组件: `components` 或 `Vue.component`
    - 在 `vm` 中使用全新配置项: `components`
      - `key`: 组件的`名`
      - `value`: 定义的组件
    - ```js
      new Vue({
        el: '#root',
        // 注册组件
        components: {
          xuexiao: school,
          // 简写
          student
        }
      });
    - 下面使用全局方式注册
      - 第一个参数: 组件名
      - 第二个参数: 组件实例
      - ```js
        Vue.component('xuexiao', school);
      - 🐖注意, 上面的代码也一定要写在创建 vm 实例之前
4. 使用组件标签
    - ```html
      <div id="root">
        <xuexiao></xuexiao>
        <hr>
        <student></student>
      </div>
    - ![](../image/Snipaste_2021-12-21_21-02-20.png )
    - 🐖注意: `Vue DevTools` 中的组件名首字母是大写的
5. 组件命名
    - 一个英文单词: `全小写`或`首字母大写`
      - ```js
        new Vue({
          el: '#root',
          components: {
            Student: student
          }
        });
    - 多个英文单词
      - `kebab-case`: 全小写, 并用 `-` 连接
        - ```js
          new Vue({
            el: '#root',
            components: {
              'my-student': student
            }
          });
        - ```html
          <my-student></my-student>
        - 但注意, 这时的开发者工具
        - ![](../image/Snipaste_2021-12-23_20-56-37.png)
      - `CamelCase`: 所有单词首字母大写
        - 🐖注意: 需要脚手架支持
        - ```js
          new Vue({
            el: '#root',
            // 注册组件
            components: {
              MyStudent: student
            }
          });
        - ```html
          <MyStudnet></MyStudnet>
    - 不要使用 `HTML` 规范中的标签
      - ```js
        new Vue({
          el: '#root',
          components: {
            h2: student
          }
        });
      - ![](../image/Snipaste_2021-12-23_21-05-52.png)
      - 就是使用`<H2>`也不行, `Vue` 自动将其转为原生的 `<h2>`
    - `name`: 配置项
      - 目前, DevTools 中的组件名和我们注册组件时使用的名字呼应, 如果我们想要修改 DevTools 中的组件名, 就要使用该配置项
      - ```js
        const student = Vue.extend({
          name: 'wang',
          template: `
            <div>
              <h2>学生姓名: {{studentName}}</h2>
              <h2>学生年龄: {{18}}</h2>
            </div>
          `,
          data() {
            return {
              studentName: 'John',
              age: 18
            }
          }
        });
      - ![](../image/Snipaste_2021-12-23_22-05-07.png)
6. 组件标签
    - 正常闭合: `<MyStudnet></MyStudnet>`
    - 自闭合: `<MyStudnet/>`
      - 🐖注意: 这种只能在脚手架环境使用. 如果非脚手架情况下使用, 可能会 `bug`. 比如, 我下面使用了三个组件, 但是页面只显示2 两个
      - ![](../image/Snipaste_2021-12-23_22-19-45.png)
### 组件的嵌套
1. 因为实际开发中, 会有很多的组件, 但这些组件不会全都直接由 `vm` 管理, 不然 `main.js` 就会引入很多文件. 所以我们创建一个一人之下万人之上的 `app` 组件. `vm` 只管理 `app`, 而 `app` 管理其他所有组件.
    - ```html
      <div id="root">
        <app></app>
      </div>
    - ```js
      const student = Vue.extend({
        template: `
          <div>
            <h2>学生姓名: {{studentName}}</h2>
            <h2>学生年龄: {{18}}</h2>
          </div>
        `,
        data() {
          return {
            studentName: 'John',
            age: 18
          }
        }
      });
      const school = {
        template: `
          <div>
            <h2>学校名称: {{schoolName}}</h2>
            <h2>学校地址: {{address}}</h2>
            <hr/>
            <student></student>
          </div>
        `,
        data() {
          return {
            schoolName: 'MIT',
            address: 'USA',
          }
        },
        components: {
          student
        }
      };
      const hello = Vue.extend({
        template: `<h1>{{msg}}</h1>`,
        data() {
          return {
            msg: '欢迎学习 Vue.'
          }
        }
      });

      const app = Vue.extend({
        template: `
          <div>
            <school></school>
            <hello></hello>
          </div>
        `,
        components: {
          school,
          hello,
        }
      })
      
      new Vue({
        el: '#root',
        components: {
          app
        }
      })
    - ![](../image/Snipaste_2021-12-25_09-45-36.png)
### VueComponent
1. 组件究竟是什么?
    - `VueComponent` 构造函数
    - ![](../image/Snipaste_2021-12-25_09-53-12.png)
    - ![](../image/Snipaste_2021-12-25_12-43-14.png)
2. 我们只需要写 `<school>` 或者 `<school></school>`, `Vue` 在解析式会帮我们创建 `school` 组件的实例对象, 即 `Vue` 执行 `new Component(options)`
3. 每次调用 `Vue.extend()` 返回的都是一个全新的组件
    - 即便是相同配置内容返回的都是不同的组件
4. 关于 `this`: 组件配置中, `data`, `methods`, `watch`, `computed` 中 `this` 均为 `VueComponent` 实例对象
    - ![](../image/Snipaste_2021-12-25_11-58-00.png)
5. 如何体现 `vm` 管理着众多的组件实例对象 `vc` 呢?
    - `vm` 身上有 `$children`
    - ![](../image/Snipaste_2021-12-25_12-10-07.png)
### 一个重要的内置关系
> VueComponet.prototype.\_\_proto__ === Vue.prototype
1. ![](../image/Snipaste_2021-12-25_12-58-41.png)
2. ![](../image/Snipaste_2021-12-25_13-19-17.png)

## 单文件组件
> \<template> 模板 \
\<script> 脚本 \
\<style> 样式
### 编写单文件组件
1. `<template>`
    - 在这个标签中写模板, 也必须只有一个根元素
    - ```html
      <template>
        <div>
          <h2>学校名称: {{schoolName}}</h2>
          <h2>学校地址: {{address}}</h2>
          <button @click="showName"></button>
        </div>
      </template>
2. `<script>`
    - 创建并暴露组件实例对象. 下面采用简写形式, 省略 `Vue.extend(options)`
    - ```js
      <script>
        export default {
          name: 'Student',
          data() {
            return {
              schoolName: 'MIT',
              address: 'USA'
            }
          },
          methods: {
            showName() {
              console.log(this.schoolName);
            }
          },
        }
      </script>
3. `<style>`
    - 写样式
    - ```css
      <style>
        h2 {
          background-color: #f60;
        }
      </style>
    - 
### 引入单文件组件
1. 下面我们在创建的 `App.vue` 文件中引入 `Student` 组件
    - ```js
      <script>
        // 脚手架可以不用写后面的 .vue
        import Student from './Student.vue'
        export default {
          components: {
            Student
          }
        }
      </script>
    - 在脚手架中, 可以不用写后面的 `.vue`
2. 下面, 我们需要在创建 `vm` 时, 引用 `App.vue`, 这时, 我们需要创建一个入口文件(`main.js`), 在这个文件中创建 `vm`
    - ```js
      import App from './App.vue'

      new Vue({
        el: `#root`,
        components: {App}
      })
3. 有了 vm, 我们还需要一个 `index.html` 来编写模板和引入 `main.js`
    - ```html
      <div id="root">
        <App></App>
        <script src="../js/vue.js"></script>
        <script src="./033main.js"></script>
      </div>
4. 其实写完上面这几步骤, 脚手架的基本文件和作用就呼之欲出了

## 处理边界情况
### 程序化的事件监听器
1. 如果我们在页面中使用定时器, 那么大概率的思路如下, 在 `mounted` 中开启定时器并且在 `beforeDestroy` 中销毁定时器.(具体写在哪个生命周期钩子不是这里讨论的重点😀)
    - ```html
      <h1>{{count}}</h1>
    - ```js
      export default {
        name: "Student",
        data() {
          return {
            count: 0
          };
        },
        mounted() {
          this.intervalId = setInterval(() => {
            this.count++;
          }, 1000);
        },
        beforeDestroy() {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      };
    - 上面的代码导致了两个问题
      - 首先, 在 `this` 上保存定时器 `id`, 最好的情况是只有生命周期钩子可以访问到它.
      - 创建定时器的代码和清除定时器的代码互相独立, 很难程序化的清理要建立的所有东西.
2. 可以通过程序化的侦听器解决这个问题
    - ```js
      export default {
        name: "Student",
        data() {
          return {
            count: 0
          };
        },
        mounted() {
          let intervalId = setInterval(() => {
            this.count++;
          }, 1000);

          this.$once('hook:beforeDestroy', () => {
            console.log('---beforeDestroy---');
            clearInterval(intervalId);
            intervalId = null;
          })
        },
      };
    - 通过侦听 `hook:beforeDestroy` 事件, 省略了保存 `intervalId` 同时将注册和清理逻辑放在了一起.
3. 除此之外呢, `@hook` 可以监听子组件的生命周期. 虽然我们都知道子组件和父组件的生命周期存在某种先后关系, 但是了解 `@hook` 也是实现另一种方式
    - 子组件
      - ```html
        <h3>Son</h3>
      - ```js
        export default {
          mounted() {
            console.log('Son---mounted');
          }
        }
    - 父组件
      - 使用 `@hook:mounted` 注册自定义事件.
      - ```html
        <div>
          <h2>Father</h2>
          <Son @hook:mounted="childMountHandler"></Son>
        </div>
      - ```js
        import Son from './Son.vue'
        
        export default {
          components: { Son },
          mounted() {
            console.log('Father---mounted');
          },
          methods: {
            childMountHandler() {
              console.log('Oops, son mounted');
            }
          }
        }
      - 来看执行顺序 `子mounted -> 父hook:mounted -> 父mounted`
      - ![](../image/Snipaste_2022-07-12_19-32-40.png)


![](../image/)





