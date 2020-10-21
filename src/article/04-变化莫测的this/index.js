// console.log(this); // result: {}
// console.log(this === module.exports); // result: true



// 构造函数中的this指向的是实例对象
function Person() {
    this.age = 10;
    // console.log(this);  // 指向Person {age: 10}
    // return {
    //     age: 100
    // }
}

var lily = new Person();
// console.log(lily.age);

/**
 * new 操作符做的事情
 */
// 1.创建一个空对象
var obj = new Object();
// 2.设置原型链 (当调用构造函数创建一个新实例后, 该实例的内部将包含一个指针,指向构造函数的原型对象)
obj.__proto__ = Person.prototype;
// 3.改变this指向并执行函数 (创建新的对象后,将构造函数的作用域赋值给新对象,因此this就指向了这个新对象)
var result = Person.call(obj);
// 4.判断函数返回类型(如果构造函数没有返回值,隐式返回this对象--即新对象)
if (typeof(result) === "object") {
    lily = result
} else {
    lily = obj;
}

// 普通函数没有定义返回值得情况下返回undefined
// 构造函数在没有return的情况下返回新创建的对象
// !但是，在有显示返回值的情况下，如果返回值为基本数据类型{string，number，null，undefined，Boolean}，返回值仍然是新创建的对象。
// 只有在显示返回一个非基本数据类型时，函数的返回值才为指定对象。在这种情况下，this所引用的值就会被丢弃了

Person.age = 20;
Person.prototype.age = 30;
Person.prototype.method = function() {
    console.log(this.age);
}

new Person().method();  // 10
Person.prototype.method();  // 30

var prototype = Person.prototype;
var method = prototype.method;
method();  // undefined  此时this指向window