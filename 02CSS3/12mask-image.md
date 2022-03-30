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
    - 指向图片或 `svg` 中 `<mask>` 的 `url`
    - ```html
      <svg width="0" height="0" viewBox="0 0 200 150">
        <defs>
          <mask id="mask">
            <circle fill="#FFFFFF" cx="75" cy="75" r="50" />
          </mask>
        </defs>
      </svg>
      <div class="box box4">Lorem ...</div>
    - ```css
      .box4 {
        background-color: salmon;
        -webkit-mask-image: url(#mask);
        mask-image: url(#mask);
      }
    - ![](../../image/Snipaste_2022-03-30_15-17-05.png)
    - 📕目前, 只有 `Firefox` 支持这种语法😟
## 其他
1. 使用渐变遮罩的效果, 突出图片下方的文字
    - ```html
      <div class="box-demo">
        <img src="../../float/coffee-whole.png" alt="">
        <figcaption>Coffee</figcaption>
      </div>
    - ```css
      .box-demo {
        padding: 0;
        width: var(--box-size);
        height: var(--box-size);
        position: relative;
      }
      .box-demo > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        -webkit-mask-image: linear-gradient(black, transparent);
        mask-image: linear-gradient(black, transparent);
      }
      .box-demo > figcaption {
        position: absolute;
        right: 1rem;
        bottom: 2rem;
        font-size: 1.5rem;
      }
    - ![](../../image/Snipaste_2022-03-30_14-51-06.png)
    - 📕❗注意: `mask-image` 部分, 前面说过, 完全透明的部分才会遮住元素, 所以渐变是由 `black` 过渡到 `transparent`. 
    - 而不是视觉上想当然, 图片上面完整显示, 那应该是从 `transparent` 过渡到 `black` 吧? NO!
2. 谢谢你看到这里