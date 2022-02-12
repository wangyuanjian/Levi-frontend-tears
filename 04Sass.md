<!-- TOC -->

- [Sass](#sass)
  - [基础](#基础)
  - [语法](#语法)
    - [变量](#变量)
    - [规则嵌套](#规则嵌套)
    - [属性嵌套(Nested Properties)](#属性嵌套nested-properties)
    - [导入 SASS 文件](#导入-sass-文件)
  - [注释](#注释)
  - [`SassScript`](#sassscript)
    - [变量 `$`](#变量-)
    - [数据类型](#数据类型)
    - [运算](#运算)
    - [圆括号(parentheses)](#圆括号parentheses)
  - [函数](#函数)
  - [mixin 混合](#mixin-混合)
    - [给混合器传参](#给混合器传参)
  - [继承器](#继承器)
    - [何时使用继承](#何时使用继承)
    - [继承的高级用法](#继承的高级用法)
    - [继承的工作细节](#继承的工作细节)
    - [使用继承的最佳实践](#使用继承的最佳实践)

<!-- /TOC -->

# Sass
> 世界上最成熟, 最稳定, 最强大的专业级 CSS 扩展语言
## 基础
1. `Vue` 安装 `Sass`
    - 直接安装 `sass` 和 `sass-loader`.
    - ```shell
      npm install sass@1.45.2
      npm install sass-loader@8.0.0
    - 如果启动时报错 `this.getOptions is not a function`, [网上说是 sass-loader](https://zhuanlan.zhihu.com/p/373588593) 版本过高, 卸载然后安装了 `8.0.0`, 就没有报错了
    - 我使用的 `Vue` 版本: `Vue@2.6.11`, 
2. `sass` `scss` 区别
    - `3.0` 版本之后的才出现了 `scss(Sassy CSS)`
    - `sass` 是靠缩进表示嵌套关系, `scss` 是花括号
      - ```sass
        .father
          width:100px;
          .son
              width:50px;
      - ```scss
        .father{
          width:100px;
          .son{
              width:50px;
          }
        }
## 语法
### 变量
1. 声明变量
    - `sass` 使用 `$` 符号来标识变量
    - 任何可以用作 `css` 属性值的赋值都可以用作 `sass` 的变量值, 甚至是以空格分割的多个属性值
    - ```scss
      $border-color: red;
      $border: 3px solid red;
      $my-font-family: "Fira Code", "微软雅黑", Arial;
    - 变量不一定必须声明在文件的顶部, 但是必须在引用之前.
2. 引用变量
    - 凡是 `css` 属性的标准值可存在的地方, 变量就可以使用. `css` 生成时, 变量会被它们的值所替代.
    - ```scss
      div.box {
        width: 100px;
        height: 100px;
        border: 1px solid $border-color;
        font-family: $my-font-family;
      }
    - 声明变量时, 变量也可以引用其他变量. 
    - ```scss
      $border: 3px solid $border-color;
3. 变量作用域
    - 如果变量生命在 `css` 规则块内, 那该变量只能在此规则块内使用, 如果他们出现在任何形式的 `{...}` 块中 ( 如 `@media` ), 情况相同
    - ```scss
      div.box {
        $my-width: 100px;
        width: $my-width;
        height: $my-width;
      }
4. 变量的命名(`-` or `_`)
    - `sass` 的变量名可以与 `css` 中的属性名和选择器名称相同, 包括中划线(**`-`**)和下划线(**`_`**).
    - 使用中划线的方式更普遍
    - `sass` 中, 使用中划线声明的变量可以使用下划线引用, 反之亦然
    - ```scss
      $border-color: red;
      $my-font-family: "Fira Code", "微软雅黑", Arial;
      
      div.box {
        border: 1px solid $border_color;
      }
### 规则嵌套
1. `CSS` 中, 如果我们要写一大串指向页面中同一块的样式时, 往往需要一遍又一遍写同一个 `ID`, 如下
    - ![](../image/Snipaste_2022-01-03_00-33-24.png)
    - `sass` 可以让你只写一遍且使样式可读性更高
    - ```scss
      #content {
        article {
          h1 {
            color: #333;
          }
          p {
            margin-bottom: 1.4em;
          }
        }
        aside {
          background-color: #eee;
        }
      }
    - 这样的嵌套关系和 `HTML` 中的嵌套关系很像, 真的~
    - `sass` 将 `#content` (父级) 这个 `id` 放在 `article` 选择器 (子级) 前边, 若 `article` 还有子选择器, 则重复这一步骤即可展开.
    - 🐖注意: 下面的嵌套展开之后. 我想说的就是, 展开之后🙅‍不是🙅‍`#main p, div`, 而是 `#main p, #main div`
      - ```html
        <div id="main">
          <p><span>span_in_p</span></p>
          <div><span>span_in_div</span></div>
        </div>
      - ```scss 
        #main {
          width: 97%;
          p, div {
            color: red;
            span {
              font-size: 2em;
            }
          }
        }
      - ![](../image/Snipaste_2022-02-07_21-34-16.png)
2. 父选择器的标识符 **`&`**
    - 大多数情况这种简单的嵌套都没问题, 但是有些场景不行, 比如应用一个类似 `:hover` 的伪类
      - ```scss
        #content {
          aside {
            background-color: #eee;
            :hover {
              color: #f60;
            }
          }
        }
      - 编译后的结果就是
      - ```scss
        #content aside :hover{
          background-color: #eee;
        }
    - 父选择器可以放在任何一个选择器可出现的地方.
      - 当包含父选择器标识符的嵌套规则被打开时, 它不会像后代选择器那样进行拼接, 而是 `&` 被父选择器直接替换
      - ```scss
        #content {
          aside {
            background-color: #eee;
            &:hover {
              color: #f60;
            }
          }
        }
      - 最终生成的结果是
      - ```scss
        #content aside:hover {
          color: #f60;
        }
    - `&` 必须作为选择器的第一个字符, 其后可以跟随后缀生成符合的选择器
      - ```html
        <div class="post">
          <div class="post-header">header</div>
        </div>
      - ```scss
        .post {
          &-header {
            color: #d30;
          }
        }
      - ![](../image/Snipaste_2022-02-07_21-53-55.png)
      - 当父选择器含有不合适的后缀时, `sass` 将会报错
3. 群组选择器
    - 嵌套也能很好的处理群组选择器的情况
    - 比如, 我们需要为 `.container` 中每个元素都设置 `margin`, 一般的 `css` 是这样写的
      - ```html
        <div class="container">
          <h1>h1</h1>
          <h2>h2</h2>
          <h3>h3</h3>
        </div>
      - 用 `CSS` 写复杂
      - ```css
        .container h1, .container h2, .container h3 {
          margin-left: 1100px0px
        }
      - ```scss
        .container {
          h1, h2, h3 {
            margin-left: 100px;
          }
        }
    - 或者这样, 我们需要为不同容器中的 `a` 元素设置样式
      - ```html
        <div class="box1"><a href="#">hhh</a></div>
        <div class="box2"><a href="#">hhh</a></div>
      - ```css
        .box1 a, .box2 a {
          text-decoration: none;
        }
      - ```scss
        .box1, .box2 {
          a {
            text-decoration: none;
          }
        }
      - 🐖注意: 群组选择器的规则嵌套生成的 `css`. 虽然`sass` 让你的样式表看上去很小, 但实际生成的 `css` 却可能非常大, 这会降低网站的速度
4. 子组合选择器和同层组合选择器
    - ```scss
      article {
        ~ article { border-top: 1px dashed #ccc }
        > section { background: #eee }
        dl > {
          dt { color: #333 }
          dd { color: #555 }
        }
        nav + & { margin-top: 0 }
      }
    - ```css
      article ~ article { border-top: 1px dashed #ccc }
      article > footer { background: #eee }
      article dl > dt { color: #333 }
      article dl > dd { color: #555 }
      nav + article { margin-top: 0 }
### 属性嵌套(Nested Properties)
1. 除了 `CSS` 选择器, 属性也可以进行嵌套
    - 有些 `CSS` 属性遵循相同的命名空间 (`namespace`)，比如 `font-family`, `font-size`, `font-weight` 都以 `font` 作为属性的命名空间
    - 频繁编写 `border-*` 类型的属性会很麻烦. 可以使用下面的形式
    - ```scss
      .box3 {
        border: {
          style: solid;
          width: 1px;
          color: #ccc;
        }
      }
    - 解析后就是这样
    - ```css
      .box3 {
        border-style: solid;
        border-width: 1px;
        border-color: #ccc;
      }
    - 嵌套属性的规则是这样的: 把属性名从中划线 `-` 的地方断开, 在根属性后边添加一个`冒号:`, 紧跟一个 `{ }` 块, 把子属性部分写在这个 `{ }` 块中
2. 属性的缩写形式和例外规则
    - 命名空间也可以包含自己的属性值
    - 比如, 我们已经使用缩写形式 `border`, 但是想指定左边框宽度, 就可以这样写
    - ```scss
      .box4 {
        border: 1px solid #000 {
          left-width: 3px;
        }
      }
    - ![](../image/Snipaste_2022-01-03_19-43-02.png)
### 导入 SASS 文件
1. `css` 中有 `@import` 规则, 允许在一个 `css` 文件中导入其他 `css` 文件, 但是只有执行到 `@import` 时, 浏览器才会下载其他 `css` 文件, 这导致页面加载起来慢.
    - `sass` 中的 `@import` 在生成 `css` 文件时就把相关的文件导入进来, 无需发起额外的下载请求.
    - 使用 `sass` 导入文件时不需要指明被导入文件的全名, 即省略 `.scss` 或 `.sass` 后缀.
    - 🐖注意: `@import` 后要加`分号`哦
    - 例如, 新建一个 `scss` 文件引用之前的 `scss` 文件
    - ```scss
      @import "./02_嵌套";

      .box4 {
        border: 1px solid red;
      }
    - ![](../image/Snipaste_2022-01-03_20-16-28.png)
    - 其实按照 `css` 的加载规则, 新文件的样式覆盖了 `@import` 的文件中的样式
2. `sass部分文件`
    - 当通过 `@import` 将 `sass` 样式分散到多个文件时, 通常只想生成几个少数的 `css` 文件. 那些专门为 `@import` 编写的 `sass` 文件不需要生成对应的独立 `css` 文件, 这样的 `sass` 文件被称为 **`局部文件`**
    - 🤝约定: 局部文件的文件名以`下划线`开头, 这样该文件就不会输出 `css` 而是仅作为导入使用. 导入局部文件时, 还可以省略文件名开头的下划线. 
    - ```scss
      @import "./03_partial";
    - ![](../image/Snipaste_2022-01-03_21-15-04.png)
3. 默认变量值
    - 一般情况下, 你反复声明一个变量, 只有最后一处声明有效且它会覆盖前边的值. 如果我们写了一个用于 `@import` 的 `sass` 文件, 其中的某个变量在导入前别人就已经声明了但是又不希望导入的变量覆盖已经声明的变量, 那么 `!default` 可以帮助
    - `!default`: 作用于变量. 表示, 如果这个变量被声明赋值了, 那么就用它声明的值, 否则就用这个默认值.
    - 例如我们在 `index.scss` 中声明一个变量 `$my-color1`, 同时 `import` 另一个 `sass` 文件
    - ```scss
      $my-color1: yellow;

      @import "./02_嵌套";
      // 导入局部文件
      @import "./03_partial";

      .box4 {
        border: 1px solid $my-color1;
      }
    - 我们在局部文件中也声明了变量 `$my-color1`
    - ```scss
      $my-color1: red !default;
    - 所以最后生效的是 `yellow`. 
    - 🐖注意: 这与 `index` 中声明变量和 `import` 文件的顺序没有关系, 即便先 `import` 再声明变量也没差
4. 嵌套导入
    - 与原生 `css` 不同, `sass` 允许 `@import` 命令写在 `css` 规则块内. 在这种导入方式下, 生成对应的 `css` 文件时, 局部文件会被直接插入到 `css` 规则导入它的地方
    - 一个局部文件 `_04_partial2.scss`
    - ```scss
      .hello {
        color: salmon;
        font-size: 2em;
      }
    - 另一个文件, 导入局部文件
    - ```scss
      .box6 {
        @import './04_partial2';
      }
    - 最后结果
    - ![](../image/Snipaste_2022-01-04_21-56-01.png)
5. 导入原生 `css` 文件
    - 以下三种情况会生成原生的 `css@import`, 尽管这回造成浏览器解析 `css` 时的额外下载
      - 被导入文件的名字以 `.css` 结尾
      - 被导入文件是一个 `URL` 地址, 由此可以使用谷歌字体 `API` 提供的相应服务
      - 被导入文件的名字时 `css` 的 `url()` 值
    - 创建一个 `css` 文件 `05_css_import.css`
    - ```css
      .box7 .world {
        color: sandybrown;
        font-size: 1.5em;
      }
    - ```scss
      @import './05_css_import.css';
    - ![](../image/Snipaste_2022-01-04_22-06-50.png)
## 注释
1. `css` 中的标准注释格式 `/* ... */`
2. `scss` 提供了新的注释, 静默注释, 即注释内容不会出现在生成的 `css` 文件中, 静默注释以 `//` 开头, 注释内容直到行尾
    - ```scss
      .box4 {
        // 我不会出现
        border: 1px solid $my-color1; /*我会出现*/
      }
3. 将 `!` 作为多行注释的第一个字符表示在压缩输出模式下保留这条注释并输出到 `CSS` 文件中, 通常用于添加版权信息.
    - 插值语句 (`interpolation`) 也可写进多行注释中输出变量值
    - ```scss
      $hello: world;
      /*! 我说 #{$hello}*/
    - `npm run build` 之后, 打开 `dist/css/index.xxxxxx.css`, 搜索注释内容, 就能看到
    - ![](../image/Snipaste_2022-02-08_21-56-43.png)
## `SassScript`
### 变量 `$`
1. 变量以 `$` 开头, 赋值方法与 `CSS` 属性写法一样
    - ```scss 
      $width: 5em;
2. 变量作用域
    - 变量支持块级作用域, 嵌套规则内定义的变量只能在嵌套规则内使用 (局部变量), 不在嵌套规则内定义的变量则可在任何地方使用 (全局变量). 将局部变量转换为全局变量可以添加 `!global` 声明
    - ```html
      <div class="box13">
        111
      </div>
      <div class="box14">
        222
      </div>
    - ```scss
      .box13 {
        $boxWidth: 3em !global;
        border: 1px solid #222;
        width: $boxWidth;
      }

      .box14 {
        width: $boxWidth;
        border: 1px solid #222;
      }
    - ![](../image/Snipaste_2022-02-08_22-05-48.png)
### 数据类型
1. 支持 `6` 种主要的数据类型
    - `数字`: `1`, `13px` 
    - `字符串`: 有引号和无引号, `'foo'`, `bar` 
    - `颜色`: `blue`, `#eee`, `rgba(0, 0, 0)`
    - `boolean`: `true`, `false`
    - `空值`: `null` 
    - `数组`: 用空格或逗号分隔, `2px 3px`, `PingFang, Arial`
    - `maps`: 相当于 `JS` 的 `Object` , `(key1: value2, key2: value2)`
    - 📕也支持其他 `CSS` 属性值, 或 `!important` 声明, 但一律视为无引号字符串
2. 字符串 `Strings`
    - 支持`有引号字符串`和`无引号字符串`
    - 在编译 CSS 文件时不会改变其类型, 只有使用插值 `#{}` 时, 有引号字符串将被编译为无引号字符串. 如下, 有引号的 `.message1` 被编译为无引号
    - ```html
      <div class="opera">
        <div class="message1">Hello</div>
        <div id="message2">Hello</div>
      </div>
    - ```scss 
      @mixin opera-message($selector) {
        .opera #{$selector}::before {
          content: 'Hi, Opera Users';
          color: #d30;
        }
      }

      @include opera-message('.message1');
      @include opera-message('#message2');
    - ![](../image/Snipaste_2022-02-10_22-46-04.png)
3. 数组
    - 数组是 sass 中如何处理 `margin: 15px 0 0 0` 通过空格或逗号分隔的一系列值. 独立的值也被视为数组, 只包含一个数的数组
      - 如果内外两层数组使用相同的分隔方式, 需要用圆括号包裹内层, 所以也可以写成 `(1px 2px) (5px 6px)`
    - sass 中的函数赋予了数组更多功能, 稍后介绍
    - 数组中可以包含子数组. 
    - 用 `()` 表示不包含任何值的空数组, 空数组不可以直接编译成 `CSS`, 如果数组中包含空数组或空值, 编译时将被清楚, 比如 `1px 2px () 3px` 或 `1px 2px null 3px`
### 运算
> 所有数据类型均支持相等运算 `==` 和 `!=`
1. 数字运算
    - `SassScript` 支持数字的加减乘除, 取整等运算, 如果必要会在不同单位之间转换
      - ```html
        <div class="box15">
          asd
        </div>
      - ```scss
        .box15 {
          width: 20px + 20px;
          height: 90px - 50px;
          border: 2 * 2px solid black;
        }
      - ![](../image/Snipaste_2022-02-12_15-07-32.png)
    - 关系运算 `<`, `>`, `<=`, `>=` 也可用于数字运算
2. 除法运算
    - `/` 在 `CSS` 中通常其分隔数字的用途, 在 `sass` 中赋予了其除法运算的功能, 以下三种情况将被视为出发运算
      - 如果值, 或值的一部分, 是`变量`或`函数的返回值`
      - 如果值被圆括号包裹
      - 如果只是算术表达式的一部分
    - 先来看一下 CSS 中分隔数字的用法
      - ```html
        <div class="box16">
          房地產認真崇拜從事我是，固定精選西部加盟新型三年註冊時間，直接填寫觀點審核品種為此影片，很有監督臉色，一定要保育石虎資產患者總數，僅供調查更新時間這位就好分析提供分別，以為角色地球調查之中都有那天笑話大學認證衝突，十年你就任何人，願意天空看看，上傳前後兒。
        </div>
      - ```css
        .box16 {
          font: 16px/32px sans-serif;
        }
      - ![](../image/Snipaste_2022-02-12_15-20-34.png)
      - 看到了把, 这里的 `16px/32px` 其实是 `font-size: 16px` 和 `line-height: 32px` 的简写
    - `/` 作为算数表达式
      - ```html
        <div class="box17">hahah</div>
      - ```scss
        .box17 {
          $myWidth2: 100px;
          width: $myWidth2 / 2; // variable
          height: (100px / 2); // parentheses
          border: 5px - 4px / 2px solid red;
        }
      - ![](../image/Snipaste_2022-02-12_15-30-02.png)
    - 如果又要使用变量, 又确保 `/` 不作为除法运算符而是分隔符, 需要使用 `#{}`
      - ```html
        <div class="box18">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero nisi quasi dolorum sapiente omnis laborum, tempora alias aspernatur consequatur dolores quo veritatis! Excepturi natus fugit itaque vel aliquam sunt dolores!</div>
      - ```scss
        .box18 {
          $fontSize: 16px;
          $lineHeight: 3;
          font: #{$fontSize} / #{$lineHeight} helvatica;
        }
      - ![](../image/Snipaste_2022-02-12_15-33-48.png)
    - 警告
      - `Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.`
3. 颜色运算
    - ❗❗❗ [`sass`中已经不可以用 `+` 计算颜色了](https://github.com/sass/sass/issues/2543) ❗❗❗
4. 字符串运算
    - `+` 可用于连接字符串.
      - 如果有引号字符串 ( 位于 `+` 左侧 ) 连接无引号字符串, 运算结果是有引号的;
      - 相反, 无引号字符串 ( 位于 + 左侧 ) 连接有引号字符串, 运算结果则没有引号.
      - ```html
        <div class="box20"></div>
      - ```scss
        .box20 {
          cursor: p + 'ointer';
          &::before {
            content: 'hello, ' + world;
          }
        }
      - ![](../image/Snipaste_2022-02-12_17-37-08.png)
    - 在有引号的文本字符串中使用 `#{}` 可以添加动态的值. 空的值被视为插入了空的字符串
      - ```html
        <div class="box21"></div>
      - ```scss
        .box21 {
          $withQuote: 'hello';
          $withoutQuote: world;
          $emptyString: null;
          &::before {
            content: 'I said #{$withQuote}, #{$withoutQuote} #{0 + 1} minute #{$emptyString} ago';
          }
        }
      - ![](../image/Snipaste_2022-02-12_17-34-50.png)
5. 布尔运算
    - `SassScript` 支持布尔型的 `and`, `or` 以及 `not` 运算.
### 圆括号(parentheses)
1. 圆括号可以用来影响运算的顺序
## 函数
> sass 提供了许多包含许多函数的内置模块, 这些模块需要使用 `@use` 规则加载. \
> 所有内置模块的 `URL` 都需要以 `sass:` 凯塔表明其为 `sass` 自身的一部分
1. 只有很少部分函数可以加载内置模块而全局使用的.
2. 具体函数内容, [参考👉](https://sass-lang.com/documentation/modules)
    - 使用函数举例
      - 引入: `@use` 必须要写在其他规则之前, 即 `scss` 文件的第一行
      - ```scss
        @use 'sass:math';
      - ```html
        <div class="box22">asd</div>
      - ```scss
        .box22 {
          border: math.ceil(2.2) + px solid black;
        }
      - 📕注意: 上面使用无引号字符串相加
      - ![](../image/Snipaste_2022-02-12_20-24-48.png)
## mixin 混合
> 我们可以用变量来处理小小的类似样式, 但是如果样式变得复杂且要大段大段重复样式代码, 变量就不能再胜任, 而混合就是实现打断样式重用而来的.
1. 定义混合 `@mixin`
    - 使用 `@mixin` 定义混合.
    - ```dcss
      @mixin rounded {
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
      }
2. 使用混合
    - 通过 `@include` 使用混合器, 将混合中的所有央视提取出来放在 `@include` 被调用的地方
    - ```scss
      .box8 {
        width: 100px;
        height: 100px;
        border: 1px solid salmon;
        @include rounded;
      }
    - 最终样式
    - ![](../image/Snipaste_2022-01-05_22-00-29.png)
3. 何时使用混合
    - 判断一组属性是否应该组合成一个混合器, 一条经验法则就是你能否为这个混合器想出一个好的名字. 如果你能找到一个很好的短名字来描述这些属性修饰的样式, 那么往往能够构造一个合适的混合器
4. 混合中的 `CSS` 规则
    - 混合中不仅可以包含属性, 也可以包含 `CSS` 规则, 包含选择器和选择器中的属性
    - ```scss
      @mixin no-bullets {
        list-style: none;
        li {
          list-style-image: none;
          list-style-type: none;
          margin-left: 0px;
        }
      }
    - ```scss
      ul.plain {
        color: #444;
        @include no-bullets;
      }
    - ![](../image/Snipaste_2022-01-05_22-11-33.png)
### 给混合器传参
1. 定义带有参数的混合器
    - ```scss
      @mixin box($width, $height, $bgColor) {
        width: $width;
        height: $height;
        background-color: $bgColor;
      }
2. 调用带有参数的混合器
    - ```scss
      .box9 {
        @include box(50px, 50px, rgb(92, 177, 67));
      }
      .box10 {
        @include box(100px, 100px, #f60);
      }
    - ![](../image/Snipaste_2022-01-05_22-30-31.png)
    - 这样传参的一个弊端是, 在参数值很多的情况下, 每个参数是什么意思, 参数之间的顺序很难清楚. `sass` 允许通过语法`$name: value` 的形式指定每个参数的值, 从而使参数的顺序不再重要, 只需保证没有漏掉参数即可
      - 🐖注意: 下面的代码没有按照形参声明的顺序
      - ```scss
        .box11 {
          @include box(
            $width: 100px,
            $bgColor: #d10,
            $height: 100px
          )
        }
3. 有些参数没有定制的需要, 这时给这些参数赋值就很痛苦, 所以 `sass` 允许给参数赋默认值
    - 参数的默认值使用 `$name: default-value` 的声明形式, 默认值可以是任何有效的 `css` 属性值甚至是其他参数的引用
    - 定义混合`_06_mixin.scss`
      - ```scss
        $default-length: 100px;
        @mixin box-default-size(
          $bgColor,
          $width: $default-length,
          $height: 100px
        ) {
          width: $width;
          height: $height;
          background-color: $bgColor;
        }
    - 使用混合
      - ```scss
        .box12 {
          @include box-default-size(
            $bgColor: rgb(115, 169, 223)
          )
        }
## 继承器
1. 使用 `sass` 时, 最后一个减少重复的主要特性就是选择器继承, 即一个选择器可以继承为另一个选择器定义的所有样式, 通过 `@extend` 语法实现
    - ```html
      <div class="error">
        <span>hahaha</span>
      </div>
      <div class="seriousError">
        <span>hahaha :(</span>
      </div>
    - ```scss
      .error {
        color: #c10;
      }
      .seriousError {
        @extend .error;
        font-size: 1.5em;
      }
    - ![](../image/Snipaste_2022-02-06_11-48-38.png)
2. 继承不仅会继承父类自身所有样式, 连与父类有关的组合选择器样式也会被子类以组合选择器的形式继承
    - ```html
      <h1>正常H1</h1>
      <h1 class="error">H1, Error</h1>
      <h1 class="seriousError">H1, Error</h1>
    - ```scss
      h1.error {
        color: #c10;
      }
      h1.error:hover {
        opacity: 0.5;
      }
    - 来看一下生成的样式, 不论是`并集选择器`, 还是`伪类选择器`, 都会被继承哦😀~
    - ![](../image/Snipaste_2022-02-06_12-00-28.png)
### 何时使用继承
1. `mixin` 主要用于展示性样式的重用, 而类名用于语义化样式的重用. 因为继承是基于嘞的, 所以继承应该是建立在语义化的关系上. 当一个元素拥有的类 (比如`.seriousError`) 表明它属于另一个类 (比如`.error`) 这时使用继承再合适不过了.
### 继承的高级用法
1. 任何 `CSS` 规则都可以继承其他规则, 几乎任何 `CSS` 规则也都可以被继承. 最常用的一种高级语法是继承一个 `html` 元素的样式, 尽管默认的浏览器样式不会被继承(因为他们不属于样式表中的样式), 但是你对 `html` 元素添加的所有样式都会被继承
    - ```html
      <h1 class="disabled">i'm here</h1>
    - ```scss
      .disabled {
        color: gray;
        @extend a;
      }
    - ![](../image/Snipaste_2022-02-06_18-28-53.png)
    - 看到了吗? `<a>` 的默认浏览器样式并没有覆盖 `<h1>` 的样式, 如果加上下面代码
      - ```scss
        a:hover {
          font-size: 1em;
        }
      - ![](../image/Snipaste_2022-02-06_18-32-22.png)
      - `hover` 时样式真的发生了改变
2. 如果一条样式规则继承了一个复杂的选择器, 那么它只会继承这个复杂选择器命中的元素所应用的样式.
    - ```scss
      .seriousError1 {
        @extend .important.error;
      }
    - 上面的写在代码里会报错!不过这是官网的例子
    - `.seriousError1` 会继承 `h1..important.error` 但是 `.important` 或 `.error` 分别的样式则不会被继承
3. 如果一个选择器序列 `#main .seriousError2` 继承另一个选择器 `.error`, 那么只有完全匹配 `#main .seriousError2` 这个选择器的元素才会继承 `.error` 的样式
4. 像 `#main .error` 这样的选择器是不能被继承的, 因为从 `#main .error` 中继承的样式一般情况下会跟直接从 `.error` 中继承的样式基本一致, 细微的区别往往使人迷惑
### 继承的工作细节
1. 跟`变量`和`混合器`不同, 继承并不是仅仅用 `CSS` 样式替换 `@extend` 处的代码这么简单
2. `@extend` 背后最基本的思想是
    - 如果 `.seriousError @extend .error`, 那么样式表中任何一处的 `.error` 都用 `.seriousError .error` 这一组选择器进行替换
    - 用面向对象方式理解, 就是父类出现的地方都可以用子类代替这种, 比如 `.error` 是红色背景, `.seriousError` 是红色背景加感叹号, 那么后者更强烈的表达是可以用在之前较温和的表达上.
3. 两个要点
    - 和`混合器`相比, 继承生成的 `CSS` 代码相对较少, 因为继承仅仅是重复选择器, 而不会重复属性
    - 继承遵从 `CSS` 层叠的规则. 对同一属性的修改, 即权重更高的选择器胜出, 如果权重相同, 定义在后边的规则胜出
### 使用继承的最佳实践
1. 继承只会在生成 `CSS` 是复制选择器, 而不会复制大段的 `CSS` 属性. 如果不小心, 可能会让生成的 `CSS` 包含大量的选择器复制.
    - `⚠` 最好不在 `CSS` 规则中使用后代选择器 (比如 `.foo .bar`) 继承 `CSS` 规则.
    - ```scss 
      .bip .baz { a: b; }
      .foo .bar { @extend .baz }
    - 这个例子, `sass` 必须保证应用到 `.baz` 的样式同时也要应用到 `.foo .bar`, 可能存在三种情况
      - ```html
        <!-- 继承情况可能迅速复杂 -->
        <div class="foo">
          <div class="bip">
            <div class="bar">...</div>
          </div>
        </div>
      - ```html
        <div class="bip">
          <div class="foo">
            <div class="bar">...</div>
          </div>
        </div>
      - ```html
        <div class="foo bip">
          <div class="bar">...</div>
        </div>
    - 理解🤔: 上面究竟是什么意思? 回到 `@extend` 的基本思想, 用在这里就是凡是 `.baz` 出现的地方都可以用 `.foo .baz` 替代, 所以, 替代之后就是 `.bip .foo .baz`, 那么对于 `.bip .foo .baz` 这个选择器, 就要做排列组合了, 所以文档中才说选择器的个数可能爆炸性增加.

































































    