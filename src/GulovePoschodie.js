import React, { Component } from 'react';

class GulovePoschodie extends Component {
  render() {
    const { fromX, toX, baseY } = this.props;
    return (
      <div>
        {makeBalls(fromX, toX, baseY)}
      </div>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}

function makeBalls(fromX, toX, baseY) {
  const balls = [];
  var count = (toX - fromX) / 80;
  if (count < 1) { count = 1; }
  for (var i = 0; i < Math.floor(count); i++) {
    var x = Math.floor(Math.random() * 40) + fromX + i * 80 + 10;
    var y = baseY;
    var delay = Math.floor(Math.random() * 5);
    var duration = Math.floor(Math.random() * 8) + 7;
    balls.push(<Ball key={i} x={x} y={y} delay={delay} duration={duration}/>);
  }
  return balls;
}

function Ball(props) {
  const { x,y, delay, duration } = props;
  return (
    <div
      className="gula1"
      style={{
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        animationDelay: delay + 's',
        animationDuration: duration + 's',
      }}>
      <div className="tien"/>
    </div>
  );
}


export default GulovePoschodie;
