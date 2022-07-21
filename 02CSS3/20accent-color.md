## `accent-color` + 自己封装 `radio`

### `accent-color` 的基本知识
用来改变某些元素的控件的 `accent` 颜色. 

什么是 `accent` 颜色呢? 它是一种典型的明亮颜色, 与配色方案中更实用的背景和前景颜色形成对比. 在开发中, `<input>` 元素的活动部分的背景颜色就可以用 `accent-color` 来设置, 比如 `checkbox` 的选中框的颜色.

`accent-color` 支持 `auto` 关键字和常用的 `<color>` 类型的数值. 其中 `auto` 表示浏览器自己选择颜色. 例如下图就是 `radio` 选中时在不同浏览器下的表现.

![](../../image/Snipaste_2022-07-21_09-43-57.png)

那么通过 `accent-color` 我们可以控制那些元素呢? [MDN 官方文档](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) 给出了四种
  - `<input type="checkbox">`
  - `<input type="radio">`
  - `<input type="range">`
  - `<progress>`

```html
<div>
  <input type="checkbox" id="apple" />
  <label for="apple">Apple</label>
</div>
<div>
  <input type="radio" id="male" name="sex" />
  <label for="male">Man</label>
  <input type="radio" id="female" name="sex" />
  <label for="female">Woman</label>
</div>
<div>
  <input type="range" id="volume" name="volume"
          min="0" max="11">
  <label for="volume">Volume</label>
</div>
<progress id="file" max="100" value="70"> 70% </progress>
```
```css
input, progress {
  accent-color: #e67e22;
}
```
![](../../image/Snipaste_2022-07-21_09-47-18.png)

📕值得注意的一点是, `checkbox` 选中时对号的颜色是会根据 `accent-color` 的颜色变化的. 如果 `accent-color` 是浅蓝色, 那么对号就是黑色; 如果是红色, 对号就是白色.

![](../../image/Snipaste_2022-07-21_09-49-39.png)

### 自己封装 `radio`
其实你会发现应用了 `accent-color` 的 `radio` 其实很丑, 我找了很多也找不到有 `CSS` 属性来修改黑色圆环的颜色. 索性我自己写一个把, 参考了 `Element UI` 和 `Vuetify` 实现的思路我写的比较简单.

```html
<label for="male" class="my_radio">
  <input type="radio" id="male" name="sex" />
  <span class="indicator"></span>
  <span>Man</span>
</label>
```

首先, 使用 `opacity:0` 隐藏原生的 `radio`. 然后设置 `.indicator` 为外面的圆环, 使用 `::before` 伪元素为选中时的填充. 当然不要忘记填充默认情况是不显示的, 这一点通过 `scale(0)` 实现
```css
.my_radio input {
  opacity: 0;
}
.my_radio {
  display: inline-block;
  position: relative;
}
.my_radio .indicator {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: 2px solid salmon;
}
.my_radio .indicator::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  background-color: salmon;
  border-radius: 50%;
  transition: .2s ease;
}
```
最后呢, 通过 `HTML` 的元素位置关系, 使用 `:checked` 伪类元素选择器表示 `radio` 选中时, 使用 `+` 相邻兄弟选择器选中后面的填充让其出现.
```css
.my_radio input:checked + .indicator::before {
  transform: scale(.65);
}
.my_radio span {
  cursor: pointer;
}
```
最后, 来看效果吧~

![](../../image/custom_radio.gif)

谢谢你看到这里😀