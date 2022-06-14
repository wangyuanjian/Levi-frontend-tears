# `react-router-6`
> [https://reactrouterdotcom.fly.dev/docs/en/v6](https://reactrouterdotcom.fly.dev/docs/en/v6) \
> 官方推荐使用`函数式组件`

<!-- TOC -->

- [`react-router-6`](#react-router-6)
    - [`BrowserRouter`](#browserrouter)
    - [`<Navigate>`](#navigate)
    - [`useRoutes`](#useroutes)
    - [嵌套路由](#嵌套路由)
    - [路由传参](#路由传参)
      - [`params` 参数](#params-参数)
      - [`search` 参数](#search-参数)

<!-- /TOC -->
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
### 嵌套路由
1. 创建两个子页面作为 `Home` 的二级页面
    - ![](../../image/Snipaste_2022-06-12_10-06-41.png)
    - 修改路由表, 引入二级组件: `children`
    - ```jsx
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            path: 'news',
            element: <News />
          },
          {
            path: 'message',
            element: <Messages />
          }
        ]
      },
    - 接下来修改 `Home` 组件: 注册路由, 展示路由组件 `<Outlet>`
      - 在 `v5` 版本中, 展示子组件是靠着 `Route`, 但是现在使用了路由表, 就得告诉 `React` 在父组件的哪个位置(槽位)展示子组件
    - ```jsx
      import React from 'react'
      import { Outlet, NavLink } from 'react-router-dom';

      export default function Home() {
        function computeClassName({isActive}) {
          return isActive ? 'peiqi' : '';
        }
        return (
          <div>
            <h4>Home</h4>
            <NavLink className={computeClassName} to="news">news</NavLink>|
            <NavLink className={computeClassName} to="/home/message">message</NavLink>
            <hr />
            <Outlet></Outlet>
          </div>
        )
      }
### 路由传参
1. 创建 `Detail` 组件用来展示 `News` 传来的参数
    - ```jsx
      import React from 'react'

      export default function Detail() {
        return (
          <div>
            Detail
          </div>
        )
      }
2. 首先修改 `News` 组件. 将每条 `News` 用 `Link` 包裹, 并使用 `Outlet` 展示 `Detail` 组件.
    - ```jsx
      import React from 'react';
      import { Link, Outlet } from 'react-router-dom';

      export default function News() {
        const newsList = [
          { id: '001', title: 'News1' },
          { id: '002', title: 'News2' },
          { id: '003', title: 'News3' },
        ]
        return (
          <div>
            <ul>
              {
                newsList.map(news => {
                  return (
                    <li key={news.id}>
                      <Link to="detail">{news.title}</Link>
                    </li>
                  ) 
                })
              }
            </ul>
            <hr />
            <Outlet />
          </div>
        )
      }
3. 增加路由表中 `Detail` 路由的位置
    - ```jsx
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            path: 'news',
            element: <News />,
            children: [
              {
                path: 'detail',
                element: <Detail />
              }
            ]
          },
          {
            path: 'message',
            element: <Messages />
          }
        ]
      },
#### `params` 参数
1. 使用 `/detail/:id/:title` 使用这种形式, 传递 `params` 参数. 首先修改 `News` 组件
    - ```jsx
      return (
        <div>
          <ul>
            {
              newsList.map(news => {
                return (
                  <li key={news.id}>
                    <Link to={`detail/${news.id}/${news.title}`}>{news.title}</Link>
                  </li>
                ) 
              })
            }
          </ul>
          <hr />
          <Outlet />
        </div>
      )
2. 修改路由表, 在路由后面指定需要的参数
    - ```jsx
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            path: 'news',
            element: <News />,
            children: [
              {
                path: 'detail/:id/:title',
                element: <Detail />
              }
            ]
          },
          {
            path: 'message',
            element: <Messages />
          }
        ]
      },
3. 使用 `useParams` 钩子, 获得传来的 `params` 参数
    - ```jsx
      import React from 'react'
      import { useParams } from 'react-router-dom'

      export default function Detail() {
        const params = useParams();
        console.log('params', params);
        return (
          <div>
            <ol>
              <li>ID: {params.id}</li>
              <li>TITLE: {params.title}</li>
            </ol>
          </div>
        )
      }
    - ![](../../image/Snipaste_2022-06-14_15-44-52.png)
4. 如果某一个路由组件只需要参数呢, 比如微博 `https://www.weibo.com/232429834`, 后面的 `232429834` 就是用户`id`, 这个时候该怎么传递呢? 其实和前面的一样,
    - `Message.jsx`
      - ```jsx
        export default function Messages() {
          return (
            <div>
              <ul>
                <Link to="123">Messages1</Link>
                <Link to="456">Messages2</Link>
                <Link to="789">Messages3</Link>
              </ul>
              <hr />
              <Outlet></Outlet>
            </div>
          )
        }
    - `路由 index.jsx`
      - ```jsx
        {
          path: 'message',
          element: <Messages />,
          children: [
            {
              path: ':id',
              element: <Profile />
            }
          ]
        }
    - 使用参数 `Profile.jsx`
      - ```jsx
        import React from 'react'
        import { useParams } from 'react-router-dom'

        export default function Profile() {
          const { id } = useParams();
          console.log('id', id); 
          return (
            <div>Profile</div>
          )
        }
    - 这样就可以了, 只是写法有些怪, 会让人担心这样的写法究竟对不对.
#### `search` 参数
1. 使用 `search` 参数的形式 `/detail?id=001&title=hello`
    - `News.jsx`
    - ```jsx
      newsList.map(news => {
        return (
          <li key={news.id}>
            <Link to={`detail?id=${news.id}&title=${news.title}`}>{news.title}</Link>
          </li>
        ) 
      })
    - `路由: 直接写路由, 不需要提前准备好参数`
    - ```jsx
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            path: 'news',
            element: <News />,
            children: [
              {
                path: 'detail',
                element: <Detail />
              }
            ]
          },
          {
            path: 'message',
            element: <Messages />
          }
        ]
      },
    - `Detail.jsx`: 使用 `useSearchParams` 钩子
    - ```jsx
      import React from 'react'
      import { useSearchParams } from 'react-router-dom'

      export default function Detail() {
        const [ searchParams, setSearchParams ]= useSearchParams();
        console.log('searchParams', searchParams);
        console.log('setSearchParams', setSearchParams);
        const id = searchParams.get('id');
        const title = searchParams.get('title');
        return (
          <div>
            <ol>
              <li>ID: {id}</li>
              <li>TITLE: {title}</li>
            </ol>
          </div>
        )
      }
    - 从下图中可以看到 `searchParams` 就是要传来的参数, 但是不能直接获取, 需要使用其原型链上的 `get` 方法.

    - ![](../../image/Snipaste_2022-06-14_16-46-15.png)
2. `setSearchParams`
    - 这个函数用来修改 `search` 参数的值. 下面增加一个按钮
    - ```jsx
      <button onClick={() => setSearchParams(`id=999&title=blahblah`)}>更新search参数</button> 
    - ![](../../image/react-router-setSearchParams.gif)
![](../../image/)
![](../../image/)
