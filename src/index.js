import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
  //     fetch(https://restcountries.com/v3.1/name/{name}
  // https://restcountries.com/v3.1/name/peru
  // https://restcountries.com/v3.1/name/united)
  //     https://restcountries.com/v2/{service}?fields={field},{field},{field}
  // https://restcountries.com/v2/all?fields=name,capital,currencies
}

const inputREF = document.querySelector('#search-box');
inputREF.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch() {
  console.log(inputREF.value);

  fetch(
    `https://restcountries.com/v3.1/name/${inputREF.value}?fields=name.official,capital,population,flags.svg,languages`
  );
}
