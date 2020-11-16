
'use strict';

const select = document.getElementById('cars'),
    output = document.getElementById('output');

const getData = () => {
    const promise = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else {
                reject(request.statusText);
            }
        });
    });
    promise
        .then(showCar)
        .catch(error => output.innerHTML = 'Произошла ошибка ' + error);
};

const showCar = (data) => {
    data.cars.forEach(item => {
        if (item.brand === select.value) {
            const { brand, model, price } = item;
            output.innerHTML = `Тачка ${brand} ${model} <br>
            Цена: ${price}$`;
        } else if (select.value === 'no') {
            output.textContent = 'выбери тачку';
        }
    });
};

select.addEventListener('change', getData);













