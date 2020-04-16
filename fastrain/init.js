var leftPressed = false;
var rightPressed = false;
var keyCodeRight = 39;
var keyCodeLeft = 37;
var keyCodeUp =38;
var keyCodeDown= 40;
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var heroClass;
let enemyClass;
var maxEnemyNumber = 45;
var curEnemyNumber = 0;
var maxSpd =6;
var cnt =0;
let heroTag=document.querySelector("#hero");
let ghosts=[];
let gameboard_width=800;
let gameboard_height=600;
let srcWidth = 45;
let srcHeight = 54;
let gameflag= true;
let resetKeycode=82;

document.addEventListener("keydown", keyDownHandle, false);
document.addEventListener("keyup", keyUpHandle, false);

function keyDownHandle(e) {
    console.log(e);
    if (e.keyCode == keyCodeLeft) {
      leftPressed = true;
    }
    else if (e.keyCode == keyCodeRight) {
      rightPressed = true;
    }
    else if(e.keyCode == keyCodeUp){
      upPressed = true;
    }else if(e.keyCode == keyCodeDown){
      downPressed =true;
    } 
    if(gameflag==false && e.keyCode==resetKeycode){
      document.location.reload();
      clearInterval(interval);
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
    if(e.keyCode == keyCodeUp){
      upPressed = false;
    }if(e.keyCode ==keyCodeDown){
      downPressed =false;
    }
  }
  

function createGhosts(){
  if(curEnemyNumber>=maxEnemyNumber)
      return;
      {
  ghosts[curEnemyNumber].activeGhost("ghost-alive");
  console.log(ghosts[curEnemyNumber]);
  curEnemyNumber++;
      }
}


function init(){
    heroClass=new Hero(350,300);
    heroTag.style.top=gameboard_height-100+"px";
    heroTag.style.left="350px";
    initEnemy();
} 

function initEnemy(){ 
  var ghostTags;
  for(var i = 0 ; i<maxEnemyNumber;i++){
    ghostTags= document.createElement("div");
    ghostTags.className="ghost";
    ghostTags.id="ghost-start";
    document.querySelector("#bg").appendChild(ghostTags);
    enemyClass = new Enemy(maxSpd, 0,0, ghostTags,gameboard_width,gameboard_height,srcWidth,srcHeight,heroClass);
    ghosts[i]=(enemyClass);  

}

}
function draw(){
   heroTag.style.left=heroClass.getX()+"px";
   heroTag.style.top = heroClass.getY()+"px";
   heroTag.className=heroClass.getState();
}
function updateHero(){
  if(heroClass.state=="hero-die")
    return;
  if(rightPressed){
    heroClass.setState("hero-right");    
    heroClass.moveRight();
  }else if(leftPressed){
    heroClass.moveLeft();
    heroClass.setState("hero-left");    
  }else if(upPressed){
    heroClass.moveUp();
    heroClass.setState("hero-up");    
  }else if(downPressed){
    heroClass.moveDown();
    heroClass.setState("hero-front");    
  }
  
  if(!leftPressed&&!rightPressed&&!downPressed&&!upPressed){
    heroClass.setState("hero-front");
  } 
  document.querySelector("#hero").classList.add(heroClass.getState());
  
  // console.log(heroClass.getState())

}

function updateGhost(){
    for(var i = 0 ; i<maxEnemyNumber;i++){
      ghosts[i].fsm();
    }
}
function heroDie(){
    document.querySelector("#hero").classList.add("hero-die");
    document.querySelector("#hero").classList.remove("hero-front");
    document.querySelector("#hero").classList.remove("hero");
    document.querySelector("#hero").classList.remove("hero-left");
    document.querySelector("#hero").classList.remove("hero-right");
    document.querySelector("#hero").classList.remove("hero-up");

}
function crushCheck(){
  var heroX = heroClass.getX();
  var heroY = heroClass.getY();
  for(var i = 0 ; i<maxEnemyNumber;i++){
    var ghostX = ghosts[i].getX();
    var ghostY = ghosts[i].getY();
    var distance = Math.sqrt( Math.pow(ghostX-heroX,2 )+ Math.pow(heroY-ghostY,2));
    // distance = Math.floor(distance);
    // console.log("heroX:"+heroX + " heroY:"+heroY+ " ghostX:"+ghostX+" ghostY:"+ghostY);
    // console.log(distance);
    if(distance<30){
      heroClass.setState("hero-die");
      heroTag.style.id="hero-die";
      gameflag=false;
      alert("Game End If you want to game more press R");
    }
  }
  }
function gameboard(){
  if(gameflag==true){   
  updateHero();
  updateGhost();
  draw();
  cnt++

  if(cnt>100&&curEnemyNumber<maxEnemyNumber){
    createGhosts();
    cnt=0;
  }
      crushCheck(); 
  } 
  else{
    heroDie();
  }


}


init();
var interval = setInterval(gameboard, 30);

