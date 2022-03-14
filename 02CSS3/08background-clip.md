# `background-clip`
> 设置元素的背景(背景图片或背景颜色)是否延伸至 `border-box` 下, `padding-box` 下, 或者 `content-box` 下
## 语法
1. 如果元素没有 `background-image` 或 `background-color`, 那么这个属性只有在边框有透明部分或者部分透明区域(比如`border-style` 为 `dashed`)才能看到效果, 否则边框将会覆盖 `background-clip` 产生的样式.
2. `关键词属性`
    - `border-box`: `默认值`. 背景延申至 `border` 的外沿, 但是在 `z` 方向上仍在 `border` 下层.
    - `padding-box`: 背景延申至 `padding` 的外沿, 不会绘制在边框下面.
    - `content-box`: 背景被裁剪至 `content` 内容区
    - `text`: 背景被裁减成文字的形状
3. 在 `iOS 14` 版本才部分支持 `background-clip` 属性, 所以要加上 `-webkit-background-clip`
## 规则
1. 📕因为`root element`(即`<html>`)