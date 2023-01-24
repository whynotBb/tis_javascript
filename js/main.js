const comItems = document.querySelectorAll("#com ul li");
const playerItems = document.querySelectorAll("#player ul li");
const result = document.querySelector("#result ul");
const cover = document.querySelector("#cover");
const coverTxt = document.querySelector("#cover h1 strong");
const restartBtn = document.querySelector("#btnRestart");
let count = 0;
let userScore = 0;
let comScore = 0;

// 컴퓨터의 가위바위보 반복
let random = parseInt(Math.random() * 3);
function showComputerItem() {
  random = parseInt(Math.random() * 3);

  comItems.forEach(function (item) {
    item.style.display = "none";
  });
  comItems[random].style.display = "block";
  return random;
}

let idx = setInterval(showComputerItem, 100);

playerItems.forEach(function (item, i) {
  item.addEventListener("click", function () {
    // clearInterval(idx);
    count++;
    let resultItem = document.createElement("li");

    if (random === i) {
      console.log("draw");
      resultItem.className = "draw";
      resultItem.innerHTML = "D";
      result.append(resultItem);
    } else if (
      (random === 0 && i === 1) ||
      (random === 1 && i === 2) ||
      (random === 2 && i === 0)
    ) {
      console.log("win");
      resultItem.className = "win";
      resultItem.innerHTML = "W";
      result.append(resultItem);
      userScore += 1;
    } else {
      console.log("lose");
      resultItem.className = "lose";
      resultItem.innerHTML = "L";
      result.append(resultItem);
      comScore += 1;
    }
    restartGame();
  });
});

// 3판 점수 누적 후 restart / 3판 점수 누적하여 최종 승자
// 3판 후 종료
// function restartGame() {
//   if (count >= 3) {
//     clearInterval(idx);
//     console.log("🚀 ~ file: main.js:64 ~ restartGame ~ comScore", comScore);
//     console.log("🚀 ~ file: main.js:64 ~ restartGame ~ userScore", userScore);
//     if (userScore < comScore) {
//       coverTxt.innerHTML = "Lose";
//     }
//     cover.classList.add("on");
//   }
// }

// 3판 2선승제
function restartGame() {
  console.log("🚀 ~ file: main.js:74 ~ restartGame ~ userScore", userScore);
  console.log("🚀 ~ file: main.js:80 ~ restartGame ~ comScore", comScore);

  if (userScore === 2) {
    coverTxt.innerHTML = "win";
    clearInterval(idx);
    cover.classList.add("on");
  } else if (comScore === 2) {
    coverTxt.innerHTML = "Lose";
    clearInterval(idx);
    cover.classList.add("on");
  }
}
btnRestart.addEventListener("click", function () {
  count = 0;
  comScore = 0;
  userScore = 0;
  result.innerHTML = "";
  idx = setInterval(showComputerItem, 100);
  cover.classList.remove("on");
});
