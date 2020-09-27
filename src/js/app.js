const countries = document.querySelector('.countries'); 


const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {}
  }).then(response => {
    if (response.status >= 400) {
      return response.json().then(errResData => {
        const error = new Error('Error!');
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest('GET', 'https://restcountries.eu/rest/v2/all').then(responseData => { 
  for(let i = 0; i < responseData.length; i++){
    const countryList = document.createElement('div');  
    countryList.className = "country-list"; 
    countryList.innerHTML = `
      <img src="${responseData[i].flag}" alt="flag" class="country-img">
      <h2 class="country-name">${responseData[i].name}</h2>
      <ul class="country-items">
        <li>Population: <span class="country-details">${responseData[i].population}</span></li>
        <li>Region: <span class="country-details">${responseData[i].region}</span></li>
        <li>Capital: <span class="country-details">${responseData[i].capital}</span></li>
      </ul>`
    countries.appendChild(countryList);
  }
  });
};

getData()
