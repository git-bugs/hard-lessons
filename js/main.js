'use strict';


let foo = function(item){
  if (typeof(item) !== 'string'){
    return alert('Это не строка!')
  };

  let item2 = item.trim();
  
  if (item2.length > 30){
    console.log(item2.substring(0,30) + '...');
  }
};
 
foo('           12345678901 2345678901234 56789012345678 90dfgdgdfgdfgd ');
