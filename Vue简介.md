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











