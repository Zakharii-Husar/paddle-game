import './Canvas.css';
import { useRef, useEffect } from 'react';
import Draw from './Draw';
import Control from './Control';
import Ball from './Ball';


const Canvas = () => {
  const canvasRef = useRef(null);

  const brickArr = [];

  const player = {
    lives: 3,
    level: 1,
    bricksLeft: 0
  }

  const platform = {
    x: 120,
    y: 0,
    w: 60,
    h: 3,
    speed: 5
  };


  const ball = {
    x: 150,
    y: 150 - platform.h - 3,
    r: 3,
    speed: 1,
    direction: 'rightUp'
  };

  const ballDirection = (direction1, direction2, direction3) => {
    if (ball.direction === direction1) ball.direction = direction2
    else ball.direction = direction3
  };
  

  class Brick {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    draw(ctx) {
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }


    colision(arr, index) {
      //hitting left of a brick
      if (ball.x + ball.r === this.x &&
        ball.y + ball.r >= this.y &&
        ball.y <= this.y + this.h) {
        ballDirection('rightUp', 'leftUp', 'leftDown');
        delete arr[index];
      }
      //hitting right of a brick
      if (ball.x === this.x + this.w &&
        ball.y + ball.r >= this.y &&
        ball.y <= this.y + this.h) {
        ballDirection('leftUp', 'rightUp', 'rightDown');
        delete arr[index];
        
      }
      //hitting top of a brick
      if (ball.y + ball.r === this.y &&
        ball.x + ball.r >= this.x &&
        ball.x <= this.x + this.w) {
        ballDirection('rightDown', 'rightUp', 'leftUp');
        delete arr[index];
      }
      //hitting bottom of a brick
      if (ball.y === this.y + this.h &&
        ball.x + ball.r >= this.x &&
        ball.x <= this.x + this.w) {
        ballDirection('rightUp', 'rightDown', 'leftDown');
        delete arr[index];
      }
    }
  }

  const makeNewBricks = () => {
    let rows = 12;
    let columns = 16;
    let width = 15;
    let height = 5;
    let columnGap = width + 4;
    let rowGap = height + 4;

    if(player.level == 2) rows = 8;
    if(player.level == 3) rows = 10;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        brickArr.push(new Brick(j * columnGap,
          i * rowGap,
          width,
          height));
          player.bricksLeft += 1;
          console.log(player.bricksLeft);
      }
    }
  };
  makeNewBricks();


  return (
    <>
      <canvas
        id='canvas'
        ref={canvasRef} />

      <Draw
        canvasRef={canvasRef}
        platform={platform}
        ball={ball}
        brickArr={brickArr} />

      <Control
        canvasRef={canvasRef}
        platform={platform} />

      <Ball
        canvasRef={canvasRef}
        ball={ball}
        platform={platform}
        ballDirection={ballDirection} />
    </>
  );
};

export default Canvas;
