## prefers-color-scheme 与 matchMedia()
> `prefers-color-scheme` 这个媒体查询特性用来检测用户是否设置亮色(`light`)或暗色(`dark`) 的主题色

### 使用 CSS 设置
💡在 `macOS` 的设置-通用中, 可以选择设置系统的主题为浅色, 深色或自动

![](../../image/Snipaste_2022-08-20_14-14-31.png)

属性值
  - `light`: 用户设置亮色主题
  - `dark`: 用户设置暗色主题

来看简单上手. 
```html
<body>
    <h1>CSS: Perfers-Color-Scheme</h1>
</body>
```
```css
@media (prefers-color-scheme: dark)  {
  body {
    background-color: #111;
  }
  h1 {
    color: #3498db;
  }
}
```
我们只需要写好媒体查询, 然后修改系统的颜色主题, 浏览器的页面就会自动响应变化, 不需要人工干预哦~
![](../../image/Snipaste_2022-08-20_14-22-58.png)
![](../../image/Snipaste_2022-08-20_14-24-22.png)
通常设计时, 不会固定写好颜色而是使用 `CSS` 变量, 不然一个颜色如果在很多地方都用到就需要写很多次修改起来也很麻烦
```css
/* 定义亮色主题颜色 */
:root {
  --body-bg-color: #fff;
  --h1-text-color: #000;
}
body {
  background-color: var(--body-bg-color);
}
h1 {
  color: var(--h1-text-color)
}

/* 定义暗色主题颜色 */
@media (prefers-color-scheme: dark)  {
  :root {
    --body-bg-color: #111;
    --h1-text-color: #3498db;
  }
}
```
![](../../image/Snipaste_2022-08-20_14-50-31.png)
![](../../image/Snipaste_2022-08-20_14-51-20.png)

### 使用 JavaScript 检测
最关键的是使用 `Window.matchMedia() API`. 这个函数检测 `document` 是否匹配对应的媒体查询并返回一个 `MediaQueryList` 对象. 通过返回对象, 可以检测 `document` 是否匹配媒体查询

首先来看一个例子. 首先我们获得匹配结果, 然后通过注册 `change` 事件监听 `document` 对这个媒体查询的匹配结果, 进而做出一些处理.
```js
let matchResult = window.matchMedia('(prefers-color-scheme: dark)');
console.log('result', matchResult)

matchResult.addEventListener('change', (e) => {
    console.log('变色了!', e)
})
```
![](../../image/Snipaste_2022-08-20_15-25-33.png)

当然, 如果想要想要同时对多个媒体查询的结果匹配, 可以使用 `and` 或者 `or`
```js
let matchResult = window.matchMedia('(prefers-color-scheme: dark) and (max-width: 2000px)');
```
![](../../image/Snipaste_2022-08-20_15-33-48.png)

谢谢你看到这里, 希望下次可以在写在 `Vue` 中实现深色和浅色模式的切换~

