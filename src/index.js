import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
inputSearchEl: document.querySelector('#search-box'),
countryListEl: document.querySelector('.country-list'),
countryInfoEl: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.inputSearchEl.addEventListener(
  'input',
  debounce(e => {
      const trimmedValue = refs.inputSearchEl.value.trim();
         cleanHtml();   
    if (trimmedValue !== '') {
        fetchCountries(trimmedValue).then(foundData => {      

        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
         
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
    
          renderOneCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <p><b>${country.name.official}</b></p>
                </li>`;
    })
    .join('');
  refs.countryListEl.innerHTML = markup;
}

function renderOneCountry(countries) {
      const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="30" hight="20">
            <p><b>${country.name.official}</b></p>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${Object.values(country.languages)} </p>
                </li>`;
        })
        .join('');
      refs.countryListEl.innerHTML = markup;
}

function cleanHtml() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}