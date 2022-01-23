import { useEffect, useState } from 'react';
import './Control.css';
import right from './right.png'
import left from './left.png'

const Control = ({
  gameState,
  canvasRef,
  platform, }) => {

  const [move, setMove] = useState(null);

  useEffect(() => {
    const sensorControl = () => {
      if (move === 'right') platform.x += platform.speed;
      if (move === 'left') platform.x -= platform.speed;
    }

    sensorControl();

  }, [move])

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
      <img src={left}
        onTouchStart={() => setMove('left')}
        onTouchEnd={() => setMove(null)} />
      <img src={right}
        onTouchStart={() => setMove('right')} />
    </div>
  );
};

export default Control;