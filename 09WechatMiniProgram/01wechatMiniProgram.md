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
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)
![](../../image/)