import React from 'react';
import './Kometa.css';

import kometa from './img/star.svg';

const Kometa = () => {
  return (
    <div className="kometa slide-in-blurred-br">
      <img alt="kometa" src={kometa} />
    </div>
  );
};

export default Kometa;
