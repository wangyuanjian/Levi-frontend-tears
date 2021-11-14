<!-- TOC -->

- [Vue](#vue)
  - [Vue 简介](#vue-简介)
  - [搭建 Vue 开发环境](#搭建-vue-开发环境)
  - [初识 `Vue`- `Hello World`](#初识-vue--hello-world)
    - [创建 `Vue` 实例](#创建-vue-实例)
    - [模板语法(v-bind)](#模板语法v-bind)

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

### 模板语法(v-bind)
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







