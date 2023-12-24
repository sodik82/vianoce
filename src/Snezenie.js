/* globals $ */
import React, { Component } from 'react';

import EasterEgg from './EasterEgg';
import ee2016 from './img/2016.JPG';

const isProduction = process.env.NODE_ENV === 'production';

class Snezenie extends Component {
  render() {
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
  }

  componentDidMount() {
    if (isProduction) {
      $(document).snowfall({ collection: '.snowCollection', flakeCount: 250 });
    }
  }
}

export default Snezenie;
