import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a district name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "City not found");
      }

      setWeather(data);
    } catch (err) {
      setError("District not found. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="weather-container">
      <h1>🌦️ Weather Finder</h1>
      <p className="subtitle">
        Check the weather of any district
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter district name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchWeather()}
        />

        <button onClick={searchWeather}>
          Search
        </button>
      </div>

      {loading && <p>Loading weather...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            📍 {weather.name}, {weather.sys.country}
          </h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather"
          />

          <h1>{Math.round(weather.main.temp)}°C</h1>

          <h3>{weather.weather[0].description}</h3>

          <div className="weather-details">
            <div className="detail">
              <span>💧 Humidity</span>
              <h3>{weather.main.humidity}%</h3>
            </div>

            <div className="detail">
              <span>🌬️ Wind Speed</span>
              <h3>{weather.wind.speed} m/s</h3>
            </div>

            <div className="detail">
              <span>🌡️ Feels Like</span>
              <h3>{Math.round(weather.main.feels_like)}°C</h3>
            </div>

            <div className="detail">
              <span>🔽 Pressure</span>
              <h3>{weather.main.pressure} hPa</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;