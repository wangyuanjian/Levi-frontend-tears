# 微信小程序开发
> 小程序提供了一个简单高效的应用开发框架和丰富的组件及  `API`, 帮助开发者在微信中开发具有原生 `APP` 体验的服务

<!-- TOC -->

- [微信小程序开发](#微信小程序开发)
  - [简介](#简介)
    - [注册与安装](#注册与安装)
    - [配置文件](#配置文件)
  - [小程序页面](#小程序页面)
  - [小程序的宿主环境(`host environment`)](#小程序的宿主环境host-environment)
  - [协同工作与发布](#协同工作与发布)
  - [组件](#组件)
    - [视图容器](#视图容器)
      - [`view`](#view)
      - [`scroll-view`](#scroll-view)
      - [`swiper` 和 `swiper-item`](#swiper-和-swiper-item)
    - [基础内容](#基础内容)
      - [`text`](#text)
      - [`rich-text`](#rich-text)
    - [表单组件](#表单组件)
      - [`button`](#button)
    - [媒体组件](#媒体组件)
      - [`image`](#image)
  - [模板与配置](#模板与配置)
    - [数据绑定](#数据绑定)
    - [事件绑定](#事件绑定)
    - [条件渲染](#条件渲染)
    - [列表渲染](#列表渲染)
    - [`WXSS`](#wxss)
  - [全局配置](#全局配置)
    - [全局配置](#全局配置-1)
      - [`tabBar`](#tabbar)
    - [页面配置](#页面配置)
  - [网络请求](#网络请求)
  - [页面导航](#页面导航)
    - [声明式导航](#声明式导航)
    - [编程式导航](#编程式导航)
  - [页面事件](#页面事件)
    - [下拉刷新](#下拉刷新)
    - [上拉触底](#上拉触底)
  - [编译模式](#编译模式)
  - [生命周期](#生命周期)
  - [`WXS`](#wxs)
    - [基础语法](#基础语法)
  - [组件](#组件-1)
    - [组件的引入](#组件的引入)
    - [组件的样式](#组件的样式)
    - [数据, 方法和属性](#数据-方法和属性)
    - [数据监听器](#数据监听器)
    - [纯数据字段](#纯数据字段)
    - [组件的生命周期](#组件的生命周期)
    - [插槽](#插槽)
    - [父子组件通信](#父子组件通信)
    - [`behaviors`](#behaviors)
  - [使用 `npm`](#使用-npm)
    - [`Vant Weapp`](#vant-weapp)
    - [`API` 的 `Promise` 化](#api-的-promise-化)
  - [全局数据共享](#全局数据共享)
  - [分包](#分包)
    - [基础概念](#基础概念)
    - [使用分包](#使用分包)
    - [独立分包](#独立分包)
    - [分包预下载](#分包预下载)
  - [`uni-app`](#uni-app)
    - [创建与简介](#创建与简介)
    - [`tabBar`](#tabbar-1)
    - [使用网络请求](#使用网络请求)
    - [小程序分包](#小程序分包)

<!-- /TOC -->

## 简介
1. 小程序与普通网页开发的区别
    - 运行环境不同
      - 网页运行在浏览器端
      - 小程序运行在微信环境
    - `API` 不同
      - 小程序无法调用 `DOM` 和 `BOM` 的 `API`. 只能调用微信环境提供的 `API`, 如地理定位, 扫码和支付等.
    - 开发模式不同
      - 小程序由有自己的标准开发模式
        - 申请小程序开发账号
        - 安装小程序开发者工具
        - 创建和配置小程序项目
2. 体验官方开发的小程序
    - 手机微信(`6.7.2`及以上版本)扫码
    - ![](../../image/Snipaste_2022-07-17_09-26-25.png)
### 注册与安装
1. 注册小程序开发者账号
    - 访问[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/), 点击右上角`立即注册`
      - ![](../../image/Snipaste_2022-07-17_09-39-35.png)
    - 选择注册账号类型为`小程序`
    - 点击右侧 `创建测试号，免注册快速体验小程序开发`. 手机扫码后注册成功, 返回登录页登录, 再次扫码选择刚才的测试账号登录, 即可看到 AppID 和 AppSecret
      - ![](../../image/Snipaste_2022-07-17_09-46-07.png)
2. 下载开发者工具
    - 访问 [https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 下载开发者工具, 选择稳定版.
    - 在安装过程中提示修改系统变量 Path 出错, 需要手动加一下
3. 创建小程序项目
    - ![](../../image/Snipaste_2022-07-17_10-05-51.png)
    - ![](../../image/Snipaste_2022-07-17_10-08-17.png)
4. 项目的基本结构
    - ![](../../image/Snipaste_2022-07-17_21-59-40.png)
    - `pages`: 用来存放所有小程序的页面
    - `utils`: 用来存放工具性质的模块， 比如格式化时间的自定义模块
    - `.eslintrc.js`: `ESLint` 的配置文件
    - `app.js`: 小程序的入口文件
    - `app.json`: 小程序的全局配置文件
    - `app.wxss`: 小程序的全局样式文件
    - `project.config.js`: 项目的配置文件
    - `project.private.config.js`: 也是项目的配置文件, 但是相同设置优先级高于 `project.config.js`, 可以在 `project.config.js` 配置`公共`的配置, 在该文件中配置`个人`的配置
    - `sitemap.json`: 配置小程序及其页面是否允许被微信索引.
5. 小程序页面的组成部分
    - 官方建议把所有小程序页面都存放在 `pages` 目录中, 以`单独的文件夹`存在
    - ![](../../image/Snipaste_2022-07-17_22-12-30.png)
    - `.js`: 页面的脚本文件 
    - `.json`: 页面的配置文件
    - `.wxml`: 页面的模板结构文件
    - `.wxss`: 当前页面的样式文件
### 配置文件
1. 小程序中一共有 `4` 中 `json` 配置文件, 分别是
    - 项目根目录的 `app.json`
    - 项目根目录的 `project.config.json`
    - 项目根目录的 `sitemap.json`
    - 每个页面文件夹中的 `.json` 配置文件
2. `app.json`
    - 是当前小程序的`全局配置`, 包括了小程序的所有页面路径, 窗口外观, 界面表现, 底部 `tab` 等.
    - 刚创建的项目的 `app.json` 内容如下(有删减)
      - ```json
        {
          "pages":[
            "pages/index/index",
          ],
          "window":{
            "navigationBarTextStyle":"black"
          },
          "style": "v2",
          "sitemapLocation": "sitemap.json"
        }
      - `pages`: 当前小程序所有页面的路径
      - `window`: 全局定义小程序所有页面的背景色, 文字颜色等
      - `style`: 全局定义小程序组件所使用的样式版本
      - `sitemapLocation`: 指明 `sitemap.json` 的位置
3. `project.config.json`
    - 其中存放的是项目配置文件, 用来记录开发时的配置, 例如
      - `setting`: 编译相关的配置. 并且该配置与`详情->本地设置`中的配置一样, 会同步修改
        - ![](../../image/Snipaste_2022-07-18_08-20-27.png)
      - `projectname`: 项目名称. 📕项目名称(比如`my_project_001`)不等于小程序最终的名字(比如`选课管理系统`)
      - `appid`: 小程序的 `id`.
4. `sitemap.json`
    - 微信已经开发了小程序内搜索, 该文件用来配置小程序页面是否允许微信索引
5. 页面中 `.json` 文件
    - 每一个小程序页面都可以使用 `.json` 文件对本页面的窗口外观配置, 页面中的配置项会覆盖 `app.json` 的 `window` 中相同的配置项.
    - ![](../../image/Snipaste_2022-07-18_09-33-00.png)
## 小程序页面
1. 新建小程序页面
    - 只需在 `app.json` 的 `pages` 配置项中新增页面存放路径, 小程序开发工具就会自动帮助我们创建对应的页面文件
    - ```json
      "pages":[
        "pages/index/index",
        "pages/logs/logs",
        "pages/home/home"
      ],
    - ![](../../image/Snipaste_2022-07-18_09-37-16.png)
2. 修改小程序项目首页
    - 只需修改 `app.json` 的 `pages` 数组中的文件顺序, 第一个文件即为小程序的首页
3. 什么是 `WXML`
    - `WXML(WeiXin Markup Language)` 是小程序框架设计的一套标签语言, 类似于网页开发中的 `HTML`
    - `WXML` 与 `HTML` 的区别
      - 标签名称不同
        - `HTML`: `div`, `span`, `img`, `a`
        - `WXML`: `view`, `text`, `image`, `navigator`
      - 属性节点不同
        - `<a href="#">超链接</>`
        - `<navigator url="/pages/home/home"></navigator>`
      - `WXML` 提供了类似于 `Vue` 的模板语法
        - 数据绑定, 列表渲染, 条件渲染
4. 什么是 `WXSS`
    - `WXSS(WeiXin Style Sheets)` 类似于网页开发中的 `CSS`
    - `WXSS` 与 `CSS` 的不同
      - 新增了 `rpx` 尺寸单位
        - `WXSS` 支持新的尺寸单位 `rpx`, 在不同大小的屏幕上小程序会自动进行换算.
      - 提供了全局的样式和局部样式
        - 项目根目录中的 `app.wxss` 会作用于所有小程序页面
        - 局部页面的 `.wxss` 进对当前页面生效
      - `WXSS` 仅支持部分 `CSS` 选择器
5. 小程序中的 `js` 文件
    - 小程序中的 `js` 文件分为三类
    - `app.js`: 小程序的入口文件, 通过调用 `App()` 函数启动整个小程序.
    - `页面的.js` 文件: 页面的入口文件, 通过调用 `Page()` 函数创建并运行页面
    - `普通的.js` 文件: 普通的功能模块文件, 用来封装公共的函数或属性.
## 小程序的宿主环境(`host environment`)
1. 宿主环境是指值程序运行必须的依赖环境. 例如 `Android` 系统和 `iOS` 系统是两个不同宿主环境.
2. 小程序的宿主环境 `->` 手机微信. 小程序借助宿主环境提供的能力, 可以完成许多网页无法完成的功能, 比如微信支付, 微信登录等.
3. 小程序宿主环境包含的内容
    - 通信模型
    - 运行机制
    - 组件
    - `API`
4. 通信模型
    - 通信的主体: `渲染层`和`逻辑层`
      - `WXML` 和 `WXSS` 工作在渲染层
      - `js` 工作在逻辑层
    - 通信模型
      - 渲染层和逻辑层之间的通信: 由微信客户端转发
      - 逻辑层和第三方服务器之间的通信: 由微信客户端转发
      - ![](../../image/) // TODO
6. 运行机制
    - 小程序的启动过程
      - 将小程序的代码下载到本地
      - 解析 `app.json` 全局配置文件
      - 执行 `app.js` 小程序入口文件, 创建小程序
      - 渲染小程序首页
      - 启动完成
    - 页面的渲染过程
      - 加载并解析页面的 `.json` 配置文件
      - 加载页面的 `WXML` 和 `WXSS` 文件
      - 执行页面的 `.js` 文件, 创建页面
      - 渲染完毕
7. 组件
    - 组件的分类. 组件也是宿主环境提供的. 小程序将组件分为了 `9` 大类
      - 视图容器
        - `view`
          - 普通视图区域, 类似 `HTML` 中的 `div`, 是一个块级容器
          - 常用来实现页面布局
        - `scroll-view`
          - 可滚动的视图区域
          - 常用来实现滚动列表效果
        - `swiper` 和 `swiper-item`
          - 轮播图的容器组件和轮播图的单项组件
      - 基础内容
      - 表单组件
      - 导航组件
      - 媒体组件
      - `map` 地图组件
      - `canvas` 画布组件
      - 开发能力
      - 无障碍访问
    - 
8. `API`
    - 事件监听 `API`
      - 以 `on` 开头, 用来监听某些事件的触发
      - 举例: `wx.onWindowResize()` 监听窗口尺寸的变化
    - 同步 `API`
      - 以 `Sync` 结尾. 通过 API 的执行结果可以通过函数返回值直接获取, 如果执行出错也会抛异常
      - 举例: `wx.setStorageSync(key, value)` 向本地存储写入内容
    - 异步 `API`
      - 需要通过 `success`, `fail`, `complete` 接收调用的结果
      - 举例: `wx.request()` 发起网络请求
## 协同工作与发布
1. 小程序的版本
    - |版本阶段|说明|
      |---|---|
      |开发版本|使用开发者工具, 可将代码上传到开发版本. 开发版本只保留没人最新的一份上传的代码. 点击提交审核, 可将代码提交审核. 开发版本可以删除, 不影响线上版本和审核中版本的代码.|
      |体验版本|可选择某个开发版本作为体验版|
      |审核中的版本|只能由一份代码处于审核中. 有审核结果后可以发布到线上, 也可以直接重新提交审核, 覆盖原审核版本.|
      |线上版本|线上所有用户使用的代码版本, 该版本代码在新版本代码发布后被覆盖更新.|
## 组件
### 视图容器
#### `view`
1. 普通视图区域, 类似 `HTML` 中的 `div`, 是一个块级容器
    - [官网文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
    - ```html
      <view>1</view>
      <view>2</view>
      <view>3</view>
    - ```css
      page {
        display: flex;
        justify-content: space-between;
      }
      page view {
        height: 100px;
        width: 100px;
        text-align: center;
        line-height: 100px;
      }
    - ![](../../image/Snipaste_2022-07-19_10-36-09.png)
#### `scroll-view`
1. 可滚动视图区域
    - 使用竖向滚动时, 需要给 `scroll-view` 一个固定高度, 通过 `WXSS` 设置 `height`. 如果横向滚动, 则不需要设置宽度.
    - ```html
      <!-- 竖向滚动 -->
      <scroll-view class="container2" scroll-y>
        <view class="view0 view2">1</view>
        <view class="view0 view2">2</view>
        <view class="view0 view2">3</view>
      </scroll-view>
      <!-- 横向滚动 -->
      <scroll-view class="container3" scroll-x>
        <view class="view0 view3">1</view>
        <view class="view0 view3">2</view>
        <view class="view0 view3">3</view>
      </scroll-view>
    - ```css
      .container2 {
        height: 100px;
      }
      .container2 .view2 {
        height: 100px;
        width: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 3rem;
        color: #fff;
        font-weight: bold;
      }
      /* -------------------- */
      .container3 {
        white-space: nowrap;
      }
      .container3 .view3 {
        display: inline-block;
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 3rem;
        color: #fff;
        font-weight: bold;
      }
    - 📕注意横向滚动时, 需要设置 `scroll-view` 的 `white-space` 值为 `nowrap`. 子项 `display` 为 `inline-block`.
    - ![](../../image/Snipaste_2022-07-19_14-05-41.png)
#### `swiper` 和 `swiper-item`
1. `swiper` 是滑块视图容器. 其中只可放置 `swiper-item` 组件, 否则会导致未定义的行为
    - ```html
      <swiper indicator-dots circular>
        <swiper-item>
          <view>111</view>
        </swiper-item>
        <swiper-item>
          <view>222</view>
        </swiper-item>
        <swiper-item>
          <view>333</view>
        </swiper-item>
      </swiper>
    - ```css
      swiper-item view {
        font-size: 3rem;
        color: #fff;
        font-weight: bold;
        height: 100%;
        text-align: center;
      }
      swiper-item:nth-child(1) view {
        background-color: #f1c40f;
      }
      swiper-item:nth-child(2) view {
        background-color: #2ecc71;
      }
      swiper-item:nth-child(3) view {
        background-color: #9b59b6;
      }
    - ![](../../image/Snipaste_2022-07-19_14-15-59.png)
### 基础内容
#### `text`
1. 文本
    - 除了文本节点以外的其他节点都无法长按选中. 文档中说 `selectable` 是已废弃的属性, 改用 `user-select`
    - ```html
      <text selectable>123</text>
      <text user-select="true">asd</text>
    - ![](../../image/Snipaste_2022-07-19_16-31-42.png)
#### `rich-text`
1. 富文本
    - `nodes` 属性表示要渲染的节点列表或者 `HTML` 字符串
    - ```html
      <rich-text nodes="<h1>Life is a box of Chocolates</h1>"></rich-text>
    - ![](../../image/Snipaste_2022-07-19_16-37-05.png)
### 表单组件
#### `button`
1. 按钮
    - 可以通过 `open-type` 属性调用微信提供的各种功能(客服, 转发, 获取用户授权, 获取用户信息等)
    - ```html
      <button>普通按钮</button>
      <button type="primary">主要按钮</button>
      <button type="warn">警告按钮</button>
      <button plain>普通按钮</button>
      <button type="primary" plain>主要按钮</button>
      <button type="warn" plain>警告按钮</button>
      <button size="mini">小普通按钮</button>
      <button type="primary" size="mini">主要按钮</button>
      <button type="warn" size="mini">警告按钮</button>
    - ![](../../image/Snipaste_2022-07-19_16-43-49.png)
### 媒体组件
#### `image`
1. 图片组件.
    - 默认宽度约为 `300px`, 高度约为 `200px`
    - 支持 `JPG`, `PNG`, `SVG`, `WEBP`, `GIF` 等格式，`2.3.0` 起支持云文件`ID`
    - 可以通过 `mode` 属性来指定图片的裁剪和缩放模式
    - ```html
      <image></image>
      <image src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"></image>
    - 即便是空的 `<image>` 也会占据宽和高
    - ![](../../image/Snipaste_2022-07-19_16-48-34.png)
## 模板与配置
### 数据绑定
1. 数据绑定的基本原则
    - 在 `data` 中定义数据
    - ```js
      Page({
        data: {
          name: 'Tom',
          age: 18,
          
        },
      })
    - 在 `WXML` 中使用数据
    - ```html
      <text>{{ name }} - {{ age + 1 }}</text>
    - ![](../../image/Snipaste_2022-07-19_20-08-29.png)
2. 使用 `{{}}` 绑定属性
    - ```js 
      data: {
        src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },
    - ```html
      <image src="{{src}}"></image>
    - ![](../../image/Snipaste_2022-07-19_20-13-25.png)
### 事件绑定
1. 小程序中的常用事件
    - 类型: `tap`
    - 绑定方式: `bindtap` 或 `bind:tap`
    - 事件描述: 手指触摸后马上离开, 类似于 `HTML` 中的 `click` 事件.
2. 事件对象的属性列表
    - 当事件回调触发时, 会收到一个事件对象 `event`
    - |属性|类型|说明|
      |---|---|---|
      |type|String|事件类型|
      |timeStamp|Integer|页面打开到触发事件所经过的毫秒数|
      |target|Object|触发事件的组件的属性值集合|
      |currentTarget|Object|事件绑定的组件的属性值集合|
      |detail|Object|额外的信息|
      |touches|Array|触摸事件, 当前停留在屏幕中的触摸点信息的数组|
      |changedTouches|Arrray|触摸事件, 当前变化的触摸点信息的数组|
3. 绑定事件
    - ```html
      <view>
        <button type="primary" bindtap="btnTapHandler">CLICK ME!</button>
      </view>
    - ```js
      Page({
        
        data: {
        },
        btnTapHandler(e) {
          console.log(e);
        }
      })
    - ![](../../image/Snipaste_2022-07-19_22-57-24.png)
      - 📕注意此时 `target` 和 `currentTarget` 是相同的
    - 但是如果我们给 `<view>` 绑定事件
    - ```html
      <view bindtap="btnTapHandler">
        <button type="primary" >CLICK ME!</button>
      </view>
    - ![](../../image/Snipaste_2022-07-19_22-59-31.png)
      - 显然此时的 `target` 为按钮, 但是 `currentTarget` 为 `<view>`. 所以总结一下就是 `currentTarget` 永远为事件绑定的组件, 而 `target` 是点击事件真实发生的组件
4. 修改 `data` 中的属性值
    - 通过调用 `this.setData({})` 修改数据, 通过 `this.data.xxx` 访问 `data` 中定义的属性
    - ```js
      btnTapHandler(e) {
        this.setData({
          age: this.data.age + 1
        })
      }
5. 事件传参
    - 不能通过绑定事件的同时传递参数. 下面代码中小程序会将 `btnTapHandler(1)` 整体作为函数名, 而不会将小括号中的 `1` 作为参数
      - ```html
        <button bindtap="btnTapHandler(1)">CLICK</button>
      - ![](../../image/Snipaste_2022-07-20_10-49-46.png)
    - 通过为组件提供 `data-*` 自定义属性传参, 其中 `*` 为参数的名字
      - ```html
        <button type="error" data-age="{{2}}" data-age-hello="{{3}}" bindtap="btnTapHandler1">CLICK ME!</button>
      - ```js
        btnTapHandler1(e) {
          console.log(e);
          this.setData({
            age: this.data.age + e.target.dataset.age
          })
        }
      - 📕需要通过 `e.target.dataset.xxx` 的方式拿到传递的参数. 注意如果是 `data-age-hello` 这种命名, 会自动转为 `camelCase`
      - ![](../../image/Snipaste_2022-07-20_10-56-48.png)
6. `bindinput` 事件
    - 对于文本框, 可以通过 `bindinput` 绑定文本框的输入事件, 通过 `event.detail.value` 访问输入的值
      - ```html
        <view>
          <input bindinput="inputHandler"></input>
        </view>
      - ```js
        inputHandler(e) {
          console.log(e.detail.value);
        }
7. 文本框与数据绑定
    - 通过 `<input>` 的 `value` 属性绑定数据, 在 `bindinput` 的回调函数中修改数据
      - ```html
        <input value="{{name}}" bindinput="inputHandler"></input>
      - ```js
        data: {
          name: 'Tom',
        },
        inputHandler(e) {
          this.setData({
            name: e.detail.value
          })
        }
### 条件渲染
1. 使用 `wx:if`, `wx:elif`, `wx:else` 渲染使用
    - ```html
      <view wx:if="{{age <= 20}}">{{age}}</view>
      <view wx:elif="{{20 < age && age <= 30}}">{{age}}!</view>
      <view wx:else>{{age}}！！</view>
2. 结合 `<block>` 使用 `wx:if`
    - 如果一次性控制多个组件的展示与隐藏, 可以使用 `<block>` 将多个组件包装起来, 并使用 `wx:if` 控制  `<block>` 的显示与隐藏.
    - `<block>` 只起到包裹的作用, 实际不会渲染成任何元素.
      - ```html
        <block wx:if="{{age > 20}}">
          <text>-----------{{age}}----------</text>
          <image src="{{src}}"></image>
        </block>
      - ![](../../image/Snipaste_2022-07-20_14-08-57.png)
3. 使用 `hidden` 控制显示与隐藏
    - 条件为 `true` 隐藏元素, 否则显示
      - ```html
        <view hidden="{{age <= 20}}">hidden: {{age}}</view>
      - ![](../../image/Snipaste_2022-07-20_14-15-05.png)
    - 不过 `hidden` 只是通过切换元素的 `display: block` 或 `display: none` 控制元素的隐藏和显示.
### 列表渲染
1. `wx:for` 遍历定义的数组
    - 默认情况下使用 `index` 表示当前循环项的索引, 使用 `item` 表示当前循环项
      - ```html
        <view wx:for="{{fruits}}" wx:key="id">
          我是{{item.name}} - {{index}} - {{item.id}}
        </view>
      - ```js
        data: {
          fruits: [
            { id: '001', name: 'Apple' },
            { id: '002', name: 'Fruit' },
            { id: '003', name: 'Cwhat？' },
          ]
        }
      - ![](../../image/Snipaste_2022-07-20_14-25-53.png)
    - 📕注意使用 `wx:key` 指定唯一 `key` 值, 就是哪个属性是独一无二的.
    - 如果想要使用索引作为 key, 那就写成 `wx:key="index"`
2. 手动指定索引和当前项的变量名
    - ```
      <view wx:for="{{fruits}}" wx:for-index="idx" wx:for-item="fruit" wx:key="idx">
        我是{{fruit.name}} - {{idx}} - {{fruit.id}}
      </view>
### `WXSS`
1. 和 `CSS` 相比, `WXSS` 扩展的特性有
    - `rpx` 尺寸单位
    - `@import` 样式导入
2. `rpx` 单位
    - `rpx: responsive pixel`
    - 原理: 鉴于不同设备屏幕的大小不同, `rpx` 把所有设备的屏幕在宽度上等分为 `750` 份. 即当前屏幕的总宽度为 `750rpx`
    - 官方建议开发时使用 `iPhone 6` 作为设计稿标准, 因为 `iPhone 6` 的屏幕宽度 `375px`, 等分为 `750rpx`, 那么 `1rpx=0.5px`
3. 样式导入
    - 使用 `@import` 导入外联样式表
    - 在根目录下创建 `style/index.wxss`
      - ```css
        .username {
          color: salmon;
        }
    - 在当前页面的 `wxss` 中导入
      - ```css
        @import "/style/index.wxss";
      - ```html
        <view wx:for="{{fruits}}" wx:key="id">
          我是 <text class="username">{{item.name}}</text> - {{index}} - {{item.id}}
        </view>
      - ![](../../image/Snipaste_2022-07-20_16-59-28.png)
4. 全局样式和局部样式
    - 只有当局部样式的权重大于全局样式时, 才会覆盖全局样式
## 全局配置
### 全局配置
1. `app.json` 是全局配置文件
2. `window`
    - 可以配置 `navigationBar(导航栏)` 和 `background(背景)`, 其中背景默认不可见, 只有下拉时才可见.
    - |属性名|类型|默认值|说明|
      |---|---|---|---|
      |navigationBarTitleText|String||导航栏标题内容|
      |navigationBarBackgroundColor|`HexColor`|#00000|导航栏背景色|
      |navigationBarTextStyle|String|white|导航栏标题颜色, 仅支持 `black` 或 `white`|
      |backgroundColor|`HexColor`|#ffffff|窗口背景色|
      |backgroundTextStyle|String|dark|下拉 loading 样式, 仅支持 `black` 或 `white`|
      |enablePullDownRefresh|Boolean|false|是否开启全局下拉刷新|
      |onReachBottomDistance|Number|50|页面上拉触底事件出发时距底部的举例, 单位 `px`|
#### `tabBar`
1. `tabBar`
    - 分为底部 `tabBar` 和 顶部 `tabBar`
    - `tabBar` 最少配置 2 个, 最多配置 5 个.
    - 当渲染顶部 `tabBar` 时, 不显示 `icon`, 只显示文本
    - `tabBar` 的 6 个组成部分
      - `backgroundColor`: `tabBar` 的背景色
      - `borderStyle`: `tabBar` 的上边框颜色
      - `color`: `tab` 文字默认(未选中时)的颜色
      - `iconPath`: `tab` 未选中的图片路径
      - `selectedColor`: `tab` 上文字选中时的颜色
      - `selectedIconPath`: `tab` 选中时的图片路径
    - 在 `tabBar` 节点的根配置项
      - |属性|类型|必填|默认值|描述|
        |---|---|---|---|---|
        |position|String|否|bottom|tabBar 的位置, 仅支持 `bottom`/`top`|
        |borderStyle|String|否|black|仅支持 `black`/`white`|
        |color|HexColor||||
        |selectedColor|HexColor||||
        |backgroundColor|HexColor||||
        |`list`|Array|`是`||tab页签的列表. 每个值的配置如下|
      - |属性|类型|必填|描述|
        |---|---|---|---|
        |pagePath|String|是|页面路径, 页面必须在 pages 中配置|
        |text|String|是|tab 上显示的文字|
        |iconPath|String|否||
        |selectedIconPath|String|否||
    - ```json
      "pages":[
        "pages/template/template",
        "pages/home/home",
        "pages/index/index",
        "pages/logs/logs"
      ],
      "tabBar": {
        "list": [
          {
            "pagePath": "pages/template/template",
            "text": "Template",
            "iconPath": "/images/tab/user.png",
            "selectedIconPath": "/images/tab/user_active.png"
          },
          {
            "pagePath": "pages/home/home",
            "text": "Home",
            "iconPath": "/images/tab/home.png",
            "selectedIconPath": "/images/tab/home_active.png"
          }
        ]
      },
    - ![](../../image/Snipaste_2022-07-21_08-34-03.png)
2. 自定义 `tabBar`
    - 配置文件: 增加 `custom` 配置项, 但是不能删除 list, 一方面是兼容低版本的小程序, 一方面也显示指出了哪些页面是 `tabBar` 页面
      - ```json
        "tabBar": {
          "custom": true,
          "list": [
            {
              // ...
            },
          ]
        },
    - 添加 `tabBar` 的代码文件
      - 在根目录下创建 `custom-tab-bar` 文件夹并在该文件夹下创建名为 `index` 的文件
      - 📕选择新建组件而不是新建页面
      - 之后页面底部就会出现 `tabBar`
      - ![](../../image/Snipaste_2022-08-01_22-52-44.png)
    - 编写 `tabBar` 代码
      - ```html
        <van-tabbar active="{{ active }}" bind:change="onChange">
          <van-tabbar-item icon="home-o">标签</van-tabbar-item>
          <van-tabbar-item icon="search">标签</van-tabbar-item>
          <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
      - ```js
        data: {
          active: 0,
        },

        onChange(event) {
          this.setData({ active: event.detail });
        },
      - ![](../../image/Snipaste_2022-08-09_10-36-28.png)
    - 自定义 `tabBar` 图标
      - 可以通过 slot 自定义图标, 其中 `icon` 这个 `slot` 表示未选中状态下的图标, `icon-active` 这个 `slot` 表示选中状态下的图标
      - ```html
        <van-tabbar active="{{ active }}" bind:change="onChange">
          <van-tabbar-item>
            <image
              slot="icon"
              src="/images/tab/home.png"
              mode="aspectFit"
              style="height: 18px; width: 18px;"
            ></image>
            <image
              slot="icon-active"
              src="/images/tab/home_active.png"
              mode="aspectFit"
              style="height: 18px; width: 18px;"
            ></image>
            首页
          </van-tabbar-item>
          <van-tabbar-item icon="search">标签</van-tabbar-item>
          <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
      - ![](../../image/Snipaste_2022-08-09_10-56-07.png)
    - 修改 `tabBar` 图标和文字之间的距离
      - 重置 `CSS` 变量
      - ```css
        .van-tabbar-item__icon {
          --tabbar-item-margin-bottom: 0;
        }
      - 样式共享
      - ```js
        options: {
          styleIsolation: 'shared'
        },
      - ![](../../image/Snipaste_2022-08-09_11-29-33.png)
    - 使用 `info` 渲染数字徽标
      - ```xml
        <van-tabbar-item icon="setting-o" info="3">标签</van-tabbar-item>
      - ![](../../image/Snipaste_2022-08-09_11-37-12.png)
    - 使用全局 `mobx` 配置数字徽标
      - 创建全局状态
      - ```js
        import { observable, action } from 'mobx-miniprogram';

        export const store = observable({
          // 数据字段
          name: 'tomStore',
          birth: 19,
        })
      - 在组件中引入状态: 记得使用 `observer` 侦听变化
      - ```js
        import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
        import { store } from '../store/store'

        Component({
          behaviors: [storeBindingsBehavior],
          storeBindings: {
            store,
            fields: {
              birth: 'birth'
            }
          },
          observers: {
            'birth': function(val) {
              this.setData({
                messageCount: val
              })
            }
          },

          /**
          * 组件的初始数据
          */
          data: {
            messageCount: 0,
          },
        })
      - 在页面中使用
      - ```html
        <van-tabbar-item icon="setting-o" info="{{messageCount}}">标签</van-tabbar-item>
      - ![](../../image/Snipaste_2022-08-09_14-32-02.png)
### 页面配置
1. 这里的页面配置和全局配置一样, 不过不需要写在 `window` 里了
    - ```json
      {
        "usingComponents": {},
        "navigationBarBackgroundColor": "#e67e22",
        "navigationBarTextStyle": "black",
        "backgroundColor": "#e67e22",
        "backgroundTextStyle": "light",
        "enablePullDownRefresh": true
      }
## 网络请求
1. 限制
    - 出于安全的考虑, 小程序对数据接口的请求做出了如下限制
      - 只能请求 `HTTPS` 类型的接口
      - 必须将接口域名加入信任列表中. (需要在网站的管理中配置, 配置完成后开发者工具会自动刷新)
        - ![](../../image/Snipaste_2022-07-21_11-02-05.png)
        - 域名不能使用 `localhost` 或者 `IP` 地址
        - 用域名必须经过 `ICP` 备案
2. `GET` 请求
    - 请求参数
      - `url`: 开发者服务器接口地址
      - `method`: HTTP 请求方法
      - `data`: 请求的参数
      - `success`: 接口调用成功的回调函数
      - `fail`: 接口调用失败的回调函数
      - `complete`: 接口调用结束的回调函数(成功或失败都会执行)
    - `success` 回调函数的参数: `res`
      - `data`: 开发者服务器返回的数据
      - `statusCode`: 开发者服务器返回的 `HTTP` 状态码
      - `	header`: 开发者服务器返回的 `HTTP Response Header`
      - `cookies`: 开发者服务器返回的 `cookies`, 格式为字符串数组
    - `fail` 回调函数的参数: `err`
      - `errMsg`: 错误信息
      - `errno`: `Number` 类型, 错误码.
    - ```js
      getRequest() {
        wx.request({
          url: 'https://www.escook.cn/api/get',
          method: 'GET',
          data: {
            name: 'zs',
            age: 20
          },
          success: (res) => {
            console.log(res)
          }
        })
      }
    - ![](../../image/Snipaste_2022-07-21_11-08-20.png)
    - ![](../../image/Snipaste_2022-07-21_11-08-50.png)
3. `post` 请求 
    - ```js
      postRequest() {
        wx.request({
          url: 'https://www.escook.cn/api/post',
          method: 'POST',
          data: {
            name: 'tom',
            age: 100
          },
          success: (res) => {
            console.log(res.data)
          }
        })
      }
4. 跳过 `request` 合法域名校验
    - 如果后端仅仅提供了 `http` 协议接口, 暂时没有提供 `https` 协议接口, 可以通过本地配置勾选不校验 `HTTPS` 证书等.
    - ![](../../image/Snipaste_2022-07-21_18-32-36.png)
5. 小程序的网络请求不存在跨域
## 页面导航
1. 实现页面导航的两种方式
    - `声明式导航`和`编程式导航`
### 声明式导航
1. 跳转到 `tabBar` 页面
    - tabBar 页面就是被配置为 tabBar 的页面. 比如从首页跳转到个人中心页面
    - 使用 `<navigator>` 组件跳转到指定的 `tabBar` 页面, 需要指定 `url` 属性和 open-type 属性
      - `url`: 表示要跳转到的页面地址, 必须以 **`/`** 开头
      - `open-type`: 表示跳转的方式, 必须为 `switchTab`
    - ```html
      <navigator url="/pages/home/home" open-type="switchTab">去我的中心 >>></navigator>
2. 跳转到非 `tabBar` 页面
    - 将 `open-type` 值修改为 `navigate`
    - 当跳转到非 `tabBar` 页面时, 可以省略不写 `open-type`
    - ```html
      <navigator url="/pages/index/index" open-type="navigate">去Index >>></navigator>
      <navigator url="/pages/index/index" >去Index >>></navigator>
3. 后退页面
    - `open-type`: `navigateBack`
    - `delta`: 表示要后退到多少层级. 默认值为 `1`, 因此可以省略 `delta` 配置项
    - ```html
      <navigator open-type="navigateBack" delta="1">返回上一级</navigator>
      <navigator open-type="navigateBack" >返回上一级</navigator>
4. 传递参数
    - 在测试传参时尽量不要传参到 `index` 页面, 也就是包含这样代码的页面 `const app = getApp()` 有些问题....
    - 也不要去 `tabBar` 页面...
    - 通过在路径后拼接 `query` 参数传递参数
      - ```html
        <navigator url="/pages/test/test?name=tom&age=20" >(传参)去我的test >>></navigator>
    - 然后在 `test.js` 的 `onLoad` 函数中接收参数
      - ```js
        onLoad(options) {
          console.log('test---', options)
        },
      - ![](../../image/Snipaste_2022-07-23_10-26-12.png)
### 编程式导航
1. 跳转到 `tabBar` 页面
    - 通过 `wx.switchTab(object)` 方法, 可以跳转到 `tabBar` 页面.
    - 参数的属性
      - `url`: 必选. 需要跳转的 `tabBar` 的地址, 路径后不能带参数; 
      - `success`: 接口调用成功的回调函数 
      - `fail`: 接口调用失败的回调函数
      - `complete`: 接口调用完成的回调函数
    - ```html
      <button type="primary" bindtap="mySwitchTab">去我的中心</button>
    - ```js
      mySwitchTab() {
        wx.switchTab({
          url: '/pages/home/home',
          success: () => { console.log('去home成功') },
          fail: () => { console.log('去home失败') },
          complete: () => { console.log('去home完成') }
        })
      }
    - ![](../../image/Snipaste_2022-07-21_19-02-56.png)
2. 跳转到非 `tabBar` 页面
    - 通过 `wx.navigateTo(object)` 方法跳转到非 `tabBar` 页面, 参数与 `switchTab` 相同
    - ```js
      myNavigateTo() {
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
3. 后退页面
    - 通过 `wx.navigateBack` 方法回退. `delta` 参数默认为 `1`, 可以省略
    - ```js
      myNavigateBack() {
        // wx.navigateBack({
        //   delta: 1,
        // })
        wx.navigateBack()
      }
4. 传递参数
    - 直接通过 `url` 拼接参数
      - ```html
        <button type="error" bindtap="myNavigateToWithParams">(传参)去test</button>
      - ```js
        myNavigateToWithParams() {
          wx.navigateTo({
            url: '/pages/test/test?name=tom&age=12',
          })
        }
    - ![](../../image/Snipaste_2022-07-23_10-28-36.png)
## 页面事件
### 下拉刷新
1. 打开对应页面的 `json` 配置文件, 增加配置项
    - ```json
      {
        "enablePullDownRefresh": true
      }
2. 在事件 `onPullDownRefresh` 中编写触发逻辑
    - ```html
      <view>
        <button type="primay">{{count}}</button>
      </view>
    - ```js
      data: {
        count: 0
      },
      onPullDownRefresh() {
        console.log('onPullDownRefresh')
        this.setData({
          count: this.data.count + 1,
        });
      },
    - ![](../../image/Snipaste_2022-07-24_09-24-00.png)
3. 在手机端需要手动关闭下拉刷新的 loading 效果. 调用
    - ```js
      onPullDownRefresh() {
        console.log('onPullDownRefresh')
        this.setData({
          count: this.data.count + 1,
        });
        setTimeout(() => {
          wx.stopPullDownRefresh();
        }, 1000)
      },
### 上拉触底
1. `onReachBottom` 函数
    - ```js
      onReachBottom() {
        console.log('-------到底了')
      }
2. 修改触发事件的举例
    - 修改页面的 `json` 配置文件, 增加如下配置. 默认为 `50`.
    - ```json
      "onReachBottomDistance": 100
## 编译模式
1. 增加自定义的编译模式
    - 如果是在默认普通模式下编译, 每次编译后的文件可能不是目前修改的文件. 我们可以通过增加自定义的编译模式实现这个功能
    - ![](../../image/Snipaste_2022-07-24_10-48-00.png)
    - ![](../../image/Snipaste_2022-07-24_10-53-38.png)
## 生命周期
1. 在小程序中生命周期分为两类, 分别是
    - 应用生命周期: 小程序 `启动->运行->销毁`
    - 页面生命周期: 每个页面
2. 应用生命周期
    - `onLaunch`: 在小程序初始化完成时, 触发该函数(只触发一次) 
    - `onShow`: 小程序启动时, 或者从后台进入前台显示时, 触发该函数 
    - `onHide`: 小程序从前台进入后台时触发.
3. 页面生命周期
    - `onLoad`: 页面加载时触发. 一个页面`只会调用一次`, 可以在 `onLoad` 的参数中获取打开当前页面路径中的参数
    - `onShow`: 页面显示/切入前台时触发
    - `onReady`: 页面初次渲染完成时触发. 一个页面`只会调用一次`, 代表页面已经准备妥当, 可以和视图层进行交互.
      - 📕注意: 对界面内容进行设置的 `API` 如 `wx.setNavigationBarTitle`, 请在 `onReady` 之后进行
    - `onHide`: 页面隐藏/切入后台时触发. 如 `wx.navigateTo` 或底部 `tab` 切换到其他页面, 小程序切入后台等
    - `onUnload`: 页面卸载时触发. 如 `wx.redirectTo` 或 `wx.navigateBack` 到其他页面时
## `WXS`
1. `WXS(Weixin Script)` 是小程序独有的一套脚本语言, 结合 `WXML` 可以构建出页面的结构
    - `wxml` 中无法调用在页面的 `js` 中定义的函数, 但是 `wxml` 中可以调用 `wxs` 中定义的函数. 至于为什么不能, [👉请看这里👈](https://developers.weixin.qq.com/community/develop/doc/0000e0245b4b60908fa9d52b05b800)
    - `wxs` 定义的函数不能作为事件的回调
    - `wxs` 中不能调用小程序提供的 `API`, 也不能调用 `js` 中定义的文件.
    - `wxs` 主要的作用大概就是过滤器吧...
2. `WXS` 和 `JavaScript` 的关系
    - `wxs` 有自己的数据类型
      - `number`, `string`, `boolean`, `object`
      - `function`, `array`, `data`, `regexp`
    - `wxs` 不支持 `ES6` 及以上的语法
    - `wxs` 遵循 `CommonJS` 规范
### 基础语法
1. 在 `wxml` 中创建 `<wxs></wxs>` 的标签.
    - 每个 `<wxs>` 都必须提供 `module` 属性用来指定当前 `<wxs>` 的模块名称.
    - ```js
      <wxs module="what">
      module.exports.myUppercase = function(str) {
        return str.toUpperCase();
      }
      </wxs>
    - ```html
      <view>{{ what.myUppercase('abc') }}</view>
2. 定义外联的 `wxs` 脚本
    - 创建 `tools.wxs` 文件
      - ```js
        function myLowercase(str) {
          return str.toLowerCase();
        }

        module.exports = {
          myLowercase: myLowercase
        }
    - 在 `wxml` 中引入
      - ```html
        <view>{{ blah.myLowercase('ABC') }}</view>
        <wxs src="./tools.wxs" module="blah"></wxs>
    - ![](../../image/Snipaste_2022-07-25_16-11-46.png)
## 组件
### 组件的引入
1. 在根目录下创建 `components` 文件夹, 在 `components` 下创建 `test1` 的文件夹, 右击 `test1` 选择 `新建 Component` `IDE` 就会帮我们自动创建组件需要的文件.
2. 局部引用
    - 在需要引入组件的页面的 `.json` 文件中增加配置
      - ```js
        {
          "usingComponents": {
            "my-test": "/components/test1/test"
          },
        }
      - 在 `wxml` 中使用 `my-test` 标签
      - ```js
        <my-test></my-test>
    - ![](../../image/Snipaste_2022-07-25_16-28-49.png)
3. 全局引入
    - 在 `app.json` 的 `usingComponents` 中使用.
4. 组件和页面的区别
    - 组件的 `json` 文件中需要声明 `"component": true,`
    - 组件的 `js` 文件中需要 `Component()` 函数
    - 组件的事件处理函数需要定义到 `methods` 中
### 组件的样式
1. 一些注意
    - `app.wxss` 中的样式对组件无效
    - `class` 选择器会被隔离, 但是标签选择器还是会影响组件中的样式
2. 修改组件的样式的隔离选项
    - 如果希望外界可以控制组件内部的样式, 可以通过 `styleIsolation` 修改组件的样式隔离选项.
      - `isolcated`: 表示启用样式隔离, 在自定义组件内外, 使用 `class` 选择器指定的样式不会互相影响
      - `apply-shared`: 表示页面的 `wxss` 样式会影响组件, 但是组件的不会影响页面
      - `shared`: 表示页面的 wxss 样式会影响组件, 组件的样式也会影响配置页面和其他配置了 `shared` 或者 `apply-shared` 的组件 
    - 通过修改组件的 `json` 配置文件
      - ```json
        {
          "component": true,
          "styleIsolation": "apply-shared"
        }
    - 或者通过 js 中增加配置项
      - ```js
        Component({
          options: {
            styleIsolation: 'apply-shared'
          },
        })
    - ![](../../image/Snipaste_2022-07-25_18-30-03.png)
### 数据, 方法和属性
1. 将数据定义到 `data`, 将方法定义到 `methods`, 将属性定义到 `property`
    - ```html
      <view>
        <text>{{ name }}</text>
      </view>
      <view>
        <button type="primary" bindtap="changeName">改名</button>
      </view>
    - ```js
      Component({
        data: {
          name: 'tom-component'
        },
        methods: {
          changeName() {
            this.setData({
              name: 'hello by Adele'
            })
          }
        }
      })
    - ![](../../image/Snipaste_2022-07-25_18-38-39.png)
2. 属性定义在 `property` 中
    - 属性是外界传递给组件的值. 可以采用完整方式和简化方式
    - 📕属性是可写的
    - 组件
      - ```js
        properties: {
          max: {
            type: Number,
            value: 10
          },
          min: Number
        },
      - ```html
        <view>
          <text>{{ name }}-Max:{{max}}-Min:{{min}}</text>
        </view>
    - 页面元素
      - ```html
        <my-test max="{{100}}" min="{{99}}" ></my-test>
    - ![](../../image/Snipaste_2022-07-26_09-13-31.png)
3. `data` 和 `properties` 是同一个对象
    - ```js
      showInfo() {
        console.log('properties---', this.properties)
        console.log('data---', this.data)
        console.log(this.data === this.properties)
      }
    - ![](../../image/Snipaste_2022-07-26_09-22-14.png)
    - 因此同样可以使用 `setData` 来修改 `properties` 的值.
### 数据监听器
1. 数据监听器用于监听和响应属性或数据字段的变换.
    - 将数据监听器写在 `observers` 这个选项中
      - ```js
        observers: {
          'max': function(newValue) {
            this.setData({
              sum: newValue + this.properties.min
            })
          }
        },
    - ```html
      <view>
        <text>{{ name }}-Max:{{max}}+Min:{{min}}=Sum:{{sum}}</text>
      </view>
    - ![](../../image/Snipaste_2022-07-26_09-35-42.png)
2. 监听对象属性的变化
    - 通过 `对象1.属性1, 对象2.属性2 ...` 这样的方法
    - 定义数据
      - ```js
        data: {
          rgb: {
            r: 100,
            g: 200,
            b: 50
          }
        },
      - ```js
        observers: {
          'rgb.r, rgb.g, rgb.b': function(newValueR, newValueG, newValueB) {
            console.log('newValue', newValueR, newValueG, newValueB)
          }
        },
    - ![](../../image/Snipaste_2022-07-26_10-51-56.png)
3. 监听对象中所有属性的变化
    - 使用 `对象名.**` 的方式
    - ```js
      'rgb.**': function(newValueRGb) {
        console.log('newValueRGb', newValueRGb);
      } 
    - ![](../../image/Snipaste_2022-07-26_10-57-21.png)
### 纯数据字段
1. 指不用于页面渲染或者不传递给其他组件的字段.
    - 在 `options` 中指定 `pureDataPattern` 为一个正则表达式, 所有在 `data` 中定义的符合这个正则表达式的字段将成为纯数据字段.
    - 纯数据字段
    - ```js
      options: {
        pureDataPattern: /^_/
      },
      data: {
        _visible: true,
      },
### 组件的生命周期
1. 生命周期
    - |生命周期|参数|描述说明|
      |---|---|---|
      |`created`|无|组件实例刚刚被创建时|
      |`attached`|无|组件实例进入页面节点树时|
      |ready|无|组件在视图层布局完成后|
      |moved|无|组件实例被移动到节点树的另一个位置时|
      |`detached`|无|组件实例被从页面节点数移除时|
      |error|无|组件方法抛出错误时|
2. 📕一些注意
    - `created`: 此时不能调用 `setData`. 通常只给组件增加自定义字段
    - `attached`: 此时组件 `data` 已经初始化完毕, 可以做大部分初始化工作, 比如发送网络请求
    - `detached`: 适合做清理性质的工作
3. 定义组件生命周期
    - 旧的方式是将生命周期函数放在 `methods` 中, 新的方式是将生命周期函数放在 `lifetimes` 中
    - ```js
      lifetimes: {
        created() {
          console.log('组件-created')
        },
        attached() {
          console.log('组件-attached')
        },
        detached() {
          console.log('组件-detached')
        }
      },
4. 组件所在页面的生命周期
    - 有时候, 自定义组件的行为依赖于页面状态的变化, 此时就需要用到组件所在页面的生命周期.
    - 在组件中组件所在页面的生命周期有三个
      - `show`: 无参数, 页面被展示时执行
      - `hide`: 无参数, 页面被隐藏时执行
      - `resize`: `(Object size)`, 页面尺寸变化时执行
    - 组件需要在 `pageLifetimes` 节点中定义
      - ```js
        pageLifetimes: {
          show() {
            this.setData({
              rgb: {
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
              }
            })
          },
          hide() {},
          resize() {}
        },
### 插槽
1. 小程序中, 默认每个自定义组件只允许使用一个 `<slot>` 进行占位, 即单个插槽
    - 组件
      - ```html
        <text class="test2">components/test2.wxml</text>
        <slot></slot>
    - 组件的页面
      - ```html
        <my-test2>
          <view>我是凑热闹的</view>
        </my-test2>
    - ![](../../image/Snipaste_2022-07-27_10-47-24.png)
2. 多个插槽
    - 增加配置
      - ```js
        options: {
          multipleSlots: true
        },
    - 组件
      - 通过 `name` 这个属性增加插槽标志
      - ```html
        <text class="test2">components/test2.wxml</text>
        <slot name="before"></slot>
        <slot name="after"></slot>
    - 组件的页面
      - 通过 `slot` 这个属性指明要使用哪个插槽
      - ```html
        <my-test2>
          <view slot="before">我是凑热闹的--before</view>
          <view slot="after">我是凑热闹的--after</view>
        </my-test2>
    - ![](../../image/Snipaste_2022-07-27_10-53-02.png)
### 父子组件通信
1. 属性绑定
    - 父组件向子组件的指定属性设置数据, 仅能设置 `JSON` 兼容的数据
    - 这就是之前介绍的 `property`
2. 事件绑定
    - 子组件向父组件传递数据, 可以传递任意类型的数据
    - 案例: 父组件传递给子组件一个 `count`, 在子组件中增加按钮来触发父组件的 `count` 增加.
    - 父组件
      - 父组件通过 `e.detail` 获取子组件触发事件时传递过来的参数值
      - ```js
        handleCountTrigger(e) {
          this.setData({
            count: e.detail
          })
        }
      - 父组件通过 `bind:自定义事件名称="函数名"` 的方式传递事件
      - ```html
        <my-test2 count="{{count}}" bind:countTrigger="handleCountTrigger">
          <view slot="before">我是凑热闹的--before</view>
          <view slot="after">我是凑热闹的--after</view>
        </my-test2>
    - 子组件
      - ```html
        <view>子组件的count:{{count}}</view>
        <button type="primary" bindtap="countPlus">countPlus</button>
      - ```js
        countPlus() {
          this.setData({
            count: this.properties.count + 1
          });
          this.triggerEvent('countTrigger', this.data.count)
        }
3. 获取组件实例
    - 父组件通过 `this.selectComponent` 获取子组件实例对象, 从而访问子组件的任意数据和方法
    - 首先, 需要给子组件绑定唯一的选择器
      - ```html
        <my-test2 
          count="{{count}}" 
          bind:countTrigger="handleCountTrigger"
          class=".test2"
        >
        ...
        </my-test2>
        <button type="warn" bindtap="callSonMethod">调用子组件方法</button>
      - 在调用 `this.selectComponent` 时传递唯一的选择器
      - ```js
        callSonMethod() {
          const test2Comp = this.selectComponent('.test2');
          test2Comp.countPlus();
        }
    - ![](../../image/Snipaste_2022-07-27_11-15-43.png)
    - 在子组件的原型对象上存在我们定义的函数 `countPlus`
    - ![](../../image/Snipaste_2022-07-27_11-17-21.png)
### `behaviors`
1. 小程序中, 用于实现组件间代码共享的特性, 类似于 `Vue` 中的 `mixin`
2. 每个 `behavior` 可以包含一组属性, 数据, 生命周期函数和方法. 引用这个 `behavior` 时, 它的属性, 和方法等也会合并到组件中
    - 每个组件可以有多个 `behavior`, `behavior` 自身也可以引用其他 `behavior`
3. 创建 `behavior`
    - ```js
      module.exports = Behavior({
        data: {
          username: 'tom',
        },
        methods: {},
      })
    - ![](../../image/Snipaste_2022-07-27_11-27-05.png)
    - `behavior` 可以定义的节点
      - `properties`
      - `data`
      - `methods`
      - `behaviors`
      - `created`
      - `attached`
      - `ready`
      - `moved`
      - `detached`
4. 导入并使用 `behavior`
    - ```js
      const myBehavior = require('../../behaviors/my-behavior')

      Component({
        behaviors: [myBehavior],
      })
    - 在页面中直接使用
      - ```html
        <button type="primary" bindtap="countPlus">countPlus</button>
        <view>Behavior: {{username}}</view>
    - ![](../../image/Snipaste_2022-07-27_11-30-45.png)
5. 同名字段的覆盖和组合规则
    - `data`
    - `properties` 或 `methods`
    - `生命周期函数`
## 使用 `npm`
1. 小程序使用 npm 有三个限制
    - 不支持依赖于 `Node.js` 内置库的包
    - 不支持依赖 `浏览器内置对象` 的包
    - 不支持依赖 `C++` 插件的包
### `Vant Weapp`
1. 是有赞前端团队开源的小程序 `UI` 组件库, 使用 `MIT` 开源协议.
2. 使用
    - 将仓库初始化为 `npm` 仓库
      - `npm init -y`
    - 安装依赖(推荐 `1.3.3`)
      - `npm i @vant/weapp@1.3.3 -S --production`
    - 构建 `npm` 包
      - 在开发者工具中, 点击 `工具->构建 npm`, 并勾选 `使用 npm 模块选项`, 构建完成后即可引入.
      - ![](../../image/Snipaste_2022-07-28_10-22-23.png)
    - 修改 `app.json`
      - 删除 `"style": "v2",`
3. 使用 `Vant`
    - 在 `app.json` 中的 `usingComponents` 引入需要的组件
      - 因为 `button` 使用比较频繁所以才在 `app.json` 中引用. 如果其他不频繁的组件, 在哪个页面使用就在那个页面引入即可,
      - ```json
        "usingComponents": {
          "van-button" : "@vant/weapp/button/index"
        }
    - 使用
      - ```html
        <van-button type="warning">我是Vant</van-button>
    - ![](../../image/Snipaste_2022-07-28_10-32-48.png)
4. 定制全局主题样式
    - 使用 `CSS` 变量定义样式.
    - 在 `app.wxss` 中声明变量
      - ```css
        page {
          --button-danger-background-color: salmon;
          --button-danger-border-color: salmon;
        }
    - 因为小程序根节点标签是 `<page>` 所以要将变量写在 `page` 这个标签选择器中. 至于变量的名字, 可以访问 `Vant` 官网 [https://vant-ui.github.io/vant-weapp/#/theme](https://vant-ui.github.io/vant-weapp/#/theme)
    - ![](../../image/Snipaste_2022-07-28_10-42-00.png)
### `API` 的 `Promise` 化
1. 默认情况下, 小程序提供的 `API` 都是基于回调函数的. 主要基于 `miniprogram-api-promise` 这个第三方 `npm` 包
    - 安装
      - ```shell
        npm i miniprogram-api-promise@1.0.4
    - 构建
      - 为了防止构建失败, 每次都可以删除构建后的文件夹然后重新执行构建.
2. 使用
    - ```js
      async sendPromiseRequest() {
        const { data } = await wx.p.request({
          methods: 'GET',
          url: 'https://www.escook.cn/api/get',
          data: {
            name: 'tom',
            age: 18
          }
        })
        console.log('data', data)
      }
    - ![](../../image/Snipaste_2022-07-28_15-01-30.png)
## 全局数据共享
1. 使用 `mobx-miniprogram` 和 `mobx-miniprogram-bindings` 实现全局数据共享
    - `mobx-miniprogram` 用来创建 `Store` 实例对象
    - `mobx-miniprogram-bindings` 将 `Store` 中的数据和方法绑定到组件或页面使用.
2. 安装
    - ```shell
      npm i mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
    - 执行构建
3. 创建 `Mobx` 的 `Store` 实例
    - 调用 `observable` 函数, 并传递配置对象, 这个对象可以有
      - 数据字段
      - `getter`
      - `action`
    - ```js
      import { observable, action } from 'mobx-miniprogram';

      export const store = observable({
        // 数据字段
        name: 'tomStore',
        birth: 1999,

        // 计算属性
        get info() {
          return `${this.name} start @ ${this.birth}`
        },

        // actions 方法
        updateBirth: action(function(moreAge) {
          this.birth += moreAge;
        })
      })
4. 使用 `Store` 的数据
    - 引入属性, 在页面/组件创建时绑定数据, 在页面/组件卸载时取消绑定
    - ```js
      import { createStoreBindings } from 'mobx-miniprogram-bindings'
      import { store } from '../../store/store'

      lifetimes: {
        attached() {
          this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['name', 'birth'],
            actions: ['updateBirth']
          })
        },
        detached() {
          this.storeBindings.destroyStoreBindings();
        }
      },
    - 在页面展示
      - ```html
        <view>
          <text>From Store: {{name}}@{{birth}}</text>
          <van-button type="warning" bindtap="addStoreBirth">增加 Birth</van-button>
        </view>
      - ```js
        addStoreBirth() {
          this.updateBirth(1);
        },
    - ![](../../image/Snipaste_2022-07-28_15-29-36.png)
## 分包
### 基础概念
1. 分包是指把一个完整的小程序项目按照需求划分为不同的子包, 在构建时打包成不同的分包, 用户在使用时按需加载.
    - 好处: 优化小程序首次启动的下载时间. 多团队共同开发时更好地解耦协作.
2. 分包后的项目构成
    - 分包后, 小程序由 `1` 个主包和多个分包组成
      - 主包: 一般只包含项目的启动页面或 `TabBar` 页面, 以及所有分包都需要用的一些公共资源
      - 分包: 只包含和当前分包有关的页面和私有资源.
3. 分包的加载规则
    - 小程序启动时, 默认会下载主包并启动主包内页面
      - `tabBar` 页面需要放到主包
    - 当用户进入分包内某个页面时, 客户端会下载对应分包
      - 非 tabBar 页面可以按照功能的不同, 划分为不同的分包按需下载
4. 分包的体积限制
    - 限制一: 主包和分包大小不能超过 `16M`
    - 限制二: 主包或单个分包的大小不能超过 `2M`
### 使用分包
1. 在 `app.json` 中增加下面配置
    - ```json
      "subpackages": [
        {
          "root": "packageA",
          "pages": [
            "pages/cat/cat",
            "pages/dog/dog"
          ]
        },
        {
          "root": "packageB",
          "pages": [
            "pages/apple/apple",
            "pages/banana/banana"
          ]
        }
      ]
    - 保存后会自动生成下图的文件结构
    - ![](../../image/Snipaste_2022-07-28_18-48-45.png)
2. 可以通过 `name` 属性为分包增加别名
    - ```json
      "subpackages": [
        {
          "root": "packageA",
          "name": "hehe",
        },
        {
          "root": "packageB",
          "name": "haha",
        }
      ]
3. 在 `详情->基本信息` 查看主包和分包的大小
    - ![](../../image/Snipaste_2022-07-28_19-02-29.png)
4. 打包原则
    - 小程序会按照 `subpackages` 的配置分包, `subpackages` 之外的目录将被打到主包
    - 主包也可以有自己的 `pages`, 即最外层的 `pages`
    - `tabBar` 页面必须在主包内
    - 分包之间不能互相嵌套
5. 引用原则
    - 主包无法引用分包内的私有资源
    - 分包之间不能互相引用私有资源
    - 分包可以引用主包内的公共资源
    - ![](../../image/Snipaste_2022-07-28_21-49-53.png)
### 独立分包
1. 独立分包本质上也是分包, 只不过其独立于主包和其他分包可以单独运行
    - ![](../../image/Snipaste_2022-07-28_21-52-07.png)
2. 独立分包和普通分包的区别
    - 普通分包必须依赖主包才能运行
    - 独立分包可以在不下载主包的情况下, 独立运行
3. 创建独立分包
    - 增加 `independent: true` 的配置
    - ```json
      {
        "root": "packageA",
        "name": "hehe",
        "pages": [
          "pages/cat/cat",
          "pages/dog/dog"
        ],
        "independent": true
      },
### 分包预下载
1. 指的是: 在进入小程序的某个页面时, 由框架自动预下载可能需要的分包, 从而提升进入后续分包页面时的启动速度.
2. 配置分包的预下载
    - 在 `app.json` 中使用 `preloadRule` 节点定义分包的预下载规则
      - `key` 指定触发分包预下载的页面路径
      - `network`: 在指定的网络模式下进行预下载. 可选 `all` 和 `wifi`(默认). 
      - `packages`: 预下载的分包, 值为分包的 `root` 或者 `name`
    - ```json
      "preloadRule": {
        "pages/home/home": {
          "network": "all",
          "packages": ["packageA"]
        }
      }
    - ![](../../image/Snipaste_2022-07-29_08-42-06.png)
3. 分包预下载限制
    - 同一分包中的页面享有共同的预下载大小限额 **`2M`**.
    - 即如果 `home` 页面预下载分包 `A`, `message` 预下载 `B`, 那么 `A` 和 `B` 的大小之和要小于 `2M`
## `uni-app`
### 创建与简介
1. 打开 `HBuilderX` 后, 选择`文件->新建项目`, 按照下面的方式创建项目
    - ![](../../image/Snipaste_2022-08-09_15-34-58.png)
2. 项目结构
    - ![](../../image/Snipaste_2022-08-09_15-42-27.png)
3. 配置
    - 配置微信小程序 ID
      - ![](../../image/Snipaste_2022-08-10_08-54-51.png)
    - 配置小程序开发者工具的安装位置
      - ![](../../image/Snipaste_2022-08-10_08-57-40.png)
    - 设置微信开发者工具的服务端口
      - ![](../../image/Snipaste_2022-08-10_09-07-36.png)
    - 启动 `uni-app` 程序
      - 文件选中 `main.js` 然后运行. `HBuilder` 中的是源代码, 小程序开发者工具中的代码是编译过的代码哦(位置是 `unpackage/dist` 下). 如果要修改, 只能直接修改 `HBuilder` 中的代码
      - ![](../../image/Snipaste_2022-08-10_09-23-10.png)
      - ![](../../image/Snipaste_2022-08-10_09-24-34.png)
### `tabBar`
1. 创建页面
    - 在 `pages` 目录中右键选择**新建页面**, 在弹出的窗口中填写页面名称, 勾选 `scss` 模板. 一共创建四个页面
    - ![](../../image/Snipaste_2022-08-10_09-58-54.png)
2. 增加配置
    - ```json
      "tabBar": {
        "selectedColor": "#C00000",
        "list": [{
            "pagePath": "pages/home/home",
            "text": "首页",
            "iconPath": "static/tab_icons/home.png",
            "selectedIconPath": "static/tab_icons/home-active.png"
          },
          {
            "pagePath": "pages/cate/cate",
            "text": "分类",
            "iconPath": "static/tab_icons/cate.png",
            "selectedIconPath": "static/tab_icons/cate-active.png"
          },
          {
            "pagePath": "pages/cart/cart",
            "text": "购物车",
            "iconPath": "static/tab_icons/cart.png",
            "selectedIconPath": "static/tab_icons/cart-active.png"
          },
          {
            "pagePath": "pages/my/my",
            "text": "我的",
            "iconPath": "static/tab_icons/my.png",
            "selectedIconPath": "static/tab_icons/my-active.png"
          }
        ]
      }
    - 📕如果需要页面显示 `tabBar`, 记得 `pages` 这个配置项的第一项不能使非 `tabBar` 页面哦~
    - ![](../../image/Snipaste_2022-08-10_11-48-49.png)
### 使用网络请求
1. 初始化项目为 `npm` 项目
    - ```shell
      npm init -y
2. 安装依赖
    - ```shell
      npm install @escook/request-miniprogram
    - 在 `main.js` 中引入并使用
    - ```js
      import { $http } from '@escook/request-miniprogram'

      uni.$http = $http

      $http.baseUrl = 'https://api-ugo-web.itheima.net'
3. 增加请求的 `loading`
    - ```js
      uni.$http = $http

      $http.beforeRequest = function(options) {
        uni.showLoading({
          title: 'loading...'
        })
      }
      $http.afterRequest = function() {
        uni.hideLoading()
      }
4. 配置请求
    - ```js
      export default {
        data() {
          return {
            swiperList: [],
          };
        },
        onLoad() {
          this.getSwiperList()
        },
        methods: {
          async getSwiperList() {
            const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
            if (res.meta.status !== 200) {
              return uni.showToast({
                title: '获取首页滚动失败',
                duration: 500,
                icon: "none",
              });
            }
            this.swiperList = res.message
          }
        }
      }
### 小程序分包
1. 为了优化首页加载, 在项目中将 `tabBar` 相关的 `4` 个页面放在主包中, 其他页面(例如商品详情页, 商品列表页)放在分包. 设置分包步骤如下
    - 在项目根目录中, 创建分包的根目录 `subpkg`
    - 在 `pages.json` 中, 和 pages 节点平级的位置声明节点 `subPackages` 节点.
      - ```json
        "subPackages": [
          {
            "root": "subpkg",
            "pages": [],
          }
        ],
    - 右键 `subpkg` 新建页面, 新建之后在 `pages.json` 中就会自动加上刚刚创建的页面啦
    - ![](../../image/Snipaste_2022-08-10_17-06-30.png)
    - ![](../../image/Snipaste_2022-08-10_17-08-23.png)
![](../../image/)
![](../../image/)
![](../../image/)
