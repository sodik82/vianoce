import React, { Component } from 'react';

export const SIZE = 50;

class Star extends Component {
  render() {
    const { text, color, x, y, ratio } = this.props;
    return (
      <div
        id="star"
        style={{
          position: 'absolute',
          left: x + 'px',
          top: y + 'px',
          width: SIZE * ratio,
          height: SIZE * ratio
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <g transform="scale(0.25)">
            <polygon
              points="100,10 40,180 190,60 10,60 160,180"
              style={{ fill: color, stroke: 'black' }}
            />
            <text x="85" y="110" fontSize="55" fill="red">
              {text}
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

export default Star;
