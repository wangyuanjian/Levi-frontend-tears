<!-- TOC -->

- [Vue](#vue)
  - [Vue 简介](#vue-简介)
  - [搭建 Vue 开发环境](#搭建-vue-开发环境)
  - [初识 `Vue`- `Hello World`](#初识-vue--hello-world)
    - [创建 `Vue` 实例](#创建-vue-实例)
  - [模板语法(v-bind)](#模板语法v-bind)
  - [数据绑定(v-model)](#数据绑定v-model)
    - [数据代理](#数据代理)
  - [事件处理(v-on)](#事件处理v-on)
    - [事件修饰符](#事件修饰符)
    - [按键修饰符](#按键修饰符)

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
    - `data` 的第二种写法: 函数. 注意🐖:组件中 `data` 只能采用这种写法
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
      - 遇到函数, 究竟用不用箭头函数呢? 原则🐖:是 **`Vue` 管理的函数**就不用箭头函数, 否则使用箭头函数.
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
    - 对象语法
      - 传给 class 一个对象, 用以动态切换 class
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
    - 数组语法
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
      - `VM(View Model)`: 视图模型, `Vue` 实例对象. 🐖:所以我们通常使用 `vm` 这个变量名表示 `Vue` 实例对象
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
7. 如果事件处理的代码很少, 那么可以直接在函数绑定后面写 `js` 代码
    - ```html
      <button @click="sum++">点击+1</button>
    - ```js
      new Vue({
        el: '#root',
        data: {
          sum: 0
        }
      })
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
    - 🐖注意: `.stop` 修饰的是点击事件真实发生的元素
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
4. 



    




