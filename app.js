const board = (() => {
  let grid = [...Array(3)].map(e => Array(3))

  const fill = (xo, coord) => grid[coord[0]][coord[1]] = xo

  const getCells = () => {
    const cells = document.querySelectorAll('div[data-cell]')
    cells.forEach(el => {
      el.addEventListener('click', e => {
        let cell = e.target.dataset.cell
        let coord = [Number(cell[0]), Number(cell[1])]
        console.log(coord)
      })
    })
  }

  return { grid, fill, getCells }
})()

const PlayerFactory = xo => {
  const team = xo
  const fill = coord => board.fill(team, coord)

  return { fill }
}