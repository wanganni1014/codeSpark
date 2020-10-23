// 防抖: 触发事件后在 n s内函数只能执行一次,如果在ns内又触发了事件,则会重新计算函数执行时间
// 节流: 连续触发事件但是在一段时间内只执行一次
// css重绘
// css节流

// 防抖
const debounce = (fn, wait) => {
    let timer = null;
    return function() {
        let args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait)
    }
}

// 以第一次调用为准
const debounce1 = (fn, wait) => {
    let timer = null;
    return function() {
        let args = arguments;
        let now = !timer;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
        }, wait)
        if (now) {
            fn.apply(this, args);
        }
    }
}


// 节流
const throttle = (fn, wait) => {
    let timer = null;
    return function () {
        let args = arguments;
        console.log(timer); // result: 
        
        if (!timer) {
            timer = setTimeout(() => {
                // clearTimeout后记得将timer置为null,否则timer始终等于1,会导致程序无效
                clearTimeout();
                timer = null;
                // this指向当前返回的函数
                // 改变fn中this的指向,使其指向当前返回的函数,并且将fn中的参数传入执行
                fn.apply(this, args)
            }, wait)
        }
    }
}


// 节流时间戳版本
const throttle1 = (fn, wait) => {
    let last = 0;
    return function () {
        let args = arguments;
        let now = Date.now();
        if (now - last > wait) {
            fn.apply(this, args);
            last = now;
        }
       
    }
}

module.exports.throttle = throttle;
module.exports.debounce = debounce;
module.exports.debounce1 = debounce1;