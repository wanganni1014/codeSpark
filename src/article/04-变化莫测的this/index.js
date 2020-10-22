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


// 改变this指向的方法
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};
// 【call】
//  第一个参数是用作“this”的对象，其余参数用作函数的参数
 add.call(o, 5, 7);  // 16

// 【apply】
//  第一个参数是用作“this”的对象，第二个参数是一个数组，数组中的成员用作函数参数
 add.apply(o, [10, 20]);   // 34
// 在非严格模式下使用 call 和 apply 时，如果用作 this 的值不是对象，则会被尝试转换为对象。null 和 undefined 被转换为全局对象。

// 【bind】 
// ECMAScript 5 引入了 Function.prototype.bind()。调用f.bind(someObject)会创建一个与f具有相同函数体和作用域的函数，但是在这个新函数中，this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。

function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var h = g.bind({a:'yoo'}); // bind只生效一次！
console.log(h()); // azerty

var o = {a:37, f:f, g:g, h:h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
