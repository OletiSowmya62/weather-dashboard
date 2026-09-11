import { useState } from "react";

function SearchBar({ onSearch, onUseLocation }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    onSearch(trimmedCity);
    setCity("");
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <button
        type="button"
        className="location-button"
        onClick={onUseLocation}
      >
        Use My Location
      </button>
    </div>
  );
}

export default SearchBar;