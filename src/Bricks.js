import { useEffect, useState } from 'react';


const Bricks = ({
    gameState,
    bricksLeft,
    setBricksLeft,
    brickArr,
    ball,
    ballDirection,
    rows,
    columns }) => {

    useEffect(() => {
        const editBricks = () => {

            const deleteBrick = (arr, index) => {
                delete arr[index];
                setBricksLeft((p) => p - 1);
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
                        deleteBrick(arr, index);
                    }
                    //hitting right of a brick
                    else if (ball.x === this.x + this.w &&
                        ball.y + ball.r >= this.y &&
                        ball.y <= this.y + this.h) {
                        ballDirection('leftUp', 'rightUp', 'rightDown');
                        deleteBrick(arr, index);

                    }
                    //hitting top of a brick
                    else if (ball.y + ball.r === this.y &&
                        ball.x + ball.r >= this.x &&
                        ball.x <= this.x + this.w) {
                        ballDirection('rightDown', 'rightUp', 'leftUp');
                        deleteBrick(arr, index);
                    }
                    //hitting bottom of a brick
                    else if (ball.y === this.y + this.h &&
                        ball.x + ball.r >= this.x &&
                        ball.x <= this.x + this.w) {
                        ballDirection('rightUp', 'rightDown', 'leftDown');
                        deleteBrick(arr, index);
                    }
                }
            }

            const makeNewBricks = () => {
                let width = 15;
                let height = 5;
                let columnGap = width + 4;
                let rowGap = height + 4;
                // if (player.level == 2) rows = 8;
                // if (player.level == 3) rows = 10;

                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                        brickArr.push(new Brick(j * columnGap,
                            i * rowGap,
                            width,
                            height));
                    }
                }
            };
            makeNewBricks();
        }

        editBricks();
    }, [gameState])


    return false
};

export default Bricks;