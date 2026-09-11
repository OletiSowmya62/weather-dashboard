function HourlyForecast({ forecast, unit }) {
      if (!forecast) {
    return null;
  }

  const hourlyData = forecast.list.slice(0, 8);

  return (
    <section className="hourly-forecast">
      <h3>Hourly Forecast</h3>

      <div className="hourly-grid">
        {hourlyData.map((item) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const convertTemperature = (temperature) => {
    return unit === "C"
      ? Math.round(temperature)
      : Math.round((temperature * 9) / 5 + 32);
  };

          const temperature = convertTemperature(item.main.temp);

          const icon = item.weather[0].icon;

          const description = item.weather[0].description;

          const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

          return (
            <div className="hourly-card" key={item.dt}>
              <span>{time}</span>

              <img src={iconUrl} alt={description} />

              <strong>{temperature}°{unit}</strong>

              <small>{description}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;