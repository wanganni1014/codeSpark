module.exports.compile = (template) => {
    // 全局替换正则表达式,将{{ xxx }}表达式 转化为ES6模板字符串 ${ xxx }
    template = template.replace(/\{\{([^}]+)\}\}/g, function () {
      let key = arguments[1].trim();
      return "${" + key + "}";
    });
  
    // 将{% %}表达式 转化为JS语句这样的就可以在模板中使用if、foreach了
    let head = `let str = '';\r\n with(obj){\r\n`;
    head += "str+=`";
    template = template.replace(/\{\%([^%]+)\%\}/g, function () {
      return "`\r\n" + arguments[1] + "\r\nstr+=`\r\n";
    });
  
    let tail = "`}\r\n return str;";
    console.log(`==========render=========`)
    console.log(head + template + tail);

    // new Function()用于动态创建函数体
    return new Function("obj", head + template + tail);
};

// new Function('arg', 'console.log(arg + 1);');
// // 相当于创建了一个匿名函数
// function (arg) {
//     console.log(arg + 1);
// }

  
