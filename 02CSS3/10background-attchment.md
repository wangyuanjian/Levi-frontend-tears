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
1. `fixed`
    - 表示背景相对于视口`viewpoint`是固定的. 即使一个元素拥有滚动机制, 背景也不会随着元素滚动.
      
- ```html
- ```css
- [](../../image/)