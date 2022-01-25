import { useEffect, useState, useRef } from 'react';
import right from './right.png'
import left from './left.png'

const Control = ({
  requestRef,
  gameState,
  canvasRef,
  platform }) => {

  const canvas = canvasRef.current;
  const move = useRef(null);

  const moveRight = () => {
    if (platform.x < canvas.width - platform.w) platform.x += platform.speed;
  };

  const moveLeft = () => {
    if (platform.x > 0) platform.x -= platform.speed;
  };

  const movePlatform = () => {
    if (move.current === 'right') moveRight();
    if (move.current === 'left') moveLeft();
    requestRef.current = requestAnimationFrame(movePlatform);
  };

  const keyDown = ({ key }) => {
    if (key === 'ArrowRight') move.current = 'right';
    if (key === 'ArrowLeft') move.current = 'left';
  }

  const keyUp = () => {
    move.current = null;
  };

  useEffect(() => {

    movePlatform();

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return (() => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      cancelAnimationFrame(requestRef.current);
    })

  }, [gameState]);


  return (
    <div className='buttons'>
      <button
        onTouchStart={(e) => { move.current = 'left' }}
        onTouchEnd={() => { move.current = null }}>Left</button>
      <button
        onTouchStart={() => { move.current = 'right' }}
        onTouchEnd={() => { move.current = null }}>Right</button>
    </div>
  );
};

export default Control;