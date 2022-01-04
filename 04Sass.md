<!-- TOC -->

- [Sass](#sass)
  - [基础](#基础)
  - [语法](#语法)
    - [变量](#变量)
    - [规则嵌套](#规则嵌套)
    - [属性嵌套](#属性嵌套)
    - [导入 SASS 文件](#导入-sass-文件)

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
1. css 中, 如果我们要写一大串指向页面中同一块的样式时, 往往需要一遍又一遍写同一个 `ID`, 如下
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
3. 群组选择器
    - 嵌套也能很好的处理群组选择器的情况
    - 比如, 我们需要为 `.container` 中每个元素都设置 `margin`, 一般的 `css` 是这样写的
      - ```html
        <div class="container">
          <h1>h1</h1>
          <h2>h2</h2>
          <h3>h3</h3>
        </div>
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
### 属性嵌套
1. 除了 `CSS` 选择器, 属性也可以进行嵌套
    - 比如频繁编写 `border-*` 类型的属性会很麻烦. 可以使用下面的形式
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
    - 当通过 `@import` 将 `sass` 样式分散到多个文件时, 通常只想生成几个少数的 `css` 文件. 那些专门为 `@import` 编写的 `sass` 文件不需要生成对应的独立 `css` 文件, 这样的 sass 文件被称为 **`局部文件`**
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
4. 导入原生 `css` 文件
    - 以下三种情况会生成原生的 `css@import`, 尽管这回造成浏览器解析 `css` 时的额外下载
      - 被导入文件的名字以 `.css` 结尾
      - 被导入文件是一个 `URL` 地址, 由此可以使用谷歌字体 `API` 提供的相应服务
      - 被导入文件的名字时 `css` 的 `url()` 值
    - 创建一个 css 文件 `05_css_import.css`
    - ```css
      .box7 .world {
        color: sandybrown;
        font-size: 1.5em;
      }
    - ```scss
      @import './05_css_import.css';
    - ![](../image/Snipaste_2022-01-04_22-06-50.png)










































































    