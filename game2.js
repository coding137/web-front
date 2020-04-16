//gameflag
var gameflagStates = { stop: "stop", start: "start" };
var curGameFlag = gameflagStates.start;
var interval;

var mingamespd = 40;
var maxgamespd = 10;
var curgamespd = mingamespd;
//fox values
var imgSrcX = [0, 42, 84, 126];
var foxX = 100;
var foxY = 200;
var initFoxY = 200;
var initFoxX = 100;

var foxWidth = 34;
var foxHeight = 40;
var foxFrame = 0;
var foxStates = { idle: "idle", run: "run", jump: "jump" };
var curFoxStates = foxStates.run;
var jAccel = 0;
var initj_Accel = 5;
//Event_listener
document.addEventListener("click", onClick, false);

// canvas values
var canvas = document.getElementById("mCanvas");
var ctx = canvas.getContext("2d");
var cnt = 0;
var scores = 0;

// obj values
var cloudColor = "#c0c8cf";
var cloudSrcX = 0;
var cloudSpd = 0.3;

var obsHalfwidth = 12.5;
var obstacleHalfHeight = 24;
var grndX = 150;
var grndY = 218;
var grndWidth = 25;
var grndSpd = 1.8;
var maxGrndSpd = 5;
var grounds = [
  { x: 0, y: 238 },
  { x: canvas.width, y: 238 },
  { x: canvas.width * 2, y: 238 }
];

var clouds = [
  { x: 30, y: 30, size: 5 },
  { x: 60, y: 80, size: 6 },
  { x: 120, y: 50, size: 8 },
  { x: 200, y: 20, size: 7 },
  { x: 270, y: 90, size: 7 },
  { x: 3300, y: 30, size: 5 },
  { x: 380, y: 50, size: 8 }
];

var obstacles = [
  { x: 380, y: 218, width: 5, number: 1 },
  { x: 380 + canvas.width, y: 218, width: 5, number: 2 },
  { x: 380 + canvas.width * 2 - 130, y: 218, width: 5, number: 2 }
];
function crushChecks() {
  obstacles.forEach(element => {
    if (
      // 왼쪽 모서리 부터 차례대로 시계방향
      (foxX + foxWidth >
        element.x - element.width + (element.number - 1) * element.width * 2 &&
        foxY + foxHeight > element.y - obstacleHalfHeight &&
        foxX + foxWidth < element.x + element.width) ||
      (foxX <= element.x + element.width &&
        foxY >= element.y - obstacleHalfHeight &&
        foxX >= element.x - element.width) ||
      (foxX + foxWidth > element.x - element.width &&
        foxX + foxWidth < element.x + element.width &&
        foxY < element.y + obstacleHalfHeight &&
        foxY > element.y - obstacleHalfHeight) ||
      (foxX < element.x + element.width &&
        foxX > element.x - element.width &&
        foxY < element.y + obstacleHalfHeight &&
        foxY > element.y - obstacleHalfHeight)
    ) {
      // console.log("crush!!!!!!");
      // console.log(element.y - obstacleHalfHeight);
      // console.log(foxY + foxHeight);
      curGameFlag = gameflagStates.stop;
    }
  });
}

function onClick(e) {
  // console.log(e);
  if (curFoxStates == foxStates.jump) return;
  else if (curFoxStates == foxStates.run) {
    curFoxStates = foxStates.jump;
    jAccel = initj_Accel;
    drawFox();
  }
}
function drawBlocks() {
  obstacles.forEach(elem => {
    for (var x = 0; x < elem.number; x++) {
      drawCactus(elem.x + grndWidth * x, elem.y);
    }

    if (elem.x < -100) {
      elem.x = canvas.width * 2;
    }
    elem.x -= grndSpd;
  });
}

function drawCactus(x, y) {
  ctx.beginPath();
  ctx.ellipse(x, grndY, 10, 20, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "#f0f8ff";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  //needles
  //left grndY 218
  ctx.moveTo(x - 5, y - 8);
  ctx.lineTo(x - 10, y - 15);

  ctx.moveTo(x - 5, y + 3);
  ctx.lineTo(x - 15, y - 5);

  ctx.moveTo(x - 5, y + 13);
  ctx.lineTo(x - 12, y + 8);

  ctx.moveTo(x - 3, y + 5);
  ctx.lineTo(x - 10, y + 7);

  //middle
  ctx.moveTo(x, y - 15);
  ctx.lineTo(x + 3, y - 24);
  //right
  ctx.moveTo(x + 5, y - 4);
  ctx.lineTo(x + 10, y - 15);

  ctx.moveTo(x + 5, y + 3);
  ctx.lineTo(x + 14, y - 8);

  ctx.moveTo(x + 5, y + 14);
  ctx.lineTo(x + 12, y + 9);

  ctx.strokeStyle = "#f0f8ff";
  ctx.stroke();
  ctx.closePath();
}

function drawScre() {
  ctx.font = "14px Sans";
  ctx.fillStyle = "#f0f8ff";
  ctx.fillText("Scores : " + scores, 400, 15);
}
function drawFox() {
  var img = new Image();

  img.onload = function() {
    ctx.drawImage(
      img,
      imgSrcX[foxFrame],
      0,
      foxWidth,
      foxHeight,
      foxX,
      foxY,
      foxWidth,
      foxHeight
    );
  };

  if (curFoxStates == "jump") {
    foxY -= jAccel;
    jAccel -= 0.1;

    if (foxY > initFoxY) {
      foxY = initFoxY;
      curFoxStates = foxStates.run;
    }
  }

  cnt++;
  if (cnt > 30) {
    cnt = 0;
    if (foxFrame >= 3) {
      foxFrame = 0;
    } else {
      foxFrame++;
      scores++;
      // if (curgamespd > maxgamespd) curgamespd--;
    }
    // console.log(curgamespd);
  }

  img.src = "img/fox.png";
}

function drawGrnd() {
  ctx.beginPath();

  grounds.forEach(element => {
    ctx.rect(element.x--, element.y, canvas.width, 2);
    ctx.fillStyle = "#f0f8ff";
    ctx.fill();
    if (element.x < -canvas.width) {
      element.x = canvas.width * 2;
    }
  });
  ctx.closePath();

  // ctx.rect(grndX--, 238, 2000, 2);
  // ctx.fillStyle = "#f0f8ff";
  // ctx.fill();
  // if (grndX < -2000) grndX = canvas.width;
}

function drawMtn() {}

function drawCloud(x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.glovalAlpha = 0.7;

  ctx.fillStyle = cloudColor;
  // ctx.alpha = 0.3;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();

  ctx.arc(x + size, y + size, size, 0, Math.PI * 2);
  ctx.fillStyle = cloudColor;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(x + size * 2, y + size, size, 0, Math.PI * 2);
  ctx.fillStyle = cloudColor;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();

  ctx.arc(x + size * 3, y + size, size, 0, Math.PI * 2);
  ctx.fillStyle = cloudColor;
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();

  ctx.arc(x + size, y - size, size, 0, Math.PI * 2);
  ctx.arc(x + size * 2, y - size, size, 0, Math.PI * 2);
  ctx.arc(x + size * 3, y - size, size, 0, Math.PI * 2);
  ctx.fillStyle = cloudColor;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(x + size / 2, y - size / 2, size * 3, size);
  ctx.fillStyle = cloudColor;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();

  ctx.arc(x + size * 4, y, size, 0, Math.PI * 2);

  ctx.fillStyle = cloudColor;
  ctx.fill();
  ctx.closePath();
}
function drawClouds() {
  clouds.forEach(element => {
    element.x -= cloudSpd;
    if (element.x < -50) element.x = canvas.width + 50;
    drawCloud(element.x, element.y, element.size);
  });
}
function gameLevels() {
  if (scores > 10 && scores < 20) {
    grndSpd = 2;
  } else if (scores > 20 && scores < 30) {
    grndSpd = 2.5;
  } else if (scores > 30 && scores < 40) {
    grndSpd = 2.7;
  } else if (scores > 50 && scores < 60) {
    grndSpd = 3.0;
  } else if (scores > 100 && scores < 101) {
    grndSpd = 3.3;
  } else if (scores > 150 && scores < 154) {
    grndSpd = 3.9;
  } else if (scores > 200 && scores < 210) {
    grndSpd = 4.4;
  } else if (scores > 250 && scores < 260) {
    grndSpd = 4.9;
  } else if (scores > 300) {
    grndSpd = 6.0;
  } else if (scores == 1000) {
    alert("thanks for playing this game ! see u dude");
  }
}
function draw() {
  if (curGameFlag == gameflagStates.stop) {
    alert("game over!");
    document.location.reload();
    clearInterval(interval);
    return;
  }
  // console.log(curFoxStates);
  drawFox();
  crushChecks();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScre();
  drawGrnd();
  drawClouds();
  drawBlocks();
  cloudSrcX -= 0.08 * (grndSpd / 50);
  drawFox();
  gameLevels();
  console.log(grndSpd);
}

interval = setInterval(draw, 20);
