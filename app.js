// nodejs实现文件拷贝
let fs = require('fs');
let stat = fs.stat;

/**
 * 复制目录中的所有文件包括子目录
 * @param {*} src 需要复制的目录
 * @param {*} dst 复制到指定目录
 */
let copy = function (src, dst) {
    // 读取文件
    // node中 错误优先
    fs.readdir(src, (err, paths) => {
        if (err) {
            throw err;
        }
    
        // 读取目录中的所有文件/目录
        paths.forEach((path) => {
            let _src = src + '/' + path;
            let _dts = dst + '/' + path;
            let readable;
            let writeable;
            stat(_src, (err, st) => {
                if (err) {
                    throw err;
                }

                // 判断是否是文件
                if (st.isFile) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writeable = fs.createWriteStream(_dts);
                    // 通过管道来传输流
                    readable.pipe(writeable);
                }

                // 如果是目录则递归调用自身
                else if (st.isDirectory) {
                    exists(_src, _dts, copy);
                }
            })
        });
    })
}

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
let exists = (src, dst, callback) => {
    fs.exists(dst, (exists) => {
        if (exists) {
            callback(src, dst);
        } else {
            fs.mkdir(dst, () => {
                callback(src, dst)
            })
        }
    })
}

exists('./test', './src', copy);