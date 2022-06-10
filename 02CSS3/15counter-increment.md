## `CSS` 计数器之 `counter-increment`
>  `counter-increment` 将 `CSS` 计数器 增加或减少指定值.

### 语法
> `[ <counter-name> <integer>? ]+ | none`

`|` 表示 `counter-increment` 的属性值可以是 `none` 或者前面的部分, 互斥关系. 其中 `none` 是默认值.

`[ <counter-name> <integer>? ]+` 中的 `+` 表示前面中括号的内容是`1个或多个`. `?` 表示 `0个或1个`. 所以下面的这些表达式都是合法的.
  - `counter-increment: myCount`; 
  - `counter-increment: myCount 3`; 
  - `counter-increment: myCount myCount3 -2`;
  - `counter-increment: none`;

他们的意思分别为
  - 给计数器 `myCount` 加 `1`. 如果省略后面的整数, 默认为 `1`;
  - 给计数器 `myCount` 加 `3`;
  - 给计数器 `myCount` 加 `1`, 给计数器 `myCount3` 减 `2`;

一个简单的案例
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
  counter-increment: myCounter 2;
  content: counter(myCounter) '.';
}
```
 ### 关键词 `none`
 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment) 中关于 `none` 的解释是, 既不增加也不减少. 通常用来取消更不具体的规则中设定的规则. 

接着上面的案例, 我们将第三个 `h3` 的 `counter-increment` 属性设置为 `none`.
```css
.start1 h3:nth-child(3)::before {
  counter-increment: none;
  content: counter(myCounter) '.';
}
```
可以看到第三行的计数器还是 `4`, 因为计数器的没有增加. 如果压根不想显示第三行的计数器, 可以直接设置 `content` 的属性值为 `''`.