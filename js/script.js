"use strict";

var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = document.getElementById('countries');

// Event listener for search button
document.getElementById('search').addEventListener('click', searchCountries);

// Enter button click
document.querySelector("#country-name").addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    searchCountries();
  }
});

// Function fetch countries data
function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

// Clear country card list and generating new card (from template) for each country found
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