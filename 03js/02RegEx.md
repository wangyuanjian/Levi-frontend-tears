<!-- TOC -->

- [正则表达式](#%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
  - [第一章 创建一个正则表达式](#%E7%AC%AC%E4%B8%80%E7%AB%A0-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
    - [编写正则表达式](#%E7%BC%96%E5%86%99%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
      - [简单模式](#%E7%AE%80%E5%8D%95%E6%A8%A1%E5%BC%8F)
      - [使用特殊字符](#%E4%BD%BF%E7%94%A8%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6)
  - [第二章 正则表达式中的特殊字符](#%E7%AC%AC%E4%BA%8C%E7%AB%A0-%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E4%B8%AD%E7%9A%84%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6)
    - [字符类Character Classes](#%E5%AD%97%E7%AC%A6%E7%B1%BBcharacter-classes)
      - [十六进制字符匹配与 \p](#%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E5%AD%97%E7%AC%A6%E5%8C%B9%E9%85%8D%E4%B8%8E-%5Cp)
    - [量词Quantifiers](#%E9%87%8F%E8%AF%8Dquantifiers)
    - [组和反向引用Groups and backreferences](#%E7%BB%84%E5%92%8C%E5%8F%8D%E5%90%91%E5%BC%95%E7%94%A8groups-and-backreferences)
    - [断言Assertions](#%E6%96%AD%E8%A8%80assertions)
    - [Unicode 属性转义Unicode Property Escapes](#unicode-%E5%B1%9E%E6%80%A7%E8%BD%AC%E4%B9%89unicode-property-escapes)

<!-- /TOC -->

# 正则表达式
> 正则表达式是用于匹配字符串中字符组合的模式. 在 `JavaScript` 中, 正则表达式也是对象. 这些模式被用于 `RegExp` 的 `exec` 和 `test` 方法, 以及 `String` 的 `match`, `matchAll`, `replace`, `search` 和 `split` 方法.

## 第一章 创建一个正则表达式
有两种方式创建正则表达式, 第一, 使用增则表达式字面量, 字面量由包含在斜杠之间的模式组成. 脚本加载后, 正则表达式字面量就会被编译. 当正则表达式不变时, 使用字面量可以获得更好的性能.
```js
let re = /ab+c/;
console.log('re',re) // re /ab+c/
```
调用 [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 对象的构造函数. 当你知道正则表达式会改变或者正则表达式是从用户输入得到的, 就需要使用构造函数创建正则表达式.
```js
const re1 = new RegExp('ab+c');
console.log('re1',re1); // re1 /ab+c/
```
### 编写正则表达式
一个正则表达式模式由简单的字符组成, 比如 `/123/`, 或者由简单和特殊的字符组成, 比如 `/123+/`, `/123(asd)+/`. 后面的例子中用到了括号`()`, 括号在正则表达式中通常被用做记忆设备(`memory device`), 意思是括号匹配的内容将会被记住供后续使用,

#### 简单模式
简单模式由你想要直接找到的字符串组成. 例如, `/123/` 仅匹配在某个字符串中 `123` 这三个数字组成的字符串(顺序固定、大小写固定). 
#### 使用特殊字符
当我们需要匹配一个不确定的字符串, 比如匹配一个或者多个 `2` 时, 可以在模式中使用特殊字符. 例如使用 `/12*3/` 匹配一个单独的 `1` 后面跟着零个或多个 `2` 同时后面跟着一个单独的 `3`

## 第二章 正则表达式中的特殊字符
### 字符类(Character Classes)
> 区分各种字符, 比如区分数字和字母. 表示一种特殊的符号, 这个特殊符号用于匹配集合中的某些符号.

- `[xyz]` `[a-c]`
  - 一个字符类. 匹配包含在方括号中的任何字符. 可以使用连字符 **`-`** 指定字符的范围. 但是如果连字符出现在方括号中的第一个或最后一个字符, 则将其视为普通的连字符.
  - ```js
    /[xyz]/.exec('uvwxyz') 
    // [ 'x', index: 3, input: 'uvwxyz', groups: undefined ]
    /xyz/.exec('uvwxyz')
    // [ 'xyz', index: 3, input: 'uvwxyz', groups: undefined ]
  - 请📕注意加和不加方括号的区别, 不加`[]`表示匹配 `xyz` 三个字符, 加了`[]` 表示匹配 `x` 或者 `y` 或者 `z`
  - 注意 `[a-c]` 与 `[abc]` 的意思相同, 但是 `[abc-]` 或者 `[-abc]` 中的 `-` 就用来匹配连字符
  - ```js
    /[a-c]/.exec('abc')
    // [ 'a', index: 0, input: 'abc', groups: undefined ]
    /[abc]/.exec('abc')
    // [ 'a', index: 0, input: 'abc', groups: undefined ]
    /[-abc]/.exec('non-profit')
    // [ '-', index: 3, input: 'non-profit', groups: undefined ]
    /[abc-]/.exec('non-profit')
    // [ '-', index: 3, input: 'non-profit', groups: undefined ]
- `[^xyz]` `[^a-c]`
  - 一个否定或者补充的符号类. 表达的意思是包含任何不在方括号中的字符. 也可以使用连字符表示字符范围, 📕但是如果连字符是 `^` 后面的第一个字符或者是方括号中的最后一个字符, 将被视作普通连字符.
  - ```js
    /[^a-c]/.exec('abcd')
    // [ 'd', index: 3, input: 'abcd', groups: undefined ]
    /[^-abc]/.exec('abc-d')
    // [ 'd', index: 4, input: 'abc-d', groups: undefined ]
  - `^`也可表示输入的开始
  - ```js
    /^abc/.test('abced') // true
    /^abc/.test('edabc') // false
- `.`
  - 有以下含义
    - 匹配出了行终止符之外的任何单个字符, 行终止符包括 `\n`, `\r`, `\u2028`, `\u2029`.
    - 在字符类中, `.` 失去其特殊意义, 仅匹配单一的字面意思的 `.`. 什么是字符类呢, 就是这一章节介绍的所有, 包括 `[xyz]` 等这种. 例如下面的第二个例子, `[.a]` 中的 `.` 匹配的就是字面量的 `.`
    - ```js
      /.y/g.exec('yes day')
      // [ 'ay', index: 5, input: 'yes day', groups: undefined ]
      /[.a]/.exec('...')
      // [ '.', index: 0, input: '...', groups: undefined ]
  - 📕值得注意的是, `m` 标志不会改变 `.` 的匹配行为. 因此, 如果要跨多行匹配一个模式, 可以使用字符类 `[^]` —— 它将匹配任何字符, 包括新行
    - ```js
      /[^]/.exec(`


      `);
      // [ '\n', index: 0, input: '\n\n\n', groups: undefined ]
  - 另外, `s` 标志允许 `.` 匹配行终止符
    - ```js
      /./s.exec(`


      `);
      // [ '\n', index: 0, input: '\n\n\n', groups: undefined ]
- `\d` 和 `\D`
  - `\d` 匹配任何阿拉伯数字. 等价于 `[0-9]`
  - `\D` 匹配任何非阿拉伯数字, 等价于 `[^0-9]`
  - ```js
    /\d/.exec('M1')
    // [ '1', index: 1, input: 'M1', groups: undefined ]
    /\D/.exec('M1')
    // [ 'M', index: 0, input: 'M1', groups: undefined ]
- `\w` 和 `\W`
  - `\w` 匹配任何基本拉丁字母中的字母和数字, 包括下划线, 等价于 `[A-Za-z0-9_]`
  - `\W` 与 `\w` 相反, 匹配 `\w` 不匹配的内容.
  - ```js
    /\w/.exec('50% off')
    // [ '5', index: 0, input: '50% off', groups: undefined ]
    /\W/.exec('50% off')
    // [ '%', index: 2, input: '50% off', groups: undefined ]
- `\s` 和 `\S`
  - `\s` 匹配单个空白字符, 包括空格, 制表符, 换页符, 换行符和其他 `Unicode` 空格. 相当于 `[\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`. `\S` 就匹配非空白字符的单个字符.
  - ```js
    /\s\w+/.exec("foo bar")
    // [ ' bar', index: 3, input: 'foo bar', groups: undefined ]
- `\t`
  - 匹配水平制表符, 就是按下 `Tab` 键所打印的字符
  - ```js
    /\t\w+/.exec('	foo')
    // [ '\tfoo', index: 0, input: '\tfoo', groups: undefined ]
    ```
  - 在 `VSCode` 中一般写代码的时候都会使用 `2` 个或 `4` 个空格代替 `Tab`, 因此我们需要在设置中取消这种覆盖规则. 好尴尬😅因为我覆盖了这种规则, 导致我写 `Markdown` 的时候摁下的 `Tab` 不是空格, 连 `Markdown` 都解析的出现了问题
  - ![](../../image/Snipaste_2022-10-09_08-52-50.png)
  - ```js
    /\t\w+/.exec('	foo')
    // [ '\tfoo', index: 0, input: '\tfoo', groups: undefined ]
- `\r` `\n`
  - `\r` 匹配回车符(`CR, Carriage Return`). 回车的意思就是将光标移动到当前行的第一个位置, 也就是开头.
  - `\n` 匹配换行符(`LF, Line Feed`). 换行的意思是将光标移动到下一行的同样位置.
  - 在不同的系统中, 当你摁下回车键时, 对应加入的是换行还是回车是不一样的. 
    - 在 `macOS` 系统中, 摁下回车键时插入的是 `\n`;
    - 在 `Linux` 系统中, 摁下回车键时插入的是 `\n`;
    - 在 `Windows` 系统中, 摁下回车键时插入的是 `\r\n`;
  - 所以下面的代码可以看到
  - ```js
    let result = /\n/.exec(`

    `)
    console.log('result',result)
  - ![](../../image/Snipaste_2022-10-11_09-07-55.png)
- `\v`
  - 匹配垂直制表符
- `\f`
  - 匹配换页符
- `[\b]`
  - 匹配退格符. 如果要使用字符边界, 使用 `\b`
- `\0`
  - 匹配一个 `NUL` 字符, 不要在后面加上另一个数字
- `\cX`
  - 使用插入符号匹配控制字符, 其中 `X` 是 `A-Z` 中的一个字母, 对应 `U+0001-U+001F`.
- `\`
  - 转义符, 表示 `\` 后面的字符将被特殊对待
  - 1️⃣第一种是后面的字符本身没有特别的意思, 但是加上 `\` 后表示有特殊意义, 例如 `/b/` 匹配字符 `b`, 但是 `/\b/` 匹配词边界
  - 2️⃣第二种是后面的字符本身就特别意义, 但是加上 `\` 之后反而失去特别意义而按字面解释. 比如 `*` 匹配 `*` 前面的字符出现 0 次火多次, 但是 `/a\*/` 就匹配字符 `a*`
  - 不要忘记如果匹配 `\` 本身, 也需要转义 `/\\/`
- `x|y`
  - 匹配字符 `x` 或字符 `y`. 由管道符分开的每一部分叫做「可选项」
  - 
#### 十六进制字符匹配与 `\p`
`JavaScript` 中使用 `Unicode` 对字符串编码, `Unicode` 的一种实现方式就是 `UTF-16`, 而 `UTF-16` 中大多数字符使用 `2` 个字节(16比特)编码, 还有其他的字符使用 `4` 个字符(32比特)编码.
  - ![](../../image/)

### 量词(Quantifiers)
### 组和反向引用(Groups and backreferences)
`组`将多个模式作为一个整体组合起来, 在正则表达式中呢, 使用括号`()`将模式的某部分括起来, 被括起来的部分就称为`捕获组`. 在使用常规模式匹配字符串时, 捕获组提供额外的子匹配信息. `反向引用`指向在相同的正则表达式中前一个被捕获的组.

- `(x)`
  - **捕获组**用来匹配 `x` 并记住匹配的内容. 比如 `/(hello)/` 匹配并记住 `'hello world'` 中的 `hello`. 字符串的 `match` 方法可以做到这点
  - ```js
    'hello world'.match(/hello/)
    'hello world'.match(/(hello)/)
    /*
    [ 'hello', index: 0, input: 'hello world', groups: undefined ]
    [ 'hello', 'hello', index: 0, input: 'hello world', groups: undefined ]
    */
  - `match` 方法如果其正则表达式参数没有修饰符 `g`, 它将查找数组返回匹配结果. 因此用捕获组的结果比没有使用捕获组返回的结果多一个内容. 多出的内容就是括号中匹配的结果
    - 索引`0`, 完整的匹配项
    - 索引`1`, 第一个括号匹配的内容
    - 所以`2`, 第二个括号匹配的内容.
    - 以此类推
  - 正则表达式中可能含有多个捕获组, 因此结果往往是数组, 数组的元素的顺序就是正则表达式中左括号出现的顺序. 这在嵌套捕获组中特别重要.
  - 捕获组会带来性能消耗.
- `(?<Name>x)`
  - **具名捕获组**: 匹配 `x` 并在结果中通过 `<Name>` 访问 `x` 的匹配结果. 其中尖括号是必须的.
  - 比如下面的例子, 我们使用具名捕获组来匹配固定电话的区号
  - ```js
    '0221-2637489'.match(/\b(?<code>\d{4})-(\d+)/)
    // 结果
    [
      '0221-2637489',
      '0221',
      '2637489',
      index: 0,
      input: '0221-2637489',
      groups: [Object: null prototype] { code: '0221' }
    ]
  - 可以看到数组中第一个元素(索引`0`)是表达式匹配的整个结果, 第二个元素(索引`1`) 是第一个捕获组的结果, `groups` 是保存的具名捕获组的内容.
- `(?:x)`
  - **非捕获组**: 匹配 `x` 但是结果中不记录.
### 断言(Assertions)
### Unicode 属性转义(Unicode Property Escapes)
``


```js
```
![](../../image/)