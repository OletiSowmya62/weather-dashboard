function Forecast({ forecast, unit }) {
  if (!forecast) {
    return null;
  }

  const dailyForecast = forecast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const convertTemperature = (temperature) => {
    return unit === "C"
      ? Math.round(temperature)
      : Math.round((temperature * 9) / 5 + 32);
  };

  return (
    <section className="forecast">
      <h3>5-Day Forecast</h3>

      <div className="forecast-grid">
        {dailyForecast.map((day) => {
          const date = new Date(day.dt * 1000);

          const dayName = date.toLocaleDateString([], {
            weekday: "short",
          });

          const dateName = date.toLocaleDateString([], {
            day: "numeric",
            month: "short",
          });

          const maxTemperature = convertTemperature(day.main.temp_max);
          const minTemperature = convertTemperature(day.main.temp_min);

          const icon = day.weather[0].icon;
          const description = day.weather[0].description;

          const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

          return (
            <div className="forecast-card" key={day.dt}>
              <h4>{dayName}</h4>

              <span className="forecast-date">
                {dateName}
              </span>

              <img src={iconUrl} alt={description} />

              <div className="forecast-temperature">
                <strong>
                  {maxTemperature}°{unit}
                </strong>

                <span>
                  {minTemperature}°{unit}
                </span>
              </div>

              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;