// 9.1属性的简洁表示法
// es6允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。
// const foo = 'bar';
// const baz = {foo};
// console.log(baz) // {foo: "bar"}

// // 等同于
// const baz = {foo: foo};
// 将变量foo直接写在大括号里。此时，属性名就是变量名，属性值就是变量值。
function f(x, y) {
    return { x, y };
}

// 等同于

function f(x, y) {
    return { x: x, y: y };
}

f(1, 2) // Object {x: 1, y: 2}

// 除了属性简写，方法也可以简写
// const o = {
//   method() {
//     return "Hello!";
//   }
// };

// // 等同于

// const o = {
//   method: function() {
//     return "Hello!";
//   }
// };
let birth = '2000/01/01';

const Person = {

    name: '张三',

    //等同于birth: birth
    birth,

    // 等同于hello: function ()...
    hello() { console.log('我的名字是', this.name); }

};
// CommonJS模块输出一组变量，非常适合使用简洁写法
// let ms = {};

// function getItem (key) {
//   return key in ms ? ms[key] : null;
// }

// function setItem (key, value) {
//   ms[key] = value;
// }

// function clear () {
//   ms = {};
// }

// module.exports = { getItem, setItem, clear };
// // 等同于
// module.exports = {
//   getItem: getItem,
//   setItem: setItem,
//   clear: clear
// };

// 属性的赋值器和取值器，也是采取这个写法
const cart = {
    _wheels: 4,

    get wheels() {
        return this._wheels;
    },

    set wheels(value) {
        if (value < this._wheels) {
            throw new Error('数值太小了！');
        }
        this._wheels = value;
    }
}
let user = {
    name: 'test'
};

let foo = {
    bar: 'baz'
};

console.log(user, foo)
// {name: "test"} {bar: "baz"}
console.log({ user, foo })
// {user: {name: "test"}, foo: {bar: "baz"}}

// 简写方法不能作用与构造函数

// 9.2属性名表达式
// js定义对象的属性，有两种方法
// 方法一 用标识符作为属性名
let obj = {}
obj.foo = true;

// 方法二 用表达式作为属性名，要将表达式放在括号之内
obj['a' + 'bc'] = 123;

// 表达式还可以用于定义方法名
let obj1 = {
    ['h' + 'ello']() {
        return 'hi';
    }
};

console.log(obj1.hello()) // hi
// 属性名表达式与简介表示法，不能同时使用
// 注意，属性名表达式如果是一个对象，默认情况下回将对象转为字符串[object Object]
// 要注意
const keyA = { a: 1 };
const keyB = { b: 2 };

const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};

console.log(myObject) // Object {[object Object]: "valueB"}
//这里因为属性是一个对象，把对象转换为了相同名称的字符串，最后valueB覆盖了valueA

//9.3 方法的name属性
// 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性
const person = {
    sayName() {
        console.log('hello!');
    },
};

console.log(person.sayName.name)   // "sayName"

// 如果对象的方法使用了取值函数(getter)和存值函数(setter)
// 则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面
const obj3 = {
    get foo() { },
    set foo(x) { }
};

// obj3.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj3, 'foo');

console.log(descriptor.get.name) // "get foo"
console.log(descriptor.set.name) // "set foo"

// 有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；
// Function构造函数创造的函数，name属性返回anonymous
// (new Function()).name // "anonymous"

var doSomething = function () {
    // ...
    console.log('111')
};
console.log(doSomething.bind().name) // "bound doSomething"

//9.4 属性的可枚举性和遍历
// 可枚举性
// Object.getOwnPropertyDescriptor可以获取该属性的描述对象
let obj4 = { foo: 123 };
console.log(Object.getOwnPropertyDescriptor(obj4, 'foo'))
//四个操作会忽略当前的属性如果enumerable为false
//for...in循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：只串行化对象自身的可枚举的属性。
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
// 需要遍历对象的属性，尽量使用Object.keys()方法替代，
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// 属性的遍历
// es6一共有5种发放可以遍历对象的属性
// for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
// Object.keys(obj) 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
// Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
// Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
// Reflect.ownKeys(obj) 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
// 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
// 首先遍历所有数值键，按照数值升序排列。其次遍历所有字符串键，按照加入时间升序排列。最后遍历所有 Symbol 键，按照加入时间升序排列。

// 9.5 super关键字
// this关键字总是指向函数所在的当前对象，es6新增了的super关键字，时指向当前对象的原型对象
const proto = {
    foo: 'hello'
};

const obj5 = {
    foo: 'world',
    find() {
        return super.foo;
    }
};

Object.setPrototypeOf(obj5, proto);
obj5.find() // "hello"
// 上面的bj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。
// 注意 super关键字表示原型对象时，只能用在对象的方法之中，用在其他方法之中会报错
// 赋值，写在属性里都会报错
// const proto = {
//     x: 'hello',
//     foo() {
//         console.log(this.x);
//     },
// };

// const obj = {
//     x: 'world',
//     foo() {
//         super.foo();
//     }
// }

// Object.setPrototypeOf(obj, proto);

// obj.foo() // "world"

// 9.6 对象的扩展运算符
// 解构赋值
// let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
// console.log(z)

// let obj6 = { a: { b: 1 } };
// let { ...m } = obj6;
// obj6.a.b = 2;
// console.log(m.a.b) // 2

// const o = Object.create({ x: 1, y: 2 })//在o对象的原型对象上创建新对象
// o.z
// console.log(Object.getPrototypeOf(o))
// let { x, ...newObj } = o
// console.log(y)//所以对象的扩展运算符找不到y值，出错为y为undefined
// console.log(x)

//扩展运算符可以去除参数对象的所有可遍历属性，拷贝到对象中
let s = { ...['a', 'b', 'c'] }
console.log(s)
// 如果扩展运算符后面是字符串，它会自动转换为了一个类似数组的对象
console.log({ ...'hello' })
// 对实例对象进行扩展时，只能扩展对象身上的属性不能获取其方法
// 对象的扩展匀速符等同于使用Object.assign()方法
let s1 = { a: 1, b: { c: 1 } }
let s2 = Object.assign({}, s1)
s2.b.c = 2
console.log(s1)

// 9.7 AggregateError错误对象
// 9.8 Error对象的cause属性