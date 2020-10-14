'use strict';


let arr = ['2322','10','6523','79','44','4957','678'];

let sort = function(){
  for (let i = 0; i < arr.length; i++){
    if (arr[i][0] == 2 || arr[i][0] == 4){
      console.log(arr[i]);
    }
  }
};
sort();


let simple = function(x){
  
  for (let i = 2; i <= x; i++){
    let f = 1;
    for (let n = 2; n <= i; n++){
      if ((i % n == 0) && (i != n)){
        f = 0;
      } 
    }
    if (f == 1) {
      console.log(i);
    }
  }
}
simple(100);