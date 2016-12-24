import React, { Component } from 'react';

var seed = [ 18, 21, 4, 15, 12, 16, 8];

class Deers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: -1,
    }
  }
  render() {
    const deers = [];
    for(let i=0; i<7;i++) {
      deers.push((<Deer
          key={i}
          selectedIdx={this.state.selected}
          onIn={() => this.selectDeer(i)}
          onOut={() => this.selectDeer(-1)}
          idx={i} />));
    }
    return (
      <div>
        {deers}
      </div>
    );
  }

  selectDeer(idx) {
    this.setState({ selected: idx });
  }
}

function Deer(props) {
  const { idx, onIn, onOut, selectedIdx } = props;
  var top = 60 * idx;
  let cn = "deer";
  if (selectedIdx > -1) {
    if (idx === selectedIdx) {
      cn += " up";
    } else {
      var value = seed[selectedIdx];
      for(var i=0; i<6; i++) {
        if (value % 2 === 1) {
          if (idx === indx(selectedIdx,i)) {
            cn += " up";
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
      style={{top: top+'px'}}
      onMouseEnter={onIn}
      onMouseLeave={onOut}
      />
  )
}

function indx(idx, i) {
  return i < idx ? i : i + 1;
}

export default Deers;
