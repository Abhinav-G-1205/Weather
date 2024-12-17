const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const API_KEY = "4252a1ba84cec70000268c54a433aab2";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherInfo = await weatherData(city);
            displayWeatherInfo(weatherInfo);
        }catch(error){
            displayError(error);
            console.error(error);
        }
    }else{
        displayError("Please Enter a City");
    }
})

function displayError(message){
    const p = document.createElement("p")
    p.textContent = message;
    p.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(p)
}
async function weatherData(city){
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await fetch(api_url);
    if(!response.ok){
        throw new Error("Could not find weather Data");
    }
    return await response.json()
}
function displayWeatherInfo(data){
    const {name: city, main: {temp,humidity},weather: [{description,id}]} = data;

    card.style.display = "flex";
    card.textContent = "";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    console.log(data)
}