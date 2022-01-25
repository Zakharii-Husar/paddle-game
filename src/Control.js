import { useEffect, useState, useRef } from 'react';
import right from './right.png'
import left from './left.png'

const Control = ({
  gameState,
  canvasRef,
  platform }) => {

  const requestRef = useRef();
  const [move, setMove] = useState(null);
  const canvas = canvasRef.current;
  const leftRef = useRef();
  const rightRef = useRef();

  // useEffect(() => {
  //   const sensorControl = () => {
  //     if (move === 'right' && platform.x + platform.w < canvas.width) platform.x += 1;
  //     if (move === 'left' && platform.x > 0) platform.x -= 1;
  //     requestRef.current = requestAnimationFrame(sensorControl);

  //   }
  //   sensorControl();
  //   console.log(move, platform.x);

  //   return (() => {
  //     cancelAnimationFrame(requestRef.current);
  //   })

  // }, [gameState, move, platform]);



  useEffect(() => {

    const moveRight = () =>{
      if (platform.x < canvas.width - platform.w) platform.x += platform.speed;
    };

    const moveLeft = () =>{
      if (platform.x > 0) platform.x -= platform.speed;
    }

    const keyControl = ({ key }) => {
      if (key === 'ArrowRight') moveRight();
      if (key === 'ArrowLeft') moveLeft();
    }

    if (gameState) {
      window.addEventListener('keydown', keyControl);

      leftRef.current.addEventListener('touchstart', (e)=>{e.preventDefault(); moveLeft()})

      rightRef.current.addEventListener('touchstart', (e)=>{e.preventDefault(); moveLeft()})
    }

    return (() => {
      window.removeEventListener('keydown', keyControl);
      leftRef.current.removeEventListener('touchstart', moveLeft);
      rightRef.current.removeEventListener('touchstart', moveRight);
    })

  }, [gameState]);


  return (
    <div className='buttons'>
      <img
        ref={leftRef}
        alt='<<<'
        src={left}
        onTouchStart={() => setMove(() => 'left')}
        onTouchEnd={() => setMove(() => 'stop')} />
      <img
        ref={rightRef}
        alt='>>>'
        src={right}
        onTouchStart={() => setMove(() => 'right')}
        onTouchEnd={() => setMove(() => 'stop')} />
    </div>
  );
};

export default Control;