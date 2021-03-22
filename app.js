const board = (() => {

  let grid = [...Array(3)].map(e => Array(3))

  const reset = () => {
    grid.forEach(row => {
      row.forEach((e, idx) => {
        delete row[idx]
      })
    })
  }

  // const isUndefined = coord => grid[coord[0]][coord[1]] === undefined
  function isUndefined(coord) {
    console.log('INSIDE IS UNDEFINED:')
    console.log(grid)
    return grid[coord[0]][coord[1]] === undefined
  }

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
    if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
      if (grid[0][0] !== undefined) {
        winStatus = true
        return winStatus
      }
    }

    if (grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
      if (grid[0][2] !== undefined) {
        winStatus = true
        return winStatus
      }
    }
    return winStatus

  }
  return { grid, fill, isUndefined, checkWin, reset }
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

  const play = e => {
    console.log(`TURN: ${turn}`)
    let cell = e.target.dataset.cell
    let coord = [Number(cell[0]), Number(cell[1])]
    console.log(coord)
    console.log(board.grid)

    if (board.isUndefined(coord)) {
      console.log('is undefined')
      let currentPlayer = turn % 2 === 0 ? player1 : player2

      currentPlayer.fill(coord)
      const getCell = document.querySelector(`div[data-cell='${coord.join('')}']`)
      // const span = document.createElement('DIV')
      // span.innerText = currentPlayer.team.toUpperCase()
      // getCell.appendChild(span)
      const getDiv = getCell.querySelector('div')
      getDiv.innerText = currentPlayer.team.toUpperCase()

      console.log(board.checkWin())
      if (board.checkWin()) {
        console.log(`Winner: Player ${currentPlayer.team.toUpperCase()}`)
        cells.forEach(cell => {
          cell.removeEventListener('click', play)
        })
        return
      }
      if (turn === 8) {
        console.log('Match draw')
        cells.forEach(cell => {
          cell.removeEventListener('click', play)
        })
        return
      }

      turn++
    }
  }

  const cells = document.querySelectorAll('div[data-cell]')
  const getCoord = () => {
    cells.forEach(el => {
      el.addEventListener('click', play)
    })
  }

  // const start = () => {
  let startBtn = document.querySelector('#startBtn')
  let restartBtn = document.querySelector('#restartBtn')
  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none'
    restartBtn.style.display = 'block'
    getCoord()
  })
  restartBtn.addEventListener('click', () => {
    console.log('btn click')
    // board.reset()
    turn = 0
    // board.grid = [...Array(3)].map(e => Array(3))
    board.reset()
    cells.forEach(cell => {
      cell.querySelector('div').innerText = ''
    })
    getCoord()
  })

  // }
  return { play }
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