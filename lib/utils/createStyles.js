const serializer = new XMLSerializer()

const createStyles = (colors) => {
  return colors.map((_, i) => {
    const xf = document.createElementNS(undefined, 'xf')
    xf.setAttribute('numFmtId', 0)
    xf.setAttribute('fontId', 0)
    xf.setAttribute('fillId', i + 1)
    xf.setAttribute('borderId', 0)
    xf.setAttribute('xfId', 0)
    xf.setAttribute('applyFill', 1)
    return serializer.serializeToString(xf)
  }).join('')
}

export default createStyles
