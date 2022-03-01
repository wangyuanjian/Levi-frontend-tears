# `background-image`
> 属性用于为一个元素设置一个或者多个背景图像
##　语法
1. 每一个背景图片可以是关键字 `none` 或者 `<image>`. 如果指定多张背景图片, 就需要使用逗号 `,` 将图片分开
2. `none`
    - 表示五背景图
3. `<image>`
    - 是一种表示二维图像的 `CSS` 数据类型. 可以表示下面的数据
    - `url()`: 既可以是互联网的图片, 也可以是本地的图片
      - ```css
        .box1 {
          background-image: url(https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Zmxvd2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60);
          background-image: url(../../float/coffee-whole.png);
        }
    - `<gradient>` 渐变类型
      - ```css
        .box2 {
          background-image: linear-gradient(#348e42, #9852ac);
        }
    - `element()` 从任意的 `HTML` 元素生成 `<image>` 类型的值. 目前这个函数只在 `Firefox` 中支持, `Chrome` 暂不支持
      - ```html
        <div class="box box2" id="box2"></div>
        <div class="box box3"></div>
      - ```css
        .box2 {
          background-image: linear-gradient(#348e42, #9852ac);
        }
        .box3 {
          background-image: element(#box2);
          background-image: -moz-element(#box2);
        }
      - ![](../../image/Snipaste_2022-02-27_22-00-57.png)
  - `image()`: 这个函数类似`url()`函数, 但是多了一些额外的功能, 比如可以指定图片的方向, 只展示图片的部分等. 😟但是这个函数目前所有浏览器都不支持
  - 由 `cross-fade()` 函数定义的两张或者多张图像的混合
    - ```html
      <div class="box box4"></div>
      <div class="box box5"></div>
    - 📕注意在 `Chrome` 等 浏览器要加 `-wekbit-` 前缀. 下面语法的意思是第一张图片 `25%` 的透明度, 第二章图片 `75%` 的透明度
    - ```css
      .box4 {
        background-image: -webkit-cross-fade(
          linear-gradient(red, orange),
          linear-gradient(green, blue),
          75%
        );
        background-image: cross-fade(
          linear-gradient(red, orange),
          linear-gradient(green, blue),
          70%
        );
      }
      .box5 {
        background-image: linear-gradient(green, blue);
      }
    - 为了对比效果, 下面的图是不加任何渐变混合的图像, 可以看到上面的混合图像中蓝色变得更加紫色, 绿色变得有点暗, 看起来很脏
    - ![](../../image/Snipaste_2022-02-28_22-31-49.png)
  - `image-set()`: 
    - 让浏览器从一组图像中选择最适合当前设备屏幕的图片, 主要为了高分辨率屏幕
## 规则
1. 在绘制图像时, 图像一层叠一层, 先指定的图像会在之后指定的图像上面绘制
    - ```html
      <div class="box box6"></div>
      <div class="box box7"></div>
    - ```css
      .box6 {
        background-image: linear-gradient(green, blue),
                        url(../../float/coffee-whole.png);
      }
      .box7 {
        background-image: url(../../float/coffee-whole.png),
                        linear-gradient(green, blue);
        background-size: contain;
        background-repeat: no-repeat;
      }
    - ![](../../image/Snipaste_2022-03-01_20-15-09.png)
2. 元素的 `border` 在 `background-image` 之上绘制, 但是 `background-color` 在图像下绘制, 具体如何控制盒子和边框的关系需要使用 `background-clip` 和 `background-origin`
    - `MDN` 建议仍然指定 `background-color` 属性, 如果图像无法被加载(比如网络断开)那么就会展示背景色
    - ```html
      <div class="box box8"></div>
    - ```css
      .box8 {
        border: 5px solid red;
        background-color: rebeccapurple;
        background-image: url(../../float/coffee-whole.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
    - ![](../../image/Snipaste_2022-03-01_21-09-26.png)
3. 如果指定的图像因为不存在等原因而无法绘制, 浏览器会此情况等同于其值为 `none`