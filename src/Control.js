import { useEffect, useState, useRef } from 'react';
import right from './right.png'
import left from './left.png'

const Control = ({
  requestRef,
  gameState,
  canvasRef,
  platform }) => {

  const [move, setMove] = useState(null);
  const canvas = canvasRef.current;

  useEffect(() => {
    const sensorControl = () => {
      if (move === 'right' && platform.x + platform.w < canvas.width) platform.x += 1;
      if (move === 'left' && platform.x > 0) platform.x -= 1;
      requestRef.current = requestAnimationFrame(sensorControl);
      
    }
    sensorControl();
    console.log(move, platform.x);

    return(()=>{
      cancelAnimationFrame(requestRef.current);
    })

  });



  useEffect(() => {


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
        onTouchStart={() => setMove('left')}
        onTouchEnd={() => setMove('stop')} />
      <img
        alt='>>>'
        src={right}
        onTouchStart={() => setMove('right')}
        onTouchEnd={() => setMove('stop')} />
    </div>
  );
};

export default Control;