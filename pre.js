// import { exists } from "fs";

// var arg = [2,3]
// function check(param, param2){
//     if(param == arg[0]){
//         return console.log('true');
//     } else if(param == arg[1]){
//         return console.log('false');
//     } else if (param == arg[1]){
//         return console.log('true');
//     } else if (param2 == arg[0]){
//         return console.log('true');
//     }
// }
// check(2, 3);

var arr = [1,2,4];
var el = 4;
let checkarray = (arr, el) => {
    arr.includes(el) ? true : false;
}
checkarray(arr, el);