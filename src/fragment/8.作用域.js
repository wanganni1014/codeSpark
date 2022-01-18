var x = 1;
function foo(a, b = function () {
    x = 2;
}) {
    var x = 3;
    b();
    console.log(x);
}
foo();
console.log(x);