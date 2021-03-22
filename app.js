const board = (() => {

  let grid = [...Array(3)].map(e => Array(3))

  function reset() {
    grid.forEach(row => {
      row.forEach((e, idx) => {
        delete row[idx]
      })
    })
  }

  function isUndefined(coord) {
    return grid[coord[0]][coord[1]] === undefined
  }

  function fill(xo, coord) {
    return grid[coord[0]][coord[1]] = xo
  }

  function checkWin() {
    let winStatus = false
    grid.forEach(array => {
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
  function addMove(coord) {
    return board.fill(team, coord)
  }

  return { addMove, team }
}

const TicTacToe = (() => {
  let turn = 0

  let player1 = PlayerFactory('x')
  let player2 = PlayerFactory('o')

  const cells = document.querySelectorAll('div[data-cell]')

  const startBtn = document.querySelector('#startBtn')
  const restartBtn = document.querySelector('#restartBtn')

  function play(e) {
    let cell = e.target.dataset.cell
    let coord = [Number(cell[0]), Number(cell[1])]

    if (board.isUndefined(coord)) {
      let currentPlayer = turn % 2 === 0 ? player1 : player2

      currentPlayer.addMove(coord)
      const getCell = document.querySelector(`div[data-cell='${coord.join('')}']`)

      const getDiv = getCell.querySelector('div')
      getDiv.innerText = currentPlayer.team.toUpperCase()

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

  function addEventListenerToCells() {
    cells.forEach(el => {
      el.addEventListener('click', play)
    })
  }

  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none'
    restartBtn.style.display = 'block'
    addEventListenerToCells()
  })
  restartBtn.addEventListener('click', () => {
    turn = 0
    board.reset()
    cells.forEach(cell => {
      cell.querySelector('div').innerText = ''
    })
    addEventListenerToCells()
  })

})()