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
      - `<length>` 或 `<percentage>`. 表示相对于盒子左边界的 `x` 轴左边, `y` 轴默认 `center`
    - 
## 其他
1. `IE` 浏览器不支持该属性
2. 