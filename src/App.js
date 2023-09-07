import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import WeatherHeader from "./WeatherHeader";
import WeatherSearch from "./WeatherSearch";
import WeatherDisplay from "./WeatherDisplay";
import WeatherForecast from "./WeatherForecast"; // Import the WeatherForecast component

function App() {
  // State and API key
  const [city, setCity] = useState("Winnipeg");
  const [unit, setUnit] = useState("metric"); // metric for Celsius, imperial for Fahrenheit
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const apiKey = "62231151ce343c4d68652e1617efc22f"; // Your OpenWeatherMap API key

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      );

      if (!response.ok) {
        throw new Error("Weather data not found.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Initial weather data fetch
  useEffect(() => {
    fetchWeatherData();
  }, [city, unit]);

  // Handle search
  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className="App">
      <WeatherHeader />
      <Container className="mt-5">
        <WeatherSearch
          city={city}
          unit={unit}
          setCity={setCity}
          setUnit={setUnit}
          onSearch={handleSearch}
        />
        {weatherData && (
          <WeatherDisplay weatherData={weatherData} />
        )}
        <WeatherForecast city={city} unit={unit} apiKey={apiKey} />
      </Container>
    </div>
  );
}

export default App;



