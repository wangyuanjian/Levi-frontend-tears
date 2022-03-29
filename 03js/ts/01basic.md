# `typescript`

<!-- TOC -->

- [`typescript`](#typescript)
  - [简介](#简介)
    - [TypeScript 的特性](#typescript-的特性)
    - [安装 `TypeScript`](#安装-typescript)
  - [基础](#基础)
    - [原始数据类型](#原始数据类型)
    - [任意值(Any)](#任意值any)
    - [类型推断](#类型推断)
    - [联合类型(`Union Types`)](#联合类型union-types)
    - [接口(`interface`)](#接口interface)
    - [数组的类型](#数组的类型)
    - [函数的类型](#函数的类型)
    - [类型断言](#类型断言)
    - [声明文件](#声明文件)
    - [书写声明文件](#书写声明文件)
  - [参考](#参考)

<!-- /TOC -->

## 简介
1. 什么是 `typescript`
    - > Typed JavaScript at Any Scale 
    - 添加了类型系统的 `JavaScript`, 适用于任何规模的项目
### TypeScript 的特性
1. 类型系统
    - 从 `TypeScript` 的名字就可以看出来,「类型」是其最核心的特性.
    - 我们知道, `JavaScript` 是一门非常灵活的编程语言
      - 它没有类型约束, 一个变量可能初始化时是字符串, 过一会儿又被赋值为数字.
      - 由于隐式类型转换的存在, 有的变量的类型很难在运行前就确定.
      - 基于原型的面向对象编程, 使得原型上的属性或方法可以在运行时被修改.
      - 函数是 `JavaScript` 中的一等公民, 可以赋值给变量, 也可以当作参数或返回值.
    - 这种灵活性就像一把双刃剑，一方面使得 `JavaScript` 蓬勃发展, 无所不能. 从 `2013` 年开始就一直蝉联最普遍使用的编程语言排行榜冠军; 另一方面也使得它的代码质量参差不齐, 维护成本高, 运行时错误多.
    - 而 `TypeScript` 的类型系统，在很大程度上弥补了 `JavaScript` 的缺点。
2. `TypeScript` 是静态类型
    - 类型系统按照「类型检查的时机」来分类, 可以分为动态类型和静态类型.
      - `动态类型`是指在运行时才会进行类型检查, 这种语言的类型错误往往会导致运行时错误. `JavaScript` 是一门解释型语言, 没有编译阶段, 所以它是动态类型.
      - `静态类型`是指编译阶段就能确定每个变量的类型, 这种语言的类型错误往往会导致语法错误. `TypeScript` 在运行前需要先编译为 `JavaScript`, 而在编译阶段就会进行类型检查, 所以 `TypeScript` 是静态类型.
3. `TypeScript` 是弱类型
    - 类型系统按照「是否允许隐式类型转换」来分类, 可以分为强类型和弱类型
    - `TypeScript` 是完全兼容 `JavaScript` 的, 它不会修改 `JavaScript` 运行时的特性, 所以它们都是弱类型
    - 这样的类型系统体现了 `TypeScript` 的核心设计理念: `在完整保留 JavaScript 运行时行为的基础上，通过引入静态类型系统来提高代码的可维护性，减少可能出现的 bug`
4. 适用于任何规模
    - `TypeScript` 非常适用于大型项目——这是显而易见的, 类型系统可以为大型项目带来更高的可维护性, 以及更少的 `bug`
5. 与标准同步发展
    - `TypeScript` 的另一个重要的特性就是坚持与 `ECMAScript` 标准同步发展. 
    - `ECMAScript` 是 `JavaScript` 核心语法的标准, 自 `2015` 年起, 每年都会发布一个新版本, 包含一些新的语法
### 安装 `TypeScript`
1. 使用 `npm`
    - ```shell
      npm install -g typescript
    - 以上命令会在全局环境下安装 `tsc` 命令, 安装完成之后, 我们就可以在任何地方执行 `tsc` 命令了
2. 编译一个 `TypeScript` 文件
    - ```shell
      tsc hello.ts
    - 我们约定使用 `TypeScript` 编写的文件以 `.ts` 为后缀, 用 `TypeScript` 编写 `React` 时，以 `.tsx` 为后缀. 
    - 📕即便编译报错, 仍能生成对应的 `JavaScript` 文件
## 基础
### 原始数据类型
1. JavaScript 的类型分为两种: `原始数据类型` 和 `对象类型`
    - 原始数据类型包括: `布尔值`, `数字`, `字符串`, `null`, `undefined`, `Symbol`, `BigInt`
2. `布尔值`
    - 布尔值是最基础的数据类型, 在 `TypeScript` 中, 使用 `boolean` 定义布尔值类型: 
      - ```typescript
        let isDone: boolean = false;
    - 📕 注意, 使用构造函数 `Boolean` 创造的对象不是布尔值, 而是一个 `Boolean` 对象.
      - ```typescript
        let newBoolean: Boolean = new Boolean(true);
    - 直接调用 `Boolean` 哈数也可以返回一个 `boolean` 类型的值
      - ```typescript
        let newBoolean1: boolean = Boolean(0);
3. `数值`
    - 使用 `number` 定义数值类型
      - ```typescript
        let num1: number = 1; // 1
        let num2: number = 0xf; // 15
        let num3: number = 0b0010; // 2
        let num4: number = NaN; // NaN
        let num5: number = Infinity; // Infinity
4. `字符串`
    - 使用 `string` 定义字符串类型
      - ```typescript
        let str1: string = 'hello'; // 'hello'
        let world: string = `hello, ${str1}`; // 'hello, hello'
5. `空值(void)`
    - `JavaScript` 中没有空值的概念, 在 `TypeScript` 中可以使用 `void` 表示函数没有任何返回值
      - ```typescript
        function sayHello(): void {
          console.log('hello');
        }
    - 声明一个 `void` 类型的变量没有任何用, 只能将 `undefined` 或 `null` 值赋给它
      - ```typescript
        let x1: void = '1'; // Type 'string' is not assignable to type 'void'
        let x2: void = undefined;
        let x3: void = null;
6. `null` 和 `undefined`
    - 在 `TypeScript` 中, 使用 `null` 和 `undefined` 定义两个原始数据类型
    - 和 `void` 的区别是, `null` 和 `undefined` 是所有类型的子类型, 而 `void` 类型的变量不能赋值给其他类型
      - ```typescript
        a = 2;
        let x4: undefined = undefined;
        let x5: null = null;
        a = x4;
### 任意值(Any)
> 表示允许赋值为任意类型
1. 如果是普通类型, 在赋值过程中是不允许改变类型的. 但如果是 `any` 则被允许赋值为任意类型.
    - ```typescript
      let day: any = 7;
      day = 'Sunday';
2. 在 `any` 上访问任何属性或调用任何方法都是可以的. 
    - ```typescript
      day.getName();
      day.name;
3. 如果变量在声明的时候未指定其类型, 会被识别为 `any`
    - ```typescript
      let x6;
      x6 = '1';
      x6 = 1;
    - 📕注意, 不同于`let x6 = 1;`, 因为声明而且赋值就会有默认类型推断.
### 类型推断
1. 如果没有明确的指定类型, 那么 `TypeScript` 会依照类型推论 (`Type Inference`) 的规则推断出一个类型
    - ```typescript
      let x7 = 1;
      x7 = '1'; // Type 'string' is not assignable to type 'number'
### 联合类型(`Union Types`)
> 表示取值可以为多种类型中的一种
1. 联合类型使用 `|` 分隔每个类型
    - ```typescript
      let x8: string | number;
      x8 = 'eight';
      x8 = 8;
    - 上面的代码表示, 变量 `x8` 的类型只能是 `string` 或者 `number`, 不能是其他类型.
2. 当 `TypeScript` 不确定一个联合类型的变量到底是哪种类型时, 只能**访问联合类型中所有类型的公共属性或方法**.
    - ```typescript
      function getLength(param: string | number): string {
        return param.toString();
      }
3. 联合类型变量在被赋值时, 会根据类型推论的规则推断出一个类型.
    - ```typescript
      x8 = 8;
      console.log('x8"s length is ', x8.length);
      // Property 'length' does not exist on type 'number'
    - 即便其被赋值为某种联合类型中的某种类型, 但该变量仍然是联合类型
### 接口(`interface`)
> 使用接口 ( `Interfaces`) 来定义对象的类型
1. 什么是接口
    - 接口时对行为的抽象, 具体的行动需要类 (`class`) 实现 (`implement`)
    - `TypeScript` 中的接口是一个非常灵活的概念, 可以对类的一部分行为进行抽象, 也可用于对对象的形状进行描述.
2. 定义接口
    - ```typescript
      interface Person {
        name: string;
        age: number;
      }
    - 接口一般首字母大写.
    - 定义的变量属性不能比接口多也不能比接口少
    - ```typescript
      let tom: Person = {
        name: 'tom',
        age: 12,
      }
3. 可选属性
    - 定义接口时, 使用 `?` 表示该属性时可选的. 可选属性的含义是该属性可以不存在, 但这时仍然不允许添加未定义的属性
    - ```typescript
      interface Person {
        name: string;
        age: number;
        color?: string;
      }
4. `Index Signatures`
    - 有时我们并不能提前知道一个类型的所有属性, 但是却这道这些属性值的 `shape`, 这种情况下, 可以使用 `index signature` 描述可能的值
      - ```typescript
        interface StringArray {
          [index: number]: string;
        }

        const myArray: StringArray = undefined;
        const firstItem: string = myArray[0];
      - 上面代码的意思是, 当尝试使用 `number` 类型的数据来索引 `StringArray` 类型的数据时, 会返回 `string`
    - `index signature` 类型必须是 `string` 或者 `number`
    - `string` 类型的 `index signature` 强制要求所有属性必须匹配其返回类型.🤨
      - 这是因为 `string` 类型的索引既可以通过 `obj.propName` 调用, 也可以通过 `obj['propName']` 调用.
      - ```typescript
        interface NumberDictionary {
          [index: string]: number;
          name: string;
          // Property 'name' of type 'string' is not assignable to 'string' index type 'number'
        }
      - 所以下面的例子, 我们可以通过 `bd['name']` 的形式访问 `name` 属性, 也可以通过 `bd['hello']` 的形式访问 `index signature`. 如果这时的 `name` 属性值非 `number`, 就会导致 `obj['propName']` 返回两种类型的值, 从而无法决定究竟返回哪一种
      - 对比下面的例子. 就不会报错, 因为 `index signature` 是 `number index`, 通过 `bd[0]` 访问的话, `0` 是数字; 这和 `bd['name']` 明显区分开, 就不会存在两种返回类型了😀
      - ```typescript
        interface NumberDictionary1 {
          [index: number]: string;
          name: number;
        }
5. 只读属性
    - 只读属性只能首次给对象赋值时赋值, 之后的赋值都不可以
      - 如果给只读属性赋值, 那么在类型检查期间就会报错.
      - ```typescript
        interface ReadonlyPerson {
          readonly id: number;
        }

        let person1: ReadonlyPerson = {
          id: 111
        }
        person1.id = 222;
        // Cannot assign to 'id' because it is a read-only property.
    - `readonly` 并不意味着一个值是的内部是不可改的, 只意味着这个值本身是不可改的
      - ```typescript
        interface ReadonlyPerson {
          readonly id: number;
          readonly friend: Person;
        }

        let person1: ReadonlyPerson = {
          id: 111,
          friend: {
            name: 'tom',
            age: 12,
          }
        }
        person1.friend.age = 13; // ok
        person1.friend = {...} // 报错
### 数组的类型
1. `「类型 + 方括号」`表示法
    - ```typescript
      let fibonacci: number[] = [1, 1, 2, 3, 5];
    - 数组的项中不允许出现其他的类型
2. 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
    - ```typescript
      fibonacci.push('1'); // Argument of type 'string' is not assignable to parameter of type 'number'
3. 使用泛型表述数组
    - ```typescript
      let fibonacci2: Array<number> = [1, 1, 2, 3];
4. 使用接口表示数组
    - ```typescript
      interface NumberArray {
        [index: number]: number;
      }
      let na: NumberArray = [1, 1, 2, 3, 5];
    - 这种方式比前两种更复杂, 不过常用这种法师表示类数组
5. `any` 在数组中的应用
    - 用 `any` 表示数组中允许出现任意类型
    - ```typescript
      let list: any[] = ['apple', 999, { color: 'red' }];
### 函数的类型
1. 函数声明
    - 一个函数有输入和输出, 要在 `TypeScript` 中对其约束, 需要把输入和输出都考虑
    - ```typescript
      function sum(x: number, y: number): number {
        return x + y;
      }
    - 调用函数时, 输入多余的参数或者少输参数都是不可以的
    - ```typescript
      sum(1, 2, 3); // Expected 2 arguments, but got 3
      sum(1); // Expected 2 arguments, but got 1
2. 函数表达式
    - 如果定义类型, 表示该变量是函数? `=>`, 不同于 `ES6` 中的箭头表达式, `=>` 在 `TypeScript` 用来表示函数的定义, 其左边是用括号括起来的输入类型, 右边是输出类型
    - ```typescript
      let mySum: (a: number, b: number) => number = sum;
3. 用接口定义函数的形状
    - 使用接口定义函数
    - ```typescript
      interface SearchFunc {
        (source: string, subString: string): boolean;
      }

      let mySearch: SearchFunc;
      mySearch = function (source: string, subString: string): boolean {
        return source.indexOf(subString) !== -1;
      }
4. 可选参数
    - 使用 `?` 表示可选参数, 📕可选参数必须在必选参数的后面!!
    - ```typescript
      function buildName(firstName: string, lastName?: string): string {
        if (lastName) {
          return `${firstName} ${lastName}`;
        }
        return `${firstName}`;
      }
5. 参数默认值
    - `ES6` 中可以给参数增加默认值, `TypeScript` 会将添加了默认值的参数识别为可选参数, 此时, 就不受可选参数必须放在必选参数后面的限制了
    - ```typescript
      function buildName1(lastName: string = 'wong', firstName: string): string {
        if (lastName) {
          return `${firstName} ${lastName}`;
        }
        return `${firstName}`;
      }
      // 注意
      const result: string = buildName1(undefined, 'Levi'); // Levi wong
      buildName1('Wong', 'Levi'); // Levi Wong
6. 剩余参数
    - 在 `TypeScript` 中, 可以用数组类型定义 `rest` 参数. 📕注意 `rest` 参数必须是最后一个参数.
    - ```typescript
      function push1(from: any[], ...items: any[]): void {
        items.forEach((item) => {
          from.push(item);
        });
      }
      const from: any[] = [1, 2, 3];
      push1(from, 4, 5, 6)
7. 重载
    - 为了实现重载, 需要先两个或者更多的函数声明, 后面接着函数实现.
    - ```typescript
      function reverse(x: number): number;
      function reverse(x: string): string;
      function reverse(x: number | string): number | string {
        return 1;
      }
    - 看下面的例子. 函数实现是不能直接调用的!!!
    - ```typescript
      function fx(x: string): void;
      function fx(): void {
      }

      fx(); // Expected 1 arguments, but got 0
### 类型断言
> 可以用来手动指定一个值的类型.
1. 语法
    - ```js
      值 as 类型
      // 或
      <类型>值
2. 用途
    - 将一个联合类型断言为其中一个类型
      - ```typescript
        interface Cat {
          name: string;
          run(): void;
        }
        interface Fish {
          name: string;
          swim(): void;
        }
        function isFish(animal: Cat | Fish): boolean {
          if (typeof (animal as Fish).swim === 'function') {
            return true;
          }
          return false;
        }
    - 将一个父类断言为子类
      - ```typescript
        class MyError {
          code: number = -1;
        }
        class HttpError extends MyError {
          code: number = 0;
        }
        function isHttpError(error: MyError): boolean {
          if ((error as HttpError).code === 0) {
            return true;
          }
          return false;
        }
      - 上面的例子使用 `instanceof` 判断似乎更加合理, 但是如果 `HttpError` 是 `interface` 而不是 `class`, 就没法用 `instanceof`
    - 将任何一个类型断言为 `any`
      - 当我们引用一个在此类型上不存在的属性或方法时, 就会报错, 但有时我们就需要访问一个不存在的属性, 比如
      - ```typescript
        window.foo = 1;
      - 我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型, 因为在 `any` 类型的变量上, 访问任何属性都是允许的.
      - ```typescript
        (window as any).foo = 1;
      - `⚠`将一个变量断言为 `any` 可以说是解决 `TypeScript` 中类型问题的最后一个手段. 它极有可能掩盖了真正的类型错误, 所以如果不是非常确定, 就不要使用 `as any`
    - 将 `any` 断言为一个具体的类型
      - 在日常的开发中, 我们不可避免的需要处理 `any` 类型的变量, 它们可能是由于第三方库未能定义好自己的类型, 也有可能是历史遗留的或其他人编写的烂代码, 还可能是受到 `TypeScript` 类型系统的限制而无法精确定义类型的场景
      - 下面的例子讲函数值断言为特定类型
      - ```typescript
        function getCacheData(key: string): any {
          return (window as any).cache(key);
        }
        const tom1: Cat = getCacheData('tom') as Cat;
3. 断言的限制 (🙅‍ TODO)
    - 
4. 双重断言
    - 既然任何类型都可以断言为 `any`, 而且 `any` 又可以断言为任何类型, 那么任何类型都可以断言为任何类型的操作就是`双重断言`
    - 双重断言是可以的, 但是极不推荐. 除非迫不得已, 千万别用双重断言, 因为极有可能出错
    - ```typescript
      function testCat(cat: Cat) {
        return (cat as any as Fish);
      }
5. 类型断言 `vs` 类型转换
    - 类型断言只会影响 `TypeScript` 编译时的类型, 类型断言语句在编译结果中会被删除.
    - ```typescript
      function toBoolean(sth: any): boolean {
        return sth as boolean;
      }
    - 上面的代码会被编译为
    - ```typescript
      function toBoolean(sth) {
        return sth;
      }
    - 断言不是类型转换, 因为它不会真正影响变量的类型. 如果想要使用类型转换, 可以直接迪奥用类型转换
    - ```typescript
      function toBoolean1(sth: any): boolean {
        return Boolean(sth);
      }
6. 类型断言 vs 类型声明 (🙅‍ TODO)
    - 
7. 类型断言 vs 泛型 (🙅‍ TODO)
    - 
### 声明文件
1. 当使用第三方库时, 需要引用其声明文件才能获取对应的代码补全和接口提示等功能.
2. 声明语句
    - 加入我们要使用第三方库 `jQuery`, 常见方式就是在 `HTML` 中通过 `<script>` 标签引入 `jQuery`, 然后就可以使用全局变量 `$` 或 `jQuery` 了
    - ```typescript
      jQuery('#foo');
    - 但是编辑器并不知道 `$` 或 `jQuery` 是什么, 这时就需要使用 `declare var` 来定义其类型
    - ```typescript
      declare var jQuery: (selector: string) => any;
    - 上面的 `declare var` 并没有真正定义一个变量, 而是定义了全局变量 `jQuery` 的类型, 仅仅用于编译时检查, 在编译结果中会被删除. 
    - 除了 `declare var` 之外还有很多种声明语句
2. 声明文件
    - 通常将声明语句都放在一个单独的文件中, 这就是`声明文件`, 必须以 `.d.ts` 为后缀.
    - 第三方声明文件
      - `jQuery` 的声明文件社区已经帮忙定义好了, 可以直接下载使用. 但更推荐的时使用 `@types` 统一管理第三方库的声明文件
      - 使用 `@types` 的方式很简单, 直接 `npm` 安装对应的模块即可
      - ```shell
        npm install @types/jquery --save-dev
### 书写声明文件
1. 当第三方库没有提供声明文件时, 需要自己写声明文件. 不同场景下, 声明文件的内容盒使用方式会有区别.
2. 一个第三方库的使用场景主要有一下集中
    - `全局变量`: 通过 `<script>` 标签引入第三方库, 注入全局变量;
    - `npm包`: 通过 `import foo from 'foo'`, 符合 `ES6` 语法规范; 
    - `UMD包`: 既可以通过 `<script>` 引入, 又可以通过 `import` 引入;
    - `直接扩展全局变量`: 通过 `<script>` 标签引入后, 改变一个全局变量的结构; 
    - `在 npm 包或 UMD 库中扩展全局变量`: 引入 `npm` 包或 `UMD` 库后, 改变一个全局变量的结构; 
    - `模块插件`: 通过 `<script>` 或 `import` 引入后, 改变另一个模块的结构;
3. 全局变量
    - 使用全局变量的声明文件是, 如果是以 `npm install` 安装的, 不需要任何配置. 如果是将声明文件直接存放于当前项目, 建议放在对应的源码目录下, 如果没有生效, 可以检查 `tsconfig.json` 中的 `files`, `include` 和 `exclude` 配置
    - 全局变量的声明文件主要有一下几种语法
      - `declare var`: 声明全局变量
      - `declare function`: 声明全局方法
      - `declare class`: 声明全局类
      - `declare enum`: 声明全局枚举
      - `declare namespace`: 声明(含有子属性的)全局对象
      - `interface 和 type`: 声明全局类型
    - `declare var`
      - 就是一个全局变量的类型, 类似的有 `declare let` 和 `declare const`, 因为全局变量是禁止修改的常量, 所以大部分情况应该使用 `const` 而不是 `var`
      - 📕声明语句中只能定义类型, 切勿在声明语句中定义具体的实现.
      - ```typescript
        declare var jQuery: (selector: string) => any;
        jQuery('#foo');
    - `declare function`
      - 定义全局函数的类型. 因为 `jQuery` 是函数类型, 所以也可以定义为函数类型.
      - 📕注意语法!
      - ```typescript
        declare function jQuery(selector: string): any;
        jQuery('#Foo');
      - 支持函数重载.
      - ```typescript
        declare function jQuery(selector: string): any;
        declare function jQuery(domReadyCallback: () => any): any;
    - `declare class`
      - 定义全局变量类的类型
      - ```typescript
        declare class Animal {
          name: string;
          sayHi(): string;
          constructor(name);
        }
        let cat = new Animal('meow');
    - `declare enum`
      - 定义全局枚举类, 这样定义的枚举类也成为`外部枚举(Ambient Enums)`
      - ```typescript
        declare enum Directions {
          UP,
          RIGHT,
          DOWN,
          LEFT
        }
        let directions = [Directions.UP, Directions.DOWN];
    - `declare namespace`
      - `namespace` 是 `ts` 早期为了解决模块化而创造的关键字, 中文为 `命名空间`.
        - 早期还没有 `ES6` 的时候, `ts` 提供了一种模块化解决方案, 使用 `module` 关键字便是内部模块, 但由于后来 `ES6` 也有了 `module` 关键字, 所以 `ts` 使用了 `namespace` 代替 `module`
        - 📕现在已经不建议使用 `namespace`, `namespace` 被淘汰了. 但是在声明文件中, `declare namespace` 还是比较常用, 用来表示全局变量是一个对象, 包含许多子属性.
        - 📕注意在 `namespace` 中声明类型不再需要 `declare`
      - ```typescript
        declare namespace jQuery1 {
          function ajax(url: string, settings?: any): void;
          const name: string;
          class Event {

          }
          enum EventType {

          }
          // Statements are not allowed in ambient contexts.ts(1036)
          // age: number;
        }
      - 如果对象拥有深层层级, 则需要使用嵌套的 `namespace` 来声明深层的属性的类型.
      - ```typescript
        declare namespace jQuery1 {
          namespace fn {
            function extend(object: any): void;
          }
        }
      - `interface` 和 `type`
        - 除了全局变量, 又是希望一些类型能暴露出来, 在类型声明文件中, 可以直接使用 `interface` 或 `type` 声明一个全局的接口或类型, 如下面的 `AjaxSettings`
        - 但如果不像将其暴露, 可以把 `interface` 或 `type` 放在 `namespace` 中, 如下面的 `AjaxSettingsInside`
        - ```typescript
          interface AjaxSettings {
            method?: 'GET' | 'POST';
            data?: any;
          }
          declare namespace jQuery {
            interface AjaxSettingsInside {
              method?: 'GET' | 'POST';
              data?: any;
            }
            function ajax(url: string, settings?: AjaxSettings): void;
            function ajax1(url: string, settings?: AjaxSettingsInside): void;
          }
        - 但是当使用内部 `interface` 时, 需要加上 `jQuery.` 的前缀.
    - 加入 `jQuery` 既是一个函数, 又是一个对象, 拥有子鼠星, 可以组合多个声明语句, 这些声明语句会不冲突地合并起来.
      - ```typescript
        declare function jQuery(selector: string): any;
        jQuery('#Foo');
        declare namespace jQuery {
          interface AjaxSettingsInside {
            method?: 'GET' | 'POST';
            data?: any;
          }
          function ajax1(url: string, settings?: AjaxSettingsInside): void;
        }
4. `npm` 包
    - 通过 `import foo from 'foo'` 导入一个 `npm` 包时符合 `ES6` 模块规范的. 一个 `npm` 包的声明文件可能存在两个地方
      - 与该 `npm` 包绑定在一起. 判断依据是 `package.json` 中有 `types` 字段或者有一个 `index.d.ts` 的声明文件. 这种模式不需要额外安装其他包, 最为推荐.
      - 发布到 `@types` 中, 我们只需尝试通过命令 `npm install @types/foo --save-dev` 安装对应的 `@types` 包就知道是否存在该声明文件. 这种模式一般是由于 `npm` 包的维护者没有提供声明文件, 所有只能由其他人将声明文件发布到 `@types` 中
    - 假如以上两种方式都没有找到对应的声明文件, 那么就需要自己写声明文件, 由于是通过 `import` 导入的模块, 所以声明文件存放的位置也有约束. 一般有两种方案
      - 创建 `node_modules/@types/foo/index.d.ts` 文件, 存放 `foo` 模块的声明文件. 这种方式不需要额外的匹配值, 但是 `node_modules` 目录不稳定, 代码没有被保存, 不建议使用, 一般只用作临时测试
      - 创建 `types` 目录, 专门管理自己写的声明文件, 将 `foo` 的声明文件放到 `types/foo/index.d.ts` 中, 这种方式需要配置 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段.
      - ```
        /path/to/project
        ├── src
        |  └── index.ts
        ├── types
        |  └── foo
        |     └── index.d.ts
        └── tsconfig.json
      - `tsconfig.json` 中的内容
      - ```json
        {
          "compilerOptions": {
            "module": "commonjs",
            "baseUrl": "./",
            "paths": {
                "*": ["types/*"]
            }
          }
        }
    - `npm` 包的声明文件主要有一下几种语法
      - `export`: 导出变量
      - `export namespace`: 导出对象
      - `export default`: `ES6` 默认导出
      - `export = `: `commonJS` 导出模块 
    - `export`
      - `npm` 包的声明文件与全局变量的声明文件有很大不同. 在 `npm` 包的声明文件中, 使用 `declare` 只会在当前文件中声明一个`局部变量`, 只有同时使用 `export` 导出, 然后使用方 `import` 导入后, 才会应用到这些类型声明.
      - `export` 的语法与普通 `ts` 中的语法类型, 区别仅在于声明问家中禁止定义具体的实现.
      - ```typescript
        export const name: string;
        export function finName1(name: string): string;

        // export 和 declare 同时使用 
        declare const name1: string;
        declare class Animal {
          name: string;
          age: number;
        }
        export { Animal, name1 };
      - 对应的导入和使用模块应该是这样
      - ```typescript
        import { name1, Animal } from 'foo';
      - 📕与全局变量的声明文件类似, `interface` 前是不需要 `declare` 的
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
## 参考
1. [TypeScript 入门教程](http://ts.xcatliu.com/basics/primitive-data-types.html)


- ```typescript