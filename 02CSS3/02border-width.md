# `border-width`
> 设置盒子的边框宽度
## 语法
1.  `<line-width>{1, 4}`: 表示接收最少 `1` 个, 最多 `4` 个的 `<line-width>` 类型的数据.
    - 📕`CSS` 中的数据也是有类型的😀
2. 其中 `<line-width>` 可以是
    - `<line-width>` = `<length> | thin | medium | thick`
    - `|` 表示互斥, 即`<length>`, `thin`, `medium` 和 `thick` 有且只有一个能出现
## 取值
1. 关键词属性
    - 支持 `thin`, `medium` 和 `thick`
    - 规范中并没有定义每个关键字代表的具体宽度, 但是遵循的规则是宽度一次增加 `thin <= medium <= thick`
    - 下面看不同浏览器的实现
      - 不过各家浏览器表现竟然出乎意料的一致, 三者的计算值分别为 `1px`, `3px`, `5px`,
      - ![](../../image/Snipaste_2022-02-22_22-19-58.png)
      - ![](../../image/Snipaste_2022-02-22_22-20-42.png)