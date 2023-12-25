import * as React from 'react';
import treeImg from '../img/tree.png';
import santaImg from '../img/santa.png';
import iglu from '../img/2023iglu.jpg';
import { MazeEsterEgg } from './MazeEsterEgg';

interface Props {}

enum Sprite {
  SANTA,
  TREE,
}

enum Direction {
  UP,
  LEFT,
  RIGHT,
  DOWN,
}

interface EEDefinition {
  name: string;
  text: string;
  img: string;
}

interface MazeCell {
  isWall: boolean;
  visited: boolean;
  sprite?: Sprite;
  egg?: EEDefinition;
}

type Maze = MazeCell[][];

const ees: Record<number, EEDefinition> = {
  101: { name: '2023iglu', text: '2023', img: iglu },
};

const generateMaze = () => {
  const mazeTiles: number[][] = [
    [0, 0, 1, 1, 1],
    [1, 101, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 0, 101],
  ];
  const maze: Maze = [];
  for (let i = 0; i < mazeTiles.length; i++) {
    for (let j = 0; j < mazeTiles[0].length; j++) {
      if (!maze[i]) {
        maze[i] = [];
      }
      const tile = mazeTiles[i][j];
      const mazeTile: MazeCell = {
        isWall: tile === 1,
        visited: false,
        sprite: tile > 100 ? Sprite.TREE : undefined,
        egg: ees[tile],
      };
      if (i === 0 && j === 0) {
        mazeTile.sprite = Sprite.SANTA;
      }
      maze[i][j] = mazeTile;
    }
  }

  return maze;
};

const renderSprite = (cell: MazeCell) => {
  let el = null;
  switch (cell.sprite) {
    case Sprite.TREE:
      el = <img src={treeImg} className="sprite" alt="Tree" />;
      break;
    case Sprite.SANTA:
      el = <img src={santaImg} className="sprite" alt="Santa" />;
      break;
  }
  if (cell.egg) {
    el = (
      <MazeEsterEgg {...cell.egg} visited={cell.visited}>
        {el}
      </MazeEsterEgg>
    );
  }
  return el;
};

const renderMaze = (maze: Maze) => {
  return maze.map((row, y) => {
    return row.map((cell, x) => {
      const isWall = cell.isWall;
      const className = isWall ? 'wall' : 'path';
      return (
        <div key={`cell-${x}-${y}`} className={className}>
          {renderSprite(cell)}
        </div>
      );
    });
  });
};

const findSanta = (maze: Maze) => {
  // Get the current position of Santa
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      if (maze[y][x].sprite === Sprite.SANTA) {
        return [y, x];
      }
    }
  }
  return undefined;
};

interface MoveResult {
  maze: Maze;
  prevCell?: MazeCell;
}

function cloneMaze(maze: Maze): Maze {
  const clonedMaze: Maze = [];
  for (let y = 0; y < maze.length; y++) {
    clonedMaze.push([]);
    for (let x = 0; x < maze[0].length; x++) {
      const clonedCell = Object.assign({}, maze[y][x]);
      clonedMaze[y][x] = clonedCell;
    }
  }

  return clonedMaze;
}

const moveSantaInDirection = (maze: Maze, direction: Direction): MoveResult => {
  // Get the current position of Santa
  let oldPosition = findSanta(maze);
  if (!oldPosition) {
    return { maze };
  }

  const newPosition = [oldPosition[0], oldPosition[1]];
  // Move Santa in the specified direction
  if (direction === Direction.DOWN) {
    newPosition[0]++;
  } else if (direction === Direction.UP) {
    newPosition[0]--;
  } else if (direction === Direction.LEFT) {
    newPosition[1]--;
  } else if (direction === Direction.RIGHT) {
    newPosition[1]++;
  }

  // Check if the new position is a wall or a tree
  const newCell = getMazeCell(maze, newPosition);
  if (!newCell || newCell.isWall) {
    // Santa cannot move into a wall (or outside)
    return { maze };
  } else {
    // Update the maze with Santa's new position
    const clonedMaze = cloneMaze(maze);
    const cell = clonedMaze[newPosition[0]][newPosition[1]];
    cell.sprite = Sprite.SANTA;
    cell.visited = true;
    clonedMaze[oldPosition[0]][oldPosition[1]].sprite = undefined;
    return { maze: clonedMaze, prevCell: newCell };
  }
};

function getMazeCell(maze: Maze, pos: number[]): MazeCell | undefined {
  const row = maze[pos[0]];
  if (!row) {
    return undefined;
  }
  return row[pos[1]];
}

export const MazeGame: React.FC<Props> = (props) => {
  const [maze, setMaze] = React.useState(generateMaze());
  console.log(maze);
  const move = (dir: Direction) =>
    setMaze((m) => moveSantaInDirection(m, dir).maze);
  return (
    <div>
      <div className="maze-grid">{renderMaze(maze)}</div>;
      <div>
        <button onClick={() => move(Direction.LEFT)}> Left </button>
        <button onClick={() => move(Direction.UP)}> Up </button>
        <button onClick={() => move(Direction.DOWN)}> Down </button>
        <button onClick={() => move(Direction.RIGHT)}> Right </button>
      </div>
    </div>
  );
};
