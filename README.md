# Weather Dashboard

A polished, responsive weather application built with React and the OpenWeather API. It delivers real-time weather updates, multi-day forecasts, location-based data, recent search history, and a clean user interface tailored for desktop and mobile devices.

## 🔗 Quick Links

- **Live Demo:** https://weather-dashboard-m2anrab6x-oletisowmya62.vercel.app/
- **GitHub Repository:** https://github.com/OletiSowmya62/weather-dashboard

## ✨ Key Features

- ✅ Search weather by city name
- ✅ Display current temperature and weather conditions
- ✅ View detailed metrics like humidity, wind speed, pressure, visibility, sunrise, and sunset
- ✅ Access a 5-day forecast
- ✅ Explore upcoming 3-hour forecast entries
- ✅ Use browser geolocation to detect the user's location
- ✅ Refresh data without re-entering a city
- ✅ Save and revisit recent searches
- ✅ Restore the last searched city on refresh
- ✅ Toggle between Celsius and Fahrenheit
- ✅ Switch between light and dark theme modes
- ✅ Handle loading and error states gracefully
- ✅ Enjoy a responsive design across desktop, tablet, and mobile screens

## 🛠️ Technologies Used

- **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **API:** OpenWeather API
- **State Management:** React Context API
- **Browser Features:** Geolocation API, LocalStorage
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

## 📚 React Concepts Demonstrated

- **useState** for local UI state
- **useEffect** for side effects and lifecycle logic
- **useCallback** for memoized event handlers
- **Context API** for theme management
- **Props** for reusable component communication
- **Controlled components** for form handling
- **Conditional rendering** for dynamic UI states
- **Array methods** such as map() and filter()
- **Async/Await** and Promise.all() for API requests
- **Reusable component design**
- **Browser API integration**
- **Client-side persistence** using LocalStorage

## 📁 Project Structure

```bash
src/
├── components/
│   ├── CurrentWeather.jsx
│   ├── ErrorMessage.jsx
│   ├── Forecast.jsx
│   ├── HourlyForecast.jsx
│   ├── Loading.jsx
│   ├── SearchBar.jsx
│   ├── SearchHistory.jsx
│   └── WeatherDetails.jsx
├── context/
│   └── ThemeContext.jsx
├── services/
│   └── weatherService.js
├── App.jsx
├── App.css
├── index.css
├── main.jsx
└── assets/
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/OletiSowmya62/weather-dashboard.git
cd weather-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure the API key**

Create a `.env` file in the project root and add:

```bash
VITE_WEATHER_API_KEY=your_openweather_api_key
```

> Do not commit the real `.env` file to GitHub.

4. **Start the development server**

```bash
npm run dev
```

5. **Create a production build**

```bash
npm run build
```

6. **Preview the production build**

```bash
npm run preview
```

## ☁️ Deployment

This project is deployed on Vercel. Make sure the `VITE_WEATHER_API_KEY` environment variable is configured in the Vercel project settings so the live app can fetch weather data successfully.

## 🌦️ API Overview

Weather data is provided by the OpenWeather API. The app uses geocoding to convert a city name into coordinates, then retrieves current conditions and forecast data for that location.

## 👩‍💻 Author

- **Sowmya Oleti**
- **Frontend Developer | React Developer**