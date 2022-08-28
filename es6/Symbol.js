// 12.1
// es6 Symbol的引入是为了保证对象上的每一个属性的名字都是独一无二的
// 防止属性名冲突

// 因此es6引入新的原始数据类型Symbol，表示独一无二的值
// JavaScript的原生数据类型有：undefined,null,布尔值,字符串,数值，大整数，对象

let s = Symbol();

console.log(typeof s)

// Symbol不能使用new命令。因为生成的Symbol是一个原始类型的数据，不是对象
// 另外Symbol不是对象，也不能添加属性。基本上类似于一个字符串的数据类型

// Symbol()函数可以接受一个字符串座位参数，表示对实例的描述，用于区分
let s1 = Symbol('foo');
let s2 = Symbol('bar');

console.log(s1) // Symbol(foo)
console.log(s2) // Symbol(bar)

console.log(s1.toString()) // "Symbol(foo)"
console.log(s2.toString()) // "Symbol(bar)"

// 如果Symbol的参数一个对象，就会调用该对象的toString()方法，将其转为字符串
// 再生成一个Symbol值
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
console.log(sym) // Symbol(abc)

// Symbol()函数知识对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的

// Symbol值不能和其他类型的值进行运算，会报错
// 但是，Symbol值可以显式转为字符串
let sys = Symbol('My symbol');

console.log(String(sys)) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

// 此外,Symbol值可以转为布尔值，但是不能转为数值
let sym1 = Symbol();
console.log(Boolean(sym1)) // true
console.log(!sym1)  // false

// 12.2 Symbol.prototype.description
//ES2019 提供了一个 Symbol 值的实例属性description，直接返回 Symbol 值的描述。
console.log(sys.description)

// 12.3 作为属性名的Symbol
// 用于对象的属性名，能保证不会出现同名的属性，能够防止某一个键被不小心改写或覆盖
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
// let a = {
//   [mySymbol]: 'Hello!'
// };

// // 第三种写法 Object.defineProperty()方法，将属性名指定为一个Symbol值
// let a = {};
// Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
console.log(a[mySymbol]) // "Hello!"

// 注意，Symbol值作为对象属性名，不能用电运算符
// 因为点运算符后面总是字符串，读取mySymbol的值是一个Symbol类型的数，所以回到出现报错
const mySymbol1 = Symbol();
const a1 = {};

a1.mySymbol1 = 'Hello!';
a1[mySymbol1] // undefined
console.log(a1['mySymbol1']) // "Hello!"

// 同理，在对象的内部，使用Symbol值定义属性时，Symbol必须放在方括号里，其实加单引号变成字符串也可以
let s3 = Symbol();

let obj3 = {
    [s3]: function (arg) { console.log(arg) }
};

console.log(obj3[s3])
obj3[s3](123);

// 12.4 实例魔术字符串
// 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
// function getArea(shape, options) {
//     let area = 0;

//     switch (shape) {
//         case 'Triangle': // 魔术字符串
//             area = .5 * options.width * options.height;
//             break;
//         /* ... more code ... */
//     }

//     return area;
// }

// getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
// 用来消除魔术字符串的方法是把它写成一个变量
// const shapeType = {
//     triangle: 'Triangle'
// };
// 设置为Symbol属性更好
const shapeType = {
    triangle: Symbol()
};

function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });

// 12.5 属性名的遍历
// Symbol值作为属性名，遍历对象的时候，该属性不会出现在for...in,for...of循环中
// 也不会被Object.keys(),Object.getOwnPropertyNames,JSON.stringify()

//可以使用Object.getOwnPropertySymbols()方法来获取所有的Symbol属性名
const obj4 = {};
let ab = Symbol('ab');
let bc = Symbol('bc');

obj4[ab] = 'Hello';
obj4[bc] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj4);

objectSymbols
// [Symbol(a), Symbol(b)]

// Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和Symbol键名
let obj5 = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};

console.log(Reflect.ownKeys(obj5))

// 12.6 Symbol.for(), Symbol.keyFor()
// Symbol.for()方法可以重新使用同一个Symbol值
let s4 = Symbol.for('foo');
let s5 = Symbol.for('foo');

console.log(s4 === s5) // true

// Symbol.for()与Symbol这两种方法，都会生成新的Symbol。但是它们的区别在于，前者会记录在全局怀旧中共搜索
// 而后者不会
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false

// 12.7 实例：模块的Singleton模式
// Singleton模式指的是调用一个类，任何时候返回的都是一个实例

// 总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。