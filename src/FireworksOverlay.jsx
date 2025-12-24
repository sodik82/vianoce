import { Fireworks } from 'fireworks-js';
import React, { Fragment, useEffect, useRef } from 'react';
import EasterEgg from './EasterEgg';
import ee from './img/2021sneh.jpg';

export const FireworksOverlay = ({ enabled }) => {
  const containerRef = useRef(null);
  const fireworksRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !fireworksRef.current) {
      fireworksRef.current = new Fireworks(containerRef.current, {
        speed: 3,
      });
    }

    if (fireworksRef.current) {
      if (enabled) {
        fireworksRef.current.start();
      } else {
        fireworksRef.current.stop();
      }
    }

    return () => {
      if (fireworksRef.current) {
        fireworksRef.current.stop();
      }
    };
  }, [enabled]);

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'transparent',
    pointerEvents: 'none',
  };

  const eeStyle = {
    position: 'fixed',
    bottom: 0,
    left: '40%',
    height: 30,
    width: '20%',
    // background: 'red',
  };

  return (
    <Fragment>
      <div ref={containerRef} style={style}></div>
      <div style={eeStyle}>
        <EasterEgg
          name="fire"
          className="sticky-EE"
          position={{ bottom: '1em', left: '-4em', zIndex: 200 }}
          text="2021"
        >
          <img alt="2021sneh" className="EE-image" src={ee} />
        </EasterEgg>
      </div>
    </Fragment>
  );
};
