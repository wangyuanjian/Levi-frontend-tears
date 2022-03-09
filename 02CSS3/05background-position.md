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
    - 🤨疑问🤨, 百分比究竟是作用在图片的边上还是图片的正中心呢? 直接跳到最后一部分👇
## `<percentage>` 计算规则
1. 如果百分比是 `0%`, 就表示背景图片的左边界或者上边界紧挨着盒子的左边界或上边界
2. 如果百分比是 `100%`, 就表示背景图片的右边界或者下边界紧挨着盒子的右边界或下边界
3. 其他值, 本质上是执行了下面的公式
    - ```js
      (x) = (盒子宽度 - 图片宽度) * (x 轴方向百分比)
      (y) = (盒子高度 - 图片宽度) * (y 轴方向百分比)
    - `x, y` 就是图片左边界的 `x` 轴坐标和上边界的 `y` 轴坐标
    - 我们来带入第一个例子中的 `background-position: 30px 50%;`. 整个容器高度为 `200px`, 图片高度为 `67px`, 最后计算 `y = (200 - 67) * 0.5 = 66.5`.
4. 📕值得注意的是, 如果盒子在给定轴上的 `background-size` 大小和盒子大小相同, 那这个轴上的百分比就会没有效果, 因为`盒子宽度 - 图片宽度` 为 `0`
    - 如下, 默认的 `background-size` 是 `auto auto`, 而且 `png` 属于有内在大小和内在维度的图片, 所以就以 `png` 本身的大小来渲染, 即 `background-size` 在水平和垂直方向均为 `67px`, 这和盒子的大小小童, 所以两个百分比双双失效. 
    - ![](../../image/Snipaste_2022-03-09_22-25-56.png)

- ```html
    - ```css
    - ![](../../image/)  