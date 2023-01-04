## Promise 其他 API
### Promise.resolve
这个静态方法将「解析(resolve)」参数并返回 `Promise`. 
```js
let p = Promise.resolve(1)
let tempP = new Promise(resolve => resolve(2))
let p2 = Promise.resolve(new Promise(resolve => setTimeout(resolve)))
let p3 = Promise.resolve({
  then(resolve) {
    resolve(3)
  }
})
console.log('p',p) // p Promise {<fulfilled>: 1}
console.log('p1',p1) // p1 Promise {<fulfilled>: 2}
console.log('p1 === tempP',p1 === tempP) // true
console.log('p2',p2) // p2 Promise {<pending>}
console.log('p3',p3) // p3 Promise {<pending>}
```
- 如果参数是 `Promise`, 那么直接返回参数; 
- 如果参数是 `Thenable` 对象, 就会调用对象的 `then(resolve, reject)` 方法; 
- 其他情况就会返回状态为 **`fulfilled`** 的 `Promise` 并且值为参数.

📖 `Promise.resolve()` 「解析」一个 `promise`, 解析不等同于将 `promise` 变为 `fulfilled` 或 `rejected` 状态. 简而言之, `Promise.resolve()` 返回一个 `Promise` `p`, `p` 最终的状态取决于另一个 `promise`(参数), `thenable` 对象或其他类型的参数.

`Promise.resolve()` 的特例是参数为 `Promise`. 如果参数 `value` 属于 `Promise` 或者是 `Promise` 的子类, 并且 `value.constructor === Promise` 那么 `Promise.resolve()` 就会直接返回而不是创建新的 `Promise`, 就像上面示例代码中的 `p1`. 

否则, `Promise.resolve()` 本质上就是 `new Promise(resolve => resolve(value))` 的简写形式.

来看否则的情况, 如果传递了一个 `thenable` 对象, 就会调用 `then` 方法并且 `Promise.resolve()` 的返回值 `p` 将会采用 `thenable` 的状态. 如果 `then` 方法的第一个参数 `resolve` 接收另一个 `thenable` 对象, 那么这个 `thenable` 对象会再次被解析, 所以 `p` 的最终完成值绝不会是 `thenable`. 
```js
let thenable1 = {
  then(resolve) {
    resolve(1)
  }
}

let p = Promise.resolve({
  then(resolve) {
    resolve(thenable1)
  }
})
console.log('p',p) /*
Promise {<pending>}
  [[Prototype]]: Promise
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: 1
*/
```
上面的代码就是很好的示范, `Promise.resolve()` 的参数是 `thenable` 对象 `t`, `t` 的 `then` 方法的参数 `resolve` 又接收了另一个 `thenable` 对象.

🚔但是不要在

### Promise.reject
### Promise.race
### Promise.any
### Promise.all
### Promise.allSettled
```js
```

![](../image/)
谢谢你看到这里😊

