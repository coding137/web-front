var canvas = document.getElementById("mCanvas");
var ctx = canvas.getContext("2d");
var dx = 1;
var dy = -1;
var lives = 3;

var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadi = 5;
var pdleHeight = 10;
var pdleWidth = 80;
var pdlX = (canvas.width - pdleWidth) / 2;
var keyCodeRight = 39;
var keyCodeLeft = 37;
// <canvas id="mCanvas" width="480" height="320">
var bOffsetX = 48;
var bOffsetY = 36;
var blockWidth = 48;
var blockHeight = 12;
var blockCol = 8;
var blockRow = 3;
var gameFlag = true;
var blocks = {};
var scores = 0;
//f0f8ff
for (var c = 0; c < blockCol; c++) {
  blocks[c] = {};
  for (var r = 0; r < blockRow; r++) {
    blocks[c][r] = {
      x: bOffsetX + blockWidth * c,
      y: bOffsetY + blockHeight * r,
      visual: true
    };
  }
}
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandle, false);

document.addEventListener("keyup", keyUpHandle, false);

function keyDownHandle(e) {
  // console.log(e);
  if (e.keyCode == keyCodeLeft) {
    leftPressed = true;
  }
  if (e.keyCode == keyCodeRight) {
    rightPressed = true;
  }
}
function keyUpHandle(e) {
  // console.log(e);
  if (e.keyCode == keyCodeLeft) {
    leftPressed = false;
  }
  if (e.keyCode == keyCodeRight) {
    rightPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadi, 0, Math.PI * 2);
  ctx.fillStyle = "#f0f8ff";
  ctx.fill();
  ctx.closePath();
}

function drawBlocks() {
  for (var c = 0; c < blockCol; c++) {
    for (var r = 0; r < blockRow; r++) {
      if (blocks[c][r].visual == true) {
        // console.log("got in");
        // console.log(blocks[c][r].x + " ," + blocks[c][r].y);
        ctx.beginPath();
        ctx.rect(blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
        ctx.strokeStyle = "#f0f8ff";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}
function drawPdle() {
  ctx.beginPath();
  ctx.rect(pdlX, canvas.height - pdleHeight, pdleWidth, pdleHeight);
  ctx.strokeStyle = "#f0f8ff";
  ctx.stroke();
  ctx.closePath();
}
function checkCrush() {
  if (y + dy < 0 + ballRadi) {
    dy = -dy;
  }
  if (x + dx < 0 + ballRadi || x + dx > canvas.width - ballRadi) {
    dx = -dx;
  }
  if (
    x + dx > pdlX &&
    x + dx < pdlX + pdleWidth &&
    canvas.height - pdleHeight - ballRadi < y + dy
  ) {
    dy = -dy;
  }
  // scores = 0;

  for (var c = 0; c < blockCol; c++) {
    for (var r = 0; r < blockRow; r++) {
      if (
        blocks[c][r].visual == true &&
        x + dx < blocks[c][r].x + blockWidth &&
        x + dx > blocks[c][r].x &&
        y + dy > blocks[c][r].y &&
        y + dy < blocks[c][r].y + blockHeight
      ) {
        blocks[c][r].visual = false;
        dy = -dy;
        scores++;
      } else if (blocks[c][r].visual == false) {
        // scores++;
      }

      // blocks[c][r]={x:(bOffsetX+blockWidth*c),y:bOffsetY+blockHeight*r,visual:true};
    }
  }

  x += dx;
  y += dy;

  if (y >= canvas.height - ballRadi || scores == blockCol * blockRow) {
    gameFlag = false;
  }
  // y>=canvas.height-ballRadi ||
}

function drawScre() {
  ctx.beginPath();
  ctx.font = "14px Sans";
  ctx.fillStyle = "#f0f8ff";
  ctx.fillText("Scores : " + scores, 400, 10);
  ctx.closePath();
}
function drawLives() {
  var livestring = "";
  for (var i = 0; i < lives; i++) {
    livestring += "* ";
  }
  ctx.beginPath();
  ctx.font = "10px Sans";
  ctx.fillStyle = "#f0f8ff";
  ctx.fillText("Lives : " + livestring, 10, 10);
  ctx.closePath();
}

function draw() {
  if (gameFlag == false) {
    alert("Game over");
    document.location.reload();
    clearInterval(interval);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPdle();
    drawBall();

    if (rightPressed && pdlX < canvas.width - pdleWidth) {
      pdlX += 5;
    } else if (leftPressed && pdlX > 0) {
      pdlX -= 5;
    }
    checkCrush();
    drawBlocks();
    drawScre();
    drawLives();
  }
}
// drawBlocks();
var interval = setInterval(draw, 5);

/*

document.addEventListener("mousemove", mouseMoveHandler, false);


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

*/
