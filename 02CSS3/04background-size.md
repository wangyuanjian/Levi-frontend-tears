# `background-size`
> 设置背景图片的大小. 突变可以保留原有`尺寸`, 可以被拉伸, 也可以在保持其原有`比例`情况下缩放到元素可用空间尺寸.
> 所以, 关注的两点是图片的`尺寸(大小)`和`比例(宽高比)`
## 语法
1. `background-size` 的属性值可以为声明为下面的几种方式
    - `关键词`: `contain` 或 `cover`
    - 如果只设置图片`宽度`, 那么高度就是`auto`
    - 同时使用`宽度`和`高度`, 第一个值是`宽度`, 第二个值是 `高度`, 两个值都可以是 `<length>`长度类型数据, 或 `<percentage>`百分数类型数据, 或`auto`
2. 如果要同时指明多张背景图的大小, 需要用`逗号(,)`分隔
### 图片的内在大小和比例
1. 在设置背景图片的计算时依赖图片的内在大小(宽和高)和内在比例(宽高比)
    - `位图`: 如`jpg`或`png`, 位图总是有自己的大小和比例
    - `矢量图`: 如`svg`, 并不一定有自己的内在大小和比例. 如果矢量图同时存在宽高, 那它就有内在比例. 如果矢量图只有宽或只有高或两个都没有, 那其就没有内在比例
    - `渐变`: 没有内在大小和内在比例
### `cover` & `contain`
1. `cover`
    - 尽可能放大图片填满容器. 如果图片的比例和容器的比例不同时, 图片的宽或高就会缩放至和容器的宽或高一直, 然后保持图片的比例(`jpg`或`png`或设置的宽高的`svg`)
    - `cover` 本身的意思就是`覆盖`, 所以简单记忆为图片要尽可能地覆盖容器
    - ![](../../image/Snipaste_2022-03-03_22-37-29.png)
2. `contain`
    - `contain`的意思是保持, 尽量不裁剪不拉伸图片, 只通过缩放图片将图片保持在容器内. 如果容器大于图片, 那么图片会像瓷砖一样一张接一张地铺开, 除非设置 `background-repeat` 为 `no-repeaat`
    - ![](../../image/Snipaste_2022-03-05_08-10-53.png)
    - 和 `cover` 相同的是, 图片也缩放了, 但是不同的是, `contain` 作用下, 整张图片完整的显示在容器中.
### `auto`
1. `background-size` 的初始值为 `auto auto`, 📕注意中间没有逗号
    - 如果图片(`jpg`和`png`)有内在大小(宽和高), 那么就按照图片本身大小渲染. 两个容器的大于和小于容器的内在大小
      - ```html
        <div class="box box1"></div>
        <div class="box box8"></div>
      - ```css
        .box {
          border: 1px solid #111;
          width: 400px;
          height: 400px;
        }
        .box1 {
          background-image: url(../../float/coffee-whole.png);
        }
        .box8 {
          background-image: url(../../float/coffee-whole.png);
          width: 120px;
          height: 100px;
        }
      - ![](../../image/Snipaste_2022-03-05_10-08-59.png)
    - 如果图片(`渐变`)没有内在大小也没有内在比例, 则按照容器的大小渲染
      - ```html
        <div class="box box9"></div>
        <div class="box box10"></div>
      - ```css
        .box9 {
          background-image: linear-gradient(pink, rebeccapurple);
        }
        .box10 {
          background-image: linear-gradient(pink, rebeccapurple);
          width: 120px;
          height: 100px;
        }
      - ![](../../image/Snipaste_2022-03-05_10-11-59.png)
    - 如果图片没有内在大小, 但是有内在比例, 则按照`contain`的规则来渲染, 即缩放图片使其完整显示在容器内
      - 如何制作一个`没有内在大小, 但是有内在比例`的`svg`? 只用删除`svg`中的`width`和`height`
      - ```html
        <div class="box box11"></div>
        <div class="box box12"></div>
      - ```css
        .box11 {
          background-image: url(../../float/erweima_proportion_only.svg);
        }
        .box12 {
          background-image: url(../../float/erweima_proportion_only.svg);
          width: 180px;
          height: 100px;
        }
      - ![](../../image/Snipaste_2022-03-05_10-45-03.png)
    - 如果图片只有一个维度的内在大小(只有宽或者只有高)并且有内在比例, 那么图片将会按照有的那个维度渲染. 另一个维度会根据已有的维度和内在比例计算
      - ```svg
        width="100px" viewBox="0 0 1024 2056" 
      - `svg` 只有宽, 且宽高比为`1:2(1024:2056)`
      - ```html
        <div class="box box13"></div>
        <div class="box box14"></div>
      - ```css
        .box13 {
          background-image: url(../../float/erweima_one-dimension_has_proportion.svg);
        }
        .box14 {
          background-image: url(../../float/erweima_one-dimension_has_proportion.svg);
          width: 180px;
          height: 250px;
        }
      - ![](../../image/Snipaste_2022-03-05_11-08-48.png)
      - 上图中, 不论容器的宽高为多少, 最终渲染出来的图像(单个)的宽高比都是`1:2`
    - 如果图片只有一个维度的内在大小, 且没有内在比例, 那么渲染时有大小的按照大小渲染, 没有大小的按照容器对应的大小渲染
      - [可以参考 MDN 官网的这张渐变 svg](https://developer.mozilla.org/en-US/docs/Web/CSS/Scaling_of_SVG_backgrounds#one_specified_dimension_and_proportionless)
      - `svg` 图片只有宽度, 没有比例
      - ```html
        <div class="box box15"></div>
        <div class="box box16"></div>
      - ```css
        .box15 {
          background-image: url(../../float/https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/3468/af73bea307a10ffe2559df42fad199e3/100px-wide-no-height-or-ratio.svg);
        }
        .box16 {
          background-image: url(../../float/erweima_one-dimension_no_proportion.svg);
          width: 180px;
          height: 350px;
        }
      - ![](../../image/Snipaste_2022-03-06_11-04-59.png) 
      - 😔结果我怎么尝试都无法实现官网说的效果. 还是上面的链接, 往下翻一翻, 可以看到[官网演示的效果](https://developer.mozilla.org/en-US/docs/Web/CSS/Scaling_of_SVG_backgrounds#scaling_examples)
      - ![](../../image/Snipaste_2022-03-06_11-06-34.png)
2. 如果`background-size`只有一个值是`auto`另一个值非`auto`
    - 如果图片有内在比例, 那么将被拉伸到指定的大小. 没有长度的宽或高将根据指定的大小和内在比例计算
      - ```html
        <div class="box box17"></div>
        <div class="box box18"></div>
      - ```css
        .box17 {
          background-image: url(../../float/coffee-whole.png);
          background-size: 200px auto;
        }
        .box18 {
          background-image: url(../../float/coffee-whole.png);
          background-size: auto 200px;
        }
      - ![](../../image/Snipaste_2022-03-06_21-25-18.png)
      - `png` 有内在比例, 所以第一张图, 宽度被拉伸到`200px`, 高度变成 `200px * 232 / 310 = 149.67px`(原图为`310 * 232`). 第二章图片同理
    - 如果图片没有内在比例, 将被拉伸到指定的大小. 分两种情况. `1️⃣`如果图片只有一个内在大小, 那么没有内在大小的一边将按照内在比例计算. `2️⃣`如果没有内在大小, 就根据容器背景大小计算.
      - 情况`2️⃣`相对容易理解, `渐变`背景就是这样情况, 没有内在大小也没有内在比例, 容器是多大就缩放填充多大
      - 情况`1️⃣`不好意思, 我再次尝试失败😔, 不过 `MDN` 中有几句话大意是`缺少内在比例或内在大小的比例图作为背景尚未在所有浏览器得到支持, 所以要小心`
      - ![](../../image/Snipaste_2022-03-06_21-52-53.png) 
### `<length>` 或者 `<percentage>`
1. 首先`<length>`, 图片强制拉伸或缩小至指定宽或指定高的大小. 这个值不能为负
2. `<percentage>`, 图片强制拉伸或缩小至容器定位区域的百分比大小. 但是容器定位区域由 `background-origin` 决定, 默认为 `padding box`. 但如果背景的 `background-attachment` 为 `fixed`, 那么定位区域将为整个浏览器视窗大小. 同样不允许赋值.
    - ```html
      <div class="box box20"></div>
      <div class="box box21"></div>
      <div class="box box22"></div>
    - ```css
      .box20 {
        background-image: url(../../float/coffee-whole.png);
        background-size: 100px 200px;
      }
      .box21 {
        background-image: url(../../float/coffee-whole.png);
        background-size: 100% 100%;
        padding: 40px;
      }
      .box22 {
        background-image: url(../../float/coffee-whole.png);
        background-size: 100% 100%;
        background-origin: content-box;
        padding: 40px;
      }
    - ![](../../image/Snipaste_2022-03-06_22-14-53.png)
    - ![](../../image/Snipaste_2022-03-06_22-16-24.png)
## 规则
1. 如果有空间没有被背景图片覆盖, 那么将被 `background-color` 填满, 背景颜色会显示在背景图片后面
## 参考资料
1. [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)
2. [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)
3. [MDN 文档](https://whereswalden.com/files/mozilla/background-size/more-examples.html)
4. 本文中出现的 `svg` 图标和对应的 `svg` 代码, 均来自阿里巴巴`iconfont`图标库, 仅作学习使用, 侵删, 表示感谢