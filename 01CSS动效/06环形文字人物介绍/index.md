## 环形文字人物介绍
### HTML
```HTML
<body>
  <div class="info">
    <img class="info-avatar" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-2f08406908e855f14ca14b0149505bef_r.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656419577&t=f9209b4ea663d012282662ba3f9404be" alt="">
    <span style="--i: 1">T</span> 
    <span style="--i: 2">O</span> 
    <span style="--i: 3">M</span> 
    <span style="--i: 4">&</span> 
    <span style="--i: 5">J</span> 
    <span style="--i: 6">E</span> 
    <span style="--i: 7">R</span> 
    <span style="--i: 8">R</span> 
    <span style="--i: 9">Y</span> 
  </div>
</body>
```
### CSS
1. 初始化全局样式, 设置背景色, 并设置子元素水平垂直居中
```css
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #34495e;
  display: flex;
  justify-content: center;
  align-items: center;
}
```
2. 设置卡片容器样式
```css
.info {
  height: 400px;
  width: 400px;
  border: 1px solid #eee;
  position: relative;
  border-radius: 50%;
}
```
3. 设置卡片图片垂直水平居中
```css
.info .info-avatar {
  position: absolute;
  height: 80%;
  width: 80%;
  object-fit: cover;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
```    
4. 设置周围人物介绍
    - 📕关键思路在于: 将每个字所在的 `span` 设置 `absolute` 布局, 并以 `left center` 为中心转动相对应的角度
    - ```css
      .info span {
        position: absolute;
        height: 100%;
        left: 50%;
        top: 0;
        font-size: 2rem;
        color: #eee;
        transform-origin: left;
        transform: rotate(calc(var(--i) * 40deg));
      }
    - 一共 `9` 个字, 平分 `360`度, 故每个字依此转动 `40deg`
    - 📕`transform-origin` 必须为 `left`, 如果只写一个属性值 `left`, 另一个默认为 `auto`. 因为每个字母的宽度不一样, 如果省略了 `transform-origin` 变换中心变成 `center center`, 就会造成文字不在一个圈上, 如下图
    - ![](../../../image/Snipaste_2022-05-30_22-29-29.png)
    - 📕另外值得注意的地方是, `span` 的位置是 `left: 50%`, 此时转动形成的⚪的半径是 `info` 的边长, 但如果 `left: 0;` 而且 `transform-origin` 为默认值的话, 形成的⚪的半径就是 `info` 的边长的`根号 2`.