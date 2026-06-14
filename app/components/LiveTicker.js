'use client';

import { useState, useEffect } from 'react';

export default function LiveTicker() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch('/api/scores', { cache: 'no-store' });
        const data = await res.json();
        if (data.matches) setMatches(data.matches);
      } catch (err) {
        console.error('Ticker fetch failed');
      }
    };
    fetchTicker();
    const interval = setInterval(fetchTicker, 30000);
    return () => clearInterval(interval);
  }, []);

  if (matches.length === 0) return null;

  // Double the items for seamless looping
  const tickerItems = [...matches, ...matches];

  return (
    <div className="ticker">
      <div className="ticker-inner">
        {tickerItems.map((match, i) => (
          <div key={i} className="ticker-item">
            {match.status === 'LIVE' || match.status === 'HT' ? (
              <>
                <span className="ticker-live">LIVE {match.minute}&apos;</span>
                <span className="flag">{match.homeFlag}</span>
                <span>{match.homeName}</span>
                <span className="score">{match.homeScore} - {match.awayScore}</span>
                <span>{match.awayName}</span>
                <span className="flag">{match.awayFlag}</span>
              </>
            ) : match.status === 'FT' || match.status === 'FINISHED' ? (
              <>
                <span className="ticker-ft">FT</span>
                <span className="flag">{match.homeFlag}</span>
                <span>{match.homeName}</span>
                <span className="score">{match.homeScore} - {match.awayScore}</span>
                <span>{match.awayName}</span>
                <span className="flag">{match.awayFlag}</span>
              </>
            ) : (
              <>
                <span className="ticker-time">{match.kickoff}</span>
                <span className="flag">{match.homeFlag}</span>
                <span>{match.homeName}</span>
                <span className="vs">VS</span>
                <span>{match.awayName}</span>
                <span className="flag">{match.awayFlag}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
