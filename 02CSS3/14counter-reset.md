## `CSS` 计数器之 `counter-reset`
> `counter-reset` 属性重置 `CSS` 计数器为给定值. 

如果之前没有了解过 `CSS` 计数器, 我们首先看一个案例, 弄清楚关于计数器的 `CSS` 属性都是干什么的, 之后逐个了解这些属性. 上代码
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
  counter-increment: myCounter;
  content: counter(myCounter) ". ";
}
```
![](../../image/Snipaste_2022-06-09_14-11-30.png)
- `counter-reset`: 创建一个计数器;
- `counter-increment`: 增加或减少计数器的值;
- `counter()`: 展示计数器的值. 通常搭配在伪类元素中搭配 `content` 属性使用.

快速入门了 `CSS` 计数器的例子和结果, 接下来就正式介绍 `counter-reset` 的规则.
### 语法
`counter-reset` 在指定元素上创建给定名字的计数器, 计数器可能增加也可能减少. 可以给定初始计数器的值, 如果没有给, 默认为 `0`.
```css
.start1 {
  counter-reset: myCounter;
}
```
上面代码的意思就是在类名为 `start1` 的所有元素上创建名为 `myCounter` 的计数器, 计数器初始值为 `0`.

当然可以同时创建多个计数器.
```css
.start1 {
  counter-reset: myCounter myCounter2 1 myCounter3 9;
}
```
我们同时创建了三个计数器, `myCounter`, `myCounter2`, `myCounter3`, 它们的初始值分别为 `0`, `1`, `9`

📕初始值只能是整数类型(包括负数). 小数或百分数都不行📕
### 规则
如果多个容器的计数器相同, 那么计数是连续的还是互不干扰的呢? 下面的两个 `div` 的计数器都是 `myCounter3`. 结果就是两个 `div` 的计数互不干扰.
```html
<div class="start1">
  <h3>白日依山尽</h3>
  <h3>黄河入海流</h3>
  <h3>欲穷千里目</h3>
  <h3>更上一层楼</h3>
</div>
<hr>
<div class="start1">
  <h3>白日依山尽</h3>
  <h3>黄河入海流</h3>
  <h3>欲穷千里目</h3>
  <h3>更上一层楼</h3>
</div>
```
```css
.start1 {
  counter-reset: myCounter myCounter2 1 myCounter3 9;
}
.start1 h3::before {
  counter-increment: myCounter3;
  content: counter(myCounter3) ". ";
}
```
![](../../image/Snipaste_2022-06-09_14-14-35.png)

### `reversed()`
`reversed` 函数用来创建默认递减的计数器, 其声明和默认递加的计数器相同. 📕注意: `reversed` 函数目前只有火狐(`96+`)的版本才支持, 快点下载高版本的火狐试试吧😀📕
```css
.start3 {
  counter-reset: reversed(myCount3) bool 3;
}
```
上面声明了初始值为 `3` 的计数器 `bool`, 那 `myCount3` 的初始值是多少呢?😳 递增计数器实现的是从 `0` 到某个值, 递减计数器恰恰相反, 实现的是从某个值到 `0`. 这是计算递减计数器的规则.
```html
<div class="start3">
  <h3>白日依山尽</h3>
  <h3>黄河入海流</h3>
  <h3>欲穷千里目</h3>
  <h3>更上一层楼</h3>
  <h4>呵呵呵呵呵</h4>
  <h3>哈哈哈哈哈</h3>
</div>
```
```css
.start3 {
  counter-reset: reversed(myCount3) bool 3;
}
.start3 h3::before {
  counter-increment: myCount3 -2;
  content: counter(myCount3) ". ";
}
```
![](../../image/Snipaste_2022-06-09_14-24-44.png)
上面的代码中 `.start3` 虽然有 `6` 个子元素, 但是真正使用了计数器 `myCount3` 的只有 `5` 个. 

计数器每次增加 `-2`, 如果要走到 `0` 那么初始值是 `12`. 但如果代码改成下面的样子, 表示每次增加 `2`, 如果要走到 `0` 初始值为 `-12`
```css
.start3 h3::before {
  counter-increment: myCount3 2;
  content: counter(myCount3) ". ";
}
```
![](../../image/Snipaste_2022-06-09_14-25-52.png)
### 关键词 `none`
其实 `counter-reset` 是有一个关键词属性的, 就是 `none` 但是我一直没有在网上找到相关的介绍, 也可能是这个关键词的作用范围很小不常用吧. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset) 对 `none` 的描述是`取消在不太具体规则中定义的计数器`, 我们可以用它来取消之前定义的计数器 
```css
.start2 {
  counter-reset: myCount2 10;
  counter-reset: none;
}
.start2 h3::before {
  counter-increment: myCount2 1;
  content: counter(myCount2) ". ";
}
```
![](../../image/Snipaste_2022-06-09_14-26-40.png)
从浏览器中看到, ~~counter-reset: myCount2 10;~~ 表示这个属性被覆盖了, 页面中的计数器也始终为 `1`
![](../../image/)
其实还有一个新的关键字 `revert-layer`, 这个和 `CSS` 全新的 `@layer` 规则有关, 因此只有火狐(`97+`)版本支持, 留着以后看啦😛
### 内置的计数器名: `list-name`
`HTML` 中的有序列表 `<ol>` 元素中的 `<li>` 默认是有序的, 其实 `<li>` 也使用了计数器, 不过是个内部计数器, 名字为 `list-item`. 下面就用这个内部计数器修改序号.
```html
<ol class="f-ol">
  <li>白日依山尽</li>
  <li>黄河入海流</li>
  <li>欲穷千里目</li>
  <li>更上一层楼</li>
</ol>
```
```css
.f-ol {
  counter-reset: list-item 10;
}
.f-ol li {
  counter-increment: list-item 2;
}
.f-ol li::marker {
  content: counter(list-item) "♥";
}
```
上面的代码中, 我们重置了计数器 `list-item` 的初始值为 `10`, 并修改了每次计数器增长 `2`, 并修改了计数器后的小数点 `.` 为 `♥`. 从而覆盖原生的有序列表中 `<li>` 元素的计数器样式.
![](../../image/Snipaste_2022-06-09_14-30-14.png)
📕注意: 如果我们将 `counter-increment` 写在 `::marker` 这个伪类中, 是不会生效哦~📕
```css
.f-ol {
  counter-reset: list-item 10;
}
.f-ol li::marker {
  counter-increment: list-item 2;
  content: counter(list-item) "♥";
}
```
![](../../image/Snipaste_2022-06-09_14-30-44.png)

感谢你看到这里😀