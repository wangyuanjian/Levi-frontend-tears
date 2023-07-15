# `Next.js@12.1.6`
> 要求 `Node(12.22+)` 版本


<!-- TOC -->

- [Next.js@12.1.6](#nextjs1216)
  - [安装与简介](#%E5%AE%89%E8%A3%85%E4%B8%8E%E7%AE%80%E4%BB%8B)
  - [页面Pages](#%E9%A1%B5%E9%9D%A2pages)
  - [预渲染Pre-rendering](#%E9%A2%84%E6%B8%B2%E6%9F%93pre-rendering)
    - [Static GenerationSG](#static-generationsg)
      - [没有 data](#%E6%B2%A1%E6%9C%89-data)
      - [有 data](#%E6%9C%89-data)
      - [何时使用 Static GenerationSG](#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-static-generationsg)
    - [Server-side RenderingSSR](#server-side-renderingssr)
  - [数据获取Data Fetching](#%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96data-fetching)
    - [getServerSideProps](#getserversideprops)

<!-- /TOC -->

## 安装与简介
1. 访问[👉官网这个页面👈](https://nextjs.org/learn/basics/create-nextjs-app/setup) 执行后快速搭建一个 `Next.js` 环境
    - 这是项目结构
      - `pages`: 这个文件夹下的文件将`路由`与`文件名`关联起来
      - `public`: 存储静态资源. 这个文件夹下的文件可以在代码中通过 **`/`** 访问
    - ![](../../image/Snipaste_2022-06-17_10-29-47.png)

## 页面(`Pages`)
`Next.js` 是基于 `pages(页面)` 的概念构造的. 而页面就是一个 `React` 组件, 只不过组件是从 `pages` 文件夹下暴露出来的.
  - `pages` 文件夹下的 `index.js` 是访问应用的根路由(`http://localhost:3000/`) 时渲染的. 类似的, `pages/about.js` 就是访问 `http://localhost:3000/about` 时渲染的
  - ```jsx  
    export default function about() {
      return (
        <div>about</div>
      )
    }
  - ![](../../image/Snipaste_2022-06-17_10-42-33.png)
## 预渲染(`Pre-rendering`)
默认情况, `Next.js` 预渲染每个页面, 这意味着 `Next.js` 提前生成页面的 `HTML` 而不是靠客户端 `JavaScript` 完成(`React` 是后者). 预渲染结束在性能和 `SEO(Search Engine Optimization)` 上都表现得更好.

每个生成的 `HTML` 都会有自己的 `JavaScript` 代码, 当页面被浏览器加载完成, `JavaScript` 代码执行然后整个页面才完全可交互. 这个过程叫做 `hydration(中文是水合作用)`

`Next.js` 有两种类型的服务端渲染: `Static Generation(SG)` 和 `Server-side Rendering(SSR)`. 不同之处在于页面的 `HTML` 在什么时候生成的.

`Next.js` 允许我们自己决定每个页面使用哪种类型的渲染. `Next.js` 官网出于性能原因推荐使用 `Static Generation`. 同样的, 也可以使用 `客户端渲染(JavaScript)` 


### `Static Generation(SG)`
> 官网推荐✅

`HTML` 是在 `build` 时生成的, 之后的每次请求都会重用这个 `HTML`
  - 这句话的意思就是当执行 `next build` 命令时, 页面的 `HTML` 就生成好了. `HTML` 可以被 `CDN(Content Distribution Network, 内容分发网络)` 缓存, 从而加速请求过程.

使用 `Static Generation` 时可以选择 `有data` 和 `没有data` 两种形式.
#### `没有 data`
`没有 data` 很好理解, 上面写的 `pages/about.jsx` 就是`没有 data` 的. 默认, `Next.js` 在使用 `Static Generation` 预渲染页面时不会从 `API` 或数据库获取数据
  - 下面就是 `about.jsx`
  - ```jsx
    export default function about() {
      return (
        <div>about</div>
      )
    }
#### `有 data`
有些页面需要获取外部数据才能预渲染. 需要外部数据又分为两种情况
  - 页面的 `内容` 需要外部数据, 使用 **`getStaticProps`**. 
    - 比如现在有个帖子列表页面, 这个页面中的所有帖子信息需要从外部获取.
  - 页面的路径需要外部数据, 使用 **`getStaticPaths`** (通常还需要 `getStaticProps`). 
    - 比如当我们访问帖子详情页面时(`http://localhost:3000/post/038723423`), `URL` 中的 `038723423` 就是帖子的唯一标志(`id`), 是需要从服务器获取的.

1️⃣`情况1`: `内容`需要外部数据
  - 我们先搭建一个外部的服务器, 用来模拟响应请求
  - ```js
    let express = require('express');
    let app = express();

    app.all('*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', "*");
      res.header('Access-Control-Allow-Headers', "*");
      res.header('Access-Control-Allow-Methods', "*");
      if (req.method.toLowerCase() === 'options') {
        res.send(200);
      } else {
        next();
      }
    });

    // 数组参数
    app.get('/postList', (req, res) => {
      const postList = [
        { id: '001', title: 'hello' },
        { id: '002', title: 'BAD' },
        { id: '003', title: 'this' },
        { id: '004', title: 'world' },
      ];
      res.json(postList);
    });

    app.listen(5000, '127.0.0.1', () => {
      console.log('server started');
    });
  - 接着, 创建 `blog.jsx` 这是博客页面, 用来展示帖子列表. 我们的博客页面需要从某个 `CMS(Content Management System, 内容管理系统)` 获取帖子列表数据.
  - ```jsx
    export default function Blog({ postList }) {
      return (
        <>
          <h1>Blog</h1>
          <hr />
          <ul>
            {
              postList.map(post => (
                <li key={post.id}> <a href="#">{post.title}</a> </li>
              ))
            }
          </ul>
        </>
      )
    }
  - 为了在预渲染阶段获取数据, `Next.js` 允许我们 `export` 一个叫做 `getStaticProps` 的 `async` 函数, 这个函数同样写在 `blog.jsx` 中(每一个需要数据的页面都可以有自己的 `getStaticProps`). 这个函数在 `build` 时执行并将返回的数据作为 `props` 传递给 `组件`
    - 📕: 注意函数返回一个对象, 对象的一个属性是 `props`, `props` 里面才是我们真正要传递的数据.
  - ```jsx
    export async function getStaticProps() {
      const res = await fetch('http://localhost:5000/postList');
      const data = await res.json();
      return {
        props: {
          postList: data
        }
      }
    }
  - ![](../../image/Snipaste_2022-06-17_14-25-36.png)
  - 可以通过下面的动图观察, 整个网页在加载时没有发出任何 `XHR/fetch` 请求, 而是直接返回了 `HTML`
  - ![](../../image/next-getStaticProps.gif)
`情况2`: `路径` 需要外部数据
  - `Next.js` 允许我们创建动态路由页面, 比如我们创建 `pages/posts/cover.js`, 就可以通过 `http://localhost:3000/posts/cover` 访问
  - ![](../../image/Snipaste_2022-06-17_14-40-41.png)
  - 对于像 `http://localhost:3000/posts/038723423` 这样的路由, 可以创建 `pages/post/[id].jsx` 的文件来展示单个帖子的详情. 如果帖子的 `id` 为 `100`, 那么访问的 `URL` 就是 `http://localhost:3000/posts/100`
  - 此时, `id` 就是我们在 `build` 时需要依赖外部数据. 如果数据库只有一条数据, 那我们可能只希望预渲染 `/posts/001` 的 `HTML`, 如果有两条, 就需要多渲染 `/posts/002` 的 `HTML`.
  - `Next.js` 允许我们 `export` 一个名为 `getStaticPaths` 的 `async` 函数, 当然在这里例子中, 函数需要写在 `[id].jsx` 中. 这个函数在 `build` 时被调用并且其返回值用来指明预渲染哪些页面.
  - 首先, 还是搭载服务器的内容
  - ```jsx  
    app.get('/post/:id', (req, res) => {
      res.json({
        id: req.params.id,
        title: 'whatsoever~'
      })
    });
  - `getStaticPaths`
    - 📕要固定返回一个属性为 `paths` 的对象, 这个 `paths` 是一个对象数组, 即数组中的每个元素都是对象, 每个对象都要有 `params` 属性, `params` 也是对象, 要有一个 `id` 属性, 这个 `id` 就和文件名中 `[id].jsx` 相对应.
  - 📕`fallback` 为 `false` 表示访问不存在的路由返回 `404` 页面
  - ```jsx
    export async function getStaticPaths() {
      const res = await fetch('http://localhost:5000/postList');
      const posts = await res.json();
      const paths = posts.map(post => ({
        params: {
          id: post.id
        }
      }));
      console.log('paths', paths)
      return {
        paths: paths,
        fallback: false,
      } 
    }
  - 在 `[id].jsx` 中, 同样需要暴露 `getStaticProps` 因为要在这个函数中获取每个帖子的内容
    - 📕可以接收到一个参数, 就是上面 `paths` 数组的每个成员.
  - ```jsx
    export async function getStaticProps({ params }) {
      const res = await fetch(`http://localhost:5000/post/${params.id}`);
      const post = await res.json();
      console.log('post', post);
      return {
        props: {
          id: post.id,
          title: post.title
        }
      }
    }
  - ```jsx
    export default function Post({ id, title }) {
      return (
        <div>
          <article>
            <h1>{title}</h1>
            <small>{id}</small>
          </article>
        </div>
      )
    }
  - ![](../../image/Snipaste_2022-06-17_15-23-25.png)
  - 下面是控制台的输出.
  - ![](../../image/Snipaste_2022-06-17_15-23-56.png)
#### 何时使用 `Static Generation(SG)`
`Next.js` 推荐如果可能尽量使用 `Static Generation` 这样可以一次构建交由 `CDN`, 比每次请求都重新渲染页面更快. 官网举了一些使用 `Static Generation` 的页面
  - `购物页面`
  - `博客页面`
  - `电子商务产品列表`
  - `帮助和文档`

如果在一个用户请求之前不能预渲染页面, 那么 `Static Generation` 就不是一个好主意, 比如页面展现频繁更新的数据或者每次页面的内容根据请求的不同而不同. 这时, 你同样有两种选择
  - 使用 `Static Generation` 配合 `客户端渲染`: 在预渲染阶段取消页面某些内容, 使用浏览器客户端的 `JavaScript` 来渲染这些取消的内容.
  - 使用 `Server-side Rendering(SSR)`: 在每次 `URL` 请求时预渲染页面. 这比 `CDN` 缓存稍慢一些但是预渲染的页面总是最新的. 
### `Server-side Rendering(SSR)`
> 也叫做 `SSR` 或 `Dynamic Rendering`

`HTML` 在 **`每次请求`** 时生成. 如果要使用 `Server-side Rendering`, 需要 `export` 一个名为 `getServerSideProps` 的 `async` 函数. 这个函数在每次请求时都会被调用.
  - 首先先写服务器端代码
  - ```js
    app.get('/userInfo', (req, res) => {
      res.json({
        name: 'tom',
        age: '19',
        job: 'Front-end Engineer'
      })
    });
  - ```jsx
    export default function Info({ name, age, job }) {
      return (
        <div>
          <section>
            <h1>{name}</h1>
            <small>{age}</small> -
            <span>{job}</span>
          </section>
        </div>
      )
    }

    export async function getServerSideProps() {
      const res = await fetch(`http://localhost:5000/userInfo`);
      const user = await res.json();
      console.log('user', user);
      return {
        props: {
          name: user.name,
          age: user.age,
          job: user.job,
        }
      }
    }
  - ![](../../image/Snipaste_2022-06-17_15-59-54.png)
## 数据获取(`Data Fetching`)
### `getServerSideProps`
> `Next.js` 在每次请求时使用 `getServerSideProps` 返回的数据进行预渲染.

什么时候 `getServerSideProps` 运行. 永远只在服务端运行而不会在浏览器运行.
  - 如果直接通过 `URL` 访问这个页面, 那么 `getServerSideProps` 每次都会运行并且其返回值作为 `props`
  - 如果通过客户端的链接比如 `next/link` 或 `next/router` 跳转, `Next.js` 就会给服务器发送一个 `API` 请求, 此时运行 `getServerSideProps`

`getServerSideProps` 返回 `JSON` 用来渲染页面, 所有这一切都由 `Next.js` 自动完成我们不需要做任何事情只需要定义 `getServerSideProps` 函数
  - `getServerSideProps` 只能在 `page`(就是目录`pages`下的文件) 被暴露, 其他非 `page` 的文件不能暴露 `getServerSideProps`
  - `getServerSideProps` 暴露是必须作为一个独立的函数, 不能作为组件的属性等.

`getServerSideProps` 可以接收哪些参数?
  - ```jsx
    export type GetServerSidePropsContext<
      Q extends ParsedUrlQuery = ParsedUrlQuery,
      D extends PreviewData = PreviewData
    > = {
      req: IncomingMessage & {
        cookies: NextApiRequestCookies
      }
      res: ServerResponse
      params?: Q
      query: ParsedUrlQuery
      preview?: boolean
      previewData?: D
      resolvedUrl: string
      locale?: string
      locales?: string[]
      defaultLocale?: string
    }
  - 来看下每个参数都是什么意思
    - `req`: `IncomingMessage` 对象;
    - `res`: `ServerResponse` 对象;
    - `params`: 如果这个页面使用动态路由, 那么 `params` 就包含路由参数. 比如页面的名字是 `[id].jsx`, 那么 `params` 就像 `{ id: ... }`;
    - `query`: 表示 `query` 的对象;
    - `preview`: 如果页面处在 `Preview Mode` 为 `true` 否则为 `false`;
    - `previewData`: 由 `setPreviewData` 设置的 `data`;
    - `resolvedUrl`: 
    - `locale`: 
    - `locales`: 
    - `defaultLocale`: 

`getServerSideProps` 可以返回哪些参数?
  - 可以返回包含任意一个以下属性的对象
  - **`props`**
    - `props` 对象是 `key-value` 对, 每个值都可以被页面组件接收. 这个对象应该是一个可序列化的对象, 即可以被 `JSON.stringify` 序列化的对象.
    - ```jsx
      export async function getServerSideProps() {
        const res = await fetch(`http://localhost:5000/userInfo`);
        const user = await res.json();
        console.log('user', user);
        return {
          props: {
            name: user.name,
            age: user.age,
            job: user.job,
          }
        }
      }
  - **`notFound`**
    - `notFound` 是一个 `boolean` 值, 允许页面返回 `404 HTTP` 状态码和 `404` 页面. 通常的使用场景是用户生成的内容但是被用户自己删除了.
    - ```jsx
      export async function getServerSideProps() {
        const res = await fetch(`http://localhost:5000/userInfo`);
        const user = await res.json();
        console.log('user', user);
        if (true) {
          return {
            notFound: true,
          };
        }
      }
    - ![](../../image/Snipaste_2022-06-18_07-22-23.png)
  - **`redirect`**
    - `redirect` 对象允许重定向至内部或外部资源. 下面是 `TypeScript` 中对返回对象的类型定义. [👉也可以访问这里查看定义👈](https://nextjs.org/docs/api-reference/next.config.js/redirects)
      - `basePath`: `false` 或 `undefined`, 如果为 `false` 表示 `basePath` 不会被包含
      - `destination`: 想要路由的地址
      - `permanent`: 如果为 `true`, 将返回 `308` 状态码(`Permanent Redirect`), 这个状态码将告诉客户端或搜索引擎缓存这个重定向; 如果为 `false`, 将返回 `307` 状态码(`Temporary Redirect`), 表示重定向是临时的, 不需要缓存.
      - `307 VS 308`: 传统来说, `302` 表示临时重定向, `301` 表示永久重定向. 但是许多浏览器不管原来的请求方法是什么, 都将重定向的请求方法改为 `GET`. 例如, 如果浏览器请求 `POST /v1/users`, 服务器返回 `302` 并重定向到 `/v2/users` 那么这个重定向的可能是 `GET /v2/users`. `Next.js` 使用 `307` 和 `308` 明确地指出要保留原来请求的请求方法.
    - ```jsx
      export type Redirect =
      | {
          statusCode: 301 | 302 | 303 | 307 | 308
          destination: string
          basePath?: false
        }
      | {
          permanent: boolean
          destination: string
          basePath?: false
        }
      ```
    - 看看不同的返回值
      - 下面这个是区分 `307` 和 `308` 的
      - ```jsx
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      - ![](../../image/Snipaste_2022-06-18_09-12-14.png)
      - ![](../../image/next-getServerSideProps-redirect.gif)

`getServerSideProps VS API Route`
  - `API Route` 是 `Next.js` 构建 `API` 的一个方式. 比如你可以创建一个 `API Route` 然后在其中写请求后台或数据库的方法.
  - 这个 `VS` 的意思是我们打算在 `API Route` 中从服务器获取数据然后在 `getServerSideProps` 中调用 `API Route`. 这是不必要且低效的做法. ❎
  - 官网推荐的是将写在 `API Route` 中的逻辑写在 `getServerSideProps` 中.

在客户端获取数据
  - 如果页面包含很多经常更新的数据而且不需要预渲染, 可以在客户端发送数据请求.
  - 这种模式在用户仪表盘页面, 因为仪表盘是私有的, 每一个用户不同的, `SEO` 不感冒的.
  - ```jsx
    export default function InfoClient() {
      const [name, setName] = useState('');
      const [age, setAge] = useState(0);
      useEffect(async () => {
        const res = await fetch(`http://localhost:5000/userInfo`);
        const user = await res.json();
        console.log('user', user);
        setName(user.name);
        setAge(user.age);
      }, []);
      // (async function(){
      //   const res = await fetch(`http://localhost:5000/userInfo`);
      //   const user = await res.json();
      //   console.log('user', user);
      //   setName(user.name);
      //   setAge(user.age);
      // })();
      return (
        <div>
          <section>
            <h1>{name}</h1>
            <small>{age}</small> -
          </section>
        </div>
      )
    }
  - 可以看到, 我们将客户端请求的代码写在 `useEffect` 中, 浏览器也发出了请求
  - ![](../../image/Snipaste_2022-06-20_21-23-46.png)
  - 📕注意📕我注释掉了代码中立即执行表达式的部分, 因为这样会导致发不止一个请求, 很奇怪, 还不知道为什么. 更新: 可能是因为 `useEffect` 在开发模式下默认调用 `2` 次吧~

`500`
  - 如果某个异常在 `getServerSideProps` 中被抛出, 那么会展示 `pages/500.js` 文件. 在开发模式下, `500.js` 不会使用而会展示对应的 `开发模式提示`, 如下图.
  - ![](../../image/Snipaste_2022-06-20_21-38-27.png)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
`Next.js`