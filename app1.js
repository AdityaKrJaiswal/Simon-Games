let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highestScore = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;

    levelUp();
  }
});


// function btnFlash(bt){
    
//     setTimeout(function(bt){
//         bt.style.backgroundColor="white";
//     }, 800);
// }
// function btnFlash(bt) {
//     bt.style.backgroundColor = "white"; // or any other color for the flash effect

//     setTimeout(function () {
//         bt.style.backgroundColor = ""; // set it back to the original color
//     }, 300);
// }


function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
        if(level>highestScore){
            highestScore = level;
            updateHighestScore();
        }
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br> Press any key to start.`;
    
    
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
    
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  highestScore = Math.max(highestScore,level);
  updateHighestScore();
}


function updateHighestScore(){
//     let h3 = document.createElement("h3");
//     h3.innerText = `Your highest score is ${highestScore}`
//    h2.appendChild(h3);
document.querySelector('#highestScore').innerText = `Highest Score: ${highestScore}`
}