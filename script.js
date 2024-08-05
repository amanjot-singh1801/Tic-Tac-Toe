const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currPlayer;
let gameGrid;

const winningPositions = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6],
]


// let's create a function to initialize the game
function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI te v empty karna padega boxes ko 
    boxes.forEach((box,index)=>{
        box.innerText = "";
        // box.classList = `box box${index+1}`;
        box.classList.remove("win");
        boxes[index].style.pointerEvents = "all";
    })
    newGameBtn.classList.remove('active');
    // gameInfo.value = `Current Player - ${currPlayer}`;
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

function swapTurn(){
    if(currPlayer === "X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X";
    }

    // update in UI
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position)=>{
        if(gameGrid[position[0]] !== "" && gameGrid[position[1]]!== "" && gameGrid[position[2]]!== "" 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            if(gameGrid[position[0]] == "X")
                answer = "X";
            else
                answer = "O";
        
                
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
        }
    })


    if(answer != ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }


    // match tie ho gya 
    let fullCount = 0;
    gameGrid.forEach((grid)=>{
        if(grid != "")
            fullCount++;
    });

    if(fullCount == 9){
        gameInfo.innerText = `Match Tie`;
        newGameBtn.classList.add('active');
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText= currPlayer;
        gameGrid[index] = currPlayer;
        // uss box uppr cursor pointer na bane
        boxes[index].style.pointerEvents = "none";
        // swap kro Turn ko
        swapTurn();
        // check koi jeet to nhi gya
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener(('click'),()=>{
        handleClick(index);
    });
})


// newGameBtn.addEventListener(('click'),()=>{
//     initGame;
// })

// both are same but syntax are different 
newGameBtn.addEventListener(('click'),initGame);