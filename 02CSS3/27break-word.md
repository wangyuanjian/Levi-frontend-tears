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


再一次强调的是 `word-break: break-all`, 和 `overflow-wrap: break-word` 的区别
- `word-break: break-all` 会在文本溢出显示的地方精确换行, 即便文本如果在新的一行显示可能就不会溢出了
- `overflow-wrap: break-word` 不论文本在新的一行显示会不会溢出, 都将这个要换行的文本在新的一行显示

```html
<div class="box" style="word-break: break-all;">
  你好，我是Levi，欢迎你来到这个城市哈哈。感谢，感谢，我想希望自己可以在这里有一番作为加油加油。
</div>
<div class="box" style="overflow-wrap: break-word;">
  你好，我是Levi，欢迎你来到这个城市哈哈。感谢，感谢，我想希望自己可以在这里有一番作为加油加油。
</div>
<div class="box" style="word-break: break-all;">
  hello, Jay, HowAreYouFeeling, long no see, HowIsYourFatherAndYouDearMother
</div>
<div class="box" style="overflow-wrap: break-word;">
  hello, Jay, HowAreYouFeeling, long no see, HowIsYourFatherAndYouDearMother
</div>
```
![](../../image/Snipaste_2022-09-21_08-52-30.png)
从图片中可以看出, 两个属性对中文没有影响, 表现一致. 只有英文时, 首先 `HowAreYouFeeling` 如果在新的一行显示完全不用换行, 但是 `break-word: break-all;` 还是在原行显示. 其次, `HowIsYourFatherAndYouDearMother` 就算放在新的一行显示还是会断行, 但是 `overflow-wrap: break-word;` 还是将其放在新的一行.


最后再来看看 `word-break: break-word;` 这个已被弃用的属性吧. 前面说过这个属性的效果与 `word-break`: `normal` 和 `overflow-wrap: anywhere` 共同作用效果相同, 而不论 `overflow-wrap` 的值是什么. 有趣的在后半句, 因为 `overflow-wrap: anywhere` 和 `overflow-wrap: break-word` 的区别在计算 `min-content` 时不一样

```css
.boxb {
  border: 3px solid salmon;
  width: min-content;
}
.box5 {
  word-break: break-word;
  /* 
  与下面的两者效果之和相同
  word-break: normal; 
  overflow-wrap: anywhere;
  */
}
.box6 {
  word-break: normal;
  overflow-wrap: break-word;
}
```
```html
<div class="boxb box5">
  This, longhistoryPlease
</div>
<div class="boxb box6">
  This, longhistoryPlease
</div>
```
因为 `overflow-wrap: anywhere` 在计算时 `min-content` 时考虑到了软换行机会所以任何地方都可以换行, 而 `overflow-wrap: break-word` 在计算时 `min-content` 时不考虑软换行, 因此表现与预期相似
![](../../image/Snipaste_2022-09-21_21-02-53.png)

谢谢你看到这里😊