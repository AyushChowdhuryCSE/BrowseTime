import { useState, useEffect } from 'react';

const YEAR_FACTS = {
  1995: "The year JavaScript was created by Brendan Eich in just 10 days!",
  1996: "CSS Level 1 was officially released this year.",
  1997: "Netflix was founded (as a DVD rental service).",
  1998: "Google was founded by Larry Page and Sergey Brin.",
  1999: "Napster launched, revolutionizing music sharing.",
  2000: "The dot-com bubble burst, ending the first internet boom.",
  2001: "Wikipedia was launched, changing how we access knowledge.",
  2002: "Mozilla Firefox development began as 'Phoenix'.",
  2003: "WordPress was released, democratizing web publishing.",
  2004: "Facebook was launched from a Harvard dorm room.",
  2005: "YouTube was founded. 'Me at the zoo' was the first video.",
  2006: "Twitter was created. The first tweet: 'just setting up my twttr'.",
  2007: "The first iPhone was released, changing mobile web forever.",
  2008: "Chrome browser was released by Google.",
  2009: "Node.js was created, bringing JavaScript to servers.",
  2010: "Instagram launched, changing how we share photos.",
  2011: "Bootstrap was released, standardizing responsive design.",
  2012: "Retina displays forced web developers to think about pixel density.",
  2013: "React.js was open-sourced by Facebook.",
  2014: "HTML5 became an official W3C recommendation.",
  2015: "ES6 (ECMAScript 2015) brought major JavaScript improvements.",
  2016: "Vue.js reached 1.0, offering a progressive framework.",
  2017: "CSS Grid Layout achieved broad browser support.",
  2018: "GDPR came into effect, changing web privacy forever.",
  2019: "Dark mode became a standard feature across operating systems.",
  2020: "The pandemic accelerated digital transformation worldwide.",
  2021: "Web3 and NFTs entered mainstream conversation.",
  2022: "ChatGPT was released, sparking the AI revolution.",
  2023: "AI coding assistants became mainstream development tools.",
  2024: "WebGPU brings native graphics capabilities to browsers.",
  2025: "You're experiencing the cutting edge of web technology!",
};

export default function YearFact({ year, show }) {
  const [visible, setVisible] = useState(false);
  const [currentFact, setCurrentFact] = useState('');

  useEffect(() => {
    if (show) {
      setCurrentFact(YEAR_FACTS[year] || `${year} was an interesting year for the web!`);
      setVisible(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [year, show]);

  if (!visible) return null;

  return (
    <div className={`year-fact ${visible ? 'visible' : ''}`}>
      <div className="year-fact-content">
        <span className="year-fact-year">{year}</span>
        <p className="year-fact-text">{currentFact}</p>
      </div>
    </div>
  );
}
