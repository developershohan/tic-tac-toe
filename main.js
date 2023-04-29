const info = document.querySelector("#info")
const board = document.querySelector(".board")
const restartBtn = document.querySelector("#restartBtn")
const result = document.querySelector(".result")
const winner = document.querySelector(".winner")
const boxes = Array.from(document.querySelectorAll(".box"))
const boxs = document.querySelectorAll(".box")

const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
let currentPlayer = X_CLASS
let spaces = Array(9).fill(null)
let count_play = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', handleClick))
    setBoardHoverClass()
}



//handleClick Logic
function handleClick(e) {


    const id = e.target.id

    if (!spaces[id] && count_play < 9 ) {
        spaces[id] = currentPlayer
        e.target.classList.add(currentPlayer)
        if (playerHasWon() !== false) {
            let winning_blocks = playerHasWon()
            count_play = 10
            winning_blocks.map(box => boxes[box].style.backgroundColor = "#F2C14E")
            result.style.display = "flex"
            winner.innerHTML = `${currentPlayer} won!`
            boxes.forEach(box => {
                box.removeEventListener('click', handleClick)
            })
            return
        }
count_play ++
        currentPlayer = currentPlayer == X_CLASS ? CIRCLE_CLASS : X_CLASS
      
    }
    if (count_play === 9) {
        result.style.display = "flex"
        winner.innerHTML = "Draw!!f"
    }
    setBoardHoverClass()
}

//Hover Logic
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (currentPlayer == CIRCLE_CLASS) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}


//Check Win Logic
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

//reset function
restartBtn.addEventListener('click', restart)
function restart() {
    spaces.fill(null)
    count_play = 0
    boxes.forEach(box => {
        box.classList.remove(X_CLASS)
        box.classList.remove(CIRCLE_CLASS)
        box.removeEventListener('click', handleClick)
        box.style.backgroundColor = ''
        startGame()
    })
    result.style.display = "none"

}
startGame()