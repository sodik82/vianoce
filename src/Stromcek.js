import React, { Component } from 'react';
import { withContentRect } from 'react-measure';

import GulovePoschodie from './GulovePoschodie';
import Star, { SIZE } from './Star';
import EasterEgg from './EasterEgg';
import ee2017 from './img/2017iceland.JPG';
import ee2020 from './img/2020brusko.jpg';

const zelanie = 'StastneVesele';

function computeRatio(contentRect) {
  const { width } = contentRect.bounds;
  const ratio = width / 640 || 0;
  return Math.min(1, ratio);
}

class Stromcek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      podpis: false,
    };
  }

  render() {
    const { measureRef, contentRect } = this.props;
    const ratio = computeRatio(contentRect);
    const { tree, penX, penY, poschodia } = makeTree(6);
    return (
      <div className="canvas">
        <div className="Stromcek" ref={measureRef}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 450">
            <polygon points={tree} style={{ fill: 'green' }} />
            <rect
              x={penX}
              y={penY}
              width="40"
              height="100"
              style={{ fill: 'brown' }}
            />
          </svg>
          <EasterEgg
            name="2020brusko"
            className="sticky-EE"
            style={{ right: '50%', top: 'auto', left: 'auto', height: 40, width: 40}}
            position={{ right: 0, bottom: 0 }}
          >
            <img alt="2020brusko" className="EE-image" src={ee2020} />
          </EasterEgg>
        </div>
        {poschodia.map((p, i) => (
          <GulovePoschodie {...p} ratio={ratio} key={i} />
        ))}
        {this.state.stars.map((sp) =>
          sp.egg ? (
            <EasterEgg
              key="EE"
              name="2017iceland"
              style={{
                position: 'absolute',
                left: sp.x + 'px',
                top: sp.y + 'px',
                width: SIZE,
                height: SIZE,
              }}
              position={{
                left: '-150px',
              }}
            >
              <img alt="2017iceland" className="EE-image" src={ee2017} />
            </EasterEgg>
          ) : (
            <Star color="yellow" {...sp} />
          )
        )}
        {this.state.podpis && (
          <svg
            viewBox="0 0 300 150"
            style={{
              position: 'absolute',
              top: 250 * ratio + 'px',
              left: 110 * ratio + 'px',
              width: 300 * ratio + 'px',
              height: 150 * ratio + 'px',
              zIndex: 10,
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
    const { contentRect } = this.props;
    const ratio = computeRatio(contentRect);
    var name = 'star' + idx;
    if (idx >= zelanie.length) {
      this.setState({ podpis: true });
      return;
    }
    const { stars } = this.state;
    const x = (compX(idx) - 20) * ratio;
    const y = (compY(idx) - 20) * ratio;
    stars.push({ key: name, text: zelanie.charAt(idx), x, y, ratio });
    if (idx === 0) {
      stars.push({ egg: 1, x, y });
    }
    this.setState({ stars });
    setTimeout(() => this.tick(idx + 1), 700);
  }

  componentDidMount() {
    setTimeout(() => this.tick(0), 500);
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
      last: i === levels - 1,
    });
  }
  // merge "left" and right side
  points += ' ' + end;
  return {
    tree: points,
    penX: '' + (compX(0) - 20),
    penY: '' + compY(idx),
    poschodia,
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

export default withContentRect('bounds')(Stromcek);
