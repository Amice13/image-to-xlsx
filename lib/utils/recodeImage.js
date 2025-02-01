import rgbaToHex from './rgbaToHex.js'

const NUMBER_OF_CHANNELS = 4
const HASH_SYMBOL = 'FF'

const recodeImage = ({ data }) => {
  const refs = {}
  const uniqueColors = []
  const recodedImage = []
  const rgbaPixels = Array.from(data)
  for (let i = 0; i < rgbaPixels.length; i += NUMBER_OF_CHANNELS) {
    const rgbaPixel = rgbaPixels.slice(i, i + NUMBER_OF_CHANNELS)
    const pixelColor = HASH_SYMBOL + rgbaToHex(rgbaPixel)
    if (!refs[pixelColor]) {
      uniqueColors.push(pixelColor)
      refs[pixelColor] = uniqueColors.length
    }
    recodedImage.push(refs[pixelColor])
  }
  return {
    uniqueColors,
    recodedImage
  }
}

export default recodeImage
