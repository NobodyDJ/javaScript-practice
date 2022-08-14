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
// console.log(/\u{61}/.test('a')) // false
// /\u{61}/u.test('a') // true
// /\u{20BB7}/u.test('𠮷') // true
// 上面代码表示，如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配 61 个连续的u。

// 4.3.3 量词
// 使用u修饰符，所有量词都会正确识别大于0xFFFF的Unicode字符
// /a{2}/.test('aa') // true
// /a{2}/u.test('aa') // true
// /𠮷{2}/.test('𠮷𠮷') // false
// /𠮷{2}/u.test('𠮷𠮷') // true

// 4.3.4 预定义模式
// u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的Unicode字符
// /^\S$/.test('𠮷') // false
// /^\S$ / u.test('𠮷') // true
// 上面代码的\s是预定义模式，匹配所有非空白字符。只有加了u修饰符，它才能匹配码点大于0xFFFF的Unicode字符。
function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2
console.log(codePointLength(s))

// 4.3.5 修饰符
// 有些Unicode字符的编码不同，但是字型相近，比如，\u0048与\u212A都是大写的K
// /[a-z]/i.test('\u212A') // false
// /[a-z]/iu.test('\u212A') // true

//4.3.6转义
// 没有u修饰符的情况下，正则中没有定义的转义，而在u模式会报错
// /\,/ // /\,/
// /\,/u // 报错
// 上面代码中，没有u修饰符时，逗号前面的反斜杠是无效的，加了u修饰符就报错。

// 4.4 RegExp.prototype.unicode属性
// 正则实例对象新增unicode属性，表示是否设置了u修饰符
// const r1 = /hello/;
// const r2 = /hello/u;

// r1.unicode // false
// r2.unicode // true

// 4.5 y修饰符 要用的时候再来看挺多的
// 除了u修饰符，es6还未正则表达式添加了y修饰符，叫做"黏连"修饰符
// y修饰符的作用与g修饰符类似，也是全局匹配,g是只要匹配到就行,而y是要从剩余第一个位置开始匹配
// RegExp.prototype.exec()是在一个指定的字符串中执行一个搜索匹配。
// 在设置了global或sticky标志位的情况下，js RegExp对象是有状态的。
// 他们会将上次成功匹配后的位置记录在lastIndex属性中。使用此特性，exec()可用来对单个字符串中的多次匹配进行逐条的遍历。
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

console.log(r1.exec(s)) // ["aaa"]
console.log(r2.exec(s)) // ["aaa"]

console.log(r1.exec(s)) // ["aa"]
console.log(r2.exec(s)) // null

// 4.6 RegExp.prototype.sticky属性
// 与y 修饰符相匹配，检测是否使用了y修饰符

// 4.7 RegExp.prototype.flags属性
// es6 新增了flags属性，会返回正则表达式的修饰符
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'

// 4.8 s修饰符:dotAll模式
// 在正则表达式中，点(.)是一个特殊字符，代表任意的单个字符，但是有两个例外
// 一个是四个字节的UTF-16字符，这个可以用u修饰符解决;另一个是行终止符；
// 所谓行中止符，就是该字符表示一行的终结。以下四个字符属于“行终止符”
// /foo.bar/.test('foo\nbar')
// // false

// /foo[^]bar/.test('foo\nbar')
// // true

// /foo.bar/s.test('foo\nbar') // true

const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'