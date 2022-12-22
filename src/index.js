import './css/styles.css';
import Notiflix from 'notiflix';
var _debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputREF = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchParams = new URLSearchParams({});

inputREF.addEventListener('input', onInput);

function onInput() {
  //   console.log(inputREF.value.length);
  //   if (inputREF.value.length > 10) {
  //     Notiflix.Notify.failure(
  //       'Too many matches found. Please enter a more specific name.'
  //     );
  //     return;
  //   }
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
  console.log(countries);
  if (countries.length > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countries.length === 1) {
    countryInfo.innerHTML = '';
    const markup = countries
      .map(country => {
        return `<li>
          <img src = ${country.flags.svg} width=40> 
          <p>${country.name.official}</p>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>Languages: ${country.languages}</p>          
        </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  } else {
    countryList.innerHTML = '';
    const markup = countries
      .map(country => {
        return `<li>
          <img src = ${country.flags.svg} width=40> 
          <p>${country.name.official}</p>                
        </li>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
  }
}
