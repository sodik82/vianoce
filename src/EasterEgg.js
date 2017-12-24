/* globals ga */
import React, { Component } from 'react';

import { getCounter } from './EasterEggCounter';

class EasterEgg extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    const { className, position } = this.props;
    const style = Object.assign({ position: 'absolute' }, position);
    return (
      <div
        className={className}
        style={{ zIndex: 100 }}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        {this.state.visible && <div style={style}>{this.props.children}</div>}
      </div>
    );
  }

  componentDidMount() {
    getCounter().register(this.props.name);
  }

  show = () => {
    console.log('show!');
    ga('send', 'event', 'EasterEgg', this.props.className);
    this.setState({ visible: true });
    getCounter().onVisit(this.props.name);
  };
  hide = () => {
    this.setState({ visible: false });
  };
}

export default EasterEgg;
