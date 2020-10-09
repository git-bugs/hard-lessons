const num = 266219;

const str = num.toString();
let result = 1;

for (let i = 0; i<str.length; i++){
  result *= str[i];
};

console.log(result);

result **= 3;

console.log(result.toString()[0]);
console.log(result.toString()[1]);