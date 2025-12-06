import '../utils.js'

export const part1 = input => {
  let lines = input.toLines()
  let ops = lines.pop()
  ops = ops.match(/[+*]/g)
  lines = lines.map(line => line.getNums()).rotate()

  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const nums = lines[i]
    const op = ops[i]
    sum += op === '+' ? nums.sum() : nums.prod()
  }

  return sum
}

export const part2 = input => {
  let lines = input.toLines()
  let ops = lines.pop()
  ops = ops.match(/[+*]/g)
  lines = lines.map(line => line.split('')).rotate()

  let equations = []
  let nums = []
  for (const column of lines) {
    if (column.every(char => char === ' ')) {
      equations.push(nums)
      nums = []
    } else {
      nums.push(+column.toReversed().join(''))
    }
  }

  equations.push(nums)

  let sum = 0
  for (let i = 0; i < ops.length; i++) {
    const nums = equations[i]
    const op = ops[i]
    sum += op === '+' ? nums.sum() : nums.prod()
  }

  return sum
}
