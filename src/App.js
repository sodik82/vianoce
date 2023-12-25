import React, { Fragment, useState } from 'react';
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
import { Maze } from './maze/Maze';

const dev = !!window.location.search;

function App() {
  const [fwEnabled, setFwEnabled] = useState(false);
  const [maze, setMaze] = useState(false);
  return (
    <div className="App">
      <div className={'App-container ' + (maze && 'Maze')}>
        <Kometa />
        <Stromcek onFinish={() => setFwEnabled(true)} />
        {!dev && <Snezenie />}
        <Darceky />
        <MazeEntrance onEnter={() => setMaze(true)} />
        <Train />
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
