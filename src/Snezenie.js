/* globals $ */
import React, { Component } from 'react';

import EasterEgg from './EasterEgg';
import ee2016 from './img/2016.JPG';

class Snezenie extends Component {
  render() {
    return (
      <div className="ground snowCollection">
        <EasterEgg className="photo snowCollection" name="2016" position={{bottom: 0, left: '50px'}}>
          <img alt="2016" src={ee2016}/>
        </EasterEgg>
      </div>
    );
  }

  componentDidMount() {
    $(document).snowfall({collection : '.snowCollection', flakeCount : 250});
  }
}

export default Snezenie;
