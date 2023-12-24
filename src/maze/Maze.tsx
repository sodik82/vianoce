import * as React from 'react';
import './maze.css';
import maze from '../img/maze.png';
import { MazeGame } from './MazeGame';

interface Props {
  onExit: () => 0;
}

export const Maze: React.FC<Props> = (props) => {
  return (
    <div className="maze-container">
      <img
        alt="Maze Exit"
        onClick={props.onExit}
        src={maze}
        className="maze-exit"
      />
      <div className="maze-container-inner">
        <MazeGame />
      </div>
    </div>
  );
};
