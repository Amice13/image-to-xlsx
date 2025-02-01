const heightCoefficient = 0.6
const widthCoefficient = 0.0625 * 1.8

const calculatePixelSize = pixel => {
  return {
    width: pixel * widthCoefficient,
    height: pixel * heightCoefficient
  }
}

export default calculatePixelSize
