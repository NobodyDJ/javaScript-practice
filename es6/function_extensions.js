// 7.1 基本用法
// es6允许为函数的参数设置默认值，即直接写正在参数定义的后面
function log(x, y = 'World') {
    console.log(x, y);
  }
  
  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello
  
  // es6的写法有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的
  // 其次，有利于将来的代码优化
  function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  const p = new Point();
  console.log(p) // { x: 0, y: 0 }
  
  // 参数变量是默认声明的，所以不能用let或const再次声明。
//   function foo(x=5){
//     let x=1;// error
//     const x=2;// error
//   }
  // 使用参数默认值时，函数不能有同名参数。
  // 另一个容易忽略的地方是，参数默认值不是传值迭代，而是每次计算默认值表达式的值。
//   let x = 99;
//   function foo(p = x + 1) {
//     console.log(p);
//   }
  
//   foo() // 100
  
//   x = 100;
//   foo() // 101
  
  // 7.1.2 与解构赋值默认值结合使用
  // 参数默认值可以与结构赋值的默认值，结合起来一起用
  // 只有当函数foo()的参数是一个对象时，变量x和y才会通过解构赋值生成
  // 如果函数foo()调用没有提供参数，变量x和y就不会生成从而报错。
  function foo({x, y = 5}) {
    console.log(x, y);
  }
  
  foo({}) // undefined 5
  foo({x: 1}) // 1 5
  foo({x: 1, y: 2}) // 1 2
//   foo() // TypeError: Cannot read property 'x' of undefined
  
  // 如果函数fetch()的第二参数是一个对象，可以为它的三个属性设置默认值，对参数进行解构赋值时，不可以省略参数
  function fetch(url, { body = '', method = 'GET', headers = {} }) {
    console.log(method);
  }
  
  fetch('http://example.com', {})
  // "GET"
  
  fetch('http://example.com')
  
  // 以下写法就一定可以，因为第二个参数进行了解构赋值
  function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(method);
  }
  
  fetch('http://example.com')
  // "GET"
  
  // 7.1.3 参数默认值的位置
  // 通常情况下，定义了默认值的参数，基本上是在函数的为参数。方便识别，如果是非尾部的参数设置默认值，实际上这个参数没有办法省略
  // 例一
  function f(x = 1, y) {
    return [x, y];
  }
  
  f() // [1, undefined]
  f(2) // [2, undefined]
//   f(, 1) // 报错
  f(undefined, 1) // [1, 1]
  
  // 例二
  function f(x, y = 5, z) {
    return [x, y, z];
  }
  
  f() // [undefined, 5, undefined]
  f(1) // [1, 5, undefined]
//   f(1, ,2) // 报错
  f(1, undefined, 2) // [1, 5, 2]

// 7.1.4 函数的length属性
// 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数
// 指定了默认值后,length属性将失真。
// (function (a) {}).length // 1
// (function (a = 5) {}).length // 0
// (function (a, b, c = 5) { }).length // 2
// 因为length属性的返回值，等于函数的参数个数减去指定默认值的参数个数
// 某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了

// 7.1.5作用域
// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2

// 这里函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。
// 函数参数形成的单独作用域里面，并没有定义变量foo,所有foo指向外层的全局变量foo,因此输出outer
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer

var x = 1
// 函数foo的参数形成一个单独作用域
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

// 这里foo函数单独形成一个作用域声明了变量x，匿名函数y执行时改变的是foo函数形成的作用域而全局变量x是没有改变的
// 所用调用函数foo时打印的x的是函数声明的变量x=2，而全局变量x没有收到影响，依旧是1
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1

// 可以将参数的默认值设置为undefined以为值该参数可以被省略