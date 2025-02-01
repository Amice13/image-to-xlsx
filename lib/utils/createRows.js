import getExcelColumnName from './getExcelColumnName.js'
const serializer = new XMLSerializer()

const createRows = (image, width, height, cellHeight) => {
  const rows = [...Array(height).keys()].map(index => {
    const row = document.createElementNS(undefined, 'row')
    row.setAttribute('r', index + 1)
    row.setAttribute('span', `1:${width - 1}`)
    row.setAttribute('ht', cellHeight)
    row.setAttribute('customHeight', 1)
    row.setAttribute('x14ac:dyDescent', 0.3)
    const cells = image.slice(index * width, (index + 1) * width).map((colorRef, i) => {
      const c = document.createElementNS(undefined, 'c')
      c.setAttribute('r', `${getExcelColumnName(i + 1)}${index + 1}`)
      c.setAttribute('s', colorRef)
      return c
    })
    row.append(...cells)
    return serializer.serializeToString(row)
  })
  console.log(rows.length)
  return rows.join('')
}

export default createRows
