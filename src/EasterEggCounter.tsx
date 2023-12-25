import React, { Component } from 'react';

import './EasterEgg.css';
import EasterEgg from './EasterEgg';
import candle from './img/candle.svg';
import eeFinal from './img/2020vianoce.jpg';
import { reportEG } from './ga';

let instance: EasterEggCounter | null;

interface State {
  count: number;
  total: number; 
  showFinal: boolean;
}

interface Props {
}

class EasterEggCounter extends Component<Props, State> {
  private visited: Record<string, boolean> = {}; // map of visited EE

  private constructor(props: Props) {
    super(props);
    this.state = { count: 0, total: 0, showFinal: false };
    instance = this;
  }

  public render() {
    const { count, total, showFinal } = this.state;
    return (
      <div className="EE-Counter">
        <span>{count} / {total}</span>{' '}
        <img src={candle} alt="candle" className="candle" />
        <EasterEgg
          className="sticky-EE"
          name="candle"
          position={{ right: '1em', top: '2em' }}
          onVisit={(eeName: string) => this.onVisit(eeName)}
        >
          Najdes vsetkych {total} skrytych darcekov?
        </EasterEgg>
        {showFinal && (
          <img alt="finalEE" className="EE-final-image" src={eeFinal} />
        )}
      </div>
    );
  }

  public register(eeName: string): void {
    this.visited[eeName] = false;
    this.setState((prevState) => ({
      total: Object.keys(this.visited).length,
    }));
  }

  private count(): number {
    return Object.values(this.visited).filter((visited) => visited).length;
  }

  public onVisit(eeName: string): void {
    console.log('onVisit', eeName, this.visited);
    const previousCount: number = this.count();
    this.visited[eeName] = true;
    const count: number = this.count();
    if (previousCount === count) {
      return;
    }
    reportEG(eeName);
    this.setState((prevState) => ({
      count,
    }));

    if (count === this.state.total) {
      reportEG('FINAL');
      setTimeout(() => this.setState({ showFinal: true }), 1500);
    }
  }
}

export function getCounter(): EasterEggCounter | null {
  return instance;
}

export default EasterEggCounter;
