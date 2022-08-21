// 8.1扩展运算符
// 扩展运算符(spread)是三个点(...)。它好比reset参数的逆运算，将一个数组转为用逗号分隔的参数序列
// console.log(...[1,2,3])
// console.log(1,...[2,3,4],5)
// // 扩展运算符与正常函数可以结合使用，非常灵活
// const arr=[...(x>0 ? ['a']:[]),
//           'b',
//         ];
// // 如果扩展运算符后面是一个空数组，则不产生任何效果
// console.log([...[],1])
// 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
// console.log((...[1,2]))

// 8.1.1 替代函数的apply()方法
// 由于扩展运算符可以展开数组，所以不在需要apply()方法将数组转为函数的参数了
// function f(x, y, z) {
//   // ...
// }
// var args = [0, 1, 2];
// f.apply(null, args);

// // ES6 的写法
// function f(x, y, z) {
//   // ...
// }
// let args = [0, 1, 2];
// f(...args);

// 与Math.max()方法相结合
//es5
Math.max.apply(null, [14, 3, 77])
// es6的写法
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77)

// 将扩展运算符和push()函数，相结合，将一个数组添加到另一个数组的尾部
// ES5 的写法
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// Array.prototype.push.apply(arr1, arr2);

// // ES6 的写法
// let arr1 = [0, 1, 2];
// let arr2 = [3, 4, 5];
// arr1.push(...arr2);

// 8.1.2 扩展运算符的应用
// (1) 复制数组
// 数组是复合的数据类型，直接赋值的话，只是复制了指向底层数据结构的指针
// 而不是克隆一个全新的数组
// const a1 = [1, 2];
// const a2 = a1;

// a2[0] = 2;
// a1 // [2, 2]

// es5只能用变通方法来复制数组
// const a1 = [1, 2];
// const a2 = a1.concat();// 合并空数组

// a2[0] = 2;
// a1 // [1, 2]
// es6 利用扩展运算符复制数组 写法一好一些
// const a1 = [1, 2];
// // 写法一
// const a2 = [...a1];
// // 写法二
// const [...a2] = a1;

// (2)合并数组
// 这里核心思想是利用扩展运算符将三个数组中的元素全部展开，合并到一个新数组中
// const arr1 = ['a', 'b'];
// const arr2 = ['c'];
// const arr3 = ['d', 'e'];

// // ES5 的合并数组
// arr1.concat(arr2, arr3);
// // [ 'a', 'b', 'c', 'd', 'e' ]

// // ES6 的合并数组
// [...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
// 以上两种方法都是浅拷贝

let a1 = [{ foo: 1 }];
let a2 = [{ bar: 2 }];

let a3 = a1.concat(a2);
let a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true
a3[0].foo = 2
a3[0].a = 2

console.log(a3)
console.log(a1)
// a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是
// 对原数组成员的引用，这就是浅拷贝

// (3)与结构赋值结合
// 扩展运算符可以与结构赋值结合起来，用于生成数组。
// 将扩展运算符用于数组赋值，只能放在参数的最后一位，不然会报错
// a = list[0], rest = list.slice(1)

// // ES6
// [a, ...rest] = list

// const [first, ...rest] = [1, 2, 3, 4, 5];
// first // 1
// rest  // [2, 3, 4, 5]

// const [first, ...rest] = [];
// first // undefined
// rest  // []

// const [first, ...rest] = ["foo"];
// first  // "foo"
// rest   // []

// (4) 字符串
// 扩展运算符可以将字符串转为真正的数组
// console.log([...'hello'])
// 在字符串中使用扩展运算符可以正确地识别四个字节的Unicode字符
// 'x\uD83D\uDE80y'.length // 4
// [...'x\uD83D\uDE80y'].length // 3

// (5)Iterator接口的对象

// (6)Map和Set结构，Generator函数
// 扩展运算符内部调用的是数据结构的Iterator接口
// 因此只要具有Iterator接口的UI想，都可以使用扩展运算符
// let map = new Map([
//     [1, 'one'],
//     [2, 'two'],
//     [3, 'three'],
//   ]);

// let arr = [...map.keys()]; // [1, 2, 3]
// console.log(arr) //[1,2,3]

// Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符
const go = function* () {
    yield 1;
    yield 2;
    yield 3;
};

console.log([...go()]) // [1, 2, 3]

// 8.2 Array.from()可以将两类对象转为真正的数组
// 类似数组的对象和可遍历的对象(es6中新增的数据结构Set和Map)
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
console.log(Array.from(arrayLike))

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// Array.from还可以接受一个函数作为第二个参数
// 这个参数的作用类似于数组的map()方法，对数组中每个元素进行处理
// 将处理后的值放入返回的数组
// Array.from可以将各种值转换为真正的数组，还可以提供map功能。
// 只要有一个原始的数据结构，就可以对它的值进行处理
// Array.from()本质上，可以让一个类数组对象转换为数组格式
// Array.from的另一个引用时将字符串转为数组，返回字符串的长度。

// 8.3 Array.of()
// Array.of()方法用于将一组值，转换为数组
// Array.of(3, 11, 8) // [3,11,8]
// Array.of(3) // [3]
// Array.of(3).length // 1
// // Array.of()的目的是为了弥补构造函数Array()的不足
// Array() // []
// Array(3) // [, , ,]
// Array(3, 11, 8) // [3, 11, 8]
// Array.of()基本可以用来代替Array()或new Array()
// 来统一构造数组的方法

// 8.4实例方法: copyWith()
// 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员
// 复制到其他位置（会覆盖原有成员），然后返回当前数组
// Array.prototype.copyWithin(target, start = 0, end = this.length)
// target(必须)：从该位置开始替换数据。如果是负值，表示倒数（以下是一样的）
// start(可选)：从该位置开始读取数据，默认为0
// end(可选)：到该位置前停止读取数据，默认等于数组长度。
// console.log([1, 2, 3, 4, 5].copyWithin(0, 3))// [4, 5, 3, 4, 5]

// 8.5 实例方法：find(),findIndex(),findLast(),findLastIndex()
// 数组实例的find()方法，用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
// [1, 4, -5, 10].find((n) => n < 0)
// 上面代码找出数组中第一个小于0的成员。
// find()方法的回调函数可以接受三个参数
// 依次是当前的值，当前的位置和原数组
console.log([1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
}))
// 10

// findIndex()方法可以用来返回第一个符合条件的数组成员的位置
// find()函数接收了第二个参数person对象，回调函数中的this对象指向person对象
function f(v) {
    return v > this.age;
}
let person = { name: 'John', age: 20 };
console.log([10, 12, 26, 15].find(f, person));    // 26

// es2022 新增了findLast()和findLastIndex()方法
// 表示从数组的最后一个成员开始，依次向前检查

// 8.6 实例方法：fill()
// fill方法使用给定值，填充一个数组。
// ['a', 'b', 'c'].fill(7)
// // [7, 7, 7]

// new Array(3).fill(7)
// // [7, 7, 7]
// 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
// let arr = new Array(3).fill({name: "Mike"});
// arr[0].name = "Ben";
// arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
console.log(arr)
// [[5], [5], [5]]

// 8.7 实例方法：entries(),keys()和values()
// 以上这三个方法都是用来遍历数组的，都可以用for...of循环进行遍历
// keys()是对键名的遍历，values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
  // 0 "a"
  // 1 "b"

// 8.8 实例方法：includes()
// includes()方法用于返回某个数组中是否包含给定的值，与字符串的includes()方法类似。
console.log([1, 2, 3].includes(2))     // true
console.log([1, 2, 3].includes(4))     // false
// [1, 2, NaN].includes(NaN) // true
// 在没有includes()方法前，我们都是用indexOf()方法来判断数组中没有该值
// 但是这个方法有两个缺陷
// 一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观
// 二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
console.log([NaN].indexOf(NaN))// -1
console.log([NaN].includes(NaN))// true
// 另外，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。
// Map结构的has方法，使用来找键名的
// Set结构的has方法，使用来查找值的

// 8.9实例方法：flat(),flatMap()
// flat()方法用于将嵌套的数组“拉平”，变成一维的数组
console.log([1, 2, [3, 4]].flat())
// flat()方法里的参数可以填拉平的维度，维度无限大可以直接写Infinity
// flatMap()方法是对原数组的每个成员执行一个函数，然后对返回值组成的数组执行flat()方法
console.log([2, 3, 4].flatMap((x) => [x, x * 2]))
// 注意flatMap()方法只能展开一层数组

// 8.10 实例方法：at()返回数组，字符串和类数组数据结构中，该位置下的值
// 可以使用负索引
// const arr = [5, 12, 8, 130, 44];
// arr.at(2) // 8
// arr.at(-2) // 130

// 8.11 实例方法：toReversed(),toSorted(),toSpliced(),with()
const sequence = [1, 2, 3];
sequence.toReversed() // [3, 2, 1]
sequence // [1, 2, 3]

const outOfOrder = [3, 1, 2];
outOfOrder.toSorted() // [1, 2, 3]
outOfOrder // [3, 1, 2]

const array = [1, 2, 3, 4];
array.toSpliced(1, 2, 5, 6, 7) // [1, 5, 6, 7, 4]
array // [1, 2, 3, 4]

const correctionNeeded = [1, 1, 3];
correctionNeeded.with(1, 2) // [1, 2, 3]
correctionNeeded // [1, 1, 3]

// 8.12实例方法：group(),groupToMap() 这个用得不多先不看

// 8.13 数组的空位
// 数组的空位指的是，数组的某一个位置没有任何值，比如Array()构造函数返回的数组都是空位
// 注意，空位不是undefined,某一个位置的值等于undefined,依然是有值的，空位是没有任何值
// ES6 则是明确将空位转为undefined。