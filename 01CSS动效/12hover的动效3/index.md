## hover 的效果3
先来看效果

![](../../image/hover_effect_7.gif)

在写效果的过程中, 一定要注意使用 `transform` 而不倾向改变 `left` 实现动画. 另外复习 `content` 属性值可以使用 `attr()` 函数

### HTML
```html
<a href="">
  <span class="text" data-before="新春快乐" data-after="🐰年大吉"></span>
</a>
```
### CSS
主要思路是, 通过 `left` 调整元素初始的位置, 然后通过 `transform` 调整 `hover` 时元素的位置

```css
.text::before, .text::after {
  position: absolute;
  width: 100%;
  text-align: center;
  transition: transform .5s ease;
}
.text::before {
  content: attr(data-before);
}
.text::after {
  left: 100%;
  content: attr(data-after);
}
a:hover .text::before,
a:hover .text::after {
  transform: translateX(-100%);
}
```

谢谢你看到这里😊
