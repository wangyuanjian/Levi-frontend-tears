# 简单的 HTML + CSS Loading 效果

## HTML
```html
<body>
  <div class="loading">
    <span style="--i: 0;"></span>
    <span style="--i: 1;"></span>
    <span style="--i: 2;"></span>
    <span style="--i: 3;"></span>
    <span style="--i: 4;"></span>
    <span style="--i: 5;"></span>
    <span style="--i: 6;"></span>
    <span style="--i: 7;"></span>
    <span style="--i: 8;"></span>
    <span style="--i: 9;"></span>
    <span style="--i: 10;"></span>
    <span style="--i: 11;"></span>
    <span style="--i: 12;"></span>
    <span style="--i: 13;"></span>
    <span style="--i: 14;"></span>
    <span style="--i: 15;"></span>
    <span style="--i: 16;"></span>
    <span style="--i: 17;"></span>
    <span style="--i: 18;"></span>
    <span style="--i: 19;"></span>
  </div>
</body>
```
1. 通过 `style="--i: 19;"` 的定义 `CSS` 变量 i
## CSS
1. 全局初始化样式, 设置 `body` 最小高度 `100vh`, 并设置子元素水平垂直居中.
    - ```css
      body {
        padding: 0;
        margin: 0;
        background-color: salmon;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
2. 设置 loading 宽高和相对定位
    - ```css
      .loading {
        width: 150px;
        height: 150px;
        position: relative;
      }
3. 设置 `loading` 的每个子元素 `span` 为绝对定位并其宽高与父元素相同.
    - 📕设置绝对定位就会创建 [BFC](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context), `<span>` 就从 `inline` 变为了 `block` 元素, 因此设置其宽高才会生效
    - 📕最后一行的代码是使元素顺时针旋转, 旋转中心默认为`center center`, 每一个元素的旋转角度是不同的. 至于为什么要乘以 `18deg`, 因为一共有 `20` 个 `span`, 均分 `360` 度
      - 第一个 `<span>` 旋转 `0deg`
      - 第二个 `<span>` 旋转 `18deg`
      - ...
    - ```css
      .loading>span {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotate(calc(var(--i) * 18deg));
      }
    - ![](../../../image/Snipaste_2022-05-23_21-37-26.png)
    - 看下上面的截图(只留下 `5` 个 `span`), 黑色框就是 `span` 的 `border`. 
4. 增加白点和对应的动画
    - 设置伪元素 `before` 并使其定位属性为 `absolute`, 这样其就像对于父元素 `span` 定位.
    - 📕第一次写的时候为了实现白点出现消失的效果, 你可能会设置动画使其的宽高从 `0` 变到正常, 但是这样的效果是圆点不是从中心向边界扩散, 而是从边界一点点变大, 和想要的效果不一样.
      - 而使用 `transform: scale` 就不会出现这样的问题, 因为变换中心(`transform-origin`)这个 `CSS` 属性默认为 `center center`
    - 📕为了实现 `loading`, 每个白点的消失出现再消失的时常为 `2s`, 一共 `20` 个白点, 所以 i 越大的白点出现也越靠后, 对应的动画延时也就越大. `20 * 0.1` 秒刚好是 `2s`, 视觉上看起来像是转了一圈.
    - ```css
      .loading > span::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        animation: breath 2s linear infinite;
        animation-delay: calc(var(--i) * 0.1s);
      }

      @keyframes breath {
        0% {
          transform: scale(0);
        }
        10% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(0);
        }
      }
5. `css` 完整代码
```css
body {
  padding: 0;
  margin: 0;
  background-color: salmon;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 150px;
  height: 150px;
  position: relative;
}

.loading>span {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(calc(var(--i) * 18deg));
}

.loading > span::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  animation: breath 2s linear infinite;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes breath {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}
```