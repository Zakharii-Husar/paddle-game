import { useEffect, useState } from 'react';
import right from './right.png'
import left from './left.png'

const Control = ({
  gameState,
  canvasRef,
  platform, }) => {

  const [move, setMove] = useState(null);

  useEffect(() => {

    const sensorControl = () => {
      if (move === 'right') platform.x += platform.speed
      else if (move === 'left') platform.x -= platform.speed
      else return;
    }

    sensorControl();

  }, [platform])

  useEffect(() => {
    const canvas = canvasRef.current;


    const keyControl = ({ key }) => {
      if (key === 'ArrowRight' && platform.x < canvas.width - platform.w)
        platform.x += platform.speed;
      if (key === 'ArrowLeft' && platform.x > 0)
        platform.x -= platform.speed;
    }

    if (gameState) window.addEventListener('keydown', keyControl);

    return (() => {
      window.removeEventListener('keydown', keyControl);
    })

  }, [gameState]);


  return (
    <div className='buttons'>
      <img
        alt='<<<'
        src={left}
        onTouchStart={() => setMove('left')} />
      <img
        alt='>>>'
        src={right}
        onClick={() => platform.x += platform.speed}
        onTouchStart={() => platform.x += platform.speed} />
    </div>
  );
};

export default Control;