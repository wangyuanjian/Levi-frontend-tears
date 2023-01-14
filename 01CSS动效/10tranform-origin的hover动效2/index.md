## 使用 transform-origin 实现的 hover 动效2

先看结果
![](../../image/hover_effect_5.gif)

思路还是挺简单的, 一般要实现关于边框的效果都是在底层元素设置颜色, 在上层元素遮挡中间部分并且露出边框部分即可, 这个例子也不例外.

另外就是标题上写的使用 transform-origin, 因为两个边框分别是从「左下角」和「右上角」出现的.

### HTML
```html
<a class="welcome">
  <span>Happy New Year🐰</span>
</a>
```
### CSS
```css
.welcome {
  text-decoration: none;
  color: #111;
  position: relative;
  display: inline-block;
}
.welcome span {
  margin: 2px;
  padding: 0 1em;
  font-size: 20px;
  line-height: 1.5;
  display: inline-block;
  background-color: #fff;
  position: relative;
  z-index: 1;
}
```
两个边框都是使用伪元素实现的
```css
.welcome::before, .welcome::after {
  content: '';
  display: block;
  position: absolute;
  background-color: #ff5e57;
  inset: 0;
  transform: scaleX(0) scaleY(0);
  transition: all .5s ease;
}
.welcome::before {
  transform-origin: left bottom;
}
.welcome::after {
  transform-origin: top right;
}
.welcome:hover::before,
.welcome:hover::after {
  transform: scaleX(1) scaleY(1);
}
```
谢谢你看到这里😊
