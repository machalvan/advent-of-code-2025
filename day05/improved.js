import '../utils.js'

export const part1 = input => {
  let [fresh, available] = input.toBlocks()
  available = available.toNums()
  fresh = fresh.map(s => s.split('-').toNums())

  return available.filter(a => fresh.some(([min, max]) => a >= min && a <= max))
    .length
}

export const part2 = input => {
  let [fresh] = input.toBlocks()
  fresh = fresh.map(s => s.split('-').toNums()).sort((a, b) => a[0] - b[0])

  let res = 0
  let from = 0
  for (let [min, max] of fresh) {
    min = Math.max(min, from + 1)
    if (min > max) continue

    res += max - min + 1
    from = Math.max(from, max)
  }

  return res
}
