
// ## 구현 가이드


// 1. 바탕화면 깔기
// 2. 히어로를 가운데서시작하도록
// 3. 키이벤트 -> 좌우 누를때 히어로 움직이게
// 4. 바탕화면 끝 도달하면 더이상 움직이지 않도록
// =====================
// 1. 귀신 하늘에서 시작하도록
// 2. 랜덤한 x의 위치에서 나와야죠
// 3. setinterval로 귀신 시작한 위치에서 y를 아래로 내려주시면 됩니다

class Hero {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.state={"hero-right":"hero-right", "hero-left":"hero-left", "hero-front":"hero-front", "hero-behind":"hero-behind","hero-up":"hero-up","hero-die":"hero-die"};
        this.currentState = "hero-front";
    }

    moveLeft(){
        this.x-=2;
    }

    moveRight(){
        this.x+=2;
    }
    moveUp(){
        this.y-=2;
    }
    moveDown(){
        this.y+=2;
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    setY(y){
         this.y=y;
    }
    setX(x){
         this.x=x;
    }
    
    setState(string){
        this.currentState=this.state[string];
    }
    
    getState(){
        return this.currentState;
    }

}