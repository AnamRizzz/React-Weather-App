import React from "react";
import { Form, Button } from "react-bootstrap";

function WeatherSearch({ city, unit, setCity, setUnit, onSearch }) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="radio"
          label="Celsius"
          name="unit"
          value="metric"
          checked={unit === "metric"}
          onChange={() => setUnit("metric")}
        />
        <Form.Check
          type="radio"
          label="Fahrenheit"
          name="unit"
          value="imperial"
          checked={unit === "imperial"}
          onChange={() => setUnit("imperial")}
        />
      </Form.Group>
      <Button variant="primary" onClick={onSearch}>
        Search
      </Button>
    </Form>
  );
}

export default WeatherSearch;
