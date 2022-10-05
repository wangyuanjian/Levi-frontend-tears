## hyphenate-character
> 这个属性设置在一行结尾断行处的连字字符

所有自动添加连字符和软换行机会可以添加的连字符的地方都会根据 `hyphenate-character` 的设置添加连字符

首先就要说兼容性的问题, 目前(2022年10月) `Chrome` 和 `Edge` 浏览器作为实验性特性支持这个 `CSS` 属性, `Safari` 浏览器支持, 但是都需要添加 
`-webkit-` 前缀

这个属性有两个值
- `<string>`: 自己指定的连字符, 如果自己指定的连字符很长, 那么浏览器可能会截断.
- `auto`: 默认值. 浏览器自己决定如何使用合适的连字符. 因为 `hyphenate-character` 是可继承的, 所以仅在覆盖继承属性时需要显示设置 `auto`.

```html
<div class="box box1">
  hello, world, whereAreYouFromIWantToKnow
</div>
<div class="box box2">
  hel&hyphen;lo, world, whereAreYouFr&shy;omIWantToKnow
</div>
<div class="box box3">
  hello, world, whereAreYouFr&shy;omIWantToKnow
</div>
```
```css
.box {
  border: 3px solid salmon;
  width: 150px;
  -webkit-hyphenate-character: '❤️';
  hyphenate-character: '❤️';
}
.box1 {
  hyphens: auto;
  -webkit-hyphens: auto;
}
.box2 {
  hyphens: manual;
  -webkit-hyphens: manual;
}
.box3 {
  hyphens: none;
  -webkit-hyphens: none;
}
```
从下面图中可以看出来, 首先 `hyphenate-character` 不会作用于 `&hyphen;` 这样强制换行的地方, 如 `hello` 的 `ll` 中间的部分. 
![](../../image/Snipaste_2022-10-05_10-38-51.png)


来看一下如果 `hyphenate-character` 设置的字符串很长浏览器回如何处理. 首先 `Chrome` 浏览器没有任何处理😅 
![](../../image/Snipaste_2022-10-05_10-59-57.png)
但是 `Safari` 浏览器会在字符串很长时调整 `hyphens` 为 `auto` 的断行表现
![](../../image/Snipaste_2022-10-05_13-26-00.png)
![](../../image/Snipaste_2022-10-05_13-25-32.png)

谢谢你看到这里😊
