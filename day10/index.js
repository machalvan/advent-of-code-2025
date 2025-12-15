import '../utils.js'
import { init } from 'z3-solver'

export const part1 = input => {
  const lines = input.toLines()
  let sum = 0

  for (const line of lines) {
    const words = line.split(' ')
    let buttons = words.slice(1, -1)
    let lights = words[0]
    buttons = buttons.map(button => button.slice(1, -1).split(',').map(Number))
    lights = lights.slice(1, -1).split('')

    const queue = [[lights, 0]]
    const seen = new Map()
    let minPresses
    while (minPresses === undefined) {
      const [currentLights, presses] = queue.shift()
      const key = currentLights.join('')

      if (seen.has(key) && seen.get(key) <= presses) continue
      seen.set(key, presses)

      if (currentLights.every(light => light === '.')) {
        minPresses = presses
      }

      for (const button of buttons) {
        const newLights = currentLights.map((light, index) =>
          button.includes(index) ? (light === '#' ? '.' : '#') : light
        )

        queue.push([newLights, presses + 1])
      }
    }

    sum += minPresses
  }

  return sum
}

export async function part2(input) {
  const lines = input.toLines()
  let sum = 0

  for (const line of lines) {
    const words = line.split(' ')
    let buttons = words.slice(1, -1)
    let joltages = words.at(-1)
    buttons = buttons.map(button => button.slice(1, -1).split(',').map(Number))
    joltages = joltages.slice(1, -1).split(',').map(Number)

    const { Context } = await init()
    const { Int, Optimize } = new Context('main')
    const optimizer = new Optimize()

    const vectors = []
    let vectorSum = Int.val(0)
    for (let i = 0; i < buttons.length; i++) {
      const vector = Int.const(`b${i}`)
      vectors.push(vector)
      optimizer.add(vector.ge(0))
      vectorSum = vectorSum.add(vector)
    }

    optimizer.minimize(vectorSum)

    for (let i = 0; i < joltages.length; i++) {
      const terms = []
      let termsSum = Int.val(0)

      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j].includes(i)) {
          terms.push(vectors[j])
          termsSum = termsSum.add(vectors[j])
        }
      }

      const eq = termsSum.eq(joltages[i])
      optimizer.add(eq)
    }

    const checked = await optimizer.check()
    console.assert(checked.toString() === 'sat', 'No solution found')

    const model = await optimizer.model()
    for (const decl of model.decls()) {
      sum += parseInt(model.get(decl).toString(), 10)
    }
  }

  return sum
}
