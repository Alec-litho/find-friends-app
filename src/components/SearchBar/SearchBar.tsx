import React from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCity: string;
  onFilterChange: (value: string) => void;
  cities: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, filterCity, onFilterChange, cities }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="search">Search by name/email:</label>
        <input id="search" type="text" placeholder="Start typing..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="city-filter">Filter by city:</label>
        <select id="city-filter" value={filterCity} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
