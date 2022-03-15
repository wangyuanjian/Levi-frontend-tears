# `background-clip`
> 设置元素的背景(背景图片或背景颜色)是否延伸至 `border-box` 下, `padding-box` 下, 或者 `content-box` 下 \
> `clip` 本身就有 `修剪` 的意思~ 
## 语法
1. 如果元素没有 `background-image` 或 `background-color`, 那么这个属性只有在边框有透明部分或者部分透明区域(比如`border-style` 为 `dashed`)才能看到效果, 否则边框将会覆盖 `background-clip` 产生的样式.
2. `关键词属性`
    - `border-box`: `默认值`. 背景延申至 `border` 的外沿, 但是在 `z` 方向上仍在 `border` 下层.
    - `padding-box`: 背景延申至 `padding` 的外沿, 不会绘制在边框下面.
    - `content-box`: 背景被裁剪至 `content` 内容区
    - `text`: 背景被裁减成文字的形状
3. 看一段示例
    - ```html
      <div class="box box9">你好<br>世界9</div>
      <div class="box box10">你好<br>世界10</div>
      <div class="box box11">你好<br>世界11</div>
      <div class="box box12">你好<br>世界12</div>
    - ```css
      .box {
        width: 200px;
        height: 200px;
        background-image: url(../../float/fish.png);
        /* background-repeat: no-repeat; */
        border: 15px dashed salmon;
        padding: 1rem;
        font-size: 2em;
        text-align: center;
        color: #fff;
      }
      .box9 {
        -webkit-background-clip: border-box;
        background-clip: border-box;
      }
      .box10 {
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border-color: aquamarine;
      }
      .box11 {
        -webkit-background-clip: content-box;
        background-clip: content-box;
        border-color: skyblue;
      }
      .box12 {
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: 3em;
        font-weight: bold;
      }
    - ![](../../image/Snipaste_2022-03-15_20-08-06.png)
    - 这四个背景的 `background-clip` 分别为 `content-box`, `padding-box`, `content-box` 和 `text`, 可以看到图片的默认根据 `background-position: left top;` 展示的, 只不过 `clip(被裁掉)` 了不同的区域.
    - 📕注意点`1️⃣`, 如果想要 `background-clip: text` 生效, 注意将 `color` 属性设置为 `transparent` 或者带有 `alpha` 通道的颜色, 不然纯黑的文字颜色就挡死背景了😅
    - 📕注意点`2️⃣`: 当 `background-clip` 值为 `border-box` 时, 注意 `background-repeat` 不能是 `no-repeat`, 参考下面的对比
      - 左边的是 `repeat`, 右边的是 `no-repeat`. 来解释一下为什么 `no-repeat` 会这样展示?
      - 因为盒子的宽度是 `200px`, 左右 `padding` 分别为 `16px`, `border` 宽度为 `15px`, 加起来 `200 + 16*2 + 15*2 = 262px`, 大于图像宽度 `245px`,
      - 所以根据 `background-position` 的默认值 `left top` 和 `background-origin` 的默认值 `padding-box` , 就自然左上角和 `padding` 的边界对齐 
      - ![](../../image/Snipaste_2022-03-15_20-29-37.png)
4. 在移动端 `iOS 14` 版本才部分支持 `background-clip` 属性, 所以要加上 `-webkit-background-clip` 私有属性.
## 规则
1. 📕因为`root element`(即`<html>`)
## 注
1. 图片来自 [unsplash](https://unsplash.com/), 仅作个人学习使用, 感谢