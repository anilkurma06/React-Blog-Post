import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange }) => (
  <div className={styles.searchBar}>
    <label htmlFor="search-input" className={styles.label}>
      Search Posts
    </label>
    <input
      id="search-input"
      type="text"
      className={styles.input}
      placeholder="Search by title or content..."
      value={value}
      onChange={onChange}
      aria-label="Search blog posts"
      autoComplete="off"
    />
  </div>
);

export default SearchBar;
