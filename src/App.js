import React, { useState } from 'react'
import './App.css';

function App() {

  const apiKey = '744ab1d119352148d054437793266377'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
        }
      )
    }
  }


  return (
    <div className='container'>
      <div className='input-container'>
      <input className='input'
        placeholder='Enter city...'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />
      
      </div>
      

      {typeof weatherData.main === 'undefined' ? (
        <div className='message'>
          <p>Welcome to this WeatheReact App... Type a city to start!</p>
        </div>

      ) : (
        <div>
          <div className='weather-data'>
            <p className='city'>{weatherData.name}</p>
            <p className='celsius'>{Math.round((weatherData.main.temp) - 273.15)}ºC</p>
            <p className='fahrenheit'>{Math.round(((9 / 5) * ((weatherData.main.temp) - 273.15)) + 32)}ºF</p>
            <p className='condition'>{weatherData.weather[0].main}</p>
          </div>

          <div className='bottom'>
            <div className='condition1'>{weatherData.main.humidity}% <p className='title1'>Humidity</p> </div>
  
            <div className='condition1'>{Math.round((weatherData.main.feels_like) - 273.15)}ºC <p className='title1'>Feels like</p> </div>
            
            <div className='condition1'>{Math.round(1.60934 * (weatherData.wind.speed))} Km/h <p className='title1'> Wind speed</p></div>
            
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
