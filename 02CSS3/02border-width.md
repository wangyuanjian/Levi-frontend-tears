# `border-width`
> 设置盒子的边框宽度
## 语法
1.  `<line-width>{1, 4}`: 表示接收最少 `1` 个, 最多 `4` 个的 `<line-width>` 类型的数据.
    - 📕`CSS` 中的数据也是有类型的😀
2. 其中 `<line-width>` 可以是
    - `<line-width>` = `<length> | thin | medium | thick`
    - `|` 表示互斥, 即`<length>`, `thin`, `medium` 和 `thick` 有且只有一个能出现
    - 其中, 文档写的很清楚, 这个 `<length>` 必须`非负`
## 取值
1. 关键词属性
    - 支持 `thin`, `medium` 和 `thick`
    - 规范中并没有定义每个关键字代表的具体宽度, 但是遵循的规则是宽度一次增加 `thin <= medium <= thick`
    - 下面看不同浏览器的实现
      - 不过各家浏览器表现竟然出乎意料的一致, 三者的计算值分别为 `1px`, `3px`, `5px`,
      - ![](../../image/Snipaste_2022-02-22_22-19-58.png)
      - ![](../../image/Snipaste_2022-02-22_22-20-42.png)
    - 同时, `medium` 也是边框宽度的默认值, 所以我们可以下面的代码时相同效果的
2. `<length>`
    - 正数和负数: 这个应该不用多想, 正数肯定支持, 文档里说的很清楚不支持负数, 但是如果真的写负数, 浏览器会怎么渲染呢? `Edge` 和 `Firefox` 都是这样渲染的
      - ```css
        .box3 {
          border: 1px solid #111;
          border-top-width: -1px;
        }
      - ![](../../image/Snipaste_2022-02-24_21-54-00.png)
    - 小数
      - ```css
        .box4 {
          border: 1px solid #111;
          border-top-width: .1px;
          border-left-width: .01px;
          border-bottom-width: 1.1px;
          border-right-width: 1.8px;
        }
      - 首先看 `Chrome` 浏览器, 不足 `0.5px` 的都渲染为 `0.5px`, 其他的多少就是渲染多少
        - ![](../../image/Snipaste_2022-02-24_22-05-09.png)
      - 但是在 `Firefox` 中, 似乎对小数单位进行了四舍五入, 但是四舍五入的规则是把我整蒙了😵😵😵. 比如第一张图, `0.7px` 进为 `1px` 但是第二张图 `1.7px` 又舍为 `1.5px`. 可以参考[这篇博客](https://johnresig.com/blog/sub-pixel-problems-in-css/), 其中也说到了 `Firefox` 浏览器将有些值向上取整而有些值向下取整. 所以为了避免这种情况, 还是乖乖使用整数吧
        - ![](../../image/Snipaste_2022-02-24_22-07-54.png)
        - ![](../../image/Snipaste_2022-02-24_22-24-17.png)
    - 百分数
      - 目前看来, `Chrome` 和 `Firefox` 都不支持百分数的属性, 所以暂时用不了
      -  ![](../../image/Snipaste_2022-02-26_09-35-02.png)
3. 特殊的事情
    - 在 `border` 这个简写属性中, 是可以省略 `border-width` 的, 比如
    - ```css
      .box2 {
        border: solid #111;
      }
    - ❗❗但是, 这个样式在不同浏览器中却展示不一样的. 在 `Chrome`, `Opera` 和 `Edge` 浏览器中, 边框宽度都是 `1.5px`; 但是在 `Firefox` 和 `ie11` 浏览器中, 边框都是 `3px`. 所以为了避免浏览器展示不同, 还是尽量不要省略这个属性
    - ![](../../image/Snipaste_2022-02-23_22-47-12.png)
    - ![](../../image/Snipaste_2022-02-23_22-49-00.png)
## 应用规则
> `<line-width>{1, 4}` \
> 既然这个属性可以只有 1 个值, 也可以有 4 个值, 那么看一下应用规则
1. `1`个值
    - 四个边框同样宽度
2. `2`个值
    - 第一个值应用于`上, 下`边框
    - 第二个值应用于`左, 右`边框
3. `3`个值
    - 第一个值应用于`上`边框;
    - 第二个值应用于`左, 右`边框;
    - 第三个值应用于`下`边框;
4. `4`个值
    - 四个值分别按照`上, 右, 下, 左`(顺时针)的顺序应用于四个边框