'use strict';


let lang = 'en';

if (lang === 'ru'){
  console.log('Понедельник');
} else {
  console.log('Monday');
};

switch (lang){
  case 'ru':
    console.log('Понедельник');
    break;
  case 'en':
    console.log('Monday');
    break;
};


let arr = {
  ru: ['Понедельник','Вторник','Среда'],
  en: ['Monday','Tuesday','Wednesday']
};
console.log(arr[lang]);



let namePerson = 'Максим';
let position;

position = (namePerson === 'Артем') ? 'Директор' :
(namePerson === 'Максим') ? 'Преподаватель' :
'студент' ;

console.log(position);