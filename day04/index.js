import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()
  let res = 0

  for (let c = 0; c < grid[0].length; c++) {
    for (let r = 0; r < grid.length; r++) {
      const cell = grid[r][c]
      if (cell !== '@') continue

      let sum = 0
      grid.forEachSurrounding(c, r, ({ cell: neighbor }) => {
        if (neighbor === '@') sum++
      })

      if (sum < 4) res++
    }
  }

  return res
}

export const part2 = input => {
  const grid = input.toGrid()
  const gridCopy = grid.map(row => row.slice())
  let res = 0
  let done = false

  while (!done) {
    done = true

    for (let c = 0; c < grid[0].length; c++) {
      for (let r = 0; r < grid.length; r++) {
        const cell = grid[r][c]
        if (cell !== '@') continue

        let sum = 0
        gridCopy.forEachSurrounding(c, r, ({ cell: neighbor }) => {
          if (neighbor === '@') sum++
        })

        if (sum < 4) {
          grid[r][c] = '.'
          done = false
          res++
        }
      }
    }

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        gridCopy[r][c] = grid[r][c]
      }
    }
  }

  return res
}
