# image 标签的 width 和 height 有大作用!!!
我们将在这里探讨一个问题, 如果在加载图片之后不影响图片下边文字的移动.

在给出答案之前, 要知道 width 在 2019 年之后 [有了更多能力](https://caniuse.com/mdn-html_elements_img_aspect_ratio_computed_from_attributes). 也就是浏览器会根据 width 和 height 计算 aspect-ratio. 当然, 为了实现我们的目标, 提前知道图片的宽高比是必须的.

感谢百度, 因为我用了百度的 logo 图片作为展示. 图片的大小是 540*258

![](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png)

## width 最开始的用途
width 和 height 用来指定图片的宽度和高度, 虽然要求值都是以 px 为单位的数字, 但是下图中带单位的写法写生效
![](../image/Snipaste_2023-12-16_11-20-08.png)

作为标签属性的 width 是可以被 CSS 中的 width 覆盖的.
![](../image/Snipaste_2023-12-16_11-21-22.png)

## 发挥作用
下面我们需要处理

![](../image/)
谢谢你看到这里😊