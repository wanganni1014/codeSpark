// # 【冷知识】写在前面
// 类型化数组，即我们常说的类数组，类数组 —— 顾名思义长得像数组的东西（**实质是个对象**）。因此我们常用*likeArray*来定义它。 but but 其实，它的全名叫做类型化数组，英文对应*Typed Arrays*。你 get 到了没~

// # 一、何为类型化数组（Typed Arrays）？

// JavaScript类型化数组是一种**类似数组的对象**，并提供了一种用于访问原始二进制数据的机制。Array 存储的对象能动态增多和减少，并且可以存储任何JavaScript值。JavaScript引擎会做一些内部优化，以便对数组的操作可以很快。然而，随着Web应用程序变得越来越强大，尤其一些新增加的功能例如：音频视频编辑，访问WebSockets的原始数据等，如果使用JavaScript代码可以快速方便地通过类型化数组来操作原始的二进制数据。

 
// 类数组可以这样简单理解：

//  1. 是个**具有length属性，索引为非负整数** 的对象（调用  Array.isArray()  会返回false）。
//  2. 并不是所有可用于正常数组的方法都能被类型化数组所支持（如 push 和 pop）。

// [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)


// # 二、如何判断一个对象是否属于类数组 ？


function isTypedArray(val) {
    if (val &&                                   // val is not null, undefined, etc.
        typeof val === 'object' &&               // val is an object
        isFinite(val.length) &&                  // val.length is a finite number
        val.length >= 0 &&                       // val.length is non-negative
        val.length===Math.floor(val.length) &&   // val.length is an integer
        val.length < 4294967296)                 // val.length < 2^32
        return true;                             // Then val is array-like
    else
        return false;                            // Otherwise it is not
}


// # 三、如何将类数组转化为数组 ？

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


// ## 3.1 Array.prototype.slice的内部实现
Array.prototype.slice = function(start,end){  
  var result = new Array();  
  start = start || 0;  
  end = end || this.length; //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象
  for(var i = start; i < end; i++){  
       result.push(this[i]);  
  }  
  return result;  
} 
// ps: 根据slice内部实现，如果数组索引不是0开头，将会出现转化不完全的情况：

const typedArr = { '1':'兰陵王', '2':'程咬金', '3':'大乔', length:3 };
let result = Array.prototype.slice.call(typedArr);
console.log(result);  // 输出result： [ <1 empty item>, '兰陵王', '程咬金' ]


// # 三、如何将数组转化为类数组 ？
const convertToTypedArray = (array) => {
    if(array instanceof Array){  
        return arguments.callee.apply(this,array)
    } else {
        return arguments;
    }
}