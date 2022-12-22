import './css/styles.css';
import Notiflix from 'notiflix';
var _debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputREF = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInfo.style.display = 'flex';

// countryList.style.display = 'flex'

inputREF.addEventListener('input', onInput);

function onInput() {
  fetchCountries(inputREF.value)
    .then(renderCountryList)
    .catch(error => {
      console.log(error);
    });
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCountryList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countries.length === 1) {
    countryList.innerHTML = '';
    const markup = countries
      .map(country => {
        return `<div>
          <img src = 
          ${country.flags.svg}
          style= "display: block; height: 20px; width: 30px"> 
          <p>${country.name.official}</p>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>Languages: ${Object.values(country.languages)}</p>          
        </div>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
  } else {
    countryInfo.innerHTML = '';
    const markup = countries
      .map(country => {
        return `<li style="display:flex; flex-direction: row; gap:10px; align-items:center">
          <img src = ${country.flags.svg} style= "display: block; height: 20px; width: 30px"> 
          <p>${country.name.official}</p>                
        </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }
}
