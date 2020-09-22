// defineProperty VS proxy
var obj = {a: 1, b: 2};
/**
 * defineProperty其实是定义对象的属性
 * value: 默认undefined
 * get： 默认undefined
 * set：默认undefined
 * writable： true  -- 可写，如果为false，则该属性不可重新赋值
 * enumerable： true --可遍历,如果为false，则该属性不可被遍历
 * configurable： true  --可枚举,如果为false，则该属性不可被删除
 */
Object.defineProperty(obj, 'a', {
    writable:false,
    enumerable: false,
    configurable: false
});
/**
 * defineProperty的get与set
 * 一旦定义了get与set，那么设置与获取值得时候就会进入这两个函数，但是必须在get中return才能够得到值
 */

let _value = obj.b;
Object.defineProperty(obj, 'b', {
   get() {
       console.log('you get a number');
       return _value;
   },
   set(newVal){
       console.log('you set a number');
       _value = newVal;
   }
});

console.log(obj.b);
obj.b = '1231';
console.log(obj.b);

// proxy
var ob = {a: 1, b: 2};
var obProxy = new Proxy(ob, {
    get(target, key, receiver) {
        console.log(receiver);
        console.log('you get a number');
        return target[key];
    },
    set(target, key, value, receiver){
        // target[key] = value;
        console.log(receiver);
        // Reflect.set(target, key, value)等同于上面的target[key] = value;
        return Reflect.set(target, key, value);
    }
});

console.log(ob.a);
ob.a = 2;
console.log(ob.a);

console.log(obProxy.a);
obProxy.a = 2;
console.log(obProxy.a);



/**
 * defineProperty是改变原对象
 * proxy是去创建一个新的代理对象,所以在改变原对象ob时，上述中的get与set中的console均为打印
 * 
 * vue3改用proxy实现数据的双向绑定的原因:
 * 1.defineProperty只能监听某个属性，不能对全对象进行监听，所以可以省去for in ，提升效率
 * 2.可以监听数组，不用再去单独的对数组做特异性操作
 * 
 */