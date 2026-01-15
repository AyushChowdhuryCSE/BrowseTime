import SearchResult from './SearchResult';

export default function ResultsList({ results, currentYear, isLoading, isSlowLoading }) {
  if (isLoading) {
    // Era-specific loading states
    if (currentYear <= 2002) {
      return (
        <div className="loading-container">
          <img 
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7, base64" 
            alt="Loading..."
          />
          <blink><font face="Comic Sans MS" color="#FF0000">Loading... Please Wait...</font></blink>
        </div>
      );
    }
    if (currentYear <= 2014) {
      return (
        <div className="loading-container">
          <div className="loading-spinner-2010"></div>
          <p>Loading results...</p>
        </div>
      );
    }
    // Modern skeleton loading
    return (
      <div className="results-container">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  // 1998 Era - Table layout
  if (currentYear <= 2002) {
    return (
      <div className="results-container">
        <table border="0" cellPadding="8" cellSpacing="2" width="100%" bgcolor="#FFFFFF">
          <tbody>
            <tr bgcolor="#E0E0E0">
              <td colSpan="2">
                <font face="Arial" size="2">
                  <b>Search Results ({results.length} found)</b>
                </font>
              </td>
            </tr>
            {results.map((result, index) => (
              <SearchResult 
                key={result.id} 
                result={result} 
                currentYear={currentYear}
                index={index}
                isSlowLoading={isSlowLoading && index > 2}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 2010 Era - Float-based grid
  if (currentYear <= 2014) {
    return (
      <div className="results-container">
        <div className="results-header-2010">
          <h2>Search Results</h2>
          <span className="results-count">{results.length} results found</span>
        </div>
        <div className="results-grid-2010 clearfix">
          {results.map((result, index) => (
            <SearchResult 
              key={result.id} 
              result={result} 
              currentYear={currentYear}
              index={index}
              isSlowLoading={isSlowLoading && index > 2}
            />
          ))}
        </div>
      </div>
    );
  }

  // Modern Era - CSS Grid cards
  return (
    <div className="results-container">
      <header className="results-header">
        <h2>Results</h2>
        <span className="results-count">{results.length} results</span>
      </header>
      <div className="results-grid">
        {results.map((result, index) => (
          <SearchResult 
            key={result.id} 
            result={result} 
            currentYear={currentYear}
            index={index}
            isSlowLoading={isSlowLoading && index > 2}
          />
        ))}
      </div>
    </div>
  );
}
