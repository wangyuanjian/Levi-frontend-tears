# `background-position`
> 为每个背景图片设置初始位置, 这个位置是相对于由 `background-origin` 设置位置图层(`position layer`)的
## [`<position>`](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value)
1. `background-position` 属性值可以是一个或多个由逗号(`,`)分开的 `<position>`类型的值.
2. `<position>` 表示一个二维坐标数据类型, 这个坐标指定了一个相对于盒子的位置. 除了在 `background-position` 还在 `offset-anchor` 属性中使用.
    - 📕 `<position>` 指定的最终位置不一定要在盒子里面(`inside`)
3. 语法
    - ![](../../image/position_type.png)
    - 上面的图来自 `MDN` 官网. `position` 可以是一个或者两个关键字, 同时每个关键字可以有可选的偏移值(`offset`).
    - 关键字分别为 `center`, `top`, `right`, `bottom`, `left`. 关键词的意思如图.
    - 关键字带有偏移值`offset`, 那么 `offset` 可以是 `percentage`(百分比) 或 `length`(长度)值. 如果值为正, 代表向右或向下偏移; 为负, 则代表向左或向上偏移.
    - 如果只有一个关键字, 那么表示 `x` 轴的位置, 对应 `y` 轴的位置默认是 `center`.
    - 📕`background-position` 允许 `position` 为三个值的语法, 但是其他使用 `position` 的 `CSS` 属性则不允许
## 语法
1. `一个属性值`
    - 可能的情况
      - 是 `center`. 图片垂直水平居中显示
      - 是 `top`, `right`, `bottom`, `left` 中的一个, 另一个默认为 `center`. 图片紧贴着指定的边居中显示
      - `<length>` 或 `<percentage>`. 表示相对于盒子左边界的 `x` 轴左边, `y` 轴默认 `center`
    - ```html
      <div class="box box1"></div>
      <div class="box box2"></div>
      <div class="box box3"></div>
    - ```css
      .box {
        border: 1px solid #111;
        width: 150px;
        height: 200px;
        background-image: url(../../float/star.png);
        background-repeat: no-repeat;
      }
      .box1 {
        background-position: center;
      }
      .box2 {
        background-position: right;
      }
      .box3 {
        background-position: 30px 50%;
      }
    - ![](../../image/Snipaste_2022-03-08_22-04-21.png) 






- ```html
    - ```css
    - ![](../../image/)  