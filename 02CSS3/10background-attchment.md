## `background-attachment`
> 这个属性决定背景图像的位置是否固定在视口(`viewpoint`), 还是随着它的包含块滚动.
## 语法
### 关键词
1. `scroll`
    - `默认值`, 表示背景相对于元素自身的固定的, 不随着元素的内容滚动而滚动
      - 概括理解`视口`就是浏览器的可见部分, 但不包括浏览器自身的书签栏, `tab` 栏和地址栏部分.
    - ```html
      <div style="height: 1000px; width: 100px;"></div>
      <div class="box">
        遊戲...
      </div>
      <div style="height: 1000px; width: 100px;"></div>
    - ```css
      .box {
        max-height: 200px;
        width: 300px;
        outline: 1px solid #111;
        overflow-y: auto;
        background: url(../../float/coffee-part.png) no-repeat;
      }
    - ![](../../image/background-attachment-scroll.gif)
2. `local`
    - 背景相对元素的内容是固定的. 如果一个元素有滚动机制, 那么背景会随着元素内容的滚动而滚动, 并且背景的绘制区域和背景定位区域是相对整个滚动区域而不是相对于`border`
    - ```html
      <div class="box box1">
        遊戲整合...
      </div>
    - ```css
      .box1 {
        background-attachment: local;
      }
    - ![](../../image/background-attachment-local.gif)
    - 不同于`scroll`, 当内容滚动不可见时, 内容下的背景图像同样滚动不可见了
3. `fixed`
    - 表示背景相对于视口`viewpoint`是固定的. 即使一个元素拥有滚动机制, 背景也不会随着元素滚动.
    - 和 `background-clip: text` 不兼容
    - ```html
      <div class="box box2">
        遊戲整...
      </div>
    - ```css
      .box2 {
        background-attachment: fixed;
      }
    - ![](../../image/background-attachment-fixed.gif)
    - 图片相对于固定在了`viewpoint`的`left top`位置, 只有元素出现在背景图片上面, 才能在元素内容下出现背景图; 否则, 不论怎么滚动元素内容都看不到背景图.
## 案例
1. 我们可以用这个属性实现丝滑的 `PPT` 翻页效果
    - ```html
      <body>
        <div class="box">123</div>
        <div class="box">456</div>
        <div class="box">789</div>
      </body>
    - ```css
      html, body {
        padding: 0;
        margin: 0;
      }
      .box {
        height: 100vh;
        width: 100%;
        background-attachment: fixed;
        font-size: 5rem;
        background-size: cover;
        color: #fff;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
      }
      .box:nth-of-type(1) {
        background-image: url(../../float/model.jpg);
      }
      .box:nth-of-type(2) {
        color: #111;
        background-image: url(../../float/love.jpg);
      }
      .box:nth-of-type(3) {
        background-image: url(../../float/fish.jpg);
      }
    - ![](../../image/background-attachment-ppt-slide.gif)
2. 更多的例子可以参考 [css-tricks](https://css-tricks.com/use-cases-fixed-backgrounds-css/#top-of-site) 的这篇文章