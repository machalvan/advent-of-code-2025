import '../utils.js'

function calcDist(p1, p2) {
  const [x1, y1, z1] = p1
  const [x2, y2, z2] = p2
  const dx = x1 - x2
  const dy = y1 - y2
  const dz = z1 - z2

  return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2)
}

export const part1 = input => {
  const lines = input.toLines().map(line => line.split(',').map(Number))
  const pairs = 1000

  const dists = []
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const p1 = lines[i]
      const p2 = lines[j]
      const dist = calcDist(p1, p2)

      dists.push([dist, i, j])
    }
  }

  dists.sort((a, b) => a[0] - b[0])

  const circuits = {}

  function find(a) {
    if (circuits[a] === undefined) return a
    circuits[a] = find(circuits[a])
    return circuits[a]
  }

  function union(a, b) {
    const rootA = find(a)
    const rootB = find(b)

    if (rootA !== rootB) {
      circuits[rootB] = rootA
    }
  }

  for (let i = 0; i < pairs; i++) {
    const [, a, b] = dists[i]
    union(a, b)
  }

  function getComponentSizes() {
    const sizes = {}

    for (let i = 0; i < lines.length; i++) {
      const root = find(i)
      sizes[root] = (sizes[root] || 0) + 1
    }

    return Object.values(sizes)
  }

  return getComponentSizes()
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
}

export const part2 = input => {
  const lines = input.toLines().map(line => line.split(',').map(Number))

  const dists = []
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const p1 = lines[i]
      const p2 = lines[j]
      const dist = calcDist(p1, p2)

      dists.push([dist, i, j])
    }
  }

  dists.sort((a, b) => a[0] - b[0])

  const circuits = {}

  function find(a) {
    if (circuits[a] === undefined) return a
    circuits[a] = find(circuits[a])
    return circuits[a]
  }

  function union(a, b) {
    const rootA = find(a)
    const rootB = find(b)

    if (rootA !== rootB) {
      circuits[rootB] = rootA
    }
  }

  function getComponentSizes() {
    const sizes = {}

    for (let i = 0; i < lines.length; i++) {
      const root = find(i)
      sizes[root] = (sizes[root] || 0) + 1
    }

    return Object.values(sizes)
  }

  dists.sort((a, b) => a[0] - b[0])

  for (const [_, a, b] of dists) {
    union(a, b)

    const componentSizes = getComponentSizes(circuits)

    if (componentSizes.length === 1 && componentSizes[0] === lines.length)
      return lines[a][0] * lines[b][0]
  }
}
