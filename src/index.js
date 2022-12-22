import './css/styles.css';
import Notiflix from 'notiflix';
var _debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

//     fetch(https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v3.1/name/peru
// https://restcountries.com/v3.1/name/united)
//     https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

const inputREF = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchParams = new URLSearchParams({});



fetchCountries('Ukraine');

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      renderCountryList(countries);
    })
    .catch(error => {
      console.log(error);
    });
}

// inputREF.addEventListener('input', () => {
//   fetchCountries(inputREF.value)
//     .then(countries => {
//       renderCountryList(countries);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// function fetchCountries(name) {
//   fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Data handling
//     });
// }
function renderCountryList(countries) {
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
}
