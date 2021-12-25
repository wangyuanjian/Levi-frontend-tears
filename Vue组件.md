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
## 组件的嵌套
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




























