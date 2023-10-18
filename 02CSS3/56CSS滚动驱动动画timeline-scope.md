# timeline-scope
> 看到 scope 就知道这个属性是和`范围`有关, 没错, timeline-scope 就是用来修改一个具名时间线(named animation timeline)的范围.

我们介绍过的两种时间线 scroll progress timeline 和 view progress timeline, 使用这两种时间线(通过 view(), scroll(), 或者具名时间线)的元素都需要向上查询 DOM 树找到滚动容器, 这就是时间线的默认范围.

可是有时驱动元素 A 动画可能是 A 的兄弟元素 B 的滚动, 我们应该怎么办呢?
- 在 A 上使用 animation-timeline 声明一个具名时间线, 比如 `--whatever-this`
- 然后在 A 和 B 的共同祖先 P 上使用 `timeline-scope: --whatever-this` 表示时间线范围提升到 P 和 P 的任何后代元素上.
- 最后, 在 B 元素上使用 `scroll-timeline-name: --whatever-this` 表示由 B 元素来提供时间线.

来看例子

📖 我特意没有在两个 div 之间换行, 为了避免换行的出现
```html
<div class="p">
  <div class="a"></div><div class="b">
    Lorem...
  </div>
</div>
```
```css
.p {
  height: 200px;
  timeline-scope: --i-am-here;
}
.p > div {
  width: 50%; /** 为了避免渲染换行符导致宽度不够 */
  height: 100%;
  display: inline-block;
}
.a {
  animation: grow both;
  animation-timeline: --i-am-here;
}
.b {
  overflow: auto;
  scroll-timeline-name: --i-am-here;
}
@keyframes grow {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
```
可以看到效果, 驱动左侧动画的不再是其父元素, 而是其兄弟元素, 从而大大提高了设计使用动画的灵活性.

![](../image/timeline-scope1.gif)

## 语法


![](../image/)
谢谢你看到这里😊