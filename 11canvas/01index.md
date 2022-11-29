<!-- TOC -->

- [canvas](#canvas)
  - [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
    - [渲染文本](#%E6%B8%B2%E6%9F%93%E6%96%87%E6%9C%AC)
  - [画图形](#%E7%94%BB%E5%9B%BE%E5%BD%A2)
    - [绘制路径](#%E7%BB%98%E5%88%B6%E8%B7%AF%E5%BE%84)
    - [绘制三角形](#%E7%BB%98%E5%88%B6%E4%B8%89%E8%A7%92%E5%BD%A2)
    - [移动画笔🖌️](#%E7%A7%BB%E5%8A%A8%E7%94%BB%E7%AC%94)
    - [绘制直线](#%E7%BB%98%E5%88%B6%E7%9B%B4%E7%BA%BF)
    - [绘制弧线和圆](#%E7%BB%98%E5%88%B6%E5%BC%A7%E7%BA%BF%E5%92%8C%E5%9C%86)
    - [绘制贝塞尔曲线](#%E7%BB%98%E5%88%B6%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF)
    - [绘制矩形](#%E7%BB%98%E5%88%B6%E7%9F%A9%E5%BD%A2)
    - [Path2D 对象](#path2d-%E5%AF%B9%E8%B1%A1)
  - [应用样式和颜色](#%E5%BA%94%E7%94%A8%E6%A0%B7%E5%BC%8F%E5%92%8C%E9%A2%9C%E8%89%B2)
    - [颜色](#%E9%A2%9C%E8%89%B2)
    - [透明](#%E9%80%8F%E6%98%8E)
    - [线的样式](#%E7%BA%BF%E7%9A%84%E6%A0%B7%E5%BC%8F)
    - [渐变](#%E6%B8%90%E5%8F%98)
    - [模式](#%E6%A8%A1%E5%BC%8F)
    - [阴影](#%E9%98%B4%E5%BD%B1)
    - [Canvas 填充规则](#canvas-%E5%A1%AB%E5%85%85%E8%A7%84%E5%88%99)

<!-- /TOC -->

# canvas

## 基本使用
```html
<canvas id="canvasDraw" width="200" height="200"></canvas>
```
`<canvas>` 和 `<img>` 元素很像, 但是它自身只有 `width` 和 `height` 这两个可选属性, 而 `id` 属性是所有 `HTML` 元素都有的全局属性. 如果省略了 `width` 和 `height`, 那么 `<canvas>` 将默认 `300px` 宽和 `150px` 高.

如果渲染出来的 `<canvas>` 有些扭曲, 那么尝试给 `<canvas>` 元素加上 `width` 和 `height` 属性, 而不是使用 `CSS`

`<canvas>` 元素可以像一般的图像一样增加样式, 但是这些样式却不会影响在 `<canvas>` 上实际的绘制. 如果没有任何样式, `<canvas>` 初始时就是透明

![](../image/Snipaste_2022-11-12_15-31-40.png)

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
![](../image/Snipaste_2022-11-12_22-44-55.png)
可以, 但是有点小问题, 感觉三角形的腰有些锯齿感, 不清楚. 这跟 `<canvas>` 元素本身的大小设置有关系

### 移动画笔🖌️
这就跟 `moveTo` 有很大的关系啦. 这个函数自身不绘制任何东西, 只是将「画笔」移动到新的位置.

### 绘制直线
使用 `lineTo(x, y)` 函数绘制直线. `lineTo` 方法从当前子路径的最后一点点画一条直线到点坐标 `(x,y)`. 如果没有当前子路径, 那么最后一点可以由 `moveTo` 指定.

📖注意: 这个方法和其他方法一样, 这方法本身并不直接渲染直线, 如果要看到画出来的直线, 请调用 `fill()` 或 `stroke()` 方法.
```js
ctx.beginPath()
ctx.moveTo(25, 25)
ctx.lineTo(105, 25)
ctx.lineTo(25, 105)
ctx.fill()
```
### 绘制弧线和圆
需要两个函数

`arc(x, y, radius, startAngle, endAngle, counterclockwise)`
  - 将一个圆弧添加到当前的子路径,
  - 这个方法以 `(x, y)` 为中心, 以 `radius` 为半径画圆弧. 圆弧从 `startAngle` 角度开始, 在 `endAngle` 角度结束. 🤯角度是从 `x` 轴正半轴开始算的❗️❗️❗️
  - 绘制方向是 `counterclockwise`. `boolean` 值, 如果是 `true` 那么绘制方向是逆时针. 默认是 `false`, 即顺时针绘制圆弧.
  - 📖注意这里的度不是角度, 而是弧度. 角度和弧度的转换公式为 `弧度 = (π / 180) * 角度`
  - ```js
    ctx.beginPath()
    ctx.arc(300, 300, 100, 0, 3 / 2 * Math.PI, false);
    ctx.stroke()
  - ![](../image/Snipaste_2022-11-14_22-37-08.png)

`arcTo(x1, y1, x2, y2, radius)`
  - 根据控制点 `(x1, y1)` `(x2, y2)` 和半径 `radius` 绘制圆弧. 使用当前点与 `(x1, y1)` 点构成的直线, 和 `(x1, y1)` 与 `(x2, y2)` 构成的直线, 一起作为圆弧的切线. 换句话说, 这个圆弧与两条线相切.
  - 画出来的圆弧将会自动与当前子路径的最后一个点直线连接, 如果当前路径列表为空, 那么就连接 `moveTo` 的点. 这个方法通常用来绘制圆角.
  - ```js
      ctx.beginPath()
      ctx.strokeStyle = '#666'
      ctx.moveTo(20, 20)
      ctx.lineTo(200, 20)
      ctx.lineTo(200, 200)
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = '#111'
      ctx.lineWidth = 3
      ctx.moveTo(20, 20)
      ctx.arcTo(200, 20, 200, 200, 100);
      ctx.stroke()
  - ![](../image/Snipaste_2022-11-14_22-17-23.png)
### 绘制贝塞尔曲线
二次贝塞尔曲线和三次贝塞尔曲线都非常有用, 它们通常用来绘制复杂的自然(organic)图形. CSS 的 animation-timing-function 属性可以调用 cubic-bezier 函数来指明动画的缓动函数.

- `quadraticCurveTo(cp1x, cp1y, x, y)`
  - 将二次贝塞尔曲线添加到当前子路径. 这个方法需要两个点, 第一个点是`控制点`, 第二个点是`结束点`. `开始点`就是当前路径的最后一个点, 也可以是 `moveTo` 指定的点.
  - 前两个参数就是控制点的坐标, 后两个参数就是结束点的坐标.
  - ```js
    ctx.moveTo(100, 100)
    ctx.quadraticCurveTo(200, 300, 400, 150);
    ctx.stroke()
  - ![](../image/Snipaste_2022-11-15_21-48-27.png)
- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`
  - 将三次贝塞尔曲线添加到当前子路径. 三次贝塞尔曲线需要三个点, 两个控制点和一个结束点. 开始点就是当前路径的最后一个点, 也可以是 `moveTo` 指定的点.
  - 六个参数分别是两个控制点和一个结束点的坐标.
  - ```js
    ctx.moveTo(100, 100)
    ctx.bezierCurveTo(200, 300, 300, 100, 500, 200);
    ctx.stroke()
  - ![](../image/Snipaste_2022-11-15_22-02-25.png)
### 绘制矩形
与 `SVG` 不同, `<canvas>` 仅支持两种原始图形: 矩形和路径. 所有其他图形都必须由一个或多个路径连接而成.
- `fillRect(x, y, width, height)`
  - 填充一个矩形, 填充的样式由 `fillStyle` 决定.
  - 这个方法直接在 `<canvas>` 上绘制, 而不会修改当前路径, 因此任何后续的 `fill()` 或 `stroke()` 方法都不会对矩形有影响.
  - 参数, 分别是矩形开始点的坐标, 矩形的宽和高. 如果宽高是正值, 那么向右向下绘制矩形, 否则向左向上绘制.
  - ```js
    ctx.fillStyle = '#ff5e57'
    ctx.fillRect(30, 30, 200, 160)
  - ![](../image/Snipaste_2022-11-16_21-54-03.png)
  - 如果想要覆盖整个 `<canvas>` 可以这样写
  - ```js
    ctx.fillRect(0, 30, 200, 160)
- `strokeRect(x, y, width, height)`
  - 绘制矩形的边框, 根据 `strokeStyle` 和其他上下文的设置. 这个方法同样不会影响当前路径, 也不会被后续的 `fill()` 或 `stroke()` 影响.
  - 参数同 `fillRect()`
  - ```js
    ctx.strokeStyle = '#ff5e57'
    ctx.lineWidth = 10
    ctx.strokeRect(30, 30, 200, 160)
  - ![](../image/Snipaste_2022-11-16_22-12-48.png)
- `clearRect(x, y, width, height)`
  - 通过将矩形区域内的像素设置成[透明黑色](https://drafts.csswg.org/css-color/#transparent-black)来清除像素.
  - 关于什么是透明黑色, 可以看 `CSS` 规范中的对两个颜色的定义, 首先是 `不透明黑(opaque black)`, 其对应的颜色是 `rgb(0 0 0 / 100%)`, 然后是`透明黑(transparent black)`, 对应的颜色是 `rgb(0 0 0 / 0)
  - 📖 MDN 强调了不正确使用路径而调用 `clearRect()` 可能会导致意想不到的副作用, 因此, 调用 `clearRect()` 后如果想要绘制其他内容一定要调用 `beginPath()`
  - 参数同 `fillRect()`
  - 下面的例子是清除整个画布, 这段代码通常用在动画每一帧的开始.
  - ```js
    ctx.clearRect(0, 0, canvas.width, canvas.height)
- `rect(x, y, width, height)`
  - 上面的绘制矩形的方法都是直接将矩形绘制在 `canvas` 上, 而 `rect()` 函数确是将一个矩形子路径添加到当前路径. 和其他只添加路径的方法相似, 这个方法也不直接绘制任何东西, 只有后续调用 `fill()` 或 `stroke()` 才会绘制矩形
  - 参数同上.
  - 在这个方法执行之前, `moveTo(x, y)` 方法就会自动调用. 换句话说, 当前画笔🖌️的位置自动移动到 `(x, y)`
  - ```js
    ctx.beginPath()
    ctx.moveTo(100, 100)
    ctx.arc(100, 100, 40, 0, 2 * Math.PI)

    ctx.rect(140, 140, 80, 80)
    ctx.fill()
  - ![](../image/Snipaste_2022-11-17_21-47-33.png)
### `Path2D` 对象
在之前的例子中, 绘制图形需要一系列路径和命令, 为了简化代码和提高性能, 可以使用 `Path2D` 对象.

`Path2D` 这个接口用来声明一个路径, 这个路径之后可以被 `canvas` 对象使用. `canvas` 对象的绘制路径的方法也存在 `Path2D` 上.
- `Path2D()`
  - 构造函数返回一个刚刚初始化的 `Path2D` 对象. 可以接受另一个 `path` 或 `SVG` `path` 字符串作为可选参数.
所有的路径方法, 比如 `moveTo`, `rect`, `arc` 等同样存在于 `Path2D` 对象上. 
  - ```js
    const rect = new Path2D()
    rect.rect(100, 100, 200, 200)

    const circle = new Path2D()
    circle.arc(200, 200, 100, 0, Math.PI * 2)

    ctx.stroke(rect)
    ctx.stroke(circle)
    ```
  - ![](../image/Snipaste_2022-11-26_10-41-37.png)
  - 在构建 `Path2D` 对象时, 同样可以传递 `SVG` 路径字符串作为参数. 
  - ```js
    const heart = new Path2D(`M 10,30
          A 20,20 0,0,1 50,30
          A 20,20 0,0,1 90,30
          Q 90,60 50,90
          Q 10,60 10,30 z`)
    ctx.stroke(heart)
  - ![](../image/Snipaste_2022-11-26_11-01-45.png)

`Path2D API` 同样需要使用 `addPath()` 方法将不同的路径结合起来. 

- `addPath(path, transform)`
  - 添加一个 `Path2D` 对象到另一个 `Path2D` 对象上.
  - `transform` 是一个可选的矩阵参数.
  - ```js
    const rect = new Path2D()
    rect.rect(100, 100, 200, 200)
    
    const rect2 = new Path2D()
    rect2.arc(400, 200, 100, 0, Math.PI * 2)

    rect.addPath(rect2)
    ctx.stroke(rect)
  - ![](../image/Snipaste_2022-11-26_10-50-57.png)

## 应用样式和颜色
屏幕阅读器无法读取 `<canvas>` 的内容. 如果 `<canvas>` 仅仅用做装饰页面, 那么可以在开始标签上增加 `role="presentation"` 属性.

### 颜色
如果想要对图形应用颜色, 可以使用 `fillStyle` 和 `strokeStyle`
- `fillStyle`
  - 填充图形的颜色或渐变. 默认值为 `#000`, 黑色
  - 任何合法的 `CSS` 颜色值的字符串都可以作为 `fillStyle` 的值.
  - ```js
    function fillStyleTest(context) {
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          context.fillStyle = `#${toHex(i * 17)}${toHex(j * 17)}bb`
          context.fillRect(i * 17, j * 17, 25, 25)
        }
      }
    }

    function toHex(num) {
      return num.toString(16).padStart(2, '0')
    }
  - ![](../image/Snipaste_2022-11-29_21-32-19.png)
- `strokeStyle`
  - 勾勒图形轮廓的颜色或渐变. 默认值为 `#000`, 黑色
  - 任何合法的 `CSS` 颜色值的字符串都可以作为 `strokeStyle` 的值.
  - ```js
    function strokeStyleTest(context) {
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          context.strokeStyle = `#${toHex(i * 17)}${toHex(j * 17)}bb`
          context.strokeRect(300 + i * 17, j * 17, 17, 17)
        }
      }
    }
  - ![](../image/Snipaste_2022-11-29_21-38-15.png)
### 透明
### 线的样式
### 渐变
### 模式
### 阴影
### Canvas 填充规则

```js
```

```
```html
```







![](../image/)

