## `line-break`
> 设置如何处理带有标点和符号的中文、韩文和日文(`Chinese, Japanese, Korean(CJK)`) 的换行

这个属性有五个关键词的值
- `auto`: 使用默认的断行规则;
- `loose`: 使用最不严格的断行规则. 一般用于报纸等短行;
- `normal`: 使用一般严格的断行规则;
- `strict`: 使用最严格的断行规则;
- `anywhere`: 
  - 首先了解一个名词[印刷字符单元, typographic character unit](https://drafts.csswg.org/css-text-3/#typographic-character-unit), `CSS` 将文本最基本的单元叫做印刷字符单元. [这里](https://drafts.csswg.org/css-text-3/#ref-for-typographic-character-unit) 解释了更多, 比如英文中的单个字母, 中文中的单个汉字都是印刷字符单元, 在特定的排版(换行, 对齐等)中是不可分割的
  - 再了解一个名词, [保留的空白字符, preserved white space](https://drafts.csswg.org/css-text-3/#preserved-white-space) 我们知道在处理 `HTML` 中连续的空白字符(空格, 制表符等)时, 会将他们合并. 但如果没有合并, 那么就叫做`保留的空白字符`
  - 在每个印刷字符单元的周围都有一个软换行的机会, 包括标点符号、保留的空白字符、单词之间. `anywhere` 作用就是这些软换行的机会都可能换行, 但是不会自动在换行处添加连字符.


下面的内容是从[这里](https://drafts.csswg.org/css-text-3/#line-break-property)学到的, 不过是英文的, 有兴趣的可以看, 关于规则的介绍也会忽略不常见的语种

### 规则一
下面的规则在 `strict` 中禁止, 但是在 `normal` 和 `loose` 中允许
  - 在日语的小假名或片假名-平假名延长音标前断行
```html
<div class="box" style="line-break: auto;">
  auto: <br>可怜无定河边骨梦里ぁと思わ
</div>
<div class="box" style="line-break: loose;">
  loose: <br>可怜无定河边骨梦里ぁと思わ
</div>
<div class="box" style="line-break: normal;">
  normal: <br>可怜无定河边骨梦里ぁと思わ
</div>
<div class="box" style="line-break: strict;">
  strict: <br>可怜无定河边骨梦里ぁと思わ
</div>
<div class="box" style="line-break: anywhere;">
  anywhere: <br>可怜无定河边骨梦里ぁと思わ
</div>
```
看到的就是, `strict` 规则下, `ぁ` 这个小假名的前面不可以换行, 所以它前面的 `里` 就要从上一行挪下来 
![](../../image/Snipaste_2022-09-24_11-01-36.png)
- 如果是中文或日文的话下面的规则在 `normal` 和 `loose` 中允许, 否则就禁止
  - 在 `CJK` 的连字符前断开, `〜 U+301C`, `゠ U+30A0`. 但是值得注意的是他们虽然看起来像, 但并不是键盘上可以输入的 `~` 或 `=`
  - ![](../../image/Snipaste_2022-09-24_09-57-03.png)
```html
<div class="box" style="line-break: auto;" lang="zh">
  auto: <br>可怜无定河边骨梦里〜と思わ
</div>
<div class="box" style="line-break: loose;" lang="zh">
  loose: <br>可怜无定河边骨梦里〜と思わ
</div>
<div class="box" style="line-break: loose;" lang="en">
  loose(English): <br>可怜无定河边骨梦里〜と思わ
</div>
<div class="box" style="line-break: normal;" lang="zh">
  normal: <br>可怜无定河边骨梦里〜と思わ
</div>
<div class="box" style="line-break: normal;" lang="en">
  normal(English): <br>可怜无定河边骨梦里〜と思わ
</div>
<div class="box" style="line-break: strict;" lang="zh">
  strict: <br>可怜无定河边骨梦里〜と思わ
</div>
<div class="box" style="line-break: anywhere;" lang="zh">
  anywhere: <br>可怜无定河边骨梦里〜と思わ
</div>
```
我们通过 `lang` 这个 `HTML` 属性修改 `writing system` 的值, 然后发现在英文下, `〜` 前是没可能断行的, 但是中文下就可以
![](../../image/Snipaste_2022-09-24_11-21-53.png)

### 规则二
下面的规则在 `loose` 中允许, 如果前面的字符属于 `Unicode` 断行类 `ID(IDeograph, 象形文字)` (包括因为 `word-break: break-all` 而将前面字符看作 `ID` 处理的情况)
  - 在连字符前断开, `‐ U+2010`, `– U+2013`\
  - 🤯同样的, ‐ 和 – 也不是键盘上可以输入的内容
  - ![](../../image/Snipaste_2022-09-24_17-37-23.png)
```html
<div class="box" style="line-break: auto;">
  auto: <br>可怜无定河边骨梦里‐哈哈哈哈
</div>
<div class="box" style="line-break: loose;">
  loose: <br>可怜无定河边骨梦里‐哈哈哈哈
</div>
<div class="box" style="line-break: normal;">
  normal: <br>可怜无定河边骨梦里‐哈哈哈哈
</div>
<div class="box" style="line-break: strict;">
  strict: <br>可怜无定河边骨梦里‐哈哈哈哈
</div>
<div class="box" style="line-break: anywhere;">
  anywhere: <br>可怜无定河边骨梦里‐哈哈哈哈
</div>
<div class="box" style="line-break: auto;">
  auto: <br>hello, world bye‐哈哈哈哈
</div>
<div class="box" style="line-break: loose;">
  loose: <br>hello, world bye‐哈哈哈哈
</div>
<div class="box" style="line-break: normal;">
  normal: <br>hello, world bye‐哈哈哈哈
</div>
<div class="box" style="line-break: strict;">
  strict: <br>hello, world bye‐哈哈哈哈
</div>
<div class="box" style="line-break: anywhere;">
  anywhere: <br>hello, world bye‐哈哈哈哈
</div>
```
可以看见(除了 `anywhere` 之外), 因为 `‐` 前面的是中文象形文字, 所以可以断开, 那么在 `loose` 规则下就被断开了, 而其他值则没有.

但是对于 `‐` 前面的是英文的话这条规则就失效了
![](../../image/Snipaste_2022-09-24_17-16-32.png)
![](../../image/Snipaste_2022-09-24_17-31-08.png)

### 规则三
下面的规则在 `normal` 和 `strict` 禁止, 但是在 `loose` 中允许
  - 在日语的迭代标记(`iteration mark`)前断开, `々 U+3005`, `〻 U+303B`, `ゝ U+309D`, `ゞ U+309E`, `ヽ U+30FD`, `ヾ U+30FE`
  - 在不可分割的单字中, 如 `‥ U+2025`, `… U+2026`. 😅不是两个点或三个点连起来. 😅😅😅我在浏览器中无法测试出这种结果, 尴尬三连了...
```html
<div class="box1" style="line-break: auto;">
  auto: <br>そこは湖のほとりで木々
</div>
<div class="box1" style="line-break: loose;">
  loose: <br>そこは湖のほとりで木々
</div>
<div class="box1" style="line-break: normal;">
  normal: <br>そこは湖のほとりで木々
</div>
<div class="box1" style="line-break: strict;">
  strict: <br>そこは湖のほとりで木々
</div>
<div class="box1" style="line-break: anywhere;">
  anywhere: <br>そこは湖のほとりで木々
</div>
```
也可以看到(除了 `anywhere` 之外), 只有 `loose` 规则下的 `々` 前面断开了
![](../../image/Snipaste_2022-09-24_17-56-50.png)
### 规则四
下面的规则在 `loose` 中允许如果是中文或日文
  - 在某些特定居中的标点符号断开, `・ U+30FB`, `： U+FF1A`, `； U+FF1B`,`･ U+FF65`, `‼ U+203C`, `⁇ U+2047`, `⁈ U+2048`, `⁉ U+2049`, `！ U+FF01`, `？ U+FF1F`
```html
<div class="box1" style="line-break: auto;">
  auto: <br>そこは湖のほとりで木；
</div>
<div class="box1" style="line-break: loose;">
  loose: <br>そこは湖のほとりで木；
</div>
<div class="box1" style="line-break: normal;">
  normal: <br>そこは湖のほとりで木；
</div>
<div class="box1" style="line-break: strict;">
  strict: <br>そこは湖のほとりで木；
</div>
<div class="box1" style="line-break: anywhere;">
  anywhere: <br>そこは湖のほとりで木；
</div>
```
这时, 希望你不会感到生气, 因为又是 loose 规则和其他不一样
![](../../image/Snipaste_2022-09-24_18-01-16.png)


最后想说一下关于避首标点和避尾标点的事情, 中文中的句号`。`等标点符号是避免出现在一行的开头, 而前书名号`《`等符号是避免出现在一行的末尾的, 因为对于这两类符号, `anywhere` 属性值会破环原有的规则, 需要谨慎使用
![](../../image/Snipaste_2022-09-24_18-06-06.png)

谢谢你看到这里😊