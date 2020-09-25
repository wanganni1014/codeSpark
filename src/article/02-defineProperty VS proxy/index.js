let obj = {
    a: 1, 
    b: 2,
    c: ['排序', '递归']
};


// let _value = obj.a;
// Object.defineProperty(obj, 'a', {
//     get() {
//         console.log('you get a number');
//         return _value;
//     },
//     set(newVal){
//         console.log('you set a number');
//         _value = newVal;
//     }
//  });

// console.log(obj.a);
// obj.a = 2;
// console.log(obj.a);


// let _value = obj.c;
// Object.defineProperty(obj, 'c', {
//     get() {
//         console.log('you get the array');
//         return _value;
//     },
//     set(newVal){
//         console.log('you change the array');
//         _value = newVal;
//     }
//  });

// console.log(obj.c);
// obj.c.push('二分查找');
// console.log(obj.c);
// var pipe = function (value) {
//     var funcStack = [];
//     var oproxy = new Proxy({} , {
//         // 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
//         get : function (pipeObject, fnName) {
//         if (fnName === 'get') {
//             return funcStack.reduce(function (val, fn) {
//                 return fn(val);
//             }, value);
//         }
//         funcStack.push(window[fnName]);
//         return oproxy;
//         }
//     });

//     return oproxy;
// }


// var double = n => n * 2;
// var pow    = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;

// let result = pipe(3).double.pow.reverseInt.get; // 63
// console.log('result', result); // annie-log

const oldArrayProperty = Array.prototype;
const arrayProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(methodName => {
    return arrayProto[methodName] = () => {
        oldArrayProperty[methodName].call(this, ...arguments);
    }
})
console.log('arrayProto', arrayProto); // annie-log

obj.c.__proto__ = arrayProto;
let _value = obj.c;
Object.defineProperty(obj, 'c', {
    get() {
        console.log('you get the array');
        return _value;
    },
    set(newVal){
        console.log('you change the array');
        _value = newVal;
    }
 });
// // 调用
// protoAugment(obj.c, arrayMethods);

// console.log(obj.c);
// obj.c.push('二分查找');
// console.log(obj.c);

// var obProxy = new Proxy(obj, {
//     get(target, key, receiver) {
//         console.log('you get:' + key);
//         return target[key];
//     },
//     set(target, key, value, receiver){
//         // target[key] = value;
//         console.log('you set:' + key);
//         // Reflect.set(target, key, value)等同于上面的target[key] = value;
//         return Reflect.set(target, key, value);
//     }
// });

// console.log(obj.a);
// obj.a = 666;
// console.log(obj.a);

// console.log(obProxy.a);
// obProxy.a = 2;
// console.log(obProxy.a);