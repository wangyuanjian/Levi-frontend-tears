## `Leetcode`

## 数据结构
### 链表
1. 删除链表的某个节点, 返回链表头节点
    - [👉剑指 Offer 18. 删除链表的节点👈](https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/)
      - 💡思路: 要创建两个引用, `cur` 和 `prev`. `cur` 负责找到要删除的节点, `prev` 负责节点被删除后链表重新连接起来
      - ![](../../../image/linkedlist-delete-single.png)
2. 链表中倒数第 k 个节点
    - [👉剑指 Offer 22. 链表中倒数第k个节点👈](https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)
      - 💡思路: **`快 慢 指 针`**
      - 先让快指针走k步, 然后两个指针同步走, 当快指针走到头时, 慢指针就是链表倒数第 `k` 个节点.
3. 反转链表
    - [👉剑指 Offer 24. 反转链表👈](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/)
      - 💡思路: `三个指针`
      - ![](../../../image/reverse-linked-list.png)
      - 看评论里面有两个指针的 java 版的方法
4. 合并有序列表
    - [👉剑指 Offer 25. 合并两个排序的链表👈](https://leetcode.cn/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)
      - 💡思路: 看官方题解
### 二叉树
1. 翻转二叉树
    - [👉剑指 Offer 27. 二叉树的镜像👈](https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/)
      - 💡思路: 肯定是递归
        - 首先判断结束递归条件. 空节点或者叶子节点
        - 其次, 交换节点的左右子树
        - 深度递归左子树
        - 深度递归右子树
2. 从上到下打印二叉树
    - [👉剑指 Offer 32 - II. 从上到下打印二叉树 II👈]https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)
      - 💡思路: `BFS(广度优先遍历)`
        - 重点在于分层. 就是两个循环.
## 算法
### `Boyer-Moore` 摩尔投票算法
1. 算法的大致思路
    - 维护一个众数候选结果 `result`(初始值任意) 和其出现的次数 `times`(初始值为`0`)
    - 遍历数字的所有数字, 对于每个数字. 如果 `times` 为 `0`, 将其赋值给 `result`;
    - 随后判断
      - 如果数字与 `result` 相同, `times++`;
      - 反之, `times--`;
2. 找出项目中出现次数超过一半的数字
    - [👉剑指 Offer 39. 数组中出现次数超过一半的数字👈](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)

[👉👈]()
[👉👈]()
[👉👈]()
[👉👈]()
[👉👈]()
[👉👈]()
[👉👈]()
![](../../../image/)
![](../../../image/)
![](../../../image/)