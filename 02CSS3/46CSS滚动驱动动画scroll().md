# scroll()
> `animation-timeline` 通过 scroll() 指定可滚动元素与滚动轴来为容器动画提供一个匿名的 scroll progress timeline. 

通过元素在顶部和底部(或左边和右边)的滚动推进 scroll progress timeline. 并且元素滚动的位置会被转换为百分比, 滚动开始被转化为 0%, 滚动结束被转化为 100%

如果 scroll() 指定的滚动轴不包含滚动条, 也就是元素在滚动轴的方向不可滚动, 那么 timeline 的进度为0%.

## 语法
scroll() 可以接受两个参数
- `滚动元素`: 滚动元素提供 scroll progress timeline. 可以取值
  - `nearest`: (默认值)设置 `animation-timeline` 元素最近的、具有滚动条的祖先元素.
  - `root`: 文档的根元素, 即 `<html>` 元素
  - `self`: 设置 `animation-timeline` 的元素自身
- `滚动轴`:
  - `y`: 垂直滚动轴
  - `x`: 水平滚动轴
  - `block`: (默认值)与滚动容器中行内文本方向垂直的轴. 对于从左到右书写的文字, 与 y 相同. 对于从上到下书写的文字, 与 x 相同.
  - `inline`: 与滚动容器中行内文本方向水平的轴. 对于从左到右书写的文字, 与 x 相同. 对于从上到下书写的文字, 与 y 相同.

这两个参数的书写顺序没有要求, 但是参数之间**没有**逗号, 这一点我一定要强调, 因为 translate 这个函数的参数就需要有逗号!!!
  

![](../image/)
谢谢你看到这里😊