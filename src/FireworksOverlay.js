import { Fireworks } from 'fireworks-js/dist/react';
import React, { Fragment } from 'react';
import EasterEgg from './EasterEgg';
import ee from './img/2021sneh.jpg';

export const FireworksOverlay = ({ enabled }) => {
  const options = {
    speed: 3,
  };

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
      <Fireworks options={options} enabled={enabled} style={style}></Fireworks>
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
