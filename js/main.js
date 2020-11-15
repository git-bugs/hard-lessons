
const select = document.querySelector('.select-value'),
  heroes = document.querySelector('.heroes');

const movieList = (data) => {
  const dataMovie = [];
  data.forEach(item => {
    const { movies } = item;
    dataMovie.push(movies);
  });
  const movies = dataMovie.reduce((acc, item) => acc.concat(item));
  const result = movies.filter((item, index) => {
    if (movies.indexOf(item) === index && movies.indexOf(item) !== undefined) return item;
  });
  result.forEach(item => {
    const option = document.createElement('option');
    option.innerHTML = `
      <option value="${item}">${item}</option>
      `;
    select.append(option);
  })
};

const renderHeroes = (data) => {
  heroes.textContent = '';
  data.forEach(item => {
    const { name, actors, movies, status, photo } = item;
    const hero = document.createElement('div');
    hero.classList.add('heroes-item');
    hero.style.backgroundImage = `url(./${photo})`;
    hero.innerHTML = `
      <div class="heroes-info">
        <div class="heroes-name"><span>Name: </span>${name}</div>
        <div class="heroes-realname"><span>Actor: </span>${actors}</div>
        <div class="heroes-movie"><span>Movies: </span>${movies}</div>
        <div class="heroes-status"><span>Status: </span>${status}</div>
      </div>
      `;
    heroes.append(hero);
  });
};

const getHeroes = () => {
  let heroesData = [];
  const getData = () => {
    const request = new XMLHttpRequest();
    request.open('GET', './dbHeroes.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        heroesData = JSON.parse(request.responseText);
        movieList(heroesData);
        getHeroList('heroes');
      }
    });
  };
  const getHeroList = (value) => {
    if (value === 'heroes') {
      renderHeroes(heroesData);
    } else {
      const filterHero = [];
      heroesData.forEach(item => {
        const { movies } = item;
        if (movies) {
          movies.forEach(elem => {
            if (elem === value) {
              filterHero.push(item);
            }
          });
        }
      });
      renderHeroes(filterHero);
    }
  };
  select.addEventListener('change', () => {
    getHeroList(select.value);
  });
  getData();  
};

getHeroes();
