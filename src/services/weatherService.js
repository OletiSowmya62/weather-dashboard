import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org";

export const getCoordinates = async (city) => {
  const response = await axios.get(
    `${BASE_URL}/geo/1.0/direct`,
    {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY,
      },
    }
  );

  return response.data[0];
};

export const getCurrentWeather = async (lat, lon) => {
  const response = await axios.get(
    `${BASE_URL}/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        units: "metric",
        appid: API_KEY,
      },
    }
  );

  return response.data;
};

export const getForecast = async (lat, lon) => {
  const response = await axios.get(
    `${BASE_URL}/data/2.5/forecast`,
    {
      params: {
        lat,
        lon,
        units: "metric",
        appid: API_KEY,
      },
    }
  );

  return response.data;
};