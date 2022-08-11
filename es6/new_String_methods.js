// 4.1 String.fromCodePoint()
// es5中的String.fromCharCode()方法，用于从Unicode码点返回对应字符
// 这个方法不能识别大于0xFFFF的字符
console.log(String.fromCharCode(0x20BB7)) //这里溢出了把最高的两位x2给舍弃了
// es6提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符
// 弥补了String.fromCharCode()方法的不足。
console.log(String.fromCodePoint(0x20BB7))
// String.fromCodePoint方法有多个参数，可以合并为一个字符串
console.log(String.fromCodePoint(0x78,0x1f680,0x79)==='x\uD83D\uDE80y')

// 4.2 String.raw()
// 斜杠都把它们看作一个单独的字符串
console.log(String.raw`Hi\n${2+3}!`)

console.log(String.raw`Hi\\n`==="Hi\\\\n")

// String.raw()本质上是一个正常的函数，只是专用于模板字符串的标签函数。
// 如果写成政策的函数的形式，它的一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组，对应模板字符串解析后的值
// String.raw的代码实现基本如下：
String.raw = function (strings, ...values) {
    let output = '';
    let index;
    for (index = 0; index < values.length; index++) {
      output += strings.raw[index] + values[index];
    }
  
    output += strings.raw[index]
    return output;
  }

// 4.3 实例方法：codePointAt()
// JavaScript内部，字符以UTF-16的格式存储，每个字符固定为2个字节。
// 对于那个需要4个字节存储的字符，javaScript会让为他们是两个字符
// 对于如上问题es6提供了codePointAt()方法，能够正确处理4个字节存储的字符，返回一个字符的码点
let s = '𠮷a';// 这里看作为3个字符

console.log(s.codePointAt(0).toString(16)) // 134071 转换为16进制后20bb7
console.log(s.codePointAt(1)) // 57271

console.log(s.codePointAt(2)) // 97

// 这里a的位置，正确序号应该是1，但是必须向codePointAt()方法传入2
// 为了解决这个问题，可以使用for....of循环，这样它会正确识别32位的UTF-16字符
for(let ch of s){
    console.log(ch.codePointAt(0).toString(16))
}
//20bb7
//61
// 也可以使用扩展运算符(...)进行展示匀速
let arr=[...'𠮷a'];
arr.forEach(ch=>console.log(ch.codePointAt(0).toString(16)))

// 也可使用codePointAt()方法测试一个字符是由两个字节还是四个字节组成的方法
function is32Bit(c) {
   return c.codePointAt(0) > 0xFFFF;
}
  
console.log(is32Bit("𠮷")) // true
console.log(is32Bit("a")) // false

// 4.4 实例方法normalize()
// es6提供字符串实例的normalize()方法，用来将字符的不同表示方法同一为同样的形式
// 以上方法称为Unicode正规化
console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize())

// 4.5实例方法：includes(),startsWith(),endsWith
// 传统上,JavaScript只有indexOf方法，用来确定一个字符串是否包含在另一个字符串中。
// es6现在又提供了三种新方法
// includes():返回布尔值，表示是否找到了参数字符串
// startWith():返回布尔值，表示参数字符串是否在原字符串的头部
// endsWith():返回布尔值，表示参数字符串是否在原字符串的尾部

let t = 'Hello world!'
console.log(t.startsWith('Hello'))// true
console.log(t.endsWith('!'))// true
console.log(t.includes('o'))// true

// 4.6实例方法：repeat()
// repeat方法返回一个新字符串，表示将原字符串重复n次
console.log('x'.repeat(3))
console.log('hello'.repeat(2))
// 如果是小数，则会取整数抹去小数部分
console.log('na'.repeat(2.9))
// 如果参数为负数，那么会报错
// repeat的参数如果是字符串则会先转换为数字

//4.7 实例方法：padStart(),padEnd()
// ES2017引入了字符串的不全长度的功能。如果某个字符串不够指定长度，会在头部或尾部进行补全
// padStart()用于头部补全，padEnd()用于尾部补全
// 以上两个方法一共接收两个参数，一个补全生效的最大长度，第二个参数时用来补全的字符串
console.log('x'.padStart(5, 'ab'))
console.log('x'.padStart(4, 'ab'))
console.log('x'.padEnd(5, 'ab'))
// 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串
console.log('abc'.padStart(10, '0123456789'))
// 如果省略第二个阐述，默认使用空格补全长度。
// padStart()的常见用途是为了数值补全指定位数。下面代码生成10位的数值字符串
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
// 另一个用途是提示字符串格式
console.log('12'.padStart(10, 'YYYY-MM-DD')) // "YYYY-MM-12"
console.log('09-12'.padStart(10, 'YYYY-MM-DD')) // "YYYY-09-12"

// 4.8 实例方法：trimStart().trimEnd()
// es2019对字符串新增了trimStart()和trimEnd()这两个方法，他们的行为与trim()相同

// 4.9实例方法：matchAll()方法返回一个正则表达式在当前字符串的所有匹配

// 4.10实例方法：replaceAll()
// 历史上，字符串的实例方法replace()只能替换第一个匹配。
console.log('aabbcc'.replace('b', '_'))
// 这样不得不引入正则表达式来替换，但是es6引入了replaceAll()方法，可以替换所有匹配
// let c='aabbcc'
// console.log(c.replaceAll('b', '_')) //replaceAll()方法对版本有限制，这个方法比较新
// 'aabbcc'.replace(/b/g, '_')

// const str = '123abc456';
// const regex = /(\d+)([a-z]+)(\d+)/g;

// function replacer(match, p1, p2, p3, offset, string) {
//   return [p1, p2, p3].join(' - ');
// }

// console.log(str.replaceAll(regex, replacer))

// 4.11.实例方法：at()
// at()方法可以接受一个整数作位参数，返回参数指定该位置的字符，支持负索引从后往前倒数
// 还是node.js版本的原因
const str = 'hello'
console.log(str.at(1))
console.log(str.at(-1))