import { useEffect } from 'react';

function Ball({
    gameState,
    canvasRef,
    ball,
    platform,
    ballDirection }) {

    useEffect(() => {
        const canvas = canvasRef.current;

        const detectColision = () => {
            //hitting right
            if (ball.x + ball.r === canvas.width) ballDirection('rightUp', 'leftUp', 'leftDown');
            //hitting left
            if (ball.x === ball.r) ballDirection('leftUp', 'rightUp', 'rightDown');
            //hitting top
            if (ball.y === ball.r) ballDirection('rightUp', 'rightDown', 'leftDown');
            //hitting bottom
            if (ball.y + ball.r === canvas.height) ballDirection('rightDown', 'rightUp', 'leftUp');
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

        const animate = () => {
            detectColision();
            moveBall();
            requestAnimationFrame(animate);
        }
        if (gameState) animate();

        return (() => {
            cancelAnimationFrame(animate);
        })

    }, [gameState])

    return false;
}

export default Ball;