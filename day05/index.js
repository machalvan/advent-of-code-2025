import '../utils.js'

export const part1 = input => {
  const blocks = input.toBlocks()
  let fresh = blocks[0].map(s => s.split('-').map(Number))
  let available = blocks[1].map(Number)
  let res = 0

  for (const a of available) {
    for (const f of fresh) {
      let [min, max] = f
      if (a >= min && a <= max) {
        res++
        break
      }
    }
  }

  return res
}

export const part2 = input => {
  const blocks = input.toBlocks()
  let fresh = blocks[0].map(s => s.split('-').map(Number))
  let res = 0
  const ranges = []

  for (const f of fresh) {
    let [min, max] = f
    let shouldPush = true

    for (let i = 0; i < ranges.length; i++) {
      const r = ranges[i]
      const [rmin, rmax] = r

      if (min >= rmin && max <= rmax) {
        shouldPush = false
        break
      }

      if (min >= rmin && min <= rmax) {
        min = Math.max(min, rmax + 1)
      }

      if (max <= rmax && max >= rmin) {
        max = Math.min(max, rmin - 1)
      }

      if (min <= rmin && max >= rmax) {
        ranges.splice(i, 1)
        i--
      }
    }

    if (shouldPush) {
      ranges.push([min, max])
    }
  }

  for (const r of ranges) {
    const [rmin, rmax] = r
    res += rmax - rmin + 1
  }

  return res
}
