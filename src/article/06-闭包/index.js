function outer() {
    let a = 1;
    return () => {
        a++;
        return a;
    }
}

console.log(outer()());