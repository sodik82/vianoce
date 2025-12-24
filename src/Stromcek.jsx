import React, { useState, useEffect, useRef, useCallback } from 'react';

import GulovePoschodie from './GulovePoschodie';
import Star, { SIZE } from './Star';
import EasterEgg from './EasterEgg';
import ee2017 from './img/2017iceland.JPG';
import ee2020 from './img/2020brusko.jpg';

const zelanie = 'StastneVesele';

function computeRatio(contentRect) {
  const { width } = contentRect.bounds;
  const ratio = width / 640 || 0;
  return Math.min(1, ratio);
}

function Stromcek({ onFinish }) {
  const [stars, setStars] = useState([]);
  const [podpis, setPodpis] = useState(false);
  const [contentRect, setContentRect] = useState({ bounds: { width: 640, height: 450 } });
  const [currentIndex, setCurrentIndex] = useState(-1);

  const measureRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const onFinishRef = useRef(onFinish);

  // Keep onFinishRef in sync
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Setup ResizeObserver
  useEffect(() => {
    if (measureRef.current) {
      resizeObserverRef.current = new ResizeObserver(entries => {
        for (let entry of entries) {
          const newContentRect = {
            bounds: {
              width: entry.contentRect.width,
              height: entry.contentRect.height,
            }
          };
          setContentRect(newContentRect);
        }
      });
      resizeObserverRef.current.observe(measureRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  // Start animation after 1 second, then increment index every 1000ms
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setCurrentIndex(0);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  // Interval to increment index
  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= zelanie.length) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Add stars based on current index
  useEffect(() => {
    if (currentIndex < 0) {
      return;
    }

    if (currentIndex >= zelanie.length) {
      setPodpis(true);
      onFinishRef.current();
      return;
    }

    console.log('tick', currentIndex);
    const ratio = computeRatio(contentRect);
    const name = 'star' + currentIndex;
    const x = (compX(currentIndex) - 20) * ratio;
    const y = (compY(currentIndex) - 20) * ratio;

    setStars(prevStars => {
      const newStars = [...prevStars];
      newStars.push({ id: name, text: zelanie.charAt(currentIndex), x, y, ratio });
      if (currentIndex === 0) {
        newStars.push({ egg: 1, x, y });
      }
      return newStars;
    });
  }, [currentIndex, contentRect]);

  const ratio = computeRatio(contentRect);
  const { tree, penX, penY, poschodia } = makeTree(6);

  return (
    <div className="canvas">
      <div className="Stromcek" ref={measureRef}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 450">
          <polygon points={tree} style={{ fill: 'green' }} />
          <rect
            x={penX}
            y={penY}
            width="40"
            height="100"
            style={{ fill: 'brown' }}
          />
        </svg>
        <EasterEgg
          name="2020brusko"
          className="sticky-EE"
          style={{
            right: '50%',
            top: 'auto',
            left: 'auto',
            bottom: 0,
            height: 40,
            width: 40,
          }}
          textStyle={{
            bottom: 0
          }}
          text="2020"
          position={{ right: 0, bottom: 0 }}
        >
          <img alt="2020brusko" className="EE-image" src={ee2020} />
        </EasterEgg>
      </div>
      {poschodia.map((p, i) => (
        <GulovePoschodie {...p} ratio={ratio} key={i} />
      ))}
      {stars.map((sp, index) =>
        sp.egg ? (
          <EasterEgg
            key={`egg-${index}`}
            name="2017iceland"
            style={{
              position: 'absolute',
              left: sp.x + 'px',
              top: sp.y + 'px',
              width: SIZE,
              height: SIZE,
            }}
            text="2017"
            position={{
              left: '-150px',
            }}
          >
            <img alt="2017iceland" className="EE-image" src={ee2017} />
          </EasterEgg>
        ) : (
          <Star key={sp.id} color="yellow" text={sp.text} x={sp.x} y={sp.y} ratio={sp.ratio} />
        )
      )}
      {podpis && (
        <svg
          viewBox="0 0 300 150"
          style={{
            position: 'absolute',
            top: 250 * ratio + 'px',
            left: 110 * ratio + 'px',
            width: 300 * ratio + 'px',
            height: 150 * ratio + 'px',
            zIndex: 10,
          }}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <path id="pathx" d="M75,20 a1,1 0 0,0 100,0" />
          </defs>
          <text x="10" y="100" transform="scale(1.5)" style={{ fill: 'red' }}>
            <textPath xlinkHref="#pathx">Vianoce zela Sodik</textPath>
          </text>
        </svg>
      )}
    </div>
  );
}

function makeTree(levels) {
  const poschodia = [];
  var points = '';
  var top = '' + compX(0) + ',' + compY(0);
  // start with top
  points = top;
  let end = top;
  var centerX = compX(0);
  for (var i = 0; i < levels; i++) {
    var idx = 1 + 2 * i;
    var leftX = compX(idx);
    var leftY = compY(idx);
    points += ' ' + leftX + ',' + leftY;
    points += ' ' + (centerX - 20) + ',' + leftY;
    idx = 2 + 2 * i;
    var rightX = compX(idx);
    var rightY = compY(idx);
    end = rightX + ',' + rightY + ' ' + end;
    end = centerX + 20 + ',' + rightY + ' ' + end;
    // makeBalls(leftX + 20, rightX - 20, leftY);
    poschodia.push({
      fromX: leftX + 20,
      toX: rightX - 20,
      baseY: leftY,
      last: i === levels - 1,
    });
  }
  // merge "left" and right side
  points += ' ' + end;
  return {
    tree: points,
    penX: '' + (compX(0) - 20),
    penY: '' + compY(idx),
    poschodia,
  };
}

function compX(idx) {
  var x = 300,
    dx = 0;
  if (idx > 0) {
    dx = Math.floor((idx + 1) / 2) * 40;
    if (idx % 2 === 1) dx = -dx;
  }
  return Math.floor(x + dx);
}

function compY(idx) {
  return Math.floor(50 + Math.pow(Math.floor((idx + 1) / 2), 1.1) * 50);
}

export default Stromcek;
