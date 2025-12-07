import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()
  let sr, sc

  grid.forEachCell(({ r, c, cell }) => {
    if (cell === 'S') {
      sr = r
      sc = c
      return
    }
  })

  const queue = [[sr + 1, sc]]
  const seen = new Set()
  let res = 0
  while (queue.length) {
    const [r, c] = queue.shift()

    const key = `${r},${c}`
    if (seen.has(key)) continue
    if (r >= grid.length) continue

    const cell = grid[r][c]

    if (cell === '.') {
      queue.push([r + 1, c])
    } else {
      queue.push([r, c - 1])
      queue.push([r, c + 1])
      res++
    }

    seen.add(key)
  }

  return res
}

export const part2 = input => {
  const grid = input.toGrid()
  let sr, sc

  grid.forEachCell(({ r, c, cell }) => {
    if (cell === 'S') {
      sr = r
      sc = c
      return
    }
  })

  const queue = [[sr + 1, sc, 1]]
  let res = 0
  while (queue.length) {
    const [r, c, timelines] = queue.shift()

    if (r >= grid.length) {
      res += timelines
      continue
    }

    const cell = grid[r][c]

    if (cell === '.') {
      queue.push([r + 1, c, timelines])
    } else {
      for (const nc of [c - 1, c + 1]) {
        const qi = queue.findIndex(([qr, qc, _]) => qr === r && qc === nc)

        if (qi === -1) queue.push([r, nc, timelines])
        else queue[qi][2] += timelines
      }
    }
  }

  return res
}
