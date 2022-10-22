## 图文排版 之 `line-height`
> 设置行盒子的高度.

`line-height` 经常被用来设置多行文本的行间距. 对于块级元素, `line-height` 制定了行盒子的最小高度. 对于非替换的内联元素, `line-height` 的值用来计算行盒子的高度.

一般来说, 大家都知道一个 `div` 的高度默认是由其子元素撑起的, 但是负责撑起的却不是 `font-size` 而是 `line-height`.

从下图可以看出, 当 `font-size` 为 `0` 但是 `line-height` 为 `16px` 的时候 `div` 被撑起了, 说明撑起 `div` 的是 `line-height` 不是 `font-size`.唉, 这时候聪明的你会问了🤔️, 为啥 `font-size` 为 `0` 的时候 `div` 塌陷成一条线了呢? 这就和 `line-height` 的默认属性值 `normal` 有关系了.
![](../../image/Snipaste_2022-10-22_09-37-33.png)

### 属性值
`line-height` 的属性值一共可以有四种类型, 分别是关键词 `normal`, `number` 类型, `length` 
类型, 和 `percentage` 类型.

#### `number` 类型
如果值为 `number`, 那么是没有单位的. 最终的 `line-height` 大小是 `number * font-size` 的值. 如果通过浏览器开发者工具的`已计算`的标签页, 看到的值也是 `number` 而不是乘积后的结果.

[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) 中介绍大多数情况下, `number` 是最推荐设置 `line-height` 的方式, 可以避免因为继承而出现的奇怪结果.
```css
.number {
  font-size: 20px;
  line-height: 1.5;
}
```
从下图可以看出来, 因为 line-height 的值是 number 类型, 最后计算的结果是 `1.5 * 20px = 30px`, 又因为整个文字是两行, 所以 div 高度是 60px
![](../../image/Snipaste_2022-10-22_10-04-56.png)


#### 关键词 normal
具体 normal
```
```
line-height
![](../../image/)

### 其他
1️⃣
2️⃣