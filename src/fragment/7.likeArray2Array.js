// !类数组转数组
// 方法一：Array.from
let res1 = Array.from(document.querySelectorAll('div'));

// 方法二：Array.prototype.slice.call()
let res2 = Array.prototype.slice.call(document.querySelectorAll('div'))

// 方法三：扩展运算符
let res3 = [...document.querySelectorAll('div')]

// 方法四：利用apply & concat
let res4 = Array.prototype.concat.apply([], document.querySelectorAll('div'));


// !类数组转数组
const likeArr = { '0':'兰陵王', '1':'程咬金', '2':'鲁班', '3':'甄姬', '4':'大乔', length:5 };
const likeArr1 = new Set([ '兰陵王', '程咬金', '鲁班', '甄姬', '大乔' ]);
// 方法一：Array.from
let result1 = Array.from(likeArr);

// 方法二：Array.prototype.slice.call()
let result2 = Array.prototype.slice.call(likeArr);

// 方法三：扩展运算符  -- 注意类型!只针对具有Symbol.iterator的类数组有效,如new Set()出来的类数组
let result3 = [...likeArr1];

// 方法四：利用apply & concat
let result4 = Array.prototype.concat.apply([], likeArr);
//[ '兰陵王', '程咬金', '鲁班', '甄姬', '大乔' ]

