let searchCity = document.getElementById("searchCity");
let searchBtn = document.getElementById("searchBtn");
let history = document.getElementById("history");
let time = document.getElementById("date");
let temp = document.getElementById("cardTemp");
let humidity = document.getElementById("cardHum");
let wind = document.getElementById("cardWind");
let uv = document.getElementById("cardUv");
let daysDisplay = document.getElementById("cardDay");
let currentWeather = document.getElementById("currentWeather");
let cardsWeather = document.getElementById("cardWeather");
let searchHist = JSON.parse(localStorage.getItem("search")) || [];

searchBtn.addEventListener("click", function () {
    if (searchCity.value === "") {
        alert("Please introduce a city.")
    }
    else {
        searchHist.push(searchCity.value);
        localStorage.setItem("search",JSON.stringify(searchHist));
        getWeatherData();
    }
    
});

searchCity.addEventListener("keyup", function(e) {
    if (e.key === "Enter" || e.KeyboardEvent === 13) {
        if (searchCity.value === "") {
            alert("Please introduce a city.")
        }
        else{
            searchHist.push(searchCity.value);
            localStorage.setItem("search", JSON.stringify(searchHist));
            getWeatherData();
        }
    }
});



//API:
const apiKey = "24956411e34fc55da6781bc2185e43c8";
const city = document.getElementById("searchCity").value;
console.log("la ciudad",city);

//console.log(city);

//Geocoding API:
const geoApiKey = "02be2d6ec3f34f31ab28edfcb53b43df"

function getWeatherData() {
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    console.log(queryURL)
    fetch(queryURL)
        .then(res => res.json()).then(data => {
            console.log(data);
            console.log(searchCity.value);
            
        showWeatherData(data);
    });
}

function showWeather(data) {
    console.log(data);
    let cityID = data.id;
    let lat = data.coord.lat;
    console.log(lat);
    let lon = data.coord.lon;
    console.log(lon);

    fetch(queryURL)
    .then(res => res.json()).then(forecastData => {
        console.log(forecastData);

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityID.value}&key=${geoApiKey}`)
        .then(res => res.json()).then(continentAPI => {
            let continent = continentAPI.results[0].components.continent;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`)
            .then(res => res.json()).then(forecastResponse => {
                console.log(forecastResponse);

                if (continent == "North America" || continent == "South America") {
                    continent = "America";
                }
            });
        });


const geoQueryUrl = "https://api.opencagedata.com/geocode/v1/json?q="+encodeURIComponent(lat+","+lon)+"&key=02be2d6ec3f34f31ab28edfcb53b43df"

fetch(geoQueryUrl)
    .then(res => res.json()).then(cardWeatherResponse => {
    console.log(cardWeatherResponse);
});

            const forecastElem = document.querySelectorAll(".forecast");

            for (i = 0; i < forecastElem.length; i++) {
                forecastElem[i].innerHTML = "";
                
                const forecastIndex = i * 8 + 4;
                console.log(forecastIndex);
                const forecastDate = new Date(forecastData.list[forecastIndex].dt * 1000);
                console.log(forecastDate);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();


                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);


                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastData.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt", forecastData.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + forecastData.list[forecastIndex].main.temp + "  &#176C";
                forecastEls[i].append(forecastTempEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + forecastData.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);

            }

    })
}