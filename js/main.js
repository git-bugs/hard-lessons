'use strict';


let week = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
let data = new Date();
let day = data.getDay()-1;

if (day == -1){ day = 6};


for (let  i=0; i<week.length; i++){
  if ((i == 5 || i == 6) && i !== day){
    let s = `<span style="font-style: italic;">${week[i]}</span><br>`;
    document.write(s);
  } else if (i === day){
    let s = `<span style="font-weight: 700;">${week[i]}</span><br>`;
    document.write(s);
  } else {
    document.write(`<span>${week[i]}</span><br>`);
  }
}