function SearchHistory({ history, onSelectCity, onClearHistory }) {
  if (history.length === 0) {
    return null;
  }

  return (
    <section className="search-history">
      <div className="history-header">
        <h3>Recent Searches</h3>

        <button
          type="button"
          className="clear-history"
          onClick={onClearHistory}
        >
          Clear
        </button>
      </div>

      <div className="history-list">
        {history.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onSelectCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchHistory;