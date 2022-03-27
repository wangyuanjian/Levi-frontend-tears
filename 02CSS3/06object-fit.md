# `object-fit`
> 指定可替换元素(如`<img>`)的内容如何适应其由 `width` 和 `height` 设置的盒子大小
## 语法
1. `object-fit` 可以是下面几个关键字之一. 下文将`可替换元素` 称为 `对象(object)`
### 关键字
1. `contain`
    - 可替换元素的内容将被缩放, 在填充元素 `content box` 时保持元素的宽高比. 但是, 要保证图片完整显示出来. 类型 `background-size: contain`
    - 星星的图片大小为 `67*67`, 咖啡的图片大小为 `257*123`, 代码中将设置可替换元素的大小为 `150*150`, 并加上上下左右均为 `20px` 的 `padding`.
    - ```html
      <div class="container">
        <img 
          class="box contain" 
          src="../../float/star.png" 
          alt=""
        >
        <img 
          class="box contain" 
          src="../../float/coffee-part.png" 
          alt=""
        >
      </div>
    - ```css
      .box {
        width: 150px;
        height: 150px;
        padding: 20px;
        outline: 1px solid black;
      }
      .contain {
        object-fit: contain;
      }
    - 下图, 星星的图片小于其宽高盒的大小, 所以放大; 咖啡的图片在保持其宽高比和完整显示的条件下, 整个图片被缩小至宽度为 `150` 的大小显示了.
    - ![](../../image/Snipaste_2022-03-25_17-29-49.png)
2. `cover`
    - 可替换元素在`填满`整个 `content box` 的同时保留原始宽高比, 类似 `background-size: cover`. 如果对象的宽高比和其盒子的宽高比不成比例, 那么对象将会被`裁切`.
    - ```html
      <img 
        class="box cover" 
        src="../../float/star.png" 
        alt=""
      >
      <img 
        class="box cover" 
        src="../../float/coffee-part.png" 
        alt=""
      >
    - ```css
      .box {
        width: 150px;
        height: 150px;
        padding: 20px;
        outline: 1px solid black;
      }
      .cover {
        object-fit: cover;
      }
    - 下图, 星星图片大小小于其宽高盒, 所以被放大显示, 因为和宽高盒的宽高比相同; 咖啡图片比例与宽高盒不同, 高度缩放为和宽高盒相同, 这个图片被裁切.
    - ![](../../image/Snipaste_2022-03-25_19-21-13.png)
3. `fill`
    - `默认值`
    - 被替换元素的内容将被拉伸以填满整个 `content box`. 整个对象将完全填充此宽高盒, 如果对象的宽高比与宽高盒的宽高比不匹配, 那么对象将被拉伸. 意思就是, 图像会完整显示, 但是图像可能会被拉伸
    - ```html
      <div>
        <img class="box fill" src="../../float/star.png" alt="">
        <img class="box fill" src="../../float/coffee-part.png" alt="">
      </div>
    - ```css
      .fill {
        object-fit: fill;
      }
    - ![](../../image/Snipaste_2022-03-26_14-28-56.png)
    - 下图, 星星图片和其宽高盒的宽高比相同, 只是等比例缩放而没有被拉伸, 咖啡图片首先是完整显示了, 但为了填满整个 `content box` 而在 `y` 方向上拉伸. 
4. `none`
    - 被替换内容不会缩放, 但是可能被裁剪
    - ```html
      <div>
        <img class="box none" src="../../float/star.png" alt="">
        <img class="box none" src="../../float/coffee-part.png" alt="">
      </div>
    - ```css
      .none {
        object-fit: none;
      }
    - 如下图, 两个图都没有缩放, 但咖啡图却被裁剪.
    - ![](../../image/Snipaste_2022-03-27_10-56-17.png)
5. `scale-down`
    - 样式与 `none` 或 `contain` 相同, 取决于哪个属性得到的对象尺寸更小.
    - ```html
      <div>
        <img class="box scale-down" src="../../float/star.png" alt="">
        <img class="box scale-down" src="../../float/coffee-part.png" alt="">
      </div>
    - ```css
      .scale-down {
        object-fit: scale-down;
      }
    - 如下图, 星星图片的效果与 `none` 相同, 而咖啡图片的效果与 `contain` 相同, 因为对应效果下被替换元素(图片)的尺寸更小
    - ![](../../image/Snipaste_2022-03-27_11-04-57.png)
7. 可以通过使用 `object-position` 属性来切换被替换元素的内容对象在元素框内的对齐方式
    - 因为 `object-position` 是 `50% 50%`, 所以看到上面的图片都是垂直水平居中展示的.
## 其他
1. 📕`IE` 浏览器不支持此属性😟
2. 使用 `object-fit: cover` 的效果. 实现 `hover` 元素时, 图片放大; 否则, 展示原来的样子
    - ```html
      <div class="box2">
        <img 
          class="box1 cover" 
          src="../../float/coffee-part.png" 
          alt=""
        >
      </div>
    - ```css
      .box2 {
        width: 150px;
        height: 150px;
        outline: 1px solid black;
        overflow: hidden;
      }
      .box1 {
        width: 100%;
        height: 100%;
        transition: transform .5s;
      }
      .box1:hover {
        transform: scale(1.2);
      }
    - ![](../../image/object-fit-cover-demo.gif)
3. 图片来自网络, 侵删🌹