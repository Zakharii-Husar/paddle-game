import { useEffect } from 'react';

const Draw = ({
  gameState,
  canvasRef,
  platform,
  ball,
  brickArr }) => {

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawPlatform = () => {
      ctx.fillRect(platform.x, canvas.height - platform.h, platform.w, platform.h);
    };

    const drawBall = () => {
      ctx.fillStyle = 'green';
      ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
      ctx.strokeStyle = 'black';
      ctx.strokeWidth = ball.r;
      ctx.fill();
      ctx.stroke();
    };

    const drawBricks = () => {
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

      requestAnimationFrame(animate);
    };
    
    animate();

    return (() => {
      cancelAnimationFrame(animate);
    })

  }, [gameState]);


  return false
};

export default Draw;