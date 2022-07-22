## 纯 `HTML` `CSS` 实现搜索框的展示与隐藏

好久没有更新这个动效了, 因为自己没有灵感😶...先看效果
![](../../../image/input_center_toggle.gif)

### `HTML`
主要思路就是默认隐藏输入框, 然后通过 `checkbox` 选中时展示输入框. 结构如下, 注意标签的顺序因为会使用到 `+` 这个 `CSS` 选择器.
```html
<body>
  <div class="container">
    <label for="toggle">🔍</label>
    <input type="checkbox" name="toggle" id="toggle">
    <input type="text" name="search" autofocus class="search">
  </div>
</body>
```

### `CSS`
首先是全局样式. 元素水平居中, 背景色为水平渐变
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #e74c3c, #9b59b6);
  min-height: 100vh;
}
```
接下来, 设置容器为相对布局, 并隐藏 `checkbox` 元素.
```css
.container {
  position: relative;
}
.container input[type="checkbox"] {
  display: none;
}
```
设置搜索图标. 这里多说一嘴, 其实这个搜索图标用按钮实现也行, 因为按钮会水平垂直居中咱们的🔍图标. 但是不好的地方是要通过 `JS` 来设置按钮的点击事件.

设置 `label` 为 `absolute` 布局, 其默认 `display` 为 `inline` 所以如果要设置宽高就要将其改为 `inline-block`
```css
.container label {
  display: inline-block;
  background-color: #fff;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
}
```
设置搜索框为背景颜色和 `border` 为 `0`, `当其处于` focus 状态时取消其 `outline`. 

📕注意输入框的浏览器默认样式有上下 `1px` 左右 `2px` 的内边距(`edeg` 浏览器), 因此要上下边距为 `0`, 不然就无法和 `label` 水平对齐.

📕默认实现隐藏的方法就是设置 `input` 和 `label` 的大小相同, 但因为 `label` 绝对定位所以 `label` 占在了 `input` 的上层显示.
```css
.container input[type="text"] {
  border: 0;
  font-size: 24px;
  background-color: #fff;
  height: 50px;
  width: 40px;
  padding: 0;
  transition: all .3s ease;
  padding: 0 5px;
}
.container input[type="text"]:focus {
  outline: none;
}
```
最后呢, 当 `checkbox` 处于选中状态时, 要将输入框显示出来, 但是要注意加上 `50px` 的左外边距, 因为 `label` 占着位子呢
```css
.container input[type="checkbox"]:checked + input {
  margin-left: 50px;
  width: 200px;
}
```
谢谢你看到这里😀