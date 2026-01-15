import { useState, useCallback, useEffect } from 'react';
import Timeline from './components/Timeline';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import RetroElements from './components/RetroElements';
import YearFact from './components/YearFact';
import { searchWikipedia } from './services/wikipediaApi';
import './styles/base.css';
import './styles/themes.css';

function getThemeClass(year) {
  if (year <= 2002) return 'theme-1998';
  if (year <= 2014) return 'theme-2010';
  return 'theme-2024';
}

export default function App() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showYearFact, setShowYearFact] = useState(false);

  const themeClass = getThemeClass(currentYear);

  const handleYearChange = useCallback((year) => {
    setCurrentYear(year);
    setShowYearFact(true);
    
    // Play era-appropriate sound (optional feature)
    // playEraSound(year);
  }, []);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    setResults([]);

    // Simulate slow loading for 1998 mode
    const simulate56k = currentYear <= 2002;
    
    try {
      if (simulate56k) {
        // Artificial delay for 56k modem simulation
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const searchResults = await searchWikipedia(query);
      
      if (simulate56k) {
        // Progressive loading simulation
        setIsSlowLoading(true);
        setResults(searchResults);
        setIsLoading(false);
        
        // Gradually "load" remaining results
        setTimeout(() => setIsSlowLoading(false), 2000);
      } else {
        setResults(searchResults);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      setIsLoading(false);
    }
  }, [currentYear]);

  // Reset year fact visibility
  useEffect(() => {
    if (showYearFact) {
      const timer = setTimeout(() => setShowYearFact(false), 100);
      return () => clearTimeout(timer);
    }
  }, [currentYear]);

  return (
    <div className={`app-container ${themeClass}`}>
      <div className="app-wrapper">
        {/* Era-specific header elements */}
        {currentYear <= 2002 && (
          <div className="retro-header">
            <h1>
              <font face="Impact" color="#0000FF">
                ★ Time Travel ★
              </font>
            </h1>
            <h2>
              <font face="Comic Sans MS" color="#FF0000" size="3">
                ~ The Search Engine That Goes Back In Time! ~
              </font>
            </h2>
          </div>
        )}

        {currentYear > 2002 && currentYear <= 2014 && (
          <header className="header-2010">
            <div className="logo-2010">
              <h1>Time Travel</h1>
              <span className="tagline">Search Through The Ages</span>
            </div>
          </header>
        )}

        {currentYear > 2014 && (
          <header className="header-modern">
            <h1 className="logo-modern">Time Travel</h1>
            <p className="tagline-modern">Experience the web through history</p>
          </header>
        )}

        {/* Timeline Controller */}
        <Timeline 
          currentYear={currentYear} 
          onYearChange={handleYearChange} 
        />

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading}
          currentYear={currentYear}
        />

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {currentYear <= 2002 ? (
              <font face="Arial" color="red"><b>ERROR:</b> {error}</font>
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}

        {/* Search Results */}
        <ResultsList 
          results={results} 
          currentYear={currentYear}
          isLoading={isLoading}
          isSlowLoading={isSlowLoading}
        />

        {/* Era-specific decorative elements */}
        <RetroElements currentYear={currentYear} />

        {/* Year Fact Toast */}
        <YearFact year={currentYear} show={showYearFact} />
      </div>
    </div>
  );
}
