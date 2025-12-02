require('../utils')()

const part1 = input => {
  const ranges = input.split(',').map(range => range.split('-').map(Number))
  let sum = 0

  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const iStr = i.toString()

      const isRepeating =
        iStr.slice(iStr.length / 2) === iStr.slice(0, iStr.length / 2)

      if (isRepeating) {
        sum += i
      }
    }
  }

  return sum
}

function isRepeating(str) {
  return (str + str).indexOf(str, 1) !== str.length
}

const part2 = input => {
  const ranges = input.split(',').map(range => range.split('-').map(Number))
  let sum = 0

  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const iStr = i.toString()

      if (isRepeating(iStr)) {
        sum += i
      }
    }
  }

  return sum
}

module.exports = { part1, part2 }
