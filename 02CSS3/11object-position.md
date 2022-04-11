# `object-position`
> 指定了可替换元素的内容(即`object-position`中的`object`, 对象)在其元素盒内的对其方式 \
> specifies the alignment of the selected replaced element's contents within the element's box
## 语法
1. 元素盒内没有被可替换元素的对象覆盖的区域将会展示元素的背景.
2. 可以使用 `object-fit` 改变可替换元素的内在大小更好地适应元素盒
    - 关于`object-fit`, [👉请看这里]()
3. `<position>` 
    - 使用 1 到 4 个值定义该元素所的 `2D` 位置. 可以使用绝对或相对偏移.
      - 📕这些定位方式允许被替换元素的对象被定位到内容框外部   
    - 关于 `<position>` 数据类型, 请看 [`background-position`的介绍](), 特别是关于 `<percentage>` 类型的计算规则.
4. 一个属性值
    - 可能的情况
      - 是 `center`. 垂直水平居中显示
      - 是 `top`, `right`, `bottom`, `left` 中的一个, 另一个默认为 `center`. 图片紧贴着指定的边居中显示
      - `<length>` 或 `<percentage>`. 表示相对于盒子左边界的 `x` 轴坐标, `y` 轴默认 `center`
    - ```html
      <div>
        <p>object-position: center;</p>
        <img class="box box1" src="../../float/star.png" alt="">
      </div>
      <div>
        <p>object-position: center;</p>
        <img class="box box2" src="../../float/star.png" alt="">
      </div>
      <div>
        <p>object-position: 30%;</p>
        <img class="box box3" src="../../float/star.png" alt="">
      </div>
    - ```css
      :root {
        --box-size: 100px;
      }
      .box {
        width: var(--box-size);
        height: var(--box-size);
        padding: 5px;
        outline: 1px solid black;
        object-fit: none;
      }
      .box1 {
        object-position: center;
      }
      .box2 {
        object-position: left;
      }
      .box3 {
        object-position: 30%;
      }
    - 因为只指定了一个值, 所以对象在 `y` 方向为 `center`, 表现为 `垂直居中`. 第三张图中百分比计算规则, 为 `( 100px(width) - 67px(png 图片本身大小) ) * 30% = 10px`
    - ![](../../image/Snipaste_2022-03-28_14-46-31.png)
5. 两个属性值
    - 如果两个属性值都是关键字, 那么就要注意关键字的顺序. `top, bottom` 只能作为 `y` 方向的关键字. `left, right` 只能作为 `x` 方向的关键字. `center` 都可以
    - 如果两个属性值一个是关键字, 一个是数值, 同样注意顺序.
    - 如果两个属性值都是数值, 就没有顺序, 第一个值表示 `x` 方向值, 第二个表示 `y` 方向的值.
    - ```html
      <div>
        <p>object-position: bottom right;</p>
        <img class="box box4" src="../../float/star.png" alt="">
      </div>
      <div>
        <p>object-position: 30% top;</p>
        <img class="box box5" src="../../float/star.png" alt="">
      </div>
      <div>
        <p>object-position: 30% 70%;</p>
        <img class="box box6" src="../../float/star.png" alt="">
      </div>
    - ```css
      .box4 {
        object-position: bottom right;
      }
      .box5 {
        object-position: 30% top;
      }
      .box6 {
        object-position: 30% 70%;
      }
    - ![](../../image/Snipaste_2022-03-28_20-00-16.png)
6. 三个属性值的情况所有浏览器都不支持, 四个属性值更不用说了, 所以咱就省了一半儿的篇幅🤭
## 其他
1. `IE` 浏览器不支持该属性, 所有 `IE` 都不支持