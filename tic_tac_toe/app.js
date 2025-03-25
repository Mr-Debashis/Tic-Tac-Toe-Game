let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

const winPatterns = [ //Store our winning patterns
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const restGame = () => {
    turnO = true;//Reset game as we 1st open the game
    enaBox();//Enable all box and erase all previous data
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => { //Create loop for print O & X
    box.addEventListener("click", () =>{ //Use on click event
        if(turnO === true) {
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; //Disable buttons when all box fill values

        checkWinner(); //Call check winner function
    });
});

//Create a function that use when a winner found & other button is disable
const disBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

//Create a function when game over and start new game & enable all buttons
const enaBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

//Create function for winner msg
const showWinner = (winner) => {
    //Formate text and change the inner msg value
    msg.innerText = `Congratulations, Winner is Palyer ${winner}`;
    //Here we remove the hide msg to the show msg
    msgContainer.classList.remove("hide");
    disBox(); //Call disable box function
}

//Now we check the winner
const checkWinner = () => {
    for(let pattern of winPatterns) {
        //Here we check matching values using box index
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        //Create condition to check any box not empty
        if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
            //Create matching condition of entered values according winPatterns
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                showWinner(pos1Value);//Call show winner msg for winner
            }
        }

    }
}

//When we click Reset & New game button the ResetGame function will call,
//That change the game as 1st we open
newGameBtn.addEventListener("click", restGame);
resetBtn.addEventListener("click", restGame);