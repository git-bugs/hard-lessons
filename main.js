'use strict';

const input = document.querySelector('input'),
  parag = document.querySelector('p');


const debounce = () => {
  let idTimer;
  return function () {
    const fnCall = () => parag.textContent = input.value;
    clearTimeout(idTimer);
    idTimer = setTimeout(fnCall, 300);
  };
};

input.addEventListener('input', debounce());

