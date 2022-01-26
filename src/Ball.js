import { useEffect } from 'react';

function Ball({
    gameState,
    requestRef,
    canvasRef,
    ball,
    platform,
    changeBallDirection,
    setLives }) {

    const canvas = canvasRef.current;

    const detectColision = () => {
        //hitting right
        if (ball.x + ball.r >= canvas.width) changeBallDirection('rightUp', 'leftUp', 'leftDown');
        //hitting left
        else if (ball.x <= ball.r) changeBallDirection('leftUp', 'rightUp', 'rightDown');
        //hitting top
        else if (ball.y <= ball.r) changeBallDirection('rightUp', 'rightDown', 'leftDown');
        //hitting bottom
        else if (ball.y + ball.r >= canvas.height) {
            changeBallDirection('rightDown', 'rightUp', 'leftUp');
            setLives(lives => lives - 1);
        }
        //hitting platform
        if (ball.y + ball.r >= canvas.height - platform.h &&
            ball.x + ball.r  >= platform.x &&
            ball.x <= platform.x + platform.w) {
            changeBallDirection('rightDown', 'rightUp', 'leftUp');
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