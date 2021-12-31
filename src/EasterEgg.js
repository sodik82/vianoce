import React, { Component } from 'react';

import { getCounter } from './EasterEggCounter';
import { reportEG } from './ga';

class EasterEgg extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    const { className, position, style } = this.props;
    const inStyle = Object.assign({ position: 'absolute', zIndex: 200 }, position);
    return (
      <div
        className={className}
        style={{ zIndex: 100, ...style }}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        {this.state.visible && <div style={inStyle}>{this.props.children}</div>}
      </div>
    );
  }

  componentDidMount() {
    getCounter().register(this.props.name);
  }

  show = () => {
    console.log('show!', this.props.name);
    reportEG(this.props.name);
    this.setState({ visible: true });
    getCounter().onVisit(this.props.name);
  };
  hide = () => {
    this.setState({ visible: false });
  };
}

export default EasterEgg;
