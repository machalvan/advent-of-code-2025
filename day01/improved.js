require('../utils')()

const part1 = input => {
  let dial = 50
  let res = 0

  for (const line of input.split('\n')) {
    const dir = line[0]
    const dist = +line.slice(1)
    const vector = dir === 'L' ? -dist : dist

    dial += vector
    dial = ((dial % 100) + 100) % 100

    if (dial === 0) res++
  }

  return res
}

const part2 = input => {
  let dial = 50
  let res = 0

  for (const line of input.split('\n')) {
    const dir = line[0]
    const dist = +line.slice(1)
    const vector = dir === 'L' ? -dist : dist

    res +=
      vector < 0
        ? Math.floor(-(dial + vector) / 100) + (dial !== 0)
        : Math.floor((dial + vector) / 100)

    dial += vector
    dial = ((dial % 100) + 100) % 100
  }

  return res
}

module.exports = { part1, part2 }
