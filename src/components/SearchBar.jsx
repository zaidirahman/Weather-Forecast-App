import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a City..."
        className="w-full p-2 rounded-full shadow-lg border-none outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-400"
      />
    </form>
  );
}
export default SearchBar;
