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
      - [textarea](#textarea)

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
    - 如果想要解决这个问题, 官网建议使用 class 绑定的函数方式
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
1. `createRef()` 是 React 目前推荐的创建 ref 的方式
    - 使用 `React.createRef()` 创建 `refs`, 并通过 `ref` 属性附加到 `React` 元素. 
    - 当 `ref` 被传递给 `render` 中的元素时, 对该节点的引用可以在 ref 的 `current` 属性中被访问
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
      - ![](../../image/Snipaste_2022-05-01_09-05-28.png)
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
#### textarea
    - ![](../../image/)
    - ![](../../image/)

- ![](../../image/)