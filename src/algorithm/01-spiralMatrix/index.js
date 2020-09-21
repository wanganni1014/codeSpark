// 螺旋(回形)遍历二维数组
// 其实就是两重循环遍历，每次都是遍历一圈，然后遍历里面一圈...，需要记录m,n,每次遍历后，m，n都减去2；还要记录坐标x，y
module.exports.spiralOrder = function(matrix) {
    let x1 = 0, y1 = 0, x2 = matrix[0].length - 1, y2 = matrix.length - 1;
    let result= []
    while(x1<=x2 && y1<=y2) {                                    
        for(let y= y1; y<= y2; y ++) {
            result.push(matrix[x1][y]);
        }
        for(let x= x1+ 1; x<= x2; x ++) {
            result.push(matrix[x][y2]);
        }
        for(let y= y2-1; y>= y1; y --) {
            result.push(matrix[x2][y]);
        }
        for(let x= x2-1; x>= x1+1; x --) {
            result.push(matrix[x][y1]);
        }
        ++x1;
        ++y1;
        --x2;
        --y2;
    }
    return result;
};