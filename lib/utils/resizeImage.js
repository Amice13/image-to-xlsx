const resizeImage = (image, maxSize) => {
  let { width, height } = image
  if (width > height) {
    if (width > maxSize) {
      height = height * (maxSize / width)
      width = maxSize
    }
  } else {
    if (height > maxSize) {
      width = width * (maxSize / height)
      height = maxSize
    }
  }

  return {
    width: Math.round(width, 0),
    height: Math.round(height, 0)
  }
}

export default resizeImage
