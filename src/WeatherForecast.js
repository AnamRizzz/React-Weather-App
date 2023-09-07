import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

function WeatherForecast({ city, country, unit, apiKey }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [city, country, unit, apiKey]);

  const renderForecast = () => {
    if (loading || !forecastData || !forecastData.list) {
      return <Spinner animation="border" role="status" variant="info" />;
    }

    const sevenDayForecast = forecastData.list.slice(0, 7);

    return (
      <div className="d-flex align-items-center">
        {sevenDayForecast.map((forecast, index) => (
          <div className="forecast-item mx-2" key={index}>
            <div className="forecast-icon">
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                className="rotate"
              />
            </div>
            <div className="forecast-temperature">
              {Math.round(forecast.main.temp)}°C
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="text-center mt-4">
      <Card.Header>
        {loading ? (
          <Spinner animation="border" role="status" variant="info" />
        ) : (
          `7-Day Weather Forecast for ${city}, ${country}`
        )}
      </Card.Header>
      <Card.Body>{renderForecast()}</Card.Body>
    </Card>
  );
}

export default WeatherForecast;


