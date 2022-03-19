# `background-repeat`
> 定义背景图像的重复方式, 背景图像可以沿着水平或者垂直方向重复, 或者根本不重复. 默认是 `repeat`, 这个单值表示水平和垂直方向都重复.
## 语法
### 关键词
1. `repeat`
    - 图像会尽可能地重复至覆盖整个背景图像绘制的区域, 最后一张的图像如果大小不合适会被裁剪
    - ```html
      <div class="box">repeat<br>repeat</div>
    - ```css
      .box {
        width: 200px;
        height: 200px;
        background-image: url(../../float/star.png);
        border: 15px dashed salmon;
        padding: 1rem;
        font-size: 2em;
        text-align: center;
        color: #111;
      }
    - ![](../../image/Snipaste_2022-03-17_21-19-38.png)
1. `space`
    - 图像会在不被裁剪的情况下尽可能重复. 第一个和最后一个图像会被固定在元素相应的边上, 空白会均匀分布在图像之间.
    - 只有在图像太大但是容器太小没有办法完整展示一个图像时, 图像才会被裁剪.
    - ```html
      <div class="box box1">space<br>space</div>
      <div class="box box2">space<br>space</div>
      <div class="box box3">space<br>space</div>
    - ```css
      .box1 {
        background-repeat: space;
      }
      .box2 {
        background-repeat: space;
        background-image: url(../../float/coffee-whole.png);
      }
      .box3 {
        background-repeat: space;
        background-image: url(../../float/star.png);
        background-position: bottom right;;
      }
    - ![](../../image/Snipaste_2022-03-17_21-43-35.png)
      - 第一张图是 `space` 的默认表现;
      - 第二图的大小是 `310 * 232` 超过了盒子的 `padding-box` 的 `232 * 232` 大小, 所以图像发生裁剪;
1. `round`
    - 当允许的空间在增大, 重复的图片将会被拉伸(不留空隙)直到有足够的空间(大于等于半个图像宽度)添加另一张图像. 当新的图像加入后, 所有当前图像都被压缩.
    - ```html
      <div id="space" class="box box4">round<br>round</div>
      <button id="add">+10</button>
    - ```css
      .box4 {
        width: 201px;
        height: 201px;
        background-repeat: round;
        padding: 0;
        border: 0;
        outline: 1px solid #111;
      }
    - ```javascript
      let myWidth = 201;
      add.addEventListener('click', (e) => {
        myWidth += 10;
        space.style.width = `${myWidth}px`;
      })
    - ![](../../image/background-repeat-round.gif)
    - 📕我们看着这个案例来理解上面的意思, 首先单个背景图的大小是 `67*67`, 背景是 `201*201`, 刚刚好容纳三个背景图, 当每次点击按钮使得背景增加 `10px` 时, 根据上面的说法, 背景图会被拉伸, 这样就不会留下空隙.
    - 当第四次点击按钮后, 背景宽度增加了 `40px`, 大于半个图像的宽度 `33.5px (67/2)`, 所以整个背景从 `3` 个图像变为 `4` 个图像, 并且所有的四个图像都被压缩, 视觉上`变窄`
1. `no-repeat`
1. 
默认情况下, 重复的图像被裁剪为元素的大小, 但是



- ```html
    - ```css
    - ![](../../image/)