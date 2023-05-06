# 导航栏模糊背景 out 了? 来看看这种模糊是否合你胃口? 并且学习 backdrop-filter

传统情况下会将导航栏设置半透明的颜色并且通过 backdrop-filter 使用 filter 达到模糊的效果, 大概类似下图

![](../../image/Snipaste_2023-05-03_21-50-16.png)

要实现这个效果, 必须要借助的属性就是 backdrop-filter
## [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
> backdrop-filter 允许开发者将模糊或色彩偏离等图形效果应用到元素背后的区域. 因为它应用于元素背后所有内容, 因此如果你想要看到效果必须将元素的背景设置部分透明.

backdrop-filter 只有一个关键词属性值, none 表示不应用任何滤镜.

![](../../image/Snipaste_2023-05-06_21-03-30.png)

```html
<section class="grid">
  <div class="part none"></div>
  <div class="part blur"></div>
  <div class="part brightness"></div>
  <div class="part contrast"></div>
  <div class="part drop-shadow"></div>
  <div class="part grayscale"></div>
  <div class="part hue-rotate"></div>
  <div class="part invert"></div>
  <div class="part opacity"></div>
  <div class="part sepia"></div>
  <div class="part saturate"></div>
</section>
```
```css
.part {
  background: url('https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.part::before {
  background-color: rgba(255, 255, 255, .05);
}
.blur::before {
  backdrop-filter: blur(2px); /** 其他类似 */
}
```
看完上面代码, 会让人有一点疑惑, 好像很多滤镜都生效了, 但是有两个就是没有生效, 分别是 drop-shadow 和 opacity. 为此, 我进行了调研...🤔

虽然 backdrop-filter 是添加到前面的元素的 CSS 规则中却应用在后面的元素, 但是对于 drop-shadow 特殊一点, 必须前后元素同时应用才可以看到效果. 很有意思的是, tailwindcss 中没有这个滤镜👀

```css
.drop-shadow::before {
  backdrop-filter: drop-shadow(1px 1px 10px red);
}
.drop-shadow {
  backdrop-filter: drop-shadow(1px 1px 10px red);
}
```
![](../../image/Snipaste_2023-05-06_21-29-18.png)

接下来说到为什么 opacity 没有效果, 不, 它又效果, 只是单单只用这一个滤镜 opacity 看不出来效果.

![](../../image/Snipaste_2023-05-06_21-44-08.png)

![](../../image/)
谢谢你看到这里😊