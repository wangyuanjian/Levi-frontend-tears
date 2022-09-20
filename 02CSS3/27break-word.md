## break-word
> 指定如何在单词内断行

主要有以下属性值
- `normal`: 使用默认的断行规则. 对于 `CJK(Chinese Japanese Korean, 中文日文韩文)`可在任意字符后断行, 但是对于英文, 只在单词之间的空格、回车、连字符等地方断行.
- `break-all`: 非 `CJK` 文字, 可以在单词任意字符后断行. `CJK` 文字与 `normal` 相同
- `keep-all`: `CJK` 文字字符后不断行. 非 `CJK` 文字与 `normal` 相同.
- `break-word`: 与 `word-break`: `normal` 和 `overflow-wrap: anywhere` 共同作用效果相同, 而不论 `overflow-wrap` 的值是什么. 📕这个属性已经弃用.

其实上面总结一下就是, `break-all` 把英文看作中文(`CJK`), `keep-all` 把中文(`CJK`)看作英文

```css
.box {
  border: 3px solid salmon;
  width: 150px;
}
.box1 { word-break: normal; }
.box2 { word-break: break-all; }
.box3 { word-break: keep-all; }
.box4 { word-break: break-word; }
```
```html
<div class="box box1">
  This is a ”longlonghistoryPleaseCareful
</div>
<div class="box box2">
  This is a ”longlonghistoryPleaseCareful
</div>
<div class="box box3">
  This is a ”longlonghistoryPleaseCareful
</div>
<div class="box box4">
  This is a ”longlonghistoryPleaseCareful
</div>
<div class="box box1">
  你好，我是Levi，欢迎你来到这个美丽的城市
</div>
<div class="box box2">
  你好，我是Levi，欢迎你来到这个美丽的城市
</div>
<div class="box box3">
  你好，我是Levi，欢迎你来到这个美丽的城市
</div>
<div class="box box4">
  你好，我是Levi，欢迎你来到这个美丽的城市
</div>
```
![](../../image/Snipaste_2022-09-20_22-06-03.png)



```css
```
```html
```
![](../../image/)