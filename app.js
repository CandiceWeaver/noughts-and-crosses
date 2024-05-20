const board = document.querySelector('#board')
const info = document.querySelector('#info')

const startCells = ['', '', '', '', '', '', '', '', '']
let turn = 'noughts'

const createBoard = () => {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div')

    cellElement.classList.add('square')
    cellElement.id = index
    cellElement.addEventListener('click', addTurn)

    board.append(cellElement)
  })
}

const addTurn = e => {
  const turnDisplay = document.createElement('div')

  turnDisplay.classList.add(turn)
  e.target.append(turnDisplay)
  turn = turn === 'noughts' ? 'cross' : 'noughts'
  info.textContent = `It's now ${turn}' turn!`
  e.target.removeEventListener('click', addTurn)

  checkScore()
}

const checkScore = () => {
  const allSquareCells = document.querySelectorAll('.square')
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  winningCombos.forEach(combo => {
    const noughtsWin = combo.every(cell =>
      allSquareCells[cell].firstChild?.classList.contains('noughts')
    )
    if (noughtsWin) {
      info.textContent = 'Noughts win!'

      // Stops players from being able to place noughts when game has ended
      allSquareCells.forEach(square =>
        square.replaceWith(square.cloneNode(true))
      )
    }
  })

  winningCombos.forEach(combo => {
    const crossesWin = combo.every(cell =>
      allSquareCells[cell].firstChild?.classList.contains('cross')
    )
    if (crossesWin) {
      info.textContent = 'Crosses win!'

      // Stops players from being able to place crosses when game has ended
      allSquareCells.forEach(square =>
        square.replaceWith(square.cloneNode(true))
      )
    }
  })
}

info.textContent = `It's noughts' turn!`
createBoard()
