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
      - [setState](#setstate)
      - [state 的简写方式](#state-的简写方式)
    - [Props](#props)
      - [children](#children)
    - [`Refs`](#refs)
      - [字符串型 `Refs`](#字符串型-refs)
      - [回调型`Refs`](#回调型refs)
      - [`createRef()`](#createref)
    - [事件处理](#事件处理)
      - [改变 `this` 之使用 `bind`](#改变-this-之使用-bind)
      - [改变 `this` 之使用 `箭头函数`](#改变-this-之使用-箭头函数)
      - [向事件处理函数传递参数](#向事件处理函数传递参数)
    - [表单处理](#表单处理)
      - [受控组件](#受控组件)
      - [非受控组件](#非受控组件)
      - [`textarea`](#textarea)
      - [`select`](#select)
      - [`<input type="file">`](#input-typefile)
    - [生命周期](#生命周期)
      - [旧的生命周期钩子](#旧的生命周期钩子)
      - [新的生命周期钩子](#新的生命周期钩子)
  - [脚手架](#脚手架)
    - [文件项目介绍](#文件项目介绍)
    - [严格模式](#严格模式)
    - [样式模块化](#样式模块化)
    - [子组件给父组件传值](#子组件给父组件传值)
    - [使用 confirm/alert 等函数前需要加上 window](#使用-confirmalert-等函数前需要加上-window)
    - [使用代理服务器](#使用代理服务器)
      - [方式一: 写在 `package.json`](#方式一-写在-packagejson)
      - [方式二: 写在 `setupProxy.js` 中](#方式二-写在-setupproxyjs-中)
      - [消息订阅与发布](#消息订阅与发布)
    - [`<Fragment>`](#fragment)
    - [`Context`](#context)
  - [`react-router@5.3.0`](#react-router530)
    - [路由组件和一般组件](#路由组件和一般组件)
    - [`NavLink`](#navlink)
    - [懒加载`lazy`](#懒加载lazy)
    - [`Switch`](#switch)
    - [解决样式丢失的问题](#解决样式丢失的问题)
    - [路由的模糊匹配和严格匹配](#路由的模糊匹配和严格匹配)
    - [`Redirect` 的使用](#redirect-的使用)
    - [嵌套路由](#嵌套路由)
    - [传递路由参数](#传递路由参数)
      - [`params` 参数](#params-参数)
      - [`search` 参数](#search-参数)
      - [`state` 参数](#state-参数)
    - [`push` 和 `replace` 模式](#push-和-replace-模式)
    - [编程式路由导航](#编程式路由导航)
    - [`withRouter`](#withrouter)
  - [Ant Design@4.8.2](#ant-design482)
  - [`Redux`](#redux)
    - [基础](#基础)
    - [简易版求和案例](#简易版求和案例)
    - [完整版求和案例](#完整版求和案例)
    - [`combineReducers`](#combinereducers)
    - [纯函数](#纯函数)
    - [`redux` 开发者工具](#redux-开发者工具)
    - [异步 `action`](#异步-action)
    - [`react-redux`](#react-redux)
      - [基础](#基础-1)
      - [优化](#优化)
  - [`Hooks`](#hooks)
    - [`useState`](#usestate)
    - [`useEffect`](#useeffect)
    - [`useRef`](#useref)

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
3. 什么样的数据需要放在 `state` 中?
    - 首先就是不需要响应式使用的数据, 否则就是增加负担;
    - 如果变量是通过 `props` 从父组件获取, 就不需要放在 `state` 中, 因为 `props` 中的数据是不能更改的;
    - 如果在 `render` 函数中没有使用到, 也可以不将其放在 `state` 中;
#### setState
1. 如果我们要给 `h1` 增加一个点击事件, 切换天气状态
    - ```jsx
       class Weather extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            isHot: false,
          };
          this.changeWeather = this.changeWeather.bind(this);
        }
        changeWeather() {
          this.state.isHot = !this.state.isHot;
          console.log(this.state.isHot);
        }
        render() {
          return (
            <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>
          )
        }
      }
    - ![](../../image/Snipaste_2022-04-23_10-48-14.png)
    - 😱从控制台看, `this.state.isHot` 的值改变了, 但是页面并没有发生变化, 这是因为 `React` 不允许我们直接修改 `state` 中的属性的值, 必须通过一个 `API`, `setState`
2. `setState`
    - 这个方法存在于 `React.Component` 对象上. 因此可以通过原型链调用这个方法.
    - ```jsx
      changeWeather() {
        this.setState({
          isHot: !this.state.isHot,
        })
      }
3. 关于 `setState` 的几个问题
    - 📕是合并还是覆盖? 换个表达方式就是, 如果 `state` 中还有多个属性, `setState` 时只修改一个属性, 其他的属性还在吗? 还是被覆盖了?
      - ```jsx
        constructor(props) {
          super(props);
          this.state = {
            isHot: false,
            wind: '微风',
          };
          this.changeWeather = this.changeWeather.bind(this);
        }
        render() {
          return (
            <h1 onClick={this.changeWeather}>
              今天天气很{this.state.isHot ? '炎热' : '凉爽'}, 有{this.state.wind}
            </h1>
          )
        }
      - 答案是合并, 当然不可能是覆盖了, 不然就没得玩了!
    - 在更新 `state` 时, 没更新一次就调用一次 `render` 函数,`在整个组件被初始化时, 会调用一次构造函数和 `render`
4. `setState` 的异步更新 `1`
    - 如果我们在 `changeWeather` 修改了 `isHot` 的值后立刻打印, 会发现其还是修改之前的值, 比如.
    - ```js
      state = {
        isHot: false,
      };
      changeWeather = () => {
        this.setState({
          isHot: !this.state.isHot, // true
        })
        console.log('hhhh', this.state.isHot); // false
      }
    - ![](../../image/Snipaste_2022-04-23_17-35-59.png)
    - 这样的原因是 `setState` `可能`是异步更新的, 📕注意这里是`可能`, 官网中也说是 `可能`, 代表在某些情况下是同步更新的.
    - 因为可能是异步的, 所以官网不建议我们通过 `this.state` 或 `this.prop` 来更新下一个状态. 而是建议使用 `setState` 的第二种调用方法， 即传递函数作为第一个参数。
5. `setState` 的两种调用方式
    - 首先从源码中可以看到, `setState` 接收两个参数
      - 第一个参数: 是对象或函数类型
      - 第二个参数: 可选, 函数类型. 在 `state` 更新后调用. 这个函数没有参数.
    - ![](../../image/Snipaste_2022-04-23_17-54-06.png)
    - 从上面的异步更新我们就知道了, 只传递一个对象类型的参数, 是没有办法立刻拿到更新后的 `state` 值的, 但是如果我们传递一个函数作为第二个参数, 这个函数就会在 `state` 更新后调用
    - `调用1️⃣: 第一个参数是对象类型`
      - ```jsx
        changeWeather = () => {
          this.setState({
            isHot: !this.state.isHot,
          }, () => {
            console.log('state is updated', this.state);
          });
        }
      - ![](../../image/Snipaste_2022-04-23_18-01-20.png)
    - `调用2️⃣: 第一个参数是函数类型`
      - 这个函数接收两个参数, 第一个参数是上一个 `state`, 第一个参数是上一个 `prop`.
      - 这个函数, 仍然要返回一个对象, 用于 `state` 的合并
      - 箭头函数方式
        - ```jsx
          changeWeather = () => {
            this.setState((oldState, oldProp) => {
              console.log('old', oldState.isHot);
              return {
                isHot: !oldState.isHot,
              }
            }, () => {
              console.log('new', this.state.isHot);
            });
          }
      - 一般函数
        - ```jsx
          changeWeather = () => {
            // function(){}
            this.setState(function (oldState, oldProp) {
              console.log('old', oldState.isHot);
              return {
                isHot: !oldState.isHot,
              }
            }, () => {
              console.log('new', this.state.isHot);
            });
          }
      - ![](../../image/Snipaste_2022-04-23_18-26-42.png)
6. `setState` 的异步更新 `2`: 为了避免异步更新拿到旧值, 我们可以使用一下三种方法解决
    - `方法1️⃣`: 传递 `setState` 的第二个参数(见上)
    - `方法2️⃣`: 使用函数作为 `setState` 的第一个参数
    - `方法3️⃣`: 使用 `await`
      - ```jsx
        changeWeather = async () => {
          await this.setState({
            isHot: false,
          });
          console.log('hhh', this.state.isHot);
        }
      - ![](../../image/Snipaste_2022-04-24_21-56-06.png)
7. `setState` 的合并更新
    - 先看下面的代码, 觉得执行的结果是多少?
      - ```jsx
        state = {
          count: 1,
        };
        changeCount = () => {
          this.setState({count: this.state.count + 1});
          this.setState({count: this.state.count + 1});
          this.setState({count: this.state.count + 1});
          this.setState({count: this.state.count + 1});
          console.log('count is', this.state.count);
        }
        render() {
          const { count } = this.state;
          return (
            <div>
              <h1>{ count }</h1>
              <button onClick={this.changeCount}>++</button>
            </div>
          )
        }
      - 😱输出竟然是 `1`
        - ![](../../image/Snipaste_2022-04-25_21-57-23.png)
    - 因为多次的 `setState` 被合并为同一个, 合并之后的 `setState` 执行后执行 `render` 函数, 最后显示 `2`. 如果不想 `setState` 合并, 可以使用第一个参数为函数的写法.
#### state 的简写方式
1. 首先, 因为没有组件实例对象都有 `state` 属性, 所以没必要将 `state` 初始化写在构造函数中, 直接作为 `class` 的成员变量即可
2. 为解决函数的 `this` 问题, 可以使用箭头函数声明, 因此上面的标准代码精简为
    - 📕注意, 这样定义的函数数组组件实例自身, 而不在其原型对象上. 注意这样写和 `changeWeather(){...}` 的区别, 后者
    - ![](../../image/Snipaste_2022-04-23_11-47-57.png)
3. ```jsx
    class Weather extends React.Component {
      state = {
        isHot: false,
        wind: '微风',
      };
      changeWeather = () => {
        this.setState({
          isHot: !this.state.isHot,
        })
      }
      render() {
        return (
          <h1 onClick={this.changeWeather}>
            今天天气很{this.state.isHot ? '炎热' : '凉爽'}, 有{this.state.wind}
          </h1>
        )
      }
    }
    ```
    - 目前是干掉了 `constructor`
### Props
1. 基本使用
    - 在渲染组件时, 想要从外部(比如后台请求的返回值)传值给组件, 组件使用 `props` 接收. 当然传递的数据就像原生的 `HTML` 中的属性和值一样写就行.
    - ```jsx
      class Person extends React.Component {
        render() {
          console.log('props is', this);
          const {name, age} = this.props;
          return (
            <ul>
              <li>姓名:{name}</li>
              <li>年龄:{age}</li>
            </ul>
          )
        }
      }
      ReactDOM.render(<Person name="tom" age="18" />, document.getElementById('test'));
      ```
      - ![](../../image/Snipaste_2022-04-26_20-18-48.png)
      - 📕一个有趣的地方: `age` 的值时 `string` 类型, 而不是想当然的 `number` 类型
    - 当然传递的数据不可能固定的, 接下来从一个对象中获取数据. 同样使用 `{}` 的语法取数据
    - ```jsx
      const p = {name: 'jerry', age: 19};
      ReactDOM.render(<Person name={p.name} age={p.age} />, document.getElementById('test1'));
      ```
      - 📕此时的 `age` 就是 `number` 类型了
      - ![](../../image/Snipaste_2022-04-26_20-26-29.png)
2. 批量传递 `props`
    - 如果要传递的属性有很多, 每一个都写一次就会很繁琐, 因此 React 设计了批量传递的语法糖
    - ```jsx
      const p = {name: 'tom', age: 18};
      // ReactDOM.render(<Person name="tom" age="18" />, document.getElementById('test'));
      ReactDOM.render(<Person {...p} />, document.getElementById('test'));
    - 这样获取的 `age` 同样也是 `number`
    - ![](../../image/Snipaste_2022-04-26_20-40-27.png)
    - 关于展开元素符, 标签属性中的 `{}` 表示 `...p` 是 `js` 表达式, 但是问题在于我们在一般 `js` 环境中使用展开运算符展开对象, 因为对象并没有实现 `iterator` 接口
      - ![](../../image/Snipaste_2022-04-26_20-42-30.png)
      - 但是特殊在于可以使用展开运算符浅拷贝对象
      - ![](../../image/Snipaste_2022-04-26_20-44-15.png)
      - 📕上图中的 `{}` 表示对象字面量, 不同于 `jsx` 中的 `{}`
3. `props` 是不可以修改的
    - ```jsx
      class Person extends React.Component {
        render() {
          this.props.name = this.props.name.toUpperCase();
          const {name, age} = this.props;
          return (
            <ul>
              <li>姓名:{name}</li>
              <li>年龄:{age}</li>
            </ul>
          )
        }
      }
    - ![](../../image/Snipaste_2022-04-27_13-46-11.png)
4. `props` 的规则与约束
    - 与 `Vue` 一样, `React` 中同样可以约束 `props` 值的类型, 是否为必输以及默认值
    - 这时, 需要引入新的 `js` 文件: `prop-types.js`, 引入该文件的同时全局多了一个可使用的变量, `PropTypes`
    - ```jsx
      <script src="../js/react.development.js"></script>
      <script src="../js/react-dom.development.js"></script>
      <script src="../js/babel.min.js"></script>
      <script src="../js/prop-types.js"></script>
      <script type="text/babel">
        class Person extends React.Component {
          render() {
            const {name, age} = this.props;
            return (
              <ul>
                <li>姓名:{name}</li>
                <li>年龄:{age}</li>
              </ul>
            )
          }
        }
        // --------------------------
        Person.propTypes = {
          name: PropTypes.string.isRequired,
          age: PropTypes.number,
        };
        Person.defaultProps = {
          age: 19,
        };
        // ---------------------------
        const p = {name: 'tom'};
        ReactDOM.render(<Person {...p} />, document.getElementById('test'));
    - 如果我们不按照规则传递 `name` 的类型, 就会报错
    - ![](../../image/Snipaste_2022-04-27_13-56-00.png)
5. 📕注意点
    - 代码中第一个 `propTypes` 的 `p` 是小写, 第二个 `PropTypes` 的 `p` 是大写.
    - `PropsTypes` 的其他类型
      - 特别注意布尔类型和函数类型, 分别对应 `bool` 和 `func`
      - ![](../../image/Snipaste_2022-04-27_17-31-19.png)
    - 在 `React 16` 之前, 没有单独的 `prop-types.js` 文件. `PropTypes` 是 `React` 的一个属性, 写法就是 `React.PropTypes.string.isRequired` 这种, 后来改了.
    - ![](../../image/)
    - ![](../../image/)
    - ![](../../image/)
6. `props` 简写形式
    - 上面定义 `props` 是写在 `class` 外, 这不太合适, 而且通过 `类名.` 的形式定义属性可以使用 `ES6` 的 `static` 属性替换
    - ```jsx
      class Person extends React.Component {
        static propTypes = {
          name: PropTypes.string.isRequired,
          age: PropTypes.number,
        }
        static defaultProps = {
          age: 19,
        }
        render() {
          const { name, age } = this.props;
          return (
            <ul>
              <li>姓名:{name}</li>
              <li>年龄:{age}</li>
            </ul>
          )
        }
      }
7. `class` 组件中的构造器与 `props`
    - 可以猜猜看下面构造函数中 `console.log` 的打印结果?
    - ```jsx
      class Person extends React.Component {
        constructor() {
          super();
          console.log('props in constructor', this.props);
        }
        static propTypes = {
          name: PropTypes.string.isRequired,
          age: PropTypes.number,
        }
        static defaultProps = {
          age: 19,
        }
        render() {
          const { name, age } = this.props;
          return (
            <ul>
              <li>姓名:{name}</li>
              <li>年龄:{age}</li>
            </ul>
          )
        }
      }
      const p = { name: 'tom' };
      ReactDOM.render(<Person {...p} />, document.getElementById('test'));
    - ![](../../image/Snipaste_2022-04-29_13-52-17.png)
    - 我估计你也没想到是 `undefined`, 下面是 `React` 官网的介绍, 如果想要在 `class` 组件的构造函数中通过 `this.props` 的方式访问 `props` 的话, 必须 `constructor` 接收 `props` 参数而且在 `constructor` 的其他语句之前调用 `super(props)`, 即下面的写法
    - ```jsx
      constructor(props) {
        super(props);
        console.log('props in constructor', this.props);
      }
    - ![](../../image/Snipaste_2022-04-29_14-04-02.png)
    - 其他任何写法都可能造成 `this.props` 在构造函数中未定义的 `bug`.
8. 函数式组件中使用 `props`
    - 函数式组件中没有 `this`, 因此无法使用 `state` 和 `refs`, 但是因为函数本身可以接收参数, 所以其可以接收 `props`.
    - 又因为函数没有 `static` 属性, 所以只能通过 `函数名.propTypes` 的形式定义 `props` 规则.
    - ```jsx
      function Person(props) {
        console.log('this in Person', props);
        const { name, age } = props;
        return (
          <ul>
            <li>姓名:{name}</li>
            <li>年龄:{age}</li>
          </ul>
        );
      }
      Person.propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
      };
      Person.defaultProps = {
        age: 19,
      };
      const p = { name: 'tom' };
      ReactDOM.render(<Person {...p} />, document.getElementById('test'));
    - ![](../../image/Snipaste_2022-04-29_17-40-46.png)
#### children
1. 一个组件的书写形式可以写成自闭和, 比如 `<XXX />`; 或者写成开始和结束标签, 比如 `<XXX></XXX>`. 当写成后者时, 如果在开始和结束标签直接有内容, 那么这个内容会作为 `props` 的 `children` 属性出现.
    - ```jsx
      class Person extends React.Component {
        render() {
          console.log('props', this.props);
          const { name, age } = this.props;
          return (
            <ul>
              <li>姓名:{name}</li>
              <li>年龄:{age}</li>
            </ul>
          )
        }
      }
      const p = { name: 'tom' };
      ReactDOM.render(<Person {...p} >大家好</Person>, document.getElementById('test'));
    - ![](../../image/Snipaste_2022-05-14_15-50-00.png)
    - 但是, 如果我们把代码改成下面的样子, 会发生什么呢? `<h1>` 页面是空空的吗?
    - ```jsx
      class Person extends React.Component {
        render() {
          console.log('props', this.props);
          return (
            <h1 {...this.props}></h1>
          )
        }
      }
      const p = { name: 'tom' };
      ReactDOM.render(<Person {...p} >大家好</Person>, document.getElementById('test'));
    - 😱当然不是. 也就是说, `children` 内容会被作为被传入 `props` 的标签的子节点(`h1`)的值
    - ![](../../image/Snipaste_2022-05-14_15-56-05.png)
2. 如果一定要写成自闭和形式, 还是可以直接通过 `children`. 下面的写法和上面的写法完全等价, 稍后在封装 `NavLink` 路由组件时就会用到这一点
    - ```jsx
      // const p = { name: 'tom' };
      // ReactDOM.render(<Person {...p} >大家好</Person>, document.getElementById('test'));

      const p = { name: 'tom', children: '大家好' };
      ReactDOM.render(<Person {...p} />, document.getElementById('test'));
3. 当然 `children` 除了可以是字符串, 还可以是 `HTML` 结构
    - ```jsx
      ReactDOM.render(<Person {...p} ><span><i>大家好</i></span></Person>, document.getElementById('test'));
    - ![](../../image/Snipaste_2022-05-14_16-01-34.png)
    - 此时, 打印输出的 `props` 就会发生巨大变化
    - ![](../../image/Snipaste_2022-05-14_16-04-07.png)
    - 如果你想当然以为自闭合标签可以写成这样, 那你就大错特错了
      - ```jsx
        const p = { name: 'tom', children: '<span><i>大家好</i></span>' };
        ReactDOM.render(<Person {...p} />, document.getElementById('test'));
      - ![](../../image/Snipaste_2022-05-14_16-06-37.png)
    - 那应该怎么写呢? 去掉冒号, 因为在 `JSX` 中我们本身就可以写 `JSX` 语句
      - ```jsx
        const p = { name: 'tom', children: <span><i>大家好</i></span> };
        ReactDOM.render(<Person {...p} />, document.getElementById('test'));
      - ![](../../image/Snipaste_2022-05-14_16-08-05.png)
### `Refs`
> `Refs` 提供了一种方式, 允许我们访问 `DOM` 节点或在 `render` 方法中创建的 `React` 元素
#### 字符串型 `Refs`
1. 字符串形式的 `Refs`
    - 通过在 `HTML` 标签上定义 `ref` 属性和值 `xxx`, 就可以通过 `this.refs.xxx` 拿到该 `HTML` 标签.
    - ```jsx
      class Person extends React.Component {
        showData1 = () => {
          console.log('this.refs', this.refs);
        }
        showData2 = () => {
          const { input2 } = this.refs;
          alert(input2.value)
        }
        render() {
          return (
            <div>
              <input type="text" ref="input1" name="input1" />
              <button onClick={this.showData1}>输入内容是</button>
              <input onBlur={this.showData2} type="text" ref="input2" name="input2" />
            </div>
          );
        }
      }
    - 这种类似 `Vue` 的字符串 `ref` 写法因为效率问题已经不被官网推荐使用了.
    - ![](../../image/Snipaste_2022-04-30_09-12-09.png)
#### 回调型`Refs`
1. 回调型 `refs` 可以更精细地控制何时 `refs` 被设置和解除. 可以传入一个函数, 函数接受 `React` 组件实例或 `HTML DOM` 元素作为参数
    - ```jsx
      class Person extends React.Component {
        showData1 = () => {
          console.log('this', this);
        }
        showData2 = () => {
          const { input2 } = this;
          alert(input2.value)
        }
        render() {
          return (
            <div>
              <input type="text" ref={(current) => {this.input1 = current}} name="input1" />
              <button onClick={this.showData1}>输入内容是</button>
              <input onBlur={this.showData2} type="text" ref={current => this.input2 = current} name="input2" />
            </div>
          );
        }
      }
    - `ref={(current) => {this.input1 = current}}` 实际上 `{}` 中间的是个函数.
    - ![](../../image/Snipaste_2022-04-30_13-57-42.png)
2. 回调型 `refs` 的缺陷
    - 官网中介绍, 如果使用内联函数的方式定义, 在组建更新过程中这个内联函数会被执行两次, 第一次传入参数为 `null`, 第二次的参数才是 `DOM` 元素. 
    - ![](../../image/Snipaste_2022-04-30_19-57-14.png)
    - 要想更新组件, 我们可以通过更新 `state` 来实现这个效果
      - ```jsx
        class Person extends React.Component {
          state = { isHot: true }
          showData1 = () => {
            console.log('this', this);
          }
          changeWeather = () => {
            this.setState((prevState) => {
              return {
                isHot: !prevState.isHot,
              }
            });
          }
          render() {
            return (
              <div>
                <h2>天气{this.state.isHot ? '炎热' : '凉爽'}</h2>
                <input type="text" ref={(c) => {this.input1 = c; console.log('@', c);}} name="input1" />
                <button onClick={this.showData1}>输入内容是</button>
                <button onClick={this.changeWeather}>更改天气</button>
              </div>
            );
          }
        }
      - ![](../../image/Snipaste_2022-04-30_19-56-31.png)
    - 如果想要解决这个问题, 官网建议使用 `class` 绑定的函数方式
      - ```jsx
        class Person extends React.Component {
          state = { isHot: true }
          showData1 = () => {
            console.log('this', this);
          }
          changeWeather = () => {
            this.setState((prevState) => {
              return {
                isHot: !prevState.isHot,
              }
            });
          }
          bindInput = (element) => {
            this.input1 = element;
            console.log('@', element);
          }
          render() {
            return (
              <div>
                <h2>天气{this.state.isHot ? '炎热' : '凉爽'}</h2>
                <input type="text" ref={this.bindInput} name="input1" />
                <button onClick={this.showData1}>输入内容是</button>
                <button onClick={this.changeWeather}>更改天气</button>
              </div>
            );
          }
        }
      - 点击切换按钮时, 控制台不会再输出内容.
#### `createRef()`
1. `createRef()` 是 `React` 目前推荐的创建 `ref` 的方式
    - 使用 `React.createRef()` 创建 `refs`, 并通过 `ref` 属性附加到 `React` 元素. 
    - 当 `ref` 被传递给 `render` 中的元素时, 对该节点的引用可以在 r`ef 的 `current` 属性中被访问
    - 如果要创建多个 `ref` 引用, 就必须多次调用 `React.createRef()`, 每个 `React.createRef()` 只能创建一个 `ref` 引用.
    - ```jsx
      class Person extends React.Component {
        input1Ref = React.createRef();
        input2Ref = React.createRef();
        showData1 = () => {
          console.log('this', this);
        }
        showData2 = () => {}
        render() {
          return (
            <div>
              <input type="text" ref={this.input1Ref} name="input1" />
              <button onClick={this.showData1}>输入内容是</button>
              <input onBlur={this.showData2} type="text" ref={this.input2Ref} name="input2" />
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-04-30_22-18-05.png)
2. 
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
    - 第三, 就是 `js` 中函数的 `this` 究竟是谁的问题? 谁调用的函数, `this` 就是谁!
2. `React` 元素的事件处理和 `DOM` 元素的事件很像, 但是有些语法上的不同
    - `React` 的事件命名采用小驼峰形式(`camelCase`), 而不是纯小写
    - 采用 `JSX` 语法时需要传入`一个函数`作为事件处理函数, 而不是一个字符串.
    - `React` 使用自定义(合成)事件, 而不是使用原生 `DOM` 事件
    - `React` 中的事件是通过事件委托的方式处理的, 委托给最外层的元素
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
2. 既然我们要在 `h1Handler` 中拿到 `this`, 那么把函数写在 `class` 里不久好了吗?
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
              <h1 onClick={this.h1Handler}>今天天气很凉爽</h1>
            )
          }
        }
      - 😱问题再次出现😱, `h1Handler` 中的 `this` 为啥还是 `undefined` 呢?
      - ![](../../image/Snipaste_2022-04-23_09-05-14.png)
3. 接着上面的问题回答, `h1Handler` 中的 `this` 为啥还是 `undefined` 呢?
    - 因为 `h1Handler` 是作为 `onClick` 的回调, 而不是通过 `组件实例.` 的方式调用, 是直接调用的, 再加上类中方法默认开启局部严格模式, 所以 `this` 就变成了 `undefined`.
    - 来看一下代码. 如果 `onClick` 的值的类型是函数, 就赋值给 `DOM` 元素的 `onclick` 属性
      - ![](../../image/Snipaste_2022-04-23_09-52-25.png)
#### 改变 `this` 之使用 `bind`
1. 只用加一行代码即可. 即在构造函数中赋值
    - `this.h1Handler.bind(this);` 做了两件事情, 第一返回新的函数, 第二新的函数中的 `this` 绑定为 `bind` 的参数
    - ```jsx
      class Weather extends React.Component {
        constructor() {
          this.h1Handler = this.h1Handler.bind(this);
        }
        h1Handler() {
          console.log('我被点击了', this);
        }
        render() {
          return (
            <h1 onClick={this.h1Handler}>今天天气很凉爽</h1>
          )
        }
      }
    - 📕注意: `this.h1Handler = this.h1Handler.bind(this);` 这句代码, 等号右边的 `h1Handler` 是`实例对象的原型对象上的属性`, 但是赋值语句把 `bind` 返回的函数赋值给了`实例对象`
      - ![](../../image/Snipaste_2022-04-23_10-14-47.png)
#### 改变 `this` 之使用 `箭头函数`
1. 记得当时在 `onClick={}` 花括号中的 `this` 也是 `组件实例对象` 吗? 如果真的是这样, 我们就可以使用箭头函数没有 `this` 而是使用其最近外层函数 `this` 的特性
    - `onClick={ () => this.h1Handler() }` 箭头函数体中执行 `this.h1Handler()`, 箭头函数返回 `undefined`
    - ```jsx
      class Weather extends React.Component {
        h1Handler() {
          console.log('我被点击了', this);
        }
        render() {
          return (
            <h1 onClick={ () => this.h1Handler() }>今天天气很凉爽</h1>
          )
        }
      }
#### 向事件处理函数传递参数
1. 在调用函数时, 如果我们什么都不传, `React` 的处理函数默认接收一个事件类型参数, 这个事件就是合成事件.
    - ```jsx
      class Person extends React.Component {
        showData2 = (event) => {
          console.log('e.target.value is', event.target.value);
          console.log('e.target is', event.target);
          console.log('e is', event);
        }
        render() {
          return (
            <div>
              <input onBlur={this.showData2} type="text" name="input2" />
            </div>
          );
        }
      }
    - 📕注意直接通过 `e.target.value` 是可以获得输入框的值, 但是直接打印 `e` 却发现其 `target` 属性为 `null`
    - ![](../../image/Snipaste_2022-05-01_08-35-07.png)
    - 😱但是使用这种方式, 是没办法传递自定义参数和合成事件参数的
      - ```jsx
        class Person1 extends React.Component {
          showData2 = (arg1, arg2, event) => {
            console.log('arg1 is', arg1);
            console.log('arg2 is', arg2);
            console.log('e.target.value is', event.target.value);
          }
          render() {
            return (
              <div>
                <input onBlur={this.showData2('a', 'b')} type="text" />
              </div>
            );
          }
        }
      - ![](../../image/Snipaste_2022-05-01_08-53-48.png)
      - 📕注意这种方式的错位, 因为 `onBlur={this.showData2('a', 'b')}` 是将 `this.showData2` 的返回值交给了 `onBlur`, 而不是把 `showData2` 这个函数交给了 `onBlur`
      - 😱整个页面甚至都没有渲染出来
2. 同时传递自定义参数与合成事件参数
    - 实际上官网只介绍了两种方式, 第一种使用箭头函数绑定处理事件
      - 这种情况下, 事件对象会被作为最后一个参数传递, 而且必须显示传递
      - ```jsx
        class Person extends React.Component {
          showData2(arg1, arg2, event) {
            console.log('arg1 is', arg1);
            console.log('arg2 is', arg2);
            console.log('e.target.value is', event.target.value);
          }
          render() {
            return (
              <div>
                <input onBlur={(e) => this.showData2(1, 2, e)} type="text" name="input2" />
              </div>
            );
          }
        }
      - ![](../../image/Snipaste_2022-05-01_09-00-11.png)
    - 第二种是通过 `bind` 的方式, 事件对象隐式传递
      - ```jsx
        class Person1 extends React.Component {
          showData2 = (arg1, arg2, event) => {
            console.log('arg1 is', arg1);
            console.log('arg2 is', arg2);
            console.log('e.target.value is', event.target.value);
          }
          render() {
            return (
              <div>
                <input onBlur={this.showData2.bind(this, 3, 4)} type="text" />
              </div>
            );
          }
        }
      - ![](../../image/Snipaste_2022-05-01_09-05-28.png
3. 使用柯里化解决 `1` 中的问题
    - ```jsx
      class Person2 extends React.Component {
        showData2 = (arg1, arg2) => {
          return (event) => {
            console.log('arg1 is', arg1);
            console.log('arg2 is', arg2);
            console.log('e.target.value is', event.target.value);
          }
        }
        render() {
          return (
            <div>
              <input onBlur={this.showData2('a', 'b')} type="text" />
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-02_15-36-59.png)
    - 再次要说明的是, 在首次创建组件时, `React` 就帮我们调用了 `onBlur={...}` 中间的内容, 并将其注册为 `onBlur` 的回调函数, 因此真正的回调函数是 `()=>{}`, 在真正的回调函数中才会接收到 `event` 参数
### 表单处理
#### 受控组件
1. 在 `React` 中, `HTML` 表单元素的工作方式与其他 `DOM` 元素有些不同, 这时因为表单元素通常会保持一些内部的 `state` 并根据用户输入进行更新. 在 `React` 中, 通常保存在 `state` 中并只能通过 `setState` 更新.
2. 因此, 可以结合两者, 首先表达元素的值来自 `state`, 在表单元素更新时, 同步使用 `setState` 更新 `state` 的内容, 被 `React` 以这种方式控制取值的表达输入元素就叫做 **`受控组件`**
3. 下面展示一个用户在提交时打印输入内容的受控表单
    - ```jsx
      class Person extends React.Component {
        // 初始化输入DOM元素的绑定值
        state = {
          username: '',
        }
        // 在输入发生改变时,将新的值更新到state
        usernameChanged = (e) => {
          console.log('new Value is ', e.target.value);
          this.setState({
            username: e.target.value,
          });
        }
        // 提交时输出值
        submitForm = () => {
          alert(`用户输入了 ${this.state.username}`)
        }
        render() {
          return (
            <div>
              <form>
                <input 
                  value={this.state.username}
                  onChange={this.usernameChanged}
                  type="text" name="input2" 
                />
                <button onClick={this.submitForm} >submit</button>
              </form>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-01_10-41-07.png)
3. 受控表单一个问题就是要为所有输入维护更新 `state`, 如果按照上面的写法有多少个输入就得有多少个对应的函数, 使用柯里化和计算属性帮助我们解决这个问题.
    - ```jsx
      class Person3 extends React.Component {
        saveForm = (property) => {
          return (event) => {
            let value = event.target.value;
            console.log(property, value);
            this.setState({
              [property]: value,
            });
          }
        }
        render() {
          return (
            <div>
              <input onBlur={this.saveForm('username')} type="text" name="username" />
              <input onBlur={this.saveForm('password')} type="password" name="password"/>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-02_15-48-41.png)
#### 非受控组件
1. 有时使用受控组件很麻烦, 因为需要为数据变化的每种方式都编写事件处理函数并通过一个 `React` 组件传递所有输入的 `state`. 可以使用`非受控组件`, 这时实现表达输入的另一种形式
2. 不同于受控组件, 在非受控组件中, 不需要将保存 `DOM` 表单元素至 `state`, 不需要在用户输入的数据改变时更新输入至 `state`, 而是使用 `ref` 来从 `DOM` 节点中获取表单数据
    - ```jsx
      class Person extends React.Component {
        usernameRef = React.createRef();
        submitForm = (event) => {
          event.preventDefault();
          console.log('i got value of ', this.usernameRef.current.value);
        }
        render() {
          return (
            <div>
              <form>
                <input ref={this.usernameRef} type="text" name="input2" />
                <button onClick={this.submitForm} >submit</button>
              </form>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-01_16-46-35.png)
3. 默认值
    - 在非受控组件中, 如果希望 `React` 能赋予组件一个初始值但是不控制后续的更新, 可以指定 `defaultValue` 属性
    - ```jsx
      class Person extends React.Component {
        render() {
          return (
            <div>
              <form>
                <input type="text" defaultValue="Hello," />
                <textarea name="input2" defaultValue="World!" ></textarea>
                <div>
                  <input type="checkbox" name="color" id="color" />Red
                  <input type="checkbox" name="color" id="color1" defaultChecked />Blue
                  <input type="checkbox" name="color" id="color2" defaultChecked />Black
                </div>
                <div>
                  <input type="radio" name="hobby" id="music" />music
                  <input type="radio" name="hobby" id="movie" />movie
                  <input type="radio" name="hobby" id="running" defaultChecked />running
                </div>
                <select name="fruit" id="fruit" defaultValue="apple" >
                  <option value="banana">banana</option>
                  <option value="apple">apple</option>
                  <option value="orange">orange</option>
                </select>
              </form>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-02_09-09-46.png)
#### `textarea`
1. 在 `HTML` 中使用 `<textarea>` 和 `<input>` 不同, 因为 `<input>` 的值由 value 属性控制, 而 `<textarea>` 其子元素定义其文本
    - ```html
      <input type="text" value="Hello, World" />
      <textarea name="info" id="info" cols="30" rows="10">Hello, World</textarea>
    - ![](../../image/Snipaste_2022-05-01_17-19-37.png)
2. 在 `React` 中, `<textarea>` 使用 `value` 属性替代, 这样可以使用 `<textarea>` 的表单和使用单行 `input` 的表单非常类似
    - ```jsx
      class Person extends React.Component {
        state = { info: 'World' }
        submitForm = (event) => {
          event.preventDefault();
          console.log('textarea value of ', this.state.info);
        }
        render() {
          return (
            <div>
              <form>
                <textarea name="input2" value={this.state.info}></textarea>
                <button onClick={this.submitForm} >submit</button>
              </form>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-01_17-30-13.png)
    - 这样会报错, 因为我们没有提供 `onChange` 处理函数, 导致这个多行文本框变成 `readonly`. 要解决这个问题很简单, 要么提供 `onChange`, 要么真的让多行文本框变为 `readonly`
    - ```jsx
      class Person extends React.Component {
        state = { info: 'World' }
        infoChanged = (e) => {
          this.setState({ 
            info: e.target.value 
          });
        }
        render() {
          return (
            <div>
              <form>
                <textarea name="input2" onChange={this.infoChanged} value={this.state.info}></textarea>
              </form>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-01_17-38-32.png)
3. 正如上面所说, 如果指定了 `value` 但是输入仍然可编辑的还, 表示可能意外地将 `value` 设置为了 `undefined` 或者 `null`
    - 下面代码演示了这一点, 输入最初被锁定, 但在短时间延迟后变为可编辑
    - ```jsx
      function valueChanged() {}
      ReactDOM.render(<input value="hi" onChange={valueChanged} />, document.getElementById('test'));

      setTimeout(() => {
        ReactDOM.render(<input value={null} onChange={valueChanged} />, document.getElementById('test'));
      }, 5000);
    - 📕但是会报错
    - ![](../../image/Snipaste_2022-05-02_08-53-07.png)
#### `select`
1. `<select>` 创建下拉列表, 在原生 `HTML` 中可以使用 `selected` 属性使得某项默认被选中, 但是 `React` 并不会使用 `selected` 属性, 而是在 `<select>` 本标签上使用 `value` 属性. 
    - 📕但是也不要忘了使用 `onChange` 合成事件修改 state 的值哦!
    - ```jsx
      class Person extends React.Component {
        state = { choice: 'apple' }
        fruitChanged = (e) => {
          this.setState({ choice: e.target.value });
          console.log('now i choose, ', e.target.value);
        }
        render() {
          return (
            <div>
              <form>
                <select name="fruits" id="fruits" value={this.state.choice} onChange={this.fruitChanged}>
                  <option value="banana">banana</option>
                  <option value="apple">apple</option>
                  <option value="pear">pear</option>
                </select>
              </form>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-01_17-56-43.png)
2. 面对多选的情况, 可以传入一个数组
    - ```jsx
      class Person1 extends React.Component {
        state = { choice: ['apple'] }
        fruitChanged = (e) => {
          const select = e.target.value;
          console.log('click', select);
          // 不存在
          if (this.state.choice.indexOf(select) === -1 && select) {
            this.setState((prevState) => {
              prevState.choice.push(select)
              return {
                choice: prevState.choice,
              };
            });
          } else {
            let indexOfSelected = this.state.choice.findIndex((fruit) => fruit === select);
            console.log('indexOfSelected', indexOfSelected);
            this.setState((prevState) => {
              if (prevState.choice.length === 1) {
                console.log('i am here');
                prevState.choice = [];
              } else {
                prevState.choice.splice(indexOfSelected, 1);
              }
              return {
                choice: prevState.choice,
              };
            });
          }
        }
        render() {
          return (
            <div>
              <form>
                <select name="fruits" id="fruits" multiple={true} value={this.state.choice} onChange={this.fruitChanged}>
                  <option value="banana">banana</option>
                  <option value="apple">apple</option>
                  <option value="pear">pear</option>
                  <option value="peach">peach</option>
                </select>
              </form>
            </div>
          );
        }
      }
    - 📕注意第一个地方, 多选和单选都可以只点击鼠标, 但如果只剩下最后一个选项要取消的话, 要在摁下 `Ctrl` 的时候点鼠标
    - 📕要注意不同数组方法返回值是什么, 比如 `splice` 返回的是被删除的数组元素
    - 📕最后也是最重要的, 如果代码写成下面的样子就会报错, 因为 `e.target.value` 是没办法在 `setState` 这个异步操作中获得的, 不然就会报错
      - ```js
        fruitChanged = (e) => {
          if (this.state.choice.indexOf(e.target.value) === -1 && e.target.value) {
            this.setState((prevState) => {
              prevState.choice.push(e.target.value)
              return {
                choice: prevState.choice,
              };
            });
          } else {
            let indexOfSelected = this.state.choice.findIndex((fruit) => fruit === e.target.value);
            console.log('indexOfSelected', indexOfSelected);
            this.setState((prevState) => {
              if (prevState.choice.length === 1) {
                console.log('i am here');
                prevState.choice = [];
              } else {
                prevState.choice.splice(indexOfSelected, 1);
              }
              return {
                choice: prevState.choice,
              };
            });
          }
        }
      - ![](../../image/Snipaste_2022-05-02_08-38-12.png)  
#### `<input type="file">`
1. `<input type="file">` 的 `value` 是只读的, 因此它是 `React` 中的一个非受控组件
2. 下面的例子中展示了如何在点击按钮时获得输入的文件名
    - ```jsx
      class Person extends React.Component {
        fileRef = React.createRef();
        submitForm = (event) => {
          event.preventDefault();
          console.log('i got file of ', this.fileRef.current.files[0].name);
        }
        render() {
          return (
            <div>
              <form>
                <input ref={this.fileRef} type="file" name="input2" />
                <button onClick={this.submitForm} >submit</button>
              </form>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-02_09-47-44.png)
### 生命周期
1. 案例: 页面出现的文字由不透明变透明, 然后循环往复
    - ```jsx
      class Person extends React.Component {
        state = { opacity: 1 }
        destroy = () => {
          ReactDOM.unmountComponentAtNode(document.getElementById('test'));
        }
        componentDidMount() {
          this.timer = setInterval(() => {
            let { opacity } = this.state;
            opacity -= 0.1;
            opacity = opacity <= 0 ? 1 : opacity;
            this.setState({ opacity });
          }, 200);
        }
        componentWillUnmount() {
          clearInterval(this.timer);
        }
        render() {
          return (
            <div>
              <h2 style={{opacity: this.state.opacity}}>Hello, World</h2>
              <button onClick={this.destroy}>销毁实例</button>
            </div>
          );
        }
      }
    - 在组件挂载到页面时开启定时器, 在组件卸载时取消定时器
#### 旧的生命周期钩子
1. ![](../../image/react_lifecycle_old.png)
    - 初始化阶段
      - `constructor`
      - `componentWillMount`
      - `render`
      - `componentDidMount`
    - 更新阶段
      - `componentWillReceiveProps`
      - `shouldComponentUpdate`
      - `componentWillUpdate`
      - `render`
      - `componentDidUpdate`
    - 卸载阶段
      - `componentWillUnmount`
2. 一个组件简单的生命周期(先验证上图`挂载时`的流程)
    - 各个生命周期钩子(下面列出的顺序就是执行的顺序)
      - `constructor`: 构造函数
      - `componentWillMount`: 组件将要挂载到页面
      - `render`: 组件渲染
      - `componentDidMount`: 组件已经挂载到页面
      - `componentWillUnmount`: 组件将要卸载
    - ```jsx
      class Person extends React.Component {
        constructor() {
          super()
          console.log('Person---constructor1');
        }
        componentWillMount() {
          console.log('Person---componentWillMount2');
        }
        componentDidMount() {
          console.log('Person---componentDidMount3');
        }
        componentWillUnmount() {
          console.log('Person---componentWillUnmount5');
        }
        destroy = () => {
          ReactDOM.unmountComponentAtNode(document.getElementById('test'));
        }
        render() {
          console.log('Person---render4');
          return (
            <div>
              <button onClick={this.destroy}>销毁实例</button>
            </div>
          );
        }
      }
    - 点击销毁按钮后, 组件销毁, 输出最后一句
    - ![](../../image/Snipaste_2022-05-02_22-01-21.png)
2. 验证`setState`流程
    - 接下来看上图右侧的流程中的一个流程, `setState`
    - 各个生命周期钩子
      - `shouldComponentUpdate`: 是否应该更新组件. 需要一个返回值, 默认返回 `true`, 如果返回 `false`, 这个钩子之后的钩子将不会执行, 数据不会刷新
      - `componentWillUpdate`: 组件将要更新
      - `componentDidUpdate`: 组件已经更新
    - ```jsx
      class Person extends React.Component {
        state = { sum: 0 }
        shouldComponentUpdate() {
          console.log('Person---shouldComponentUpdate1');
          return true;
        }
        componentWillUpdate() {
          console.log('Person---componentWillUpdate2');
        }
        componentDidUpdate() {
          console.log('Person---componentDidUpdate4');
        }
        componentWillUnmount() {
          console.log('Person---componentWillUnmount5');
        }
        destroy = () => {
          ReactDOM.unmountComponentAtNode(document.getElementById('test'));
        }
        add = () => {
          this.setState((prevState) => {
            return {
              sum: prevState.sum + 1
            };
          });
        }
        render() {
          console.log('Person---render3');
          const { sum } = this.state
          return (
            <div>
              <h2>当前求和为: {sum}</h2>
              <button onClick={this.add}>点我+1</button>
              <button onClick={this.destroy}>销毁实例</button>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-03_08-26-24.png)
    - 📕 `componentDidUpdate` 钩子会接收到两个参数, 第一个是更新之前的 `props`, 第二个是更新之前的 `state`
      - ```jsx
        componentDidUpdate(prevProps, prevState) {
          console.log('Person---componentDidUpdate4', prevProps, prevState);
        }
      - ![](../../image/Snipaste_2022-05-04_15-53-33.png)
3. 验证 `forceUpdate` 流程
    - ```jsx
      class Person extends React.Component {
        state = { sum: 0 }
        componentWillUpdate() {
          console.log('Person---componentWillUpdate2');
        }
        componentDidUpdate() {
          console.log('Person---componentDidUpdate4');
        }
        componentWillUnmount() {
          console.log('Person---componentWillUnmount5');
        }
        update = () => {
          this.forceUpdate();
        }
        destroy = () => {
          ReactDOM.unmountComponentAtNode(document.getElementById('test'));
        }
        render() {
          console.log('Person---render3');
          const { sum } = this.state
          return (
            <div>
              <h2>当前求和为: {sum}</h2>
              <button onClick={this.update}>强制更新</button>
              <button onClick={this.destroy}>销毁实例</button>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-03_08-53-55.png)
4. 验证父组件更新
    - 各个生命周期钩子
      - `componentWillReceiveProps`: 这个钩子在第一次传递 `props` 是不会调用, 在第二次和之后传递才会调用, 并且接收传递的 `props` 为参数. 即便第二次和之后传递的值都没有发生改变.
    - ```jsx
      class Son extends React.Component {
        componentWillReceiveProps(props) {
          console.log('Son---componentWillReceiveProps1', props);
        }
        shouldComponentUpdate() {
          console.log('Son---shouldComponentUpdate2');
          return true;
        }
        componentWillUpdate() {
          console.log('Son---componentWillUpdate3');
        }
        componentDidUpdate() {
          console.log('Son---componentDidUpdate5');
        }
        render() {
          console.log('Son---render4');
          const { car } = this.props
          return (
            <div>
              <h2>我是B组件: {car}</h2>
            </div>
          );
        }
      }

      class Father extends React.Component {
        state = { car: 'BMW' }
        changeCar = () => {
          console.log('flow started');
          this.setState({ car: 'Benz' })
        }
        render() {
          return (
            <div>
              <h2>我是A组件</h2>
              <Son car={this.state.car}></Son>
              <button onClick={this.changeCar}>换车</button>
            </div>
          );
        }
      }
    - ![](../../image/Snipaste_2022-05-03_09-34-17.png)
#### 新的生命周期钩子
> 下面代码使用 `React@17.0.1` 版本
1. ![](../../image/react_lifecycle_new.png)
    - 总结就是, 新版本废弃了三个钩子, 新增加了两个
    - 下面就不会验证整个流程了
2. 首先, 如果还是使用旧版本的钩子, 会报下面的错误, 总体来说就是三个钩子要重命名: `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate`
    - ![](../../image/Snipaste_2022-05-03_20-52-06.png)
    - ```jsx
      class Son extends React.Component {
        UNSAFE_componentWillReceiveProps(props) {
          console.log('Son---componentWillReceiveProps1', props);
        }
        UNSAFE_componentWillUpdate() {
          console.log('Son---componentWillUpdate3');
        }
        UNSAFE_componentWillMount() {
          console.log('Son---componentWillMount');
        }

        render() {
          console.log('Son---render4');
          const { car } = this.props
          return (
            <div>
              <h2>我是B组件: {car}</h2>
            </div>
          );
        }
      }
3. `getDerivedStateFromProps`
    - 这是新增加的钩子, 会在调用 `render` 方法之前调用, 并且在初始挂载及后续更新时都会被调用. 它应返回一个对象来更新 `state`, 如果返回 `null` 则不更新任何内容
    - 此方法适用于罕见的用例, 即 `state` 的值在任何时候都取决于 `props`
    - 📕注意点:
      - 此方法要使用 `static` 属性声明
      - 方法要返回 `null` 或对象
      - 方法接收 `props` 和 `state` 作为参数
    - ```jsx
      class Father extends React.Component {
        state = { name: 'Tom' }
        static getDerivedStateFromProps(props, state) {
          console.log('i am here', props, state);
          return null;
        }
        changeName = () => {
          this.setState({ name: 'Jerry' });
        }
        render() {
          return (
            <div>
              <h2>我是A组件</h2>
              <button onClick={this.changeName}>改名字</button>
            </div>
          );
        }
      }
      ReactDOM.render(<Father age={43} />, document.getElementById('test'));
    - 📕注意上面代码返回了 `null`, 表明在 `getDerivedStateFromProps` 函数中没有更新 `state`
    - ![](../../image/Snipaste_2022-05-04_10-42-57.png)
    - 但是, 如果我们返回了一个对象, 这个对象就会更新 `state`, 不论我们怎么修改, 页面始终显示的是 `Haha`
    - ![](../../image/Snipaste_2022-05-04_10-51-50.png)
    - 📕官网提示: 此方法适用于罕见的用例, 即 `state` 的值在任何时候都取决于 `props`, 派生状态会导致代码冗余，并使组件难以维护
4. `getSnapshotBeforeUpdate`
    - 在最近一次渲染输出(提交到 `DOM` 节点)之前调用. 它使得组件能在发生更改之前从 `DOM` 中捕获一些信息(例如, 滚动位置). 此生命周期方法的任何返回值将作为参数传递给 `componentDidUpdate`
    - 此用法并不常见, 但它可能出现在 `UI` 处理中, 如需要以特殊方式处理滚动位置的聊天线程等
    - 应返回 `snapshot` 的值(或 `null`)
    - ```jsx
      class Son extends React.Component {
        state = { newsArr: [] }
        newListRef = React.createRef();

        getSnapshotBeforeUpdate() {
          // 返回之间的容器高度
          return this.newListRef.current.scrollHeight;
        }

        componentDidUpdate(prevProps, prevState, oldHeight) {
          // 当前容器高度-之前容器高度,就是要新增加的滚动高度
          this.newListRef.current.scrollTop += (this.newListRef.current.scrollHeight - oldHeight);
        }

        componentDidMount() {
          // 每两秒钟增加一个新的新闻
          setInterval(() => {
            let newNews = `News@${this.state.newsArr.length + 1}`;
            this.setState((prevState) => {
              return {
                newsArr: [newNews, ...prevState.newsArr]
              }
            });
          }, 1000);
        }
        render() {
          return (
            <div className="news-list" ref={this.newListRef}>
              {
                this.state.newsArr.map((news, index) => {
                  return <div className="news-item" key={index}>{news}</div>
                })
              }
            </div>
          );
        }
      }
      ReactDOM.render(<Son />, document.getElementById('test'));
## 脚手架
1. 安装教授架
    - ```shell
      npm i -g create-react-app
    - 创建 react 项目. 📕必须 Node 14 版本及以上
    - ```shell
      create-react-app xxx(项目名)
    - 启动项目
    - ```shell
      npm start
### 文件项目介绍
1. `public.html`
    - ` <meta name="theme-color" content="#000000" />`
      - 仅支持安卓手机浏览器, 用于修改导航栏和地址栏的颜色
      - 兼容性不好
    - `<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />`
      - 手机浏览器可以将某个网站添加到主屏幕, 上面的配置就是添加到主屏幕后使用什么图片. 根据其 `rel`, 上面的写法是 `iOS` 系统的.
    - `<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />`
      - 这是用于应用加壳. 有些安卓或 `iOS` 应用是原生 `HTML` 等技术开发, 不过外面包了一层壳, 开发之后的应用的配置信息, 比如应用名称, 应用图标都保存在 `manifest.json` 中
2. `robots.txt`
    - 爬虫规则文件
### 严格模式
> 仅在开发模式下运行; 它们不会影响生产构建
1. 在 `index.js` 中有下面的代码
    - ```jsx
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
    - 官网解释, `StrictMode` 是一个用来突出显示应用程序中潜在问题的工具, 不会渲染任何可见的 `UI`, 它为其后代元素触发额外的检查和警告
    - 你可以为应用程序的任何部分启用严格模式
    - ```jsx
      function ExampleApplication() {
        return (
          <div>
            <Header />
            <React.StrictMode>
              <div>
                <ComponentOne />
                <ComponentTwo />
              </div>
            </React.StrictMode>
            <Footer />
          </div>
        );
      }
    - 在上述的示例中 不会对 `Header` 和 `Footer` 组件运行严格模式检查. 但是, `ComponentOne` 和 `ComponentTwo` 以及它们的所有后代元素都将进行检查
2. `StrictMode` 目前有助于
    - 识别不安全的生命周期
    - 关于使用过时字符串 `ref` `API` 的警告. 即字符串形式的 `ref`
    - 关于使用废弃的 `findDOMNode` 方法的警告
    - 检测意外的副作用
      - 从概念上讲, `React` 分两个阶段工作
        - `渲染阶段`: 会确定需要进行哪些更改, 比如 `DOM`. 在此阶段, `React` 调用 `render`, 然后将结果与上次渲染的结果进行比较
        - `提交阶段`: 发生在当 `React` 应用变化时. (对于 `React` `DOM` 来说, 会发生在 `React` 插入, 更新及删除 `DOM` 节点的时候.) 在此阶段, `React` 还会调用 `componentDidMount` 和 `componentDidUpdate` 之类的生命周期方法
      - 提交阶段通常会很快, 但渲染过程可能很慢. 渲染阶段的生命周期钩子可能被多次调用, 因此官网不建议在这些钩子中编写副作用相关的代码.
      - 严格模式不能自动检测到你的副作用, 但它可以帮助你发现它们, 使它们更具确定性. 通过故意重复调用以下函数来实现的该操作
        - `class` 组件的 `constructor`, `render` 以及 `shouldComponentUpdate` 方法
        - `class` 组件的生命周期方法 `getDerivedStateFromProps`
        - 函数组件体
        - 状态更新函数 (即 `setState` 的第一个参数）
        - 函数组件通过使用 `useState`, `useMemo` 或者 `useReducer`
        - 📕这仅适用于开发模式. 生产模式下生命周期不会被调用两次
    - 检测过时的 `context` `API`
    - 检测不安全的副作用
    - ![](../../image/)
    - ![](../../image/)
### 样式模块化
1. 现在我们有两个组件, `Hello` 和 `Welcome`, 以及两个组件对应的 `css` 文件且这两个 `css` 文件中内容相同从而演示问题
    - `Hello`
      - ```css
        .title {
          background-color: hotpink;
        }
      - ```jsx
        import React, { Component } from 'react'
        import './hello.css'
        export default class Hello extends Component {
          render() {
            return (
              <div className='title'>Hello</div>
            )
          }
        }
    - `Welcome`
      - ```css
        .title {
          background-color: hotpink;
        }
      - ```jsx
        import React, { Component } from 'react';
        import './welcome.css'
        export default class Welcome extends Component {
          render() {
            return (
              <div className="title">Welcome</div>
            )
          }
        }
    - 在 `App` 组件中先引入 `Hello`, 再引入 `Welcome`. 最后的结果是, 样式以 `Welcome` 对应的 `css` 为主.
    - ![](../../image/Snipaste_2022-05-08_08-20-15.png)
2. 问题在于 `css` 文件如何模块化引入?
    - 在文件名和文件后缀之间加上 `module`, 例如, `index.css` 改为 `index.module.css`
    - 引入 `css` 时
      - ```jsx
        // old
        import './hello.css'
        // new
        import hello from './hello.module.css'
    - 使用类名时
      - ```jsx
        // old
        <div className="title">Welcome</div>
        // new
        <div className={welcome.title}>Welcome</div>
    - ![](../../image/Snipaste_2022-05-08_09-00-53.png)
    - 可以看到真实的  class 都发生了改变
    - 下面我们打印一下引入的 hello, 看看他们究竟是什么?
    - ![](../../image/Snipaste_2022-05-08_09-31-25.png)
3. 更多的问题, 如果有两个或多个类应该怎么写? 如果类名中有 `-` 应该怎么写?
    - 首先给出正确答案, 因为我试了好多次
    - ```css
      .title {
        background-color: hotpink;
      }
      .title-name {
        color: red;
      }
    - ```jsx
       <div className={`${hello.title} ${hello['title-name']}`}>Hello</div>
    - 📕简单的想法就是真实的 `class` 是字符串, 用逗号分隔, 所以我们写的时候也需要遵循这样的模式
    - ![](../../image/Snipaste_2022-05-08_09-37-07.png)
    - 下面的写法都是错误的
    - ```jsx
      // 使用小驼峰
      <div className={`${hello.title} ${hello.titleName}`}>Hello</div>
      // 使用数组
      <div className={[hello.title, hello['title-name']]}>Hello</div>
### 子组件给父组件传值
1. 现在有一个需求, 需要子组件的输入框输入信息后, 保存在父组件中, 父组件可以渲染一个列表
    - ![](../../image/Snipaste_2022-05-09_21-51-28.png)
2. 思路就是: 将父组件的一个函数作为 `props` 传递给子组件, 并且该函数接收参数作为回调.
    - 父组件
    - ```jsx
      export default class Father extends Component {
        state = {
          fruits: ['apple', 'banana'],
        }
        receiveFruit = (newFruit) => {
          console.log('new fruit is ', newFruit);
          const newFruits = [newFruit, ...this.state.fruits];
          this.setState({
            fruits: newFruits
          });
        }
        render() {
          return (
            <div>
              <Son receiveFruit={this.receiveFruit}></Son>
              <ul>
                {
                  this.state.fruits.map((item, index) => {
                    return <li key={index}>{item}</li>
                  })
                }
              </ul>
            </div>
          )
        }
      }
    - 子组件
    - ```jsx
      export default class Son extends Component {
        inputChanged = (event) => {
          if (event.key !== 'Enter') return;
          this.props.receiveFruit(event.target.value);
        }
        render() {
          return (
            <div>
              <input type="text" onKeyUp={this.inputChanged} />
            </div>
          )
        }
      }
    - ![](../../image/Snipaste_2022-05-09_22-05-44.png)
### 使用 confirm/alert 等函数前需要加上 window
### 使用代理服务器
1. 如下代码, 点击按钮登录
    - ```jsx
      export default class Proxy extends Component {
        login = () => {
          axios.post(
            'http://localhost:3000/login',
            {
              username: 'tom',
              password: '123456'
            }
          )
          .then(
            response => console.log('请求成功', response.data),
            error => console.log('登录失败', error),
          );
        }
        render() {
          return (
            <div>
              <button onClick={this.login}>登录</button>
            </div>
          )
        }
      }
    - 📕注意如果我们的 `url`, 即便代理 `5000` 端口服务器, 但是 `url` 中请求的仍是 `3000(React 自身端口)`
    - 下面是服务端代码
    - ```jsx
      const express = require('express');
      let app = express();

      app.use(express.urlencoded({
        extended: false
      }));
      app.use(express.json());

      app.post('/login', (req, res) => {
        let { username, password } = req.body;
        console.log('username: ', username);
        console.log('password: ', password);
        res.json(req.body);
      });

      app.listen('5000', () => {
        console.log('server started...');
      });
#### 方式一: 写在 `package.json`
1. 在 `package.json` 中增加如下配置
    - ```json
      {
        ...,
        "proxy": "http://localhost:3000",
      }
    - 上面代码的意思就是将所有请求转发至 `http://localhost:3000`
    - 修改完之后重启项目
    - ![](../../image/Snipaste_2022-05-11_21-41-22.png)
#### 方式二: 写在 `setupProxy.js` 中
1. 这个文件在 `src` 下, 文件的内容是
    - ```js
      // http-proxy-middleware 低版本
      // const proxy = require('http-proxy-middleware');
      // http-proxy-middleware高版本
      const {createProxyMiddleware: proxy} = require('http-proxy-middleware');

      module.exports = function(app) {
        console.log('app is', app);
        console.log('proxy is', proxy);
        app.use(
          proxy('/api1', {
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: {
              '^/api1': '',
            },
          }),
          proxy('/api2', {
            target: 'http://localhost:4000',
            changeOrigin: true,
            pathRewrite: {
              '^/api2': '',
            },
          })
        )
      }  
    - 方式一代理的不足之处在于只能转发至一个服务器, 如果后端采用微服务, 不同服务在不同的端口, 就会有局限. 所以采用多个代理的方式, 和 `Vue.config.js` 中书写含义相同.
    - 因为改了代理方式, 所以为了能够将请求转发至端口 `5000` 服务器, 需要在请求 `url` 的 `path` 前加上 `/api1`
    - ```jsx
      login = () => {
        axios.post(
          'http://localhost:3000/api1/login',
          {
            username: 'tom',
            password: '123456'
          }
        )
        .then(
          response => console.log('请求成功', response.data),
          error => console.log('登录失败', error),
        );
      }
    - ![](../../image/)  
2. 📕注意 `http-proxy-middleware` 版本, 我测试时的版本为 `2.0.6` 按照尚硅谷教程里写的不能工作, 网站打不开.
#### 消息订阅与发布
> 修改之前父子组件传值的案例
1. 安装 `pubsub-js`
    - ```shell
      npm i pubsub-js
2. 订阅消息(父组件)
    - 首先引入 `PubSub`
      - ```jsx
        import PubSub from 'pubsub-js';
    - 在 `componentDidMount` 中订阅消息, 在 `componentWillUnmount` 中取消订阅
      - `PubSub.subscribe`: 订阅消息
        - 第一个参数, 消息名
        - 第二个参数, 接收消息的回调函数. 这个函数同样接收两个参数
          - 参数一: 消息名
          - 参数二: 发布消息时的消息值
        - 返回订阅 `id`
      - `PubSub.unsubscribe`: 取消订阅消息
        - 只接收一个参数, 就是订阅消息的订阅 `id`
    - ```jsx
      export default class Father extends Component {
        state = {
          fruits: ['apple', 'banana'],
        }
        receiveFruit = (_, newFruit) => {
          const newFruits = [newFruit, ...this.state.fruits];
          this.setState({
            fruits: newFruits
          });
        }
        componentDidMount() {
          this.receiveId = PubSub.subscribe('receive-fruit', this.receiveFruit);
        }
        componentWillUnmount() {
          PubSub.unsubscribe(this.receiveId)
        }
        render() {
          return (
            <div>
              <Son></Son>
              <ul>
                {
                  this.state.fruits.map((item, index) => {
                    return <li key={index}>{item}</li>
                  })
                }
              </ul>
            </div>
          )
        }
      }
3. 发布消息: 子组件
    - `PubSub.publish`: 发布消息
      - 参数一: 消息名
      - 参数二: 发布消息的消息值.
    - ```jsx
      export default class Son extends Component {
        inputChanged = (event) => {
          if (event.key !== 'Enter') return;
          PubSub.publish('receive-fruit', event.target.value);
          event.target.value = '';
        }
        render() {
          return (
            <div>
              <input type="text" onKeyUp={this.inputChanged} />
            </div>
          )
        }
      }
### `<Fragment>`
1. `React` 中的一个常见模式是一个组件返回多个元素.`Fragments` 允许你将子列表分组, 而无需向 `DOM` 添加额外节点
    - 大白话就是, 不需要每个组件最外面用 `<div>` 包了.
    - ```jsx
      import { Fragment, useRef } from "react"

      export default function Show() {
        const usernameRef = useRef();
        const ageRef = useRef();
        return (
          <Fragment>
            <input type="text" name="username" ref={usernameRef} />&nbsp;
            <input type="text" name="age" ref={ageRef} />&nbsp;
            <button onClick={() => console.log(usernameRef.current.value, ageRef.current.value) }>点我展示输入</button>
          </Fragment>
        )
      }
    - ![](../../image/Snipaste_2022-06-04_14-33-31.png)
2. `key`
    - `Fragment` 可能具有 `key`. 一个使用场景是将一个集合映射到一个 `Fragments` 数组
    - ```jsx
      import React, { Fragment } from 'react'

      export default function Fruit() {
        const fruitList = ['apple', 'banana'];
        return (
          <Fragment>
            {
              fruitList.map(fruit => {
                return (
                  <Fragment key={fruit}>
                    <h2>{fruit}</h2>
                  </Fragment>
                )
              })
            }
          </Fragment>
        )
      }
    - ![](../../image/Snipaste_2022-06-04_14-46-14.png)
3. 更短的新语法
    - 如果只是因为每个组件都只能有一个父组件而使用 `Fragment` 的话, 可以试试新的语法 `<>` 空组件
    - ```jsx
      export default function Fruit() {
        const fruitList = ['apple', 'banana'];
        return (
          <>
            {
              fruitList.map(fruit => {
                return (
                  <Fragment key={fruit}>
                    <h2>{fruit}</h2>
                  </Fragment>
                )
              })
            }
          </>
        )
      }
    - 空白节点同样不会被渲染.
### `Context`
>  `Context` 提供了一个无需为每层组件手动添加 `props`, 就能在组件树间进行数据传递的方法
1. 在一个典型的 `React` 应用中, 数据是通过 `props` 属性自上而下(由父及子)进行传递的, 但此种用法对于某些类型的属性而言是极其繁琐的(例如: 地区偏好, `UI` 主题), 这些属性是应用程序中许多组件都需要的. `Context` 提供了一种在组件之间共享此类值的方式, 而不必显式地通过组件树的逐层传递 `props`
2. 案例
    - 项目结构: 📕注意我们创建 `context` 应该在所有组件中都可以访问, 因此我单独写了一个文件
      - ![](../../image/Snipaste_2022-06-04_18-03-47.png)
    - `context.js`
      - ```jsx
        import { createContext } from "react";
        export default createContext();
      - 文件进引入并调用 `createContext`() 函数, 其返回一个 `Context` 对象.
      - 其实 `createContext` 可以接收一个参数, 作为 `context` 的默认值.
    - `GrandFather`
      - ```jsx
        import React, { Component } from 'react'
        import Father from '../Father'
        import ThemeContext from '../../context';

        export default class GrandFather extends Component {
          state = { theme: 'light' }
          render() {
            return (
              <div style={{backgroundColor: 'skyblue', paddingBottom: '1rem'}}>
                <h2>我是爷爷组件</h2>
                <button onClick={() => this.setState({theme: 'dark'})}>修改传给孙子的值</button>
                <ThemeContext.Provider value={{theme: this.state.theme }}>
                  <Father />
                </ThemeContext.Provider>
              </div>
            )
          }
        }
      - 首先引入了 `ThemeContext`, 并调用其 `Provider` `API`, 使用该组件包裹需要接收 `Context` 的后代组件, 并使用 `value` 传递了 `Context` 的值(这里是一个对象).
      - 当 `Provider` 的 `value` 值发生变化时, `Provider` 内部的素有消费组件都将被重新渲染.
      - 如果项目中有多个 `Context`, 因此也就相应的有多个 `Provider`, 多个 `Provider` 可以嵌套使用. 
    - `Father`
      - ```jsx
        import React, { Component } from 'react'
        import Me from '../Me'

        export default class Father extends Component {
          render() {
            return (
              <div style={{backgroundColor: 'orange', paddingBottom: '1rem'}}>
                <h2>我是父亲组件</h2>
                <Me />
              </div>
            )
          }
        }
      - 中间的组件就比较简单了, 仅仅为了创建三层组件结构而存在
    - `Me`
      - ```jsx
        import React, { Component } from 'react'
        import ThemeContext from '../../context';

        export default class index extends Component {
          // 声明接收
          static contextType = ThemeContext;
          render() {
            console.log('context in me', this.context);
            return (
              <div style={{backgroundColor: 'pink', paddingBottom: '1rem'}}>
                <h2>我是孙子组件</h2>
                <h2>Context传来的值是 {this.context.theme}</h2>
              </div>
            )
          }
        }
      - 孙子组件中, 同样引入了 `ThemeContext` 并且通过 ` static contextType = ThemeContext;` 声明接收这个 Context.
      - 因此孙子组件可以从其自身 `context API` 上拿到爷爷传来的值
      - ![](../../image/Snipaste_2022-06-04_18-17-08.png)
    - 最后的效果
    - ![](../../image/react-context.gif)
3. 上面的代码因为使用了 `static` 所以只能在类式组件中用, 如果函数式组件也需要 `Context` 怎么办呢? 使用 `Consumer API`
    - ```jsx
      export default function Me() {
        return (
          <div style={{ backgroundColor: 'pink', paddingBottom: '1rem' }}>
            <h2>我是孙子组件</h2>
            <h2>Context传来的值是 
              <ThemeContext.Consumer >
                {
                  // 下面是一个函数, 参数 value 就是类式组件的 context
                  value => `->>> ${value.theme}`
                }
              </ThemeContext.Consumer>
              哈哈哈哈
            </h2>
          </div>
        )
      }
    - ![](../../image/Snipaste_2022-06-04_20-04-23.png)
    - `Consumer` 需要一个函数作为子元素, 函数接收当前的 `context` 值作为参数并返回一个 React 节点.
    - ![](../../image/)
    - ![](../../image/)
    - ![](../../image/)
    - ![](../../image/)
    - ![](../../image/)
## `react-router@5.3.0`
> `react-router` 有三种版本, 分别为 `WEB`, `NATIVE` 和 `ANYWHERE`. 目前只学习 `WEB` 版本
1. 安装与使用
    - ```shell
      npm i react-router-dom
2. 使用 `demo`
    - `App.jsx`
    - ```jsx
      import { Link, Route } from 'react-router-dom';

      function App() {
        return (
          <div className="App">
            <div style={{border: '1px solid pink'}}>
                <Link to="/home">去HOME</Link>
                <Link to="/about">去ABOUT</Link>
            </div>
            <div style={{backgroundColor: 'skyblue'}}>
              <Route path="/home" component={Home}></Route>
              <Route path="/about" component={About}></Route>
            </div>
          </div>
        );
      }
    - `index.js`
    - ```jsx
      ReactDOM.render(
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
      );
    - ![](../../image/Snipaste_2022-05-14_09-54-57.png)
    - 在路由导航中, 需要使用 `Link` 组件. 其中 `to` 属性表示要去的路由
      - ```jsx
        <Link to="/home">去HOME</Link>
    - 在路由显示中, 需要使用 `Route` 组件. 同样, `to` 属性表示该组件匹配的路由, `component` 属性表示如果路由匹配需要显示的组件
      - ```jsx
        <Route path="/home" component={Home}></Route>
    - 同一对的路由导航和路由显示, 必须用用一个 `Router` 组件包裹起来, 我们这里使用 `BrowserRouter` 组件直接包括 `App` 组件即可
    - 📕这里有一个坑, 就是我使用 `create-react-app` 创建项目的 `react` 版本为 `18.1.0`, 其 `index.js` 中的代码如下
      - ```jsx
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
          <React.StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </React.StrictMode>,
          document.getElementById('root')
        );
      - 这个时候, 切换路由并不会真的切换必须刷新才可以. 因此需要将上面的写法改为旧的写法, 这样配合 `react-router-dom@^5` 版本才没有问题. 但是控制台会进行错误提示, 大意就是 `ReactDOM.render()` 这个 `API` 要过期了, 不要再用了😅
      - ```jsx
        ReactDOM.render(
          <React.StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </React.StrictMode>,
          document.getElementById('root')
        );
      - ![](../../image/Snipaste_2022-05-14_08-43-16.png)  
    - 📕我们看看 Link 组件最终被渲染成了什么? `<a>` 标签
      - ![](../../image/Snipaste_2022-05-14_09-58-33.png)
### 路由组件和一般组件
1. 书写位置不同
    - 路由组件一般写在 `pages` 文件夹下
    - 一般组件一般写在 `components` 文件夹下
2. 写法不同
    - 一般组件: `<Header />`
    - 路由组件: `<Route path="/about" component={About}></Route>`
3. 接收到的 props 不同
    - 一般组件: 穿什么接收什么
    - 路由组件: 接收到特定内容
    - ![](../../image/Snipaste_2022-05-14_09-52-31.png)  
### `NavLink`
1. 上面的代码中如果选中路由并没有出现对应的路由高亮, 如果想要高亮可以使用 `NavLink` 标签
    - ```jsx
      function App() {
        return (
          <div className="App">
            <Header></Header>
            <div style={{border: '1px solid pink'}}>
                <NavLink to="/home">去HOME</NavLink>
                <NavLink to="/about">去ABOUT</NavLink>
            </div>
            <div style={{backgroundColor: 'skyblue'}}>
              <Route path="/home" component={Home}></Route>
              <Route path="/about" component={About}></Route>
            </div>
          </div>
        );
      }
    - `NavLink` 会默认给当前路由添加 `active` 的 `class`
    - ![](../../image/Snipaste_2022-05-14_10-03-05.png)  
    - 如果不想要这个名字, 可以通过 `activeClassName`
    - ```jsx
      <div style={{border: '1px solid pink'}}>
        <NavLink activeClassName="hahaha" to="/home">去HOME</NavLink>
        <NavLink activeClassName="hahaha" to="/about">去ABOUT</NavLink>
      </div>
    - ![](../../image/Snipaste_2022-05-14_10-25-53.png)  
2. 封装 `NavLink`
    - 上面的 `NavLink` 有很多重复性的内容, 导致一样的内容需要写多边, 现在我们尝试封装 `NavLink` 到 `MyNavLink` 组件
    - ```jsx
      import React, { Component } from 'react'
      import { NavLink } from 'react-router-dom'

      export default class MyNavLink extends Component {
        render() {
          return (
            <NavLink activeClassName="hahaha" {...this.props}></NavLink>
          )
        }
      }
    - 在 App.jsx 中
    - ```jsx
      <div style={{border: '1px solid pink'}}>
        <MyNavLink to="/home">去HOME</MyNavLink>
        <MyNavLink to="/about">去ABOUT</MyNavLink>
      </div>
### 懒加载`lazy`
1. 如果不懒加载, 那么页面的所有路由组件在页面加载完成时也就加载完成了, 这很影响首页加载速度, 因此需要使用懒加载. 懒加载的意思就是只有使用组件 `A` 时才加载组件 `A`
    - 修改之前的代码. 懒加载 `Home` 和 `About` 组件, 引入 `lazy` 函数
    - ```jsx
      const Home = lazy(() => import('./component/Home'))
      const About = lazy(() => import('./component/About'))
    - 引入 `Suspense` 组件, 指定 `fallback` 作为懒加载组件因为网络等原因等待过长的"加载中"组件, 当然我们可以写一个 `jsx` 表达式
    - ```jsx
       <Suspense fallback={ <h1>Loading....</h1>   }>
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </Suspense>
    - 效果:
      - 网速被设置为 `fast 3G` 后, 在懒加载 `Home` 之前先加载了 `loading`
      - `Home` 组件并没有在整个页面被加载完成时完成加载, 而是在路由生效时菜价在, 体现在 `js` 文件的网络请求.
    - ![](../../image/react-router-lazy.gif)
    - 完整代码(`App.jsx`)
    - ```jsx
      import './App.css';
      import {lazy, Suspense} from 'react';
      import { Link, Route } from 'react-router-dom';

      const Home = lazy(() => import('./component/Home'))
      const About = lazy(() => import('./component/About'))

      function App() {
        return (
          <div className="App">
            <div style={{border: '1px solid pink'}}>
                <Link to="/home">去HOME</Link>
                <Link to="/about">去ABOUT</Link>
            </div>
            <div style={{backgroundColor: 'skyblue'}}>
              <Suspense fallback={ <h1>Loading....</h1>   }>
                <Route path="/home" component={Home}></Route>
                <Route path="/about" component={About}></Route>
              </Suspense>
            </div>
          </div>
        );
      }

      export default App;
2. 编写自己的 `Loading` 组件
    - 如果上面的简单的 `loading` 无法满足业务需要, 可以自己写一个 `loading` 组件.
    - 📕一定不要将 Loading 组件也写成懒加载的形式!!!! 因为它就是在懒加载请求过程中起作用的
    - ```jsx
      import Loading from './component/Loading';
      // 下面的写法是错误的
      // <Suspense fallback={ Loading }>
      <Suspense fallback={ <Loading /> }>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
      </Suspense>
    - ![](../../image/react-router-lazy-loading.gif)
### `Switch`
1. 让我们再多引入一个组件 Test, 并将其路由同样注册为 `/about`
    - ```jsx
      <div style={{backgroundColor: 'skyblue'}}>
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/about" component={Test}></Route>
      </div>
    - 当我们真正点击 `/about` 时会同时显示两个组件. 如果想要路由匹配到一个后就不再继续向下匹配, 需要使用 `Switch`
    - ![](../../image/Snipaste_2022-05-15_09-04-22.png)  
2. 使用 `Switch`
    - ```jsx
      import { Route, Switch } from 'react-router-dom';
      <div style={{ backgroundColor: 'skyblue' }}>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/about" component={Test}></Route>
        </Switch>
      </div>
    - ![](../../image/Snipaste_2022-05-15_09-06-12.png)
### 解决样式丢失的问题
1. 为了要展示这个问题, 需要做几个修改
    - 第一: 在 `public` 下创建 `css` 文件夹, 并创建 `index.css`, 且在 `index.html` 中引入该 `css` 文件. 将路由链接的 `active` 类样式写在该 `css` 文件中.
    - ```css
      .hahaha {
        background-color: salmon;
        color: aliceblue;;
      }
    - ```html
      <link rel="stylesheet" href="./css/index.css">
    - 然后我们需要将单层路由, 改为双层路由. 即将 `/home` 改为 `/api/home`
    - ```jsx
      <div style={{ border: '1px solid pink' }}>
        <MyNavLink to="/api/home">去HOME</MyNavLink>
        <MyNavLink to="/api/about">去ABOUT</MyNavLink>
      </div>
      <div style={{ backgroundColor: 'skyblue' }}>
        <Switch>
          <Route path="/api/home" component={Home}></Route>
          <Route path="/api/about" component={About}></Route>
        </Switch>
      </div>
    - 如果只是点击路由链接, 跳转没有问题.
      - ![](../../image/Snipaste_2022-05-15_20-32-32.png)
      - 但是, 如果刷新之后, 路由链接的 `active` 样式就会消失
      - ![](../../image/Snipaste_2022-05-15_20-33-16.png)
2. 为什么会发生这件事? 
    - 因为 `index.css` 文件找不到了! 如果我们在 `F12` 看这个文件的请求, 就会发现请求路径错了!!!
    - ![](../../image/Snipaste_2022-05-15_21-31-13.png)
    - 错误的根本原因在于引入 css 文件时, 不应该采用相对路径写法, 如果采用下面的写法就不会报错
    - ```html
      <!-- 丢失样式的写法 -->
      <link rel="stylesheet" href="./css/index.css">
      <!-- ✔正确写法1 -->
      <link rel="stylesheet" href="/css/index.css">
      <!-- ✔正确写法2 --> 
    - ![](../../image/Snipaste_2022-05-16_22-00-57.png)
3. 采用 `hash` 路由导航也可以解决这个问题, 因为 `hash` 路由中路由路径不会成为请求的 path 的一部分, 我猜的...
    - ```jsx
      import { HashRouter } from 'react-router-dom'

      ReactDOM.render(
        <React.StrictMode>
          <HashRouter>
            <App />
          </HashRouter>
        </React.StrictMode>,
        document.getElementById('root')
      );
    - ![](../../image/Snipaste_2022-05-16_22-08-58.png)
### 路由的模糊匹配和严格匹配
1. 看下面的例子
    - 如果路由导航中的路由为 `/about`, 但是注册路由时的路由为 `/about/a/b`, 实际上是不能显示 `About` 组件的
    - ```jsx
      <div style={{ border: '1px solid pink' }}>
        <MyNavLink to="/home">去HOME</MyNavLink>
        <MyNavLink to="/about">去ABOUT</MyNavLink>
      </div>
      <div style={{ backgroundColor: 'skyblue' }}>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/about/a/b" component={About}></Route>
        </Switch>
      </div>
    - ![](../../image/Snipaste_2022-05-17_17-41-31.png)
2. 但是如果返回来, 导航中的路由为 `/about/a/b`, 注册时路由为 `/about` 就可以正常显示.
    - ```jsx
      <div style={{ border: '1px solid pink' }}>
        <MyNavLink to="/home">去HOME</MyNavLink>
        <MyNavLink to="/about/a/b">去ABOUT</MyNavLink>
      </div>
      <div style={{ backgroundColor: 'skyblue' }}>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
        </Switch>
      </div>
    - ![](../../image/Snipaste_2022-05-17_17-43-45.png)
    - 其实, `/about/a/b` 不仅可以匹配 `/about`, 还可以匹配 `/about/a` 和 `/about/a/b`
      - 让我们把代码改成下面没有 `Switch` 组件的样子
      - ```jsx
        <div style={{ border: '1px solid pink' }}>
          <MyNavLink to="/home">去HOME</MyNavLink>
          <MyNavLink to="/about/a/b">去ABOUT</MyNavLink>
        </div>
        <div style={{ backgroundColor: 'skyblue' }}>
          <Route path="/home" component={Home}></Route>
          <Route path="/about/a" component={Abouta}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/about/a/b" component={Aboutab}></Route>
        </div>
      - ![](../../image/Snipaste_2022-05-17_17-58-09.png)
      - 😱每一层都匹配了!!!
    - 也就是说, 注册路由时的路由, 每一级都不能少才能显示, 否则就无法匹配
3. 为了让避免上面的问题, 需要引入 `Route` 的 `exact` 属性, 使得导航中和注册时得路由必须完全一样才可以匹配
    - ```jsx
      <Switch>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/about" exact={true} component={About}></Route>
      </Switch>
    - ![](../../image/Snipaste_2022-05-17_17-47-54.png)
    - 📕如果有多层级页面的话, 不能够使用 `exact` 哦~
### `Redirect` 的使用
1. 默认情况下, 是没有路由匹配根路径 ( `/` ) 的, 我们可以使用 Redirect 匹配无法匹配的路由并将其转移到某个路由
    - ```jsx
      import { Route, Switch, Redirect } from 'react-router-dom';
      <div style={{ border: '1px solid pink' }}>
        <MyNavLink to="/home">去HOME</MyNavLink>
        <MyNavLink to="/about">去ABOUT</MyNavLink>
      </div>
      <div style={{ backgroundColor: 'skyblue' }}>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Redirect to="/about" component={About}></Redirect>
        </Switch>
      </div>
    - ![](../../image/react_router_redirect.gif)
### 嵌套路由
1. 首先准备数据, 在 `Home` 下创建 `Message` 和 `News` 组件
    - ![](../../image/Snipaste_2022-05-17_18-18-01.png)
2. 修改 `Home` 组件
    - 📕注意此时, 在 `Home` 中无论是用于导航(`to`)的路由, 还是注册(`path`)的路由, 都是多层级结构哦!
    - ```jsx
      import React, { Component } from 'react'
      import { NavLink, Route, Switch } from 'react-router-dom'
      import News from './News'
      import Message from './Message'

      export default class Home extends Component {
        render() {
          return (
            <div>
              <h1>我是Home</h1>
              <div>
                <NavLink to="/home/news" activeClassName="hahaha">News</NavLink>
                <NavLink to="/home/message" activeClassName="hahaha">Message</NavLink>
              </div>
              <div>
                <Switch>
                  <Route path="/home/news" component={News}></Route>
                  <Route path="/home/message" component={Message}></Route>
                </Switch>
              </div>
            </div>
          )
        }
      }
    - `App` 组件不变
    - ```jsx
      function App() {
        return (
          <div className="App">
            <Header></Header>
            <div style={{ border: '1px solid pink' }}>
              <MyNavLink to="/home">去HOME</MyNavLink>
              <MyNavLink to="/about">去ABOUT</MyNavLink>
            </div>
            <div style={{ backgroundColor: 'skyblue' }}>
              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/about" component={About}></Route>
                <Redirect to="/about" component={About}></Redirect>
              </Switch>
            </div>
          </div>
        );
      }
    - 展示效果
    - ![](../../image/Snipaste_2022-05-17_18-22-30.png)
### 传递路由参数
1. 首先创建 `Detail` 组件, 当用户点击 `News` 组件中的某一条消息时, 导航至 `Detail` 组件并携带参数
#### `params` 参数
1. `params` 参数就是路由中的参数, 类似 `SpringMVC` 中的 @PathVariable 注解表示的类型.
    - 首先, 我们改造 `News` 组件. 使其遍历数组创建路由导航.
    - ```jsx
      import React, { Component } from 'react';
      import { NavLink, Route } from 'react-router-dom';
      import Detail from './Detail';

      export default class News extends Component {
        render() {
          const news = [
            { id: '001', title: 'news1' },
            { id: '002', title: 'news2' },
            { id: '003', title: 'news3' },
          ]
          return (
            <div>
              <ul>
                {
                  news.map((newObj) => {
                    return (
                      <li key={newObj.id}><NavLink activeClassName='hahaha' to={`/home/news/detail/${newObj.id}/${newObj.title}`}></NavLink>{newObj.title}</li>
                    )
                  })
                }
              </ul>
              <Route path="/home/news/detail/:id/:title" component={Detail}></Route>
            </div>
          )
        }
      }
    - 下面是 `Detail` 组件, 我们打印其 `props`
    - ```jsx
      export default class Detail extends Component {
        render() {
          console.log('props in detail', this.props);
          const { id, title } = this.props.match.params;
          return (
            <div>
              <ul>
                <li>ID: {id}</li>
                <li>TITLE: {title}</li>
              </ul>
            </div>
          )
        }
      }
    - 📕当我们接收路由参数时, 使用的是 `/:paramName` 这样的. 在 `Detail` 组件的 `props` 的 `match` 属性, 可以接收到传递来的参数
    - ![](../../image/Snipaste_2022-05-18_22-13-27.png)
#### `search` 参数
1. `search` 参数就是在 `url` 的 `?` 通过 `key1=value1&key2=value2` 这样的形式拼接起来的参数
    - 在路由导航时, 需要手动拼接; 但是在匹配路由时, 无需像 `params` 参数一样指定接收哪些参数
    - ```jsx
      export default class News extends Component {
        render() {
          const news = [
            { id: '001', title: 'news1' },
            { id: '002', title: 'news2' },
            { id: '003', title: 'news3' },
          ]
          return (
            <div>
              <ul>
                {
                  news.map((newObj) => {
                    return (
                      <li key={newObj.id}>
                        {/* search 参数 */}
                        <NavLink
                          activeClassName='hahaha'
                          to={`/home/news/detail?id=${newObj.id}&title=${newObj.title}`}
                        >{newObj.title}</NavLink>
                      </li>
                    )
                  })
                }
              </ul>

              {/* search 参数 */}
              <Route path="/home/news/detail" component={Detail}></Route>
            </div>
          )
        }
      }
    - 在 `Detail` 组件中可以收到传来的 `search` 参数.
    - ![](../../image/Snipaste_2022-05-19_22-51-23.png)
2. 如何把 `?id=001&title=news1` 转成我们需要的样子呢? 使用 `node` 自带的库 `querystring`
    - 我使用 `querystring` 报错, 改成 `qs` 之后可以了
      - 📕使用 `parse` 方法将字符串解析为对象, 同理使用 `stringify` 将对象编码为字符串
    - ```jsx
      export default class Detail extends Component {
        render() {
          console.log('props in detail', this.props);
          const search = this.props.location.search.slice(1);
          const searchObj = qs.parse(search);
          console.log('searchObj', searchObj);
          const { id, title } = searchObj;
          return (
            <div>
              <ul>
                <li>ID: {id}</li>
                <li>TITLE: {title}</li>
              </ul>
            </div>
          )
        }
      }
    - ![](../../image/Snipaste_2022-05-19_22-59-05.png)
    - 你看到上面的三个路由都 `active` 但是不要紧, 因为实际开发中如果只是传参不同, 那么这三个路由实际对应的只有一个组件.
#### `state` 参数
1. 传递 `state` 参数时, 需要将 `to` 参数写为对象格式, 包含一下属性
    - `path(字符串)`: 要跳转的路由地址
    - `state(对象)`: 要传递的参数
    - ```jsx
      export default class News extends Component {
        render() {
          const news = [
            { id: '001', title: 'news1' },
            { id: '002', title: 'news2' },
            { id: '003', title: 'news3' },
          ]
          return (
            <div>
              <ul>
                {
                  news.map((newObj) => {
                    return (
                      <li key={newObj.id}>
                        <NavLink
                          activeClassName='hahaha'
                          to={{
                            pathname: "/home/news/detail",
                            state: { id: newObj.id, title: newObj.title }
                          }}
                        >{newObj.title}</NavLink>
                      </li>
                    )
                  })
                }
              </ul>
              <Route path="/home/news/detail" component={Detail}></Route>
            </div>
          )
        }
      }
    - 当然在接收参数时, 需要从 `props.location.state` 对象上接收
    - ![](../../image/Snipaste_2022-05-21_08-11-49.png)
2. `state` 方式传递参数, 刷新页面不会导致参数丢失哦! 因为 `location` 不仅是 `props` 的一个属性, 也是 `props.history` 的一个属性
3. 一个 `bug`: 如果我们存储了浏览器 `url`, 但是清除了浏览器记录, 恰好这个 `url` 使用 `state` 传递参数. 那么就会出现下面的报错
    - 比如, 我用浏览器的无痕模式打开 `http://localhost:3000/home/news/detail`
    - ![](../../image/Snipaste_2022-05-21_09-00-40.png)
    - 报错是因为尝试从 `props.location.state` 对象身上解耦出 `id` 和 `title`, 但是 `props.location.state` 是 `undefined`, 因此解耦失败. 所以我们需要修改代码, 如果 `props.location.state` 为 `undefined`, 就返回空对象作为替代
    - ```jsx
      const { id, title } = this.props.location.state || {};
    - ![](../../image/Snipaste_2022-05-21_09-03-51.png)
### `push` 和 `replace` 模式
1. 路由默认 push 模式, 如果想要开启 replace 模式, 需要在 Link 或 NavLink 指定 replace 属性为 true.
    - ```jsx
      export default class Home extends Component {
        render() {
          return (
            <div>
              <h1>我是Home</h1>
              <div>
                <NavLink replace to="/home/news" activeClassName="hahaha">News</NavLink>
                <NavLink replace to="/home/message" activeClassName="hahaha">Message</NavLink>
              </div>
              <div>
                <Switch>
                  <Route path="/home/news" component={News}></Route>
                  <Route path="/home/message" component={Message}></Route>
                </Switch>
              </div>
            </div>
          )
        }
      }
2. 如果我们先点击 `/about`, 然后点击 `/home` 再点击 `/news`, 之后点击浏览器的后退, 此时会回到 `/about`. 因为跳转到 `/news` 的路由取代(`replace`) 了 `/home`.
### 编程式路由导航
> 即不是 `Link` 或 `NavLink` 等注册路由因为有些情况没办法使用它们, 比如点击图片跳转或者延时跳转等.
1. `API`
    - 主要的 `API` 为 `props.history` 对象的属性
    - ![](../../image/Snipaste_2022-05-21_09-13-05.png)
2. `params` 参数
    - 增加两个按钮, 分别进行 `push` 和 `replace` 的编程式路由跳转. 
      - 📕即便采用了编程式路由跳转, 仍然要使用 `Route` 并采用对应的参数接收方式, 对应的组件(`Detail`) 也要同步修改接收参数方式
    - ```jsx
      export default class News extends Component {
        pushRoute(id, title) {
          this.props.history.push(`/home/news/detail/${id}/${title}`)
        }
        replcaeRoute(id, title) {
          this.props.history.replace(`/home/news/detail/${id}/${title}`)
        }
        render() {
          const news = [
            { id: '001', title: 'news1' },
            { id: '002', title: 'news2' },
            { id: '003', title: 'news3' },
          ]
          return (
            <div>
              <ul>
                {
                  news.map((newObj) => {
                    return (
                      <li key={newObj.id}>
                        <span>{newObj.title}</span>
                        &nbsp; <button onClick={() => this.pushRoute(newObj.id, newObj.title)}>push</button>
                        &nbsp; <button onClick={() => this.replcaeRoute(newObj.id, newObj.title)}>replace</button>
                      </li>
                    )
                  })
                }
              </ul>
              <Route path="/home/news/detail/:id/:title" component={Detail}></Route>
            </div>
          )
        }
      }
    - ![](../../image/Snipaste_2022-05-21_09-20-30.png)
3. `search` 参数
    - ```jsx
      export default class News extends Component {
        pushRoute(id, title) {
          this.props.history.push(`/home/news/detail?id=${id}&title=${title}`)
        }
        replcaeRoute(id, title) {
          this.props.history.replace(`/home/news/detail?id=${id}&title=${title}`)
        }
        render() {
          const news = [
            { id: '001', title: 'news1' },
            { id: '002', title: 'news2' },
            { id: '003', title: 'news3' },
          ]
          return (
            <div>
              <ul>
                {
                  news.map((newObj) => {
                    return (
                      <li key={newObj.id}>
                        <span>{newObj.title}</span>
                        &nbsp; <button onClick={() => this.pushRoute(newObj.id, newObj.title)}>push</button>
                        &nbsp; <button onClick={() => this.replcaeRoute(newObj.id, newObj.title)}>replace</button>
                      </li>
                    )
                  })
                }
              </ul>
              {/* search 参数 */}
              <Route path="/home/news/detail" component={Detail}></Route>
            </div>
          )
        }
      }
    - ![](../../image/Snipaste_2022-05-21_09-24-26.png)
4. `state` 参数
    - ```jsx
      export default class News extends Component {
        pushRoute(id, title) {
          this.props.history.push(`/home/news/detail`, {
            id,
            title,
          });
        }
        replcaeRoute(id, title) {
          this.props.history.replace(`/home/news/detail`, {
            id,
            title,
          });
        }
        render() {
          const news = [
            { id: '001', title: 'news1' },
            { id: '002', title: 'news2' },
            { id: '003', title: 'news3' },
          ]
          return (
            <div>
              <ul>
                {
                  news.map((newObj) => {
                    return (
                      <li key={newObj.id}>
                        <span>{newObj.title}</span>
                        &nbsp; <button onClick={() => this.pushRoute(newObj.id, newObj.title)}>push</button>
                        &nbsp; <button onClick={() => this.replcaeRoute(newObj.id, newObj.title)}>replace</button>
                      </li>
                    )
                  })
                }
              </ul>
              {/* state 参数 */}
              <Route path="/home/news/detail" component={Detail}></Route>
            </div>
          )
        }
      }
    - ![](../../image/Snipaste_2022-05-21_09-26-56.png)
### `withRouter`
1. 📕注意上述的路由 `API` 都只能在路由组件上使用, 对于一般组件, 是没有这些 `API` 的, 因此使用都会报错
    - 例如我们在 Header 组件上增加前进和后退按钮
    - ```jsx
      export default class Header extends Component {
        goBack1 = () => {
          this.props.history.goBack();
        }
        goForward1 = () => {
          this.props.history.goForward();
        }
        render() {
          return (
            <div>
              <h1>React Router DOM</h1>
              <button onClick={this.goBack1}>后退</button>
              <button onClick={this.goForward1}>前进</button>
            </div>
          )
        }
      }
    - ![](../../image/Snipaste_2022-05-21_09-59-45.png)
2. 如果想要在一般组件上使用路由的 `API`, 需要引入 `withRouter` 函数. 该函数接收一个组件为参数, 返回一个组件
    - ```jsx
      import { withRouter } from 'react-router-dom';

      class Header extends Component {
        goBack1 = () => {
          this.props.history.goBack();
        }
        goForward1 = () => {
          console.log('props', this.props);
          this.props.history.goForward();
        }
        render() {
          return (
            <div>
              <h1>React Router DOM</h1>
              <button onClick={this.goBack1}>后退</button>
              <button onClick={this.goForward1}>前进</button>
            </div>
          )
        }
      }
      export default withRouter(Header)
    - ![](../../image/Snipaste_2022-05-21_10-02-24.png)
## Ant Design@4.8.2
1. 安装
    - ```shell
      npm i antd@4.8.2
    - 引入组件和样式
    - ```jsx
      import { Button } from 'antd'
      import 'antd/dist/antd.css'

      function App() {
        return (
          <div className="App">
            <Button type='primary'>Primary</Button>
          </div>
        );
      }
2. 其余按需引入组件或者自定义样式[请访问](https://3x.ant.design/docs/react/use-with-create-react-app-cn). 虽然我们是 `4.8.2` 版本, 但是也可以按照 `3.x` 的进行配置. 如果你安装的是最新版的 `antd`, [请访问](https://ant.design/docs/react/use-with-create-react-app-cn)
## `Redux`
### 基础
1. `redux` 是一个专用用于状态管理的 `js` 库, 不是 `react` 插件库
2. 作用: 集中式管理 `react` 应用中多个组件`共享`的状态
3. 什么情况下使用 `redux`
    - 某个组件的状态需要其他状态访问(共享)
    - 一个组件可以改变另一个组件的状态(通信)
    - 总体元素: 能不用就不用, 如果不用比较吃力才考虑使用
4. 原理图
    - ![](../../image/redux原理图.png)
5. 核心概念
    - `action`
      - 动作的对象
      - 包含两个属性
        - `type`: 标识属性, 字符串且需要唯一
        - `data`: 数据属性, 值可以是任意类型, 可选
      - 举例: 
        - ```jsx
          {
            type: 'addStudent', 
            data: {
              name: 'tom', 
              age: '18' 
            }
          }
    - `reducer`
      - 用于初始化状态, 加工状态. 加工时, 根据旧的 `state` 和 `action` 产生新的 `state` 的纯函数.
    - `store`
      - 将 `state`, `action` 和 `reducer` 联系在一起的对象
      - 如果得到这个对象: `createStore()` 函数返回一个 `store` 对象
      - 作用
        - `getState()`: 得到 `state`
        - `dispatch(action)`: 分发 `action`, 触发 `reducer`, 产生新的 `state`
        - `subscribe(listener)`: 注册监听, 当产生了新的 `state` 后自动调用回调函数
### 简易版求和案例
1. 文件结构
    - ```shell
      - src
        - components
          - Count
            - index.jsx
        - redux
          - store.js
          - count_reducer.js
2. `count_reducer.js`
    - 暴露一个函数, 这个函数接收两个参数 `preState` 和 `action`.
    - 之前我们提到在 `reducer` 中初始化状态, 在首次执行这个函数时的返回值, 就是初始化的状态, 下面的例子中, 初始化的状态为 `0`
    - ```jsx
      export default function countReducer(preState, action) {
        console.log('countReducer', preState, action);
        const {type, data} = action;
        switch (type) {
          case 'add':
            preState += data;
            break;
          case 'minus':
            preState -= data;
            break;
          default:
            preState = 0;
            break;
        }
        return preState;
      }
    - 很好奇地时, 如果首次执行这个函数, 那么这两个参数会是什么呢? 🧐
      - 哈哈, `preState` 是 `undefined`, `action` 只有 `type` 而没有 `data`, 而且 `type` 是 `Redux` 自己组装的和我们自己写的绝不会冲突的 `string`.
      - ![](../../image/Snipaste_2022-05-25_22-06-41.png)
      - 接着提问: 什么时候首次执行了这个函数呢? 就是在 Count 组件中使用 `store.getState()` 时
    - 如果非首次调用, 比如执行 `+1` 操作时
      - `preState` 是上一次的值, `0`. `action` 是代码中传的值. 这一部分需要结合 `Count` 组件的代码
      - ![](../../image/Snipaste_2022-05-25_22-13-34.png)
2. `store.js`
    - ```jsx
      import countReducer from './count_reducer';
      import {createStore} from 'redux';

      export default createStore(countReducer);
    - 引入 `createStore` 函数, 接收一个 `reducer`, 返回一个 `store`
3. `Count` 组件
    - ```jsx
      export default class Count extends Component {
        selectRef = React.createRef();
        add = () => {
        }
        minus = () => {
        }
        render() {
          return (
            <div>
              <h2>当前求和为:{store.getState()}</h2>
              <select name="num" id="num" ref={this.selectRef}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>&nbsp;
              <button onClick={this.add}>+</button>&nbsp;
              <button onClick={this.minus}>-</button>&nbsp;
            </div>
          )
        }
      }
    - 在组件中, 使用 `store.getState()` 获取 `state`. 
    - 如何在加法和减法中真正修改 `state` 的值? 使用 `dispatch API`
      - ```jsx
        add = () => {
          store.dispatch({
            type: 'add',
            data: +this.selectRef.current.value
          });
        }
        minus = () => {
          store.dispatch({
            type: 'minus',
            data: +this.selectRef.current.value
          })
        }
    - 但是这么做的问题是什么? 页面不会发生更新. `Redux` 只维护状态, 并不会在状态发生改变时重新帮我们渲染组件
4. 如何在 `state` 发生改变时修改页面?
    - 第一, 手动调用 `setState`
      - 📕这里说的 `state` 是 `Redux` 维护的数据, 而 `setState` 是类组件实例的 `API`
      - ```jsx
         add = () => {
            store.dispatch({
              type: 'add',
              data: +this.selectRef.current.value
            });
            this.setState({})
          }
          minus = () => {
            store.dispatch({
              type: 'minus',
              data: +this.selectRef.current.value
            })
            this.setState({})
          }
      - 因为调用 `this.setState({})` 会重新渲染组件
    - 第二, 监听事件 `subscribe(()=>{})`
      - 上面的代码问题在于, 如果有很多函数修改了 `state` 的值, 那么就会触发 `Redux` 的回调, 在这个回调中, 再次更新 `state`
      - ```jsx
        componentDidMount() {
          store.subscribe(() => {
            this.setState({})
          })
        }
    - 第三, 重新调用 `React.render`
      - 上面的问题同样在与, 如果有很多组件都使用了 state, 那么需要在每个组件中都写一遍上面的方法. 一劳永逸的方法是修改 `index.js`
      - ```jsx
        store.subscribe(() => {
          ReactDOM.render(
            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>,
            document.getElementById('root')
          );
        })
### 完整版求和案例
> 不同于简易版手动创建 store, 完整版不会手动创建
1. 创建  `redux/count_action_creator.js`, 该文件专门为 `Count` 组件创建 `action` 对象.
    - ```jsx
      /**  专门为Count组件创建action */
      export function createIncrementAction(data) {
        return {
          type: 'add',
          data,
        }
      }
      // 使用箭头函数的写法
      export const createDecrementAction = data => ({type: 'minus', data})
2. 修改 `Count` 组件
    - ```jsx
      add = () => {
        // store.dispatch({
        //   type: 'add',
        //   data: +this.selectRef.current.value
        // });
        store.dispatch(createIncrementAction(+this.selectRef.current.value))
      }
      minus = () => {
        store.dispatch(createDecrementAction(+this.selectRef.current.value))
      }
3. 📕注意一下, 我们只是创建了 `action_creator`, 真正的 `reducer` 和 `store` 的关联还是在 `createStore(reducer)` 这个函数中体现的.
### `combineReducers`
1. 之前的案例从始至终 `redux` 保存的 `state` 都只有 `count:0` 这一个, 但是实际开发中需要的不仅一个状态; 但是 `redux` 只允许有一个 `state`, 因此唯一的 `state` 应该是个对象, 其中的一组组 `key` 和 `value` 才是不同的状态.
2. `state` 中有不同的状态, 因此也需要不同的 `reducer` 单独管理对应的状态, 而 `combineReducers` 的作用是, 把一个由多个不同 `reducer` 函数作为 `value` 的 `object` 合并成一个最终的 `reducer` 函数, 再对合并和的 `reducer` 调用 `createStore` 方法.
3. 案例
    - 首先创建一个 `personList` 的 reducer
    - ```jsx
      export default function personlistReducer(preState, action) {
      const {type, data} = action;
      switch (type) {
        case 'ADD_PERSON':
          preState.push({
            id: Math.random(),
            name: data.name,
            age: data.age
          });
          return preState;
        default:
          return [];
      }
    }
    - 下面修改 `store.js`
    - ```jsx
      import countReducer from './count_reducer';
      import personlistReducer from './personlist_reducer';
      import {createStore, combineReducers} from 'redux';

      const rootReducer = combineReducers({
        count: countReducer,
        personlist: personlistReducer
      });

      export default createStore(rootReducer);
    - 上面的代码中, `combineReducers` 的对象参数, 就是唯一的 `state`, 如果我们要访问 `redux` 中管理的数据, 就需要多加上 `state` 中的 `key` 了. 因此需要修改 `Count` 组件, 因为之前是通过 `store.getState()` 访问的
    - ```jsx
      <h2>当前求和为:{store.getState().count}</h2>
### 纯函数
> [👉reducer 基础👈](https://www.redux.org.cn/docs/recipes/reducers/PrerequisiteConcepts.html), [👉还有这里👈](https://www.redux.org.cn/docs/recipes/reducers/ImmutableUpdatePatterns.html)
1. 我们继续完成 `combineReducers` 部分的案例
    - 编写 peopleList 组件
    - ```jsx
      import React, { Component } from 'react'
      import store from '../../redux/store'

      export default class PeopleList extends Component {
        nameRef = React.createRef();
        ageRef = React.createRef();
        addPerson = () => {
          store.dispatch({
            type: 'ADD_PERSON',
            data: {
              name: this.nameRef.current.value,
              age: this.ageRef.current.value,
            }
          });
        }
        render() {
          return (
            <div>
              <input type="text" ref={this.nameRef} name="name" />
              <input type="text" ref={this.ageRef} name="age" />
              <button onClick={this.addPerson}>添加</button>
              <hr />
              {
                store.getState().personlist.map(people => {
                  return <li key={people.id}>{people.name}---{people.age}</li>
                })
              }
            </div>
          )
        }
      }
    - 之前写的 `personlist_reducer` 是这样的
    - ```jsx
      export default function personlistReducer(preState, action) {
        const {type, data} = action;
        switch (type) {
          case 'ADD_PERSON':
            console.log('ADD_PERSON 执行了');
            preState.push({
              id: Math.random(),
              name: data.name,
              age: data.age
            });
            return preState;
          default:
            return [];
        }
      }
    - 视频里说, 上面的代码直接修改了 `preState` 这个入参, 但是 `redux` 在判断状态是否发生变化时, 使用的是浅比较, 因此 `preState` 的地址没变故更新失败. 官网也是这么说的, 但是我自己测试的是可以的😅
2. 总结就是 `reducer` 应该是纯函数
    - 定义: 只要是相同的输入, 必定得到相同的输出.
    - 官网建议 `reducer` 遵守一下的约定
      - 不直接修改 `preState`
      - 不产生任何副作用, 比如网络请求, 输入和输出设备;
      - 不调用 `Date.now()` 和 `Math.random()` 等非纯函数;
    - 按照上面的要求改写 `reducer` 为纯函数
    - ```jsx
      // preState.push({
      //   id: Math.random(),
      //   name: data.name,
      //   age: data.age
      // });
      // return preState;
      return [...preState, {
        id: Math.random(),
        name: data.name,
        age: data.age
      }]
### `redux` 开发者工具
1. 现在应用商店安装对应插件
2. 安装对应依赖
    - ```shell
      npm i redux-devtools-extension@2.13.8 
3. 在 `store.js` 中引入
    - ```js
      import { composeWithDevTools } from 'redux-devtools-extension'

      // 不需要异步 action 
      // export default createStore(countReducer, composeWithDevTools());
      // 需要异步action
      export default createStore(countReducer, composeWithDevTools(applyMiddleware(thunk)));
    - ![](../../image/Snipaste_2022-06-03_14-35-24.png)
### 异步 `action`
1. 在实现异步是我们可以有两种方法
    - 第一, 在 `setTimeout` 中调用 `dispatch`, 
    - ```jsx
       addAsync = () => {
        setTimeout(() => {
          store.dispatch(createIncrementAction(+this.selectRef.current.value))
        }, 3000);
      }
    - 这种方式就像去饭店点餐, 自己先看菜单 `3` 秒, 然后告诉服务员上菜. 而异步 `action` 则是到了饭店就告诉服务员 `3` 秒后上菜.
2. 编写异步 `action`
    - > 异步的 `action` 是函数, 而不是之前介绍的对象
    - 首先要安装插件 `redux-thunk@2.3.0`
    - 第二, 修改 `store.js`, 引入插件来支持异步 `action`
    - ```jsx
      import countReducer from './count_reducer';
      import {createStore, applyMiddleware} from 'redux';
      // 引入 redux-thunk, 支持异步 action
      import thunk from 'redux-thunk';

      export default createStore(countReducer, applyMiddleware(thunk));
    - 第三, 修改 `count_store_creator.js`
    - ```jsx
      export const createIncrementAsyncAction = (data, delay) => {
        // 下面的返回的函数就是异步的 action
        return (dispatch) => {
          setTimeout(() => {
            dispatch(createIncrementAction(data));
          }, delay);
        }
      }
    - 最后, 在 `Count` 组件中调用
    - ```jsx
      addAsync = () => {
        store.dispatch(createIncrementAsyncAction(+this.selectRef.current.value, 1000));
      }
3. 我们来缕一缕思路
    - ```jsx
      addAsync = () => {
        store.dispatch(createIncrementAsyncAction(+this.selectRef.current.value, 1000));
      }
    - 上面的 `createIncrementAsyncAction` 执行后, 其实就是
    - ```jsx
      addAsync = () => {
        store.dispatch((dispatch) => {
          setTimeout(() => {
            dispatch(createIncrementAction(data));
          }, 1000);
        });
      }
### `react-redux`
> `react` 官方出品整合 `redux`
#### 基础
1. [👉官网👈](https://react-redux.js.org/)
    - 原理
      - 组件被分为`容器组件`和 `UI 组件`
      - 所有的 `UI 组件`都应该包裹在`容器组件`中, 他们是父子关系
      - `容器组件`是真正和 `redux` 打交道的, 可以使用 `redux` 的 `API`
      - `UI 组件`中不能使用任何 `redux` 的 `API`
      - `容器组件`会将 `redux` 中的状态和用于操作状态的方法传给给 `UI 组件`(均通过 `props`)
    - ![](../../image/react-redux.png)
2. 安装
    - ```shell
       npm i react-redux@7.2.2
3. 创建 `UI 组件`
    - `src/component/Count/index.jsx`
    - 从下面的代码,` UI 组件`中没有任何 `redux` 的 `API`
    - ```jsx
      import React, { Component } from 'react';

      export default class Count extends Component {
        selectRef = React.createRef();
        add = () => {
        }
        minus = () => {
        }
        addAsync = () => {
        }
        render() {
          return (
            <div>
              <h2>当前求和为:???</h2>
              <select name="num" id="num" ref={this.selectRef}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>&nbsp;
              <button onClick={this.add}>+</button>&nbsp;
              <button onClick={this.minus}>-</button>&nbsp;
              <button onClick={this.addAsync}>异步+</button>&nbsp;
            </div>
          )
        }
      }
4. 创建`容器组件`(一)
    - `src/container/Count/index.jsx`
    - 容器组件不能使用类式组件, 因为容器组件要和 `redux` 打交道, 应由 `react-redux` 提供的 `API` 生成.
    - 第一步, 在引入的内容上, 因为容器组件子组件是 UI 组件, 因此需要引入 `UI 组件`;
    - ```jsx
      import CountUI from '../../components/Count'
    - 因为容器组件使用 redux, 因此需要引入核心的 `store`. 但是需要不能直接引入, 而是在 `App` 组件中传入 `store`. 下面是 `App` 组件的代码
    - ```jsx
      import './App.css';
      import Count from './container/Count'
      import store from './redux/store'

      function App() {
        return (
          <div className="App">
            <Count store={store}></Count>
          </div>
        );
      }

      export default App;
    - 第三, 上面的问题在于, 我们并没有创建并暴露`容器组件`, 所以下面就要通过 `react-redux` 的 `connect` 函数创建容器组件
    - ```jsx
      import CountUI from '../../components/Count';
      import { connect } from 'react-redux';

      const CountContainer = connect()(CountUI);
      export default CountContainer;
5. 创建`容器组件`(二)
    - 为了将状态和操作状态的方法从`容器组件`传递给 `UI 组件`, 需要在调用 `connect()` 时传递两个函数
      - 第一个函数返回的对象将作为 `状态` 通过 `props` 的形式传递给 `UI 组件`; 第一个函数接收 `redux` 中的 `state` 作为参数
      - 第二个函数返回的对象将作为 `操作函数的方法` 通过 props 的形式传递给`UI 组件`; 第二个函数接收 `redux` 中的 `dispatch` 作为参数
    - ```jsx
      function mapStateToProps(state) {
        return {
          count: state
        }
      }
      function mapDispatchToProps(dispatch) {
        return {
          add: (number) => {
            dispatch({ type: 'add', data: number})
          }
        }
      }

      const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);
      export default CountContainer;
    - 从下面的截图可以看到, `UI` 组件已经成功接收到了 `状态`和`操作状态的函数` 的 `props`
    - ![](../../image/Snipaste_2022-05-31_21-29-06.png)
    - 在接收到容器组件传来的`状态`和`状态修改函数`后, 就可以使用 `UI 组件`啦.
    - ```jsx
      import React, { Component } from 'react';

      export default class Count extends Component {
        selectRef = React.createRef();
        add = () => {
          // 这里!!!!
          this.props.add(+this.selectRef.current.value)
        }
        minus = () => {
        }
        addAsync = () => {
        }
        render() {
          console.log('props in CountUI', this.props);
          return (
            <div>
              <!-- 这里!!!! -->
              <h2>当前求和为:{this.props.count}</h2>
              <select name="num" id="num" ref={this.selectRef}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>&nbsp;
              <button onClick={this.add}>+</button>&nbsp;
              <button onClick={this.minus}>-</button>&nbsp;
              <button onClick={this.addAsync}>异步+</button>&nbsp;
            </div>
          )
        }
      }
    - 优化一下`容器组件`代码: 不能手动创建 `action` 哦
    - ```jsx
      import { createIncrementAction } from '../../redux/count_action_creator';

      function mapDispatchToProps(dispatch) {
        return {
          add: (number) => {
            // dispatch({ type: 'add', data: number})
            dispatch(createIncrementAction(number))
          }
        }
      }
6. 来看看打印出来的容器组件到底是什么
    - ![](../../image/Snipaste_2022-06-01_21-29-29.png)
#### 优化
1. 改写 `mapDispatchToProps` 函数
    - 由函数写法变成了对象写法. 
    - ```jsx
      // function mapDispatchToProps(dispatch) {
      //   return {
      //     add: (number) => {
      //       dispatch(createIncrementAction(number))
      //     }
      //   }
      // }

      const mapDispatchToProps = {
        add: createIncrementAction
      }
    - 📕 `createIncrementAction` 也是函数哦, 其接收 `data` 作为参数, 返回一个 `action`
    - ```jsx
      function createIncrementAction(data) {
        return {
          type: 'add',
          data,
        }
      }
2. 取消 `subscribe` 回调
    - 在使用 `redux` 时, 需要订阅 `subscribe` 回调来更行整个页面, 因为 `redux` 只负责状态管理. 但是 `connect` 函数帮我们做了检测和更新, 这也是我们不手写类式组件所有容器组件的原因, 因为自己写的没有监听和更新的功能.
    - ```jsx
      // react-redux 检测更听
      // store.subscribe(() => {
      //   ReactDOM.render(
      //     <React.StrictMode>
      //       <BrowserRouter>
      //         <App />
      //       </BrowserRouter>
      //     </React.StrictMode>,
      //     document.getElementById('root')
      //   );
      // })
3. 使用 `Provider`
    - 之前传递 `store` 是通过给容器组件手动注入 `store` `props`, 这样写的问题在于如果有很多个容器组件就要写很多遍 `props`. 使用 `<Provider>` 包裹容器组件可以只写一处而传递多处.
    - 下面是 `App,js`
    - ```jsx
      import { Provider } from 'react-redux';

      function App() {
        return (
          <div className="App">
            <Provider store={store}>
              <Count></Count>
            </Provider>
          </div>
        );
      }
4. 合并容器组件和`UI 组件`
    - 分开写的弊端就是会导致组件太多. 合并写的话, 仍然保留 `container/Count/index.jsx` 这个容器组件, 但是把 UI 组建的定义移到容器组件中
    - ```jsx
      // UI 组件, 不需要暴露
      class Count extends Component {
      }

      function mapStateToProps(state) {
      }
      const mapDispatchToProps = {
      }
      // 只暴露容器组件
      export default connect(mapStateToProps, mapDispatchToProps)(Count);
5. 同样的优化在 `reducer` 和 `action creator` 一样, 因为只有一份 `state`, 而这个 `state` 保存很多数据, 就只能不同的通过 `reducer` 来操作. 
    - 在 `redux` 文件夹下创建 `actions` 文件夹和 `reducers` 文件夹
    - ![](../../image/Snipaste_2022-06-02_22-20-26.png)
## `Hooks`
> [👉中文官网👈](https://zh-hans.reactjs.org/docs/hooks-intro.html) `Hook` 是 `React 16.8` 的新增特性. 它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 `React` 特性.
### `useState`
1. 先看案例
    - ```jsx
      import { useState } from "react";

      export default function Count() {
        const [count, setCount] = useState(0);

        function add() {
          console.log('this in add', this, Count);
          setCount(count + 1);
        }
        return (
          <div>
            <h2>当前求和为: {count}</h2>
            <button onClick={add}>点我+1</button>
          </div>
        )
      }
    - 仅使用这个案例, 就可以完成显示数字并自动加一的效果
2. `Hook` 是什么
    - `Hook` 是一个特殊的函数. `useState` 同样是一个函数, 它接收一个初始的 `state`, 返回包含这个 `state` 和修改这个 `state` 的数组. 因此我们可以通过解构赋值的方式拿到.
    - ```jsx
      /**
       * Returns a stateful value, and a function to update it.
      *
      * @version 16.8.0
      * @see https://reactjs.org/docs/hooks-reference.html#usestate
      */
      function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
    - ![](../../image/Snipaste_2022-06-03_18-11-31.png)
    - 关于初始的 `state`, 不同于 `class` 的是, 我们可以按照需要使用数字或字符串对其进行赋值, 而不一定是对象.
    - 如果想要创建多个 `state`, 只需多次调用 `useState` 即可.
    - ```jsx
      const [count, setCount] = useState(0);
      const [name, setName] = useState('tom');
3. 为什么叫 `useState` 而不是 `createState`
    - 因为 `create` 不准确, `state` 只在组件首次渲染的时候被创建. 下一次重新渲染时, `useState` 会返回给我们当前的 `state`.
4. `setCount`
    - 在修改 `count` 这个 `state` 时, 除了直接写 `setCount(count + 1);` 外, 还可以传入一个函数, 函数的参数是之前的 `state`
    - ```jsx
      function add() {
        // setCount(count + 1);
        setCount(prevValue => {
          console.log('before count is', prevValue);
          return prevValue + 1;
        })
      }
    - ![](../../image/Snipaste_2022-06-03_19-29-16.png)
### `useEffect`
> 可以让你在函数组件中执行副作用操作
1. 数据获取, 设置订阅和手动修改 `DOM` 都属于副作用, `React` 中有两种常见的副作用操作: 需要清除的和不需要清除的.
    - 不需要清除的副作用
      - 比如想在更新 `DOM` 之后额外运行一些代码, 比如发送网络请求, 手动更改 `DOM`, 或者记录日志, 这些都是无需清除的操作, 无需清除的意思就是执行操作后, 就可以忽略它们了.
    - 需要清除的副作用
      - 必须订阅了消息, 或者设置了定时器, 在组件销毁时, 取消订阅和取消定时器是非常重要的, 可以防止内存泄漏.
2. 我们可以把 `useEffect` 看作 `componentDidMount`, `componentDidUpdate` 和 `compoenentWillUnmount` 三个函数的组合. 在类式组件中, 关于副作用都是在这三个钩子中实现的.
3. 不需要清除的副作用
    - 案例: 设置一个点击事件, 并在点击事情发生后更新页面的 `title`
    - ```jsx
      import { useState, useEffect } from "react";

      export default function Title() {
        const [count, setCount] = useState(0);

        useEffect(() => {
          document.title = `点击了 ${count} 次`;
        })

        return (
          <div>
            <h2>点击了: {count}</h2>
            <button onClick={() => setCount(count + 1)}>CLICK ME!</button>
          </div>
        )
      }
    - ![](../../image/Snipaste_2022-06-04_09-27-10.png)
    - `useEffect` 做了什么?
      - 通过 `useEffect` 我们向 `React` 传递了一个函数, 我们称之为 `effect`. `React` 会保存这个函数并在 `DOM` 更新之后调用它.
    - `useEffect` 会在每次选然后都执行吗?
      - 使得, 默认情况下(useEffect只有一个参数), 它在`第一次渲染后`和`每次更新后`都会执行, 相当于 `componentDidMount` 和 `componentDidUpdate` 这两个钩子. `React` 保证每次运行 `effect` 的时候, `DOM` 都已经更新完毕.
      - 但是不同于 `componentDidMount` 和 `componentDidUpdate` 的是, `useEffect` 调度的 `effect` 不会阻塞浏览器更新屏幕, 这让应用看起来响应更快, 大多数情况下, `effect` 不需要同步执行.
3. 需要清除的副作用
    - 你可能觉得需要单独的 `effect` 来清除副作用, 但是由于订阅与取消订阅, 设置定时器和取消定时器等代码的紧密行, `useEffect` 的设计是在同一个地方执行. 
    - 如果 `effect` 返回了一个函数, `React` 将会在执行清除时调用它.
    - ```jsx
      import { useState, useEffect } from "react";
      import { ReactDOM } from "react";

      export default function Timer() {
        const [count, setCount] = useState(0);

        useEffect(() => {
          // 设置定时器
          let timer = setInterval(() => {
            setCount(count + 1);
          }, 1000);
          // 取消定时器
          return () => {
            clearInterval(timer);
          }
        })

        function destroy() {
          ReactDOM.unmountComponentAtNode('root')
        }

        return (
          <div>
            <h2>当前是:{count}</h2>
            <button onClick={destroy}>销毁组件</button>
          </div>
        )
      }
    - 上面的代码没问题, 不过我装的是 `React 18`, 已经废了 `unmountComponentAtNode` 这个 `API`
    - 每个 `effect` 都可以返回一个清除函数. `React` 会在组件卸载时执行清除操作, `React` 会在执行当前 `effect` 之前对上一个 `effect` 进行清除.
3. 使用多个 `Effect` 实现关注点分离
    - 使用 `Hook` 的一个目的就是解决 class 生命周期函数中经常包含不相关的逻辑但, 又想把相关的逻辑分离到不同方法中的问题.
    - 实际上我们可以写多个 `useEffect`, 每一个 `useEffect` 只实现相关的逻辑, 多个 `useEffect` 将按照书写顺序依次执行.
4. 为什么每次更新的时候都要运行 `Effect`
    - 还记得在 `effect` 中返回函数会在组件卸载时调用吗? 实际上 `effect` 的清除阶段在每次重新渲染时都会执行, 而不是只在卸载组件时执行一次.
    - 修改之前的案例: `点击+1`, 将按钮移动到父组件, 然后通过 `props` 传入子组件. 
    - 首先是子组件
    - ```jsx
      import { useEffect } from "react";

      export default function Count(props) {

        useEffect(() => {
          console.log('组件更新了');
          return () => {
            console.log('我被销毁了');
          }
        })
        return (
          <div>
            <h2>当前求和为: {props.count}</h2>
          </div>
        )
      }
    - 然后是父组件
    - ```jsx
      import './App.css';
      import Count2 from './component/Count2'
      import { useState } from 'react';

      function App() {
        const [count, setCount] = useState(0);
        function add() {
          setCount(count+1);
        }
        return (
          <div className="App">
            {/* <Timer></Timer> */}
            <Count2 count={count}></Count2>
            <button onClick={add}>点我+1</button>
          </div>
        );
      }
      export default App;
    - 📕注意下面的顺序, 在 `props` 发生改变后调用 `effect` 前, 调用了 `effect` 的返回值函数哦!(即打印输出的 `我被销毁了`)
    - ![](../../image/Snipaste_2022-06-04_10-54-57.png)
    - 这样做可以避免类式组件 `bug`, 比如官网的例子, 子组件订阅某用户在线专改, 但是该用户信息是 `props` 中传来的
    - ```jsx
       componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }

      componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }
    - 如果父组件传来的 `props` 发生了改变, 上面的写法就会导致显示的仍是之前用户的状态, 为了避免这个问题, 必须先在 `componentDidUpdate` 组件中取消订阅之前用户的状态然后订阅新的用户状态
    - ```jsx
      componentDidUpdate(prevProps) {
      // 取消订阅之前的 friend.id
      ChatAPI.unsubscribeFromFriendStatus(
        prevProps.friend.id,
        this.handleStatusChange
      );
      // 订阅新的 friend.id
      ChatAPI.subscribeToFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }
    - 如果使用 useEffect, 就可以完全避免这样的重复写法
    - ```jsx
      useEffect(() => {
        // 订阅新的 API
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        // props 发生改变, 取消订阅
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      });
5. `useEffect` 的第二个参数
    - 第二个参数是一个数组, 可以用于指定仅在某些变量发生更改时调用 `effect`
    - 之前的写法是没有传递第二个参数, 因此会在组件第一次渲染后和组件更新后调用 `effect`.
    - 如果传递空数组`[]`, 表示只在第一次渲染后执行.
      - ```jsx
        useEffect(() => {
          console.log('组件更新了');
          return () => {
            console.log('我被销毁了');
          }
        })
        useEffect(() => {
          console.log('第一次渲染执行, 之后byebye');
        }, []);
      - ![](../../image/Snipaste_2022-06-04_11-10-14.png)
    - 如果数组中含有变量, `React` 在组件渲染时会比较这个变量, 只有其发生了改变才会重新执行 `effect`. 但是首次渲染也会执行哦! 
      - ```jsx
        useEffect(() => {
          console.log('count 改变了');
        }, [props.count]);
        useEffect(() => {
          console.log('name因为是 undefined, 永远不会变');
        }, [props.name])
      - 📕看下面的截图, 两个 `effect` 在首次渲染时都执行了, 但是只有第一个 `effect` 在 `count` 发生改变时执行了, 而实际代码中父组件没有传给子组件 `name`, `name` 始终为 `undefined`, 因此子组件重新渲染时, 第二个 `effect` 永远不会执行.
      - ![](../../image/Snipaste_2022-06-04_11-15-58.png)
    - 当然, 不论第二个参数传递什么, 只要 `effect` 有返回值, 都会在组件卸载时执行.
### `useRef`
1. `useRef` 返回一个可变的 `ref` 对象, 其 `.current` 属性被初始化为传入的参数(`initialValue`), 返回的 `ref` 对象在组件的整个生命周期内持续存在
    - ```jsx
      import { useRef } from "react"

      export default function Show() {
        const usernameRef = useRef();
        const ageRef = useRef();
        return (
          <div>
            <input type="text" name="username" ref={usernameRef} />&nbsp;
            <input type="text" name="age" ref={ageRef} />&nbsp;
            <button onClick={() => console.log(usernameRef.current.value, ageRef.current.value) }>点我展示输入</button>
          </div>
        )
      }
    - ![](../../image/Snipaste_2022-06-04_14-18-05.png)
- ![](../../image/)
- ![](../../image/)
- ![](../../image/)
- ![](../../image/)
- ![](../../image/)
- ![](../../image/)