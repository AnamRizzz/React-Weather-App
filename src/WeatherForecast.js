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
        if (response.ok) {
          const data = await response.json();
          setForecastData(data);
        } else {
          console.error("Error fetching forecast data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [city, country, unit, apiKey]);

  const renderForecast = () => {
    if (loading) {
      return <Spinner animation="border" role="status" variant="info" />;
    }

    if (!forecastData || forecastData.cod !== "200") {
      return <div>Unable to fetch forecast data.</div>;
    }

    const dailyForecasts = forecastData.list.filter((item, index) => {
      const date = new Date(item.dt * 1000);
      return index % 8 === 0; // One forecast per day
    });

    return (
      <div className="forecast">
        {dailyForecasts.map((item, index) => (
          <div className="forecast-item" key={index}>
            <div className="forecast-date">
              {new Date(item.dt * 1000).toLocaleDateString()}
            </div>
            <div className="forecast-icon">
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
            </div>
            <div className="forecast-temperature">
              {Math.round(item.main.temp)}°{unit === "metric" ? "C" : "F"}
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
      <Card.Footer>
        <p>
          Open Sourced by
        <a
          href="https://github.com/AnamRizzz/React-Weather-App.git"
          target="_blank"
          rel="noopener noreferrer"
        >
         <br/> Anam Fatima 
        </a>
        <br/>
         on Github
        </p>
      </Card.Footer>
    </Card>
  );
}

export default WeatherForecast;



