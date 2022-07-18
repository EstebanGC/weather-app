import React, {useState} from 'react'
import './App.css';

function App() {

  const apiKey = '744ab1d119352148d054437793266377'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if(event.key === "Enter") {
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
      <input className='input' 
      placeholder='Enter city...'
      onChange={e => setCity(e.target.value)}
      value={city}
      onKeyPress={getWeather}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div className='message'>
          <p>Welcome to weather app! Type a city to get the weather </p>
        </div>
      ):(
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='celsius'>{Math.round((weatherData.main.temp) - 273.15)}ºC</p>
          <p className='fahrenheit'>{Math.round(((9/5)*((weatherData.main.temp)-273.15))+32)}ºF</p>
          <p className='condition'>{weatherData.weather[0].main}</p>
        </div>
      )}

    </div>
  );
}

export default App;
