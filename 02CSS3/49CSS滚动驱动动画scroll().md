# CSS 滚动驱动动画 view()
> `animation-timeline` 通过 `view()` 表示一个元素 `A` 将提供匿名的、 用来控制动画的 `view progressive timeline`. 

通过 `A` 在其最近的滚动祖先元素中的可见性来推动 `view progressive timeline`. 也就是, 当 `A` 即将出现在滚动祖先元素时, `timeline` 为 `0%`, 当 `A` 完全离开滚动祖先元素时, `timeline` 为 `100%`.

上图

![](../image/view-timeline3.gif)

## 语法
`view()` 可以接收两个参数
- `axis`: 轴, 可以是 `block(默认值)`, `inline`, `y`, `x`. 与 [scroll()](./46CSS%E6%BB%9A%E5%8A%A8%E9%A9%B1%E5%8A%A8%E5%8A%A8%E7%94%BBscroll().md) 相同, 可点击参考. 📖 如果指定轴的方向不可以滚动, 那么时间线将始终处于 `0%` 的状态.

- `inset`: 默认情况, 动画是元素将要进入滚动容器开始, 在完全离开滚动容器结束. `inset` 参数可以修改动画开始和结束时元素的位置, 也就是元素滚动到哪里算开始、又滚动到哪里算结束.
  - `inset` 可以是一个值或两个值, 可以是 `auto` 或长度值或百分比值.
  - 我们来说说, 百分比是相对于谁计算的. 相对于 [scroll origin](https://drafts.csswg.org/css-overflow-3/#scroll-origin), 也就是逻辑垂直开始方向(block-start)和逻辑水平开始方向(inline-start). 如果是英文, 那就是左上角.

📖 这两个参数的位置可以任意, 且两个参数都不是必须, 因此下面的调用都是合理的. 
📖 注意参数之间使用**空格**而不是逗号分隔
- `view()`:
- `view(block)`:
- `view(20px)`:
- `view(inline 20px)`:
- `view(inline 20px 10%)`:

## 例子
```html
<div class="container">
  <div class="box"></div>
</div>
```
```css
.container {
  width: 400px;
  height: 200px;
  overflow: auto;
}
@keyframes grow1 {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.box {
  width: 50%;
  height: 20px;
  background-color: salmon;
  animation: grow1 linear both;
  animation-timeline: view(block 40% 20%);
}
```
![](../image/view-timeline4.gif)




![](../image)
谢谢你看到这里😊