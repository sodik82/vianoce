import React, { useState, useEffect } from 'react';
import './SnowGlobe.css';
import { getCounter } from './EasterEggCounter';
import ee2025 from './img/2025okno.jpg';

const SnowGlobe = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [isDiscovered, setIsDiscovered] = useState(false);

  useEffect(() => {
    // Register this easter egg with the counter
    getCounter()?.register('snowglobe-2025');
  }, []);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);

    if (!isDiscovered) {
      setIsDiscovered(true);
      // Mark as visited in the counter
      getCounter()?.onVisit('snowglobe-2025');
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
            <div className="snow-particle snow-1"></div>
            <div className="snow-particle snow-2"></div>
            <div className="snow-particle snow-3"></div>
            <div className="snow-particle snow-4"></div>
            <div className="snow-particle snow-5"></div>
            <div className="snow-particle snow-6"></div>
            <div className="snow-particle snow-7"></div>
            <div className="snow-particle snow-8"></div>
            <div className="snow-particle snow-9"></div>
            <div className="snow-particle snow-10"></div>
            <div className="snow-particle snow-11"></div>
            <div className="snow-particle snow-12"></div>
            <div className="snow-particle snow-13"></div>
            <div className="snow-particle snow-14"></div>
            <div className="snow-particle snow-15"></div>
            <div className="snow-particle snow-16"></div>
          </div>
        </div>
        <div className="snowglobe-base"></div>
      </div>
    </div>
  );
};

export default SnowGlobe;
