import React, { useState } from 'react';

import EasterEgg from './EasterEgg';
import eeImg from './img/2018risko.jpg';

var seed = [18, 21, 4, 15, 12, 16, 8];

const Deers = () => {
  const [selected, setSelected] = useState(-1);

  const deers = [];
  for (let i = 0; i < 7; i++) {
    const ee = i === 1 && (
      <EasterEgg
        name="deer"
        className="sticky-EE"
        position={{ left: -30, bottom: 70 }}
        text="2018"
      >
        <img alt="2018risko" className="EE-image" src={eeImg} />
      </EasterEgg>
    );
    deers.push(
      <Deer
        key={i}
        selectedIdx={selected}
        onIn={() => setSelected(i)}
        onOut={() => setSelected(-1)}
        idx={i}
      >
        {ee}
      </Deer>
    );
  }
  return <div>{deers}</div>;
};

function Deer(props) {
  const { idx, onIn, onOut, selectedIdx, children } = props;
  var top = 60 * idx;
  let cn = 'deer';
  if (selectedIdx > -1) {
    if (idx === selectedIdx) {
      cn += ' up';
    } else {
      var value = seed[selectedIdx];
      for (var i = 0; i < 6; i++) {
        if (value % 2 === 1) {
          if (idx === indx(selectedIdx, i)) {
            cn += ' up';
          }
          value--;
        }
        value /= 2;
      }
    }
  }
  return (
    <div
      className={cn}
      style={{ top: top + 'px' }}
      onMouseEnter={onIn}
      onMouseLeave={onOut}
    >
      {children}
    </div>
  );
}

function indx(idx, i) {
  return i < idx ? i : i + 1;
}

export default Deers;
