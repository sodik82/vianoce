import React, { Fragment, useState } from 'react';
import './App.css';
import Darceky from './Darceky';
import Deers from './Deers';
import EasterEggCounter from './EasterEggCounter';
import { FireworksOverlay } from './FireworksOverlay';
import Kometa from './Kometa';
import Snezenie from './Snezenie';
import SnowGlobe from './SnowGlobe';
import Stromcek from './Stromcek';
import { Train } from './Train';
import { MazeEntrance } from './maze/MazeEntrance';
import { Maze } from './maze/Maze';

function App() {
  const [fwEnabled, setFwEnabled] = useState(false);
  const [maze, setMaze] = useState(false);
  return (
    <div className="App">
      <div className={'App-container ' + (maze && 'Maze')}>
        <Kometa />
        <Stromcek onFinish={() => setFwEnabled(true)} />
        <Snezenie active={!maze} />
        <Darceky />
        <MazeEntrance onEnter={() => setMaze(true)} />
        <Train />
        <SnowGlobe />
      </div>
      <Maze visible={maze} onExit={() => setMaze(false)} />
      {!maze && (
        <Fragment>
          <Deers />
          <FireworksOverlay enabled={fwEnabled} />
        </Fragment>
      )}
      <EasterEggCounter />
    </div>
  );
}

export default App;
