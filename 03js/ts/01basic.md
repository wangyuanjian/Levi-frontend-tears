# `typescript`

<!-- TOC -->

- [`typescript`](#typescript)
  - [简介](#简介)
    - [TypeScript 的特性](#typescript-的特性)
    - [安装 `TypeScript`](#安装-typescript)
  - [基础](#基础)
    - [`tsconfig.json`](#tsconfigjson)
    - [原始数据类型](#原始数据类型)
    - [任意值(Any)](#任意值any)
    - [类型推断](#类型推断)
    - [联合类型(`Union Types`)](#联合类型union-types)
    - [接口(`interface`)](#接口interface)
      - [泛型对象类型](#泛型对象类型)
    - [数组的类型](#数组的类型)
    - [函数的类型](#函数的类型)
    - [类型断言](#类型断言)
    - [声明文件](#声明文件)
    - [书写声明文件](#书写声明文件)
    - [内置对象](#内置对象)
  - [进阶](#进阶)
    - [type](#type)
    - [字面量类型](#字面量类型)
    - [元组](#元组)
    - [枚举](#枚举)
      - [属性修饰符](#属性修饰符)
    - [类](#类)
      - [类成员](#类成员)
      - [方法](#方法)
      - [类继承](#类继承)
      - [成员可见性](#成员可见性)
      - [静态成员](#静态成员)
      - [泛型类](#泛型类)
      - [`this`](#this)
      - [抽象类和抽象方法](#抽象类和抽象方法)
      - [其他](#其他)
    - [narrowing](#narrowing)
    - [typeof](#typeof)
    - [函数](#函数)
    - [函数类型表达式](#函数类型表达式)
      - [泛型函数(`Generic Function`)](#泛型函数generic-function)
      - [重载](#重载)
      - [函数中的 `this`](#函数中的-this)
      - [其他类型](#其他类型)
      - [返回 `void` 类型](#返回-void-类型)
    - [类型操纵(`Type Manipulation`)](#类型操纵type-manipulation)
      - [`keyof`](#keyof)
      - [`Typeof`](#typeof)
    - [`Indexed Access Types`](#indexed-access-types)
      - [`Conditional Type`](#conditional-type)
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
### `tsconfig.json`
1. `TypeScript` 默认将代码编译为 `ES3` 的 `JavaScript` 语法, 可以在编译选项中使用 `--target es2015` 改变其编译目标
    - ```shell
      tsc .\03interface.ts --target es2015
    - 从高版本的 `ECMAScript` 转移到低版本的 `ECMAScript` 叫做 `downleveling`
2. 使用 `--noEmitOnError` 选项 `TypeScript` 在编译出现问题时将不会生成对应的 `JavaScript` 文件
    - ```shell
      tsc --noEmitOnError .\03interface.ts
3. `TypeScript` 有一些类型检查的开关, 在 `tsconfig.json` 中使用 `strict: true` 开启所有. 有两个需要特别单独说明
    - `noImplicitAny`: 打开这个开关将在任何变量被隐式推断为 `any` 时报错.
    - `strictNullChecks`: 打开这个开关将在任何期待具体变量但是却被赋值为 `null` 或 `undefined` 的变量时报错.
### 原始数据类型
1. `JavaScript` 的类型分为两种: `原始数据类型` 和 `对象类型`
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
    - `strictNullChecks`
      - 当开关是 `off`, 可能为 `null` 或 `undefined` 的值都可以正常访问, `null` 和 `undefined` 也可以被赋值给任意类型的属性.
      - 当开关是 `on`, 当一个值是 `null` 或 `undefined` 时, 需要在访问这个值的属性或方法前进行验证
      - 官方文档推荐 `on`
    - 非 `null` 断言操作符 (`!`)
      - `TypeScript` 有一个特殊的语法, 无需额外的检查就可以从某个类型移除 `null` 和 `undefined`. 将 `!` 写在任意表达式之后就是断言该表达式不为 `null` 或 `undefined`
      - ```typescript
        function ld(x?: number | null) {
          // no error
          console.log(x!.toFixed());
        }
      - 就像其他断言, 这并不改变运行时行为, 因此只有当你非常确定表达式不为 `null` 或 `undefined` 时才使用 `!`
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
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
4. 联合类型和接口的不同
    > 关键不同, 接口时可扩展的, 而联合类型不是.
    - 不同`1:` 扩展
      - 使用 `extends` 关键字扩展接口
      - ```typescript
        interface Animal {
          name: string;
        }
        interface Bear extends Animal {
          honey: boolean;
        }
      - 使用 `&` 相交扩展类型别名
      - ```typescript
        type Animal1 = {
          name: string;
        }
        type Bear1 = Animal1 & {
          honey: boolean;
        }
      - ```typescript
      - ```typescript
### 接口(`interface`)
> 使用接口 ( `Interfaces`) 来定义对象的类型 \
> An interface declaration is another way to name an object type.
1. 在 `JavaScript` 中, 组织和传递数据的基本方式是通过`对象`; 在 `TypeScript` 中, 是通过`对象类型(object types)`
    - `对象类型` 是可以匿名的
    - ```typescript
      function greet(person: { name: string; age: number; }) {
        return 'hello, ' + person.name;
      }
    - 或者可以定义一个接口`interface`
    - ```typescript
      interface Person {
        name: string;
        age: number;
      }
      function greet1(person: Person) {
        return 'hello, ' + person.name;
      }
    - 又或者, 给类型起个别名`type`
    - ```typescript
      type Person1 = {
        name: string;
        age: number;
      };
      function greet2(person: Person1) {
        return 'hello, ' + person.name;
      }
2. 什么是接口
    - 接口时对行为的抽象, 具体的行动需要类 (`class`) 实现 (`implement`)
    - `TypeScript` 中的接口是一个非常灵活的概念, 可以对类的一部分行为进行抽象, 也可用于对对象的形状进行描述.
3. 定义接口
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
4. 可选属性
    - 定义接口时, 使用 `?` 表示该属性时可选的. 可选属性的含义是该属性可以不存在, 但这时仍然不允许添加未定义的属性
    - ```typescript
      interface Person {
        name: string;
        age: number;
        color?: string;
      }
5. `Index Signatures`
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
6. 只读属性
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
7. 继承接口
    - 使用 `extends` 可以继承接口. 可以同时继承一个或多个接口.
    - ```typescript
      interface BasicAddress {
        name?: string;
        street?: string;
        city?: string;
        country?: string;
        postalCode?: string;
      }
      interface AddressWithUnit extends BasicAddress {
        unit: string;
      }
8. 相交类型(`Intersection Types`)
    - TypeScript 提供了 `相交类型`, 主要用于将已经存在的`对象类型`结合起来. 使用 `&` 符号定义相交类型. 如下面的例子, `ColorfulCircle` 要求同时拥有 `Colorful` 和 `Circle` 的所有成员.
    - ```typescript
      interface Colorful {
        color: string;
      }
      interface Circle {
        radius: number;
      }
      type ColorfulCircle = Colorful & Circle;
      function draw(circle: ColorfulCircle) {
        console.log('color is ', circle.color);
        console.log('radius is ', circle.radius);
      }
      draw({ color: 'red', radius: 12 });
      // Object literal may only specify known properties, and 'radius111' does not exist in type 'ColorfulCircle'
      // draw({ color: 'red', radius111: 12 });
    - 相交类型和继承接口有什么不同的? 主要不同在于如何处理冲突,
#### 泛型对象类型
1. 
    - 如果我们像创建一个又能装 `string`, 又能装 `number` 的接口, 就可以使用泛型对象类型. 下面代码的意思是, 创建了一个 `contents` 类型为 `T` 的 `T` `Box`. 当真正引用 `Box` 时, 需要使用具体的类型来替换 `T`
    - ```typescript
      interface Box<T> {
        contents: T;
      }
      const b: Box<string> = { contents: 'hello' };
    - 我们可以使用泛型函数完全避免函数重载
    - ```typescript
      function setContents<T>(box: Box<T>, newContent: T) {
        box.contents = newContent;
      }
    - 类型别名也可以使用泛型哦
    - ```typescript
      type Box1<T> = {
        contents: T
      };
      type OrNull<T> = T | null;
      type OneOrMany<T> = T | T[];
      type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>;
2. 数组泛型
    - 泛型对象类型有些像容器类型, 不过容器类型和容器包含的类型无关, 可以更好的重用. 数组类型中, 当使用 `number[]` 实际上是 `Array<number>` 的缩写
    - ```typescript
      function doSomething(value: Array<string>) {
        // ...
      }
      let myArray: string[] = ['1', '2'];
      doSomething(myArray);
3. `ReadonlyArray`
    - `ReadonlyArray` 是特殊的类型, 描述的是只读的数组
    - ```typescript
      function doStuff(values: ReadonlyArray<string>) {
        // We can read from 'values'...
        const copy = values.slice();
        console.log(`The first value is ${values[0]}`);
        // Property 'push' does not exist on type 'readonly string[]'
        values.push("hello!");
      }
    - 📕但是 `ReadonlyArray` 不可以用作构造函数, 只能将常规的 `Array` 赋值给 `ReadonlyArray`
    - ```typescript
      // 'ReadonlyArray' only refers to a type, but is being used as a value here.
      new ReadonlyArray('red', 'blue');

      const colors: ReadonlyArray<string> = ['red', 'green'];
    - 正如 `TypeScript` 为 `Array<Type>` 提供了 `Type[]` 的简写语法, 也为 `ReadonlyArray<Type>` 提供了 `readonly Type[]`
    - ```typescript
      function doStuff2(values: readonly string[]) {
        // values.push('111');
      }
    - 📕最后一个需要注意的是, `ReadonlyArray` 和 `Array` 是不能双向赋值的.
    - ```typescript
      let x: readonly string[] = [];
      let yy: string[] = [];
      x = yy; // ok
      yy = x; 
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
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
    - 在编写回调函数类型是, `永不`使用可选参数, 除非明确调用回调函数时不传可选参数, 如果真的是这种情况, 可选参数也就没有意义了
      - ```typescript
        function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
          for (let i = 0; i < arr.length; i++) {
            callback(arr[i], i);
            callback(arr[i]);
          }
        }
      - 在上面的方法中, `index` 是可选参数, 如果调用者刚好不传这个参数, 但是函数实现中又恰好使用了这个函数, 那么就会报错!    
      - ```typescript
        myForEach([1, 2, 3], (a, i) => console.log(a, i.toFixed()));
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
    - 如果没有指定剩余的类型, 那么默认为 `any[]`, 而不是 `any`. 如果如果要指定类型, 必须是 `Array<T>`, `T[]`, 或元组中的一种
    - ```typescript
      function fn4(name: string, ...m) {
        return;
      }
    - ![](../../../image/Snipaste_2022-04-10_13-38-14.png)
    - 此外, TypeScript 并不认为是数组是不可变的, 因此这可能导致一下奇怪的行为, 比如
    - ```typescript
      const args = [8, 5];
      const angle = Math.atan2(...args);
      // A spread argument must either have a tuple type or be passed to a rest parameter.
    - 解决这个问题最直接的方法就是使用 `const`
    - ```typescript
      const args = [8, 5] as const;
      const angle = Math.atan2(...args);    
    - 当编译的目标 `JS` 版本比较旧时, 使用剩余参数可能要求打开 `downlevelIteration` 编译选项
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
8. 参数解构
    - 可以使用参数的解构赋值语法方便地将一个对象中的参数赋值为多个函数体中的变量, 在 `JavaScript` 中是这样地
    - ```typescript
      function sum({ a, b, c }) {
        return a + b + c;
      }
      sum({ a: 10, b: 3, c: 9 });
    - 在 TypeScript 中可以这样写
    - ```typescript     
      function sum({ a, b, c }: { a: number, b: number, c: number }) {
        return a + b + c;
      }
      sum({ a: 10, b: 3, c: 9 });

      // 使用类型别名
      type ABC = { a: number, b: number, c: number };
      function sum1({ a, b, c }: ABC) {
        return a + b + c;
      }
### 类型断言
> 可以用来手动指定一个值的类型.
1. 语法
    - ```js
      值 as 类型
      // 或
      <类型>值
    - 如果实在 `.tsx` 文件中, 只能使用 `as` 语法.
    - 📕注意: 因为类型断言会在编译时期移除, 没有运行时检查, 即便类型断言断错了, 也不会抛出异常或者为 `null` 的情况出现.
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
      - `TypeScript` 只允许一个具体的类型断言为更具体的类型或者更不具体的类型, 下面的语法是万万不可的.
      - ```typescript
        const x = 'hello' as number;
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
### 字面量类型
1. 除了通常的 `string` 和 `number` 类型, 我们还可以在类型的位置使用具体的 `string` 和 `number`
    - ![](../../../image/Snipaste_2022-04-05_16-13-56.png)
    - ```typescript
    - 换种说法, 字面量类型不能重新赋值
    - ```typescript
      let x2: 'Hello' = 'Hello';
      x2 = 'Hello';
      x2 = 'World'; // no
      // Type '"World"' is not assignable to type '"Hello"'
2. 通过将多个字面量组合成联合类型, 可以创建一个更有用的表达式
    - 约束取值只能是某几个值中的一个. 当然不只是字符串字面量, 还可能使其他类型字面量
    - ```typescript
      type EventNames = 'click' | 'scroll' | 'mousemove';
      function handleEvent(element: Element, event: EventNames): void {
        // ...
      }
      function compare(a: string, b: string): -1 | 0 | 1 {
        return a === b ? 0 : a > b ? 1 : -1;
      }
      interface Options {
        width: number;
      }
      function configure(x: Options | "auto") {
        // ...
      }
      configure({ width: 100 });
      configure("auto");
      configure("automatic"); // no
3. 字面量推断
    - 即便使用 `const` 初始化一个变量为对象时, `TypeScript` 认为这个对象的属性稍后会改变. 因此, 下面的代码行不通
    - ```typescript
      function handleRequest(url: string, methods: 'GET' | 'POST') {
      }
      const req = {
        url: 'https://example.com',
        method: 'GET',
      };
      // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'
      handleRequest(req.url, req.method);
    - 有两种方式可以修复上面的问题
      - 方式`1: ` 使用 `as` 将 `string` 转为 `'GET'`
      - ```typescript
        handleRequest(req.url, req.method as 'GET');
        // 或
        const req = {
          url: 'https://example.com',
          method: 'GET' as 'GET',
        };
      - 上面的语法表示 `req.method` 只能由字面量类型 `GET`, 防止其被赋值为其他字符串; 下面的语法表示在调用函数前, `req.method` 属性就会是 `GET` 值.
      - 方式`2: ` 使用 `as const` 将整个对象转为类型字面量
      - ```typescript
        const req1 = {
          url: 'https://example.com',
          method: 'GET' ,
        } as const;
        handleRequest(req1.url, req1.method);
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript
      - ```typescript

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

#### 属性修饰符
1. 
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
    - ```typescript
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
#### `this`
1. `TypeScript` 不会改变 `JavaScript` 的运行时行为. 
    - ```typescript
      class MyClass2 {
        name: 'MyClass2';
        getName() {
          return this.name;
        }
      }
      const c3 = new MyClass2();
      const obj = {
        name: 'obj',
        getName: c3.getName,
      }
      // obj
      console.log('this runtime is', obj.getName()); 
    - 为什么打印出来的是 `obj` 呢? 因为在 `JavaScript` 中, 函数内部的 `this` 值取决于函数是如何调用的. 在上面的例子中, 因为函数是通过 `对象.` 的方式调用, 所以 `this` 指向了 `.` 前面的 `对象`.
2. 箭头函数
    - 如果一个函数经常在失去 `this` 语境的条件下调用, 那么最好使用箭头函数作为函数的定义
    - ```typescript
      class MyClass3 {
        name = 'myClass';
        getName = () => {
          return this.name;
        }
      }
      const c4 = new MyClass3();
      const g = c4.getName;
      console.log(g === c4.getName); // true
      console.log('g in arrow', g()); // myClass
3. `this` 参数
    - 在方法或函数定义中, 有一个名为 `this` 的初始化参数在 `TypeScript` 中有特别的意义. 这个参数在编译器将将会被移除
    - ```typescript
      function fn1(this: boolean, x: number) {
      }
      // 编译后
      function fn1(x) {
      }
    - `TypeScript` 会检查调用一个带有 `this` 的函数是否在正确的上下文中. 
    - ```typescript
      class MyClass5 {
        name = 'MyClass';
        getName(this: MyClass5) {
          return this.name;
        }
      }
      const c5 = new MyClass5();
      c5.getName(); // ok

      const g5 = c5.getName;
      // The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass5'
      console.log(g5());
4. `this` 类型
    - 类中, `this` 这种特殊的类型动态指向当前类. 下面的代码中, `set` 的返回类型时 `this` 而不是 `Box1`
    - ```typescript
      class Box1 {
        content: string = '';
        set(value: string) {
          this.content = value;
          return this;
        }
      }
    - 如果使一个类, 继承 `Box1` 那么会做更智能的类型
    - ```typescript
      class ClearableBox extends Box1 {
        clear() {
          this.content = '';
        }
      }

      const a1 = new ClearableBox();
      const b1 = a1.set('world');
      // const b1: ClearableBox
    - 同样, 也可以在参数列表中使用 `this` 类型. 
    - ```typescript
      class Box1 {
        content: string = '';
        sameAs(other: this) {
          return other.content === this.content;
        }
      }
    - 📕这不同于 `other: Box`, 因为如果有一个子类, 子类的 `sameAs` 方法将只接受从子类继承的类
    - ```typescript
      class Box1 {
        content: string = '';
        sameAs(other: this) {
          return other.content === this.content;
        }
      }
      class ClearableBox extends Box1 {
        clear() {
          this.content = '';
        }
      }

      const a2 = new Box1();
      const b2 = new ClearableBox();
      b2.sameAs(a2);
      // Argument of type 'Box1' is not assignable to parameter of type 'ClearableBox'.
5. `this`-based 类型守卫
    - 可以在类或接口的方法的返回值的位置使用 `this is Type` 语法. 没看咋懂
    - ```typescript
      class FileSystemObject {
        isFile(): this is FileRep {
          return this instanceof FileRep;
        }
        isDirectory(): this is Directory {
          return this instanceof Directory;
        }
        isNetwork(): this is NetWork & this {
          return this.networked;
        }
        constructor(public path: string, private networked: boolean) {}
      }
      class FileRep extends FileSystemObject {
        constructor(path: string, public content: string) {
          super(path, false);
        }
      }
      class Directory extends FileSystemObject {
        children: FileSystemObject[];
      }
      interface NetWork {
        host: string;
      }

      const fso: FileSystemObject = new FileRep('foo/bar.txt', 'foo');
      if (fso.isFile()) {
        fso.content;
        // const fso: FileRep
      } else if (fso.isDirectory()) {
        fso.children;
        // const fso: Directory
      } else if (fso.isNetwork()) {
        fso.host;
        // const fso: NetWork & FileSystemObject
      }
#### 抽象类和抽象方法
1. 在 `TypeScript` 中, 类, 方法和域都可能是抽象的.
    - 抽象方法或抽象域没有具体的实现, 它们必须存在域抽象类内部, 抽象类不能直接被实例化.
    - 抽象类的作用是作为基类供所有子类实现所有抽象成员. 如果类没有任何抽象成员, 那它就是`实体类`
    - ```typescript
      abstract class Base6 {
        abstract getName(): string;
        abstract name: string;
        printName() {
          console.log('hello, ' + this.getName());
        }
      }
      class Derived6 extends Base6 {
        getName(): string {
          return this.name;
        }
        name: string = 'hello';
      }
      new Derived6().printName();
2. 抽象构造签名
    - 有时, 你希望接受某个抽象类的子类类的构造函数, 以便创建一个类的实例
    - ```typescript
      function greet(ctor: typeof Base6) {
        const instance = new ctor();
        // Cannot create an instance of an abstract class.
        instance.printName();
      }
    - 相反, 应该这样写. emmm, 我有点不懂
    - ```typescript
      function greet1(ctor: new () => Base6) {
        const instance = new ctor();
        // Cannot create an instance of an abstract class.
        instance.printName();
      }
#### 其他
1. 参数属性(`parameter property`)
    - `TypeScript` 提供特殊的语法将构造函数的参数转换成类的同名同值属性. 这就是`参数属性`, 通过在构造函数的参数前加上可见性修饰符 `public`, `protected`, `private` 或 `readonly`. 
    - ```typescript
      class Params {
        constructor(
          public readonly x: number,
          protected y: number,
          private z: number
        ) {

        }
      }
      const a5 = new Params(1, 2, 3);
      console.log(a5.x);
2. 类表达式(`class expression`)
    - 类表达式与类声明很像, 唯一不同的是类表达式不需要名字, 尽管我们可以通过类表达式被赋值的变量访问
    - ```typescript
      const someClass = class<Type> {
        content: Type;
        constructor(value: Type) {
          this.content = value;
        }
      }
      const m = new someClass('Happy Fool"s Day!');
3. 类之间的关系
    - 大多数情况, `TypeScript` 中的类进行结构化比较, 比如下面的两个类因为完全相同就可以互相替换
    - ```typescript
      class PointA {
        x = 0;
        y = 0;
      }
      class PointB {
        x = 0;
        y = 0;
      }
      const p: PointA = new PointB();
    - 类似的, `子类型`的关系在类之间仍然存在, 即便没有明显的继承
    - ```typescript
      class PersonA {
        name: string;
      }
      class Student {
        name: string;
        score: number;
      }
      const student: PersonA = new Student();
    - 还有更奇怪的案例. `Empty` 这个类没有任何成员, 在 `TypeScript` 中, 没有任何成员的类型是其他所有类型的超类型, 因此, 如果你定义一个空的类, 那么任何其他类型都可以取代它
    - ```typescript
      class Empty {}
      function fn(x: Empty) {
      }

      fn(window);
      fn({});
      fn(fn);
### narrowing
1. 有一个需求, 一个函数接收一个参数, 如果是 `number` 类型就将 `input` 重复 `number` 次; 如果是 `string` 类型就将其和 `input` 拼接在一起
    - ```typescript
      function padLeft(padding: number | string, input: string) {
        if (typeof padding === 'number') {
          return ''.repeat(padding) + input;
        }
        return padding + input;
      }
### typeof
1. TypeScript 中 typeof 返回下面类型
    - `string`
    - `number`
    - `bigint`
    - `boolean`
    - `symbol`
    - `undefined`
    - `object`
    - `function`
    - 在 `if` 的语句中, `TypeScript` 将 `typeof padding === 'number'` 成为 `类型守卫(type guard)`. `TypeScript` 将这种一系列的检查之后, 某个类型变为比声明时类型更精确的过程叫做 `narrowing`
    - 如下面的代码, 经过一次类型守卫, `padding` 由联合类型被 `narrow` 为 `string` 类型
    - ![](../../../image/Snipaste_2022-04-05_20-50-26.png)
    - 📕注意, 上面的几种类型中并不包含 `null`, 因此如果想要判断一个变量为 `object` 的话, 可能会中招! 因为 `typeof null` 的结果也是 `object`. 所以在判断是否为 `object` 之前需要进行真值判断
2. `truthiness narrowing`
    - 在 `JavaScript` 中, 像 `if` 这样的结构首先将其条件转换为 `boolean` 值, 然后根据值判断分支. 只有下面的值会被判断为 `false`
      - `0`: (包括 `+0` 和 `-0`)
      - `NaN`
      - `''`: (空字符串)
      - `0n`: (`bigint`)
      - `null`
      - `undefined`
    - 有下面两种方式可以将任意值转为 `boolean`
      - ```typescript
        // 方式1
        Boolean('Hello'); // type: boolean, value: true
        !!'world'; // type: true, value: true
3. `Equality narrowing`
    - `TypeScript` 同样使用 `switch` 和相等性检查 如 `===`, `!==`, `==`, `!=` 来 `narrow type`
    - ```typescript
      function example(x: string | number, y : string | boolean) {
        if (x === y) {
          x.toUpperCase();
        } else {
          console.log(x);
        }
      }
    - 上面例子中, 当 `x === y` 成立时, `x` 和 `y` 只能是 `string` 类型, 因此可以在 `x` 上调用任意 `string` 的方法而不会报错.
    - `JavaScript` 中的 `==` 和 `!=` 同样正确工作. 检查某个值是否 `== null` 不知检查这个值就是 `null` 还减产其是不是 `undefined`. 反过来同样.
    - ![](../../../image/Snipaste_2022-04-06_22-01-17.png)
    - ```typescript
      interface Container {
        value: number | null | undefined;
      }
      function MultiplyValue(container: Container, factor: number) {
        if (container.value != null) {
          container.value *= factor;
        }
      }
    - ![](../../../image/Snipaste_2022-04-06_22-03-58.png)
4. `in operator narrowing`
    - `in` 操作符的作用是: 判断对象是否有给定名字的键. `TypeScript` 根据 `in` 操作符作类型 `narrowing`
    - ```typescript
      type Fish = { swim: () => void; };
      type Bird = { fly: () => void; };
      
      function move(animal: Fish | Bird) {
        if ('swim' in animal) {
          return animal.swim();
        }
        return animal.fly();
      }
    - ![](../../../image/Snipaste_2022-04-07_22-08-41.png)
5. `instanceof narrowing`
    - `intanceof` 是一个检查一个值是否为另一个值的实例, 实际上 `x instanceof Foo` 是检查是否 `x` 的原型链上包含 `Foo.prototype`. `TypeScript` 同样使用其进行类型 `narrowing`
    - ```typescript
      function logValue(x: Date | string) {
        if (x instanceof Date) {
          console.log(x.toUTCString());
        } else {
          console.log(x.toUpperCase());
        }
      }
    - ![](../../../image/Snipaste_2022-04-08_11-03-19.png)
6. 赋值
    - 当给一个变量赋值时, `TypeScript` 会根据所赋的值将该变量进行类型 `narrowing`
    - ```typescript
      let x3 = Math.random() < 0.5 ? 10 : 'Monday';
      // let x3: string | number
      x3 = 1;
      console.log(x3);
      // let x3: number
      x3 = 'hello';
      console.log(x3);
      // let x3: string
    - 上面代码中, 即便 `x` 的类型变成 `number` 还是可以将其赋值为 `string` 类型. 这时因为 `x` 的声明类型时 `string | number`, 因此在赋值时总会检查 `声明类型`
7. 使用类型谓语(`type predicates`)
    > 断言的意思, 就是给定一组条件和一个对象, 判断这个对象是否满足条件
    - 有时, 我们像直接控制类型的变化, 为了自定义一个类型守卫, 我们需要定义一个函数, 函数的返回值类型是一个 `类型谓语`
    - ```typescript
      function isFish(pet : Fish | Bird): pet is Fish {
        return (pet as Fish).swim !== undefined;
      }
    - `pet is Fish` 就是 `类型谓语`, `类型谓语` 遵循这 **`参数名 is 类型`** 的模式, 其中 `参数名` 必须是当前函数签名的某个参数的名字.
    - 任何时候 `is 类型` 和某个变量被调用时, 如果变量的类型时兼容的, `TypeScript` 就会将变量 `narrow` 为指定的类型
    - 对比下面没有返回值的情况, 默认返回值类型是 `boolean`
    - ![](../../../image/Snipaste_2022-04-08_11-16-15.png)
    - ```typescript
      // Both calls to 'swim' and 'fly' are now okay.
      let pet = getSmallPet();
      
      if (isFish(pet)) {
        pet.swim();
      } else {
        pet.fly();
      }
    - 我们可以使用类型断言从联合类型的数组提取某个特定类型的数组
    - ```typescript
      const zoo: (string | number)[] = [1, 2, 'hello'];
      const isString: string[] = zoo.filter((member): member is string => {
        return member > 0;
      });
8. 辨别后的联合类型(`Discriminated Unions`)
    - 先来看一个问题, 求一个类型面积的函数, 先定义了几个类型
    - ```typescript
      interface Circle {
        kind: 'circle';
        radius: number;
      }
      interface Square {
        kind: 'square';
        sideLength: number;
      }
      type Shape = Circle | Square;

      function getArea(shape: Shape) {
        return Math.PI * shape.radius ** 2;
        // Property 'radius' does not exist on type 'Shape'.
        // Property 'radius' does not exist on type 'Square'
      }
    - `TypeScript` 在提醒我们, `shape` 可能是 `Square`, 但是 `Square` 没有 `radius`.
    - ```typescript
      function getArea1(shape: Shape) {
        if (shape.kind === 'circle') {
          return Math.PI * shape.radius ** 2;
        }
      }
    - 解决了! 当联合类型中的每个类型都包含一个公共的字面量类型的属性, `TypeScript` 会将该联合类型当作`辨别后的联合类型`, 可以对联合类型的所有成员进行 `narrow`. 上面的例子中, `kind` 就是一个公共属性, 检查这个属性将 `shape narrow` 为 `Circle`
    - 上面代码中, 最重要的是如何编码定义 `Shape`
9. `never`
    - 当 `narrowing` 时, 可能排除一个联合类型的所有选项然后啥也没上下, 这时, `TypeScript` 会使用 `never` 类型表示这种不应该存在的状态
    - ```typescript
      function getArea2(shape: Shape) {
        if (shape.kind === 'circle') {
          return Math.PI * shape.radius ** 2;
        } else if (shape.kind === 'square') {

        } else {
          shape;
        }
      }
    - ![](../../../image/Snipaste_2022-04-08_11-58-00.png)
    - `never` 类型可以赋值给任意类型变量, 没有类型可以赋值给 `never` 类型(除了 `never` 类型自身). 这意味着我们可以依赖 `never` 在 `switch` 中作穷尽检查.
    - 例如, 添加 `default` 分支当没有可能的类型被处理时, 会返回 `never`. 这样做的好处是什么呢? 如果 `Shape` 又增加了 `Triangle` 类型, 那么函数就会报错, 因为我们没有处理 `Triangle` 类型的求面积
    - ```typescript
      function getArea3(shape: Shape) {
        switch (shape.kind) {
          case 'circle':
            return Math.PI * shape.radius ** 2;
          case 'square':
            return shape.sideLength ** 2;
          default: 
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
        }
      }
### 函数
### 函数类型表达式
1. 描述函数最简单的方式就是`函数类型表达式`, 这种类型在语法上很像箭头函数
    - ```typescript
      function printToConsole(s: string) {
        console.log(s);
      }
      function greeter(fn: (a: string) => void) {
        fn('Hello, World');
      }

      greeter(printToConsole);
    - 语法 `(a: string) => void` 表示 `函数接收一个名为 a 的 string 类型的参数并且没有返回值`. 如果参数类型没有指定, 就是 `any`
      - 📕函数名是必须的, 如果写成 `(string) => void`, 表示函数名是 `string`, 类型是 `type`❗❗❗
    - 也可以使用别名类型
    - ```typescript
      type GreetFunction = (a: string) => void;
      function greeter1(fn: GreetFunction) {
        fn('Hello, World');
      }
2. 可调用签名
    - 在 `JavaScript` 中, `functions` 是可以有属性以备调用的. 但是在上面的函数类型表达式是没办法添加额外属性的, 因此如果我们想要函数可调用, 可以在对象类型中增加 `可调用签名`
    - ```typescript
      type DescribableFunction = {
        description: string;
        (someArg: number): boolean;
      }
      function doSomething(fn: DescribableFunction) {
        console.log(fn.description + ' returned ' + fn(6));
      }
    - 📕注意: 语法上和函数类型表达式有点点不同, 在参数和返回值之间使用的是 **`:`** 而不是 `=>`
    - 现在出现了一个问题, 究竟怎么声明一个 `DescribableFunction` 类型的变量呢? [可以看 stackoverflow 上的讲解](https://stackoverflow.com/questions/69504538/call-signatures-example-on-ts-handbook)
    - 调用方式 `1: 函数声明`
    - ```typescript
      // 调用方式1
      function greaterThanTen(n: number) {
        return n > 10;
      }
      greaterThanTen.description = 'greaterThanTen Func';
      doSomething(greaterThanTen);
    - 调用方式 `2: 函数表达式`
    - ```typescript
      const isEven: DescribableFunction = (someArg) => someArg % 2 === 0;
      isEven.description = 'isEven';
      doSomething(isEven);
    - 调用方式 `3: Object.assign`
      - 这个方法要调整编译选项 `--target es2015` 因为 `Object.assign()` 是比较新的方法
    - ```typescript
      const isNegative = Object.assign(
        (someArg: number) => someArg < 0,
        { description: 'isNegative' }
      );
      doSomething(isNegative);
    - 观察上面三种调用方式, 基本上 `DescribableFunction` 就是一个函数, 外加一个描述属性. 因此三种调用方式基本上都是围绕着函数构造的.
3. 构造签名(`Construct Signatures`)
    - `JavaScript` 中函数仍然可使用 `new` 调用, `TypeScript` 在 `可调用签名` 之前加上 `new` 关键字即为 `构造签名` 
    - ```typescript
      type SomeConstructor = {
        new (s: string): Object;
      }
      function fn(ctor: SomeConstructor) {
        return new ctor('hello');
      }
    - 问题又来了, 如何调用呢? [可以看 stackoverflow 的这篇文章](https://stackoverflow.com/questions/69195747/how-to-define-implementation-of-function-call-signatures-and-construct-signature), 这个语法基本上就指向了 `class`, 因此
    - ```typescript
      class SomeCC {
        constructor(s: string) {}
      }
      let a: SomeConstructor = SomeCC;
      const hello = fn(a);
      console.log(`hello, is `, hello);
      // hello, is  SomeCC {}
    - 在 `JavaScript` 中, 像 `Date`, 既可以通过 `new` 调用, 也可以不通过 `new` 调用. 我们同样可以将 `call signature` 和 `construct signature` 结合起来
    - ```typescript
      interface CallOrConstruct {
        new (s: string): Date;
        (n?: number): number;
      }
    - 怎么使用呢? [参考这篇 stackoverflow 文章 ](https://stackoverflow.com/questions/66874130/how-to-properly-use-functions-construct-signatures-in-typescript), 当然这样做会报错, 因为 `CallOrConstruct` 是一个类型, 不能直接使用
    - ```typescript
      // construct
      let object: Date = new CallOrConstruct("optional string s");
      // call
      let myNumber: number = CallOrConstruct(/* n= */ 42);
#### 泛型函数(`Generic Function`)
1. 泛型函数
    - 有时写一个函数, 希望函数的两个输入类型有某种关系, 或函数的返回类型依赖输入参数类型. 如果沿返回一个数组元素的第一个, 通常会这样写
    - ```typescript
      function firstElement(arr: any[]) {
        return arr[0];
      }
    - 这个函数不好的点就是返回了 `any` 类型. 在 TypeScript 中, 当我们想要描述两个值之间的关系时就使用 `泛型`, 通过在函数签名中声明一个类型参数就可以啦
    - ```typescript
      function firstElement1<Type>(arr: Type[]): Type | undefined {
        return arr[0];
      }
    - 通过添加类型参数 `Type` 并在参数和返回类型两个地方使用 `Type`, 我们创建了函数的输入参数和返回值的联系, 接下来尝试调用
    - ```typescript
      const s = firstElement1(['a', 'b', 'c']);
      const n = firstElement1([1, 2, 3]);
      const u = firstElement1([])
    - 调用泛型函数的第二种方式, 就是加上泛型参数
    - ```typescript
      const s1 = firstElement1<string>(['a', 'b', 'c']);
      const n1 = firstElement1<number>([1, 2, 3]);
      const u1 = firstElement1<any>([])
2. 泛型类型
    - 泛型函数类型, 就像非泛型函数类型一样
    - ```typescript
      function identity<T>(arg: T): T {
        return arg;
      }

      let myIdentity: <T>(arg: T) => T = identity;
      let myIdentityString: <String>(arg: String) => String = identity;
    - 尝试用一张图更好理解
    - ![](../../../image/Snipaste_2022-04-11_17-10-52.png)
    - 也可以将泛型类型作为一个对象字面量类型的 `call
     signature`. 这可以让我们写出第一个泛型接口.
    - ```typescript
      let myIdentity1: { <T>(arg: T): T } = identity;

      // 泛型接口
      interface GenericInterfaceFn {
        <T>(arg: T): T;
      }
      let myIdentity2: GenericInterfaceFn = identity;
    - 泛型接口的代码可以进一步优化, 即将泛型参数上移. 这使得泛型参数 `T` 对接口的其他成员也都是可见的.
    - ```typescript
      interface GenericInterfaceFn1<T> {
        (arg: T): T;
      }
      let myIdentity3: GenericInterfaceFn1<number> = identity;
2. 多个类型参数
    - 我们也可以使用多个类型参数
    - ```typescript
      function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
        return arr.map(func);
      }

      // function map<string, number>(arr: string[], func: (arg: string) => number): number[]
      const parsed = map(['1', '2', '3'], (n) => parseInt(n));
3. 约束类型参数
    - 比如我们像写一个函数, 返回两个值中更长的那个. 为了做到这个, 需要比较两个值的 `length` 属性, 因此我们约束参数类型通过 `extends` 必须拥有 `length` 属性
    - ```typescript
      function longer<T extends { length: number }>(a: T, b: T) {
        if (a.length >= b.length) {
          return a;
        }
        return b;
      }

      const longerArrag = longer([1, 2], [1, 2, 3]);
      const longerString = longer('12', '123');
      const longerNumber = longer(1, 23);
      // Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
    - 下面时使用泛型约束的常见错误
    - ```typescript
      function minLength<T extends { length: number }>(
        obj: T, minimum: number
      ): T {
        if (obj.length > minimum) {
          return obj;
        }
        // 报错
        return { length: minimum }; 
      }
    - 上面的函数看起来好像没问题, 函数的返回值要么是 `T` 要么是满足约束的值, 但是函数本意是返回和 `obj` 一样类型的值,, 而不是满足泛型约束的值.
4. 在泛型约束中使用类型参数
    - 我们同样可以声明被另一个类型参数(`A`)约束的类型参数(`B`), 例如我们想要根据名字访问某个对象的属性, 我们需要确保对象存在该属性
    - ```typescript
      function getProperty<T, Key extends keyof T>(obj: T, key: Key) {
        return obj[key];
      }
      let x = { a: 1, b: 2, c: 3 };

      getProperty(x, 'a');
      getProperty(x, 'd');
      // Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'.
5. 在泛型使用 `class` 类型
    - 在 `TypeScript` 中使用泛型构建工厂时, 使用构造函数推断 `class` 类型是很有必要的.
    - ```typescript
      function create<T>(c: { new (): T }): T {
        return new c();
      }
      class Hello {
        constructor() {
        }
      }

      const a6 = create(Hello);
    - 另一个例子, 使用 `prototype` 推断和约束构造函数和 `class` 类型实例的关系
    - ```typescript
      class BeeKeeper {
        hasMask: boolean = true;
      }
      class ZooKeeper {
        nameTag: string = 'Mikle';
      }
      
      class Animal {
        numLegs: number = 4;
      }
      class Bee extends Animal {
        keeper: BeeKeeper = new BeeKeeper();
      }
      class Lion extends Animal {
        keeper: ZooKeeper = new ZooKeeper();
      }

      function createInstanceA<A extends Animal>(c: new () => A): A {
        return new c();
      }
      createInstanceA(Bee).keeper.hasMask;
      createInstanceA(Lion).keeper.nameTag;
    - 📕一定要好好解释上面的内容, 我自己都晕晕乎乎的😵. 首先 `A` 要是 `Animal` 的子类, 然后 `Bee` 和 `Lion` 的默认构造函数都默认返回自身实例.
4. 如何写出好的泛型函数
    - `泛型约束不是第一位的考虑(Push Type Parameters Down)`
      - 规则就是: 尽可能使用泛型参数自身, 而不是约束泛型参数
      - ```typescript
        function firstElement2<T>(arr: T[]) {
          return arr[0];
        }
        function firstElement3<T extends any[]>(arr: T) {
          return arr[0];
        }
        const a5 = firstElement2([1, 2, 3]); // number
        const b5 = firstElement3([1, 2, 3]); // any
      - `firstElement2` 是更好的选择, 因为它的返回值是 `T`, 即 `number`. 而 `firstElement3` 的返回值是 `any`.
    - `用更少的类型参数`
      - ```typescript
        function filter1<T>(arr: T[], func: (arg: T) => boolean): T[] {
          return arr.filter(func);
        }
        function filter2<T, Func extends (arg: T) => boolean>(
          arr: T[],
          func: Func
        ){
          return arr.filter(func);
        }
      - `filter2` 的类型参数 `Func` 并没有将两个值关联起来, 所以 `filter1` 是更好的选择
    - `类型参数应该出现两次`
      - ```typescript
        function greeter4<Str extends string>(s: Str) {
          return 'hello' + s;
        }
        function greeter5(s: string) {
          return 'hello' + s;
        }
      - 有时我们会忘记一个函数根本不需要泛型, 📕记住泛型参数是用来关联多个值(至少 `2` 个)的类型, 如果类型参数只在一个地方出现, 那么它没有关联任何东西
#### 重载
1. `JavaScript` 中的某些函数可以以不同数量和类型的参数调用, 例如 `Date`, 可以只传一个 `timestamp` 作为参数, 也可以同时传 `month/day/year` 三个参数
    - `TypeScript` 将这种可以被不同方式调用的函数称为 `重载签名(overload signatures)`. 为了实现这一点, 首先要写`两个或更多`函数签名, 然后紧跟着函数实现.
    - ```typescript
      // 函数签名
      function makeDate(timestamp: number): Date;
      function makeDate(month: number, day: number, year: number): Date;
      // 函数实现
      function makeDate(monthOrTimestamp: number, day?: number, year?: number): Date {
        if (day === undefined && year === undefined) {
          return new Date(monthOrTimestamp);
        }
        return new Date(year, monthOrTimestamp, day);
      }

      const d1 = makeDate(123434857345);
      const d2 = makeDate(11, 19, 2022);
    - 这个例子中, 首先写了两个`重载签名`: 一个接收单个参数, 另一个接收三个参数. 接下来写了函数实现, 这个实现的签名`完全兼容`重载签名. 但是这个实现签名`不能`被直接调用!!! 比如下面的调用, 我们没法只通过两个参数调用.
    - ```typescript
      const d3 = makeDate(11, 19);
      // No overload expects 2 arguments,
      // but overloads do exist that expect either 1 or 3 arguments.
    - 📕注意函数实现和重载签名的兼容, 下面这个例子就是第二个重载签名的返回类型和实现签名的返回类型不兼容.
    - ```typescript
      function f2(x: string): string;
      function f2(x: number): boolean;
      function f2(x: number | string) {
        return 'oops';
      }
2. 怎样写出好的重载?
    - `如果可能, 尽量使用联合类型而不是函数重载`
    - 看下面的例子
    - ```typescript
      function len(s: string): number;
      function len(s: any[]): number;
      function len(s: any) {
        return s.length;
      }

      len('1');
      len([1]);
      // 报错, 就是 string | number[] 不兼容任何一个重载签名
      len(Math.random() < 0.5 ? '1' : [1]);
    - 要想解决这个问题很容易: 使用联合类型
    - ```typescript
      function len1(s: string | any[]) {
        return s.length;
      }
      len1('1');
      len1([1]);
      len1(Math.random() < 0.5 ? '1' : [1]);
#### 函数中的 `this`
1. `TypeScript` 直到在很多情况下我们需要控制 `this` 究竟代表哪个对象, `JavaScript` 中 `this` 不能作为参数名, 因此 `TypeScript` 使用这个语法让我们声明方法体中 `this` 的类型
    - ```typescript
      interface DB {
        // filter 是一个函数,不过函数参数中指定了 this 必须为 User实例
        filterUsers(filter: (this: User) => boolean): User[];
      }
      class DBClass implements DB {
        filterUsers(filter: (this: User) => boolean): User[] {
          return null; 
        }
      }
      const db = new DBClass();
      const admins = db.filterUsers(function (this: User) {
        return this.admin;
      });
    - 📕: 注意需要使用函数表达式而不是箭头函数来实现这种控制
#### 其他类型
> `void`, `object`, `unknown`, `never`, `Function`
1. 和所有类型一样, 你可以在任何地方使用这些类型, 但是他们确和函数的语境相关
2. `void`
    - 不返回任何值的函数的返回值. 当函数内没有任何 `return` 语句或者并不返回明显的值时, 比如下面
    - ```typescript
      function noop() {
        return;
      }
    - 在 `JavaScript` 中, 如果一个函数不返回任何值将隐式返回 `undefined`, 但是 `void` 和 `undefined` 在 `TypeScript` 不是一回事, 稍后讨论.
3. `object`
    - 表示任何不是基础类型的值, 基础类型包括(`string`, `number`, `bigint`, `null`, `undefined`, `symbol`, `boolean`). 这不同于空对象类型 `{}`, 也不同于全局类型 `Object`.
    - > object 不是 Object❗ 总是使用 object
    - 在 `JavaScript` 中, 函数是对象. 在 `TypeScript` 中函数同样是 `object`
4. `unknown`
    - 表示任何值, 有些像 `any` 但是 `unknown` 更安全, 因为访问 `unknown` 的任何属性或方法都是不行的
    - ```typescript
      function ok(a: any) {
        a.ok();
      }
      function notOk(a: unknown) {
        a.ok();
        // Property 'ok' does not exist on type 'unknown'.
      }
    - 可以返回一个 `unknown` 类型的值, 但是使用这个返回值的时候要很小心.
    - ```typescript
      function safeParse(s: string): unknown {
        return JSON.parse(s);
      }
5. `never`
    - 有一些函数返回 `never`. `never` 类型表达某个值从来没有被观察到. 
    - ```typescript
      function fail(msg: string): never {
        throw new Error(msg);
      }
    - `never` 也用于 `TypeScript` 发现联合类型中没有其他可能类型了
    - ```typescript
      function fn3(x: string | number) {
        if (typeof x === 'string') {

        } else if (typeof x === 'number') {
          
        } else {
          // x is never
        }
      }
6. `Function`
    - 全局类型 `Function` 在 `JavaScript` 中在所有函数上的属性, 像是 `call`, `bind` 等. 在 `TypeScript` 中, `Function` 表示所有可以被调用的值的类型, 并且这些调用返回 `any`
    - ```typescript
      function callF(f: Function) {
        f(1, 2, 2);
      }
    - 但是上面的这种做法最好避免, 因为这种函数调用并没有指定类型, 而且返回值 `any` 也不安全. 如果你需要接收一个任意函数但是不调用, 那么 `() => void` 是一个更安全的选择
#### 返回 `void` 类型
1. 返回类型为 `void` 的上下文类型并不强制函数不返回任何东西, 换句话说, 上下文函数类型如果返回 `void`, 那么实现时, 可以返回任意类型, 但是返回值将会被忽略
    - ```typescript
      type voidFunc = () => void;
      const f7: voidFunc = () => {
        return true;
      }
      const f8: voidFunc = function () {
        return true;
      }
    - 调用这些函数的返回值也是 `void`
    - ```typescript
      const r1 = f7(); // const r1: void
      const r2 = f8();
    - 正是这样的行为存在, 所以下面的代码才是合法的, 因为 `push` 返回 `number`, 但是 `forEach` 希望函数返回 `void`
    - ```typescript
      src.forEach((el) => dst.push(el));
2. 但是, 如果是函数表达式或者函数声明, 返回 `void` 类型, 那么就一定不能返回任何东西
    - ```typescript
      function fx(): void {
        return true;
      }
      const fx1 = function (): void {
        return false;
      }
### 类型操纵(`Type Manipulation`)
#### `keyof`
1. `keyof` 操作符接收对象类型, 返回该对象类型所有 `key` 的字符串或数字的联合类型.
    - ```typescript
      type Point = { x: number; y: number; 1: string };
      type keysInPoint = keyof Point;
      function isKey(arg: keysInPoint) {
        return true;
      }

      isKey('x');
      isKey('y');
      isKey(1);
      isKey(2);
      // Argument of type '2' is not assignable to parameter of type 'keyof Point'.
    - `keyof` 在结合两个映射类型(`mapped types`) 时特别有用.
2. 如果一个类型有一个 `string` 或者 `number` 的索引签名(`index signature`), 那么 `keyof` 会返回这些类型
    - ```typescript
      type Arrayish = {
        [n: number]: unknown
      };
      type A = keyof Arrayish; // type A = number

      type Mapish = {
        [k: string]: unknown;
      };
      type M = keyof Mapish; // type M = string | number
    - 📕`M` 是 `string | number` 因为 JavaScript 的对象键总是可以转为 `string`, 例如 `obj[0]` 和 `obj['0']` hi一样的.
#### `Typeof`
1. 在 `JavaScript` 中已经有了 `typeof` 修饰符, 可以用在表达式语境中. 在 `TypeScript` 新增其可以用在类型语句中以推断某个变量或属性的类型.
    - ```typescript
      // js
      console.log(typeof "Hello world");

      // ts
      let s2 = 'Hello';
      let s3: typeof s2; // let s3: string
      let s4 = typeof s2;
    - 📕注意 `s4`, 其值只可能是 `"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"` 中的一种
2. `ReturnType`
    - TypeScript 中预定义的类型 `ReturnType<T>` 接收 `函数类型` 返回函数的返回值类型
    - ```typescript
      type Predicate = (x: number) => boolean;
      type K = ReturnType<Predicate>;
      // type K = boolean
    - 📕注意接收的时`函数类型`, 而不是`函数值`. 所以下面的写法是报错的.
    - ```typescript
      function f9() {
        return { x: 10, y: 3};
      }
      type P1 = ReturnType<f9>; // not ok
      // 'f9' refers to a value, but is being used as a type here. Did you mean 'typeof f9'?
      

      type P2 = ReturnType<typeof f9>;
      // type P2 = { : number; y: number; }
3. 限制
    - `TypeScript` 有意限制可以作为 `typepf` 参数的表达式, 基本上, 只能在标识符(比如变量名)或者其属性上使用 typepf, 有助于帮助我们避免写一些自己以为可以但实际不可以的带啊吗
    - ```typescript
### `Indexed Access Types`
1. 我们可以使用 `Indexed Access Types` 查找某个类型上的指定属性. 当然尝试访问不存在的属性会报错
    - ```typescript
      type Person = {
        age: number;
        name: string;
        alive: boolean;
      };
      
      type Age = Person['age']; // type Age = number
      type Age1 = Person['aga']; 
      // Property 'aga' does not exist on type 'Person'
    - 📕尝试理解, 上面代码中的 `'age'` 不是一个值(`value`), 而是一个类型(`type`). 如何证明呢? 只需访问一个不存在的属性
    - ```typescript
      type MessageOf<T> = T['message'];
      // Type '"message"' cannot be used to index type 'T'.
2. 索引名本身就是类型, 因此可以整体使用联合类型, keyof 或其他类型
    - ```typescript
      type I1 = Person['age' | 'name']; // string | number
      type I2 = Person[keyof Person]; // string | number | boolean

      type AliveOrName = 'alive' | 'name';
      type I3 = Person[AliveOrName]; // string | boolean
    - 另一个用任意类型索引的例子是使用 `number` 获取数组元素的类型.
    - ```typescript
      const MyArray = [
        { name: 'Alice', age: 15 },
        { name: 'Bob', age: 16 },
        { name: 'Cindy', age: 17 },
      ];
      
      type Person1 = typeof MyArray[number];
      // type Person1 = { name: string; age: number; }
      type Age2 = typeof MyArray[number]['age'];
      // type Age2 = number
      type Age3 = Person1['age'];
      // type Age3 = number
3. 在索引时, 只能使用`类型`, 意味着不能使用 `const` 作变量引用
    - ```typescript
      const key = 'age';
      type Age4 = Person1[key];
      // 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
    - 但是, 可以使用类型别名
    - ```typescript
      type key = 'age';
      type Age5 = Person1[key];
#### `Conditional Type`
1. 很多时候, 我们都需要根据输入做决定, `条件类型`帮助我们描述输入类型和输出之间的关系. 其语法如下, 有点像条件表达式
    - ```typescript
      SomeType extends OtherType ? TrueType : FalseType;
    - 举个例子,
    - ```typescript 
      interface Animal {
        live(): void;
      }
      interface Dog extends Animal {
        woof(): void;
      }
      type Example1 = Dog extends Animal ? number : string;
      type Example2 = RegExp extends Animal ? number : string;
2. 上面的案例看起来很没意思, 但是条件类型结合泛型才能发挥出其力量, 来看下面的案例
    - ```typescript 
      interface IdLabel {
        id: number;
      }
      interface NameLabel {
        name: string;
      }
      function createLabel(id: number): IdLabel;
      function createLabel(name: string): NameLabel;
      function createLabel(nameOrId: string | number): IdLabel | NameLabel;
      function createLabel(nameOrId: string | number): IdLabel | NameLabel {
        return null;
      }
    - `createLabel` 根据输入参数的类型返回不同的类型, 但是上面的函数有些臃肿, 我们要创建三个重载, 如果类型更多, 那么重载也就更多. 💡解决方式就是使用`条件类型`
    - ```typescript 
      type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

      function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
        return null;
      }
      let a1 = createLabel('typescript');
      // let a1: NameLabel
      let b1 = createLabel(1);
      // let b1: IdLabel
      let c1 = createLabel(Math.random() < 0.5 ? 'hello' : 1);
      // let c1: NameLabel | IdLabel
3. 条件类型约束
    - 条件类型中的检查将提供给我们更多新的信息, 当条件类型为真时执行的分支将更多约束该条件的泛型. 例如下面的代码会报错, 因为泛型 `T` 中不一定由 `message` 这个属性
    - ```typescript 
      type MessageOf<T> = T['message'];
      // Type '"message"' cannot be used to index type 'T'.
    - 下面, 对 `T` 进行一些约束
    - ```typescript 
      type MessageOf<T extends { message: unknown }> = T['message'];
      // Type '"message"' cannot be used to index type 'T'.
      
      interface Email {
        message: string;
      }
      type EmailMeesage = MessageOf<Email>;
    - 再高级一点? 希望 `MessageOf` 接受任何类型, 如果没有 `message` 属性就默认返回 `never`? 可以将对 `T` 的约束移到外面, 使用条件类型代替!
    - ```typescript 
      type MessageOf1<T> = T extends { message: unknown } ? T['message'] : never;
      interface Dog {
        bark(): void;
      }
      type a2 = MessageOf1<Email>; // type a2 = string
      type b2 = MessageOf1<Dog>; // type b2 = never
    - 另一个类似的例子, 是获取数组类型的元素的类型, 如果不是数组类型, 就返回本身类型
    - ```typescript
      type Flatten<T> = T extends any[] ? T[number]: T;
      type elementType = Flatten<string[]>; // type elementType = string
      type selfType = Flatten<number>; // type selfType = number 
3. 条件类型中使用 `infer`
    - 上面的例子, 我们使用条件类型来约束泛型并且从中提取自己想要的类型, 使用 `infer` 会变得更简单
    - ```typescript 
      type Abstract<T> = T extends Array<infer Item> ? Item : T;
    - 有了上面的例子, 我们可以使用 `infer` 来推断一个函数的返回值类型
    - ```typescript 
      type ReturnOf<T> = T extends (...arg: any[]) => infer Return ? Return : never;
      type Num = ReturnOf<() => number>; 
      // type Num = number
      type Str = ReturnOf<(name: string) => string>;
      // type Str = string
4. 当从一个具有很多 `call signature` 的类型推断时, 最有可能的时从最后一个签名推断.
    - ```typescript 
      declare function stringOrNum(x: string): number;
      declare function stringOrNum(x: number): string;
      declare function stringOrNum(x: string | number): string | number;
      
      type T1 = ReturnType<typeof stringOrNum>;
      // string | number
5. 分发的条件类型`(Distributive Conditional Types)`
    - 当条件类型作用在泛型上时, 如果最后的类型是联合类型, 那么, 条件类型将会`分发`给联合类型的每一个成员
    - ```typescript 
      type toArray<T> = T extends any ? T[] : never;
      type StrArrOrNumOrr = toArray<string | number>;
      // type StrArrOrNumOrr = string[] | number[]
      type StrArr = toArray<string>;
      // type StrArr = string[]
    - `分发`是我们期望的行为, 如果想要避免分发, 就在 `extends` 前后都加上方括号`[]`
    - ```typescript
      type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
      type StrArrOrNumOrr1 = ToArrayNonDist<string | number>;
      // type StrArrOrNumOrr1 = (string | number)[] 
    - ```typescript 
    - ```typescript 
    - ```typescript 
### 声明合并
## 参考
1. [TypeScript 入门教程](http://ts.xcatliu.com/basics/primitive-data-types.html)