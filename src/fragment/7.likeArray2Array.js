// 类数组转数组
// 方法一：Array.from
let res1 = Array.from(document.querySelectorAll('div'));

// 方法二：Array.prototype.slice.call()
let res2 = Array.prototype.slice.call(document.querySelectorAll('div'))

// 方法三：扩展运算符
let res3 = [...document.querySelectorAll('div')]

// 方法四：利用apply & concat
let res4 = Array.prototype.concat.apply([], document.querySelectorAll('div'));
