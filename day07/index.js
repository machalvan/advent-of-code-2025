import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()
  let sc = -1
  let sr = -1

  grid.forEachCell(({ c, r, cell }) => {
    if (cell === 'S') {
      sc = c
      sr = r
    }
  })

  const start = [sc, sr + 1]
  const queue = [start]
  const seen = new Set()
  let res = 0
  while (queue.length) {
    const [x, y] = queue.shift()

    const key = `${x},${y}`
    if (seen.has(key)) continue
    if (y >= grid.length) continue
    if (x < 0 || x >= grid[0].length) continue

    const cell = grid[y][x]

    if (cell === '.') {
      if (sr < grid.length) queue.push([x, y + 1])
    } else {
      if (x > 0) queue.push([x - 1, y])
      if (x < grid[0].length) queue.push([x + 1, y])
      res++
    }

    seen.add(key)
  }

  return res
}

export const part2 = input => {
  const grid = input.toGrid()
  let sc = -1
  let sr = -1

  grid.forEachCell(({ c, r, cell }) => {
    if (cell === 'S') {
      sc = c
      sr = r
    }
  })

  const start = [sc, sr + 1, 1]
  let queue = [start]
  let res = 0
  while (queue.length) {
    const [x, y, timelines] = queue.shift()

    if (y >= grid.length) {
      res += timelines
      continue
    }
    if (x < 0 || x >= grid[0].length) continue

    const cell = grid[y][x]

    if (cell === '.') {
      if (sr < grid.length) queue.push([x, y + 1, timelines])
    } else {
      for (const nx of [x - 1, x + 1]) {
        const qi = queue.findIndex(([qx, qy, _]) => qx === nx && qy === y)

        if (qi === -1) {
          queue.push([nx, y, timelines])
        } else {
          queue[qi][2] += timelines
        }
      }
    }
  }

  return res
}
