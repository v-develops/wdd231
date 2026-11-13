// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// construct a full path
const url = '//api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=cdf8ca9d1932be89995da4bbc322b0a2&units=metric';

// try to grab the data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// display into the web page
function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;
  weatherIcon.setAttribute('SRC', iconsrc);
  weatherIcon.setAttribute('alt', data.weather[0].icon);
  captionDesc.textContent = desc;
}

apiFetch();