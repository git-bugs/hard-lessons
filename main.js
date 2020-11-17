
'use strict';

const select = document.querySelector('select'),
  output = document.querySelector('span'),
  span1 = document.getElementById('input1-txt'),
  span2 = document.getElementById('input2-txt'),
  btnConvert = document.getElementById('btn'),
  calc = document.querySelector('.calc');

let count = 0;

const getData = (span = span1) => {
  fetch(`https://api.exchangeratesapi.io/latest?base=${select.value}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('error')
      }
      return (response.json());
    })
    .then((data) => {
      span.textContent = ''
      output.innerHTML = data.rates.RUB.toFixed(2) + ' RUB';
      span.textContent = data.base;
      count = data.rates.RUB;
    })
    .catch((error) => console.error(error))
};

select.addEventListener('change', () => {
  if (select.value === 'ZERO' && span2.textContent === 'RUB') {
    span1.textContent = 'NAN';
    output.textContent = '';
    count = 0;
    btnConvert.disabled = true;
  } else if (select.value === 'ZERO' && span2.textContent !== 'RUB'){
    btnConvert.disabled = true;
    span2.textContent = 'NAN';
    output.textContent = '';
  } else if (span2.textContent !== 'RUB') {
    btnConvert.disabled = false;
    getData(span2);
  }
  else {
    btnConvert.disabled = false;
    getData();
  };
});

calc.addEventListener('click', (e) => {
  let target = e.target;
  if (target.matches('#btn')){
    if (count >= 0 && span2.textContent === 'RUB') {
      input2.value = (count * input1.value).toFixed(2);
    } else {
      input2.value = (input1.value / count).toFixed(2);
    }
  } else if (target.matches('#change-way')){
    [span1.textContent, span2.textContent, input1.value, input2.value] = [span2.textContent, span1.textContent, input2.value, input1.value]
  }
});
