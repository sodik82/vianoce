import React, { Component } from 'react';

import Stromcek from './Stromcek';
import Snezenie from './Snezenie';
import Darceky from './Darceky';
import Deers from './Deers';
import EasterEggCounter from './EasterEggCounter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stromcek/>
        <Snezenie/>
        <Darceky/>
        <Deers/>
        <EasterEggCounter />
      </div>
    );
  }
}

export default App;
