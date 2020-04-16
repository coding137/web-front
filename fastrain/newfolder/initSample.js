let bg = document.querySelector('#bg');

let heroElem = document.querySelector('#hero');
let heroPosition = heroElem.offsetLeft+10;
let hero = new Hero(heroPosition, heroElem);

let isStart = true;

// 적 생성
let createEnemy = () => {
    console.log('enemy is created');

    let enemyElem = document.createElement('div');
    let enemy = new Enemy(enemyElem);
    enemy.moveBottom();
}

createEnemy();

let createEnemies = setInterval(function() {
    createEnemy();
}, 2000);

