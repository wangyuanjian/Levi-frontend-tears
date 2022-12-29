## Promise 之基础
这里强烈推荐 [B站技术蛋老师](https://www.bilibili.com/video/BV1QV411a7Hu) 关于 `Promise` 的介绍, 很好懂哦.

`Promise` 的出现, 解决了回调地狱的问题, 让异步代码写起来更加优雅.

### Promise 构造函数
`Promise` 是一个表示异步操作最终完成或失败的对象. 但是当创建异步操作时, 并不能立刻知道操作是完成还是失败. `Promise` 允许我们在操作有结果时, 对成功的结果或失败的原因添加对应的处理函数.

`Promise` 内部有如下几个状态. 当然这些状态是内部属性, 不能直接访问.
- `pending`: 初始状态
- `fulfilled`: 异步操作成功结束
- `rejected`: 异步操作失败

#### 参数 executor
`Promise` 这个构造函数本身接收一个函数作为参数, 暂且给这个函数起名 `executor`. 📖注意, `Promise` 仅支持通过 `new` 调用, 非 `new` 调用会抛出 `TypeError`

![](../image/Snipaste_2022-12-28_20-07-18.png)

参数 `executor` 是一个函数, 会在构造 `Promise` 对象时调用, `executor` 中的逻辑可以包含我们上面说的异步操作. `executor` 接收两个函数(`resolve` 和 `reject`)作为参数并且 `executor` 的返回值会被忽略, 并不代表 return 语句没有作用哦😯

```js
let p = new Promise((resolve, reject) => {
  // ....
  return 1; // 被忽略
})
```
如果在 `executor` 中有错误抛出, 那么 `Promise` 的状态会立刻变为 `rejected`.
```js
let p = new Promise((resolve, reject) => {
  throw new TypeError('Oops')
})
```
![](../image/Snipaste_2022-12-28_20-27-55.png)

`resolve` 和 `reject` 是两个函数, 你可以给他们起任何名字, 在调用他们时也很简单, 他们只接收一个参数, 这个参数可以是任意类型. `resolve` 和 `reject` 分别在异步操作成功时和失败时调用. 如果调用 `resolve` 和 `reject` 时不传参数, 那么就相当于传了 `undefined`.

调用 `resolve` 可传入另一个 `Promise` 对象 `p1`, 此时 `new Promise` 返回的 `p` 的状态不会因为 `resolve` 的调用而变成 `fulfilled`, 而是会跟随 `resolve` 的参数 `p1` 的状态变换.

另一个函数 `reject` 的语义类似抛出异常, 调用 `reject` 可以类似 `reject(new TypeError(...))`.

`executor` 的完成状态对 `promise` 的状态有影响, 但影响有限
- 首先, `executor` 的返回值被忽略. `executor` 内部的 `return` 仅仅影响函数执行的流程而不会对 `promise` 的完成状态有任何影响. 如果 `executor` 在 `resolve` 或 `reject` 之前调用, 那么 `promise` 将永远停留在 `pending` 状态.
  - ```js
    let p = new Promise((resolve, reject) => {
      return 1
      resolve(2)
    })
    p.then(res => console.log('res is ', res)) // 无输出
    .catch(err => console.log('err is ', err)) // 无输出
    console.log('p',p) // p Promise {<pending>}
- 如果 `executor` 中抛出异常, `promise` 的状态就会变为 `rejected`, 除非 `resolve` 或 `reject` 已经被调用. 也就是说, 如果在 `resolve` 或 `reject` 调用之后代码抛出了异常, 那么异常会被忽略.

📖即便存在 `pending` 的 `promise` 也不会阻止程序不退出. 如果事件循环(`event loop`)为空, 那么即便有 `pending` 状态的 `promise` 程序也会退出.

#### 返回值
当通过 `new` 调用后, `Promise` 这个构造函数返回一个 `Promise` 对象 `p`. 无论 `executor` 的两个参数 `resolve` 和 `reject` 哪一个被调用, `p` 的状态都会变成 *resolved*, 但是, 如果调用 `resolve` 或 `reject` 时传入了另一个 `Promise` 作为参数, 那么我们只能说 `p` 是 *`resolved`* 而尚未 *`settled`*. 

当 `Promise` 的状态从 `pending` 变成 `fulfilled` 或 `rejected` 时, `then` 方法中对应的关联处理函数就会被调用. 无论是 `fulfilled` 还是 `rejected`, 我们都可以称 `Promise` 最终 `settled`. 

下图是来自 `MDN` 的官网的图片, 侵删
![](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

所以我们可以画出这几个状态之间的关系
![](../image/Snipaste_2022-12-29_21-20-09.png)

如果是 `Promise` 先变为 `fulfilled` 再添加对应的处理函数, 那么这个函数也会被调用, 因此就没有所谓的竞争条件.
```js
let p = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
p.then((res) => { console.log('pretty fast ', res) })
setTimeout(() => {
  p.then((res) => { console.log('after 10 seconds ', res) })
}, 10 * 1000)
```
![](../image/Snipaste_2022-12-29_11-02-23.png)

#### 总结流程
- 调用构造函数生成新的 `Promise` 对象 `p`, 调用时同样产生一对函数 `resolve` 和 `reject`
- `executor` 中通常有异步操作, 该异步操作往往提供了回调式的 `API`(即在异步操作完成时会调用回调函数). 回调函数在 `executor` 中定义, 因此它可以访问 `resolve` 和 `reject`
- `executor` 的调用是同步的, 即在调用 `Promise` 构造函数时 `executor` 就执行了, 并且带有 `resolve` 和 `reject` 作为参数.
- `executor` 内部可以执行一些代码(异步操作), 最终异步操作的完成通过调用 `resolve` 和 `reject` 产生的副作用来与 `p` 沟通. 副作用就是 `p` 变成了 `resolved` 状态
  - 如果先调用 `resolve`, `p` 的状态可能仍然是 `pending`(`resolve` 的参数是一个 `thenable` 对象) 也可能变成 `fulfilled` (`resolve` 的参数不是 `thenable` 对象) 也可能变成 `rejected` (`resolve` 的参数是一个无效的解析值)
  - 如果先调用 `reject`, `p` 立刻变为 `rejected` 状态
  - 一旦调用 `resolve` 或 `reject`, `p` 就变成 `resolved` 状态. `resolve` 和 `reject` 先调用谁, 谁才会影响 `p` 的最终状态, 后续的调用既不能覆盖之前的调用(比如先调用了 `resolve` 又调用了 `resolve`), 也不能改变 `p` 的最终状态(比如先调用 `resolve` 又调用 `reject`, 不能将 `p` 从 `fulfilled` 变为 `rejected`)
    - ```js
      let p = new Promise((resolve, reject) => {
        resolve(1)
        resolve(2)
      })
      p.then(res => { console.log('---', res) }) // --- 1
  - 如果 `executor` 因为内部抛出异常而接触, 那么 `p` 变成 `rejected` 状态. 但是如果已经调用了 `resolve` 或者 `reject`, 那么抛出的异常就会被忽略.
    - ```js
      let p = new Promise((resolve, reject) => {
        resolve(1)
        console.log('111')
        throw new TypeError('Oooooooooops')
        console.log('222 ')
      })
      p.then(res => { console.log('---', res) })
    - ![](../image/Snipaste_2022-12-29_21-00-48.png)
  - 调用 `resolve` 或 `reject` 并不会让 `promise` 立刻变成 `settled` 状态(`fulfilled` 或 `rejected`), 因为如果调用 `resolve` 时传入的是另一个 `thenable` 对象, 那么 `promise` 的最终状态还是会匹配 `thenable` 的最终状态.
- 一旦 `promise` 变为 `settled`, 那么它就会调用那些由 `then()`, `catch()` 或 `finally()` 注册的处理函数. 并且 `promise` `resolve` 的参数或 `reject` 的参数都会成为这些注册的处理函数的输入.

#### 啥是 thenable

```js
```

![](../image/)

谢谢你看到这里😊
