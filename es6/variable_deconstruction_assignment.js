// 2.1数组的解构赋值
// let a=1;
//     b=2;
//     c=3;
// 以上写法可以写成
// let [a,b,c]=[1,2,3]
// // 这种写法的本质是属于模式匹配，只要等号两边的模式相等
// // 左边的变量就会赋予对应的值
// let [foo, [[bar], baz]] = [1, [[2], 3]];
// foo // 1
// bar // 2
// baz // 3

// let [ , , third] = ["foo", "bar", "baz"];
// third // "baz"

// let [x, , y] = [1, 2, 3];
// x // 1
// y // 3

// let [head, ...tail] = [1, 2, 3, 4];
// head // 1
// tail // [2, 3, 4]

// let [q, w, ...z] = ['a'];
// q // "a"
// w // undefined
// z // []
// 结构不成功，变量的值对等于undefined
// 如果等号的右边不是数组（即不是可遍历的结构），那么会报错


// 报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};
// 以上错误的本质是模式不匹配导致的
// 前5个是转换为对象不具备Iterator接口，最后一个不具备Iterator接口
// 对于Set结构，也可以使用数组的结构赋值
// let [x,y,z]=new Set(['a','b','c'])
// console.log(x,y,z)

// function* fibs(){
//     let a=0;
//     let b=1;
//     while(true){
//         yield a;//0,1,1,2,3,5
//         [a,b]=[b,a+b]
//     }
// }
// let [first, second, third, fourth, fifth, sixth] = fibs();
// console.log(first, second, third, fourth, fifth, sixth)

//(1).如果要将一个已经声明的变量用于解构赋值，必须非常小心。
// let x;
// { x } = { x: 1 }; //报错

// 正确的写法
// let x;
// ({ x } = { x: 1 });

//(2).解构赋值允许等号左边的模式之中，不放置任何变量名。
({} = [true, false]);
({} = 'abc');
({} = []);

//(3).数组本质是特殊的对象，因此可以对数组进行对象属性的解构
let arr = [1, 2, 3];
// 这里的方括号属于对象的扩展中的属性名表达式，相当于可以用表达式来表示属性
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
console.log(first)

console.log('-----------------------------------')
// 2.3字符串的结构赋值
// 字符串也可以结构赋值。此时，字符串可以转换为一个类似数组的对象
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"


let {length : len} = 'hello';
len // 5
console.log(len)
console.log('---------------------------')

// 4.数值和布尔值的解构赋值
// let {toString: s} = 123;
// s === Number.prototype.toString // true

let {toString: s} = true;
console.log(s === Boolean.prototype.toString) // true
// 上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
// undefined和null无法转为对象，对他们进行结构赋值，会报错
// 使用解构赋值时，应该避免使用圆括号

// 2.7 结构赋值的用途
// 2.7.1交换变量的值
let x = 1;
let y = 2;

[x, y] = [y, x];

// 2.7.2从函数返回多个值

// function example() {
//     return [1, 2, 3];
//   }
//   let [a, b, c] = example();
  
//   // 返回一个对象
  
//   function example() {
//     return {
//       foo: 1,
//       bar: 2
//     };
//   }
//   let { foo, bar } = example();

// 2.7.3 函数参数的定义
// 参数是一组有次序的值
// function f([x, y, z]) { ... }
// f([1, 2, 3]);

// // 参数是一组无次序的值
// function f({x, y, z}) { ... }
// f({z: 3, y: 2, x: 1});

// 2.7.4 提取 JSON 数据 强烈推荐
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);

// 2.7.5 函数参数的默认值
// jQuery.ajax = function (url, {
//     async = true,
//     beforeSend = function () {},
//     cache = true,
//     complete = function () {},
//     crossDomain = false,
//     global = true,
//     // ... more config
//   } = {}) {
//     // ... do stuff
// };

// 2.7.6 遍历Map结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

// 2.7.7 输入模块的指定方法
// 获取拿到指定的方法
// const { SourceMapConsumer, SourceNode } = require("source-map");