const countries = document.querySelector('.countries'); 
const filterBtn = document.querySelector('.filter');
const filterList = document.querySelector('.filter-list');
const filterItem = document.querySelectorAll('.filter-item');
const darkModeBtn = document.querySelector('.switch-btn');
const navbar = document.querySelector('.navbar');


// http request 
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

// Getting data 
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
        <li>Region: <span class="country-details regionFilter">${responseData[i].region}</span></li>
        <li>Capital: <span class="country-details">${responseData[i].capital}</span></li>
      </ul>`
    countries.appendChild(countryList);

    // countries.addEventListener('click', () => {
    //   moreInfo(responseData[i]);
    // });
  }});
};
getData()

//------------------------------------------------------------------- optional--------------------------------------
// function moreInfo(res){
//   navbar.style.display = 'none';
//   countries.style.display = 'none';
  
//   const moreInfo = document.querySelector('.more-info')
//   const infoContainer = document.createElement('div'); 
//   infoContainer.className = "info-container"; 
//   infoContainer.innerHTML = `
//   <div class="back">
//     <img src="./images/Left-Arrow-PNG-Pic.png" class='back-img' alt="arrowleft">
//     <button class="back-btn">Back</button>
//   </div>
//   <img src="${res.flag}" alt="flag" class="single-country-img">
//   <h2 class="single-flag">${res.name}</h2>
//   <ul class="more-items">
//     <li>Native Name: <span class="more-details">${res.nativeName}</span></li>
//     <li>Population: <span class="more-details">${res.population}</span></li>
//     <li>Region: <span class="more-details">${res.region}</span></li>
//     <li>Sub Region: <span class="more-details">${res.subregion}</span></li>
//     <li>Capital: <span class="more-details">${res.capital}</span></li>
//   </ul>
//   <ul class="more-items">
//     <li>Top Level Domain: <span class="more-details">${res.topLevelDomain}</span></li>
//     <li>Currencies: <span class="more-details">${res.currencies.map(curr => curr.name)}</span></li>
//     <li>Languages: <span class="more-details">${res.languages.map(languages => languages.name)}</span></li>
//   </ul>
//   <h3 class="border">Border Countries:</h3>
//   <span class="border-list">${res.borders}</span>
//   `
//   moreInfo.appendChild(infoContainer);

//   const backBtn = document.querySelector('.back-btn');
//   backBtn.addEventListener('click', () => {
//       navbar.style.display = "flex";
//       countries.style.display = "grid";
      
//       moreInfo.innerHTML = "";
//   });
// }

// search bar 
function findCountry(){
  const inputText = document.querySelector('.navbar-input');
  const countryName = document.querySelectorAll('.country-name');
  const countryList = document.querySelectorAll('.country-list');

  let filter = inputText.value.toUpperCase();

  for(let i=0; i<countryName.length; i++){
    txtValue = countryName[i].textContent
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      countryList[i].style.display = '';
    } else {
      countryList[i].style.display = 'none';
    }
  }
};

// Region list display
filterBtn.addEventListener('click', ()=>{
  // optional
  // if(filterList.style.display === 'block'){
  //   filterList.style.display = 'none'
  // }else{
  //   filterList.style.display = 'block'
  // }
  filterList.classList.toggle("active");

  // Region filter 
  const singleRegionName = Array.from(filterItem);
  
  singleRegionName.map(element => {
    element.addEventListener('click', () => { 
      let valueFilter = element.textContent
      let regionsCountries = document.querySelectorAll('.regionFilter');
      regionsCountries.forEach(regionCountry => {
        if (regionCountry.innerText.includes(valueFilter) || valueFilter.includes('All') ) {
            regionCountry.parentElement.parentElement.parentElement.style.display = "block";
        } else {
            regionCountry.parentElement.parentElement.parentElement.style.display = "none";
        }
      })
      filterList.classList.remove('active')
    });
  });
})

// dark mode 
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  console.log('test');
})
