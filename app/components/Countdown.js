'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // World Cup 2026: June 11 - July 19, 2026
    const startDate = new Date('2026-06-11T00:00:00Z');
    const endDate = new Date('2026-07-19T23:59:59Z');

    const update = () => {
      const now = new Date();
      
      if (now >= startDate && now <= endDate) {
        setIsLive(true);
        // Show time remaining in tournament
        const diff = endDate - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else if (now < startDate) {
        const diff = startDate - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-wrapper">
      {isLive && (
        <div className="countdown-label-live">
          <span className="live-dot-lg"></span> TOURNAMENT IN PROGRESS
        </div>
      )}
      <div className="countdown">
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-label">Mins</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-label">Secs</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
        {isLive ? 'Time remaining in tournament' : 'Until kickoff'}
      </div>
    </div>
  );
}
