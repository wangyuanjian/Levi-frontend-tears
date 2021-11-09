# Vue 简介
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
    - 