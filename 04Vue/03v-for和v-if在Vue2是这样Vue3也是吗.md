# `v-for` 和 `v-if` 在 `Vue2` 和 `Vue3` 的不同

## 在 `Vue2`
其实在 `Vue` 中关于 `v-for` 和 `v-if` 的讨论网上已经很多了, 不过结论都是 `Vue2` 的. 先说结论的话就是📕`v-for` 的优先级比 `v-if` 高, 但是不建议两者放在一起使用📕. 先看代码
```html
<ul>
  <li v-for="(item) in fruits" :key="item.id" v-if="item.mature">{{item.name}}</li>
</ul>
```
```js
export default {
  data() {
    return {
      fruits: [
        {
          id: "001",
          name: "apple",
          mature: true
        },
        {
          id: "002",
          name: "banana",
          mature: false
        },
        {
          id: "003",
          name: "grape",
          mature: true
        }
      ]
    };
  }
};
```

其实在写代码时 `ESLint` 就会提示 `v-for` 和 `v-if` 不要一起使用. 反而建议我们通过计算属性来过滤掉 `v-if` 为假的那些值.
![](../../image/Snipaste_2022-07-08_14-19-24.png)
如果一意孤行也不会报错, 不过页面最终展示如下, 也就是 `v-for` 优先级高于 `v-if` 三条都渲染了, 但是第二个因为不满足 `v-if` 而不存在.
![](../../image/Snipaste_2022-07-08_14-24-15.png)
⚡顺带说一嘴, 如果用 `v-show` 是一样的, 不过这时 `ESLint` 没有红线提示.
![](../../image/Snipaste_2022-07-08_14-26-06.png)

## 在 `Vue3`
然而, 在 `Vue3` 中 `v-for` 和 `v-if` 发生了变化. 😱直接报错无法从 `undefined` 上读取 `mature` 属性.
![](../../image/Snipaste_2022-07-08_14-28-11.png)
我猜大概率是因为 `v-if` 的优先级高于 `v-for`, 然后 item 并没有定义所以为 `undefined`, 导致的报错, 于是修改了一下代码, 直接让 `v-if` 为真
```html
<ul>
  <li v-for="(item) in fruits" :key="item.id" v-if="true">{{item.name}}</li>
</ul>
```
列表出现了, 猜想成立! [👉官网介绍在这里(英文)👈](https://vuejs.org/guide/essentials/list.html#v-for-with-v-if)
![](../../image/Snipaste_2022-07-08_14-33-25.png)

谢谢你看到这里, 祝你面试顺利🦆