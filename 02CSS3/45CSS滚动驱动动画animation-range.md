# animation-range (animation-range-start ❤️ animation-range-end)
> 这个属性可同时对 scroll progress timeline 和 view progress timeline 这两种不同时间线驱动的动画其效果!

还记得之前在 [view()](./49CSS滚动驱动动画view().md) 中看到的例子吗, view progressive timeline 是以元素开始出现为 0%, 完全离开滚动容器后为 100%. 实际上我们可能需要更多类型的进度, 比如开始出现(0%)和完全出现(100%), 或准备离开(0%)和完全离开(100%). 如下

![](../image/animation-range1.gif)

![](../image/animation-range2.gif)

这个时候就需要 animation-range 大放异彩了, 因为它改变的就是动画范围.
## 语法
```css
animation-range = 
  [ <'animation-delay-start'> <'animation-delay-end'>? | <timeline-range-name> ]#  
```

animation-range 是一个简写属性, `animation-range-start` 和 `animation-range-end` 的简写. 如果同时指定两个值, 那么第一个值会作为 `animation-range-start` 第二个值会作为 `animation-range-end`. 

不论是 `animation-range-start` 还是 `animation-range-end`, 他们的取值都是一样的
- `normal`:
- `<length-percentage>`
- `<timeline-range-name>`
- `<timeline-range-name> 加上 <timeline-range-name>`

有了上面的取值, 对于简写属性 animation-range 来说
- 如果只是 normal 或者 `<length-percentage>`, 那么这个值就属于 `animation-range-start`, 而 `animation-range-end` 默认为 normal
- 如果仅仅是一个 `<timeline-range-name>`, 那么动画范围就是这个具名时间线范围从 0% 到 100%
  - 📖 也就是, 如果 `<timeline-range-name>` 属于 `animation-range-start`, 那么百分比默认为 0%; 如果属于 `animation-range-end` 那么百分比默认为 100%.
- 如果是 `<timeline-range-name>` 加上 `<length-percentage>`, 那么动画范围就是这个具名时间线从 `<length-percentage>` 到结束.

因此下面的语法都是 OK 的.
- `animation-range: normal;`
- `animation-range: 50%;`
- `animation-range: contain;`
- `animation-range: normal 50%;`
- `animation-range: 50% normal;`
- `animation-range: 50% 75%;`
- `animation-range: entry exit;`
- `animation-range: cover cover 100px;`
- `animation-range: entry 100px exit;`

下面就具体看看不同取值代表的含义
### normal
默认值
先看 view progress timeline, 先给出代码, 并且后面的示例都将在此基础上修改
```html
<div class="relative">
  <div class="container">
    Lorem...
    <div class="box positive-inset-length"></div>
  </div>
</div>
```
```css
.container {
  height: 200px;
  overflow: auto;
}
.box {
  animation: appear1 linear both;
  animation-timeline: --why-is-this;
  view-timeline: --why-is-this;
  animation-range: normal;
}
```
这就是默认的表现, 在 .box 元素将要出现时, 动画进度为 0%; 在元素完全离开滚动容器时, 动画进度为 100%.

![](../image/animation-range3.gif)

再看 scroll progress timeline.
```html
<div class="relative">
  <div class="container container1">
    <div class="top"></div>
    Lorem ...
  </div>
</div>
```
```css
.container1 {
  scroll-timeline: --youHaveToBeThis;
}
.container1 .top {
  position: absolute;
  animation: appear1 linear both;
  animation-timeline: --youHaveToBeThis;
}
```
这也是默认的表现, 滚动容器开始滚动时, 动画进度为 0%; 滚动容器滚动到最大位置时, 动画进度为 100%.

![](../image/animation-range4.gif)

### length-percentage
### timeline-range-name
### normal

![](../image/)
谢谢你看到这里😊