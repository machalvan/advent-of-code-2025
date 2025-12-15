import '../utils.js'

export const part1 = input => {
  const blocks = input.toBlocks()
  const regions = blocks.pop()

  const shapes = []
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]

    const shape = block
      .slice(1)
      .map(line => line.split('').map(c => (c === '#' ? 1 : 0)))
    shapes.push(shape)
  }

  let count = 0
  for (const region of regions) {
    let [size, ...amounts] = region.split(' ')
    amounts = amounts.map(Number)
    const [w, h] = size.slice(0, -1).split('x').map(Number)
    const availableSpace = w * h

    let minPresentArea = 0
    let maxPresentArea = 0
    for (let shapeIndex = 0; shapeIndex < amounts.length; shapeIndex++) {
      const amount = amounts[shapeIndex]
      if (amount === 0) continue

      for (const row of shapes[shapeIndex]) {
        for (const cell of row) {
          if (cell === 1) {
            minPresentArea += amount
          }

          maxPresentArea += amount
        }
      }
    }

    if (availableSpace >= maxPresentArea) {
      count += 1
    } else if (availableSpace < minPresentArea) {
      // Do nothing
    } else {
      count += availableSpace >= minPresentArea * 1.2 ? 1 : 0
    }
  }

  return count
}

export const part2 = input => {
  return
}
