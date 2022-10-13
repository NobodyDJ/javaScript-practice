// var counter = 3;
// function incCounter() {
//     counter++;
// }
// 输出的值无法再改变
// module.exports = {
//     counter,
//     incCounter
// }
// 如上代码所示，commonJs输出的是值的拷贝，一旦输出一个值，后续模块内部再改变
// 就检测不到了
// 本质是整个值被缓存了，要想拿到改变后的值，可以写成一个函数

// 输出一个getter函数
// module.exports = {
//     get counter() {
//         return counter
//     },
//     incCounter
// }
// 这里输出的是一个取值函数，这样可以正确读取内部变量了。
// 以上是commonJS模块的原理
// 下面是es6模块的运行机制
// export let counter = 3;
// export function incCounter() {
//     counter++;
// }
// export var foo = 'bar';
// setTimeout(() => {
//     foo = 'baz'
// }, 500);
//外部模块输出bar,baz
//可见，ES6模块不会缓存运行结果，而是去动态地去被加载的模块取值，引用模块拿被加载的模块
//向外暴露的属性是一个只读属性

// 最后export通过接口，输出的是同一个值。得到的都是同样的实例
// function C() {
//     this.sum = 0;
//     this.add = () => this.sum++;
//     this.show = () => console.log(this.sum);
// }
// export let c =new C()

export function a() {
    console.log('23')
}
