## charCodeAt
> 方法返回给定索引表示 `UTF-16` 代码单元(`code unit`)的 `0` 到 `65535` 的整数值.


### Unicode 与 UTF-16
字符串中字符的编码方式常见的有 `Unicode`, 其中 `UTF-8`, `UTF-16` 和 `UTF-32` 都是 `Unicode` 这种编码方式的实现. 其中 `UTF-8` 使用 2 个字节(16个比特)编码, `UTF-32` 使用 4 个字节(32个比特)编码, 特殊的是 `UTF-16`, 它使用 2 个字节或者是 4 个字节编码.

😘😘强烈推荐阮一峰老师的关于 `Unicode` 和 `UTF-16` 的两篇博客 [Unicode与JavaScript详解](https://www.ruanyifeng.com/blog/2014/12/unicode.html) 和 [字符编码笔记：ASCII，Unicode 和 UTF-8](https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html), 我会简单说为了方便 `API` 的背景我简单介绍一下, 介绍的内容在阮老师的博客中都有. 

如果采用 `Unicode` 编码, 怎么区分一个字符究竟使用 2 个字节编码还是 4 个字节呢? 答案在于`基本平面`和`辅助平面`.

如果是两个字节编码, 可以表示的编码范围在 `U+0000` 到 `U+FFFF`. 其中的一部分 `U+D800` 到 `U+DBFF` 范围就是`基本平面`, 在解析字符串的过程中每次读两个字节, 如果读到的两个字节恰好在基本平面内, 那么就会继读下面两个字节, 把四个字节放在一起解析. 如果读到的两个字节不在基础平面内, 那就直接解析这两个字节.

### `Code Unit` 与 `Code Point`
先介绍一下关于 `code unit` 和 `code point` 的关系. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar) 中介绍了一下. 由于采用了 `UTF-16` 这种编码方式, 在基本平面内, 也就是在 `U+0000` 到 `U+FFFF` 中, `code unit` 和 `code point` 是等价的. 但是超过基本平面的范围, 即 `U+10000` 到 `U+10FFFF` 的范围, `code unit` 就和 `code point` 不等价了. 

我们将 `U+10000` 到 `U+10FFFF` 范围内的称为 `code point`, 而一个 `code point` 需要两个 `code unit` 表示, 这两个 `code unit` 也被称为一个代理对(`surrogate pair`), 这时 `code point` 和 `code unit` 就不再划等号了. 而此时代理对中每个 `code unit` 仍在 `U+0000` 到 `U+FFFF` 中. 所以我们就明白了为什么 `charCodeAt` 返回的范围是 `0` 到 `65535(2^16-1)`, 因为 `charCodeAt` 返回的是 `code unit`.

如果你问我为什么范围仅仅到 `U+10FFFF` 而不是到 `U+FFFFFFFF`, 那我也不知道, 反正 `Unicode` 就是这么规定的.

### 语法
`charCodeAt` 的参数是一个整数索引值, 要大于等于 0 并且小于字符串的长度. 如果索引不是 `number` 类型, 就将其默认为 0 看待.

从下图可以看到
- 如果参数是 0 且小于字符串长度, 就正常返回
- 如果参数是 `number` 但是超过了字符串长度或者是负数, 就返回 `NaN`
- 如果输入的字符串(非 `number` 类型), 就返回索引为 0 处的结果
- 如果输入的是小数
  - 正数, 向下取整
  - 负数, 在 -1 和 0 之间, 取 0; 否则返回 `NaN`

![](../../image/Snipaste_2022-11-05_08-50-53.png)

从上面的介绍中就可以看出来, 对于非基本平面内的字符, 使用 `charCodeAt` 没有办法获得其 `Unicode` 值, 比如这个 `Emoji` 字符😊
![](../../image/Snipaste_2022-11-05_08-51-40.png)

可以计算一下, `55357` 对应的 `16` 进制为 `U+D83D` 是基本平面内的字符, 因此如果字符串内存在非基本平面内的字符, 需要小心使用 `charCodeAt` 这个方法. 当然不仅仅是 `charCodeAt` 可能返回有问题的结果, `length` 也有这个问题. 😅明明字符串中只有一个字符, 结果却返回了 2, 这是因为 `length` 计算 `code unit` 的数量来返回长度, 因为 😊 并非基础平面字符, 所以使用 2 个 `code unit` 编码一个字符, 因此就返回了 2.

![](../../image/Snipaste_2022-11-05_08-52-05.png)
这里说一些解决方法, 要是用 `ES6` 的 `Array.from` 或者展开运算符将字符串转为数组再计算长度才可以准确处理非基础平面的字符

![](../../image/Snipaste_2022-11-05_08-56-26.png)
谢谢你看到这里😊
