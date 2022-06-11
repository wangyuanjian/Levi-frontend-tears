## `CSS` 计数器之 `counter-increment`
>  `counter-increment` 将 `CSS` 计数器 增加或减少指定值.

## `counter-increment`
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
![](../../image/Snipaste_2022-06-11_08-26-11.png)
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
![](../../image/Snipaste_2022-06-11_08-25-28.png)

## `counter-set`
> 将计数器设为给定值. 这个属性会操作已存在的计数器的值, 如果不存在某个名字的计数器, 将创建一个新的计数器. 📕这个属性相对比较新, `Chrome(85+)` 版本才支持.
### 语法
`[ <counter-name> <integer>? ]+ | none` 语法规则和 `counter-increment` 完全相同, 同样支持关键字 `none`, 表示取消任何再更不具体的规则中设定的计数器.

如果省略 `<integer>` 值, 那么计数器将被重置为 `0`

一个例子
```html
<div class="start2">
  <h3>白日依山尽</h3>
  <h3>黄河入海流</h3>
  <h3>欲穷千里目</h3>
  <h3>更上一层楼</h3>
</div>
```
```css
.start2 {
  counter-reset: myCounterA;
}
.start2 h3::before {
  counter-increment: myCounterA 2;
  content: counter(myCounterA) '.';
}
.start2 h3:nth-child(3)::before {
  counter-increment: 2;
  counter-set: myCounterA 0;
  content: counter(myCounterA) '.';
}
```
上面的代码中, 第三个 `<h3>` 将计数器的值设置为 `0`, 后面的计数器就接着新的值继续增加.
![](../../image/Snipaste_2022-06-11_08-43-53.png)
如果这时候你有疑问, 如果交换一下代码, 先设置为 `0` 在增长 `2` 会不会有效呢? 答案是不会哦🙅‍
![](../../image/Snipaste_2022-06-11_08-46-20.png)
下面看看关键字 `none` 的表现. 在第三个 `<h3>` 中我们先设置计数器为 `0`, 然后又使用 `none` 取消了这次设置, 因此计数器继续按照原来的数值增长.
![](../../image/Snipaste_2022-06-11_08-50-40.png)
最后看下 `counter-set` 在递减的计数器中的表现吧. `reversed()` 函数目前仅 `FireFox(96+)` 的浏览器才支持😀
```css
.start4 {
  counter-reset: reversed(myCounterC);
}
.start4 h3::before {
  counter-increment: myCounterC 2;
  content: counter(myCounterC) '.';
}
.start4 h3:nth-child(3)::before {
  counter-set: myCounterC 0;
  counter-increment: myCounterC 2;
  content: counter(myCounterC) '.';
}
```
如图所示, `counter-set` 成功将第三个 `<h3>` 中计数器的值修改为 `0`, 这个和递增计数器中的效果相同, 但是使用 `counter-set` 之前元素的计数器的值因此发生了改变. 在 `counter-reset` 中提到过, 递减计数器的值是根据使用该计数器的元素个数计算的, 大胆猜测 `counter-set` 影响了浏览器计算递减计数器初始值的方式.
![](../../image/Snipaste_2022-06-11_08-58-52.png)
哦, 还有一个, 第三个 `<h3>` 中 `counter-set` 设置了一个不存在的计数器的值, 这就会创建一个新的计数器. 最后一个还是 `8` 因为 `counter-increment: myCounterD 2;` 仍然有效.
```css
.start5 {
  counter-reset: myCounterD;
}
.start5 h3::before {
  counter-increment: myCounterD 2;
  content: counter(myCounterD) '.';
}
.start5 h3:nth-child(3)::before {
  counter-set: myCounterE;
  counter-increment: myCounterD 2;
  content: counter(myCounterE) '.';
}
```
![](../../image/Snipaste_2022-06-11_09-16-39.png)

谢谢你看到这里 😀