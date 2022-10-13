var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
// 这里就是，a.js执行到第一行像输出了done=false
// 而此时b没有执行，a交出执行权给b
// b发现a执行了第一行于是拿到a的done=false，继续向下执行
// 执行到b.js执行完毕，然后交换给a.js，随后继续执行，直到a执行完毕
// 执行结果如下：
// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// 在 main.js 之中, a.done=true, b.done=true
// 需要小心的是CommonJS模块遇到循环加载时，有可能时执行了部分值
// 后面的代码并没有执行
