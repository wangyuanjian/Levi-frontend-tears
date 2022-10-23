## 图文排版 之 `line-height`
> 设置行盒子的高度.

`line-height` 经常被用来设置多行文本的行间距. 对于块级元素, `line-height` 制定了行盒子的最小高度. 对于非替换的内联元素, `line-height` 的值用来计算行盒子的高度.

一般来说, 大家都知道一个 `div` 的高度默认是由其子元素撑起的, 但是负责撑起的却不是 `font-size` 而是 `line-height`.

从下图可以看出, 当 `font-size` 为 `0` 但是 `line-height` 为 `16px` 的时候 `div` 被撑起了, 说明撑起 `div` 的是 `line-height` 不是 `font-size`.唉, 这时候聪明的你会问了🤔️, 为啥 `font-size` 为 `0` 的时候 `div` 塌陷成一条线了呢? 这就和 `line-height` 的默认属性值 `normal` 有关系了.
![](../../image/Snipaste_2022-10-22_09-37-33.png)

### 属性值
`line-height` 的属性值一共可以有四种类型, 分别是关键词 `normal`, `number` 类型, `length` 类型, 和 `percentage` 类型.

#### `number` 类型
如果值为 `number`, 那么是没有单位的. 最终的 `line-height` 大小是 `number * font-size` 的值. 如果通过浏览器开发者工具的`已计算`的标签页, 看到的值也是 `number` 而不是乘积后的结果.

[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) 中介绍大多数情况下, `number` 是最推荐设置 `line-height` 的方式, 可以避免因为继承而出现的奇怪结果.
```css
.number {
  font-size: 20px;
  line-height: 1.5;
}
```
从下图可以看出来, 因为 `line-height` 的值是 `number` 类型, 最后计算的结果是 `1.5 * 20px = 30px`, 又因为整个文字是两行, 所以 `div` 高度是 `60px`
![](../../image/Snipaste_2022-10-22_10-04-56.png)

#### 关键词 normal
具体 `normal` 所设定的 `line-height` 有多少取决于浏览器的实现, 包括火狐浏览器在内的桌面浏览器使用 `1.2` 左右的默认值, 当然取决于元素的 `font-family`. 所以可以回答上面的问题了, 因为 `font-size` 的值为 `0`, 所以不论乘以多少还是 `0`, 也就没有高度了.
在 `Edge/Chrome` 浏览器中, `normal` 的值大约是 `1.4`, 在 `Safari` 浏览器中大约是 `1.125`. 
![](../../image/Snipaste_2022-10-23_15-12-26.png)
![](../../image/Snipaste_2022-10-23_15-15-42.png)

下面看看不同的字体对 `line-height` 的影响, 在 `macOS` 中, 苹方字体的 `normal` 是上面算过的 `1.125`, 但是宋体和楷体的 `normal` 就是 `1` 了.
![](../../image/Snipaste_2022-10-23_15-28-59.png)

### `length` 类型
可以使用带有单位的长度值作为 `line-height`, 如果使用 `em` 单位可能产生意想不到的效果😓.

```css
.em-2 {
  line-height: 1em;
}
.em-2 .son {
  font-size: 2em;
}
```
```html
<div class="em-2">
  <div class="son">
    Lorem ipsum dolor sit...
  </div>
</div>
```
![](../../image/Snipaste_2022-10-23_15-54-24.png)

糟糕的事情出现了, 文字挤在了一起, 这是因为子元素设置的 `line-height` 虽然从父元素继承了 `1em` 但是这个 `em` 是相对于父元素的 `font-size` 也就是默认的 `16px` 计算的, 导致子元素的 `line-height` 也是 `16px`. 所以这个继承现象比较奇怪, 要谨慎使用 `em` 为单位的 `line-height`
### `percentage` 类型
相对于元素自身的 `font-size` 设置. 结果就是百分数乘以元素自身计算出来的字体大小, 百分比也可能带来意想不到的效果.

```css
.parent {
  line-height: 100%;
  margin-top: 2em;
}
.parent .son {
  font-size: 2em;
}
```
```html
<div class="parent">
  <div class="son">
    Lorem ipsum dolor sit...
  </div>
</div>
```
和上面 `length` 类型的例子一样, 样式出了问题. 同样 `.son` 继承了 `.parent` 的 `line-height 100%`, 但是这个 `100%` 是相对于 `.parent` 的 `font-size` 计算的.
![](../../image/Snipaste_2022-10-23_18-38-13.png)


```
```
line-height


![](../../image/)

### 其他
1️⃣ MDN 推荐网页的主要段落文字, 要设置 line-height 最小为 1.5, 这样可以提高用户在低可视条件下的阅读体验, 同时帮助有阅读困难的用户.
2️⃣ 通过将 line-height 和容器的 height 设置为一样的大小可以实现单行文字的垂直居中, 

谢谢你看到这里😊