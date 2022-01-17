import './Canvas.css';
import { useRef, useState, useEffect } from 'react';
import Draw from './Draw';
import Control from './Control';
import Ball from './Ball';


const Canvas = () => {
  const canvasRef = useRef(null);

  const platform = {
    x: 0,
    y: 0,
    w: 60,
    h: 3,
    speed: 5
  };

  const ball = {
    x: 20,
    y: 100,
    r: 3,
    speed: 1,
    direction: 'rightUp'
  };

  const changeDirection = (direction1, direction2, direction3) => {
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
        changeDirection('rightUp', 'leftUp', 'leftDown');
        console.log('left');
        delete arr[index];
      }
      //hitting right of a brick
      if (ball.x === this.x + this.w &&
        ball.y + ball.r >= this.y &&
        ball.y <= this.y + this.h) {
        changeDirection('leftUp', 'rightUp', 'rightDown');
        console.log('right');
        delete arr[index];
      }
      //hitting top of a brick
      if (ball.y + ball.r === this.y &&
        ball.x + ball.r >= this.x &&
        ball.x <= this.x + this.w) {
        changeDirection('rightDown', 'rightUp', 'leftUp');
        console.log('top');
        delete arr[index];
      }
      //hitting bottom of a brick
      if (ball.y === this.y + this.h &&
        ball.x + ball.r >= this.x &&
        ball.x <= this.x + this.w) {
        changeDirection('rightUp', 'rightDown', 'leftDown');
        console.log('bottom');
        delete arr[index];
      }
    }
  }

  const brickArr = [];

  const brickParameters = {
    rows: 3,
    columns: 20,
    columnGap: 15,
    rowGap: 30,
    width: 10,
    height: 5
  }

  for (let i = 0; i < brickParameters.rows; i++) {
    for(let j = 0; j < brickParameters.columns; j++){
      brickArr.push(new Brick(j * brickParameters.columnGap,
        i * brickParameters.rowGap,
        brickParameters.width,
        brickParameters.height))
    }
  }


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
        changeDirection={changeDirection} />
    </>
  );
};

export default Canvas;
