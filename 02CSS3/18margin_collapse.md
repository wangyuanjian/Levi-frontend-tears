## `margin 重叠(margin collapse)`

首先有两个地方是我自己以前也没有注意的
  - 非替换元素的内联元素(`<span>`, `<code>`等), 设置上下 `margin` 没有用. 但是设置左右 `margin` 是有效果的. 而替换元素(`<img> 等`), 设置上下左右四个 `margin` 都有效果
    - ![](../../image/Snipaste_2022-07-19_08-37-10.png)
  - 其次就是只有上下 `margin` 会发生重叠(这个说法不严谨, 后面会解释).


进入正题, 上下 `margin` 重叠时, 谁的值(绝对值)更大最终的 `margin` 大小就是谁的值. 如果上下 `margin` 大小相同也是这样. 

### `margin 重叠的三种情况`
#### `相邻的兄弟节点`
```html
<div class="box">
  <div style="margin-bottom: 1rem;">123</div>
  <div style="margin-top: 2rem;">abc</div>
</div>
```
```css
.box {
  border: 1px solid;
}
```
最终合并的 `margin` 大小为 `2rem`
![](../../image/Snipaste_2022-07-18_18-53-57.png)

如果想阻止这种情况 `margin` 合并很简单, 就是破坏`相邻`这个条件, 因为两个都是块元素, 给他们中间增加 `<br/>` 换行就可以啦😀
```html
<div class="box">
  <div style="margin-bottom: 1rem;">123</div>
  <br>
  <div style="margin-top: 2rem;">abc</div>
</div>
```
![](../../image/Snipaste_2022-07-19_09-19-20.png)


#### `没有内容将父子分开`
📕如果没有 `border`, `padding`, 行内元素, 格式化上下文(`BFC(Block Formatting Context)`) 或者清除浮动将一个父元素的上 `margin` 与其子元素的上 `margin` 分开; 重叠的部分溢出父元素.
```html
<div style="margin-top: 1rem; background-color: salmon;">
  <div style="margin-top: 2rem;">123</div>
</div>
```
父子元素除了 `margin` 外都没有设置任何属性. 但是父元素离页面顶部的高度是 `2rem`, 因为出现了 `margin` 重叠.
![](../../image/Snipaste_2022-07-18_19-14-35.png)

📕父子元素出现 `margin` 重叠的第二种情况是没有 `border`, `padding`, 行内元素, `height` 或者 `min-height` 将一个父元素的下 `margin` 与其子元素的下 `margin` 分开, 那么 `margin` 就会重叠. 重叠的部分溢出父元素.
![](../../image/Snipaste_2022-07-18_19-18-57.png)


我知道此刻你的心里在想什么🤡你在想如果第一种情况和第二种情况同时发生会怎么样呢? 必须满足.
```html
<div style="margin-bottom: 3rem;">456</div>
<div style="margin-top: 1rem; background-color: salmon;">
  <div style="margin-top: 2rem;">123123123123123123123123</div>
</div>
```
从下面的内容看, 前两个块元素满足兄弟节点 `margin` 重叠, 后两个块元素之间满足父子节点 `margin` 重叠, 且两种情况的重叠部分又重叠, 最终的重叠大小为 `3rem`, 大者获胜🥇
![](../../image/Snipaste_2022-07-18_19-25-59.png)

🔈关于这种情况, 在开发时需要注意, 如果我们设置子元素 `margin` 是为了和保持父元素一定距离就可能出现 `margin` 重叠, 所以这时候改用设置父元素 `padding` 来达到相同的效果.

#### `空的块级元素`
如果一个空元素没有设置 `border`, `padding`, 行内元素, `height`, `min-height` 来将上下 `margin` 分开, 那么上下 `margin` 也将重叠.
```html
<div style="margin-top: 1rem; margin-bottom: 2rem;"></div>
```
来看上面的空元素, 即便同时设置了上下 `margin`, 但最终的 `margin` 高度还是 `32px(2rem)`. 
![](../../image/Snipaste_2022-07-18_19-38-16.png)
但是如果稍微加点内容(行内元素)就不一样了
![](../../image/Snipaste_2022-07-18_19-40-24.png)

## 其他复杂的规则
其实 [CSS-TRICKS: The Rules of Margin Collapse](https://css-tricks.com/the-rules-of-margin-collapse/) 这篇文章里介绍了一些开发人员认为 `margin` 重叠的复杂难懂. 特别是不同情况重合在一起时, 但是还是有一些情况更加常见需要注意.
### 第一, 即便某个 `margin` 的值为 `0`, 上述规则仍然使用
### 负值 `margin`
如果参与重叠的 `margin` 中包含负值, 那么重叠之后的值为最大的正 `margin` 与最小(最负)的负 `margin` 的和.
```html
<div style="margin-bottom: 5rem;">456</div>
<div style="margin-top: 1rem; background-color: salmon;">
  <div style="margin-top: -2rem;">123123123123123123123123</div>
</div>
可以看到, 最后的重叠 `margin` 为 `3rem(=5rem-2rem)`
```
![](../../image/Snipaste_2022-07-18_19-54-05.png)
那如果有两个负值 `margin` 又怎么样呢, 同样的重叠之后的 `margin` 为 `1rem(=5rem-4rem)`
![](../../image/Snipaste_2022-07-18_19-56-37.png)
让我们考虑最最最最后一种情况, 三个 `margin` 全为负. 全是负的话依然是绝对值最大的负值为最后合并后的值.
```html
<body style="padding-top: 5rem;">
  <div style="margin-bottom: -1rem;">456456456456456</div>
  <div style="margin-top: -2rem; background-color: salmon;">
    <div style="margin-top: -3rem;">123123123123123123123123</div>
  </div> 
</body>
```
在三个 `margin` 中, 绝对值最大的 `margin` 为 `-3rem`, 那么合并后的 `margin` 值为 `-3rem`
![](../../image/Snipaste_2022-07-18_22-00-03.png)

### `float` 和 `absolute` 定位的元素 `margin` 永不重叠
```html
<div style="margin-bottom: 1rem;">456</div>
<div style="float: left; margin-top: 1rem;">123</div>
```
第一个 `div` 不浮动, 第二个浮动, 两者不发生 `margin` 重叠
![](../../image/Snipaste_2022-07-18_22-08-43.png)
```html
<div>我是凑热闹的~~~~</div>
<div style="position: relative; margin-top: 1rem; background-color: pink;">
  <div style="position: absolute; margin-top: 3rem; background-color: skyblue;">123</div>
</div>
```
相对定位的 `div` 和决定定位的 `div` 满足父子组件 `margin` 重叠的条件但是并没有重叠.
![](../../image/Snipaste_2022-07-18_22-12-59.png)
### `flex` 子项元素没有 `margin` 重叠
```html
<div style="display: flex; flex-direction: column;">
  <div style="flex: 0 0 auto; margin: 10px 10px;">111</div>
  <div style="flex: 0 0 auto; margin: 10px 10px;">222</div>
  <div style="flex: 0 0 auto; margin: 10px 10px;">333</div>
  <div style="flex: 0 0 auto; margin: 10px 10px;">444</div>
</div>
```
在这个 `flex` 布局中, 主轴的方向是从上到下, 相邻元素之间符合 `margin` 重叠的第一种情况, 但是并没有发生重叠.
![](../../image/Snipaste_2022-07-19_08-09-26.png)
### `不是上下, 而是块元素堆叠方向`
一般大家都会说是上下 `margin` 才会重叠, 这个说法不错, 因为大多数情况文档流是从上到下, 块元素也是从上到下排列的. 但是如果我们修改书写顺序, 比如古代文字是从右到左书写的, 那么这时候视觉上发生 `margin` 重叠的不是上下, 而是左右. 

📕所以严谨的说法是, 发生 `margin` 重叠的方向是块元素排列方向. 如果从上到下写字, 就是视觉上下 `margin` 重叠; 如果从左到右写字, 就是视觉左右 `margin` 重叠.
```html
<div style="writing-mode: vertical-rl;">
  <div style="margin-block-start: 10px; margin-block-end: 10px;">123</div>
  <div style="margin-block-start: 10px; margin-block-end: 10px;">456</div>
</div>
```
在代码中我们使用 `margin-block-start` 和 `margin-block-end` 这两个 `CSS` 属性来表示块排列开始方向和结束方向的 `margin`
![](../../image/Snipaste_2022-07-19_08-39-57.png)

谢谢你看到这里, 本文仅作了有限的讨论和探索, 不足之处请指出