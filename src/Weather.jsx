import React, { useState } from "react";
import Card from "./Card";

const API_KEY = "3df169b13d44495799d85047252602";
const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCityWeather = async (cityName) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?Key=${API_KEY}&q=${cityName}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setData({
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
      });
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
      alert("Failed to fetch weather data");
    }
  };
  const handleClick = () => {
    fetchCityWeather(cityName);
  };

  return (
    <>
      <div className="weather-container">
        <input
          type="text"
          value={cityName}
          placeholder="Enter city name"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button className="search-button" type="button" onClick={handleClick}>
          Search
        </button>
      </div>
      {loading && <p>Loading data...</p>}
      {data && (
        <div className="card-container">
          <Card label="Temperature" value={data.temperature} />
          <Card label="Humidity" value={data.humidity} />
          <Card label="Condition" value={data.condition} />
          <Card label="WindSpeed" value={data.windSpeed} />
        </div>
      )}
    </>
  );
};
export default Weather;
