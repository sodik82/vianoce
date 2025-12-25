import * as React from 'react';
import './maze.css';
import maze from '../img/maze.png';
import { MazeGame } from './MazeGame';

interface Props {
  onExit: () => 0;
  visible: boolean;
}

export const Maze: React.FC<Props> = (props) => {
  return (
    <div className={'maze-container ' + (props.visible ? '' : 'maze-hidden')}>
      <div onClick={props.onExit} style={{ cursor: 'pointer', display: 'inline-block' }}>
        <img
          alt="Maze Exit"
          src={maze}
          className="maze-exit"
        /> Back
      </div>
      <div className="maze-container-inner">
        <MazeGame />
      </div>
    </div>
  );
};
