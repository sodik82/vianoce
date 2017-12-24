import React, { Component } from 'react';

import GulovePoschodie from './GulovePoschodie';
import Star, { SIZE } from './Star';
import EasterEgg from './EasterEgg';
import ee2017 from './img/2017iceland.JPG';

const zelanie = 'StastneVesele';

class Stromcek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      podpis: false
    };
  }

  render() {
    const { tree, penX, penY, poschodia } = makeTree(6);
    return (
      <div className="canvas">
        <div className="Stromcek">
          <svg xmlns="http://www.w3.org/2000/svg">
            <polygon points={tree} style={{ fill: 'green' }} />
            <rect
              x={penX}
              y={penY}
              width="40"
              height="100"
              style={{ fill: 'brown' }}
            />
          </svg>
        </div>
        {poschodia.map((p, i) => <GulovePoschodie {...p} key={i} />)}
        {this.state.stars}
        {this.state.podpis && (
          <svg
            style={{
              position: 'absolute',
              top: '250px',
              left: '110px',
              width: '300px',
              height: '150px',
              zIndex: 10
            }}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <defs>
              <path id="pathx" d="M75,20 a1,1 0 0,0 100,0" />
            </defs>
            <text x="10" y="100" transform="scale(1.5)" style={{ fill: 'red' }}>
              <textPath xlinkHref="#pathx">Vianoce zela Sodik</textPath>
            </text>
          </svg>
        )}
      </div>
    );
  }

  tick(idx) {
    console.log('tick', idx);
    var name = 'star' + idx;
    if (idx >= zelanie.length) {
      this.setState({ podpis: true });
      return;
    }
    const { stars } = this.state;
    const x = compX(idx) - 20;
    const y = compY(idx) - 20;
    stars.push(
      <Star key={name} text={zelanie.charAt(idx)} color="yellow" x={x} y={y} />
    );
    if (idx === 0) {
      stars.push(
        <EasterEgg
          key="EE"
          name="2017iceland"
          style={{
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: SIZE,
            height: SIZE
          }}
          position={{
            left: '-150px'
          }}
        >
          <img alt="2017iceland" className="EE-image" src={ee2017} />
        </EasterEgg>
      );
    }
    this.setState({ stars });
    setTimeout(() => this.tick(idx + 1), 700);
  }

  componentDidMount() {
    this.tick(0);
  }
}

function makeTree(levels) {
  const poschodia = [];
  var points = '';
  var top = '' + compX(0) + ',' + compY(0);
  // start with top
  points = top;
  let end = top;
  var centerX = compX(0);
  for (var i = 0; i < levels; i++) {
    var idx = 1 + 2 * i;
    var leftX = compX(idx);
    var leftY = compY(idx);
    points += ' ' + leftX + ',' + leftY;
    points += ' ' + (centerX - 20) + ',' + leftY;
    idx = 2 + 2 * i;
    var rightX = compX(idx);
    var rightY = compY(idx);
    end = rightX + ',' + rightY + ' ' + end;
    end = centerX + 20 + ',' + rightY + ' ' + end;
    // makeBalls(leftX + 20, rightX - 20, leftY);
    poschodia.push({
      fromX: leftX + 20,
      toX: rightX - 20,
      baseY: leftY,
      last: i === levels - 1
    });
  }
  // merge "left" and right side
  points += ' ' + end;
  return {
    tree: points,
    penX: '' + (compX(0) - 20),
    penY: '' + compY(idx),
    poschodia
  };
}

function compX(idx) {
  var x = 300,
    dx = 0;
  if (idx > 0) {
    dx = Math.floor((idx + 1) / 2) * 40;
    if (idx % 2 === 1) dx = -dx;
  }
  return Math.floor(x + dx);
}

function compY(idx) {
  return Math.floor(50 + Math.pow(Math.floor((idx + 1) / 2), 1.1) * 50);
}

export default Stromcek;
