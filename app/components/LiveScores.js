'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LiveScores() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchScores = async () => {
    try {
      const res = await fetch('/api/scores', { cache: 'no-store' });
      const data = await res.json();
      if (data.matches) {
        setMatches(data.matches);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch scores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="live-scores-container">
        <div className="live-scores-header">
          <h2><span className="live-dot-lg"></span> Live Scores</h2>
        </div>
        <div className="live-loading">
          <div className="loading-pulse"></div>
          <p>Loading live matches...</p>
        </div>
      </div>
    );
  }

  const liveMatches = matches.filter(m => m.status === 'LIVE' || m.status === 'HT');
  const todayMatches = matches.filter(m => m.status === 'SCHEDULED' || m.status === 'NS');
  const finishedMatches = matches.filter(m => m.status === 'FT' || m.status === 'FINISHED');

  return (
    <div className="live-scores-container">
      <div className="live-scores-header">
        <h2><span className="live-dot-lg"></span> Live Scores & Results</h2>
        {lastUpdated && (
          <span className="last-updated">
            Updated {lastUpdated.toLocaleTimeString()} • Auto-refreshes every 30s
          </span>
        )}
      </div>

      {/* LIVE NOW */}
      {liveMatches.length > 0 && (
        <div className="live-section">
          <h3 className="live-section-title"><span className="tag tag-live">🔴 LIVE NOW</span></h3>
          <div className="live-matches-grid">
            {liveMatches.map((match, i) => (
              <div key={i} className="live-match-card live-active">
                <div className="live-match-minute">{match.minute}&apos;</div>
                <div className="live-match-body">
                  <div className="live-team">
                    <span className="live-flag">{match.homeFlag}</span>
                    <span className="live-name">{match.homeName}</span>
                    <span className="live-score">{match.homeScore}</span>
                  </div>
                  <div className="live-team">
                    <span className="live-flag">{match.awayFlag}</span>
                    <span className="live-name">{match.awayName}</span>
                    <span className="live-score">{match.awayScore}</span>
                  </div>
                </div>
                <div className="live-match-meta">
                  <span>{match.group}</span>
                  <span>📍 {match.venue}</span>
                </div>
                {match.events && match.events.length > 0 && (
                  <div className="live-events">
                    {match.events.map((evt, j) => (
                      <div key={j} className="live-event">
                        <span className="event-minute">{evt.minute}&apos;</span>
                        <span className="event-icon">{evt.type === 'goal' ? '⚽' : evt.type === 'yellow' ? '🟨' : evt.type === 'red' ? '🟥' : evt.type === 'sub' ? '🔄' : '📋'}</span>
                        <span className="event-player">{evt.player}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TODAY'S UPCOMING */}
      {todayMatches.length > 0 && (
        <div className="live-section">
          <h3 className="live-section-title"><span className="tag tag-upcoming">📅 UPCOMING TODAY</span></h3>
          <div className="live-matches-grid">
            {todayMatches.map((match, i) => (
              <div key={i} className="live-match-card">
                <div className="live-match-kickoff">{match.kickoff}</div>
                <div className="live-match-body">
                  <div className="live-team">
                    <span className="live-flag">{match.homeFlag}</span>
                    <span className="live-name">{match.homeName}</span>
                    <span className="live-score">-</span>
                  </div>
                  <div className="live-team">
                    <span className="live-flag">{match.awayFlag}</span>
                    <span className="live-name">{match.awayName}</span>
                    <span className="live-score">-</span>
                  </div>
                </div>
                <div className="live-match-meta">
                  <span>{match.group}</span>
                  <span>📍 {match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FINISHED TODAY */}
      {finishedMatches.length > 0 && (
        <div className="live-section">
          <h3 className="live-section-title"><span className="tag tag-completed">✅ COMPLETED</span></h3>
          <div className="live-matches-grid">
            {finishedMatches.map((match, i) => (
              <div key={i} className="live-match-card finished">
                <div className="live-match-ft">FT</div>
                <div className="live-match-body">
                  <div className="live-team">
                    <span className="live-flag">{match.homeFlag}</span>
                    <span className="live-name">{match.homeName}</span>
                    <span className="live-score">{match.homeScore}</span>
                  </div>
                  <div className="live-team">
                    <span className="live-flag">{match.awayFlag}</span>
                    <span className="live-name">{match.awayName}</span>
                    <span className="live-score">{match.awayScore}</span>
                  </div>
                </div>
                <div className="live-match-meta">
                  <span>{match.group}</span>
                  <span>📍 {match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {matches.length === 0 && (
        <div className="live-no-matches">
          <p>⚽ No matches scheduled right now. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
