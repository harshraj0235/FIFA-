'use client';

import { useState, useEffect } from 'react';

export default function LiveStandings() {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState('A');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch('/api/standings', { cache: 'no-store' });
        const data = await res.json();
        if (data.groups) {
          setGroups(data.groups);
        }
      } catch (err) {
        console.error('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
    const interval = setInterval(fetchStandings, 60000); // Every 60s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="standings-container">
        <div className="loading-pulse"></div>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading standings...</p>
      </div>
    );
  }

  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const currentGroup = groups.find(g => g.name === activeGroup);

  return (
    <div className="standings-container">
      <div className="standings-tabs">
        {groupLetters.map(letter => (
          <button
            key={letter}
            className={`standings-tab ${activeGroup === letter ? 'active' : ''}`}
            onClick={() => setActiveGroup(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {currentGroup && (
        <div className="standings-table-wrap">
          <table className="group-table standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {currentGroup.teams.map((team, idx) => (
                <tr key={team.name} className={idx < 2 ? 'qualify' : idx === 2 ? 'possible' : ''}>
                  <td style={{ fontWeight: 'bold', color: idx < 2 ? 'var(--accent-green)' : idx === 2 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                    {idx + 1}
                  </td>
                  <td>
                    <div className="team-cell">
                      <span className="flag">{team.flag}</span>
                      {team.name}
                    </div>
                  </td>
                  <td>{team.played}</td>
                  <td>{team.won}</td>
                  <td>{team.drawn}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td style={{ color: team.goalDifference > 0 ? 'var(--accent-green)' : team.goalDifference < 0 ? 'var(--accent-red)' : 'var(--text-muted)' }}>
                    {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                  </td>
                  <td style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent-gold)' }}>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="standings-legend">
            <span><span className="legend-dot qualify-dot"></span> Auto-qualify (Top 2)</span>
            <span><span className="legend-dot possible-dot"></span> Possible 3rd-place qualifier</span>
          </div>
        </div>
      )}
    </div>
  );
}
