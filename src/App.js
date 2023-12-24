import React, { useState } from 'react';
import './App.css';
import Darceky from './Darceky';
import Deers from './Deers';
import EasterEggCounter from './EasterEggCounter';
import { FireworksOverlay } from './FireworksOverlay';
import Kometa from './Kometa';
import Snezenie from './Snezenie';
import Stromcek from './Stromcek';
import { Train } from './Train';
import { MazeEntrance } from './maze/MazeEntrance';

const dev = !!window.location.search;

function App() {
  const [fwEnabled, setFwEnabled] = useState(false);
  return (
    <div className="App">
      <div className="App-container">
        <Kometa />
        <Stromcek onFinish={() => setFwEnabled(true)} />
        {!dev && <Snezenie />}
        <Darceky />
        <MazeEntrance />
        <Train />
      </div>
      <Deers />
      <FireworksOverlay enabled={fwEnabled} />
      <EasterEggCounter />
    </div>
  );
}

export default App;
