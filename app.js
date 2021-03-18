const board = (() => {
  let grid = [...Array(3)].map(e => Array(3))

  const fill = (xo, coord) => grid[coord[0]][coord[1]] = xo
  return { grid, fill }
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

        let currentPlayer = turn % 2 === 0 ? player1 : player2

        currentPlayer.fill(coord)
        const getCell = document.querySelector(`div[data-cell='${coord.join('')}']`)
        const xoText = document.createTextNode(currentPlayer.team.toUpperCase())
        const span = document.createElement('DIV')
        span.appendChild(xoText)
        getCell.appendChild(span)

        turn++
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