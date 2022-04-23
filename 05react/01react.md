<!-- TOC -->

- [`React基础@2022/04/16`](#react基础20220416)
  - [Hello World](#hello-world)
    - [创建虚拟 DOM 的第二种方式](#创建虚拟-dom-的第二种方式)
    - [JSX](#jsx)
    - [元素](#元素)
  - [组件](#组件)
    - [函数式组件](#函数式组件)
    - [类式组件](#类式组件)
    - [state](#state)
    - [事件处理](#事件处理)

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
    - 一旦创建, 就无法改变, 是不可变对象, 因为它代表了某个特定时刻的 `UI`.
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
### 元素
1. 元素是构成 `React` 应用的最小块, 描述了在页面上看到的内容. 组件是由元素构成的.
    - 与浏览器的 `DOM` 元素不同, `React` 元素是创建开销极小的普通对象, `React DOM` 会负责更新 `DOM` 与 React 元素保持一致
    - 之前截图的就是 React 元素
    - ![](../../image/Snipaste_2022-04-17_09-09-05.png)
## 组件
> 组件允许你将 `UI` 拆分为独立可复用的代码片段，并对每个片段进行独立构思
### 函数式组件
1. 使用 `function` 编写函数即可定义函数式组件.
    - ```jsx
      function Welcome() {
        return <h1>Function Component! :)</h1>
      }
    - 📕注意: 函数名首字母一定要大写!
    - 📕注意: 要返回一个 React 元素.
    - 接下来, 就将函数组件渲染至页面. 通过编写 `闭合` 的 `jsx` 即可
    - ```jsx
      ReactDOM.render(
        <Welcome />,
        document.getElementById('test')
      ); 
2. 函数式组件的本质仍是 `JavaScript` 中的函数, 通过控制台打印可以看到
    - ![](../../image/Snipaste_2022-04-17_20-44-52.png)
    - 📕注意: 函数中的 `this` 为 `undefined`, 因为 `Babel` 开启了严格模式.
    - 📕在 React DevTools 插件安装之后, 可以在 F12 的 Components 选项卡中看到 Welcome 组件
      - ![](../../image/Snipaste_2022-04-17_21-04-00.png)
    - 📕既然是函数, 是 `React` 帮我们调用了, 并拿到了返回值. 如果在 `render()` 函数中直接调用函数会是怎么样呢?
      - 同样的内容, 但是却看不到 `Welcome` 组件了, 因为下面的两种写法是相同的, 但是和组件没关系了, 而是元素.
      - ```jsx
        ReactDOM.render(Welcome(), document.getElementById('test'));
        ReactDOM.render(<h1>Function Component! :)</h1>, document.getElementById('test'));
      - ![](../../image/Snipaste_2022-04-17_21-05-55.png) 
### 类式组件
1. 通过 `5` 步将函数式组件转为 `class` 组件
    - 创建同名的 `class`, 并继承 `React.Component`
    - 添加空的 `render` 方法
    - 将函数体移动到 `render` 中
    - 在 `render` 中使用 `this.props` 替换 `props`
    - 删除剩余的空函数声明
    - ```jsx
      class Welcome extends React.Component {
        render() {
          return (
            <h1>Function Component! :)</h1>
          );
        }
      }
2. 两个问题
    - `render` 方法存在在哪? 在 `Welcome` 的原型对象上
    - ![](../../image/Snipaste_2022-04-19_20-41-04.png)
    - `render` 方法中的 `this` 是谁? 是组件实例对象
    - ![](../../image/Snipaste_2022-04-19_20-50-15.png)
### state
1. 复杂组件与简单组件
    - 简单组件: 无状态; 所以函数组件没有 `state`(不考虑 `hooks`)
    - 复杂组件: 有状态;
2. 什么是状态(`state`)?
    - 存储数据的地方. 其值是对象.
    - 作用: 状态驱动页面变化.
    - 组件实例上就已经有 `state` 属性了.
    - ![](../../image/Snipaste_2022-04-19_20-50-15.png)
    - 基础案例: 根据 `state` 中的属性显示天气凉爽或天气炎热
    - ```jsx
      class Weather extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            isHot: false,
          };
        }
        render() {
          return (
            <h1>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>
          )
        }
      }
    - 📕`state` 的初始化要在 `constructor` 中进行
### 事件处理
1. 首先回顾一下 `ES6` 中 `class` 的一些语法
    - ```js
      class Student {
        constructor(name, age) {
          this.name = name;
          this.age = age;
        }
        goToSchool() {
          console.log('###', this);
        }
      }
      const student = new Student();
      console.log(student);
      student.goToSchool();
      const x = student.goToSchool;
      x();
    - 首先, `goToSchool` 这个函数并不存在对象身上, 而是在对象的原型对象上.
      - ![](../../image/Snipaste_2022-04-20_22-42-16.png)
    - 其次, 类中方法默认开启严格模式, 所以 `x()` 打印出来的是 `undefined`
      - ![](../../image/Snipaste_2022-04-23_08-20-17.png)
    - 第三, 就是 js 中函数的 `this` 究竟是谁的问题? 谁调用的函数, `this` 就是谁!
2. React 元素的事件处理和 DOM 元素的事件很像, 但是有些语法上的不同
    - React 的事件命名采用小驼峰形式(`camelCase`), 而不是纯小写
    - 采用 JSX 语法时需要传入`一个函数`作为事件处理函数, 而不是一个字符串.
    - 原生写法
      - ```html
        <button onclick="activateLasers()">
          Activate Lasers
        </button>
    - React 写法
      - ```jsx
        // activateLasers 是一个函数
        <button onClick={activateLasers}>
          Activate Lasers
        </button>
    - 来看下面的例子
      - ```jsx
        class Weather extends React.Component {
          render() {
            return (
              <h1 onClick={h1Handler}>今天天气很凉爽</h1>
            )
          }
        }
        function h1Handler() {
          console.log('我被点击了', this);
        }
      - 猜猜点击完后, 就打印什么? 还是会报错?
        - ![](../../image/Snipaste_2022-04-23_08-38-35.png)
        - 打印的结果是 `undefined` 因为 `babel` 默认开启了严格模式. 但是 `undefined` 也说明了没法拿到组件实例对象, 这样就毫无意义
2. 既然我们要在 h1Handler 中拿到 this, 那么把函数写在 class 里不久好了吗?
    - ```jsx
      class Weather extends React.Component {
        h1Handler() {
          console.log('我被点击了', this);
        }
        render() {
          return (
            <h1 onClick={h1Handler}>今天天气很凉爽</h1>
          )
        }
      }
    - 首先这样写就会直接报错, 因为 `React` 根本找不到 `h1Handler`. 因为在基础知识里说过, `class` 中的方法在对象的原型对象上. 因此要想拿到 `h1Handler` 就必须拿到组件实例对象, 或者说拿到 `this` 也行.
      - ![](../../image/Snipaste_2022-04-23_08-46-58.png)
    - 接下来, 我们尝试看看 `onClick={}` 花括号中的 `this` 是谁?
      - 😄哈哈, 就是组件实例对象, 这下找到了 `this`.
      - ```jsx
        <h1 onClick={console.log(this)}>今天天气很凉爽</h1>
      - ![](../../image/Snipaste_2022-04-23_09-02-04.png)
    - 因此只需把代码做一点点小改动即可
      - ```jsx
        class Weather extends React.Component {
          h1Handler() {
            console.log('我被点击了', this);
          }
          render() {
            return (
              // <h1 onClick={h1Handler}>今天天气很凉爽</h1>
              // <h1 onClick={console.log(this)}>今天天气很凉爽</h1>
              <h1 onClick={this.h1Handler}>今天天气很凉爽</h1>
            )
          }
        }
      - 😱问题再次出现😱, `h1Handler` 为啥还是 `undefined` 呢?
      - ![](../../image/Snipaste_2022-04-23_09-05-14.png)
3. 

- ![](../../image/)