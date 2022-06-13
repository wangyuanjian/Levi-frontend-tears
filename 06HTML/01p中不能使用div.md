## `<p>` 里可以写 `<div>` 吗? 你可能真的不知道

在学习 `CSS` 计数器 `counters()` 函数时, 我尝试使用 `<div>` 和 `<p>` 互相嵌套组成 `HTML` 结构. 如下
```html
<p>
  <div>1</div>
  <div>2</div>
</p>
```

页面显示元素都正常, 但是计数器就是不正常😡, 于是我检查元素发现整个页面的 `HTML` 结构被浏览器悄悄地改了.
```HTML
<p></p>
  <div>1</div>
  <div>2</div>
<p></p>
```
浏览器为什么要这么做呢?🤨

![](../../image/Snipaste_2022-06-13_21-37-55.png)
### `content model`
`HTML` [规范](https://html.spec.whatwg.org/multipage/dom.html#concept-html-contents)中的每一个元素都有一个内容模型: **`用来描述该元素期望的内容, 就是期望什么类型的 `DOM` 作这个元素的子节点`**. 规范中明确了 `HTML` 元素的内容必须匹配这个元素的 `content model`.
  - `<p>` 的 `content model` 是 [phrasing content](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element:phrasing-content-2)
    - 如果我们看看下图, 就大概知道 `phrasing content` 很多都是常说的 `inline` 内联元素.
    - ![](../../image/Snipaste_2022-06-13_21-40-31.png)
  - `<div>` 的 `content model` 是 [flow content](https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element)

因此, `<p>` 不能包含 `<div>`(反过来可以), 不仅仅是 `<div>`, 任何非 `phrasing content` 的元素都不行, 包括 `<h1>`, `<ul>` 等, 甚至包含自身, 因为 `<p>` 自身类型(`Categories`)属于 `Flow content`. 

### `Categories`
😱怎么又出现了 `Categories` 啊? [规范](https://html.spec.whatwg.org/multipage/dom.html#concept-element-categories)中说的很清楚, `<p>` 希望 `phrasing content` 类型的元素作为子节点, 那么哪些元素是 `phrasing content` 呢? 这就是 `Categories` 要回答的问题了.

就简单理解下面看一下 `HTML` 规范中对元素所属的 `Categories` 的划分. 下图很有意思, 几乎所有的元素都是 `Flow Content`,
![](../../image/Snipaste_2022-06-13_21-41-58.png)

### `还没有真正回答开头的问题, 能写吗?`
是可以的, 只不过是通过 `js`
```html
<p id="secondP"></p>
```
```js
let secondP = document.getElementById('secondP');
let newDiv = document.createElement('div');
newDiv.innerHTML = 'Oops';
secondP.append(newDiv);
```
![](../../image/Snipaste_2022-06-13_21-53-51.png)

### 参考
  - [Why can't the `<p>` tag contain a `<div>` tag inside it?](https://stackoverflow.com/questions/8397852/why-cant-the-p-tag-contain-a-div-tag-inside-it)
  - [https://html.spec.whatwg.org/multipage/dom.html#flow-content](https://html.spec.whatwg.org/multipage/dom.html#flow-content)
  - [https://html.spec.whatwg.org/multipage/dom.html#contexts-in-which-this-element-can-be-used](https://html.spec.whatwg.org/multipage/dom.html#contexts-in-which-this-element-can-be-used)
  - [https://clearlydecoded.com/html-content-models](https://clearlydecoded.com/html-content-models)
  - [https://html.spec.whatwg.org/multipage/dom.html#concept-element-categories](https://html.spec.whatwg.org/multipage/dom.html#concept-element-categories)