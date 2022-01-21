import './App.css';
import { useRef, useEffect, useState } from 'react';
import Draw from './Draw';
import Control from './Control';
import Ball from './Ball';
import Bricks from './Bricks';


const App = () => {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    const columns = 16;
    const [rows, setRows] = useState(4);

    const [gameState, setGameState] = useState(false);
    const [level, setLevel] = useState(1);
    const [bricksLeft, setBricksLeft] = useState(rows * columns);

    const nextLevel = () => {
        setGameState(() => false);
        setRows(() => (level + 1) * 4);
        setLevel(prevLevel => prevLevel + 1)
    }


    useEffect(() => {
        if (bricksLeft === 63 || bricksLeft === 127 || bricksLeft === 191) {
            if (gameState) nextLevel();
        }
    }, [bricksLeft]);

    useEffect(() => {
        //if(level === 4) setLevel(3);
    }, [level])

    useEffect(() => {
        setBricksLeft(() => rows * columns)
    }, [rows])

    // if (player.level == 2) rows = 8;
    // if (player.level == 3) rows = 10;

    const player = {
        lives: 3,
        bricksLeft: rows * columns
    };



    const platform = {
        x: 120,
        y: 0,
        w: 60,
        h: 3,
        speed: 8
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

    const panelStyle = level < 4 ? { display: "flex" } : { display: "none" };
    const menuStyle = gameState === false ? { display: "flex" } : { display: "none" };

    return (<div className='App'>

        <div
            className='menu'
            style={menuStyle} >
            <div className='level'> LEVEL {level} </div>
            <button className='start' onClick={() => setGameState(true)}> START </button>
        </div >

        <div className='panel' >
            <div > Lives </div> <div > Level: {level}/3</div >
            <div > Left: {bricksLeft}/{rows * columns}</div >
        </div>

        <canvas className='canvas'
            ref={canvasRef}
        />

        <Draw requestRef={requestRef}
            gameState={gameState}
            canvasRef={canvasRef}
            platform={platform}
            ball={ball}
            brickArr={brickArr}
        />

        <Control requestRef={requestRef}
            gameState={gameState}
            canvasRef={canvasRef}
            platform={platform}
        />

        <Ball requestRef={requestRef}
            gameState={gameState}
            canvasRef={canvasRef}
            ball={ball}
            platform={platform}
            ballDirection={ballDirection}
        />

        <Bricks requestRef={requestRef}
            gameState={gameState}
            bricksLeft={bricksLeft}
            setBricksLeft={setBricksLeft}
            brickArr={brickArr}
            ball={ball}
            ballDirection={ballDirection}
            rows={rows}
            columns={columns}
        /> </div >)
};

export default App;