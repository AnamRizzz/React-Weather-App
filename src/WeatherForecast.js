import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function WeatherForecast({ city, country, unit, apiKey }) {
  // State for forecast data
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=${unit}`
        );

        if (!response.ok) {
          throw new Error("Forecast data not found.");
        }

        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [city, country, unit, apiKey]);

  // Helper function to get the date from the forecast data
  const getDateFromForecast = (forecast) => {
    const date = new Date(forecast.dt * 1000);
    return date.toLocaleDateString();
  };

  return (
    <Card className="text-center mt-4">
      <Card.Header>
        7-Day Weather Forecast for {city}, {country}
      </Card.Header>
      <Card.Body>
        {forecastData && forecastData.list && (
          <div className="forecast-container">
            {forecastData.list.slice(0, 7).map((forecast, index) => (
              <div className="forecast-item" key={index}>
                <div className="forecast-date">{getDateFromForecast(forecast)}</div>
                <div className="forecast-temperature">
                  {Math.round(forecast.main.temp)}°C
                </div>
                <div className="forecast-description">
                  {forecast.weather[0].description}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default WeatherForecast;


