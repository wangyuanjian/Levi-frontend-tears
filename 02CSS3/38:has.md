# :has() 父元素选择器来了?

我们先来看一个概念, `relative selector`. 

在 `CSS` 术语中, 我们通常所说的后代选择器、相邻兄弟选择器等是不准确的, 他们实际上被翻译作「组合器」(`combinator`). `relative selector` 选择器选中一个元素, 这个元素与一个或多个目标元素有关并且以一个组合器开头. 如果没有组合器, 那么默认就是后代选择器(一个空格 `' '`)

比如 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#relative_selector) 给出的例子 `dt:has(+ img)`. 其中 `relative selector` 就是 `+ img`, 整个选择器的意思就是`每个 dt, 并且该 dt 有 img 元素为其相邻兄弟`.

回到正题, `:has()` 表示一个元素 `A`, 这个伪元素选择器接收一个 `relative selector` 列表作为参数, 如果参数中任何一个 `relative selector` 在锚定 `A` 时至少匹配一个元素. 

这句话比较绕, 我们以 `dt:has(+ img)` 为例子解释, 即 `+ img` 在以所有 `dt` 为锚点锚定时, 匹配到了至少一个 `dt` 的相邻兄弟 `img`. 所以 `:has()` 的全名是**关系**伪类元素选择器, 突出关系的意思就是 `:has()` 和其参数是有关系的.

`:has()` 的出现让很多人高呼 CSS 终于支持父元素选择器了, 是的, `:has()` 代表了一种表示父元素或者相邻前一个元素的方式.

## 语法
## 权重

`:has()`
谢谢你看到这里😊