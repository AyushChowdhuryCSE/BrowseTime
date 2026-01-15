import { useState } from 'react';

export default function SearchBar({ onSearch, isLoading, currentYear }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  // For 1998 era, use classic input style
  if (currentYear <= 2002) {
    return (
      <form onSubmit={handleSubmit} className="search-form">
        <table className="search-table">
          <tbody>
            <tr>
              <td>
                <font face="Arial" size="2"><b>Search the Web:</b></font>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-input"
                  placeholder="Enter your search..."
                  disabled={isLoading}
                />
                <input
                  type="submit"
                  value={isLoading ? 'Searching...' : 'Search!'}
                  className="search-button"
                  disabled={isLoading}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }

  // For 2010 era, use glossy Web 2.0 style
  if (currentYear <= 2014) {
    return (
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-box-2010">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            placeholder="Search..."
            disabled={isLoading}
          />
          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? '⌛ Loading...' : '🔍 Search'}
          </button>
        </div>
      </form>
    );
  }

  // Modern era - clean minimal
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-box-modern">
        <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          placeholder="Search Wikipedia..."
          disabled={isLoading}
        />
        {isLoading && <div className="search-spinner"></div>}
      </div>
    </form>
  );
}
