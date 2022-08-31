// 13.1 Set
// 基本用法 es6提供了新的数据结构Set。
// 它类似于数组，但是成员的值都是唯一的
// Set本身是一个构造函数，用来生成Set数据结构

const s = new Set()
let arr = [2, 3, 5, 4, 5, 2, 2]
arr.forEach(x => s.add(x)) //向集合中添加元素

for (let i of s) {
    console.log(i);
}
// Set函数可以接受一个数组作为参数，用来初始化
const set = new Set([1, 2, 3, 4, 4]);
console.log([...set])

// 使用Set()集合来去除重复成员
// [...new Set(array)]
// 使用Set()集合可以用来去除字符串中的重复字符
console.log([...new Set('ababbc')].join(''))// abc

// 向Set加入值的时候，不会发生强制类型转换，所以5和"5"是两个不同的值
// 主要的区别在于向Set加入值的时候，认为NaN等于自身，而精确相等运算符任务NaN不等于自身
let set1 = new Set();
let a = NaN;
let b = NaN;
set1.add(a);
set1.add(b);
console.log(set1) // Set {NaN}
// 此外，两个对象总是不相等的

// 13.1.1 Set实例的属性和方法
//Set 结构的实例有以下属性。

// Set.prototype.constructor：构造函数，默认就是Set函数。
// Set.prototype.size：返回Set实例的成员总数。

// Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
// Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// Set.prototype.clear()：清除所有成员，没有返回值。

// 对比，Object结构和Set结构的写法不同
// const properties = {
//     'width': 1,
//     'height': 1
// };

// if (properties[someName]) {
//     // do something
// }

// // Set的写法
// const properties1 = new Set();

// properties1.add('width');
// properties1.add('height');

// if (properties.has(someName)) {
//     // do something
// }

// Array.from方法可以将Set结构转为数组
const items = new Set([1, 2, 3, 4, 5]);
console.log(items)
const array = Array.from(items);
console.log(array)

// 所以有一个去除数组重复成员的好方法
Array.from(new Set(array));

// 12.1.2 遍历操作
// Set结构的实例有四个遍历方法，可以用于遍历成员
// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员
// 特别注意的是，Set的遍历顺序就是插入顺序。
// 比如使用Set保存一个回调函数列表，调用时能保证按照添加顺序调用

// (1) keys(),values(),entries()三个方法返回的都是遍历器对象
// 因为Set结构没有键名，只有键值，所以keys方法和values方法的行为完全一致

let set2 = new Set(['red', 'green', 'blue']);

for (let item of set2.keys()) {
    console.log(item)
}
for (let item of set2.values()) {
    console.log(item);
}
for (let item of set2.entries()) {
    console.log(item);
}

// 这意味着，可以省略values方法，直接用for...of循环遍历 Set。
let set3 = new Set(['red', 'green', 'blue']);

for (let x of set3) {
    console.log(x);
}
// red
// green
// blue

// (2) forEach()
// Set结构和数组一样，也拥有forEach方法，英语对每个成员执行某种操作，没有返回值
// 一共有两个参数第一个参数是处理函数，第二参数是绑定函数内部的this对象
let set4 = new Set([1, 4, 9]);
set4.forEach((value, key) => console.log(key + ' : ' + value))

// (3)遍历的应用
// 扩展运算符(...)内部使用for...of循坏，也可以用于Set结构
let set5 = new Set(['red', 'green', 'blue']);
let arr1 = [...set];
// ['red', 'green', 'blue']
// 扩展运算符和Set结构相结合，就可以去除数组的重复成员
// [...new Set(Array)]

// 数组的map和filter方法也可以用于Set
let set6 = new Set([1, 2, 3]);
set6 = new Set([...set6].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set7 = new Set([1, 2, 3, 4, 5]);
set7 = new Set([...set7].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}

// 利用并集，交集和差集的概念
// let a = new Set([1, 2, 3]);
// let b = new Set([4, 3, 2]);

// // 并集
// let union = new Set([...a, ...b]);
// // Set {1, 2, 3, 4}

// // 交集
// let intersect = new Set([...a].filter(x => b.has(x)));
// // set {2, 3}

// // （a 相对于 b 的）差集
// let difference = new Set([...a].filter(x => !b.has(x)));
// // Set {1}

// 除了使用扩展运算符将集合展开放入数组中，也可以使用Array.from()方法将集合转换为数组
// 方法一
let set8 = new Set([1, 2, 3]);
set8 = new Set([...set8].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set9 = new Set([1, 2, 3]);
set9 = new Set(Array.from(set9, val => val * 2));
console.log(set9)
// set的值是2, 4, 6

// 12.2 WeakSet
// WeakSet结构与Set类似，也是一个集合。（集合的三大性质），但是也有区别
// WeakSet的成员只能是对象，而不是其他类型的值
// WeakSet是不可遍历的

// 12.2.1 语法
// WeakSet是一个构造函数，可以使用new命令，创建WeakSet数据结构。
const ws = new WeakSet()
// 作为构造函数，WeakSet可以接受一个数组或类似数组的对象作为参数
// 该数组的所有成员，都会自动成为WeakSet实例对象的成员。
const a1 = [[1, 2], [3, 4]]
const ws1 = new WeakSet(a1)
console.log(ws1)
// 注意这里，a数组的成员成为WeakSet的成员，而不是a数组本身。这意味着数组的成员只能是成员
const b1 = [3, 4];
// const ws2 = new WeakSet(b1);// 报错

// WeakSet结构有以下三个方法：
// WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
// WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
// WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

// const ws = new WeakSet();
// const obj = {};
// const foo = {};

// ws.add(window);
// ws.add(obj);

// ws.has(window); // true
// ws.has(foo);    // false

// ws.delete(window);
// ws.has(window);    // false

// WeakSet没有size属性，没有办法遍历它的成员
// WeakSet不能遍历，是因为成员都是弱引用，随时都可能消失，遍历机制无法保证成员的存在。

// 12.3 Map
// 含义和基本用法
// JavaScript的对象(Object),本质上是键值对的集合(Hash结构)
// 但是传统上只能用字符串当做键。这给它的使用带来了很大的限制。
const m = new Map();
const o = { p: 'Hello World' };

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
// 以上代码就是把o这个对象那个作为了键，而"content"字符串作为值

// 作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([['name', '张三'], ['title', 'Author']])
map.size//2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

// 这就是说，Set和Mao都可以用来生成新的Map
const set10 = new Set([['foo', 1], ['bar', 2]])
const m1 = new Map(set10)
console.log(m1.get('foo'))

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
console.log(m3.get('baz')) // 3

// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
const map2 = new Map();

map2
    .set(1, 'aaa')
    .set(1, 'bbb');

console.log(map2.get(1)) // "bbb"
//如果读取一个未知的键，则返回undefined
new Map().get('asfddfsasadf')//undefined

//注意，只有对同一个对象的引用，Map结构才将其是为同一个键
const map3 = new Map();

map3.set(['a'], 555);
console.log(map3.get(['a'])) // undefined
// 两个数组的实例是不一样的，因此get方法无法读取该键
// 同样的值的两个实例，在Map结构中被视为两个键
const map4 = new Map();

const k1 = ['a'];
const k2 = ['a'];

map4
    .set(k1, 111)
    .set(k2, 222);

map4.get(k1) // 111
map4.get(k2) // 222

// 因此，有一个很重要的点。Map的键实际上跟内存地址绑定的，
// 只要内存地址不一样，就是为两个键。
// 这个就能解决属性碰撞的问题，我们可以扩展别人的库的时候
// 如果能使用对象作为键名，就不用担心自己的属性与原作者的属性同名
// Map将0和-0视为一个键，布尔值true和字符串true则是两个不同的键
// 虽然NaN不严格相等自身，但Map将其视为同一个键

// 12.3.1实例的属性和操作方法
// (1)size属性 返回Map结构的成员总数
const map5 = new Map();
map5.set('foo', true)
map5.set('bar', false)
console.log(map.size)// 2
// (2) Map.prototype.set(key,value)
// set方法设置key对应的键值为value，然后返回整个Map结构。
// 如果key已经有值，则键值会更新，否则新生成该键
const m4 = new Map();

m4.set('edition', 6)        // 键是字符串
m4.set(262, 'standard')     // 键是数值
m4.set(undefined, 'nah')    // 键是 undefined
//set方法返回的是当前的Map对象，因此可以采用链式写法。
let map6 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');

// (3) Map.prototype.get(key)
// get方法读取key对应的键值，如果找不到key,返回undefined
// 以下把函数作为键
const m5 = new Map();

const hello = function () { console.log('hello'); };
m5.set(hello, 'Hello ES6!') // 键是函数

m5.get(hello)  // Hello ES6!

// (4)Map.prototype.has(key)
// has方法可以返回一个布尔值，表示某个键是否在当前Map对象之中
const m6 = new Map();

m6.set('edition', 6);
m6.set(262, 'standard');
m6.set(undefined, 'nah');

m6.has('edition')     // true
m6.has('years')       // false
m6.has(262)           // true
m6.has(undefined)     // true

// (5) Map.prototype.delete(key)
// delete方法删除某个键，返回true，反之，则为false
const m7 = new Map();
m7.set(undefined, 'nah');
m7.has(undefined)     // true

m7.delete(undefined)
m7.has(undefined)       // false

// (6) Map.prototype.clear()
// clear()方法清除所有成员，没有返回值。
let map8 = new Map();
map8.set('foo', true);
map8.set('bar', false);

map8.size // 2
map8.clear()
map8.size // 0

// 12.5 WeakRef
// WeakSet和WeakMap是基于弱引用的数据结构
// 用于直接创建对象的弱引用

//12.6 FinalizationRegistry
