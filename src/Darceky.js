import React, { Component } from 'react';
import EasterEgg from './EasterEgg';

const now = new Date();
const year = now.getMonth() > 10 ? now.getFullYear() + 1 : now.getFullYear();

class Darceky extends Component {
  render() {
    return (
      <div id="container">
          <div className="xmasgift">
              <div className="ribbon"></div>
              <div className="ribbonTail"></div>
              <div className="wrapping">
                  <div className="cover"></div>
                      <p className="message">PF</p>
                  <div className="box"></div>
              </div>
          </div>
          <div className="xmasgift" id="d2">
              <div className="ribbon"></div>
              <div className="ribbonTail"></div>
              <div className="wrapping">
                  <div className="cover"></div>
                      <p className="message">{year}</p>
                  <div className="box"></div>
              </div>
              <EasterEgg name="gift" className="sticky-EE"/>
          </div>
      </div>
    );
  }
}

export default Darceky;
