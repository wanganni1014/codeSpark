//! 变量重新声明(同一作用域内,let不允许重复声明,var可以)
var a1 = '妲己';
var a1 = '公孙离';
console.log(a1); // 输出结果为：公孙离

let b1 = '亚瑟';
// var b1 = '兰陵王';  //SyntaxError: Identifier 'b1' has already been declared;

//! 块级作用域
for(var i = 0; i < 10; i++) {}
console.log(i);  // 输出结果为：10
for(let j = 0; j < 10; j++) {}
// console.log(j);  // ReferenceError: j is not defined

// !变量声明提升
console.log(a2); // undefined
var a2 = '安琪拉';
// console.log(b2); // ReferenceError: Cannot access 'b2' before initialization
let b2 = '小鲁班';

// !暂时性死区
let a3 = '鬼谷子';
function pickHero() {
    a3 = '蔡文姬';
    // 虽然不同块级作用域，可以重新申明变量，但是不允许在未申明之前直接使用
    // let a3; //ReferenceError: Cannot access 'a3' before initialization
    return a3;
}
pickHero();

// !window对象
var a4 = '东皇太二';
// console.log(window.a4); // 东皇太二

let b4 = '曜';
// console.log(window.b4); // undefined
