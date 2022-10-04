## hyphens
> 告诉浏览器在换行时如何使用连字符. 

可以完全不使用连字符, 可以让浏览器决定什么时候连字符, 可以也可以手动控制什么时候使用.

首先, 连字符的 `Unicode` 为 `U+2010`, 并不是键盘上半角标点符号的减号, 也不是全角标点符号的破折号
![](../../image/Snipaste_2022-09-24_17-37-23.png)

再者, 连字符仅仅是一种渲染结果, 其不会影响文档真实的内容, 不会影响文本选择也不会影响搜索
![](../../image/Snipaste_2022-09-27_22-18-12.png)
![](../../image/Snipaste_2022-09-27_22-20-32.png)

其次, 连字规则具有语言特性, 浏览器只会在当前属性存在且有合适的连字字典时使用连字进行连接. 语言特性就要由 `HTML` 的全局属性 `lang` 决定.

最后, 关于 `CSS` 规范中并没有定义如何使用连字符, 因此具体的连字可   能浏览器与浏览器不同 

有以下关键词属性
- `none`: 换行时单词不会被打断, 即便单词内的字符建议换行. 行只会在空白符处换行.
- `auto`: 浏览器自己决定如何使用连字符. 但是`建议断行机会`将会覆盖浏览器自动决定的断开位置.
- `manual`: 只有在单词内有`建议断行机会`时单词才可能断行.

### 建议换行机会
有两个 `Unicode` 字符用来指明文本中潜在的断行点.
- `U+2010(HYPHEN)`: 「硬」连字符, 表示一个可见的断行机会. 即便这一行不在 `U+2010` 处断开, 这个地方依然会渲染连字符. 在 `HTML` 中硬连字符用 `&hyphen;` 表示.
- `U+00AD(SHY)`: 「软」连字符, 这个 Unicode 并不会被渲染为可见的字符, 而是表示如果浏览器要断行, 那么可以在 `U+00AD` 处断开并使用连字符. 在 `HTML` 中软连字符用 `&shy;` 表示.


```html
<div class="box box1">
  <code><strong>none:</strong></code>
  Hello, World, unconditionalunconditional, where are you from LOL? 222222222222222222222222 <a
    href="">https://flatuicolors.com/palette/se</a> unconditional&shy;unconditional
</div>
<div class="box box2">
  <code><strong>auto:</strong></code>
  Hello, World, unconditionalunconditional, where are you from LOL? 222222222222222222222222 <a
    href="">https://flatuicolors.com/palette/se</a> unconditional&shy;unconditional
</div>
<div class="box box3">
  <code><strong>manual:</strong></code>
  Hel&shy;lo, World, uncondi&shy;tionalunconditional, whe&hyphen;re are you from LOL? 222222222222222222222222 <a
    href="">https://flatuicolors.com/palette/se</a> unconditional&shy;unconditional
</div>
```
```css
.box {
  width: 150px;
  border: 3px solid salmon;
}

.box1 { hyphens: none; }
.box2 { hyphens: auto; }
.box3 { hyphens: manual; }
```

首先三者共同的表现, 那就是对于大数, `hyphens` 这个 `CSS` 属性没有效果, 因为三幅图中对于 `222222...222` 这个大数都没有换行.

其次, 第一个长单词中 `unconditionalunconditional` 可以看出 `none` 完全不会断开, `auto` 选择了在 `n` 后面断开, 但是 `manual` 是在我们指定插入的 `&shy;` 处断开.

接着, 对于 `manual` 的表现: 在硬断行处一定插入连字符, 即便这里压根不可能换行(`1`处). 如果是软换行, 如果软换行处不会换行, 也不会插入连字符(`2`处), 但是如果软换行处所在的单词会换行, 那么就会在软换行处换行并插入换行连字符(`3`处)
![](../../image/Snipaste_2022-10-04_11-01-38.png)

谢谢你看到这里😊