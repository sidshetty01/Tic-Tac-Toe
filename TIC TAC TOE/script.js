let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnT = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnT = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};
const svgCircle= '<svg style="margin:5px;"> <circle cx="50" cy="50" r="40" fill="#7a876b" stroke="green" stroke-width="7" /></svg>'
const svgTriangle= '<svg style="margin:5px;"> <polygon points="50,10 90,90 10,90"   width="50px" height="50px" fill="#7a876b" stroke="red" stroke-width="7px" stroke-linejoin="round" /> </svg>'
boxes.forEach((box) => {//to change a player after ones turn
  box.addEventListener("click", () => {
    if (turnT) {//playerO
      box.innerHTML = svgTriangle;
      turnT = false;
    } else { //playerX
      box.innerHTML = svgCircle;
      turnT = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {//if the game is draw
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {//to stop the boxes after win
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {//to disable boxes after pressin new game
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {//to display winner
  
  msg.innerText = `Congratulation,you won`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {//to check the winner
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;//boxes[pattern[0]] representation of 2D array
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {

        showWinner();
        return true;
      }
    }
  }
};

 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
