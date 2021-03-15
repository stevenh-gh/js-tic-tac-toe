const board = (() => {
  let grid = [...Array(3)].map(e => Array(3))

  const fill = (xo, coord) => {
    grid[coord[0]][coord[1]] = xo
  }

  return { grid, fill }
})()
