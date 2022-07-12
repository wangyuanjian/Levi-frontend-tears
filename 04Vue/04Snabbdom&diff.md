# `Diff`
## `snabbdom`
> 是虚拟 `DOM` 算法的库, `snabbdom` 是瑞典语, `速度` 的意思. 这里是官网[👉https://github.com/snabbdom/snabbdom👈](https://github.com/snabbdom/snabbdom)
1. 开始搭建环境
    - 初始化项目
      - ```shell
        npm init -y
    - 安装依赖
      - ```shell
        npm install snabbdom@3.5.1
        npm install -D webpack@5.72.0 webpack-cli@4.10.0 webpack-dev-server@4.8.1
    - 创建 `webpack.config.js`
      - ```js
        const path = require('path');
        module.exports = {
          mode: 'development',
          entry: './src/index.js',
          output: {
            publicPath: '/dist/',
            filename: 'bundle.js'
          },
          devServer: {
            host: 'localhost',
            port: '3000',
            open: true,
          },
        };
      - 📕注意这里使用的是 `publicPath`, 不同于 `path` 会在磁盘生成对应的文件, `publicPath` 的文件生成在内存中.
    - 创建 `src/index.js`
      - ```js
        import { init, classModule, propsModule, styleModule, eventListenersModule, h } from "snabbdom";

        console.log('hello, vDom');
        const patch = init([
          // Init patch function with chosen modules
          classModule, // makes it easy to toggle classes
          propsModule, // for setting properties on DOM elements
          styleModule, // handles styling on elements with support for animations
          eventListenersModule, // attaches event listeners
        ]);

        const container = document.getElementById("container");

        const vnode = h("div#container.two.classes", { on: { click: () => {} } }, [
          h("span", { style: { fontWeight: "bold" } }, "This is bold"),
          " and this is just normal text",
          h("a", { props: { href: "/foo" } }, "I'll take you places!"),
        ]);
        // Patch into empty DOM element – this modifies the DOM as a side effect
        patch(container, vnode);

        const newVnode = h(
          "div#container.two.classes",
          { on: { click: () => {} } },
          [
            h(
              "span",
              { style: { fontWeight: "normal", fontStyle: "italic" } },
              "This is now italic type"
            ),
            " and this is still just normal text",
            h("a", { props: { href: "/bar" } }, "I'll take you places!"),
          ]
        );
        // Second `patch` invocation
        patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
    - 创建 `public/index.html`
      - ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <h1>Hello, VDOM</h1>
          <div id="container"></div>
          <!-- 引入js -->
          <script src="/dist/bundle.js"></script>
        </body>
        </html>
    - 在 `package.json` 中增加启动脚本
      - ```json
        "scripts": {
          "dev": "webpack-dev-server"
        },
    - 启动项目
      - ```shell
        npm run dev
    - ![](../../image/Snipaste_2022-07-12_08-38-04.png)
## `Virtual DOM`
1. 虚拟节点
    - ```ts
      export interface VNode {
        sel: string | undefined;
        data: VNodeData | undefined;
        children: Array<VNode | string> | undefined;
        elm: Node | undefined;
        text: string | undefined;
        key: Key | undefined;
      }
    - 虚拟 `DOM` 使用 `JavaScript` 对象描述 `DOM` 的层次结构.
      - `sel`: 是 `CSS` 选择器.
      - `data`: (可选)增加 `modules` 访问和操作真实 `DOM` 的信息; 增加 `style`, `class`, `attribute` 等.
      - `children`: (可选)当前节点的子节点的虚拟 `DOM` 数组.
      - `elm`: 当前虚拟节点对应的真实 `DOM`. 如果为 `undefined` 表示还没有渲染到页面.
      - `text`: 当前节点只有一个文本孩子节点.
      - `key`: 如果在 `data` 中有 `key` 属性那么虚拟节点就会存在`.key` 属性.
        - `.key` 属性用来保持对已经存在的真实 DOM 节点的指向, 避免不必要的重新创建.
        - `data` 中的 `key` 必须是 `string` 或者 `number` 类型.
        - 在所有的兄弟节点中, `key` 必须独一无二.
      - ![](../../image/Snipaste_2022-07-12_09-43-22.png)
      - ![](../../image/Snipaste_2022-07-12_09-43-42.png)
    - `diff` 算法发生在新的虚拟 `DOM` 和旧的虚拟 `DOM` 之间的比较, 最后将更新反映在真正的 `DOM` 上.
2. 注意 `text` 和 `children`  
    - 如果有 `text`, 那 `children` 就是 `undefined`; 如果有 `children`, 那么 `text` 就是 `undefined`
    - ![](../../image/Snipaste_2022-07-12_10-51-28.png)
## `h`
1. 使用 `h` 函数创建虚拟节点. 
    - 接收三个参数
      - `HTML` 的 `tag` 或者 `选择器`, 字符串类型
      - 可选的对象
      - 可选的字符串或者子节点数组.
    - ```js
      let aVDom = h("a", { props: { href: "/bar" } }, "I'll take you places!");
      console.log('aVDom', aVDom);
    - ![](../../image/Snipaste_2022-07-12_09-43-22.png)
    - ![](../../image/Snipaste_2022-07-12_09-43-42.png)
2. 嵌套使用 `h` 函数从而得到虚拟 `DOM` 树.
    - ```
      const ul = h('ul', {}, [
        h('li'  , {}, '你好'),
        h('li', {}, [
          h('span', {}, '早上好')
        ])
      ]);
    - 创建 `ul` 节点, 其有两个 `li` 子节点, 第一个 `li` 的内容是文本 `你好`; 第二个 `li` 内容是 `HTML` 元素 `<span>`
    - ![](../../image/Snipaste_2022-07-12_10-50-03.png)
    - ![](../../image/Snipaste_2022-07-12_10-51-28.png)
### 手写 `h`
1. 

![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)