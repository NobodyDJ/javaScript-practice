// var mod = require('./lib')

// console.log(mod.counter)
// mod.incCounter();
// console.log(mod.counter)


// import { counter, incCounter } from './lib.js'
// console.log(counter);
// incCounter();
// console.log(counter)
// 一行代码表明es6模块输入的变量counter是活的
// 完全反应了lib.js内部模块的变化。
// import { foo } from './lib.js';
// console.log(foo)
// setTimeout(() => {
//     console.log(foo)
// }, 500);
// foo=1

// import './x.js'
// import './y.js'
//这个例子可以证明，x.js和y.js加载的都是同一个实例
import { a } from './lib'
a()