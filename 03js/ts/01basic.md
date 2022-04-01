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
    - [内置对象](#内置对象)
  - [进阶](#进阶)
    - [type](#type)
    - [元组](#元组)
    - [枚举](#枚举)
    - [类](#类)
      - [类成员](#类成员)
      - [方法](#方法)
      - [类继承](#类继承)
      - [成员可见性](#成员可见性)
      - [静态成员](#静态成员)
      - [泛型类](#泛型类)
    - [类与接口](#类与接口)
    - [泛型](#泛型)
    - [声明合并](#声明合并)
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
        |    └── index.ts
        ├── types
        |    └── foo
        |         └── index.d.ts
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
    - `export namespace`
      - 用来导出一个拥有子属性的对象
      - ```typescript
        export namespace foo1 {
          const name: string;
          namespace bar {
            function work(): string;
          }
        }
        
        declare namespace foo2 {
          const name: string;
          namespace bar {
            function work(): string;
          }
        }
        export { foo2 };
      - 对应的导入和使用模块应该是这样
      - ```typescript
        import { foo1, foo2 } from 'foo';
    - `export default`
      - 在 `ES6` 模块中, 使用 `export default` 导出一个默认值
      - ```typescript
        export default function foo3(): string;
      - ```typescript
        import foo3 from 'foo';
      - 📕注意, 只有 `function`, `class`, `interface` 可以直接默认导出, 其他的变量需要先定义再默认导出
      - 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面
    - `export = `
      - 在 `commonJS` 规范中, 使用下面的方式导出一个模块
      - ```typescript
        // 整体导出
        module.exports = foo;
        // 单个导出
        exports.bar = bar;
      - `ts` 中针对这种模块导出, 有很多对应的方式导入
        - `方式1`: `const ... = require` 
        - ```typescript
          // 整体导入
          const foo = require('foo');
          // 单个导入
          const bar = require('foo').bar;
        - `方式2`: `import ... from`
        - ```typescript
          // 整体导入
          import * as foo from 'foo';
          // 单个导入
          import { bar } from 'foo';
        - `方式3`: `import ... require`. 这也是 `ts` 官方推荐的方式.
        - ```typescript
          // 整体导入
          import foo = require('foo');
          // 单个导入
          import bar = foo.bar;
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript
### 内置对象
1. `JavaScript` 中有很多内置对象, 它们可以在 `TypeScript` 中可以被当作定义好了的类型
2. `ECMAScript` 的内置对象
    - 包括 `Boolean`, `Date`, `Date`, `RegExp` 等.
    - ```typescript
      let b: Boolean = new Boolean(1);
      let d: Date = new Date();
      let r: RegExp = /[a-z]/g;
3. `DOM` 和 `BOM` 的内置对象
    - 包括 `Document`, `Element`, `Event` 等.
    - ```typescript
      let allDiv: NodeList = document.querySelectorAll('div');
      document.addEventListener('click', (e: MouseEvent) => {
        // ...
      });
4. `TypeScript` 核心库的定义文件
    - 定义了苏哦有浏览器环境需要用到的类型, 并且是预置在 `TypeScript` 中的. 当使用 `Math.pow()` 等常用方法时, `TypeScript` 已经帮我们做了很多类型判断的工作.
    - ```typescript
      Math.pow(10, '2');
      // Argument of type 'string' is not assignable to parameter of type 'number'
    - 📕注意, `TypeScript` 核心库的定义中不包含 `Node.js` 部分
5. 用 `TypeScript` 写 `Node.js`
    - 需要引入第三方声明文件
    - ```shell
      npm install @types/node --save-dev
## 进阶
### type
1. 类型别名
    - 用来给一个类型起个新名字. 类型别名常用于联合类型
    - ``` typescript
      type Name = string;
      type NameResolver = () => string;
      type NameOrResolver = Name | NameResolver;
      function getName(n: NameOrResolver): string {
        if (typeof n === 'string') {
          return n;
        }
        return n();
      }
2. 字面量
    - 约束取值只能是某几个值中的一个. 当然不只是字符串字面量, 还可能使其他类型字面量
    - ```typescript
      type EventNames = 'click' | 'scroll' | 'mousemove';
      function handleEvent(element: Element, event: EventNames): void {
        // ...
      }
### 元组
1. 元组是另一种类型的数组, 因为元组已经明确一共有多少个元素, 并且元组每个位置的元素类型也已经确定了.
    - 下面的代码就定义了一个元组, 这个元组只有 `2` 个元素, 索引为 `0` 的元素必须是 `string` 类型, 索引为 `1` 的元素必须是 `number` 类型
    - ```typescript
      type StringNumberPair = [string, number];
      let pair: StringNumberPair = ['tom', 185];
    - 访问一个已知索引的元组时, 会得到正确的类型. 当然如果索引超过返回会报错. 也可以只赋值其中一项
    - 直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
    - ```typescript
      function doSomething(pair: [string, number]): void {
        const name: string = pair[0];
        const height: number = pair[1];
        const xx = pair[2];
        // Tuple type '[string, number]' of length '2'  has no element at index '2'
        pair[1] -= 5;
        pair = ['jerry', 175];
      }
      doSomething(pair);
2. 使用s `解构赋值` 语法解构元组
    - ```typescript
      let pair: StringNumberPair = ['tom', 185];
      const [name1, height1] = pair;
3. 可选的元素类型 `?`
    - 只需在属性后加上 `?` 即可表示元组中该属性是可选的.
    - 可选的元组属性必须放在元组的最后一位, 并且影响元组的 `length` 属性
    - ```typescript
      type Either2Or3 = [number, number, number?];
      function setCoordinate(coord: Either2Or3): void {
        const [x, y, z] = coord;
        // z: number | undefined
        console.log(`has ${coord.length} dimensions`);
      }
      const coord1: Either2Or3 = [1, 2];
      const coord2: Either2Or3 = [1, 2, 3];
      setCoordinate(coord1); // 2
      setCoordinate(coord2); // 3
4. 带有 `rest` 参数的元组
    - 元组可以有 `rest` 参数, 但参数必须是数组或元组类型
    - ```typescript
      type StringNumberBooleans = [string, number, ...boolean[]];
      type StringBooleansNumber1 = [string, ...boolean[], number];
      type BooleansStringNumber = [...boolean[], string, number];

      const hello: StringNumberBooleans = ['hello', 1];
      const beautiful: StringNumberBooleans = ['beautiful', 1, true];
      const world: StringNumberBooleans = ['world', 1, true, false, true];
    - 上面代码第二个元组, 描述了元组的第一个元素为 `string` 类型, 然后是任意个数的 `boolean` 类型, 最后的元素为 `number` 类型
    - 带有可选参数和 `rest` 参数的元组在下面的场景非常有用, 即使用元组和函数的参数列表对应
    - ```typescript
      function readButtonInput(...args: [string, number, ...boolean[]]): void {
        const [name, version, ...input] = args;
      }
    - 上面的代码基本上等同于下面的代码
    - ```typescript
      function readButtonInput1(name: string, version: number, ...input: boolean[]): void {

      }
    - 这很方便, 其实我们可以将所有参数定义为一个新的 `interface`, 但是使用元组省去了定义变量的步骤
5. 只读元组
    - 使用 `readonly` 表示元组只读. 下面的例子, 整个替换元素是可以的, 但是没办法通过索引赋值.
    - ```typescript
      function setInfo(pair: readonly [string, number]) {
        pair = ['word', 1];
        pair[0] = 'tom';
        // Cannot assign to '0' because it is a read-only property.
      }
      setInfo(['hello', 2]);
### 枚举
1. 枚举允许开发者定义一组命名常量. 使用枚举可以提高文档可读性. `TypeScript` 提供了数字枚举和字符串枚举
2. 数字枚举
    - 定义枚举使用 `enum` 关键字
    - ```typescript
      enum Direction {
        Up = 1,
        Down,
        Left,
        Right
      }
    - 上面的枚举中, `Up` 的初始值为 `1`. 跟在 `Up` 后买你的元素自动从 `1` 增加. 即 `Down` 的值为 `2`, `Left` 的值为 `3`, `Right` 的值为 `4`. 
    - 如果不进行任何初始值, 那么 `Up` 的值从 `0` 开始.
    - 使用枚举很简单, 
    - ```typescript
      enum UserResponse {
        No = 0,
        Yes = 1,
      }
      function respond(recipient: string, message: UserResponse): void {
        //...
      }
      respond('I agree with you.', UserResponse.Yes);
    - 数字枚举中, 没有初始化的成员要么排在第一位, 要么跟在有`数字常量`或其他常量枚举成员的后面, 下面的代码报错
    - ```typescript
      function getSomeValue(): number {
        return 1;
      }
      enum E {
        A = getSomeValue(),
        B, // Enum member must have initializer
      }
3. 字符串枚举
    - 字符串枚举要求, 每个成员必须是字符串字面量常量初始化, 或者另一个字符串枚举值.
    - ```typescript
      enum Person {
        M = "man",
        W = "woman"
      }
4. 异质枚举(`Heterogeneous enums`)
    - 技术上枚举可以混用 `string` 和 `number` 成员. 但是这样做的目的却不清楚, 所以官网教程不建议这么做.
    - ```typescript
      enum WhatIsThisEnum {
        No = 0,
        Yes = "YES"
      }
5. 常量成员和计算成员
    - 每一个枚举成员都有一个值与之关联, 这个值要么是常量要么是计算值. 如果一个枚举成员满足一下几个条件中的一个, 即为常量成员. 非常量成员的都是计算成员
      - `情况1`: 是枚举的第一个成员, 并且没有初值赋值, 这种情况下其值为 `0`
      - ```typescript
        // E.X is constant
        enum E {
          X,
        }
      - `情况2`: 该成员没有初始赋值并且其前面的成员是数字类型的常量. 这种情况下, 该成员的值是其前面成员的值 `+1`
      - ```typescript
        // E1 和 E2 的所有成员都是常量
        enum E1 {
          X,
          Y,
          Z
        }
        enum E2 {
          X = 1,
          Y,
          Z
        }
      - `情况3`: 成员被初始化为一个`常量枚举表达式`. 常量枚举表达式是 `TypeScript` 表达式的子集, 可以在编译阶段得到表达式的值. 具体哪些是`常量枚举表达式`, [👉可以查看官网](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members)
      - ```typescript
        enum FileAccess {
          // 常量成员
          None,
          Read = 1 << 1,
          Write = 1 << 2,
          ReadWrite = Read | Write,
          // 计算成员
          G = "123".length
        }
6. 联合枚举和枚举成员类型
    - 有一种特殊的常量枚举成员, 这类成员变量不需要计算: `字面量枚举成员`. `字面量枚举成员` 要么没有初始值, 要么初始值为
      - `字符串字面量`:, 如 `foo`, `bar` 
      - `数字字面量`: 如 `1`, `100`
      - `带有一元减号运算符的任何数字字面量`: 如 `-1`, `-100` 
    - 当枚举 **`所有`** 成员都是 `字面量枚举成员`, 一些特殊的用法出现了
    - `用法1`: 枚举的成员变成了类型!!! 
      - 例如, 可以指定某些接口成员的值只能为枚举成员
      - ```typescript
        enum ShapeKind {
          Circle,
          Square
        }
        interface Circle {
          kind: ShapeKind.Circle;
          radius: number;
        }
        let c2: Circle = {
          kind: ShapeKind.Circle,
          radius: 3.14
        }
    - `用法2`: The other change is that enum types themselves effectively become a union of each enum member. With union enums, the type system is able to leverage the fact that it knows the exact set of values that exist in the enum itself. Because of that, TypeScript can catch bugs where we might be comparing values incorrectly. 
      - ```typescript
        enum E3 {
        Foo,
        Bar,
      }
      function f(x: E3) {
        // if (x !== 0 || x !== 1)
        if (x !== E3.Foo || x !== E3.Bar) {
          console.log('whoops');
          return
        }
        // 报错  
        // This condition will always return 'true' since the types 'E3.Foo' and 'E3.Bar' have no overlap
        console.log('got it');
      }
      - 上面的例子中, 首先检查 `x` 是否为 `E3.Foo`. 如果不是, 那么根据 `||` 的短路效应, 执行 `if` 块中的内容. 如果是, 那么 `x !== E3.Bar` 成立, 无论如何都会返回 `true`
7. 运行时枚举
    - 枚举在运行时是真实存在的对象
    - ```typescript
      enum E4 {
        X,
        Y,
        Z,
      }

      function f1(obj: {X: number}) {
        console.log('obj is ', obj);
        // obj is  { '0': 'X', '1': 'Y', '2': 'Z', X: 0, Y: 1, Z: 2 }
        return obj.X;
      }
      const result = f1(E4);
      console.log('result is', result);
      // result is 0
8. 编译时枚举
    - `keyof` 顾名思义就是获取某种类型的所有键, 其返回类型是联合类型. 其多应用于第三方库的源码
    - 使用 `keyof typeof` 可以获取枚举所有 `key` 作为字符串的类型
    - ```typescript
      /**
      * LogLevlStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
      */
      type LogLevlStrings = keyof typeof LogLevel;

      function printImportant(key: LogLevlStrings, message: string): void {
        const num = LogLevel[key];
        if (num <= LogLevel.WARN) {
          console.log('log level key is: ', key);
          console.log('log level value is: ', num);
          console.log('log level message is: ', message);
        }
      }
      printImportant('ERROR', "something bad just happened.")
9. 反向映射(`reverse mapping`)
    - `数字枚举`成员可以从枚举值反向映射为枚举名. 
    - 📕只有数字枚举有, 字符串枚举没有!!!
    - ```typescript
      enum Age {
        YOUNG,
        OLD
      }
      let a = Age.YOUNG; // 0
      let ageNumber = Age[a]; // 'YOUNG'
    - 枚举被编译为下面的代码, 代码中枚举被编译为双向存储的对象, 既存储了 `name` 到 `value`, 又存储了 `value` 到 `name`
    - ```typescript
      (function (Age) {
          Age[Age["YOUNG"] = 0] = "YOUNG";
          Age[Age["OLD"] = 1] = "OLD";
      })(Age || (Age = {}));
10. 常量枚举
    - 使用 `const` 即可定义常量枚举
    - ```typescript
      const enum Alphabet {
        A = 1,
        B = A * 2
      }
    - 常量枚举只能使用常量枚举表达式. 和通常枚举不同的是, 常量枚举在编译后都被移除了. 常量枚举不能有计算属性.
11. 外部枚举(`Ambient enums`)
    - 外部枚举用于描述已经存在的枚举类型
    - ```typescript
      declare enum Enum1 {
        A = 1,
        B,
        C = 2
      }
    - 外部枚举和非外部枚举的一个重要不同是. 常规枚举的成员, 如果没有初始值但是这个成员的前一个成员是常量, 那么这个成员同样被当作常量. 相反, 外部枚举的成员如果没有初始值, 将会被当作计算成员.
### 类
1. 最简单的类
    - ```typescript
      class Point {}
#### 类成员
1. 域(`Field`)
    - 一个域声明创建了一个`公共的可写的`属性(`property`)
    - 其中类型可以被省略, 比如下面的 `y`, 但是省略就默认为 `any`
    - ```typescript
      class Point1 {
        x: number;
        y;
      }

      const pt = new Point1();
      pt.x = 100;
      pt.y = 100;
    - 域也可以初始化, 会在类实例化时自动初始化. 并且会根据初始化值自动推断域的类型
    - ```typescript
      class Point1 {
        x: number;
        y;
        z = 0;
      }
    - `!`: 在 `TypeScript` 中, 如果打算通过构造函数以外的方式初始化成员, 可以使用`绝对赋值断言操作符(definite assignment assertion operator)` `!`
    - ```typescript
      class Point2 {
        x!: number;
      }
2. 只读 `readonly`
    - 域可以在其前加上 `readonly` 修饰符. 这可以阻止其在 **`构造函数之外`** 的赋值.
    - ```typescript
      class Greeter {
        readonly name: string = "word"

        constructor(othername?: string) {
          if (othername !== undefined) {
            this.name = othername;
          }
        }
        err() {
          this.name = 'a';
          // Cannot assign to 'name' because it is a read-only property
        }
      }

      new Greeter().name = 'n';
3. 构造函数(`Constructors`)
    - 构造函数可以重载, 可以有默认参数值. 但是
      - 构造函数不能有泛型类型参数
      - 构造函数没有返回类型. 它返回的就是类的实例, 既对象.
    - ```typescript
      class Point3 {
        x: number;
        y: number;

        constructor(x: number, y: number);
        constructor(x: number);
        constructor(xs: number, ys: number = 0) {

        }
      }
    - 在`子类`中, 构造函数调用 `this` 之前必须先调用 `super`
    - ```typescript
      class Base {
        k = 4;
      }
      class Derived extends Base {
        constructor() {
          super();
          this.k = 6;
        }
      }
#### 方法
1. 方法就是类的函数属性
    - 在方法体中, 强势使用 `this` 来访问域或方法.
    - ```typescript
      class Point4 {
        x: number;
        y: number;

        area(): number {
          return this.x * this.y
        }

        scale(n: number): void {
          this.x *= n;
          this.y *= n;
          this.area();
        }
      }
2. 访问器(`Accessors`)
    - ```typescript
      class C {
        _length = 0;
        get length() {
          return this._length;
        }
        set length(value: number) {
          this._length = value;
        }
      }
    - `TypeScript` 对访问有一些特别的规则
      - 如果只有 `getter` 没有 `setter`, 那么这个属性默认`只读`
      - 如果 `setter` 的参数类型没有指定, 那么将会从 `getter` 的返回类型推断
      - `getter` 和 `setter` 必须具有相同的访问可见性
    - 从 `TypeScript 4.3` 开始, `getter` 和 `setter` 可以有不同的类型
    - ```typescript
      class Thing {
        _size = 0;
        get size(): number {
          return this._size;
        }
        set size(value: string | number | boolean) {
          let num = Number(value);

          if (!Number.isFinite(num)) {
            this._size = 0;
            return;
          }

          this._size = num;
        }
      }
#### 类继承
1. `implements`
    - 使用 `implements` 检查一个类是否满足特定的 `interface`. 当然可以实现不止一个接口
    - ```typescript
      interface Pingable {
        ping(): void;
      }
      interface Pongable {
        pang(): void;
      }
      class Sonar implements Pingable, Pongable {
        ping(): void {
          console.log('ping');
        }
        pang(): void {
          console.log('pang');
        }
      }
    - `implements` 并没有改变 `class` 或者 `class` 中的 方法本身.
    - ```typescript
      interface Checkable {
        check(s: string): boolean;
      }

      class NumberCheck implements Checkable {
        // Parameter 's' implicitly has an 'any' type
        check(s): boolean {
          // 因为any上调用任何方法都不会报错, 所以这里没有报错
          return s.toLowercase() === 'ok';
        }
      }
      new NumberCheck().check(1);
    - 上面的例子, 我们可能期望 `s` 的类型受 `s: string` 的影响, 但是没有. 下面的例子同样, 如果 `interface` 带有可选属性, 那么类并不会创建这个属性.
    - ```typescript
      interface A {
        x: number;
        y?: number;
      }
      class C1 implements A {
        x = 0;
      }
      const c = new C1();
      c.y = 10; // Property 'y' does not exist on type 'C1'
2. `extends`
    - 类可以从基类继承, 子类拥有父类所有的方法和属性.
    - ```typescript
      class Animal {
        move() {
          console.log('moving');
        }
      }

      class Dog extends Animal {
        woof(times: number) {
          for (let index = 0; index < times; index++) {
            console.log('woofs');      
          }
        }
      }
      const d = new Dog();
      d.move();
      d.woof(3);
3. 方法重写
    - 子类可以重写父类的域或属性. `TypeScript` 强制子类总是父类的一个子类型
    - ```typescript
      class Base1 {
        greet() {
          console.log('hello, World.');
        }
      }
      class Derived1 extends Base1 {
        greet(name?: string): void {
          if (name === undefined) {
            super.greet();
            return;
          }
          console.log(`hello, ${name.toUpperCase()}`);
        }
      }

      const d1 = new Derived1();
      d1.greet();
      d1.greet('John');
    - 可以永远使用子类实例指向父类的引用.
    - ```typescript
      const d1: Derived1 = new Derived1();
      const d2: Base1 = new Derived1();
    - 📕注意上面例子子类中, `greet(name?: string)` 使用了可选参数 `?`, 如果取消可选, 那么编译报错. 所以子类必须遵守父类的约定 `contract`
    - ```typescript
      class Derived1 extends Base1 {
        // Property 'greet' in type 'Derived1' is not assignable to the same property in base type 'Base1'.
        greet(name: string): void {
          if (name === undefined) {
            super.greet();
            return;
          }
          console.log(`hello, ${name.toUpperCase()}`);
        }
      }
4. 初始化顺序
    - 类初始化顺序
      - 初始化基类的域
      - 执行基类的构造函数
      - 初始化子类的域
      - 执行子类的构造函数
    - ```typescript
      class Base2 {
        name: string = "base";
        constructor() {
          console.log('base name is ' + this.name);
        }
      }
      class Derived2 extends Base2 {
        name = "derived";
      }
      new Derived2();
      // base name is base
#### 成员可见性
> 控制是否特定的方法或属性在 `class` 外是可见的.
1. `public`
    - 类成员默认可见性为 `public`. 表示该成员在代码任意位置都可见. 所以一般省略 `public` 不写.
    - ```typescript
      class Greeter1 {
        public greet() {
          console.log('hi');
        }
      }
      new Greeter1().greet();
2. `protected`
    - `protected` 成员只在类和该类的子类中可见. 是没有办法通过子类的实例调用的.
    - ```typescript
      class Greeter2 {
        public greet() {
          console.log(`hello, ` + this.getName());
        }
        protected getName(): string {
          return 'hi';
        }
      }
      class SpecialGreeter extends Greeter2 {
        public howdy() {
          console.log('howdy, ' + this.getName());
        }
      }
      const g1 = new SpecialGreeter();
      g1.greet(); // ok
      // g1.getName();
      // Property 'getName' is protected and only accessible within class 'Greeter2' and its subclasses.
3. 暴露 `protected` 成员
    - 子类需要遵从父类的约定, 但是子类仍然可以将父类的 `protected` 成员变成 `public`
    - ```typescript
      class Base3 {
        protected m = 10;
      }
      class Derived3 extends Base3 {
        m = 15;
      }
      const d3 = new Derived3();
      console.log('d3.m is', d3.m); // 15
4. 跨层级 `protected` 访问
    - 不同的面向对象语言在是否可以通过父类实例访问父类 `protected` 成员上看法不一. `Java` 认为是合法的, 但是 `C#` 和 `C++` 认为是不和反的. `TypeScript` 同样认为不合法.
    - ```typescript
      class Base4 {
        protected x: number = 1;
      }
      class Derived4A extends Base4 {
        protected x: number = 5;
      }
      class Derived4B extends Base4 {
        f1(other: Derived4B) {
          other.x = 10;
        }
        f2(other: Base4) {
          // other.x = 10;
          // 报错
        }
      }
5. `private`
    - 只能在当前类中访问
    - ```typescript
      class Base5 {
        private x = 0;
      }
      const b5 = new Base5();
      // b5.x = 1;
      // Property 'x' is private and only accessible within class 'Base5'
      class Derived5 extends Base5 {
        showX() {
          // console.log(this.x);
        }
      }
    - 子类中也无法提高 `private` 成员的可见性
    - ```typescript
      class Base5 {
        private x = 0;
      }
      class Derived6 extends Base5 {
        x = 1;
        // Class 'Derived6' incorrectly extends base class 'Base5'.
      }
6. 跨实例的 `private` 访问
    - 不同面向对象语言对于同一个类的不同实例是否能访问互相的 `priavte` 成员看法不同, `Java`, `C#` 允许, 但是 `Ruby` 不允许. `TypeScript` 允许跨实例的 `private` 成员访问.
    - ```typescript
      class A1 {
        private x = 10;
        public sameAs(other: A1) {
          // no error
          return other.x === this.x;
        }
      }
#### 静态成员
1. 静态成员并不和类的实例关联. 静态会员也有 `public`, `protected` 和 `private` 的可见性
    - ```typescript
      class MyClass {
        static x = 0;
        private static y = 0;
        static printX() {
          console.log(MyClass.x);
        }
      }
      // Property 'y' is private and only accessible within class 'MyClass'
      console.log(MyClass.y);
    - 静态成员也可以被继承
    - ```typescript
      class English extends MyClass {
        z = English.x;
      }
2. 特殊的静态成员名
    - 重写 `Function` 原型的属性既不安全也不可能, 因为类自身就是可以用 `new` 调用的函数. 因此, 像 `name`, `length` 或 `call` 等都不能作为合法的静态成员名
    - ```typescript
      class S {
        // Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.
        static name = "1";
      }
3. 静态块
    - 静态块是允许在其范围内写一系列能访问 `private` 域的代码块. 我们可以在静态块中进行初始化的操作.
    - ```typescript
      class Foo {
        static count = 0;
        static {
          Foo.count = 1;
          console.log('base class staic'); // 1
        }
        constructor() {
          console.log('base class constructor'); // 3
        }
      }
    - 下面看看加上静态块之后的代码初始化执行顺序
    - ```typescript
      class Bar extends Foo {
        static {
          console.log('derived class static') // 2
        }
        constructor() {
          super();
          console.log('derived class constructor'); // 4
        }
      }
      new Bar();
    - ![](../../../image/Snipaste_2022-04-01_14-27-51.png)
#### 泛型类
1. 当一个泛型类使用 `new` 实例化时, 其类型参数将会从推断
    - ```typescript
      class Box<Type> {
        contents: Type;
        constructor(value: Type) {
          this.contents = value;
        }
      }
      const b = new Box('hello');
2. 泛型静态成员
    - 泛型类中的静态成员永远不能指向类的泛型. 因为运行时, 只有一个 `Box.defaultValue` 属性, 如果设置 `Box<string>.defaultValue` 将会改变 `Box<number>.defaultValue`, 这是不可能的.
    - ```typescript
      class Box<Type> {
        // Static members cannot reference class type parameters.
        static defaultValue: Type;
        contents: Type;
        constructor(value: Type) {
          this.contents = value;
        }
      }
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
### 类与接口
### 泛型
### 声明合并
    - ```typescript
## 参考
1. [TypeScript 入门教程](http://ts.xcatliu.com/basics/primitive-data-types.html)


- ```typescript