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
## 编写正则表达式
一个正则表达式模式由简单的字符组成, 比如 `/123/`, 或者由简单和特殊的字符组成, 比如 `/123+/`, `/123(asd)+/`. 后面的例子中用到了括号`()`, 括号在正则表达式中通常被用做记忆设备(`memory device`), 意思是括号匹配的内容将会被记住供后续使用,

### 简单模式
简单模式由你想要直接找到的字符串组成. 例如, `/123/` 仅匹配在某个字符串中 `123` 这三个数字组成的字符串(顺序固定、大小写固定). 
### 使用特殊字符
当我们需要匹配一个不确定的字符串, 比如匹配一个或者多个 `2` 时, 可以在模式中使用特殊字符. 例如使用 `/12*3/` 匹配一个单独的 `1` 后面跟着零个或多个 `2` 同时后面跟着一个单独的 `3`

## 第二章 正则表达式中的特殊字符
### 字符类(Character Classes)
> 区分各种字符, 比如区分数字和字母

- `[xyz]` `[a-c]`
  - 一个字符类. 匹配包含在方括号中的任何字符. 可以使用连字符 **`-`** 指定字符的范围. 但是如果连字符出现在方括号中的第一个或最后一个字符, 则将其视为普通的连字符.
  - ```js
    /[xyz]/.exec('uvwxyz') 
    // [ 'x', index: 3, input: 'uvwxyz', groups: undefined ]
    /xyz/.exec('uvwxyz')
    // [ 'xyz', index: 3, input: 'uvwxyz', groups: undefined ]
  - 请注意加和不加方括号的区别, 不加`[]`表示匹配 `xyz` 三个字符, 加了`[]` 表示匹配 `x` 或者 `y` 或者 `z`
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
  - 一个否定或者补充的符号类. 表达的意思是包含任何不在方括号中的字符.
### 量词(Quantifiers)
### 组和范围(Groups and Ranges)
### 断言(Assertions)
### Unicode 属性转义(Unicode Property Escapes)
``


```js
```
![](../../image/)