## Webpack 官网文字滚动特效

先来看看 `👉Webpack 官网👈` 的效果
![](../../../image/webpack_scroll.gif)


来看看我自己实现的
![](../../../image/webpack_self_scroll.gif)

### `HTML`
首先下面的代码确实没有格式化, 而且是被我故意写成这样的. 因为 `HTML` 中的换行符是会被显示出来的. 如下图
![](../../../image/Snipaste_2022-06-20_15-36-25.png)

第一个 `div.rotate` 是固定宽高, 因为这样才能通过 `overflow: hidden` 使超出的子元素隐藏.

第二个 `div.wrapper` 和父元素宽度一样(`2em`), 才导致了两个 `span` 没有在同一行显示, 而是在不同行.

```html
<body>
  <h1>
    <span>欢迎来到</span><div class="rotate"><div class="wrapper">
        <span>中国</span>
        <span>北京</span>
      </div>
    </div>
  </h1>
  <button onclick="toggleUpClass()">goUp</button>
</body>
```

### `CSS`
首先, 取消 `<body>` 和 `<h1>` 的 `padding` 和 `margin`. 并设置 `<body>` `flex` 布局使子元素垂直水平居中.

设置第一个 `div.rotate` `inline-block` 才不会换行. 具体 `height` 为多少, 这个需要自己手动在浏览器工具里调试.

最后一个类, 帮助第二个 `div.wrapper` 上移 `50%` 的高度才能让第二个 `span` 显示出来.
```css
body, h1 {
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.rotate {
  display: inline-block;
  vertical-align: bottom;
  width: 2em;
  height: 43px;
  overflow: hidden;
  background-color: skyblue;
  padding: 0 .3rem;
}
.goUp {
  transition: transform .5s ease-in-out;
  transform: translateY(-50%);
}
```

### `JavaScript`
主要在于, 点击按钮时给第二个 `div.wrapper` 添加 `goUp` 类. 在 `transition` 结束时, 也是就 `500ms` 后, 取消这个类. 📕取消之后, `div.wrapper` 的滚动就失效了, 展现的仍是第一个 `span` 内容.

因此要将之前滚动的第二个 `span` 内容变成第一个 `span` 内容. 才不会发现猫腻.
```js
let wrapper = document.querySelector('.wrapper');
function toggleUpClass() {
  wrapper.classList.toggle('goUp');
  const firstSpanHtml = wrapper.lastElementChild.innerHTML;
  setTimeout(() => {
    wrapper.classList.toggle('goUp');
    wrapper.innerHTML = `
      <span>${firstSpanHtml}</span>
      <span>${Math.random().toString().substr(2,3)}</span>
    `;
  }, 500);
}
```
内容就是这些啦, 谢谢你看到这里😀