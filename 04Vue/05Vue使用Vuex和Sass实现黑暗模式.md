# Vue 使用 Vuex 和 Sass 实现深色浅色主题切换

## 实现思路
- 需要了解
  - `CSS` 中的 `prefers-color-scheme` 媒体查询和 `CSS` 变量
  - 了解 `window.matchMedia() API`
- 思路
  - 判断系统目前是什么颜色主题, 并保存在 `Vuex` 的状态中
  - 引入全局浅色和深色的 `CSS` 变量并使用
  - 监听系统颜色主题的变化并响应做出调整
    - 如何响应? 主要是给 `<html>` 标签增加自定义属性从而改变 `CSS` 变量的目的
## 步骤
1. Vuex 部分
    - ```js
      export default new Vuex.Store({
        state: {
          theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        },
        mutations: {
          CHANGE_THEME(state, newTheme) {
            state.theme = newTheme;
            document.documentElement.setAttribute('data-theme', newTheme);
          }
        },
        actions: {
          changeTheme(context, newTheme) {
            context.commit('CHANGE_THEME', newTheme)
          }
        },
        modules: {
        },
      });
2. 创建全局样式文件
    - ```css
      :root {
        --a-text-color: #42b983;
        --bg-color: #fff;
        --text-color: #3498db;
      }
      :root[data-theme=dark] {
        --a-text-color: #e74c3c;
        --bg-color: #333;
        --text-color: #9b59b6;
      }
      body {
        background-color: var(--bg-color);
        color: var(--text-color);
      }
    - 💡关键部分在于切换 `<html>` 的 `data-theme` 这个自定义属性的值来使不同的 `CSS` 选择器生效进而实现主题切换的效果.
3. 在入口 `JS` 文件中引入全局样式文件并监听系统色彩主题的变化
    - ```js
      import './assets/css/global.scss'

      // 检测深浅主题
      let matchResult = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.setAttribute('data-theme', matchResult.matches ? 'dark' : 'light');
      matchResult.addEventListener('change', (e) => {
        // 如果匹配暗色主题
        if (e.matches) {
          store.dispatch('changeTheme', 'dark')
        } else {
          store.dispatch('changeTheme', 'light')
        }
      })
    - 💡注意首次也需要设置 `document.documentElement.setAttribute('data-theme', matchResult.matches ? 'dark' : 'light');` 不然初次访问页面没有效果
4. 然后在需要改变的地方使用定义的变量即可
    - ```css
      <style scoped lang="scss">
      .hello {
        background-color: var(--bg-color);
        color: var(--text-color);
      }
      a {
        color: var(--a-text-color);
      }
      </style>

![](../../image/Snipaste_2022-08-20_19-10-45.png)
![](../../image/Snipaste_2022-08-20_19-11-16.png)