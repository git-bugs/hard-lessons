import data from './db_cities.js';

const selectCities = document.getElementById('select-cities'),
  defaultList = document.querySelector('.dropdown-lists__list--default'),
  selectList = document.querySelector('.dropdown-lists__list--select'),
  autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
  dropDown = document.querySelector('.dropdown'),
  input = document.getElementById('select-cities'),
  label = document.querySelector('.label'),
  closeBtn = document.querySelector('.close-button'),
  linkBtn = document.querySelector('.button');

const getDefaultList = () => {
  for (let item in data) {
    data[item].forEach((elem, index) => {
      elem.cities.sort(function (a, b) {
        return b.count - a.count;
      });
      const countryBlock = document.createElement('div');
      countryBlock.classList.add('dropdown-lists__countryBlock');
      countryBlock.innerHTML = `
        <div class="dropdown-lists__total-line">
          <div class="dropdown-lists__country">${data[item][index].country}</div>
          <div class="dropdown-lists__count">${data[item][index].count}</div>
        </div>
        <div class="dropdown-lists__line">
          <div class="dropdown-lists__city">${elem.cities[0].name}</div>
          <div class="dropdown-lists__count">${elem.cities[0].count}</div>
        </div>
        <div class="dropdown-lists__line">
          <div class="dropdown-lists__city">${elem.cities[1].name}</div>
          <div class="dropdown-lists__count">${elem.cities[1].count}</div>
        </div>
        <div class="dropdown-lists__line">
          <div class="dropdown-lists__city">${elem.cities[2].name}</div>
          <div class="dropdown-lists__count">${elem.cities[2].count}</div>
        </div>`;
      defaultList.appendChild(countryBlock);
    });
  }
};

const getCities = (target) => {
  const country = target.querySelector('.dropdown-lists__country').textContent;
  input.value = country;
  selectList.style.display = 'block';
  for (let item in data) {
    data[item].forEach((elem) => {
      if (elem.country === country) {
        dropDown.scrollTop = 0;
        const countryBlock = document.createElement('div');
        countryBlock.classList.add('dropdown-lists__countryBlock');
        countryBlock.innerHTML = `
            <div class="dropdown-lists__total-line">
              <div class="dropdown-lists__country">${elem.country}</div>
              <div class="dropdown-lists__count">${elem.count}</div>
            </div>`;
        selectList.append(countryBlock);
        elem.cities.forEach(item => {
          const cityBlock = document.createElement('div');
          cityBlock.classList.add('dropdown-lists__line');
          cityBlock.innerHTML = `
            <div class="dropdown-lists__city">${item.name}</div>
            <div class="dropdown-lists__count">${item.count}</div>`;
          countryBlock.append(cityBlock);
        });
      }
    });
  }
};

const getCityLink = (target) => {
  console.log(target);
  for (let item in data) {
    data[item].forEach((elem) => {
      const { cities } = elem;
      cities.forEach(item => {
        if (item.name === target) {
          linkBtn.disabled = false;
          linkBtn.href = item.link;
        }
      })
    })
  }
};

selectCities.addEventListener('blur', () => {
  if (!input.value) label.style.display = 'block';
});

document.body.addEventListener('click', (event) => {
  let target = event.target;
  if (target.closest('.dropdown-lists__total-line') && target.closest('.dropdown-lists__list--default')) {
    if (target.classList.contains('dropdown-lists__country')) {
      linkBtn.removeAttribute('href');
    };
    label.style.display = 'none';
    selectList.textContent = '';
    getCities(target.closest('.dropdown-lists__total-line'));
  } else if (target.closest('.dropdown-lists__list--select') && target.closest('.dropdown-lists__total-line')) {
    selectList.style.display = 'none';
  } else if (target.classList.contains('dropdown-lists__country') || target.classList.contains('dropdown-lists__city')) {
    label.style.display = 'none';
    closeBtn.style.display = 'block';
    input.value = target.textContent;
    if (target.classList.contains('dropdown-lists__city')) {
      getCityLink(target.textContent);
    }
  } else if (target.classList.contains('close-button')) {
    input.value = '';
    selectList.style.display = 'none';
    defaultList.textContent = '';
    defaultList.style.display = 'block';
    autocompleteList.style.display = 'none';
    label.style.display = 'block';
    closeBtn.style.display = 'none';
    linkBtn.removeAttribute('href');
  } else if (target.closest('#select-cities')) {
    getDefaultList();
  }
});

input.addEventListener('input', () => {
  if (!input.value) {
    defaultList.style.display = 'block';
    autocompleteList.style.display = 'none';
    linkBtn.removeAttribute('href');
  } else if (input.value) {
    selectList.style.display = 'none';
    defaultList.style.display = 'none';
    autocompleteList.style.display = 'block';
    autocompleteList.textContent = '';
    const reg = new RegExp(`^${input.value}`, 'i');
    for (let item in data) {
      data[item].forEach((elem) => {
        elem.cities.forEach(item => {
          if (item.name.match(reg)) {
            const cityBlock = document.createElement('div');
            cityBlock.classList.add('dropdown-lists__line');
            cityBlock.innerHTML = `
              <div class="dropdown-lists__city">${item.name}</div>
              <div class="dropdown-lists__count">${item.count}</div>`;
            autocompleteList.append(cityBlock);
          }
        });
      });
    }
    if (!autocompleteList.textContent) {
      const cityBlock = document.createElement('div');
      cityBlock.classList.add('dropdown-lists__line');
      cityBlock.innerHTML = `
        <div class="dropdown-lists__city">Ничего не найдено</div>`;
      autocompleteList.append(cityBlock);
    }
  }
})