# `react-router-6`
> [https://reactrouterdotcom.fly.dev/docs/en/v6](https://reactrouterdotcom.fly.dev/docs/en/v6) \
> 官方推荐使用`函数式组件`

## 一级路由
### `BrowserRouter`
1. 使用 `BrowserRouter` 包裹 `<App />`
    - `index.js`
    - ```jsx
      import { BrowserRouter } from 'react-router-dom';

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      );
2. 使用 `NavLink` 注册路由, 到目前为止, 这部分和 `react-router-dom@5` 都没有不一样
    - 首先看下一下项目结构
    - ![](../../image/Snipaste_2022-06-11_10-13-28.png)
    - ```jsx
      <div className="App">
        <NavLink to="/home">Home</NavLink>|
        <NavLink to="/about">About</NavLink>
        <hr/>
        <Routes>
          <Route path="/home" element={ <Home/> } ></Route>
          <Route path="/about" element={ <About/> } ></Route>

          <!-- v5 -->
          <!-- <Route path="/home" component={Home}></Route> -->
        </Routes>
      </div>
    - 📕`v5` 版本中 `<Route>` 可以单独使用, 不是必须包含在 `<Switch>` 中, 但是 `v6` 版本需要其包含在 `<Routes>` 中, 不然会报错
    ![](../../image/Snipaste_2022-06-11_10-26-14.png)
    - 📕对比下, `v6` 使用 `element={ <About/> }` 的方式取代 `component={Home}`
    - 📕`<Routes>` 包含了 `<Switch>` 的功能, 多个相同 `path` 的 `<Route>` 只会匹配第一个.
3. 实现 `NavLink` 高亮
    - `v5` 通过 `activeClassName` 实现, 但是 `v6` 中 `className` 接收一个函数, 这个函数接收只包含一个属性 `isActive` 的对象作为参数, 当对应的 `NavLink` 有效时, `isActive` 为 `true`
    - ```css
      .peiqi {
        background-color: salmon;
        color: #f0f0f0;
      }
    - ```jsx
      function App() {
        function computeClassName({isActive}) {
          return isActive ? 'peiqi' : '';
        }
        return (
          <div className="App">
            <NavLink className={computeClassName} to="/home">Home</NavLink>|
            <NavLink className={computeClassName} to="/about">About</NavLink>
            <hr/>
            <Routes>
              <Route path="/home" element={ <Home/> } ></Route>
              <Route path="/about" element={ <About/> } ></Route>
              <Route path="/" element={ <Navigate to="/home" /> } ></Route>
            </Routes>
          </div>
        );
      }
### `<Navigate>`
1. 看一个报错 
    - ![](../../image/Snipaste_2022-06-11_10-46-49.png)
    - 这个报错是说, 没有组件匹配 `/` 路由, 在 `v5` 版本中时使用 `Redirect` 配合 `Switch` 进行匹配的, 在 `v6` 中改用 `<Navigate>`
    - ```jsx
      <Routes>
        <Route path="/home" element={ <Home/> } ></Route>
        <Route path="/about" element={ <About/> } ></Route>
        <Route path="/" element={ <Navigate to="/home" /> } ></Route>
      </Routes>
2. `<Navigate>` 只要渲染, 就会引起视图的切换, 也就是改变浏览器的地址
    - 实现一个小功能: 在 `Home` 组件点击按钮去 `About` 否则显示其他文字
    - ```jsx
      export default function Home() {
        const [count, setCount] = useState(0)
        return (
          <div>
            <span>Home</span>
            { count > 0 ? <Navigate to="/about" /> : 'Hello, World' }
            <button onClick={() => setCount(count+1)}>Count+1</button>
          </div>
        )
      }
    - ![](../../image/react-router-navigate.gif)
    - 可以看到, 当点击按钮, 页面从 `0` 变为 `1` 导致 `<Navigate>` 渲染时, 整个页面发生了改变
3. 支持 `replace` 取消 `push` 而是用 `replace` 模式
### `useRoutes`
1. 下面代码中是重复的模式,
    - ```jsx
      <Routes>
        <Route path="/home" element={ <Home/> } ></Route>
        <Route path="/about" element={ <About/> } ></Route>
        <Route path="/" element={ <Navigate to="/home" /> } ></Route>
      </Routes>
    - 可以使用 `useRoutes` 这个 `Hook` 来配置路由信息
    - 首先创建一个文件, 单独配置路由信息
    - ![](../../image/Snipaste_2022-06-12_09-47-33.png)
    - `routes/index.jsx`
    - ```jsx
      import About from　'../pages/About'
      import Home from　'../pages/Home'
      import {  Navigate } from 'react-router-dom';

      export default [
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/',
          element: <Navigate to="/home" />
        },
      ]
    - `app.js`
    - ```jsx
      import './App.css';
      import routes from './routes'
      import { NavLink, useRoutes } from 'react-router-dom';

      function App() {
        function computeClassName({isActive}) {
          return isActive ? 'peiqi' : '';
        }
        const elements = useRoutes(routes)
        return (
          <div className="App">
            <NavLink className={computeClassName} to="/home">Home</NavLink>|
            <NavLink className={computeClassName} to="/about">About</NavLink>
            <hr/>
            {
              elements
            }
          </div>
        );
      }
    - 打印一下看看 elements 究竟是什么
    - ![](../../image/Snipaste_2022-06-12_09-56-37.png)
![](../../image/)
![](../../image/)
![](../../image/)
