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