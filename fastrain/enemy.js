// 800*600

class Enemy {
    constructor(maxSpd,startY,startX,elem,gameboard_width,gameboard_height,srcWidth,srcHeight,heroObj)
    {
        this.direction =  ["down", "left","right"];
        this.currentDirection=this.direction[0];
        this.heroObj = heroObj;
        this.elem=elem;
        this.y =startY;
        this.x = startX;
        this.maxSpd = maxSpd;
        this.state = ["ghost-alive","ghost-die","ghost-hidden","ghost-start"];
        this.currentState = "ghost-start";
        this.direction;
        this.gameboard_width = gameboard_width;
        this.gameboard_height = gameboard_height;
        this.srcWidth =srcWidth;
        this.srcHeight = srcHeight;
        this.spd=0;
      
        
        // setInterval(this.drawEnemy(),30);
    }


    getY(){
        return this.y;
    }
    getX(){
        return this.x;
    }
    getXY(){
        return [ this.x,this.y];
    }
    activeGhost(state){
        var randNum =Math.floor(Math.random()*(700))+40;
        this.spd = Math.floor(Math.random()*(maxSpd-1))+1;
        this.state = state;
        this.x = randNum;
        this.elem.style.left=this.x+"px";
        this.elem.id="ghost-alive";
        this.currentState = "ghost-alive";
    }

    // decActiveGhost(state){
    //     var randNum =Math.floor(Math.random()*(700))+40;
    //     this.state=state;
    //     this.y =randNum;
    //     this.elem.style.left=this.y+"px";
    //     this.elem.id="ghost-alive";
    // }
    // cleanDead(i){
    //             ghostTags[i].id="ghost-clear";
    //             this.ghostarr[i]["state"]="ghost-clear";

    //             this.ghostarr[i]["x"]=0;
    //             this.ghostarr[i]["y"]=0;
   
    //             ghostTags[i].style.left = 0+"px";
    //             ghostTags[i].style.top = 0+"px";

    //             this.ghostarr[i]["state"]="ghost-clear";
    //             ghostTags[i].id="ghost-clear";
    //             this.ghostarr[i]["x"]=0;
    //             this.ghostarr[i]["y"]=0;
   
    //             ghostTags[i].style.left = 0+"px";
    //             ghostTags[i].style.top = 0+"px";
    // }

    fsm(){
       
        if(this.currentState=="ghost-alive"){
            // console.log("????");
            this.move();
            // console.log(this.heroObj.getX(),this.heroObj.getY());
            if(this.y>gameboard_height-srcHeight ||this.x<srcWidth||this.x>gameboard_width-srcWidth){
                this.currentState="ghost-die";
            }
        }else if(this.currentState=="ghost-die"){           
                this.elem.id="ghost-die";
            
            setTimeout(()=>{
                this.cleanBody();
            },1000);
        }else if(this.currentState=="ghost-hidden"){
            this.rebirthBody();

        }
    }

    crushCheck(){
    var distance = Math.sqrt( Math.pow((this.x-this.heroObj.x))- Math.pow(this.y-this.heroObj.y));
        // if()
        console.log("crushCheck")
        console.log(distance);

    }
    rebirthBody(){
        this.currentState="ghost-alive";
        // console.log(Math.floor(Math.random()*(this.direction.length)));
        // console.log(Math.floor(Math.random()*(this.gameboard_height-this.srcHeight)+this.srcHeight) )
        
        this.currentDirection = this.direction[Math.floor(Math.random()*(this.direction.length))];
        if(this.currentDirection==this.direction[0]){
        this.y=10;
        this.x=Math.floor(Math.random()*((this.gameboard_width-this.srcWidth)-this.srcWidth))+this.srcWidth;
        this.elem.style.top=this.y+"px";
        this.elem.style.left=this.x+"px";
        this.spd=Math.floor(Math.random()*(maxSpd-1))+1;
        }
        else if(this.currentDirection ==this.direction[1]){
           this.x= this.srcWidth+10;
           this.y = Math.floor(Math.random()*(this.gameboard_height-this.srcHeight)+this.srcHeight) 
           this.elem.style.top=this.y+"px";
           this.elem.style.left=this.x+"px";
           this.spd=Math.floor(Math.random()*(maxSpd-1))+1;


        }else if(this.currentDirection == this.direction[2]){
            this.x= this.gameboard_width- this.srcWidth;
            this.y = Math.floor(Math.random()*(this.gameboard_height-this.srcHeight)+this.srcHeight) 
            this.elem.style.top=this.y+"px";
            this.elem.style.left=this.x+"px";
            this.spd=Math.floor(Math.random()*(maxSpd-1))+1;
 
        }
    }
    move(){
        this.elem.id="ghost-alive";

        if(this.currentDirection==this.direction[0]){
            this.y+=this.spd;
            this.elem.style.top=this.y+"px";
            // this.crushCheck();
        }else if(this. currentDirection == this.direction[1]){
            //this.direction =  ["down", "left","right"];
            this.x+=this.spd;
            this.elem.style.left= this.x+"px";
        }else if(this.currentDirection==this.direction[2]){
            this.x-=this.spd;
            this.elem.style.left= this.x+"px";
        }
            
    
    }

    cleanBody(){
        this.currentState="ghost-hidden";
        this.elem.id="ghost-hidden";
    }
 

}


