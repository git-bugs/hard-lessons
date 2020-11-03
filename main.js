'use strict';


const start = document.getElementById('start'),
  reset = document.getElementById('reset'),
  element = document.querySelector('.element');

let count = 50,id;

const animate = () => {
  id = requestAnimationFrame(animate);
  if (count < 1500) {
    count += 2;
    element.style.left = count + 'px';
  } else {
    cancelAnimationFrame(id)
  }
}

let flag = true;
start.addEventListener('click', function() {
  if (flag) {
    id = requestAnimationFrame(animate);
    flag = false;
    start.textContent = 'Stop';
  } else {
    flag = true;
    start.textContent = 'Start';
    cancelAnimationFrame(id);
  }
});

reset.addEventListener('click',() => {
  cancelAnimationFrame(id);
  flag = true;
  start.textContent = 'Start';
  count = 50;
  element.style.left = count + 'px';
})