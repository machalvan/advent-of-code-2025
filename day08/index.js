import '../utils.js'

class Node {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
    this.edges = new Set()
  }

  toString() {
    return `${this.x},${this.y},${this.z}`
  }
}

class Edge {
  constructor(nodeA, nodeB) {
    this.nodeA = nodeA
    this.nodeB = nodeB
  }

  distance() {
    return Math.sqrt(
      (this.nodeA.x - this.nodeB.x) ** 2 +
        (this.nodeA.y - this.nodeB.y) ** 2 +
        (this.nodeA.z - this.nodeB.z) ** 2
    )
  }
}

class Graph {
  constructor() {
    this.nodes = new Set()
    this.edges = new Set()
  }

  addNode(node) {
    this.nodes.add(node)
  }
}

export const part1 = input => {
  const lines = input.toLines().map(line => line.split(',').map(Number))
  const pairs = 1000

  const graph = new Graph()
  const edges = []

  for (const line of lines) {
    const nodeA = new Node(line[0], line[1], line[2])
    graph.addNode(nodeA)

    for (const nodeB of graph.nodes) {
      if (nodeA === nodeB) continue
      edges.push(new Edge(nodeA, nodeB))
    }
  }

  const shortestEdges = edges
    .toSorted((a, b) => a.distance() - b.distance())
    .slice(0, pairs)

  const circuits = {}

  for (const edge of shortestEdges) {
    const keyA = edge.nodeA.toString()
    const keyB = edge.nodeB.toString()

    if (!circuits[keyA]) circuits[keyA] = new Set()
    if (!circuits[keyB]) circuits[keyB] = new Set()

    circuits[keyA].add(keyB)
    circuits[keyB].add(keyA)
  }

  const visited = new Set()
  const components = []

  const dfs = (nodeKey, component) => {
    visited.add(nodeKey)
    component.push(nodeKey)

    for (const neighborKey of circuits[nodeKey]) {
      if (!visited.has(neighborKey)) {
        dfs(neighborKey, component)
      }
    }
  }

  for (const nodeKey in circuits) {
    if (!visited.has(nodeKey)) {
      const component = []
      dfs(nodeKey, component)
      components.push(component)
    }
  }

  return components
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .reduce((a, b) => a * b.length, 1)
}

export const part2 = input => {
  const lines = input.toLines().map(line => line.split(',').map(Number))
  let min = 0
  let max = 10_000
  let pairs = max
  let res

  while (true) {
    const graph = new Graph()
    const edges = []

    for (const line of lines) {
      const nodeA = new Node(line[0], line[1], line[2])
      graph.addNode(nodeA)

      for (const nodeB of graph.nodes) {
        if (nodeA === nodeB) continue
        edges.push(new Edge(nodeA, nodeB))
      }
    }

    const shortestEdges = edges
      .toSorted((a, b) => a.distance() - b.distance())
      .slice(0, pairs)

    const last = shortestEdges.at(-1)
    res = last.nodeA.x * last.nodeB.x

    const circuits = {}

    for (const edge of shortestEdges) {
      const keyA = edge.nodeA.toString()
      const keyB = edge.nodeB.toString()

      if (!circuits[keyA]) circuits[keyA] = new Set()
      if (!circuits[keyB]) circuits[keyB] = new Set()

      circuits[keyA].add(keyB)
      circuits[keyB].add(keyA)
    }

    const visited = new Set()
    const components = []

    const dfs = (nodeKey, component) => {
      visited.add(nodeKey)
      component.push(nodeKey)

      for (const neighborKey of circuits[nodeKey]) {
        if (!visited.has(neighborKey)) {
          dfs(neighborKey, component)
        }
      }
    }

    for (const nodeKey in circuits) {
      if (!visited.has(nodeKey)) {
        const component = []
        dfs(nodeKey, component)
        components.push(component)
      }
    }

    components.sort((a, b) => b.length - a.length)

    if (components[0].length < lines.length) {
      min = pairs + 1
    } else {
      max = pairs - 1
    }

    pairs = Math.floor((min + max) / 2)

    if (min > max) break
  }

  return res
}
