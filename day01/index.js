require('../utils')()

const part1 = input => {
  let dial = 50
  let res = 0

  for (const line of input.split('\n')) {
    let dir = line[0]
    let dist = +line.slice(1)

    if (dir === 'L') {
      dial -= dist
      while (dial < 0) dial += 100
    } else if (dir === 'R') {
      dial += dist
      while (dial >= 100) dial -= 100
    }

    if (dial === 0) res++
  }

  return res
}

const part2 = input => {
  let dial = 50
  let res = 0

  for (const line of input.split('\n')) {
    let dir = line[0]
    let dist = +line.slice(1)

    if (dir === 'L') {
      while (dist > 0) {
        dial -= 1
        dist -= 1
        if (dial < 0) dial += 100
        if (dial === 0) res++
      }
    } else if (dir === 'R') {
      while (dist > 0) {
        dial += 1
        dist -= 1
        if (dial >= 100) dial -= 100
        if (dial === 0) res++
      }
    }
  }

  return res
}

module.exports = { part1, part2 }
