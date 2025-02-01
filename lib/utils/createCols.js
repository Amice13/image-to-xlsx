const serializer = new XMLSerializer()

const createCols = (width, cellWidth) => {
  const col = document.createElementNS(undefined, 'col')
  col.setAttribute('min', 1)
  col.setAttribute('max', width + 1)
  col.setAttribute('width', cellWidth)
  col.setAttribute('customWidth', 1)
  return serializer.serializeToString(col)
}

export default createCols
