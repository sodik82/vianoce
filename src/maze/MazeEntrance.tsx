import * as React from 'react';
import maze from '../img/maze.png';
import './maze.css';

interface Props {
  onEnter: () => 0;
}

export const MazeEntrance: React.FC<Props> = (props) => {
  return <img alt="Maze Entrance" onClick={props.onEnter} src={maze} className="maze-enter" />;
};
