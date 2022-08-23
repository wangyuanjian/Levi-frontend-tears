## `scroll-behavior`
> 当滚动通过导航或者 `CSSOM` 滚动 `API` 触发时的滚动行为

只有两个关键字属性值.
  - `auto`: 
  - `smooth`: 

📕注意除了上面两种滚动触发外的任何滚动, 比如用户使用鼠标滚动, 都不会被这个属性影响. 

当这个属性在定义在 `<html>` 标签, 其作用域整个视窗. 如果这个属性定义在 `<body>` 将不会作用于视窗.

📕浏览器可以忽略这个属性的值😅

先看代码
```html
<body>
  <nav>
    <a href="#section1">1</a>
    <a href="#section2">2</a>
    <a href="#section3">3</a>
  </nav>
  <section class="container">
    <section class="section" id="section1">1</section>
    <section class="section" id="section2">2</section>
    <section class="section" id="section3">3</section>
  </section>
</body>
```
```css
.container {
  height: 200px;
  border: 1px solid #111;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.section {
  font-size: 48px;
  text-align: center;
  height: 100%;
  line-height: 200px;
}
```
上面我们是通过 `<a>` 标签的 `href` 属性链接到页面的不同位置从而实现的滚动.
![](../../image/scroll_behavior_1.gif)
接下来通过 `JavaScript` 修改网页 `URL` 中的 `hash` 部分实现滚动, 再来看效果
![](../../image/scroll_behavior_2.gif)
![](../../image/)
![](../../image/)