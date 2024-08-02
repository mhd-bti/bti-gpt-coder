import React, { useRef, useEffect } from 'react';

const BreakoutGame = () => {
  const canvasRef = useRef(null);
  let ctx;
  let ballRadius = 10;
  let x;
  let y;
  let dx = 2;
  let dy = -2;
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX;
  let rightPressed = false;
  let leftPressed = false;
  let brickRowCount = 3;
  let brickColumnCount = 5;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let score = 0;
  let interval;

  const bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);

    interval = setInterval(draw, 10);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  const keyDownHandler = (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    }
  };

  const keyUpHandler = (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = false;
    }
  };

  const mouseMoveHandler = (e) => {
    const relativeX = e.clientX - canvasRef.current.offsetLeft;
    if (relativeX > 0 && relativeX < canvasRef.current.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  };

  const collisionDetection = () => {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let b = bricks[c][r];
        if (b.status == 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            score++;
            if (score == brickRowCount * brickColumnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
              clearInterval(interval);
            }
          }
        }
      }
    }
  };

  const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#d63384';
    ctx.fill();
    ctx.closePath();
  };

  const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvasRef.current.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#d63384';
    ctx.fill();
    ctx.closePath();
  };

  const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = '#d63384';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  };

  const drawScore = () => {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#d63384';
    ctx.fillText('Score: ' + score, 8, 20);
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvasRef.current.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvasRef.current.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        alert('GAME OVER');
        document.location.reload();
        clearInterval(interval);
      }
    }

    if (rightPressed && paddleX < canvasRef.current.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
  };

  return <canvas ref={canvasRef} width="480" height="320" />;
};

export default BreakoutGame;
