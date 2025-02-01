const rgbaToHex = (rgba) => {
  const [r, g, b, a] = rgba
  const red = Math.round((255 - a) + a * r / 255)
  const green = Math.round((255 - a) + a * g / 255)
  const blue = Math.round((255 - a) + a * b / 255)
  return [red, green, blue]
    .map(number => number.toString(16))
    .map(string => string.length === 1 ? '0' + string : string)
    .join('').toUpperCase()
}

export default rgbaToHex
