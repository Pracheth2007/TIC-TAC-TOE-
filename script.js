// classes used in game
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
// combinations that makes a winner
const WINNING_COMBINATIONS = [
   [0,1,2], 
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]    
]

// all the elements required in the game
//data in the cell
const cellElements = document.querySelectorAll('[data-cell]')
// creating board
const board = document.getElementById('board')
//creating winning message
const winningMessageElement = document.getElementById('winningMessage')
//creating restart button
const restartButton = document.getElementById('restartButton')
//getting winning message to be displayed
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
//circle turn
let circleTurn

//starting the game
startGame()

// making the restart button work
restartButton.addEventListener('click', startGame)

// what happens when game is being started
function startGame(){
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick,{once: true})
        
    })
  
 //remove winning message when restart is pressed   
    setBoardHoverClass() 
    winningMessageElement.classList.remove('show')
}

// switch turns after each turn and determine if anyone won or not 
function handleClick(e){
const cell = e.target    
const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
placeMark(cell, currentClass)
if(checkWin(currentClass)){
endGame(false)
}
else if(isDraw()){
    endGame(true)
}
else {
    swapTurns()
    setBoardHoverClass()
}

}

// what will happen when game is ended
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }
    else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"}WINS!`
    }
    winningMessageElement.classList.add('show')
}

// shows the content the cell contains
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
               cell.classList.contains(CIRCLE_CLASS)
    })
}

// when mouse is pressed display the person turn symbol
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

// swithch Turns
function swapTurns(){
    circleTurn = !circleTurn
}

//shows the class when hovering over cell
function setBoardHoverClass(){
board.classList.remove(X_CLASS)
board.classList.remove(CIRCLE_CLASS)
if(circleTurn){
board.classList.add(CIRCLE_CLASS)
}
else{
  board.classList.add(X_CLASS)  
}
}

// checks if any of the winning combinations match the content of the cells
function checkWin(currentClass){
   return WINNING_COMBINATIONS.some(combination => {
   return combination.every(index =>{
       return cellElements[index].classList.contains(currentClass)
   })    
   })
}







