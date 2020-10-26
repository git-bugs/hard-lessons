'use strict';

let title = document.getElementById('color'),
  button = document.getElementById('change');

let change = function(){
  let randomColor = '#' + Math.random().toString(16).substring(2,8);
  title.textContent = randomColor.toUpperCase();
  document.body.style.background = randomColor ;
}

button.addEventListener('click', change);

change();