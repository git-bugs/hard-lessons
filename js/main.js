'use strict';


let week = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
  month = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'],
  data = new Date(),
  minutesWord = 'минут',
  secondWord = 'секунд',
  hourWord = 'час';


let hourChange = function(x){
  if (x == 1 || x.toString()[1] == 1) {
    return 'час'
  } else if (x > 1 && x < 5 || x > 21){
    return 'часа'
  } else {
    return 'часов'
  }
};


let secondsChange = function(x){
  if (x > 10 && x < 20){
    return ''
  } else if(x.toString()[1] == 1 || x.toString() == 1){
    return 'a'
  } else if(x.toString()[1] > 4 || (x.toString() > 4 && x.toString() <= 10) || (x.toString()[1] == 0 || x.toString() == 0)){
    return ''
  } else {
    return 'ы'
  }
};


setInterval(function(){
  data = new Date();
  let time = ['Сегодня' + ' ' + week[data.getDay()], ' ' + data.getDate() + ' ' + month[data.getMonth()] + ' ' +  data.getFullYear() + ' ' + 'года', ' ' + data.getHours() + ' ' + hourChange(data.getHours())  + ' ' + data.getMinutes() + ' ' +  minutesWord + secondsChange(data.getMinutes())  + ' ' +  data.getSeconds()  + ' ' +  secondWord + secondsChange(data.getSeconds())].join(',');
  document.querySelector('h1').innerHTML = time;
},1000);


let zeroCheck = function(x){
  return x < 10? '0' + x: x;
};

setInterval(function(){
  data = new Date();
  let time = [zeroCheck(data.getDate()) + '.' + zeroCheck(data.getMonth()+1) + '.' + data.getFullYear() + ' - ' + zeroCheck(data.getHours()) + ':' + zeroCheck(data.getMinutes()) + ':' + zeroCheck(data.getSeconds())].join('');
  document.querySelector('h2').innerHTML = time;
},1000);