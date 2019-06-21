"use strict";

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = document.getElementById('countries');

document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
	countriesList.innerHTML = '';
	resp.forEach(function(country){
    	generateInfo(country);
	});
}

function generateInfo(country) {
  var template = document.getElementById("country-template").innerHTML;

  var data = {
    flag: country.flag,
    name: country.name,
    capital: country.capital,
    currenciesCode: country.currencies[0].code,
    currenciesName: country.currencies[0].name,
    currenciesSymbol: country.currencies[0].symbol,
    area: country.area,
    population: country.population,
    region: country.region,
  };

	Mustache.parse(template);
  	countriesList.insertAdjacentHTML(
    "beforeend",
    Mustache.render(template, data)
  );
}