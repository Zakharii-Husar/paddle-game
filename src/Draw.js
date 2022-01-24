import { useEffect, useRef } from 'react';

const Draw = ({
  gameState,
  canvasRef,
  platform,
  ball,
  brickArr }) => {

  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawPlatform = () => {
      ctx.fillStyle = 'blue';
      ctx.strokeStyle = 'grey';
      ctx.strokeWidth = 5;
      ctx.fillRect(platform.x, canvas.height - platform.h, platform.w, platform.h);
    };

    const drawBall = () => {
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'gold';
      ctx.strokeWidth = ball.r;
      ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    };

    const drawBricks = () => {
      ctx.fillStyle = 'green';
      ctx.strokeStyle = 'white';
      for (let i = 0; i < brickArr.length; i++) {
        brickArr[i]?.draw(ctx);
        brickArr[i]?.colision(brickArr, i);
      }
    }


    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      drawPlatform();
      drawBall();
      drawBricks();

      requestRef.current = requestAnimationFrame(animate);
    };

    if (gameState) animate();

    return (() => {
      cancelAnimationFrame(requestRef.current);
    })

  }, [gameState]);


  return false
};

export default Draw;