import React from 'react';

import './EasterEgg.css';
import EasterEgg from './EasterEgg';
import candle from './img/candle.svg';
import eeFinal from './img/2020vianoce.jpg';
import { useEasterEgg } from './contexts/EasterEggContext';

const EasterEggCounter: React.FC = () => {
  const { count, total, showFinal } = useEasterEgg();

  return (
    <div className="EE-Counter">
      <span>{count} / {total}</span>{' '}
      <img src={candle} alt="candle" className="candle" />
      <EasterEgg
        className="sticky-EE"
        name="candle"
        position={{ right: '1em', top: '2em' }}
      >
        Najdes vsetkych {total} skrytych darcekov?
      </EasterEgg>
      {showFinal && (
        <img alt="finalEE" className="EE-final-image" src={eeFinal} />
      )}
    </div>
  );
};

export default EasterEggCounter;
