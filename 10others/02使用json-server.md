## json-server
> 使用 (json-server)[https://github.com/typicode/json-server] 可以得到 REST API 的模拟数据

### 安装
全局安装
```
npm install -g json-server
```
创建一个带有数据的 `JSON` 文件, 比如 `db.json`
```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```
启动 `JSON` 服务器
```
json-server --watch db.json --port 8000
```
![](../../image/Snipaste_2022-09-17_15-57-07.png)
### 尝试访问
`GET` 请求

[http://localhost:8000/posts](http://localhost:8000/posts)

[http://localhost:8000/posts/1](http://localhost:8000/posts/1)

![](../../image/Snipaste_2022-09-17_15-59-34.png)

`POST` 请求

不用担心跨域!!!爽飞
```js
axios.post('http://localhost:8000/posts', {
  id: 2,
  title: 'peiqi',
  author: 'Levi'
}).then(res => {
  console.log('res',res)
})
```
请求成功之后, `JSON` 文件中就会自动多出内容
![](../../image/Snipaste_2022-09-17_16-15-59.png)


`PATCH` 请求: 局部更新. 和 `PUT` 不一样的事, `PATCH` 是局部更新, 即请求传了那些字段就会更新那些字段的值, **如果没传就不更新**
```js
axios.patch('http://localhost:8000/posts/2', {
  title: 'george',
}).then(res => {
  console.log('res',res)
})
```
![](../../image/Snipaste_2022-09-17_16-24-38.png)


`PUT` 请求: 全更新. 和 `PATCH` 一样, 请求中传了哪些字段就更新那些字段, **没传的就被认为不再需要而删除**
```js
axios.put('http://localhost:8000/posts/2', {
  title: 'george',
}).then(res => {
  console.log('res',res)
})
```
![](../../image/Snipaste_2022-09-17_16-25-15.png)

谢谢你看到这里😊