# `background-origin`
> 这个属性用来指定背景图片原点位置. 
## 语法
1. `关键字`
    - `border-box`: 背景图片相对于 `border-box` 定位
    - `padding-box`: `默认值`, 背景图片相对于 `padding-box` 定位
    - `content-box`: 背景图片相对于 `content-box` 定位
2. 看代码
    - ```html
      <div class="box box9">你好<br>世界</div>
      <div class="box box10">你好<br>世界</div>
      <div class="box box11">你好<br>世界</div>
    - ```css
      .box {
        border: 15px dashed #111;
        padding: 1rem;
        background-position: left top;
        font-size: 2em;
        text-align: center;
      }
      .box9 {
        background-origin: border-box;
      }
      .box10 {
        background-origin: padding-box;
      }
      .box11 {
        background-origin: content-box;
      }
    - ![](../../image/Snipaste_2022-03-13_08-59-21.png)
    - 在下面三幅图中, `蓝色` 部分为 `content-box`, `蓝色`和`绿色` 部分为 `padding-box`, `蓝色`和`绿色`和`橘色` 部分为 `content-box`
3. 如果 `background-attach` 属性值为 `fixed`, 那么 `background-origin` 将不生效