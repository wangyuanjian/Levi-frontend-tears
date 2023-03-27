# [Vite](https://vitejs.dev/): 下一代的前端工具链

## 基本知识
Vite 主要由两部分组成
1. 一个开发服务器, 它给予原生 ES 模块提供了丰富的内建功能.
2. 一套构建指令, 它使用 Rollup 打包代码并且是预配置的, 可输出用于生产环境高度优化过的静态资源.

### Hello, World
创建 index.html
```html
<body>
  <script type="module" src="./index.js"></script>
</body>
```
index.js
```js
import { count } from "./counter.js";
console.log('count',count)
```
counter.js
```js
export const count = 1
```
使用 `yarn init -y` 初始化当前项目, 然后 `yarn add vite -D` 安装开发依赖.

在 package.json 中增加启动脚本, 执行 `yarn dev`
```json
"scripts": {
  "dev": "vite"
},
```
![](../image/Snipaste_2023-03-27_21-14-11.png)

### vite 的预构建
预构建的使用场景. 


![](../image/)
谢谢你看到这里😊