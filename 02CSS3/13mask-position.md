# `mask-position`
> 设置遮罩图像的初始位置, 这个位置是相对于遮罩位置层(由 `mask-origin` 确定) \
> 关于 `CSS` 中 `<position>` 数据类型, 可以参考之前的这篇分享 [`background-position`]() 的文章.
## 语法
1. 一个或多个 `<position>` 值, 多个值需要用逗号分开
    - 📕目前浏览器, 除了 `Safari`, 几乎都不支持三值或四值语法, 因此这里也就不多分享😅.
    - `IE` 浏览器压根不支持该属性.
    - 在 `Chrome`, `Edge`, 和 `Opera` 要加上私有前缀 `-webkit`. `79` 及之后的 `Edge` 版本不需要私有前缀.
2. `<position>`
    - 代表一个 `2D` 位置, 可以使用相对或绝对值, 这个值也可能让位置跑到元素盒子之外.
3. 只有一个值
    - 可能的情况 :
      - 是 `center`. 垂直水平都居中显示.
      - 是 `top`, `right`, `bottom`, `left` 中的一个, 另一个默认为 `center`. 图片紧贴着指定的边居中显示.
      - `<length>` 或 `<percentage>`. 表示相对于盒子左边界的 `x` 轴坐标, `y` 轴默认 `center`.
    - ```html
      <div class="container">
        <div class="box box1">Lorem...</div>
        <div class="box box2">Lorem...</div>
        <div class="box box3">Lorem...</div>
      </div>
    - ```css
      :root {
        --box-size: 220px;
      }
      .box {
        width: var(--box-size);
        height: var(--box-size);
        padding: 5px;
        border: 3px solid black;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-image: url(../../float/star.svg);
        mask-image: url(../../float/star.svg);
        background-color: salmon;
      }
      .box1 {
        -webkit-mask-position: center;
        mask-position: center;
      }
      .box2 {
        -webkit-mask-position: right;
        mask-position: right;
      }
      .box3 {
        -webkit-mask-position: 10px;
        mask-position: 10px;
      }
    - ![](../../image/Snipaste_2022-04-11_11-51-19.png)
    - 解释一下, 因为设置遮罩, 会把 `border`, `outline` 等统统遮起来, 所以没办法情况看到盒子轮廓, 只能使用开发者工具选中元素方便看到 `border` 区域(黄色部分)
2. 两个属性值
    - 如果两个属性值都是关键字, 那么就要注意关键字的顺序. `top, bottom` 只能作为 `y` 方向的关键字. `left, right` 只能作为 `x` 方向的关键字. `center` 都可以
    - 如果两个属性值一个是关键字, 一个是数值, 同样注意顺序.
    - 如果两个属性值都是数值, 就没有顺序, 第一个值表示 `x` 方向坐标, 第二个表示 `y` 方向的坐标.
    - ```html
      <div class="container">
        <div class="box box4">Lorem...</div>
        <div class="box box5">Lorem...</div>
        <div class="box box6">Lorem...</div>
      </div>
    - ```css
      .box4 {
        -webkit-mask-position: bottom right;
        mask-position: bottom right;
      }
      .box5 {
        -webkit-mask-position: 30% top;
        mask-position: 30% top;
      }
      .box6 {
        -webkit-mask-position: 30% 70%;
        mask-position: 30% 70%;
      }
    - ![](../../image/Snipaste_2022-04-11_14-58-24.png)
### 应用
1. 简易版聚光灯效果
    - ![](../../image/mask-position-light.gif)
    - ```html
      <div class="container run">
        <div class="run-content">
          Hello, World
        </div>
      </div>
    - ```css
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
      }
      .run-content {
        font-size: 10rem;
        background: linear-gradient(90deg, 
          #4fcf70, #fad648, #a767e5, #12bcfe, #eece7b
        );
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        font-family: Helvetica, sans-serif;
        -webkit-mask-image: url(../../float/star.svg);
        mask-image: url(../../float/star.svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 200% 200%;
        mask-size: 200% 200%;
        animation: light 1.2s ease-in-out infinite;
        animation-direction: alternate;
      }

      @keyframes light {
        from {
          -webkit-mask-position: 0%;
          mask-position: 0%;
        }
        to {
          -webkit-mask-position: 100%;
          mask-position: 100%;
        }
      }

    