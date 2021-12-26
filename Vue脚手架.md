<!-- TOC -->

- [Vue cli 脚手架](#vue-cli-脚手架)
  - [安装与项目分析](#安装与项目分析)

<!-- /TOC -->

## Vue cli 脚手架
> cli: Command Line Interface
### 安装与项目分析
1. `Vue Cli` 是 `Vue` 官方提供的标准化开发工具.
2. 安装具体步骤
    - 全局安装 `@vue/cli`
      - ```shell
        npm install @vue/cli -g
      - 如果以前安装过, 就先卸载吧
      - ```shell
        npm uninstall vue-cli -g
    - 安装完后, 关闭 `cmd` 窗口, 然后再打开 `cmd`, 执行命令
      - ```shell
        vue -V
      - ![](../image/Snipaste_2021-12-26_10-02-29.png)
3. 创建项目
    - 切换到自己要创建项目的目录, 然后执行
      - ```shell
        vue create vue_test(项目名)
      - 如果执行完这个命令后窗口一动不动, 摁一下回车😅
    - 选择默认的 `Vue 2`
      - ![](../image/Snipaste_2021-12-26_10-10-21.png)
    - 安装完成后, 进入安装的项目
      - ```shell
        cd vue_test
    - 启动项目
      - ```shel
        npm run serve
    - 进入 `cmd` 显示的网址
      - ![](../image/Snipaste_2021-12-26_10-20-01.png)
4. 项目结构
    - ![](../image/Snipaste_2021-12-26_10-25-26.png)
    - `babel.config.js`: 不需要修改
    - `package.json`: npm 项目都有的文件, 记录项目的一些信息
    - `package-lock.json`: 包版本文件. 里面记录了各个包和对应依赖的版本, 下载地址等, 方便再次安装到指定版本等.
    - `readme.md`: 项目说明
5. `src`
    - `main.js`: 该文件是整个项目的入口文件 
    - `assets`: 存放静态资源(图片等)文件夹
    - `components`: 所有自己写的组件都要放在这个目录
6. `public`: 打包后的文件
    - `favicon.ico`: 页签图标
    - `index.html`: 主页面
      - ```html
        <!-- 针对 IE 浏览器的特殊配置, 意在告诉IE浏览器以最高渲染级别渲染页面 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
      - ```html
        <!-- 开启移动端的理想视口 -->
        <meta name="viewport" content="width=device-width,initial-scale=1.0">

        



























      