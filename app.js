let boxes = document.querySelectorAll(".box")
let resetBTn = document.querySelector("#reset-btn")
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;   //playerX, playerY

// here we will store all wining pattrens in 2D array!

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const resetGame = () => {
    turnO = true;
    enableleBoxes();
    msgContainer.classList.add("hide")
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O"
            turnO = false;
        }else {
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}


const enableleBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText= ""
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide")
    disableBoxes();
} 




// if there is no winner so it should print that "Game is Draw! Play again"

const checkDraw = () => {
    let isDraw = true;
    for(let box of boxes){
        if(box.innerText === ""){
            isDraw = false;
            break;
        }
    }

    if(isDraw){
        msg.innerText = `It's a Draw! Play again!`
        msgContainer.classList.remove("hide")
        disableBoxes();
        
    }
}




const checkWinner = () => {
    let gameWon = false;

    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){

            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                gameWon = true;
                break;
            }
        }
    }
    if(!gameWon) {
        checkDraw();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBTn.addEventListener("click", resetGame)