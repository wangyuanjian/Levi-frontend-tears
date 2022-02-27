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
  - 