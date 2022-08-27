## `color-scheme`
> `color-scheme` 允许元素以其最舒服的颜色方案渲染.

操作系统通常可以选择浅色或深色模式, 当用户选择其中一种模式时, 浏览器就会做出对应的调整, 这就包括表单控件, 滚动条和系统颜色的 `CSS` 值.

上面这些话是什么意思呢, 让我们来看一个普通适配深色模式的页面
```css
@media (prefers-color-scheme: dark) {
  body {
    color: #74b9ff;
    background-color: #121212;
  }
}
```
问题在哪呢? 首先滚动条还是白的, 其次输入框的白色背景和控件选中时的蓝色饱和度很高, 如果在暗光环境下无疑非常刺眼.
![](../../image/Snipaste_2022-08-25_22-59-43.png)
那怎么办呢🤔? 当当当当👏有请今天的主角登场
```css
:root {
  color-scheme: light dark;
}
```
瞬间不一样了哈, 滚动条颜色变深了, 蓝色饱和度变浅了, 输入框背景变深色, 刺眼的感觉一下子就减轻了.
![](../../image/Snipaste_2022-08-25_23-03-40.png)

当然, 除了使用 `color-scheme` 这个 `CSS` 属性, 还可以使用 `meta` 标签哦~
```html
<meta name="color-scheme" content="dark light"> 
```
![](../../image/Snipaste_2022-08-27_12-56-28.png)
最后, 如果想要测试浅色和深色模式的切换, 可以不使用系统设置, 因为使用系统设置导致整个系统都变了, 但是我们可能只想测试单个网页, 这时候可以打开 `Chrome` 的 `DevTools` 选择 `Rendering` 选项卡
![](../../image/Snipaste_2022-08-27_12-59-11.png)