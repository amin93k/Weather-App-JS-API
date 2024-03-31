
const $ = document
const weatherElm = $.querySelector(".weather")
const searchInput = $.querySelector(".search-input")
const searchBtn = $.querySelector(".search-icon")
const body = document.getElementsByTagName("body")
const APIKey = "5ab0ba81f6665f5153eece3618010e1b"

searchBtn.addEventListener("click", getWeatherData)
searchInput.addEventListener("change", getWeatherData)

// GET request
async function getWeatherData () {
    const city = searchInput.value.toLowerCase()

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(res => {
            if (res.ok === true) {

                return  res.json()
            }else {
                // If there is no name of the city or connection, the message will appear
                console.log(document.documentElement.style)
                weatherElm.style.visibility = "hidden"
                weatherElm.style.position = "absolute"
                weatherElm.classList.add("loading")
                body[0].style.backgroundImage = `url("img/intro.jpg")`
                $.documentElement.style.setProperty("--loading", "'This city is not found !'")
            }
        })
        .then(data => {

            if (data) {
                weatherShow(data)
            }
        })

}

function weatherShow (data){

    // Read data and assign to variable
    const city = data.name
    const weather = data.weather[0].main
    const humidity = Math.floor(data.main['humidity'])
    const wind = data.wind.speed
    let temp = data.main.temp -  273.15
    temp = Math.round(temp)
    const weatherIcon = selectIconImage(data.weather[0].icon)

    // Empty the weather section
    weatherElm.innerHTML = ''

    // Insert new weather data
    weatherElm.insertAdjacentHTML("afterbegin", `

             <h2 class="city">Weather in ${city}</h2>
            <h1 class="temp">${temp}°C</h1>
            <div class="status">
                <div class="description">${weather}</div>
                <img class="des-icon" src='${weatherIcon}'>
            </div>
            <div class="humidity">Humidity: ${humidity}%</div>
            <div class="wind">Wind speed: ${wind}km/h</div>`)

    // Display weather section
    weatherElm.style.visibility = "visible"
    weatherElm.style.position = "relative"
    // Hidden Loading message
    weatherElm.classList.remove("loading")
    // Change the background image based on the weather
    body[0].style.backgroundImage = `url("img/${weather}.jpg")`

}


function selectIconImage (icon) {
    const code = Number(icon.substring(0, 2))

    // Check last letter in icon
    if (icon[2] === "d"){

        return `img/${icon}.png`
    }
    // If the last letter is n
    else {

       if (code === 1 || code === 2 || code === 10) {

           return `img/${icon}.png`
       }else {

           return `img/${code.toString().padStart(2, "0")}d.png`
       }
    }
}


// template of API => https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// API kes => 5ab0ba81f6665f5153eece3618010e1b

