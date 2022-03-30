# `mask-image`
> 设置元素遮罩层的图像. \
> 上面这句话的意思就是默认了遮罩层图像的 `alpha` 通道值将会和元素的 `alpha` 通道值相乘
## 语法
1. `IE` 浏览器不支持😟. 使用谷歌和 `Edge` 浏览器时记得加上 `-webkit-` 私有前缀
2. 如果大家看完下面的第二点关于 `<image>` 的介绍, 和用作遮罩的 `svg` 与 `png` 图片, `完全透明的部分` 才会遮住元素, 比如星星的外轮廓和 `CSDN` `logo` 中非图片与文字部分.
    - ![](../../image/Snipaste_2022-03-30_14-21-59.png)
### 属性值
1. `none`
    - 没有遮罩层
2. `<image>`
    - 关于 `<image>` 可以取哪些值, 可以参考 [👉之前写的]()
    - ```html
      <div class="box box1">Lorem...</div>
      <div class="box box2">Lorem...</div>
      <div class="box box3">Lorem...</div>
    - ```css
      .box {
        width: var(--box-size);
        height: var(--box-size);
        padding: 5px;
        outline: 1px solid black;
      }
      .box1 {
        -webkit-mask-image: none;
        mask-image: none;
      }
      .box2 {
        background-color: salmon;
        -webkit-mask-image: url(../../float/star.svg);
        mask-image: url(../../float/star.svg);
      }
      .box3 {
        background-color: salmon;
        -webkit-mask-image: url(../../float/csdn.png);
        mask-image: url(../../float/csdn.png);
      }
    - ![](../../image/Snipaste_2022-03-30_11-40-59.png)
    - 上面的例子分别是不设置遮罩, 设置 `svg` 类型的图片和设置 `png` 类型的图片. 并且后面两个 `div` 都设置了背景色来突出显示图像的轮廓
3. `<mask-source>`
## 其他
1. 使用渐变遮罩的效果, 突出图片下方的文字
    - 
- ```html
- ```css
- ![](../../image/)