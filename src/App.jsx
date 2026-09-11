import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useTheme } from "./context/ThemeContext.jsx";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import SearchHistory from "./components/SearchHistory";
import HourlyForecast from "./components/HourlyForecast";

import {
  getCoordinates,
  getCurrentWeather,
  getForecast,
} from "./services/WeatherService";

const STORAGE_KEY = "weatherSearchHistory";
const LAST_SEARCH_KEY = "lastWeatherCity";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to load search history:", error);
      return [];
    }
  });

  const [unit, setUnit] = useState("C");

  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  }, [history]);

  const fetchWeatherByCoordinates = useCallback(
    async (lat, lon) => {
      const [currentWeather, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);

      setWeather(currentWeather);
      setForecast(forecastData);

      return currentWeather;
    },
    []
  );

  const handleSearch = useCallback(
    async (city) => {
      try {
        setLoading(true);
        setError("");

        const location = await getCoordinates(city);

        if (!location) {
          setError("City not found.");
          setWeather(null);
          setForecast(null);
          return;
        }

        const { lat, lon } = location;

        await fetchWeatherByCoordinates(lat, lon);

        // Only save successful searches
        setHistory((previousHistory) => {
          const updatedHistory = [
            city,
            ...previousHistory.filter(
              (item) => item.toLowerCase() !== city.toLowerCase()
            ),
          ];

          return updatedHistory.slice(0, 5);
        });

        localStorage.setItem(LAST_SEARCH_KEY, city);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to fetch weather data. Please try again."
        );

        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [fetchWeatherByCoordinates]
  );

  const handleRefresh = async () => {
  if (!weather) {
    return;
  }

  try {
    setLoading(true);
    setError("");

    await fetchWeatherByCoordinates(
      weather.coord.lat,
      weather.coord.lon
    );
  } catch (err) {
    console.error(err);

    setError(
      "Unable to refresh weather data. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const savedCity = localStorage.getItem(LAST_SEARCH_KEY);

    if (savedCity) {
      handleSearch(savedCity);
    }
  }, [handleSearch]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          await fetchWeatherByCoordinates(
            latitude,
            longitude
          );
        } catch (err) {
          console.error(err);

          setError(
            "Unable to fetch weather for your location."
          );

          setWeather(null);
          setForecast(null);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);

        setLoading(false);

        if (error.code === 1) {
          setError("Location permission was denied.");
        } else if (error.code === 2) {
          setError("Unable to determine your location.");
        } else {
          setError("Unable to access your location.");
        }
      }
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(LAST_SEARCH_KEY);
  };

  const summaryStats = weather
    ? [
        {
          label: "Current",
          value: `${Math.round(
            unit === "C"
              ? weather.main.temp
              : (weather.main.temp * 9) / 5 + 32
          )}°${unit}`,
          detail: weather.weather[0].main,
          sparkline: [38, 52, 46, 58, 64, 62, 70, 72],
        },
        {
          label: "Humidity",
          value: `${weather.main.humidity}%`,
          detail: "Air moisture",
          sparkline: [25, 32, 36, 34, 48, 52, 60, 58],
        },
        {
          label: "Wind",
          value: `${weather.wind.speed} m/s`,
          detail: "Surface flow",
          sparkline: [18, 22, 28, 25, 40, 46, 52, 48],
        },
      ]
    : [];

  return (
    <div className="app">
      <div className="weather-scene" aria-hidden="true">
        <div className="sky-glow glow-one" />
        <div className="sky-glow glow-two" />
        <div className="weather-cloud cloud-one" />
        <div className="weather-cloud cloud-two" />
        <div className="weather-cloud cloud-three" />

        <div className="particle-field">
          <span className="particle p1" />
          <span className="particle p2" />
          <span className="particle p3" />
          <span className="particle p4" />
          <span className="particle p5" />
          <span className="particle p6" />
          <span className="particle p7" />
          <span className="particle p8" />
          <span className="particle p9" />
          <span className="particle p10" />
          <span className="particle p11" />
          <span className="particle p12" />
        </div>
      </div>

      <header className="app-header">
        <div className="brand-copy">
          <span className="brand-badge">Weather Intelligence</span>
          <h1>Live Weather Dashboard</h1>
          <p>Real-time conditions, hourly outlook, and 5-day planning in one polished view.</p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="refresh-button"
            onClick={handleRefresh}
            disabled={loading || !weather}
          >
            ↻ Refresh
          </button>
          <button
            type="button"
            className="unit-button"
            onClick={() =>
              setUnit((previousUnit) =>
                previousUnit === "C" ? "F" : "C"
              )
            }
          >
            °{unit}
          </button>

          <button
            type="button"
            className="theme-button"
            onClick={toggleTheme}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <main className="dashboard">
        <SearchBar
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
        />

        <SearchHistory
          history={history}
          onSelectCity={handleSearch}
          onClearHistory={handleClearHistory}
        />

        {weather && (
          <div className="premium-summary" aria-label="Weather summary cards">
            {summaryStats.map((stat) => (
              <div className="summary-card" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.detail}</small>
                <div className="sparkline" aria-hidden="true">
                  {stat.sparkline.map((bar, index) => (
                    <span
                      key={`${stat.label}-${index}`}
                      style={{ height: `${bar}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && <Loading />}

        <ErrorMessage message={error} />

        {!loading && weather && (
          <>
            <div className="top-section">
              <CurrentWeather
                weather={weather}
                unit={unit}
              />

              <WeatherDetails
                weather={weather}
                unit={unit}
              />
            </div>

            <Forecast
              forecast={forecast}
              unit={unit}
            />

            <HourlyForecast
              forecast={forecast}
              unit={unit}
            />
          </>
        )}

        {!loading && !weather && !error && (
          <div className="empty-state">
            <h2>Search for a city</h2>
            <p>
              Enter a city name above to view the latest
              weather information.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;