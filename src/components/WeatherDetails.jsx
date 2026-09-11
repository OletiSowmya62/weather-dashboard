function WeatherDetails({ weather }) {
  if (!weather) {
    return null;
  }

  const visibility = (weather.visibility / 1000).toFixed(1);

  const sunrise = new Date(
    weather.sys.sunrise * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(
    weather.sys.sunset * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const details = [
    {
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      icon: "💧",
    },
    {
      label: "Wind Speed",
      value: `${weather.wind.speed} m/s`,
      icon: "🌬️",
    },
    {
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      icon: "🔵",
    },
    {
      label: "Visibility",
      value: `${visibility} km`,
      icon: "👁️",
    },
    {
      label: "Sunrise",
      value: sunrise,
      icon: "🌅",
    },
    {
      label: "Sunset",
      value: sunset,
      icon: "🌇",
    },
  ];

  return (
    <section className="weather-details">
      <h3>Weather Details</h3>

      <div className="details-grid">
        {details.map((detail) => (
          <div className="detail-card" key={detail.label}>
            <div className="detail-icon">
              {detail.icon}
            </div>

            <div>
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeatherDetails;