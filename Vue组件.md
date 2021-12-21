# Vue 组件
## 初见组件
1. 传统方式编写应用
    - ![](../image/Snipaste_2021-12-21_20-09-25.png)
    - 存在的问题:
      - 依赖关系混乱, 不好维护
      - 代码复用率不高
2. 使用组件编写应用
    - `组件`: 实现应用中`局部`功能`代码`和`资源`的`集合`
    - ![](../image/Snipaste_2021-12-21_20-19-14.png)
    - ![](../image/Snipaste_2021-12-21_20-20-56.png)
## 非单文件组件
> 非单文件组件: 一个文件中包含多个组件 \
单文件组件: 一个文件(`.vue`)只包含一个组件
### 创建组件
1. 拆分组件
    - 现在有一个业务, 我们需要将下面的代码拆成 `school` 和 `student` 两个组件
    - ```html
      <div id="root">
        <h2>学校名称: {{schoolName}}</h2>
        <h2>学校地址: {{address}}</h2>
        <hr>
        <h2>学生姓名: {{studentName}}</h2>
        <h2>学生年龄: {{18}}</h2>
      </div>
    - ```js
      new Vue({
        el: '#root',
        data: {
          schoolName: 'MIT',
          address: 'USA',
          studentName: 'John',
          age: 18
        },
      })
2. `Vue.extend()`
    - 使用基础 `Vue` 构造器, 创建一个“子类”. 参数是一个包含组件选项的对象. 
    - 一定不要🙅‍写 `el`配置项, 因为最终所有的组件都要被一个 `vm` 管理, 由 `vm` 决定组件服务于哪个容器
    - `data`: 必须是函数, 在函数中返回真正定义的数据
      - ```js
        data: function () {
          return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
          }
        }
      - 为什么❓
      - 如果写成对象形式, 当该组件在不同的地方被引用时, data 被共享, 导致一处修改, 其他地方都修改了. 如果写成函数并在其中返回, 那么即便组件在不同的地方被引用, 没处的数据并不共享
      - ![](../image/Snipaste_2021-12-21_20-47-26.png)