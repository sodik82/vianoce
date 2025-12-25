import React, { useState, useEffect } from 'react';
import './SnowGlobe.css';
import { useEasterEgg } from './contexts/EasterEggContext';
import ee2025 from './img/2025okno.jpg';

const SnowGlobe = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [isDiscovered, setIsDiscovered] = useState(false);
  const { register, onVisit } = useEasterEgg();

  useEffect(() => {
    // Register this easter egg with the counter
    register('snowglobe-2025');
  }, [register]);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);

    if (!isDiscovered) {
      setIsDiscovered(true);
      // Mark as visited in the counter
      onVisit('snowglobe-2025');
    }
  };

  return (
    <div className="snowglobe-container">
      <div
        className={`snowglobe ${isShaking ? 'shake' : ''}`}
        onClick={handleClick}
      >
        <div className="snowglobe-glass">
          <div className="snowglobe-content">
            {isDiscovered && (
              <div className="snowglobe-revealed">
                <img alt="2025snowglobe" className="snowglobe-image" src={ee2025} />
                <div className="snowglobe-text">2025</div>
              </div>
            )}
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={'snow-particle-' + i} className={'snow-particle snow-' + (i + 1)} />
            ))}
          </div>
        </div>
        <div className="snowglobe-base"></div>
      </div>
    </div>
  );
};

export default SnowGlobe;
