/* globals $ */
import React, { Component } from 'react';

class Snezenie extends Component {
  render() {
    return (
      <div className="ground">
      </div>
    );
  }

  componentDidMount() {
    $(document).snowfall({collection : '.ground', flakeCount : 250});
  }
}

export default Snezenie;
