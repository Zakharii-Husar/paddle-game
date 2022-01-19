import './Canvas.css';
import { useRef, useEffect, useState } from 'react';
import Draw from './Draw';
import Control from './Control';
import Ball from './Ball';
import Bricks from './Bricks';


const Canvas = () => {
  const canvasRef = useRef(null);

  const columns = 16;
  const [rows, setRows] = useState(10);

  const [gameState, setGameState] = useState(true);
  const [level, setLevel] = useState(1);
  const [bricksLeft, setBricksLeft] = useState(rows * columns);

  useEffect(()=>{
    if(bricksLeft === 159){
      setGameState(false);
      setRows(1);
    }
  }, [bricksLeft, gameState, rows])


  const player = {
    lives: 3,
    bricksLeft: rows * columns
  };



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

  const brickArr = [];


  return (
    <>
      <canvas
        id='canvas'
        ref={canvasRef} />

      <Draw
        gameState={gameState}
        canvasRef={canvasRef}
        platform={platform}
        ball={ball}
        brickArr={brickArr} />

      <Control
        gameState={gameState}
        canvasRef={canvasRef}
        platform={platform} />

      <Ball
        gameState={gameState}
        canvasRef={canvasRef}
        ball={ball}
        platform={platform}
        ballDirection={ballDirection} />

      <Bricks
        gameState={gameState}
        bricksLeft={bricksLeft}
        setBricksLeft={setBricksLeft}
        brickArr={brickArr}
        ball={ball}
        ballDirection={ballDirection}
        rows={rows}
        columns={columns}/>
        <button onClick={()=>setGameState(true)}></button>
    </>
  );
};

export default Canvas;
