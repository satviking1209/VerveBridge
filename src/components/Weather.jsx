import React, { useRef, useState } from 'react';
import './Weather.css';  // Importing the CSS file for styling
import search_icon from '../assets/search.jpg';  // Importing the search icon image
import clear_icon from '../assets/clear.png';  // Importing weather icons
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

// Weather component definition
const Weather = () => {
  // Ref to access the input field value
  const inputRef = useRef();

  // State to store the weather data fetched from the API
  const [weatherData, setWeatherData] = useState(null);

  // Mapping of weather condition codes to corresponding icons
  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03n': cloud_icon,
    '03d': cloud_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  // Function to fetch weather data from the API based on the city name
  const search = async (city) => {
    try {
      
      
      
      // Construct the API URL with the city name and API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6545cdb70ddf0728be5eca9143278a57`;

      // Fetch data from the API
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // Get the appropriate weather icon based on the weather condition code
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      // Update the state with the fetched weather data
      setWeatherData({
        humidity: data.main.humidity,  // Humidity percentage
        windSpeed: data.wind.speed,    // Wind speed in km/h
        temperature: Math.floor(data.main.temp),  // Temperature in Celsius (rounded down)
        location: data.name,  // Location name
        icon: icon,  // Weather icon
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather">
      {/* Search bar with input field and search icon */}
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
      </div>

      {/* Display weather data if available */}
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity icon" />
              <div>
                <p>{weatherData.humidity}%</p>
              </div>
              <span>Humidity</span>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind icon" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
              </div>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      )}
      
    </div>
    
    
  );
  
};

export default Weather;
