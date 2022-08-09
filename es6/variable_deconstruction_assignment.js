// 2.1数组的解构赋值
// let a=1;
//     b=2;
//     c=3;
// 以上写法可以写成
// let [a,b,c]=[1,2,3]
// // 这种写法的本质是属于模式匹配，只要等号两边的模式相等
// // 左边的变量就会赋予对应的值
// let [foo, [[bar], baz]] = [1, [[2], 3]];
// foo // 1
// bar // 2
// baz // 3

// let [ , , third] = ["foo", "bar", "baz"];
// third // "baz"

// let [x, , y] = [1, 2, 3];
// x // 1
// y // 3

// let [head, ...tail] = [1, 2, 3, 4];
// head // 1
// tail // [2, 3, 4]

// let [q, w, ...z] = ['a'];
// q // "a"
// w // undefined
// z // []
// 结构不成功，变量的值对等于undefined
// 如果等号的右边不是数组（即不是可遍历的结构），那么会报错


// 报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};
// 以上错误的本质是模式不匹配导致的
// 前5个是转换为对象不具备Iterator接口，最后一个不具备Iterator接口
// 对于Set结构，也可以使用数组的结构赋值
// let [x,y,z]=new Set(['a','b','c'])
// console.log(x,y,z)

function* fibs(){
    let a=0;
    let b=1;
    while(true){
        yield a;//0,1,1,2,3,5
        [a,b]=[b,a+b]
    }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
console.log(first, second, third, fourth, fifth, sixth)