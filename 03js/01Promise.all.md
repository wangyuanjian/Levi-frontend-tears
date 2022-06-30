# `Promise.all()`

来看这个的应该都在面试吧~~~😏

`Promise.all()` 接收一组可迭代的 `Promise` 作为输入, 返回一个新的 `Promise` 对象, 其 `resolve` 回调的结果是输入的所有 `Promise` 的结果组成的数组.

如果输入的参数为空的可迭代对象, 或者所有输入的 `Promise` 都变成已完成状态, 那么返回的 `Promise` 也会变成已完成状态.
```js
const promise1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('😀');
  }, 1000);
});
const promise2 = Promise.resolve(2);
const promise3 = 1;


Promise.all([promise1, promise2, promise3])
.then((result) => {
  console.log('result is', result);
});

// 空的可迭代对象
Promise.all(new Set())
.then(result => {
  console.log('new Set() result is', result);
});
```
![](../../image/Snipaste_2022-06-30_21-12-15.png)

📕虽然 `promise1` 最后才变成已完成状态, 但是在返回的结果中, 它仍然是第一个. 返回结果中的位置和其完成先后没关系, 和其在传入 `all()` 的位置有关系

不过一旦输入的任何 `Promise` 对象变成 `rejected` 或者输入的参数非可迭代对象(比如 `null` 或者 `number` 类型),那么返回的 `Promise` 立即 `reject`, 并且 `reject` 回调的结果是第一个 `reject` 的信息或者报错信息.

```js
const promise4 = new Promise(resolve => {
  setTimeout(() => {
    resolve(100);
  }, 10000);
})
const promise5 = Promise.reject(200);

Promise.all([promise4, promise5])
.then(result => {
  console.log('我不会执行的');
})
.catch(err => {
  console.log('糟糕, ', err)
})
```
![](../../image/Snipaste_2022-06-30_21-14-07.png)

## 输入
`Promise.all()` 接收的是可迭代对象, 而不仅仅是数组, 数组虽然是可迭代对象, 但是 `set`, `string` 等都属于可迭代对象. 因此 `Promise.all('asd')` 会输出什么呢? 
![](../../image/Snipaste_2022-06-30_21-15-40.png)

哈哈😄, 这是因为 `asd` 字符串类型可迭代的. 如果我们组成可迭代对象的数据(`a`, `s`, `d`)不是 `Promise` 对象, 就会被 `resolve` 变成已完成状态.

## 手写 `Promise.all`
面试中问到最多的就是被手写 `Promise.all` 实现
  - 首先: 判断传入的参数是否为可迭代对象, 关于可迭代对象判断, [👉请看MDN这里👈](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols);
  - 其次, 如果是可迭代对象, 判断是否为空, `string` 和 `数组` 通过 `length` 属性判断, `Set` 和 `Map` 通过 `size` 属性判断;
  - 创建两个变量, 分别使用 `resolvedPromiseCount` 和 `resolvedPromiseResult` 用来记录已经完成的 `Promise` 对象的数量和结果;
  - 使用 `Promise.resolve()` 处理可迭代对象中每个值, 如果这个值刚好是 `Promise` 对象, `resolve` 就会原封不动地将这个对象返回; 如果这个值非 `Promise` 对象, 就会创建一个 `resolve` 这个值的 `Promise` 对象.
    - 在 `catch` 方法中直接 `reject`;
    - 在 `then` 方法中增加 `resolvedPromiseCount` 的值并将已完成的 `Promise` 对象的结果保存在数组 `resolvedPromiseResult` 的对应位置. 如果 `resolvedPromiseCount` 刚好等于 `length` 调用 `resolve` 返回.
    - ![](../../image/Snipaste_2022-06-30_21-17-49.png)
```js
Promise.myAll = function (iterable) {
  return new Promise((resolve, reject) => {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      reject(new Error('参数必须是可迭代类型对象'));
    }
    let length = iterable.length || iterable.size;
    if (length === 0) {
      resolve([]);
    }
    let resolvedPromiseCount = 0;
    let resolvedPromiseResult = [...' '.repeat(iterable.length)]
    let i = 0;
    for (let item of iterable) {
      Promise.resolve(item)
      .then(result => {
        resolvedPromiseCount++;
        resolvedPromiseResult[i++] = result;
        if (resolvedPromiseCount === length) {
          resolve(resolvedPromiseResult);
        }
      })
      .catch(err => {
        reject(err);
      });
    }
  })
}
```
![](../../image/Snipaste_2022-06-30_21-29-46.png)

谢谢你看到这里, 祝福你面试顺利😀