import React, { Component } from 'react';

import Kometa from './Kometa';
import Stromcek from './Stromcek';
import Snezenie from './Snezenie';
import Darceky from './Darceky';
import Deers from './Deers';
import EasterEggCounter from './EasterEggCounter';
import './App.css';

const dev = !!window.location.search;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <Kometa />
          <Stromcek />
          {!dev && <Snezenie />}
          <Darceky />
        </div>
        <Deers />
        <EasterEggCounter />
      </div>
    );
  }
}

export default App;
