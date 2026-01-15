export default function SearchResult({ result, currentYear, index, isSlowLoading }) {
  const { title, snippet, thumbnail, url } = result;

  // For slow loading simulation in 1998 mode
  const shouldShow = !isSlowLoading;

  // 1998 Era - Table row style
  if (currentYear <= 2002) {
    return (
      <tr className={`search-result ${shouldShow ? 'loaded' : 'loading'}`}>
        <td valign="top" width="60">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt="" 
              width="50" 
              height="50"
              style={{ border: '1px solid #000' }}
            />
          ) : (
            <img 
              src="data:image/gif;base64,R0lGODlhMgAyAIAAAP///wAAACH5BAEAAAEALAAAAAAyADIAAAJRjI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7FYAACH5BAkHAAEALAAAAAA="
              alt="[No Image]"
              width="50"
              height="50"
            />
          )}
        </td>
        <td>
          <font face="Arial" size="2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <b>{title}</b>
            </a>
            <br />
            <font size="1" color="#666666">
              <span dangerouslySetInnerHTML={{ __html: snippet }} />
            </font>
            <br />
            <font size="1" color="#009900">{url}</font>
          </font>
        </td>
      </tr>
    );
  }

  // 2010 Era - Glossy card with reflection
  if (currentYear <= 2014) {
    return (
      <div className={`search-result ${shouldShow ? 'loaded' : 'loading'}`}>
        <div className="result-card-2010">
          {thumbnail && (
            <div className="result-image-container">
              <img src={thumbnail} alt="" className="result-image" />
              <div className="result-image-reflection"></div>
            </div>
          )}
          <div className="result-content">
            <h3>
              <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
            </h3>
            <p dangerouslySetInnerHTML={{ __html: snippet }} />
            <span className="result-url">{url}</span>
          </div>
        </div>
      </div>
    );
  }

  // Modern Era - Clean card
  return (
    <article className={`search-result ${shouldShow ? 'loaded' : 'loading'}`}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="result-link">
        {thumbnail && (
          <div className="result-thumbnail">
            <img src={thumbnail} alt="" loading="lazy" />
          </div>
        )}
        <div className="result-content">
          <h3 className="result-title">{title}</h3>
          <p className="result-snippet" dangerouslySetInnerHTML={{ __html: snippet }} />
          <span className="result-url">{url}</span>
        </div>
      </a>
    </article>
  );
}
