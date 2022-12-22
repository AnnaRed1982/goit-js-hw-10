import './css/styles.css';
import Notiflix from 'notiflix';
var _debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const bodyREF = document.querySelector('body');
const inputREF = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

bodyREF.style.backgroundImage =
  'radial-gradient(circle at 1px 1px, grey 1px, transparent 0)';
bodyREF.style.backgroundSize = '40px 40px';
countryInfo.style.display = 'flex';
countryList.style.paddingLeft = '0';

inputREF.addEventListener('focus', () => {
  inputREF.style.outlineColor = 'blue';
  // inputREF.style.outlineWidth = '0';
});
inputREF.addEventListener('input', onInput);

function onInput() {
  fetchCountries(inputREF.value)
    .then(renderCountryList)
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`${error}`);
      // Notiflix.Notify.failure('Oops, there is no country with that name');
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
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countries.length === 1) {
    countryList.innerHTML = '';
    const markup = countries
      .map(country => {
        return `<div style="display:flex; flex-direction:column; gap:10px;">
          <div style="display:flex; flex-direction: row; gap:10px; align-items:center; justify-content:center">
          <img src = 
          ${country.flags.svg}
          style= "display:block; height:28px; margin:0"> 
          <p style="margin:0; font-weight:700; font-size:32px">
          ${country.name.official}
          </p>
          </div>         
          <p style="margin:0"><span style='font-weight:700;'>Capital:</span> 
          ${country.capital}
          </p>
          <p style="margin:0"><span style='font-weight:700;'>Population:</span>  
          ${country.population}
          </p>
          <p style="margin:0"><span style='font-weight:700;'>Languages:</span> 
          ${Object.values(country.languages)}
          </p>          
        </div>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
  } else {
    countryInfo.innerHTML = '';
    const markup = countries
      .map(country => {
        return `<li style="display:flex; flex-direction: row; gap:5px; align-items:center; margin:0px">
          <img src = ${country.flags.svg} style= "display: block; width: 30px"> 
          <p style="margin:2px; font-weight:500;">${country.name.official}</p>                
        </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }
}
