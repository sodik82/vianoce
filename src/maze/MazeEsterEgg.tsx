import * as React from 'react';
import { getCounter } from '../EasterEggCounter';

interface Props {
  name: string;
  visited: boolean;
  text?: string;
  img: string;
  children: React.ReactNode;
}

export const MazeEsterEgg: React.FC<Props> = (props) => {
  const { name, text, visited, img, children } = props;
  React.useEffect(() => {
    getCounter()?.register(name);
  }, [name]);
  const [closed, setClosed] = React.useState(false);
  return (
    <React.Fragment>
      {children}
      {visited && !closed && (
        <div className="maze-ee">
          <button
            className="maze-ee-close"
            onClick={() => {
              setClosed(true);
              getCounter()?.onVisit(name);
            }}
          >
            X
          </button>
          <div className="EE-text">{text}</div>
          <img src={img} alt={name} />
        </div>
      )}
    </React.Fragment>
  );
};
