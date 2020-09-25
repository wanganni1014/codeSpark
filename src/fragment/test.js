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



// proxy
var ob = {a: 1, b: 2};
var obProxy = new Proxy(ob, {
    get(target, key, receiver) {
        return target[key];
    },
    set(target, key, value, receiver){
        return Reflect.set(target, key, value);
    }
});
