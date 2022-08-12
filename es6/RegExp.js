// 4.1 RegExp构造函数
// es5中，RegExp构造函数的参数有两种情况
// 1. 参数是字符串，此时第二个参数表示正则表达式的修饰符(flag)
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
// 2. 参数是一个正则表示式，这是会返回一个原有正则表达式的拷贝
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
// 但是es5不允许此时使用第二参数添加修饰符，否则会报错。
var regex = new RegExp(/xyz/, 'i');// 报错
// es6改变了这种行为。如果RegExp构造函数第一个参数是一个正则表达式.
// 第二参数指定修饰符。这个参数会忽略第一个参数原有的修饰符。
// flags输出了指定的修饰符
console.log(new RegExp(/abc/ig, 'i').flags)

// 4.2 字符串的正则方法
// 字符串对象共有4个方法，可以使用正则表达式：match(),replace(),search()和split()

// 4.3 u修饰符
// 4.3.1 es6对正则表达式添加了u修饰符，含义为Unicode模式，用来正确处理大于\uFFFF的Unicode字符。
// \uD83D\uDC2A是一个四字节的UTF-16编码，代表一个字符。但是es5不支持四个字节的UTF-16编码，将其识别为两个字符
// es6增加了u修饰符后，会将其识别为一个字符，所以第一行代码为false
console.log(/^\uD83D/u.test('\uD83D\uDC2A'))
console.log(/^\uD83D/.test('\uD83D\uDC2A'))

// 4.3.1 点(.)字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u
var s = '𠮷';

console.log(/^.$/.test(s)) // false
console.log(/^.$/u.test(s)) // true

//1、ASCII编码是1个字节，而Unicode编码通常是2个字节。2、ASCII是单字节编码，无法用来表示中文；而Unicode可以表示所有语言。3、用Unicode编码比ASCII编码需要多一倍的存储空间。

// 4.3.2 Unicode字符表示法
// ES6 新增了使用大括号表示 Unicode 字符
// 这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词。
console.log(/\u{61}/.test('a')) // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
// 上面代码表示，如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配 61 个连续的u。
