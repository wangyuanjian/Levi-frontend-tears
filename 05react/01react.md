<!-- TOC -->

- [`React基础@2022/04/16`](#react基础20220416)
  - [Hello World](#hello-world)
    - [创建虚拟 DOM 的第二种方式](#创建虚拟-dom-的第二种方式)
    - [JSX](#jsx)

<!-- /TOC -->

# `React基础@2022/04/16`
> 用于构建用户界面的 JavaScript 库 \
> 中文官网: [https://react.docschina.org/](https://react.docschina.org/)
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
        <script type="text/javascript">
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
4. 虚拟 `DOM` 究竟是什么?
    - 对象
    - ![](../../image/Snipaste_2022-04-17_09-09-05.png)
### JSX
> const element = `<h1>Hello, world!</h1>`; 

1. 上面的标签语法既不是字符串, 也不是 `HTML`, 被称为 `JSX(JavaScript XML)`, 是一个 `JavaScript` 的语法扩展, 可以很好地描述 `UI` 应该呈现出它应有交互地本质形式.
    - `React` 认为渲染逻辑本质上与其他 `UI` 逻辑内在耦合, 比如, 在 `UI` 中需要绑定处理时间, 在某些时刻状态发生变化时需要通知到 `UI`, 以及需要在 `UI` 中展示准备好地数据.
    - `React` 并没有采用将`标记与逻辑进行分离到不同文件`这种人为的分离方式, 而是通过将二者共同存放在称之 `组件` 的松散耦合单元之中, 来实现关注点分离.
    - 📕不要写引号!
2. 语法
    - ```html
      <script type="text/babel">
        const myId = 'GoOdMoRnInG';
        function myToUpperCase(value = '') {
          return value.toUpperCase();
        }
        const divStyle = {
          backgroundColor: 'red',
          color: 'white'
        }

        const vDOM = (
          <div>
            <h1 id={myId}>
              <span className="title">{myToUpperCase('Hello, World')}</span>
            </h1>
            <div style={divStyle}>
              <span style={{fontSize: '2rem'}}>Bye, Yesterday</span>  
            </div>
          </div>
        );
        console.log('vDom', vDOM);
        ReactDOM.render(vDOM, document.getElementById('test'));
      </script>
    - 语法`1`: 标签中使用 `{}` 来写 `js` 表达式;
    - 语法`2`: 样式的类名不要写 `class`, 要用 `className`; 使用 `tabIndex` 而不是 `tabindex`;
    - 语法`3`: 内联样式要用 `style={{key: value}}` 的形式写, 或者把样式定义在外面, 写 `style={obj}` 的形式;
    - 语法`4`: 只有一个跟标签;
    - 语法`5`: 标签必须闭合(自闭合也行);
    - 语法`6`: 标签首字母
      - 如果是小写, 则将其当作 `HTML` 内置的同名元素;
      - 如果是大写, `React` 就渲染对应的组件, 若组件没有定义, 报错.
3. `jsx` 也是一个表达式, 在编译之后, `jsx` 会被转为普通的 `JavaScript` 调用, 并且对其取值后得到 `JavaScript` 调用
    - 也就是说, 可以在 `if` 合 `for` 中使用 `jsx`, 将 `jsx` 赋值给变量, 把 `jsx` 当作参数传入, 从函数中返回 `jsx`
    - ```jsx
      function greetUser(name) {
        if (name) {
          return <h1>hello, {name}</h1>
        }
        return <h1>hello, stranger</h1>
      }    
      { greetUser('John') }
      { greetUser() }
    - ![](../../image/Snipaste_2022-04-17_16-49-45.png)
    - ```jsx
      function loveDiv(dom) {
        if (dom.type === 'div') {
          return '❤';
        }
        return '💔';
      }
      { loveDiv( <div></div> ) }
      { loveDiv( <h1></h1> ) }
    - ![](../../image/Snipaste_2022-04-17_16-57-45.png)
4. 注释, 同样使用 `{}`
    - ```jsx
      {/* 我是单行注释 */}
      {
        /*
        我是多行注释
        */
      }