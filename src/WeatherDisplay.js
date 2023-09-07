import React from "react";
import { Card } from "react-bootstrap";

function WeatherDisplay({ weatherData }) {
  const { name, main, weather } = weatherData;

  return (
    <Card className="text-center mt-4">
      <Card.Header>
        Weather in {name}
      </Card.Header>
      <Card.Body>
        <Card.Title>Temperature: {Math.round(main.temp)}°C</Card.Title>
        <Card.Text>Condition: {weather[0].description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WeatherDisplay;


