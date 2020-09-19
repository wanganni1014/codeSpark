// !函数式编程倡导 利用若干简单的执行单元 让计算结果不断渐进，逐层推导复杂的运算。
// 如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数的合成"（compose）。
// 合成的好处显而易见，它让代码变得简单而富有可读性，同时通过不同的组合方式，我们可以轻易组合出其他常用函数，让我们的代码更具表现力。
// reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
// reduce() 可以作为一个高阶函数，用于函数的 compose。
const arr = [1, 2, 3, 4, 5];
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
// 参数说明:
// total -* 初始值,或者计算结束后的返回值
// currentValue -* 当前元素
// currentIndex - 当前元素的索引
// arr - 当前元素所属的数组对象

const reducer = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 5);
console.log(reducer);  // 20 -- 5与数组中的所有数值累加

function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

// 写一个compose,全部执行这些方法,类似于f1(f2(f3('omg')))
// compose 返回一个函数
function compose(...funcs) {
  if (!funcs.length) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

let res = compose(f1, f2, f3)('yooh');
console.log(res); //f3 yooh f2 yooh f1 yooh
