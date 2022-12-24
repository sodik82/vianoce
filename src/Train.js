import React from 'react';
import EasterEgg from './EasterEgg';
import trainImg from './img/train.png';
import ee from './img/2022.jpg';
import './Train.css';

export function Train() {
  return (
    <div className="train">
      <img alt="train" className="train-image" src={trainImg} />
      <div className="train-ee">
        <EasterEgg
          name="train-1"
          className="sticky-EE"
          position={{ bottom: 0 }}
          text="2022"
        >
          <img alt="2022train" className="EE-image" src={ee} />
        </EasterEgg>
      </div>
    </div>
  );
}
