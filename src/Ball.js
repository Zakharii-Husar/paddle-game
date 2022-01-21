import { useEffect, useRef } from 'react';

function Ball({
    gameState,
    canvasRef,
    ball,
    platform,
    ballDirection,
    setLives }) {

    const requestRef = useRef();

    const canvas = canvasRef.current;

    const detectColision = () => {
        //hitting right
        if (ball.x + ball.r >= canvas.width) ballDirection('rightUp', 'leftUp', 'leftDown');
        //hitting left
        else if (ball.x <= ball.r) ballDirection('leftUp', 'rightUp', 'rightDown');
        //hitting top
        else if (ball.y <= ball.r) ballDirection('rightUp', 'rightDown', 'leftDown');
        //hitting bottom
        else if (ball.y + ball.r >= canvas.height) {
            ballDirection('rightDown', 'rightUp', 'leftUp');
            setLives(lives => lives - 1);
        }
        //hitting platform
        if (ball.y + ball.r >= canvas.height - platform.h &&
            ball.x >= platform.x &&
            ball.x + ball.r <= platform.x + platform.w) {
            ballDirection('rightDown', 'rightUp', 'leftUp');
        }

    };

    const moveBall = () => {

        if (ball.direction === 'rightUp') {
            ball.y -= ball.speed
            ball.x += ball.speed
        };
        if (ball.direction === 'rightDown') {
            ball.y += ball.speed
            ball.x += ball.speed
        };
        if (ball.direction === 'leftUp') {
            ball.y -= ball.speed
            ball.x -= ball.speed
        };
        if (ball.direction === 'leftDown') {
            ball.y += ball.speed
            ball.x -= ball.speed
        };
    }

    let animate = () => {
        detectColision();
        moveBall();
        requestRef.current = requestAnimationFrame(animate);
    }


    useEffect(() => {
        if (gameState) animate();
        return (() => {
            cancelAnimationFrame(requestRef.current);
        })

    }, [gameState])

    return false;
}

export default Ball;