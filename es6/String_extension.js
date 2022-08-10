// 3.1字符的Unicode表示法
// 字符的Unicode表示法
// 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的Unicode码点
// \u0000~\uFFFF之间的字符，超过这个范围需要采用双字节的形式表示

//3.2字符串的遍历接口
// 遍历字符串可以采用for...of循坏遍历
for(let codePoint of 'foo'){
    console.log(codePoint);
}
// for...of循环最大的优点在于可以识别大于0xFFFF的码点，传统for循环无法识别这样的码点
let text = String.fromCodePoint(0x20BB7);

for(let i=0;i<text.length;i++){
    console.log(text[i])// 识别出乱码
}
for(let i of text){
    console.log(i);//𠮷 识别出字符
}
console.log('--------------------------------------------')
//3.3 直接输入U+2028和U+2029
// JavaScript允许直接输入字符，以及输入字符的转移形式。、
// JavaScript规定有5个字符，不能再字符串里面直接使用，只能使用转移形式
// U+005C：反斜杠（reverse solidus)
// U+000D：回车（carriage return）
// U+2028：行分隔符（line separator）
// U+2029：段分隔符（paragraph separator）
// U+000A：换行符（line feed）

// JSON格式允许字符串里直接使用U+2029和U+2029。JSON.parse解析，就会有可能报错
const json='"\u2028"'
JSON.parse(json)
console.log(JSON.parse(json))// 空
const PS = eval("'\u{2029}'");
console.log(PS)// 空
console.log('-------------------------------')

// 3.4 JSON.stringify()的改造
// JSON 数据必须是 UTF-8 编码，但是JSON.stringify()方法可能会返回不符合UTF-8标准的字符串
// ES2019胡改变JSON.stringify()的行为。如果0xD800到0xDFFF之间的单个，或者存在不配对的形式，会返回转移字符串
// 下一步自己处理
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""

//3.5 模板字符串
// 模板字符串是增加版的字符串，用反引号(`)表示。
// 它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量
console.log(`In JavaScript '\n' is a line-feed`)
console.log(`In JavaScript this is 
not legal`)
// 在字符串中嵌入变量
let name= "Bob",time="today"
console.log(`              Hello ${name},how are you ${time}?`)

//如果压在模板字符串中引用反引号，需要加上转义符\
console.log(`\`YO\` World!`)

// 在模板字符串中，所有的空格和换行都会被保留，可以使用trim()方法消除它
let a=`            In JavaScript this is not legal   `
console.log(a.trim())
// 大括号内部可以放入任意的JavaScript表达式，可以就行运算，以及引用对象属性
let x=1
    y=2
console.log(`${x}+${y}=${x+y}`)

function fn(){
    return "Hello World"
}
console.log(`foo ${fn()} bar`)