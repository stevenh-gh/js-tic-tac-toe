const board = (() => {
  let grid = [...Array(3)].map(e => Array(3))

  const isUndefined = coord => grid[coord[0]][coord[1]] === undefined

  const fill = (xo, coord) => grid[coord[0]][coord[1]] = xo

  const checkWin = () => {
    /*
    00 01 02
    10 11 12
    20 21 22
    */

    // check left->right
    let winStatus = false
    grid.forEach((array, arrayIndex) => {
      if (array[0] === array[1] && array[1] === array[2]) {
        if (array[0] !== undefined) {
          winStatus = true
          return winStatus
        }
      }
    })

    // check top-downs
    let col = []
    grid.forEach((row, rowIdx) => {
      col.push(grid.map(array => array[rowIdx]))
    })

    col.forEach(row => {
      if (row[0] === row[1] && row[0] === row[2]) {
        if (row[0] !== undefined) {
          winStatus = true
          return winStatus
        }
      }
    })

    // check diags
    return winStatus

  }
  return { grid, fill, isUndefined, checkWin }
})()

const PlayerFactory = xo => {
  const team = xo
  const fill = coord => board.fill(team, coord)

  return { fill, team }
}

const Game = (() => {
  let turn = 0
  let win = false

  let player1 = PlayerFactory('x')
  let player2 = PlayerFactory('o')

  const getCoord = () => {
    const cells = document.querySelectorAll('div[data-cell]')
    cells.forEach(el => {
      el.addEventListener('click', e => {
        let cell = e.target.dataset.cell
        let coord = [Number(cell[0]), Number(cell[1])]

        if (board.isUndefined(coord)) {
          let currentPlayer = turn % 2 === 0 ? player1 : player2

          currentPlayer.fill(coord)
          const getCell = document.querySelector(`div[data-cell='${coord.join('')}']`)
          // const span = document.createElement('DIV')
          // span.innerText = currentPlayer.team.toUpperCase()
          // getCell.appendChild(span)
          const getDiv = getCell.querySelector('div')
          getDiv.innerText = currentPlayer.team.toUpperCase()

          console.log(board.checkWin())


          turn++
        }
      })
    })
  }

  const play = () => {
    let player1 = PlayerFactory('x')
    let player2 = PlayerFactory('o')

    while (!win) {
      let coord = getCoord()
      let currentPlayer = turn % 2 === 0 ? player1 : player2
      currentPlayer.fill(coord)

      // draw to html/css grid
      const cell = document.querySelector(`div[data-cell='${coord.join('')}']`)
      const xoText = document.createTextNode = currentPlayer.team.toUpperCase()
      cell.appendChild(xoText)

      turn++
    }
  }
  return { play, getCoord }
})()

/*
make players
when not win:

player is player1 if turn is even
player is player2 if turn is odd

when cell is clicked
  -get coord of cell
  -check if cell is empty
  -if empty,
    -add player's xo to array counterpart of cell
    -add player's xo as text to cell
    -increment turncounter
    -check for win condition
      -if win, end loop
*/