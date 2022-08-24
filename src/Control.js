import { useEffect, useState, useRef } from 'react';
import right from './right.png'
import left from './left.png'
import fullscreenPic from './fullscreen.png'

const Control = ({
  requestRef,
  gameState,
  canvasRef,
  platform,
  fullScreen }) => {

  const IS_IN_LANDSCAPE_MODE = window.screen.orientation.type === 'landscape' ||
  window.screen.orientation.type === 'landscape-primary' || false;

  const canvas = canvasRef.current;
  
  const move = useRef(null);

  const [buttonHighLight, setButtonHighLight] = useState(null);

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
    window.addEventListener('touchstart', function (e) { e.preventDefault() }, { passive: false });

    return (() => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      cancelAnimationFrame(requestRef.current);
    })

  }, [gameState]);


  return (
    <div className='buttons'>
      <img
        style={buttonHighLight === 'left' ? { backgroundColor: 'red' } : { backgroundColor: 'black' }}
        alt='<<<'
        src={left}
        onTouchStart={() => { move.current = 'left'; setButtonHighLight('left') }}
        onTouchEnd={() => { move.current = null; setButtonHighLight(null) }} />

      <img
        style={IS_IN_LANDSCAPE_MODE ? {display: 'none'} :
        {display: 'flex'}}
        src={fullscreenPic}
        onTouchStart={() => fullScreen()} />
      <img
        style={buttonHighLight === 'right' ? { backgroundColor: 'red' } : { backgroundColor: 'black' }}
        alt='>>>'
        src={right}
        onTouchStart={() => {
          move.current = 'right';
          setButtonHighLight('right');
        }}
        onTouchEnd={() => { move.current = null; setButtonHighLight(null) }} />
    </div>
  );
};

export default Control;