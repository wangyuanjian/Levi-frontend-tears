<!-- TOC -->

- [Sass](#sass)
  - [基础](#基础)
  - [语法](#语法)
    - [变量](#变量)
    - [规则嵌套](#规则嵌套)

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
1. 
    - ![](../image/Snipaste_2022-01-03_00-33-24.png)






























    