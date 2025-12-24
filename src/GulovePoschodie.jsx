import React, { Component } from 'react';
import EasterEgg from './EasterEgg';
import ee from './img/2017baby.jpg';

class GulovePoschodie extends Component {
  render() {
    const { fromX, toX, baseY, last, ratio } = this.props;
    return (
      <div>{makeBalls(fromX * ratio, toX * ratio, baseY * ratio, last)}</div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return this.props.ratio !== nextProps.ratio;
  }
}

function makeBalls(fromX, toX, baseY, last) {
  const balls = [];
  var count = (toX - fromX) / 80;
  if (count < 1) {
    count = 1;
  }
  count = Math.floor(count);
  for (var i = 0; i < count; i++) {
    var x = Math.floor(Math.random() * 40) + fromX + i * 80 + 10;
    var y = baseY;
    var delay = Math.floor(Math.random() * 5);
    var duration = Math.floor(Math.random() * 8) + 7;
    balls.push(
      <Ball
        key={i}
        x={x}
        y={y}
        delay={delay}
        duration={duration}
        special={last && i === count - 1}
      />
    );
  }
  return balls;
}

const SIZE = undefined;
function Ball(props) {
  const { x, y, delay, duration, special } = props;
  return (
    <div
      className="gula1"
      style={{
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        width: SIZE,
        height: SIZE,
        animationDelay: delay + 's',
        animationDuration: duration + 's',
      }}
    >
      <div className="tien" />
      {special && (
        <EasterEgg
          name="2017baby"
          className="sticky-EE"
          position={{ right: 0, bottom: 0 }}
          text="2017"
        >
          <img alt="2017baby" className="EE-image" src={ee} />
        </EasterEgg>
      )}
    </div>
  );
}

export default GulovePoschodie;
