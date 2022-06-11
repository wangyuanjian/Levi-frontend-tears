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
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
