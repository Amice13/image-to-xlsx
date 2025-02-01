const serializer = new XMLSerializer()

const createFills = (colors) => {
  return colors.map(color => {
    const fill = document.createElementNS(undefined, 'fill')
    const patternFill = document.createElementNS(undefined, 'patternFill')
    patternFill.setAttribute('patternType', 'solid')
    const fgColor = document.createElementNS(undefined, 'fgColor')
    fgColor.setAttribute('rgb', color)
    patternFill.appendChild(fgColor)
    fill.appendChild(patternFill)
    return serializer.serializeToString(fill)
  }).join('')
}

export default createFills
