import React, { useState, useEffect } from 'react';
import { useEasterEgg } from './contexts/EasterEggContext';

const EasterEgg = ({ name, className, position, style, text, textStyle = {}, children }) => {
  const [visible, setVisible] = useState(false);
  const { register, onVisit } = useEasterEgg();

  useEffect(() => {
    register(name);
  }, [name, register]);

  const show = () => {
    console.log('show!', name);
    setVisible(true);
    onVisit(name);
  };

  const hide = () => {
    setVisible(false);
  };

  const inStyle = Object.assign(
    { position: 'absolute', zIndex: 200 },
    position
  );

  return (
    <div
      className={className}
      style={{ zIndex: 100, ...style }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {visible && (
        <div style={inStyle}>
          {text && (
            <div style={textStyle} className="EE-text">
              {text}
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

export default EasterEgg;
