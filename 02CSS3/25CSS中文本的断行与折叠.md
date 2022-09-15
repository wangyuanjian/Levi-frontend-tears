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

```html
```
![](../../image/)