import { useEffect } from 'react';

function Ball({ canvasRef, ball, platform, changeDirection }) {

    useEffect(() => {
        const canvas = canvasRef.current;

        const detectColision = () => {
            //hitting right
            if (ball.x + ball.r === canvas.width) changeDirection('rightUp', 'leftUp', 'leftDown');
            //hitting left
            if (ball.x === ball.r) changeDirection('leftUp', 'rightUp', 'rightDown');
            //hitting top
            if (ball.y === ball.r) changeDirection('rightUp', 'rightDown', 'leftDown');
            //hitting bottom
            if (ball.y + ball.r === canvas.height) changeDirection('rightDown', 'rightUp', 'leftUp');
            //hitting platform
            if (ball.y + ball.r >= canvas.height - platform.h &&
                ball.x >= platform.x &&
                ball.x + ball.r <= platform.x + platform.w) {
                changeDirection('rightDown', 'rightUp', 'leftUp');
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
        animate();

        return (() => {
            cancelAnimationFrame(animate);
        })

    }, [])

    return false;
}

export default Ball;