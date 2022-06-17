
<!-- TOC -->

- [`Next.js`](#nextjs)
  - [安装与简介](#安装与简介)
  - [页面(`Pages`)](#页面pages)
  - [预渲染(`Pre-rendering`)](#预渲染pre-rendering)
    - [`Static Generation(SG)`](#static-generationsg)
      - [`没有 data`](#没有-data)
      - [`有 data`](#有-data)
      - [何时使用 `Static Generation(SG)`](#何时使用-static-generationsg)
    - [`Server-side Rendering(SSR)`](#server-side-renderingssr)
  - [数据获取(`Data Fetching`)](#数据获取data-fetching)
    - [`getServerSideProps`](#getserversideprops)

<!-- /TOC -->
# `Next.js`
> 要求 `Node(12.22+)` 版本

## 安装与简介
1. 访问[👉官网这个页面👈](https://nextjs.org/learn/basics/create-nextjs-app/setup) 执行后快速搭建一个 `Next.js` 环境
    - 这是项目结构
      - `pages`: 这个文件夹下的文件都将`路由`与`文件名`关联起来
      - `public`: 存储静态资源. 这个文件夹下的文件可以在代码中通过 **`/`** 访问
    - ![](../../image/Snipaste_2022-06-17_10-29-47.png)

## 页面(`Pages`)
1. `Next.js` 是基于 `pages(页面)` 的概念构造的. 而页面就是一个 `React` 组件, 只不过这个组件是从 `pages` 这个文件夹下暴露出来的.
    - `pages` 文件夹下的 `index.js` 是访问应用的根路由(`http://localhost:3000/`) 时渲染的. 类似的, `pages/about.js` 就是访问 `http://localhost:3000/about` 时渲染的
    - ```jsx  
      export default function about() {
        return (
          <div>about</div>
        )
      }
    - ![](../../image/Snipaste_2022-06-17_10-42-33.png)
## 预渲染(`Pre-rendering`)
1. 默认情况, `Next.js` 预渲染每个页面, 这意味着 `Next.js` 提前生成页面的 `HTML` 而不是靠客户端 `JavaScript` 完成(`React` 是后者). 预渲染结束在性能和 `SEO(Search Engine Optimization)` 上都表现得更好.
2. 每个生成的 `HTML` 都会有自己的 `JavaScript` 代码, 当页面被浏览器加载完成, `JavaScript` 代码执行然后整个页面才完全可交互. 这个过程叫做 `hydration(中文是水合作用)`
3. `Next.js` 有两种类型的服务端渲染: `Static Generation(SG)` 和 `Server-side Rendering(SSR)`. 这两种不同之处是页面的 `HTML` 在什么是生成的.
4. `Next.js` 允许我们自己决定每个页面使用哪种类型的渲染. `Next.js` 官网处于性能原因推荐使用 `Static Generation`. 同样的, 也可以使用 `客户端渲染(JavaScript)` 


### `Static Generation(SG)`
> 官网推荐✅
1. `HTML` 是在 `build` 时生成的, 之后的每次请求都会重用这个 `HTML`
    - 这句话的意思就是当执行 `next build` 命令时, 页面的 `HTML` 就生成好了. `HTML` 可以被 `CDN(Content Distribution Network, 内容分发网络)` 缓存, 从而加速请求过程.
2. 在 `Next.js` 使用 `Static Generation` 时可以选择 `有data` 和 `没有 data` 两种形式.
#### `没有 data`
1. `没有 data` 很好理解, 上面写的 `pages/about.jsx` 就是`没有 data` 的. 默认, `Next.js` 在使用 `Static Generation` 预渲染页面时不会从 `API` 或数据库获取数据
    - 下面就是 `about.jsx`
    - ```jsx
      export default function about() {
        return (
          <div>about</div>
        )
      }
#### `有 data`
1. 有些页面需要获取外部数据才能预渲染. 需要外部数据又分为两种情况
    - 页面的 `内容` 需要外部数据, 使用 **`getStaticProps`**. 
      - 比如现在有个帖子列表页面, 这个页面中的所有帖子信息需要从外部获取.
    - 页面的路径需要外部数据, 使用 **`getStaticPaths`** (通常还需要 `getStaticProps`). 
      - 比如当我们访问帖子详情页面时(`http://localhost:3000/post/038723423`), `URL` 中的 `038723423` 就是帖子的唯一标志(`id`), 是需要从服务器获取的.
2. `情况1`: `内容`需要外部数据
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
    - 为了在预渲染阶段获取数据, `Next.js` 允许我们 `export` 一个叫做 `getStaticProps` 的 `async` 函数, 这个函数同样写在 `blog.jsx` 中(每一个需要数据的页面都可以有自己的 `getStaticProps`). 这个函数在 `build` 时会被执行并将返回的数据作为 `props` 传递给 `组件`
      - 📕: 注意函数的返回一个对象, 对象的一个属性是 `props`, `props` 里面才是我们真正要传递的数据.
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
3. `情况2`: `路径` 需要外部数据
    - `Next.js` 允许我们创建动态路由页面, 比如我们创建 `pages/posts/cover.js`, 就可以通过 `http://localhost:3000/posts/cover` 访问
    - ![](../../image/Snipaste_2022-06-17_14-40-41.png)
    - 对于像 `http://localhost:3000/posts/038723423` 这样的路由, 可以创建 `pages/post/[id].jsx` 的文件来展示单个帖子的详情. 如果帖子的 `id` 为 `100`, 那么访问的 `URL` 就是 `http://localhost:3000/posts/100`
    - 此时, `id` 就是我们在 `build` 时需要依赖外部数据. 如果数据库只有一条数据, 那我们可能只希望预渲染 `/posts/001` 的 `HTML`, 如果有两条, 就需要多渲染 `/posts/002` d的 `HTML`.
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
      - 📕`fallback` 为 false 表示访问不存在的路由返回 `404` 页面
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
1. `Next.js` 推荐如果可能尽量使用 `Static Generation` 这样可以一次构建交由 `CDN`, 比每次请求都重新渲染页面更快. 官网举了一些使用 `Static Generation` 的页面
    - `购物页面`
    - `博客页面`
    - `电子商务产品列表`
    - `帮助和文档`
2. 如果在一个用户请求之前不能预渲染页面, 那么 `Static Generation` 就不是一个好主意, 比如你的页面展现频繁更新的数据或者每次页面的内容根据请求的不同而不同. 这时, 你同样有两种选择
    - 使用 `Static Generation` 配合 `客户端渲染`: 在预渲染阶段取消页面某些内容, 使用浏览器客户端的 `JavaScript` 来渲染这些取消的内容.
    - 使用 `Server-side Rendering(SSR)`: 在每次 `URL` 请求时预渲染页面. 这笔 CDN 缓存稍慢一些但是预渲染的页面总是最新的. 
### `Server-side Rendering(SSR)`
> 也叫做 `SSR` 或 `Dynamic Rendering`
1. HTML 在 **`每次请求`** 时生成. 如果要使用 `Server-side Rendering`, 需要 `export` 一个名为 `getServerSideProps` 的 `async` 函数. 这个函数在每次请求时都会被调用.
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
1. 
![](../../image/)
![](../../image/)
`Next.js`