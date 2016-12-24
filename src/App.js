import React, { Component } from 'react';

import Stromcek from './Stromcek';
import Snezenie from './Snezenie';
import Darceky from './Darceky';
import Deers from './Deers';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stromcek/>
        <Snezenie/>
        <Darceky/>
        <Deers/>
      </div>
    );
  }
}

export default App;
