import '../utils.js'

export const part1 = input => {
  let sum = 0

  for (const line of input.split('\n')) {
    let max = -1
    let maxIndex

    for (let i = 0; i < line.length - 1; i++) {
      const num = +line[i]

      if (num > max) {
        max = num
        maxIndex = i
      }
    }

    const line2 = line.slice(maxIndex + 1)

    let max2 = -1
    for (let i = 0; i < line2.length; i++) {
      const num = +line2[i]

      if (num > max2) {
        max2 = num
      }
    }

    sum += max * 10 + max2
  }

  return sum
}

export const part2 = input => {
  const digits = 12
  let sum = 0

  for (let line of input.split('\n')) {
    let pointer = digits - 1

    while (pointer >= 0) {
      let max = -1
      let maxIndex

      for (let i = 0; i < line.length - pointer; i++) {
        const num = +line[i]

        if (num > max) {
          max = num
          maxIndex = i
        }
      }

      line = line.slice(maxIndex + 1)
      sum += max * 10 ** pointer

      pointer--
    }
  }

  return sum
}
