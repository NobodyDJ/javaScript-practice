// // 7.1 基本用法
// // es6允许为函数的参数设置默认值，即直接写正在参数定义的后面
// function log(x, y = 'World') {
//   console.log(x, y);
// }

// log('Hello') // Hello World
// log('Hello', 'China') // Hello China
// log('Hello', '') // Hello

// // es6的写法有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的
// // 其次，有利于将来的代码优化
// function Point(x = 0, y = 0) {
//   this.x = x;
//   this.y = y;
// }

// const p = new Point();
// console.log(p) // { x: 0, y: 0 }

// // 参数变量是默认声明的，所以不能用let或const再次声明。
// //   function foo(x=5){
// //     let x=1;// error
// //     const x=2;// error
// //   }
// // 使用参数默认值时，函数不能有同名参数。
// // 另一个容易忽略的地方是，参数默认值不是传值迭代，而是每次计算默认值表达式的值。
// //   let x = 99;
// //   function foo(p = x + 1) {
// //     console.log(p);
// //   }

// //   foo() // 100

// //   x = 100;
// //   foo() // 101

// // 7.1.2 与解构赋值默认值结合使用
// // 参数默认值可以与结构赋值的默认值，结合起来一起用
// // 只有当函数foo()的参数是一个对象时，变量x和y才会通过解构赋值生成
// // 如果函数foo()调用没有提供参数，变量x和y就不会生成从而报错。
// function foo({ x, y = 5 }) {
//   console.log(x, y);
// }

// foo({}) // undefined 5
// foo({ x: 1 }) // 1 5
// foo({ x: 1, y: 2 }) // 1 2
// //   foo() // TypeError: Cannot read property 'x' of undefined

// // 如果函数fetch()的第二参数是一个对象，可以为它的三个属性设置默认值，对参数进行解构赋值时，不可以省略参数
// function fetch(url, { body = '', method = 'GET', headers = {} }) {
//   console.log(method);
// }

// fetch('http://example.com', {})
// // "GET"

// fetch('http://example.com')

// // 以下写法就一定可以，因为第二个参数进行了解构赋值
// function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
//   console.log(method);
// }

// fetch('http://example.com')
// // "GET"

// // 7.1.3 参数默认值的位置
// // 通常情况下，定义了默认值的参数，基本上是在函数的为参数。方便识别，如果是非尾部的参数设置默认值，实际上这个参数没有办法省略
// // 例一
// function f(x = 1, y) {
//   return [x, y];
// }

// f() // [1, undefined]
// f(2) // [2, undefined]
// //   f(, 1) // 报错
// f(undefined, 1) // [1, 1]

// // 例二
// function f(x, y = 5, z) {
//   return [x, y, z];
// }

// f() // [undefined, 5, undefined]
// f(1) // [1, 5, undefined]
// //   f(1, ,2) // 报错
// f(1, undefined, 2) // [1, 5, 2]

// // 7.1.4 函数的length属性
// // 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数
// // 指定了默认值后,length属性将失真。
// // (function (a) {}).length // 1
// // (function (a = 5) {}).length // 0
// // (function (a, b, c = 5) { }).length // 2
// // 因为length属性的返回值，等于函数的参数个数减去指定默认值的参数个数
// // 某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了

// // 7.1.5作用域
// // 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。
// var x = 1;

// function f(x, y = x) {
//   console.log(y);
// }

// f(2) // 2

// // 这里函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。
// // 函数参数形成的单独作用域里面，并没有定义变量foo,所有foo指向外层的全局变量foo,因此输出outer
// let foo = 'outer';

// function bar(func = () => foo) {
//   let foo = 'inner';
//   console.log(func());
// }

// bar(); // outer

// var x = 1
// // 函数foo的参数形成一个单独作用域
// var x = 1;
// function foo(x, y = function () { x = 2; }) {
//   var x = 3;
//   y();
//   console.log(x);
// }

// foo() // 3
// x // 1

// // 这里foo函数单独形成一个作用域声明了变量x，匿名函数y执行时改变的是foo函数形成的作用域而全局变量x是没有改变的
// // 所用调用函数foo时打印的x的是函数声明的变量x=2，而全局变量x没有收到影响，依旧是1
// var x = 1;
// function foo(x, y = function () { x = 2; }) {
//   x = 3;
//   y();
//   console.log(x);
// }

// foo() // 2
// x // 1

// // 可以将参数的默认值设置为undefined以为值该参数可以被省略
// // rest参数的写法
// const sortNumbers = (...numbers) => numbers.sort();
// 以上用法需要注意的是，arguments对象不是数组，而是一个类似数组的对象
// 所以为了使用数组的方法，必须使用Array.from必将其转换为数组。
// 而rest是一个真正的数组，它可以使用数组所有的特有方法
// rest参数之后不能再有其他参数，否则会报错。
// 函数的length属性，不包括rest参数

// 7.3 严格模式
// es5开始，函数内部可以设定为严格模式
// es6做出修改，规定只要函数参数使用了默认值，解构赋值或者扩展运算符，那么函数内部不能显式设定为严格模式
// 如果要使用严格模式 可以在全局下设定
// 或者可以再没有参数的立即执行函数里

// 7.4 name属性
// 函数的name属性，返回该函数的函数名
// function foo() { }
// foo.name // "foo"
// 如果将一个匿名函数赋给一个变量，es5的name属性，会返回空字符串，而es6的name属性会返回实际的函数名
// 如果将一个具名函数赋值给一个变量，则es5和es6都会返回这个具名函数原本的名字
// bind返回的函数，name属性会加上bound前缀

// 7.5箭头函数
// 如果大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号
// 报错
// let getTempItem = id => { id: id, name: "Temp" };

// 不报错
// let getTempItem = id => ({ id: id, name: "Temp" });

// const numbers = (...nums) => console.log(nums);

// numbers(1, 2, 3, 4, 5)

// // 1.箭头函数没有自己的this对象
// // 2.不可以当作构造函数，对箭头函数不能使用new命令
// // 3.不可以使用arguments对象，该对象再函数体内不存在。
// // 4.不可以使用yield命令，因此箭头函数不能用作generator函数
// // 最需要注意的是第一点。箭头函数没有自己的this对象，内部的this是定义时作用域中的this!!!!!
// // 箭头函数内部的this指向时固定的，
// // 箭头函数的this指向函数定义生效时所在的对象！！！！！
// var handler = {
//     id: '123456',

//     init: function () {
//         document.addEventListener('click',
//             event => this.doSomething(event.type), false);
//     },

//     doSomething: function (type) {
//         console.log('Handling ' + type + ' for ' + this.id);
//     }
// };
// // 总之箭头函数是没有自己的this,导致内部的this就是外层代码块的this。正是没有this，所以不能用作构造函数
// // Babel转箭头函数产生的ES5代码，能清楚说明箭头函数this的指向问题。
// // ES6
// function foo() {
//     setTimeout(() => {
//         console.log('id:', this.id);
//     }, 100);
// }

// // ES5
// function foo() {
//     var _this = this;

//     setTimeout(function () {
//         console.log('id:', _this.id);
//     }, 100);
// }
// // 除了this，以下三个变量再箭头函数之中也是不存在的，指向外层的对于变量：
// // arguments,super,new.target
// // 箭头函数不适用的场合
// // 1.该方法内部包括this
// // 这里的对象是不会单独构成作用域的
// // 从而导致了this指向定义时的函数作用域，指向了全局

// const cat = {
//     lives: 9,
//     jumps: () => {
//         this.lives--; //这里的this指向的是全局
//     }
// }
// //如果实在要在对象中写箭头函数可以这样写
// globalThis.s = 21;
// globalThis.m = () => console.log(this.s);

// const obj = {
//     s: 42,
//     m: globalThis.m
// };

// obj.m() // 21
// 以上，对象中的m属性的值，利用箭头函数写在函数外部，避免了this指向的问题
// 这是一个传统的对象写法

// 7.6.尾调用优化
// 含义是某个函数的最后一步是调用另一个函数。如下所示
// function f(x) {
//     return g(x);
// }
// 以下三种情况都不是
// function f(x){
//     let y = g(x);
//     return y;
//   }

//   // 情况二
//   function f(x){
//     return g(x) + 1;
//   }

//   // 情况三
//   function f(x){
//     g(x);
//   }

// 尾调用的原理是利用了栈的原理当A函数调用B函数时，A函数进栈，之后B函数进栈，
// 知道B函数运行技术后，出栈，再运行A函数
// 由此可知 尾调函数的和是最内层的return f()外层函数其实可以不用调用，只调用最核心的函数即可
function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
}
function g(a) {
    return a
}
// f();

// // 等同于
// function f() {
//     return g(3);
// }
// f();

// // 等同于
console.log(f());

// 这里是不能进行尾调用优化的，因为inner(a) a的变量是需要取自于 addOne()函数声明的变量a
// 而不是全局声明的变量a
// function addOne(a) {
//     var one = 1;
//     function inner(b) {
//         return b + one;
//     }
//     return inner(a);
// }
// inner(a)
// 7.6.2尾递归
// 函数调用自身，称为递归。尾调用自身，称为尾递归
// 如果尾调用自身，就称为尾递归
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

factorial(5) // 120
// 以上时间复杂度为O(n)
// 通过改进可以只保留

function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        console.log('1', arguments)
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                console.log('2', accumulated)
                value = f.apply(this, accumulated.shift())
                console.log('3', accumulated)
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function (x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    }
    else {
        return x
    }
});

sum(1, 10)
  // 100001