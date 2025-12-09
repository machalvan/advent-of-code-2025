import '../utils.js'

function isValid(x1, y1, x2, y2, border) {
  const minX = Math.min(x1, x2)
  const maxX = Math.max(x1, x2)
  const minY = Math.min(y1, y2)
  const maxY = Math.max(y1, y2)

  const isInside = (px, py) => px > minX && px < maxX && py > minY && py < maxY

  for (const [px, py] of border) {
    if (isInside(px, py)) return false
  }

  return true
}

export const part1 = input => {
  const lines = input.toLines().map(line => line.split(',').map(Number))
  let max = 0

  for (let i = 0; i < lines.length; i++) {
    const [x1, y1] = lines[i]

    for (let j = i + 1; j < lines.length; j++) {
      const [x2, y2] = lines[j]

      const width = Math.abs(x2 - x1) + 1
      const height = Math.abs(y2 - y1) + 1
      const area = width * height

      if (area > max) {
        max = area
      }
    }
  }

  return max
}

export const part2 = input => {
  const lines = input.toLines().map(line => line.split(',').map(Number))
  const border = []
  let max = 0

  for (let i = 0; i < lines.length; i++) {
    const [x, y] = lines[i]
    const [nx, ny] = lines[(i + 1) % lines.length]

    if (x === nx) {
      for (let j = Math.min(y, ny); j <= Math.max(y, ny) - 1; j++) {
        border.push([x, j])
      }
    } else if (y === ny) {
      for (let j = Math.min(x, nx); j <= Math.max(x, nx) - 1; j++) {
        border.push([j, y])
      }
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [x1, y1] = lines[i]

    for (let j = i + 1; j < lines.length; j++) {
      const [x2, y2] = lines[j]

      const width = Math.abs(x2 - x1) + 1
      const height = Math.abs(y2 - y1) + 1
      const area = width * height

      if (area > max && isValid(x1, y1, x2, y2, border)) {
        max = area
      }
    }
  }

  return max
}
