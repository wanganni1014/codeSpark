// Memoization 是Javscript中的一项技术,通过缓存结果并在下一个操作中重新使用缓存来加速查找费时的操作.(以空间换时间)
// 基本思想

// function testFn(arg) {
//     // 判断是否有这个参数的计算结果缓存,如果有,直接返回缓存
//     if ( cache has operation result for arg) {
//         return the cache;
//     } else {
//         // ....
//         // 执行一个非常耗时的操作,假设30分钟
//     }

//     // 否则 返回新的参数的计算结果
//     return the result;
// }

// testFn('one');  // 耗时30分钟,得到结果
// testFn('two');  // 耗时30分钟,得到结果
// testFn('one');  // 很快从缓存中取出结果


// 下面我们看一个计算平方根的例子
// function sqrt(arg) {
//     return Math.sqrt(arg);
// }
// console.log(sqrt(4)); // 2
// console.log(sqrt(9)); // 3

// 现在我们可以使用 memoize 来处理这个函数,为函数添加memoization
// function sqrtMemoize(arg) {
//     if (!sqrtMemoize.cache) {
//         sqrtMemoize.cache = {};
//     }

//     if (!sqrtMemoize.cache[arg]) {
//         console.log(arg + '计算得到的'); // annie-log
//         // 返回值,并存入缓存
//         return sqrtMemoize.cache[arg] = Math.sqrt(arg)
//     }
//     console.log(arg + '从缓存中取得'); // annie-log
//     return sqrtMemoize.cache[arg]
// }

// console.log(sqrtMemoize(4)); // 2 计算得到的
// console.log(sqrtMemoize(9)); // 3 计算得到的
// console.log(sqrtMemoize(9)); // 3 从缓存中取得

// 现在我们可以创建一个独立的函数来记忆任何函数,我们将此函数称为memoize
function memoize(fn) {
    return function() {
        // es6语法中新增了Array.from()，所以上述类型的对象可以Array.from(obj)就直接转化成数组！
        // Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组 
        // 1、Array是构造函数
        // 2、arguments是类数组对象(缺少很多数组的方法)
        // 3、call让一个对象调用另一个对象的方法。你可以使用call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）
        // 4、slice从一个数组中切割，返回新的数组，不修改切割的数组
        // so，其实本质就是arguments这个对象使用了数组的slice这个方法，得到了参数构成的数组（也可以用apply）。
        // Array.prototype.slice.call(arguments, [0, arguments.length])
        var args = Array.prototype.slice.call(arguments);
        // var args = Array.from(arguments);
        console.log('args', args); // annie-log
        
        fn.cache = fn.cache || {};
        return fn.cache[args] ? fn.cache[args] : (fn.cache[args] = fn.apply(this, args))
    }
}

// js中定义的所有的函数都是从Function.prototype中继承的.因此我们可以将memoize函数添加到Function原型中去,以便我们定义的任何函数都可以调用
Function.prototype.memoize = function() {
    var self = this;
    return function () {
        var args = Array.prototype.slice.call(arguments);
        self.cache = self.cache || {};
        return self.cache[args] ? self.cache[args] : (self.cache[args] = self(args));
    }
};

// 斐波那契数列(Fibonacci) -- 每个数字是前面两个数字之和
function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}

let fibonacciTest = memoize(fibonacci);
// let fibonacciTest = fibonacci.memoize();
// !40以上将是一个非常耗时的操作
// ! 实践证明.let fibonacciTest = fibonacci.memoize();更节省时间
console.time('first');
fibonacciTest(25);
console.timeEnd('first');   //first: 8.905ms
console.time('second');
fibonacciTest(25);
console.timeEnd('second');  //second: 0.107ms

console.time('first1');
fibonacci.memoize()(25);
console.timeEnd('first1');   //first: 8.905ms
console.time('second1');
fibonacci.memoize()(25);
console.timeEnd('second');  //second: 0.107ms


// console.time('time:');
// memoize(fibonacci)(100);
// console.timeEnd('time:');   //111: 1.443ms
// console.time('memoziedTime:');
// memoize(fibonacci)(100);
// console.timeEnd('memoziedTime:');  //0.087ms

// memoization通常会缩短执行时间并影响我们应用程序的性能,当我们知道一组输入将产生某个输出时.memozation最有效.
// 遵循最佳实践原则,应该在纯函数(输入一样时得到一样的输出.即该函数没有副作用)实现memozation,
// 在处理递归函数时,memozation最有效,递归函数用于执行诸如GUI渲染,Sprite和动画物理等繁重操作.


// 联想 react中的memo 和 useMemo
// react/packages/react-reconciler/src/ReactFiberHooks.js