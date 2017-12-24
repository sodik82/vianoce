import React, { Component } from 'react';

import './EasterEgg.css';
import EasterEgg from './EasterEgg';
import candle from './img/candle.svg';

let instance;

class EasterEggCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, total: 0 };
    this.visited = {}; // map of visited EE
    instance = this;
  }

  render() {
    const { count, total } = this.state;
    return (
      <div className="EE-Counter">
        {count} <img src={candle} alt="candle" className="candle" />
        <EasterEgg
          className="sticky-EE"
          name="candle"
          position={{ right: '1em', top: '2em' }}
        >
          Najdes vsetkych {total} skrytych darcekov?
        </EasterEgg>
      </div>
    );
  }

  register(eeName) {
    this.visited[eeName] = false;
    this.setState({ total: Object.keys(this.visited).length });
  }

  onVisit(eeName) {
    this.visited[eeName] = true;
    this.setState({
      count: Object.keys(this.visited).filter(k => this.visited[k]).length
    });
  }
}

export function getCounter() {
  return instance;
}

export default EasterEggCounter;
