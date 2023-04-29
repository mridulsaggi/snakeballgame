console.log("shuru krte hai")
let inputdirection={x:0,y:0};
const movesound=new Audio("./move.mp3");
const gameplaysound=new Audio("./calm.mp3");
const oversound=new Audio("./gameover.mp3");
// const hehe=new Audio("./gameover.mp3")
const foodsound=new Audio("./food.mp3");
// let board=document.getElementById("board")
let speed=5;
let score=0;
let lastpaintindex=0;
let snakeArr=[
    { x:13,y:15},
]
let food={x:5,y:8};
// functions
function mainfn(ctime) {
    window.requestAnimationFrame(mainfn);
    
    if(((ctime-lastpaintindex)/1000)<1/speed){
        return;
    }
    else{
        // console.log(ctime);
        lastpaintindex=ctime;
        gameengine();
    }
}
function iscollide(snakeArr){
    for(let i=1;i<snakeArr.length;i++){
        if((snakeArr[0].x===snakeArr[i].x)&&(snakeArr[0].y===snakeArr[i].y)){
            return true;
        }
    }
    if(snakeArr[0].x >=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0){
        return true;
    }
    else{
        return false;
    }
}
function gameengine(params) {
    // updating snake and food
    if(iscollide(snakeArr)){
        oversound.play();
        gameplaysound.pause();
        alert("game finished!! awww");
        snakeArr=[
            { x:9,y:9},
        ]
        score=0;
        // oversound.pause();
        gameplaysound.play();

    }

    // when we have eaten the food:
    if((snakeArr[0].x===food.x)&&(snakeArr[0].y===food.y)){
        foodsound.play();
        score+=1;
        snakeArr.unshift({x:snakeArr[0].x+inputdirection.x , y:snakeArr[0].y+inputdirection.y});
        let a = 2;
        let b = 16;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            highscorebox.innerHTML="HIGHSCORE :"+highscoreval
        }

        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // move the snake:

    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputdirection.x;
    snakeArr[0].y += inputdirection.y;


    // display the snake and the food

    // gameplaysound.play();

    board.innerHTML="" //clearing the html to avoid creation of multiple snakes and multiple foods
    snakeArr.forEach((e,index)=>{
        let snakeelem=document.createElement("div");
        scorebox.innerHTML="SCORE :"+score
        snakeelem.style.gridRowStart=e.y;
        snakeelem.style.gridColumnStart=e.x;
        gameplaysound.play();
        if(index===0){
            snakeelem.classList.add("heads")
        }
        else{
            snakeelem.classList.add("bodys");
        }
        
        board.appendChild(snakeelem);
    })
    // displaying food 
        let foodelem=document.createElement("div");
        foodelem.style.gridRowStart=food.y;
        foodelem.style.gridColumnStart=food.x;
        foodelem.classList.add("food");
        board.appendChild(foodelem);
    
}


// logicsss
let highscore=localStorage.getItem("highscore");
if(highscore==null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore)
    highscorebox.innerHTML="HIGHSCORE :"+highscoreval
}
window.requestAnimationFrame(mainfn);
gameplaysound.play();
window.addEventListener("keydown",e=>{
    inputdirection={x:0,y:1} //starting the game
    movesound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdirection.x=0;
            inputdirection.y=-1;

            break;
        case "ArrowDown":
            console.log("arrordown");
            inputdirection.x=0;
            inputdirection.y=1;

            break;
        case "ArrowRight":
            console.log("arrowright");
            inputdirection.x=1;
            inputdirection.y=0;

            break;
        case "ArrowLeft":
            console.log("arrowleft");
            inputdirection.x=-1;
            inputdirection.y=0;

            break;
    
        default:
            break;
    }
})