import { useMemo } from 'react';

const ERA_MARKERS = [
  { year: 1995, label: '1995', era: 'GeoCities' },
  { year: 2000, label: '2000', era: 'GeoCities' },
  { year: 2005, label: '2005', era: 'Web 2.0' },
  { year: 2010, label: '2010', era: 'Web 2.0' },
  { year: 2015, label: '2015', era: 'Modern' },
  { year: 2020, label: '2020', era: 'Modern' },
  { year: 2025, label: '2025', era: 'Modern' },
];

function getEraName(year) {
  if (year <= 2002) return 'GeoCities Era';
  if (year <= 2014) return 'Web 2.0 Era';
  return 'Modern Era';
}

function getEraClass(year) {
  if (year <= 2002) return 'era-geocities';
  if (year <= 2014) return 'era-web2';
  return 'era-modern';
}

export default function Timeline({ currentYear, onYearChange }) {
  const eraName = useMemo(() => getEraName(currentYear), [currentYear]);
  const eraClass = useMemo(() => getEraClass(currentYear), [currentYear]);

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <span className="timeline-title">⏱ Time Travel</span>
        <span className={`era-badge ${eraClass}`}>{eraName}</span>
      </div>
      
      <div className="timeline-slider-wrapper">
        <input
          type="range"
          min="1995"
          max="2025"
          value={currentYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="timeline-slider"
        />
        <div className="year-display">{currentYear}</div>
      </div>

      <div className="timeline-markers">
        {ERA_MARKERS.map(marker => (
          <button
            key={marker.year}
            className={`timeline-marker ${currentYear === marker.year ? 'active' : ''}`}
            onClick={() => onYearChange(marker.year)}
          >
            {marker.label}
          </button>
        ))}
      </div>
    </div>
  );
}
