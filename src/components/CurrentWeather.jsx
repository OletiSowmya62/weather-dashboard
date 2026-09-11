function CurrentWeather({ weather, unit }) {
  if (!weather) {
    return null;
  }

  const convertTemperature = (temperature) => {
    return unit === "C"
      ? Math.round(temperature)
      : Math.round((temperature * 9) / 5 + 32);
  };

  const temperature = convertTemperature(weather.main.temp);
  const feelsLike = convertTemperature(weather.main.feels_like);

  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const currentDate = new Date().toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SW",
      "W",
      "NW",
    ];

    const index = Math.round(degrees / 45) % 8;

    return directions[index];
  };

  return (
    <section className="current-weather">
      <div className="weather-header">
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.sys.country}</p>
          <span className="current-date">{currentDate}</span>
        </div>

        <img src={iconUrl} alt={description} />
      </div>

      <div className="temperature">
        {temperature}°{unit}
      </div>

      <p className="description">{description}</p>

      <p className="feels-like">
        Feels like {feelsLike}°{unit}
      </p>

      <div className="wind-info">
        <span>Wind</span>
        <strong>
          {weather.wind.speed} m/s{" "}
{weather.wind.deg !== undefined
  ? getWindDirection(weather.wind.deg)
  : ""}
        </strong>
      </div>
    </section>
  );
}

export default CurrentWeather;