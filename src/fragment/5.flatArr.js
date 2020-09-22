// ! 数组扁平化
const arr = [1, [2, 3, [4, 5, 6, [7, 8]]], 9];
// 方法一: 展开运算符
function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
const res1 = flatten(arr);
console.log('res1', res1); // annie-log

// 方法二: flat(), 接受一个参数,表示扁平化层级
const res2 = arr.flat(Infinity);
console.log('res2', res2); // annie-log

// 方法三: 正则
const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
console.log('res3', res3); // annie-log

// 方法四: 递归
const res4 = [];
const flatArr1 = arr => {
    arr.map(item => {
        if (Array.isArray(item)) {
            flatArr1(item);
        } else {
            res4.push(item);
        }
    })
}
flatArr1(arr);
console.log('res4', res4); // annie-log

// 方法五: reduce
const flatArr2 = arr => {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flatArr2(cur) : cur);
    }, [])
  }
const res5 = flatArr2(arr);
console.log('res5', res5); // annie-log

// 方法六: toString
const res6 = arr.toString().split(',').map(item => parseInt(item));
console.log('res6', res6); // annie-log



