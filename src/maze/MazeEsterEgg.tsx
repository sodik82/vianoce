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

  const handleClose = React.useCallback(() => {
    setClosed(true);
    getCounter()?.onVisit(name);
  }, [name]);

  React.useEffect(() => {
    if (!visited || closed) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visited, closed, handleClose]);

  return (
    <React.Fragment>
      {children}
      {visited && !closed && (
        <div className="maze-ee">
          <button
            className="maze-ee-close"
            onClick={handleClose}
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
