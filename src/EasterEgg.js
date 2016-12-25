/* globals ga */
import React, { Component } from 'react';

class EasterEgg extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  render() {
    const { className, position } = this.props;
    const style = Object.assign({position: 'absolute'}, position);
    return (
      <div className={className} style={{zIndex: 100}} onMouseEnter={this.show} onMouseLeave={this.hide}>
        { this.state.visible &&
          <div style={style}>
            {this.props.children}
          </div>
        }
      </div>
    );
  }

  show = () => {
    console.log("show!");
    ga('send', 'event', 'EasterEgg', this.props.className);
    this.setState({ visible: true });
  }
  hide = () => {
    this.setState({ visible: false });
  }
}

export default EasterEgg;
