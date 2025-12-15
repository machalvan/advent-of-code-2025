import '../utils.js'

function getPathCount(graph, start, end) {
  const memo = new Map()
  const visiting = new Set()

  function dfs(node) {
    if (node === end) return 1
    if (memo.has(node)) return memo.get(node)
    if (visiting.has(node)) return 0

    visiting.add(node)

    let total = 0
    for (const next of graph[node] ?? []) {
      total += dfs(next)
    }

    visiting.delete(node)
    memo.set(node, total)

    return total
  }

  return dfs(start)
}

export const part1 = input => {
  const lines = input.toLines()

  const graph = {}
  for (const line of lines) {
    let [key, ...values] = line.split(' ')
    key = key.slice(0, -1)
    graph[key] = values
  }

  const start = 'you'
  const end = 'out'

  return getPathCount(graph, start, end)
}

export const part2 = input => {
  const lines = input.toLines()

  const graph = {}
  for (const line of lines) {
    let [key, ...values] = line.split(' ')
    key = key.slice(0, -1)
    graph[key] = values
  }

  const start = 'svr'
  const middle1 = 'dac'
  const middle2 = 'fft'
  const end = 'out'

  const a = getPathCount(graph, start, middle1)
  const b = getPathCount(graph, middle1, middle2)
  const c = getPathCount(graph, middle2, end)

  const d = getPathCount(graph, start, middle2)
  const e = getPathCount(graph, middle2, middle1)
  const f = getPathCount(graph, middle1, end)

  return a * b * c + d * e * f
}
