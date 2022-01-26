import './App.css';
import { useRef, useEffect, useState } from 'react';
import Draw from './Draw';
import Control from './Control';
import Ball from './Ball';
import Bricks from './Bricks';
import heart from './heart.png'
import background from './background.jpg'



const App = () => {

    const platform = {
        x: 120,
        y: 0,
        w: 40,
        h: 5,
        speed: 6,
        direction: null
    };


    const ball = {
        x: 150,
        y: 150 - platform.h - 3,
        r: 3,
        speed: 1,
        direction: 'rightUp'
    };

    const containerRef = useRef();
    const canvasRef = useRef(null);
    const requestRef = useRef();

    const columns = 16;
    const [rows, setRows] = useState(4);

    const [gameState, setGameState] = useState(false);
    const [won, setWon] = useState(false);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    const [bricksLeft, setBricksLeft] = useState(rows * columns);

    const fullScreen = () => {
        containerRef.current.requestFullscreen();
        window.screen.orientation.lock('landscape-primary');
    }

    const startGame = () => {
        fullScreen();
        setLives(3);
        setGameState(true);
        setWon(false);
    };

    const nextLevel = () => {
        setGameState(() => false);
        setRows(() => (level + 1) * 4);
        setLevel(prevLevel => prevLevel + 1);
        platform.speed += 1;
    };

    const gameOver = () => {
        setGameState(() => false);
        setLevel(1);
        setRows(4);
        setBricksLeft(rows * columns)
    };

    useEffect(() => {
        if (level === 5) {
            gameOver();
            setWon(true);
        }
    }, [level])

    useEffect(() => {
        if (!bricksLeft && !won) {
            nextLevel();
        };
    }, [bricksLeft]);

    useEffect(() => {
        setBricksLeft(() => rows * columns)
    }, [rows])

    useEffect(() => {
        if (!lives) gameOver();
    }, [lives])


    const ballDirection = (direction1, direction2, direction3) => {
        if (ball.direction === direction1) ball.direction = direction2
        else ball.direction = direction3
    };

    const brickArr = [];

    const menuStyle = gameState === false ? { display: "flex" } : { display: "none" };
    let notification = 'LEVEL ' + level;
    let startBtnText = 'START ';

    if (!lives) {
        notification = 'GAME OVER';
        startBtnText = 'TRY AGAIN';
    }
    if (won) {
        notification = 'YOU HAVE WON!';
        startBtnText = 'PLAY AGAIN';

    }

    return (<div
        ref={containerRef}
        className='App'>

        <img src={background}
            style={gameState ? { display: 'none' } : { display: 'flex' }}
            className='background' />

        <div
            className='menu'
            style={menuStyle} >
            <div className='level'>{notification}</div>
            <button className='start' onClick={startGame} onTouchStart={startGame} onTouchEnd={startGame}> {startBtnText} </button>
        </div >

        <div className='panel' >
            <div className='hearts'>
                <img
                    alt='I'
                    style={lives > 0 ? { display: 'inline' } : { display: 'none' }} src={heart} />
                <img
                    alt='I'
                    style={lives > 1 ? { display: 'inline' } : { display: 'none' }} src={heart} />
                <img
                    alt='I'
                    style={lives > 2 ? { display: 'inline' } : { display: 'none' }} src={heart} />
            </div>

            <div>Level {level}/4</div>
            <div>Left {bricksLeft}/{rows * columns}</div>
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

        <Control
            requestRef={requestRef}
            gameState={gameState}
            canvasRef={canvasRef}
            platform={platform}
            fullScreen={fullScreen}
        />

        <Ball requestRef={requestRef}
            gameState={gameState}
            canvasRef={canvasRef}
            ball={ball}
            platform={platform}
            ballDirection={ballDirection}
            setLives={setLives}
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
        />
    </div >)
};

export default App;