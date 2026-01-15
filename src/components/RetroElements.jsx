import { useState, useEffect } from 'react';

// Hit counter that increments on each visit
function HitCounter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const stored = localStorage.getItem('hitCounter') || '12847';
    const newCount = parseInt(stored) + 1;
    localStorage.setItem('hitCounter', newCount.toString());
    setCount(newCount);
  }, []);

  const digits = count.toString().padStart(6, '0').split('');
  
  return (
    <div className="hit-counter">
      <font face="Arial" size="1">You are visitor #</font>
      <span className="counter-digits">
        {digits.map((d, i) => (
          <span key={i} className="counter-digit">{d}</span>
        ))}
      </span>
    </div>
  );
}

// Under construction banner
function UnderConstruction() {
  return (
    <div className="under-construction">
      <span className="construction-icon">🚧</span>
      <blink>
        <font face="Comic Sans MS" color="#FFD700" size="2">
          *** UNDER CONSTRUCTION ***
        </font>
      </blink>
      <span className="construction-icon">🚧</span>
    </div>
  );
}

// Web 2.0 Beta badge
function BetaBadge() {
  return (
    <div className="beta-badge">
      <span>BETA</span>
    </div>
  );
}

// Marquee text
function MarqueeText({ text }) {
  return (
    <div className="retro-marquee">
      <div className="marquee-content">
        {text}
      </div>
    </div>
  );
}

// Guestbook link (1998)
function GuestbookLink() {
  return (
    <div className="guestbook-link">
      <a href="#" onClick={(e) => { e.preventDefault(); alert('Guestbook coming soon!'); }}>
        <font face="Arial" size="2">📝 Sign My Guestbook!</font>
      </a>
    </div>
  );
}

// Webring navigation (1998)
function WebRing() {
  return (
    <div className="webring">
      <table border="1" cellPadding="3" bgcolor="#FFFFCC">
        <tbody>
          <tr>
            <td align="center">
              <font face="Arial" size="1">
                <b>🌐 Time Travel WebRing 🌐</b><br />
                <a href="#">« Prev</a> | 
                <a href="#">Random</a> | 
                <a href="#">Next »</a>
              </font>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function RetroElements({ currentYear }) {
  // 1998 Era elements
  if (currentYear <= 2002) {
    return (
      <>
        <MarqueeText text="★★★ Welcome to the Time Travel Search Engine!!! ★★★ Best viewed in Netscape Navigator 4.0 ★★★ 800x600 resolution recommended ★★★" />
        <div className="retro-footer">
          <UnderConstruction />
          <HitCounter />
          <GuestbookLink />
          <WebRing />
          <div className="best-viewed">
            <font face="Arial" size="1">
              Best viewed with Internet Explorer 4.0<br />
              © 1998 Time Travel Search. All rights reserved.
            </font>
          </div>
        </div>
      </>
    );
  }

  // 2010 Era elements
  if (currentYear <= 2014) {
    return (
      <>
        <BetaBadge />
        <footer className="footer-2010">
          <div className="footer-content">
            <p>© 2010 Time Travel Search | <a href="#">About</a> | <a href="#">Contact</a> | <a href="#">Privacy</a></p>
            <div className="social-icons">
              <a href="#" title="Follow us on Twitter">🐦</a>
              <a href="#" title="Like us on Facebook">📘</a>
              <a href="#" title="Subscribe to RSS">📡</a>
            </div>
          </div>
        </footer>
      </>
    );
  }

  // Modern Era elements
  return (
    <footer className="footer-modern">
      <div className="footer-content">
        <p>Time Travel Search</p>
        <p className="footer-subtitle">Experience the web through the ages</p>
      </div>
    </footer>
  );
}
