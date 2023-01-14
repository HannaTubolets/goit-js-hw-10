'use strict';

const BASE_URL = 'https://restcountries.com/v3.1/name';

    //`${BASE_URL}/${contryName}?fields=${searchParams}`

export const fetchCountries = name => {
    //     const searchParams = new URLSearchParams({
    //     name: countryName,
    //     capital: '',
    //     population: '',
    //     flag: '',
    //     languages:'',
    // })
  return fetch(
    `${BASE_URL}//${name}?fields=name,capital,population,flags,languages`
  )
      .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};