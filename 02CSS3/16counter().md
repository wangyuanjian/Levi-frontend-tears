## `CSS` 计数器之 `counter()`
> `counter()` 这个 `CSS` 函数返回表示计数器当前值的字符串, 如果计数器存在的话. 这个函数通常用在元素的 `content` 属性中, 理论上可以用在任何字符串可以出现的地方.


计数器本身没有视觉效果, 只有通过 `counter()` 或 `counters()` 返回开发者定义的字符串或图片才能是计数器发挥作用. 
> `counter( <counter-name>, <counter-style>? )`

`?` 表示 `0个或多个`, 因此下面的语法都是合法的
  - `counter(myCount)`; 使用阿拉伯数字 `1, 2, 3` 表示计数器的值
  - `counter(myCount, trad-chinese-informal)`; 使用汉字 `一, 二, 三` 表示计数器的值

先看一个案例
```html
<div class="start1">
  <h3>白日依山尽</h3>
  <h3>黄河入海流</h3>
  <h3>欲穷千里目</h3>
  <h3>更上一层楼</h3>
</div>
```
```css
.start1 {
  counter-reset: myCounter;
}
.start1 h3::before {
  counter-increment: myCounter 1;
  content: counter(myCounter, lower-alpha) '. ';
}
```
![](../../image/Snipaste_2022-06-23_12-09-06.png)

### `<counter-name>`
`<counter-name>` 用来标识计数器的名字, 大小写敏感. [👉官方文档在这里👈](https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident).

这是一个 `<custom-ident>` 类型的数据. 可以包含一个或多个如下字符
  - 英文字母: `a-z`, `A-Z`
  - 数字: `0-9`
  - 中划线: `-`
  - 下划线: `_`
  - 转义字符: 使用 `\` 开头表示转义
  - `Unicode` 字符: 同样使用 `\` 开头, 后接 `1 到 6` 个十六进制数字表示码点. 📕`Unicode` 字符要和其他字符用空格隔开📕

一些其他规则
  - 不能以 `数字` 开头
  - 如果是 `中划线` 开头, 后面不能是数字
  - 不能以两个 `中划线` 开头, 因为两个 `中划线` 开头表示自定义的 `CSS` 变量
  - 不需要加引号
  - 不能使用 `none`, `initial`, `inherit`, `unset` 等全局 `CSS` 值或如 `circle`, `disc` 等其他 `CSS` 预定义的值
  - 大小写敏感

```css
.start2 {
  counter-reset: myCounter;
  counter-reset: hello-world1;
  counter-reset: -hello;
  counter-reset: _world;
  counter-reset: wow\.wow;
  counter-reset: \12 abs;

  counter-reset: 12abs;
  counter-reset: -12abs;
}
```
![](../../image/Snipaste_2022-06-23_12-52-32.png)

### `<counter-style>`
可以是 [list-type-name](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type), [@counter-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style), 或者 [symbols()](https://developer.mozilla.org/en-US/docs/Web/CSS/symbols), 其作用简单来说就是设置计数器的值如何展现. 默认为十进制数字.

下面看几个在实际开发中会用到的例子, `计数器补0`, `汉字`等
```css
.start2 {
  counter-reset: paddingZero;
}
.start2 h3::before {
  counter-increment: paddingZero;
  content: counter(paddingZero, decimal-leading-zero) '.';
}
.start3 {
  counter-reset: chineseCharacter;
}
.start3 h3::before {
  counter-increment: chineseCharacter;
  content: counter(chineseCharacter, simp-chinese-informal) '.';
}
```
![](../../image/Snipaste_2022-06-23_12-52-58.png)