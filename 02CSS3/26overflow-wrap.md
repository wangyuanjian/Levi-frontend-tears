## overflow-wrap
> 当一个不可分割的字符串太长要溢出其行盒子时, 这个属性设置是否允许在字符串中换行

📕原本这个属性是一个非标准的微软私有属性叫 `word-wrap`, 但是在 `CSS3` 中被重命名为 `overflow-wrap`. `word-wrap` 现在被当作 `overflow-wrap` 的别名了

属性值有三个
- `normal`: 仅在正常的单词断点处中断, 比如连个单词之间空格
- `anywhere`: 为了防止溢出, 可以在单词的任何位置断开, 并且不添加连字符.
- `break-word`: 和 `anywhere` 相同, 但是在计算 `min-content` 时**不考虑**软换行机会, 而 `anywhere` 在计算 min-content 时考虑软换行.

```css
.box {
  border: 3px solid salmon;
  width: min-content;
}
.box1 {
  overflow-wrap: break-word;
}
.box2 {
  overflow-wrap: anywhere;
}
```
```html
<div class="box box1">Lorem isum， dolor sit</div>
<div class="box box2">Lorem isum， dolor sit</div>
<div class="box box1">你好，我是张三 很开心 见到你最近</div>
<div class="box box2">你好，我是张三 很开心 见到你最近</div>
```
从下图就可以看出, `anywhere` 在计算 `min-content` 时考虑软换行的意思就是每个中文、每个英文字母、每个标点符号能断就断, 而 `break-word` 没有考虑 `min-content` 和我们认知的计算规则比较相似, 而且像逗号(`，`)这样的避首标点也没有出现在一行的开头.
![](../../image/Snipaste_2022-09-19_11-44-31.png)

再来看看 `overflow-wrap: anywhere;` 和 `word-break: break-all` 的区别吧
```html
<div class="box box2">Lorem isum， dolor sit</div>
<div class="box box3">Lorem isum， dolor sit</div>
<div class="box box2">你好，我是张三 很开心 见到你最近</div>
<div class="box box3">你好，我是张三 很开心 见到你最近</div>
```
```css
.box2 {
  overflow-wrap: anywhere;
}
.box3 {
  word-break: break-all;
}
```
![](../../image/Snipaste_2022-09-19_21-51-13.png)

从上图还是可以比较清楚地看出, 两者的不同是处理在标点符号左右的软换行. `word-break: break-all` 不会在表达符号左右的软换行处换行, 而 `overflow-wrap: anywhere;` 则会.

额外一点, `overflow-wrap` 生效的前提是浏览器允许换行, 如果使用 `white-space` 阻止了换行, 那么 `overflow-wrap` 也就不会生效
```css
<div class="box box4">Lorem isum， dolor sit</div>
.box4 {
  width: 100px;
  white-space: pre;
  overflow-wrap: anywhere;
}
```

![](../../image/Snipaste_2022-09-19_22-00-08.png)

谢谢你看到这里😊