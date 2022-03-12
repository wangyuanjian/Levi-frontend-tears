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
2. 两个属性值
    - 一个定义 `x` 坐标, 另一个定义 `y` 坐标. 默认值为 `left top`, 即 `0% 0%`
    - 两个属性值中的一个属性值为关键字, `top`, `left`, `bottom`, `right`. 
      - 如果是 `left` 或者 `right`, 那么这个关键字定义 `x` 坐标, 另一个属性值定义 `y` 坐标;
      - 如果是 `top` 或者 `bottom`, 那么这个关键字定义 `y` 坐标, 另一个属性值定义 `x` 坐标;
    - 两个属性值 `A` 中的一个为 `<length>` 或 `<percentage>`. 
      - 如果另一个是 `left` 或者 `right`, 那么 `A` 定义 `y` 坐标, `y` 坐标相对于盒子上边缘; 
      - 如果另一个是 `top` 或者 `bottom`, 那么 `A` 定义 `x` 坐标, `x` 坐标相对于盒子左边缘; 
      - 如果两个属性值都是 `<length>` 或 `<percentage>`, 那么第一个值定义 `x` 坐标, 第二个定义 `y` 坐标
    - 📕顺序
      - 对于成对的关键词, 关键词的位置并不重要因为浏览器会重新排序, 因为 `top left` 和 `left top` 的效果是一样的;
      - 反之, 如果一个是关键词, 另一个是 `<length>` 或 `<percentage>`, 那么顺序很重要, 靠前的关键词定义 `x` 坐标, 靠后的定义 `y` 坐标;
3. 三个属性值
    - 两个值是关键词, 第三个值是这个值前面值的偏移值
    - 三个属性中的第一个值是 `top`, `left`, `bottom`, `right` 或者 `center`
      - 如果第一个值是 `left` 或 `right`, 其定义 `x` 坐标
      - 如果第一个值是 `top` 或 `bottom`, 其定义 `y` 坐标
    - 如果第二个值是 `<length>` 或 `<percentage>`, 那么它表示第一个值的偏移值; 如果第三个值是 `<length>` 或 `<percentage>`, 那么它表示第二个值的偏移值;
    - 一个关键词加上两个 `<length>` 或 `<percentage>`, 是不合法的.
    - 例子
      - ```html
        <div class="box box5"></div>
        <div class="box box6"></div>
      - ```css
        .box5 {
          background-position: left 20px center;
        }
        .box6 {
          background-position: left 100% center;
        }
      - ![](../../image/Snipaste_2022-03-12_08-41-38.png)
      - 🤨解释一下为什么 `left 100%` 没有使背景图片超出盒子, 因为按照下三部分(往下看)的计算规则, `x` 的坐标是 `(盒子宽度 - 图片宽度) * (x 轴方向百分比)`, 因为 `x` 轴方向的百分比是 `100%`, 所以 `x` 的坐标就是 `(盒子宽度 - 图片宽度)`
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