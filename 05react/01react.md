<!-- TOC -->

- [`React基础@2022/04/16`](#react基础20220416)
  - [Hello World](#hello-world)
    - [创建虚拟 DOM 的第二种方式](#创建虚拟-dom-的第二种方式)

<!-- /TOC -->

# `React基础@2022/04/16`
> 用于构建用户界面的 JavaScript 库
## Hello World
1. 非脚手架模式使用 `React`
    - ```html
      <body>
        <div id="test"></div>

        <script src="../js/react.development.js"></script>
        <script src="../js/react-dom.development.js"></script>
        <script src="../js/babel.min.js"></script>
        <script type="text/babel">
          const vDom = <h1>Hello, World!</h1>
          ReactDOM.render(vDom, document.getElementById('test'));
        </script>
      </body>
    - `react.development.js`: `React` 核心库
    - `react-dom.development.js`: 用于支持 `React` 操作 `DOM` 的库
    - `babel.min.js`: 将 `jsx` 转为 `js`
    - 📕: 必须要写 `type="text/babel"`, 因为我们使用的 `jsx` `语法而不仅仅是 `js` 语法.
      - `const vDom = <h1>Hello, World!</h1>`: 创建`虚拟 DOM`, 注意一定不要使用引号将 `HTML` 标签引起来
      - `ReactDOM.render`: 将虚拟 `DOM` 渲染到页面
2. 更复杂的虚拟 `DOM`
    - 使用圆括号`()`将 `DOM` 内容括起来
    - ```html
      <script type="text/babel">
        const vDOM = (
          <h1 id="hello">
            <span>Hello, World</span>
          </h1>
        )
        ReactDOM.render(vDom, document.getElementById('test'));
      </script>
### 创建虚拟 DOM 的第二种方式
1. 不适用 `jsx`, 而是 `js`
    - ```html
      <body>
        <div id="test"></div>

        <script src="../js/react.development.js"></script>
        <script src="../js/react-dom.development.js"></script>
        <script type="text/babel">
          const vDom = React.createElement('h1', {
            id: 'hello'
          }, React.createElement('span', {}, 'Hello, World'));
          ReactDOM.render(vDom, document.getElementById('test'));
        </script>
      </body>
2. 因为不使用 `jsx`, 因此不需要引入 `babel`.
    - `React.createElement` 是创建虚拟 `DOM` 的函数, 接收三个参数
      - 参数`1`: `DOM` 的标签名
      - 参数`2`: 标签的属性
      - 参数`3`: 标签的内容. 如果内容是其他 `HTML` 标签, 需要继续使用 `React.createElement` 函数
3. `babel` 最终将 `jsx` 转为上面的 `js` 语法, 因此 `jsx` 是语法糖