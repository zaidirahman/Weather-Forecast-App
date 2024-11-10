import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/Weather";
import Forecast from "./components/Forecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      setWeatherData(null);
      setForecastData(null);

      // Fetch current weather with units=metric for Celsius
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=67c75ecaa4013add9e33113f00ab9691`
      );

      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(errorData.message || `City "${city}" not found.`);
      }

      // Fetch 5-day forecast with units=metric for Celsius
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=67c75ecaa4013add9e33113f00ab9691`
      );

      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        throw new Error(errorData.message || "Failed to fetch forecast data");
      }

      const weatherResult = await weatherResponse.json();
      const forecastResult = await forecastResponse.json();

      setWeatherData(weatherResult);
      setForecastData(forecastResult);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message || "An error occurred while fetching weather data.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-blue-200 to-blue-400 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <SearchBar onSearch={handleSearch} />
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="relative">
              {weatherData && <CurrentWeather data={weatherData} />}
              {forecastData && (
                <div className="absolute top-3/4 w-full">
                  <Forecast data={forecastData} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
