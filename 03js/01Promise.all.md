## `Promise.all()`

来看这个的应该都在面试吧~~~😏

`Promise.all()` 接收一组可迭代的 `Promise` 作为输入, 返回一个新的 `Promise` 对象 p. 

返回值
- `已经变为状态 fulfilled`: 如果参数为空的可迭代集合.
- `异步变为 fulfilled`: 参数中所有的 `Promise` 都变为 `fulfilled` 状态时, `p` 也变为 `fulfilled` 并且其值为参数所有 `Promise` `fulfilled` 的值组成的数组, 数组的顺序是 `Promise` 传递的顺序而不是完成的顺序. 即便参数不为空也没有 `pending` 状态的 `Promise`, 返回值 `p` 仍然是异步变为 `fulfilled` 状态.
- `异步变为 rejected`: 如果参数中的任何 `Promise` 变为 `rejected` 状态并且其 `reject` 原因就是 `p` 的 `reject` 原因.

```js
// 第一种返回值情况
let p = Promise.all([])
console.log('p',p) // p Promise {<fulfilled>: Array(0)}

// 第二种返回值情况
const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('😀');
  }, 1000);
});
const p2 = Promise.resolve(2);
const p3 = 1;
let p = Promise.all([p1, p2, p3])
console.log('p',p) // p Promise {<pending>}
setTimeout(() => {
  console.log('p',p) // p Promise {<fulfilled>: Array(3)}
}, 2000)

// 第三种返回值情况
let p = Promise.all([
  1,
  Promise.reject(new Error('i broke up with ...')),
  Promise.reject(new SyntaxError('unexpected token <'))
])
console.log('p',p) // p Promise {<pending>}
setTimeout(() => {
  console.log('p',p) // p Promise {<rejected>: Error: i broke up with ...
}, 2000)
```
`Promise.all()` 是 `Promise` 并发方法之一. 当要依赖有很多互相关联的异步任务完成时这个方法很有用, 因为如果这些任务没完成我们不希望代码继续执行.

不过一旦输入的任何 `Promise` 对象变成 `rejected` 或者输入的参数非可迭代对象(比如 `null` 或者 `number` 类型),那么返回的 `Promise` 立即 `reject`, 并且 `reject` 回调的结果是第一个 `reject` 的信息或者报错信息. 而 `Promise.allSettled()` 等待参数中所有的 `Promise` 完成, 不论状态是 `fulfilled` 还是 `rejected`.

### 短路行为
如果参数中任何一个 `Promise` 变为 `rejected`, 那么 `Promise.all()` 会立刻变为 `rejected`.
```js
let p1 = new Promise((_, reject) => {
  setTimeout(reject, 1000, '1')
})
let p2 = new Promise((_, reject) => {
  setTimeout(reject, 2000, '2')
})
let p3 = new Promise((_, reject) => {
  setTimeout(reject, 3000, '3')
})
let startTime = new Date().getTime()
Promise.all([p1, p2, p3]).catch(err => {
  let endTime = new Date().getTime()
  console.log('time span ', (endTime - startTime) / 1000)
  console.log('err',err)
})
```
![](../image/Snipaste_2023-01-07_17-14-15.png)

当然可以改变这个结果, 参数中给每个 `Promise` 添加异常处理. 因为 `catch()` 只要返回的不是 `rejected` 的 `Promise` 或者没有抛出异常, 都会返回 `fulfilled` 的 `Promise`.
```js
let p1 = new Promise((_, reject) => {
  setTimeout(reject, 1000, '1')
})
let p2 = new Promise((_, reject) => {
  setTimeout(reject, 2000, '2')
})
let p3 = new Promise((_, reject) => {
  setTimeout(reject, 3000, '3')
})
Promise.all([
  p1.catch(error => error),
  p2.catch(error => error),
  p3.catch(error => error)
]).then(value => {
  console.log('value',value) // value (3) ['1', '2', '3']
})
```

### 手写 `Promise.all`
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