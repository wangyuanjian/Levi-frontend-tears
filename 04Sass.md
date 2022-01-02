<!-- TOC -->

- [Sass](#sass)
  - [基础](#基础)
  - [语法](#语法)
    - [变量](#变量)

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
    - Vue@2.6.11, 
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
    - 变量不一定必须声明在文件的顶部.
2. 































    