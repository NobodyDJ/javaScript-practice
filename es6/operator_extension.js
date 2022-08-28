// 11.1指数运算符
console.log(2 ** 2)
// 多个指数运算符连用时，是从最右边开始计算的
console.log(2 ** 3 ** 2)//512
// 可以和等号结合，形成一个新的赋值运算符(**=)
let a = 1.5
console.log(a **= 2)

let b = 4
console.log(b **= 3)

// 11.2 链判断运算符
// 过去的写法
// const firstName = (message && message.body && message.body.user && message.body.user.firstName) || 'default'
// 上面这个写法太复杂了，需要四次判断，每一层是否有值
// 于是es2022出现了链判断元素符
const firstName = message?.body?.user?.firstName || 'default'
// 上面的代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined。
// 如果是的，就不在往下运算，返回undefined
// 对于那些可能没有实现的方法，这个运算符是很有用的
if (myForm.checkValidity?.() === false) {
    // 表单验证失败
    return
}
// 链判断运算符?.有三种写法
// obj?.prop // 对象属性是否存在
// obj?.[expr] // 同上
// func?.(...args) // 函数或对象方法是否存在

// 下面是?.运算符常见形式，以及不使用该运算符时的等价形式。
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()
// 链式判断的几个注意点
// 1.短路机制
// 2.括号影响
// 3.报错的场合
// 以下的方法都会报错
// 构造函数
// new a?.()
// new a?.b()

// // 链判断运算符的右侧有模板字符串
// a?.`{b}`
// a?.b`{c}`

// // 链判断运算符的左侧是 super
// super?.()
// super?.foo

// // 链运算符用于赋值运算符左侧
// a?.b = c
// 4.右侧不得为十进制数值

// 11.3 Null 判断运算符
// es202引入了新的Null判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true

// 这个运算符很适合判断函数参数是否赋值。
function Component(props) {
    const enable = props.enabled ?? true;
    // …
}
// 11.4逻辑赋值运算符
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)


// 链式判断和??是判断值是否为null或undefined很有用



