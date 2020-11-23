// const CArray = require('../utils');
// let numElements = 10;
// let myNums = new CArray(numElements); 
// myNums.setData(); 
// console.log(myNums.toString());

// myNums.bubbleSort();

let arr = [0, 9, 10, 3, 7, 8, 2, 5, 3, 7 ];

let num = arr.length;
/**
 * 冒泡排序的思想:
 * 让数组中的当前项和后一项进行比较,如果当前项比后一项大,则两项交换位置
 **/ 
// for(let i = num; i > 0; i--) {
//     for(let j = 0; j < i; j++) {
//         if (arr[j] > arr[i]) {
//             let temp = '';
//             temp = arr[i];
//             arr[i] = arr[j];
//             arr[j] = temp;
//             console.log(`交换了${arr[i]}和${arr[j]}`);
//         }

//     }    
// }
console.log(bubbleSort(arr)); // result: 


// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length -1 ; i++) {
//         let flag = true;
//         for (let j = 0; j < arr.length - 1 - i; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 flag = false;
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//             console.log(`第${i + 1}遍第${j + 1}趟结果: ${arr}`);
//         } 
//         // if (flag) {
//         //     break;
//         // }
//     }
//     return arr;
// }

function bubbleSort(arr) {
    for (let i = 0; i < arr.length -1 ; i++) {
        let flag = true;
        let postion = 0;
        
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = false;
                postion = j;
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            console.log(`第${i + 1}遍第${j + 1}趟结果: ${arr}`);
        } 

        if (flag) {
            break;
        }
    }
    return arr;
}