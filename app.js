const board = (() => {
  let grid = [...Array(3)].map(e => Array(3))

  const fill = (xo, coord) => {
    grid[coord[0]][coord[1]] = xo
  }

  return { grid, fill }
})()

const PlayerFactory = xo => {
  const team = xo
  const fill = coord => board.fill(team, coord)

  return { fill }
}