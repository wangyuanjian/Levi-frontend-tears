# CSS变量 和 CSS3有关学习 20210401 It's NO JOKE!    
## CSS 变量
1. 什么是 CSS 变量
    - CSS 变量和正式的 CSS 属性（如`color`, `font-size`）没有什么不同，只是没有默认含义。所以 CSS 变量（CSS Variable）又叫做 **CSS 自定义属性（CSS Custom properties）**
2. 声明
    - 声明变量时，需要在变量前加两个连词线 **--**
    - ```css
        body {
            --foo: #7F583F;
            --bar-test: 100px;
            --external-link: "external link";
            --content-padding: 10px 20px;
            --Content-Padding: 10px 20px;
        }
    - 为什么使用两个连词线呢？因为 `$Foo` 被 `Sass` 用掉了，`@Foo` 被 `Less` 用掉了。
    - 各种值都可以用于 CSS 变量。
    - 变量名大小写敏感。
3. 读取变量：`var()` 函数
    - `var()` 可以有第二个参数，表示变量的默认值。如果变量不存在，就会使用默认值。
    - ```css
        .hello{
            background-color: skyblue;
            height: var(--bar-test);
            width: var(--lala, 100px);   
        }
    - 第二个参数不处理内部的逗号或空格，都视作参数的一部分。例如，下面的方式就会导致 div 的宽度设置无效，因为逗号被忽略，实际长度是 `100px 200px`
    - ```css 
        .hello {
            width: var(--lala, 100px, 200px);   
        }
    - `var()` 还可以用在变量声明时。
    - ```css   
        body {
            --foo: 10px;
            --bar: var(--foo);
        }
    - 变量值只能用作属性值，不能用作属性名。
    - ```css   
        body {
            --foo: 10px;
            var(--bar): 20px;  /* 无效 */
        }

4. 变量的类型
    - 如果变量值是一个字符串，可以与其他字符串拼接。
    - ```css   
        body {
            --foo: 'hello';
            --bar: var(--hello)'-world';  
        }
    - 如果变量值是数值，不能与数值单位直接连用。
        - ```css   
            body {
                --gap: 20;
                /* 无效 */
                margin-top: var(--gap)px;
            }
        - 上面代码中，数值与单位直接写在一起，这是无效的。必须使用`calc()` 函数，将它们连接。
        - ```css   
            body {
                --length: 20;
                width: calc(var(--length) * 1px);
            }
    - 如果变量值带有单位，就不能写成字符串。
5. 作用域
    - 同一个 CSS 变量，可以在多个选择器内声明。读取的时候，优先级最高的声明生效。这与 CSS 的"层叠"（cascade）规则是一致的。即，<h2>**变量的作用域就是它所在的选择器的有效范围。**</h2>
    - ```html
        <style>
            :root { --color: blue; }
            div { --color: green; }
            #alert { --color: red; }
            * { color: var(--color); }
        </style>

        <p>蓝色</p>
        <div>绿色</div>
        <div id="alert">红色</div>
        <div>啥色（GREEN）</div>
    - 上面代码中，三个选择器都声明了 `--color` 变量。不同元素读取这个变量的时候，会采用优先级最高的规则，因此三段文字的颜色是不一样的。
    -  ```css
        body {
            --foo: #7F583F;
        }
        .content {
            --bar: #F7EFD2;
        }
    - 变量 `--foo` 的作用域是 `body` 选择器的生效范围，`--bar` 的作用域是 `.content` 选择器的生效范围。由于这个原因，全局的变量通常放在根元素 `:root` 里面，确保任何选择器都可以读取它们。
6. 响应式布局
    - CSS 是动态的，页面的任何变化，都会导致采用的规则变化。利用这个特点，可以在响应式布局的 `media` 命令里面声明变量，使得不同的屏幕宽度有不同的变量值。
    - ```css
        body {
            --foo: red;
            --border-radius: 10px;
        }

        .hello{
            border-radius: var(--border-radius);
            background-color: var(--foo);
        }

        /*max-width: 400px 表示页面宽度<=400px时，下面设置的变量才有效*/
        @media only screen and (max-width: 400px) {
            body {
                --border-radius: 5px;
                --foo: green;
            }
        }
7. 兼容性处理
    - 对于不支持 CSS 变量的浏览器，可以采用下面的写法。
    - ```css
        a {
            color: #7F583F;
            color: var(--primary);
        }
    - 也可以使用 [`@support` 命令](https://www.jianshu.com/p/e16148fd66a0)进行检测。
    - ```css
        @supports ( (--a: 0)) {
            /* supported */
        }
        @supports ( not (--a: 0)) {
            /* not supported */
        }
8. JavaScript 操作
    - js 也可用于检测浏览器是否支持 CSS 变量。supports 函数的第一个参数为固有属性/自定义属性，第二个参数为值。返回一个 Boolean 值，用来校验浏览器是否支持一个给定的CSS特性。[详见链接](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS/supports)
    - ```javascript
        const isCssVariableSupport = window.CSS &&
            window.CSS.supports &&
            window.CSS.supports('color', 'red');
    - JavaScript 操作 CSS 变量的写法。下面的代码意思是，点击
    - ```html
        <button onclick="toOrange()">2 orange</button>
        function toOrange() {
            document.body.style.setProperty('--foo', 'orange')
        }
    - 意味着，JavaScript 可以将任意值存入样式表。下面是一个监听事件的例子，事件信息被存入 CSS 变量。下面的例子实现了红心❤始终追踪鼠标位置。
    - 这提供了 JavaScript 和 CSS 变量之间的通信方式。
    - ```html
        <div class="heart">❤</div>
    - ```javascript
        document.addEventListener('mousemove', (e) => {
            document.body.style.setProperty('--mouse-x', e.clientX);
            document.body.style.setProperty('--mouse-y', e.clientY);
        });
    - ```css
        body {
            --mouse-x: 0;
            --mouse-y: 0;
        }
        .heart {
            position: fixed;
            left: calc(var(--mouse-x) * 1px);
            top: calc(var(--mouse-y) * 1px);
            transform: translate(-50%, -50%);
        }

## CSS3
1. 
