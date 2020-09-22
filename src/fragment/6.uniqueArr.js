// ! 数组去重
const arr = [1, 1, '1', 15, true, NaN, 'NaN', NaN, true, false, null, false, null, 'true', 'a', {}, {}];
// => [1, '1', 15, true, NaN, 'NaN', false, 'true', 'a', {}, {}]

// 方法一: Set()
// ! {}-空对象，无法去重
const res1 = Array.from(new Set(arr));
// const res1 = [...new Set(arr)];
// [...new Set(arr)]
console.log('res1', res1); // annie-log


// 方法二: 双层for循环 + splice
//! NaN 和 {} 无法去重
const unique = arr => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (arr[i] === arr[j]) {
            arr.splice(j, 1);
            // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
            len--;
            j--;
        }
      }
    }
    return arr;
}
console.log('res2', unique(arr)); // annie-log
  
// 方法三: indexOf
//! NaN 和 {} 无法去重
const unique2 = arr => {
    const res = [];
    arr.map(item => {
        if (res.indexOf(item) === -1) {
            res.push(item);
        }
    }) 
    return res;
}
console.log('res3', unique2(arr)); // annie-log
  

// 方法四: includes
//! {} 无法去重
const unique3 = arr => {
    const res = [];
    arr.map(item => {
        if (!res.includes(item)) {
            res.push(item);
        }
    }) 
    return res;
}
console.log('res4', unique3(arr)); // annie-log


// 方法五: filter
//! {} 无法去重, NaN直接消失了
const unique4 = arr => {
    return arr.filter((item, index) => {
      return arr.indexOf(item) === index;
    });
}
console.log('res5', unique4(arr)); // annie-log
  

// 方法六: Map
//! {} 无法去重
// 创建一个空Map数据结构，遍历需要去重的数组，把数组的每一个元素作为key存到Map中。
// 由于Map中不会出现相同的key值，所以最终得到的就是去重后的结果。
const unique5 = arr => {
    const map = new Map();
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!map.has(arr[i])) {
            map.set(arr[i], true)
            res.push(arr[i]);
        }
    }
    return res;
}
console.log('res6', unique5(arr)); // annie-log

// 方法七: reduce + includes + 运算展开符
//! {} 无法去重
const unique6 = arr => {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
};
console.log('res7', unique6(arr)); // annie-log

// 方法八: 利用sort(),排序相邻元素比较
//! {} 和 NaN 无法去重
const unique7 = arr => {
    arr = arr.sort();
    console.log('arr.sort()', arr); // annie-log
    
    let array = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            array.push(arr[i]);
        }
    }
    return array;
}
console.log('res8', unique7(arr)); // annie-log


//! js数组中去除重复对象的方法
const arrObj = [{}, {a:1}, {}, {a:1}, {a:2}];
const unique8 = arr => {
    let unique = {};
    arr.forEach(item=> { unique[JSON.stringify(item)] = 1 });
    arr = Object.keys(unique).map(item => JSON.parse(item));
    return arr;
}
console.log('res9', unique8(arrObj)); // annie-log  [ {}, { a: 1 }, { a: 2 } ]


// !去除数组中的空对象
const arrFliterObj = [];
for(let j in arrObj){
    for(let prop in arrObj[j]){
        if(prop!=''||arrObj[j][prop]!=''){
            arrFliterObj.push(arrObj[j]);
        }
    }
};
console.log('去除数组中的空对象', arrFliterObj); // annie-log
