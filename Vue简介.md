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
3. 