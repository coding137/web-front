class Enemy {
    constructor(enemy) {
        console.log('enemy created: ', hero);
        this.enemy = enemy;
        this.top = 0;
        enemy.classList.add('enemy');

        let randomNum = Math.floor(Math.random() * 800) + 1;
        enemy.style.left = randomNum+'px';
        enemy.classList.add('enemy-live');

        // element 생성
        bg.appendChild(enemy);

        this.enemyCount = document.getElementsByClassName('enemy').length-1;
        this.thisEnemy = document.getElementsByClassName('enemy')[this.enemyCount];
    
        console.log('this.enemyCount: ', this.enemyCount);
        console.log('this.thisEnemy: ', this.thisEnemy);
        console.log('this.enemy: ', this.enemy);
    }

    // 아래로 이동
    moveBottom = () => {
        let count = 0;
        
        let falling = setInterval(() => {
            count += 1;
            console.log('count: ', count);
            console.log('this.enemy: ', this.enemy);

            this.thisEnemy.style.top = count+'px';

            // 바닥에 떨어졌을 경우
            if (count == 546) {
                console.log('is 546')
                this.enemy.classList.remove('enemy-live');
                this.enemy.classList.add('enemy-die');
                clearInterval(falling);

                // 죽은 지 3초 후 사라짐
                setTimeout(function() {
                    this.enemy.classList.remove('enemy-die');
                    this.enemy.classList.add('enemy-clear');
                 }, 3000);
            }
        }, 2);
    }

}