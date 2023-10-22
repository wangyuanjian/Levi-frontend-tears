# CSS 滚动驱动动画与 `@keyframes`
在 `CSS` 滚动驱动动画相关的属性出来之后, `@keyframes` 也迎来变化.

以前, `@keyframes` 的值可以是 `from`, `to`, 或者百分数. 现在它多了一种属性的值 `<timeline-range-name> <percentage>`

建议先了解 [animation-range](./56CSS滚动驱动动画timeline-scope.md) 不然你会对 `timeline-range-name` 感到陌生.

## 例子
我们先看看在新语法出现之前怎么写的. 我们用 `from`(也就是 `0%`) 表示动画开始祯, `to`(`100%`) 表示动画结束祯
```html
<div class="scroller">
  Lorem ...
  <div class="box"></div>
  Lorem ....
</div>
```
```css
.scroller {
  height: 250px;
  overflow: auto;
}
.box {
  animation: grow both;
  animation-timeline: view();
}
@keyframes grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
```
![](../image/scroll-animation1.gif)


如何使用新语法呢? 你会发现 `from` 其实对应的就是 `entry 0%` 的位置, `to` 对应的是 `exit 100%` 的位置, 于是
```css
@keyframes grow {
  entry 0% {
    transform: scaleX(0);
  }
  exit 100% {
    transform: scaleX(1);
  }
}
```
📖 `<timeline-range-name>` 后面的百分比不能省略.

![](../image/scroll-animation2.gif)

## 另一种 animation-range 的实现
有了新的语法, 我们大胆尝试通过 `@keyframes` 修改关键帧, 来达到修改 `animation-range` 的想法. 比如我希望实现 `animation-range: entry`
```css
.box {
  animation: grow both;
  animation-timeline: view();
}
@keyframes grow {
  entry 0% {
    transform: scaleX(0);
  }
  entry 100% {
    transform: scaleX(1);
  }
}
```
![](../image/scroll-animation3.gif)

因为 `animation-range` 是一个简写属性, 包括 `animation-range-start` 和 `animation-range-end`, 所以我们也可以在 `@keyframes` 中指定两组不同的关键帧, 分别对应 `animation-range-start` 和 `animation-range-end`.
```css
@keyframes grow {
  entry 0% {
    transform: scaleX(0);
  }
  entry 100% {
    transform: scaleX(1);
  }
  exit 0% {
    transform: scaleX(1);
  }
  exit 100% {
    transform: scaleX(2);
  }
}
```
请大家注意动图右下角的代码

![](../image/scroll-animation4.gif)

谢谢你看到这里😊