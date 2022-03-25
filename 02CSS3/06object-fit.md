# `object-fit`
> 指定可替换元素(如`<img>`)的内容如何适应其所在容器
## 语法
1. `object-fit` 可以是下面几个关键字之一. 下文将`可替换元素` 称为 `对象(object)`
### 关键字
1. `contain`
    - 可替换元素的内容将被缩放, 在填充元素 `content box` 时保持元素的宽高比. 整个
    - ```html
      <div class="container">
        <img 
          class="box contain" 
          src="../../float/star.png" 
          alt=""
        >
        <img 
          class="box contain" 
          src="../../float/coffee-part.png" 
          alt=""
        >
      </div>
    - ```css
      .box {
        width: 150px;
        height: 150px;
        padding: 20px;
        outline: 1px solid black;
      }
      .contain {
        object-fit: contain;
      }
    - ![](../../image/Snipaste_2022-03-25_17-29-49.png)

7. 可以通过使用 `object-position` 属性来切换被替换元素的内容对象在元素框内的对齐方式
## 其他
1. 📕`IE` 浏览器不支持此属性😟

- ```html
- ```css
- ![](../../image/)