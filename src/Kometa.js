import React from 'react';
import './Kometa.css';

import kometa from './img/star.svg';
import ee2019 from './img/2019risko.jpg';
import EasterEgg from './EasterEgg';

const Kometa = () => {
  return (
    <div className="kometa ">
      <img alt="kometa" className="slide-in-blurred-br" src={kometa} />
      <EasterEgg
        className="photo"
        name="2019risko"
        position={{ top: 0, left: '-50px' }}
      >
        <img alt="2019risko" src={ee2019} className="EE-image" />
      </EasterEgg>
    </div>
  );
};

export default Kometa;
