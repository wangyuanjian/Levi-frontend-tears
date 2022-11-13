<!-- TOC -->

- [canvas](#canvas)
  - [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
    - [渲染文本](#%E6%B8%B2%E6%9F%93%E6%96%87%E6%9C%AC)
  - [画图形](#%E7%94%BB%E5%9B%BE%E5%BD%A2)
    - [绘制路径](#%E7%BB%98%E5%88%B6%E8%B7%AF%E5%BE%84)
    - [绘制三角形](#%E7%BB%98%E5%88%B6%E4%B8%89%E8%A7%92%E5%BD%A2)

<!-- /TOC -->

# canvas

## 基本使用
```html
<canvas id="canvasDraw" width="200" height="200"></canvas>
```
`<canvas>` 和 `<img>` 元素很像, 但是它自身只有 `width` 和 `height` 这两个可选属性, 而 `id` 属性是所有 `HTML` 元素都有的全局属性. 如果省略了 `width` 和 `height`, 那么 `<canvas>` 将默认 `300px` 宽和 `150px` 高.

如果渲染出来的 `<canvas>` 有些扭曲, 那么尝试给 `<canvas>` 元素加上 `width` 和 `height` 属性, 而不是使用 `CSS`

`<canvas>` 元素可以像一般的图像一样增加样式, 但是这些样式却不会影响在 `<canvas>` 上实际的绘制. 如果没有任何样式, `<canvas>` 初始时就是透明

![](../../image/Snipaste_2022-11-12_15-31-40.png)

就像 `img` 的 alt 属性一样, `<canvas>` 也要提供一个兜底的内容, 在其无法加载或浏览器不支持 `<canvas>` 的情况下显示. 兜底内容是很有必要的, 因为 `<canvas>` 不具备任何可访问性, 因此类似屏幕阅读器这样的辅助工具才可以识别出 `<canvas>` 中的兜底内容.
```html
<canvas id="canvasDraw" width="200" height="200">
  <h4>Sorry Canvas is not available on your agent.</h4>
</canvas>
```
最后就是 `<canvas>` 元素要求结束标签 `</canvas>`, 不可以🙅是自结束的. 如果没有提供结束标签, 那么 `<canvas>` 后面的元素都将被认为是兜底内容.

### 渲染文本
`<canvas>` 创建了一个大小固定的绘制接口, 这个接口暴露了一个或多个的`渲染上下文(rendering context)`, 通过渲染上下文可以创建和操纵展示的内容. 渲染上下文不仅有 `2D` 的, 还有 `3D` 的.

通过调用 `canvas` 的 `getContext()` 方法可以获得渲染上下文. 这个方法接收一个参数, 及渲染上下文的类型. 如果我们要获得 `2D` 类型的渲染上下文, 就传字符串 `'2d'` 即可.
```js
const canvas = document.getElementById('canvasDraw')
const context = canvas.getContext('2d')
```
当然对于不支持 `<canvas>` 的浏览器, 脚本不能继续执行下去, 通过判断 `canvas` 元素是否有 `getContext` 方法来检测浏览器的是否支持 `<canvas>`

```js
const canvas = document.getElementById('canvasDraw')
if (!canvas.getContext) {
  // ...
} else {
  const context = canvas.getContext('2d')
}
```

最后扯一点和布局有关的, `<canvas>` 和 `<img>` 一样, `display` 默认为 `inline`, 所以即便有了宽度也无法通过 `margin: 0 auto;` 居中, 如果想要居中, 就改成 `display: block;`

## 画图形 
### 绘制路径
路径(`path`)由许多点连接而成, 连接这些点的可以是不同的形状——曲线或直线、不同宽度和不同颜色. 任何一个路径, 甚至子路径都是可以闭合的. 使用路径绘制图形需要下面一些步骤
- 创建路径起点
- 使用画图命令画出路径
- 描边(`stroke`)路径或填充(`fill`)路径来渲染图形

绘制路径需要以下的 API
- `beginPath`
  - 这个方法清空子路径列表并新建一条路径. 没有参数, 无返回值(返回 `undefined`). 
- `closePath`
  - 尝试从当前点添加一条直线到当前子路径的起点. 如果图形已经闭合或者只有一个点, 那么这个函数什么也不做. 关于子路径看下面的 `moveTo`
- `stroke`
  - 绘制当前路径或给定路径.
- `fill`
  - 填充路径组成的封闭区域

1️⃣第一步就调用 `beginPath()` 创建一个路径(`Path`). 在内部, 路径是由子路径(`sub-path`)列表组成的, 子路径可以是直线、弧线等等. 每次调用 `beginPath` 方法子路径列表都会被清空, 然后我们可以绘制新的形状.

📖注意: 如果当前路径为空, 比如刚刚调用了 `beginPath()`, 那么第一个路径构建命令就是调用 `moveTo()`.

看下面的例子
> 😄顺带说一下在 `VS Code` 中写 `canvas` 没有提示的问题如何解决, 那就是在获取 `canvas` 元素的那一行前面加上注解, [可以看这里](https://stackoverflow.com/questions/32201725/html5-canvas-intellisense-in-visual-studio-code)
```js
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvasDraw')
if (!canvas.getContext) {

} else {
  const ctx = canvas.getContext('2d')

  ctx.beginPath()
  ctx.moveTo(10, 10) // 第一个子路径
  ctx.lineTo(200, 10)

  ctx.moveTo(10, 200) // 第二个子路径
  ctx.lineTo(200, 200)
  
  ctx.stroke()
}
```
从上面的例子就比较容易理解路径和子路径了, 不然 `closePath` 这个方法的解释让初学者很迷.

2️⃣第二步就是调用那些真正绘制路径的方法啦.

3️⃣第三步是可选的的一步, 就是调用 `closePath`.

📖注意: 当调用 `fill` 方法时, 任何非封闭的图形都会自动封闭, 因此没有必要调用 `closePath`. 而调用 `stroke` 却不是这样.

### 绘制三角形
画三角形的思路就是画两条边, 然后调用 `fill` 方法. 例子中绘制一个等边三角形
```js
ctx.beginPath();
ctx.moveTo(100, 10)
ctx.lineTo(200, 10)
ctx.lineTo(150, Math.sqrt(3) * 50 + 10)
ctx.fill()
```
![](../../image/Snipaste_2022-11-12_22-44-55.png)
可以, 但是有点小问题, 感觉三角形的腰有些锯齿感, 不清楚.

``

```html
```



![](../../image/)