// 5.1 二进制和八进制表示法
// 可以使用前缀0b(或0B)和0o(或0O)表示
console.log(0b111110111 === 503)
console.log(0o767 === 503)

// 从ES5开始，在严格模式之中，八进制就不在允许使用前缀0表示，es6进一步明确，要使用前缀0o表示
// 如果要将0b和0o前缀的字符串数值转为十进制，要是用Number方法。
console.log(Number('0b111')) //7

// 5.2 数值分隔符
let budget = 1_000_000_000_000
console.log(budget === 10 ** 12)

// 数值分隔符有几个使用注意点。
// --不能放在数值的最前面或最后面
// --不能两个或两个以上的分隔符连在一起
// 小数点的前后不能有分隔符
// 科学计数法里面，表示指数的e或E前后不能有分隔符。

// 除了十进制，其他进制的数值也可以使用分隔符。
console.log(Number(0b1010_0001_1000_0101))
// 数值分隔符主要是为了编码时书写数值方便

// 5.3 Number.isFinite() 用来检测一个数值是否有限
//     Number.isNaN() 用来检测一个数值是否是数字
// Number.isFinite是用来专门用来检测数值，如果不是数值则一律是false

// Number.isNaN()
// true  true false true false false true false
// true true true true true false false false

// isNaN(NaN); // true

// isNaN('A String'); // true

// isNaN(undefined); // true

// isNaN({}); // true

// Number.isNaN(NaN); // true

// Number.isNaN('A String'); // false

// Number.isNaN(undefined); // false

// Number.isNaN({}); // false

// JS中，value一共有七种类型
// 1.null 2.undefined 3.boolean 4.number 5.string 6.object 7.symbol
// true false true true/false true false true/false NaN/number ???[Object Number]
// true false false false

//它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

// 5.4 Number.parseInt(),Number.parseFloat()

// 5.5 Number.isInteger()
// 用来判断一个数值是否为整数。
// JavaScript采用IEEE 754标准，数值存储为64为双精度格式，数值精度最多可以达到53个二进制超过这个限度会出现误判
Number.isInteger(3.0000000000000002) //true

// 5.6 Number.EPSILON
// ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。

// 5.7 安全整数和Number.isSafeInteger
// JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围
// ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量
// Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

// 5.8 Math对象的扩展
// 5.8.1 Math.trunc()方法用于去除一个数的小数部分，返回整数部分
// 5.8.2 Math.sign() 方法用于判断一个数到底是正数，负数还是零
// 5.8.3 Math.cbrt() 方法用于计算一个数的立方根
// 5.8.4 Math.clz32()方法将参数转为32位无符号整数的形式，然后返回这个32值里面有多少个前导0 对于小数，Math.clz32方法值考虑整数部分
// 5.8.5 Math.imul()方法返回连个数以32为带符号整数形式相乘的结果，返回的也是一个32位的带符号整数 多数情况下Math.imul(a,b)与a*b的结果相同
// 5.8.6 Math.fround()方法返回一个数的32位单精度符号点数形式，范围在Math.pow(-2,24)和Math.pow(2,24)之间
// 5.8.7 Math.hypot()方法返回所有参数的平方和的平方根

// 以下是对数方法
// 5.8.8 Math.expm1()返回 e的x次方 - 1，即Math.exp(x) - 1。
// 5.8.9 Math.log1p()返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
// 5.9.10 Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
// 5.9.11 Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。

// 双曲线函数方法
// Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

// 5.9 BigInt 新的数据类型
// 该数据类型解决了javaScript无法识别的数学精度
// 为了与Number类型区别，BigInt类型的数据必须添加后缀n
console.log(42n === 42) //false
// BigInt与普通整数是两种值，他们之间不相等

let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571...00000000n

// BigInt函数可以将其他类型转换为BigInt类型
// 需要注意的是 小数转换类型会报错

// Boolean(),Number()和String()三个方法，可以将BigInt转换为布尔值，数值和字符串类型

// 数学运算
// BigInt类型提供了+,-,*和**四个二元运算符。除法元素/会社区小数部分，返回一个整数
console.log(9n / 5n) //1n
// BigInt不能与普通数值进行混合预算

//其他运算
// BigInt对应的布尔值，与Number类型一致，即0n会转为false,其他值转为true
// 比较匀速付和相等运算符允许BigInt与其他类型的值混合计算
// BigInt与字符串混合运算时，会先转为字符串，在进行运算
console.log(''+123n)



