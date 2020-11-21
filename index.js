

const selectCities = document.getElementById('select-cities'),
  defaultList = document.querySelector('.dropdown-lists__list--default'),
  selectList = document.querySelector('.dropdown-lists__list--select'),
  autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
  dropDown = document.querySelector('.dropdown'),
  input = document.getElementById('select-cities'),
  label = document.querySelector('.label'),
  closeBtn = document.querySelector('.close-button'),
  linkBtn = document.querySelector('.button'),
  dataLang = {
    'RU': 'Россия',
    'EN': 'United Kingdom',
    'DE': 'Deutschland'
  }

let data = {};

const getData = (key) => {
  return fetch('./db_cities.json')
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('error')
      }
      return response.json();
    })
    .then(temp => {
      for (let item in temp) {
        if (item === key) {
          data = { ...temp[item] }
        }
      }
      for (let item in data) {
        if (data[item].country === dataLang[key] && item !== 0) {
          [data[0], data[item]] = [data[item], data[0]]
        }
      }
      localStorage.setItem('local', JSON.stringify({ ...data }));
    })
    .catch((error) => console.error(error))
};

const getDefaultList = () => {
  for (let item in data) {
    data[item].cities.sort(function (a, b) {
      return b.count - a.count;
    });
    const countryBlock = document.createElement('div');
    countryBlock.classList.add('dropdown-lists__countryBlock');
    countryBlock.innerHTML = `
        <div class="dropdown-lists__total-line">
          <div class="dropdown-lists__country">${data[item].country}</div>
          <div class="dropdown-lists__count">${data[item].count}</div>
        </div>
        <div class="dropdown-lists__line">
          <div class="dropdown-lists__city">${data[item].cities[0].name}</div>
          <div class="dropdown-lists__count">${data[item].cities[0].count}</div>
        </div>
        <div class="dropdown-lists__line">
          <div class="dropdown-lists__city">${data[item].cities[1].name}</div>
          <div class="dropdown-lists__count">${data[item].cities[1].count}</div>
        </div>
        <div class="dropdown-lists__line">
          <div class="dropdown-lists__city">${data[item].cities[2].name}</div>
          <div class="dropdown-lists__count">${data[item].cities[2].count}</div>
        </div>`;
    defaultList.appendChild(countryBlock);
  }
};

const getCities = (target) => {
  const country = target.querySelector('.dropdown-lists__country').textContent;
  input.value = country;
  for (let item in data) {
    if (data[item].country === country) {
      dropDown.scrollTop = 0;
      const countryBlock = document.createElement('div');
      countryBlock.classList.add('dropdown-lists__countryBlock');
      countryBlock.innerHTML = `
            <div class="dropdown-lists__total-line">
              <div class="dropdown-lists__country">${data[item].country}</div>
              <div class="dropdown-lists__count">${data[item].count}</div>
            </div>`;
      selectList.append(countryBlock);
      data[item].cities.forEach(item => {
        const cityBlock = document.createElement('div');
        cityBlock.classList.add('dropdown-lists__line');
        cityBlock.innerHTML = `
            <div class="dropdown-lists__city">${item.name}</div>
            <div class="dropdown-lists__count">${item.count}</div>`;
        countryBlock.append(cityBlock);
      });
    }
  }
  selectList.style.display = 'block';
  let count = 0;
  const animate = () => {
    selectList.style.width = count + '%';
    count++;
    if (count === 50) clearInterval(id);
  };
  const id = setInterval(animate, 5);
};

const getCityLink = (target) => {
  for (let item in data) {
    const { cities } = data[item];
    data[item].cities.forEach(item => {
      if (item.name === target) {
        linkBtn.disabled = false;
        linkBtn.href = item.link;
      }
    })
  }
};

const searchCity = (reg) => {
  for (let item in data) {
    data[item].cities.forEach(elem => {
      if (elem.name.match(reg)) {
        const cityBlock = document.createElement('div');
        cityBlock.classList.add('dropdown-lists__line');
        cityBlock.innerHTML = `
          <div class="dropdown-lists__city">${elem.name}</div>
          <div class="dropdown-lists__count">${elem.country}</div>`;
        autocompleteList.append(cityBlock);
      }
    });
  }
  if (!autocompleteList.textContent) {
    const cityBlock = document.createElement('div');
    cityBlock.classList.add('dropdown-lists__line');
    cityBlock.innerHTML = `
          <div class="dropdown-lists__city">Ничего не найдено</div>`;
    autocompleteList.append(cityBlock);
  }
};

const listBackAnimate = () => {
  let count = 50;
  const animateList = () => {
    selectList.style.width = count + '%';
    count--;
    if (count === 0) clearInterval(id);
  };
  const id = setInterval(animateList, 5);
};

selectCities.addEventListener('blur', () => {
  if (!input.value) label.style.display = 'block';
});

const getLocal = () => {
  if (!document.cookie) {
    const lang = prompt('Введите локализацию (RU,EN,DE)');
    document.cookie = `key=${lang}`
    const key = document.cookie.split('=')[1].toUpperCase();
    getData(key);
  }
  data = { ...JSON.parse(localStorage.getItem('local')) }
};
getLocal();

document.body.addEventListener('click', (event) => {
  let target = event.target;
  if (target.closest('.dropdown-lists__total-line') && target.closest('.dropdown-lists__list--default')) {
    if (target.classList.contains('dropdown-lists__country')) {
      linkBtn.removeAttribute('href');
    };
    label.style.display = 'none';
    selectList.textContent = '';
    closeBtn.style.display = 'block';
    getCities(target.closest('.dropdown-lists__total-line'));
  } else if (target.closest('.dropdown-lists__list--select') && target.closest('.dropdown-lists__total-line')) {
    listBackAnimate();

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
    searchCity(reg);
  }
})

