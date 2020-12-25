import React, { Component } from 'react';

import './EasterEgg.css';
import EasterEgg from './EasterEgg';
import candle from './img/candle.svg';
import eeFinal from './img/2020vianoce.jpg';
import { reportEG } from './ga';

let instance;

class EasterEggCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, total: 0, showFinal: false };
    this.visited = {}; // map of visited EE
    instance = this;
  }

  render() {
    const { count, total, showFinal } = this.state;
    return (
      <div className="EE-Counter">
        <span>
          {count} / {total}
        </span>{' '}
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
  }

  register(eeName) {
    this.visited[eeName] = false;
    this.setState({ total: Object.keys(this.visited).length });
  }

  count() {
    return Object.keys(this.visited).filter((k) => this.visited[k]).length;
  }

  onVisit(eeName) {
    const previousCount = this.count();
    this.visited[eeName] = true;
    const count = this.count();
    if (previousCount === count) {
      return;
    }
    this.setState({
      count,
    });
    if (count === this.state.total) {
      reportEG('FINAL');
      setTimeout(() => this.setState({ showFinal: true }), 1500);
    }
  }
}

export function getCounter() {
  return instance;
}

export default EasterEggCounter;
