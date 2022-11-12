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
当然对于不支持 `<canvas>` 的浏览器, 脚本不能继续执行下去, 通过判断 canvas 元素是否有 getContext 方法来检测浏览器的是否支持 `<canvas>`

```js
const canvas = document.getElementById('canvasDraw')
if (!context.getContext) return
const context = canvas.getContext('2d')
```

## 画图形

``

```html
```

![](../../image/)