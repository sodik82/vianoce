/* globals $ */
import React, { useEffect } from 'react';

import EasterEgg from './EasterEgg';
import ee2016 from './img/2016.jpg';

const isProduction = process.env.NODE_ENV === 'production' || true;

interface Props {
  active: boolean;
}

const Snezenie = (props: Props) => {
  const { active } = props;
  useEffect(() => {
    if (isProduction && active) {
      $(document).snowfall({ collection: '.snowCollection', flakeCount: 250 });
    } else {
      $(document).snowfall('clear');
      const els = document.querySelectorAll('body > canvas');
      for (const el of els) {
        document.body.removeChild(el);
      }
    }
  }, [active]);

  return (
    <div className="ground snowCollection">
      <EasterEgg
        className="photo snowCollection"
        name="2016"
        position={{ bottom: 0, left: '50px' }}
        text="2016"
      >
        <img alt="2016" src={ee2016} className="EE-image" />
      </EasterEgg>
    </div>
  );
};

export default Snezenie;
