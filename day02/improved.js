require('../utils')()

const part1 = input => {
  let sum = 0

  for (const range of input.split(',')) {
    const [start, end] = range.split('-')

    for (let i = +start; i <= +end; i++) {
      const id = i.toString()
      const isRepeatedTwice =
        id.slice(0, id.length / 2) === id.slice(id.length / 2)

      if (isRepeatedTwice) sum += i
    }
  }

  return sum
}

function isRepeated(str) {
  return (str + str).indexOf(str, 1) !== str.length
}

const part2 = input => {
  let sum = 0

  for (const range of input.split(',')) {
    const [start, end] = range.split('-')

    for (let i = +start; i <= +end; i++) {
      const id = i.toString()

      if (isRepeated(id)) sum += i
    }
  }

  return sum
}

module.exports = { part1, part2 }
