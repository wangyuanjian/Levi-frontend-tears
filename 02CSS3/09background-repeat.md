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
      -  
1. `round`
1. `no-repeat`
1. 
默认情况下, 重复的图像被裁剪为元素的大小, 但是



- ```html
    - ```css
    - ![](../../image/)