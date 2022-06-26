## `CSS` 计数器之 `counters()`
> `counters()` 函数允许嵌套的计数器, 返回指定计数器当前值得连接起来的字符串.

### 语法
`counters()` 有两种形式
  - `counters(name, string)`
  - `counters(name, string, style)` 

通常用在伪元素内, 但是也可以用在任何支持 `<string>` 类型的值上. 其返回的字符串包含所有指定名字的计数器的值, 从最外层到最内层, 由 `string` 这个参数分隔.

如果没有指定计数器的样式, 那么就默认展示十进制数字, 比如 `1.1`, `1.2` 这样. 我们也可以通过这个参数让计数器展示中文汉字, [👉详见这里👈](https://blog.csdn.net/broken_promise/article/details/125425071)

计数器本身没有视觉效果, 即我们无法知道当前计数器的值为多少. 只有使用 `counter()` 或 `counters()` 函数才让计数器的值展示出来.

📕`counters()`函数可以和任意 CSS 属性使用, 但是除 `content` 属性之外的属性支持仍处在试验阶段

### 案例
通过 `<ol>` 和 `<li>` 稍微组织一下 `HTML` 的嵌套结构, 就可以生成这样的类似目录的效果. 😊
![](../../image/Snipaste_2022-06-26_21-28-50.png)
```css
ol {
  counter-reset: myCounter;
}
li {
  counter-increment: myCounter;
}
li::marker {
  content: counters(myCounter, '-') '    ';
}
```
```html
<body>
  <ol>
    <li>
      计算机系统知识
      <ol>
        <li>
          计算机系统基础知识
          <ol>
            <li>中央处理单元</li>
            <li>数据表示</li>
            <li>校验码</li>
          </ol>
        </li>
        <li>
          计算机体系知识
          <ol>
            <li>存储系统</li>
            <li>输入/输出技术</li>
            <li>总线结构</li>
          </ol>
        </li>
      </ol>
      <ol>
        <li>
          安全性、可靠性与系统性能评测基础知识
          <ol>
            <li>加密技术和认证技术</li>
            <li>计算机可靠性</li>
          </ol>
        </li>
      </ol>
    </li>
    <li>
      程序设计语言基础知识
      <ol>
        <li>
          程序设计语言概述
          <ol>
            <li>程序设计语言的基本概念</li>
            <li>程序设计语言的基本成分</li>
          </ol>
        </li>
        <li>
          语言处理程序基础
          <ol>
            <li>汇编程序基本原理</li>
            <li>编译程序基本原理</li>
            <li>解释程序基本原理</li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>
</body>
```
