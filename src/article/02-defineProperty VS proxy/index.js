// ##  写在前面
// >  + 知识就是力量。 ——安琪拉
// >  + 知识就是力量，但更重要的是运用知识的技能。 —— 培根
// >  + 本文主要介绍了vue实现响应式数据/双向绑定原理的基础API的使用方法及拓展知识。
// >  + vue2 基于 Object.defineProperty，vue3 基于 proxy。本文做了详细描述和对比。

// ## 响应式数据/双向绑定原理
// > Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。其中，View变化更新Data，可以通过事件监听的方式来实现，所以 Vue数据双向绑定的工作主要是如何根据Data变化更新View。
// > 简而言之， Vue要实现数据双向绑定，需要做三件事情：
// > > 1. 检测到Data变化（Observer）
// > > 2. 追踪收集依赖，通知变更（Dep）
// > > 3. 更新View视图（Watcher）

// 本文先来讲解vue实现数据双向绑定的第一步：如何检测到Data的变化。

// 假设我们有如下这样的一个data对象
c
let obj = {
    a: 1, 
    b: 2,
    c: ['排序', '递归']
};

// 我们修改obj.a = 3, 那怎样才可以监听到这个改变呢？我们很容易想到大名鼎鼎的Object.defineProperty()。Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
// ## 1.Object.defineProperty()
// > Object.defineProperty(obj, prop, descriptor)
// >   参数：
// > 【obj】: 要定义属性的对象。
// > 【prop】: 要定义或修改的属性的名称或 Symbol 。
// > 【descriptor】: 要定义或修改的属性描述符。

// 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。**一个描述符只能是这两者其中之一；不能同时是两者**。
// ### 1.1数据描述符
//  数据描述符是一个具有值的属性，该值可能是可写的，也可能是不可写的。

//     它具有以下可选的键值：

//     configurable：表示该属性能否通过delete删除，能否修改属性的特性或者能否修改访问器属性，默认为false。
    
//     enumerable：表示该属性是否可以枚举，即可否通过for..in访问属性。默认为false。

//     value：表示该属性的值。可以是任何有效的Javascript 值（数值，对象。函数等）。默认为undefined。

//     writable：表示该属性的值是否可写，默认为false。

// 【栗子】：

console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
// result: { value: 2, writable: true, enumerable: true, configurable: true }

// ### 1.2存取描述符
// 存取描述符还具有以下可选键值：
  
//     get：  
//     属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。  
//     执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。  
//     该函数的返回值会被用作属性的值。

//     set：  
//     属性的 setter 函数，如果没有 setter，则为 undefined。  
//     当属性值被修改时，会调用此函数。  
//     该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。


// 显然，我们只需要利用对象属性描述符里面的存取描述符，就能够检测到对象的改变。


// 【栗子】：
let _value = obj.a;
Object.defineProperty(obj, 'a', {
   get() {
       console.log('you get a number');
       return _value;
   },
   set(newVal){
       console.log('you set a number');
       _value = newVal;
   }
});

console.log(obj.a);
obj.a = 2;
console.log(obj.a);


// 打印结果
// you get a number
// 1
// you set a number
// you get a number
// 2


// 我们成功检测到了obj对象中a的改变，vue2.x正式基于这一特性实现了数据双向绑定的Observer部分。趁热打铁，再多试一次，享受Object.defineProperty的乐趣吧~

// 【Do it again】：
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

console.log(obj.c);
obj.c.push('二分查找');
console.log(obj.c);

// 打印结果
// you get the array
// [ '排序', '递归' ]
// you get the array
// you get the array
// [ '排序', '递归', '二分查找' ]

// OMG！怎么没有打印set里的日志，可是数组确实追加进去了。难道Object.defineProperty不能监听数组的变化？没错，确实是这样，因此vue2.x在实现数组的响应式时，它使用了一些hack，把无法监听数组的情况通过 **重写数组** 的部分方法（push，pop, shif, unshift, splice, sort, reverse）来实现响应式，这也只限制在数组的这七个方法，其他数组方法及数组的使用则无法检测到，例如如下两种使用方式：

data.c[index] = newValue;
data.c.length--;

// ## 2.数组hack
// 1. 复制一份数组的原型方法，防止污染

const oldArrayProperty = Array.prototype;
const arrayProto = Object.create(oldArrayProperty);

// 2. 遍历，将arrayProto对象上的方法转换为观察者对象

const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];  
methodsToPatch.forEach(methodName => {
    // 往arrayProto对象中加入methodsToPatch中的属性，并执行原生的methodsToPatch对应的方法
	Object.defineProperty(arrayProto, methodName, {
		value () {
            //监听数组变更
            console.log('you change the array');
			oldArrayProperty[methodName].apply(this, arguments)
		}
	})
})

// 3. 让数组继承arrayProto中的方法

obj.c.__proto__ = arrayProto;
// 好啦，见证奇迹的时刻：

console.log(obj.c);
obj.c.push('二叉分法');
console.log(obj.c);

// 结果：
// [ '排序', '递归' ]
// you change the array
// [ '排序', '递归', '二叉分法' ]

// 一个简单的数组hack就实现了，vue2.x也正是基于这种数组方法重写的原理，监听数组变更，从而实现数组类型数据的双向绑定的。


// vue2.x在实现数据响应式时，需要区别对待数组和对象，因此在vue3.0，尤大大和他的团队弃用了这种方式，选择使用es6的新特性 **Proxy** 和 **Reflect** 来实现双向绑定。
// ## 3.Proxy
// vue3.0基于Proxy来做数据劫持代理，可以支持原生数组的响应式。还可以直接支持新增和删除属性，使用起来十分简洁明了。

// 【栗子】：
var obProxy = new Proxy(ob, {
    get(target, key, receiver) {
        console.log('you get:' + key);
        return target[key];
    },
    set(target, key, value, receiver){
     	console.log('you set:' + key);
        // target[key] = value;
        // Reflect.set(target, key, value)等同于上面的target[key] = value;
        return Reflect.set(target, key, value);
    }
});

// 我们来分别打印一下

console.log(obj.a);
obj.a = 666;
console.log(obj.a);

// 结果：
// 1
// 666
// 不进入上面的get和set方法
// 和
console.log(obProxy.a);
obProxy.a = 2;
console.log(obProxy.a);

// 结果：
// you get:a
// 1
// you set:a
// you get:a
// 2

// 结果印证：proxy是去创建一个新的代理对象,所以在改变原对象obj时，上述中的get与set中的console均未打印。

// ## 4. 对比：为什么vue3改用proxy实现数据响应式？

// > 1. Proxy 可以直接监听对象而非属性。
// > 2. Proxy 可以直接监听数组的变化。
// > 3. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的。
// > 4. Object.defineProperty 只能遍历对象属性实现监听，而Proxy 返回的是一个新对象,我们可以只操作新的对象达到目，大大减少了遍历带来的性能开销。
// > 5. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

// 参考文档：[MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
