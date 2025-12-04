import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()
  let res = 0

  grid.forEachCell(({ r, c, cell }) => {
    if (cell !== '@') return

    let sum = 0
    grid.forEachSurrounding(c, r, ({ cell: neighbor }) => {
      if (neighbor === '@') sum++
    })

    if (sum < 4) res++
  })

  return res
}

export const part2 = input => {
  const grid = input.toGrid()
  let res = 0
  let done = false

  while (!done) {
    done = true

    grid.forEachCell(({ r, c, cell }) => {
      if (cell !== '@') return

      let sum = 0
      grid.forEachSurrounding(c, r, ({ cell: neighbor }) => {
        if (neighbor === '@') sum++
      })

      if (sum < 4) {
        grid[r][c] = '.'
        done = false
        res++
      }
    })
  }

  return res
}
