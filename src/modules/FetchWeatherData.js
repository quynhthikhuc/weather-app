import React, {useState}from "react"

function FetchWeatherData() {
    const apiKey = "308de3ee51bdf95b83c1f977c5760bcc"
    
    const [query, setQuery] = useState("")
    const [location, setLocation] = useState("")
    const [temp, setTemp] = useState("")
    const [weather, setWeather] = useState("")

    function search(e) {
        if(e.key === "Enter") {
            console.log(query)
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey + "&units=metric"
            )
            .then((data) => data.json())
            .then((data) => {
                if(data.cod !== 200) {
                    setLocation("Invalid")
                }
                else {
                    console.log(data)
                    setLocation(query)
                    setTemp(Math.round(data.main.temp*9/5+32) + "°F")
                    setWeather(data.weather[0].main)
                    setQuery("")
                }
            })
        }
    }

    return(
        <div id="weather-app">
            <input 
                type="text"
                placeholder="Enter city name and hit Enter"
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
            ></input>
            <p id="location">{location}</p>
            <p id="temp">{temp}</p>
            <p id="weather">{weather}</p>
        </div>
    )
}

export default FetchWeatherData