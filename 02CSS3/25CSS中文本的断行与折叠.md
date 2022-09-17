## 文本的换行与包裹 之 简介
> 介绍在 `CSS` 中溢出文本的各种处理访问

### 文本的溢出
在 `CSS` 中, 如果有一个不可断开的字符串(比如很长的单词), 但是包裹字符串的容器宽度有限, 那么字符串就会在水平方向溢出. 如下
```css
<div class="box">GoodMorningGoodMorningGoodMorningGoodMorning</div>
.box {
  width: 200px;
  border: 3px solid salmon;
}
```

![](../../image/Snipaste_2022-09-15_21-10-27.png)

默认 `CSS` 展示溢出的文字, 因为不这样做数据就会丢失, 所以 `overflow` 的默认值为 `visible`. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Text/Wrapping_Text) 中讲了这样的原因: 即便溢出的文字会显得混乱和不优雅, 好处是这会让用户“看”到文字而不会错过. 

### 寻找 `min-content` 大小
为了不让文字溢出, 就需要找到能包裹文字的最小长度, 即 `min-content`. 

我们不可以按照字面意思将 `min-content` 翻译为「最小内容宽度」不然很容易被骗. 这样解释形象一点, 如果有三个人身高分别为 1 米 8, 1 米 7 和 1 米 9, 天花板「最低」要 1 米 9 才可以让所有人都直立站立, 当然天花板 2m 也可以, 3m 也可以但是 1 米 9 是所有可行方案中的「最小」值.
```css
.box {
  /* width: 200px; */
  width: min-content;
  border: 3px solid salmon;
}
```
![](../../image/Snipaste_2022-09-15_22-03-57.png)
盒子成功包裹了文字, 📕但是也请注意, 即便此时盒子超过页面最大宽度也不会适应最大宽度, 所以页面出现了滚动条
### 长文字的断行
如果包含文字的容器需要有固定的宽度, 或者你希望长文字不能溢出, `overflow-wrap` 可以帮助. 在文字太长要溢出其行盒子时, 这个属性设置浏览器是否对文字断行.
```css
.box {
  width: 200px;
  overflow-wrap: break-word;
}
```
![](../../image/Snipaste_2022-09-16_08-43-32.png)

::: tip
`overflow-wrap` 是标准属性, `word-wrap` 是非标准属性, 是 `overflow-wrap` 的别名. 两者表现完全一致.
:::

为了使文字换行, 另一个有用的属性是 `word-break`. 这个属性会在文字溢出的位置断开文字. 即便文字移动到新的一行不会换行, `word-break` 依然会断开文字而不是将文字移动到新的一行. 下面的例子展示两个属性的不同之处
```css
<div class="box1">Hi, Levi. GoodMorningGoodGood</div>
<div class="box2">Hi, Levi. GoodMorningGoodGood</div>
.box1 {
  width: 200px;
  word-break: break-all;
}
.box2 {
  width: 200px;
  overflow-wrap: break-word;
}
```
![](../../image/Snipaste_2022-09-16_09-02-39.png)

如果不希望出现很大的空白间隔, `word-break` 可以帮到我们. 下面的例子就更好的表现出 `word-break` 的作用. 我们不希望换行紧跟着 `checkbox` 导致出现大片空白, 而是希望 `checkbox` 和文字挨得很近.
```html
<div class="box1">
  <input type="checkbox"><label>GoodMorningGoodMorning</label>
</div>
<div class="box2">
  <input type="checkbox"><label>GoodMorningGoodMorning</label>
</div>
```
![](../../image/Snipaste_2022-09-16_22-13-46.png)

### 添加连字符(hyphen)
当文字被断开需要添加连字符时, 使用 `hyphens` 属性(📕注意有 `s`). 
- `none`, 单词不再换行处断开, 即便单词内有软换行也不会断开. 只在空白字符换行.
- 使用 `auto` 值, 浏览器自动在合适的位置添加连字符. 
- 如果想要控制在什么地方添加连字符的行为, 可以使用 `manual` 值, 这样文字在硬断行(`hard break`)处一定添加连字符, 在软断行(`soft break`)处只有需要断行才会添加连字符.
```html
<div class="box5">
  Lorem ipsum dolor sit ametcon&shy;secteturadipisicing elit. Fuga porro quisquam sit, solutaconsequunturrerum ex architecto cupiditate? Cum laborumexpeditacupiditatedolores in aliquamarchitectoquasnecessitatibus velit facere?
</div>
<div class="box6">
  Lorem ipsum dolor sit ametconsecteturadipisicing elit. Fuga porro quisquam sit, solutaconsequunturrerum ex architecto cupiditate? Cum laborumexpeditacupiditatedolores in aliquamarchitectoquasnecessitatibus velit facere?
</div>
<div class="box7">
  Lore&hyphen;m ipsu&shy;m dolor sit ametconsecteturad&shy;ipisicing elit. Fuga porro quisquam sit, solutacon&shy;sequunturrerum ex architecto cupiditate? Cum laborumexpeditacupiditated&shy;olores in aliquamarchitectoquasnecessitatibu&shy;s velit facere?
</div>
.box5 {
  width: 150px;
  border: 3px solid salmon;
  hyphens: none;
}
/* .box6 .box7 省略相同配置 */ 
.box6 { hyphens: auto; }
.box7 { hyphens: manual; }
```
从下图中可以看到,
- 左边使用 none 时, 文本中即便有 `&shy;` 提示这里可以断行也不会断行, 超长的文本溢出显示
- 中间使用 auto 时, 浏览器自己决定怎在换行中使用连字符
- 右边使用 manual, 就真的让我们自己决定如何使用连字符. 首先, 硬断行(`&hyphen;`)一定有连字符, 见`1`; 其次, 软断行(`&shy;`)不一定加入连字符, 见`2`, 但是如果软断行有可能换行, 就会加入连字符, 见`3`.

![](../../image/Snipaste_2022-09-17_09-30-58.png)

### `<wbr>` 元素
如果你知道你想要一段长文字在何处断行 , 就可以在哪里使用 `<wbr>` 元素. 很显然, `wbr` 代表的是 `word break`, 一个可能换行的机会.

当在页面展示一个很长的 ``URL`` 时这回很有用. 下图, 虽然本文的盒子有宽度, 但是因为这个 URL 没有可以换行的地方因此第一个 `URL` 就溢出展示了. 但是如果加入 `wbr` 就可以自由换行啦
```html
<div class="box8">
  <a href="#">https://reactrouter.com/en/main/components/navigate</a>
</div>
<div class="box9">
  <a href="#">https://reactrouter.com<wbr>/en/main/components<wbr>/navigate</a>
</div>
```
![](../../image/Snipaste_2022-09-17_10-08-44.png)

