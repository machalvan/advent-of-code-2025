$('pre')
  .innerHTML.split(',')
  .flatMap(
    range => (
      ([start, end] = range.split('-').map(Number)),
      Array.from({ length: end - start + 1 }, (_, i) => start + i + '')
    )
  )
  .reduce(
    ([part1, part2], id) => [
      part1 +
        (id.slice(0, id.length / 2) === id.slice(id.length / 2) ? +id : 0),
      part2 +
        ((id + '' + id).indexOf(id + '', 1) !== (id + '').length ? +id : 0)
    ],
    [0, 0]
  )
