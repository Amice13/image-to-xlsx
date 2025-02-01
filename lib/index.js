import JSZip from 'jszip'
import saveAsBlob from './utils/saveAsBlob.js'
import resizeImage from './utils/resizeImage.js'
import recodeImage from './utils/recodeImage.js'
import createCols from './utils/createCols.js'
import createRows from './utils/createRows.js'
import createFills from './utils/createFills.js'
import createStyles from './utils/createStyles.js'
import calculatePixelSize from './utils/calculatePixelSize.js'
import getTemplate from './utils/getTemplate.js'

const imageToXlsx = ({
  image,
  maxSize = 170,
  pixelSize = 4,
  cellWidth,
  cellHeight,
  download
}) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = async () => {
      const zip = new JSZip()
      const template = getTemplate()
      const zippedXml = await zip.loadAsync(template)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const { width, height } = resizeImage(img, maxSize)

      ctx.mozImageSmoothingEnabled = true
      ctx.webkitImageSmoothingEnabled = true
      ctx.msImageSmoothingEnabled = true
      ctx.imageSmoothingEnabled = true
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      const { uniqueColors, recodedImage } = recodeImage(imageData)
      let size
      if (cellWidth && cellHeight) {
        size = { width: cellWidth, height: cellHeight }
      } else {
        size = calculatePixelSize(pixelSize)
      }
      const fills = createFills(uniqueColors)
      const styles = createStyles(uniqueColors)
      const cols = createCols(width, size.width)
      const rows = createRows(recodedImage, width, height, size.height)

      let styleFile = await zippedXml.file('xl/styles.xml').async('string')
      let sheetFile = await zippedXml.file('xl/worksheets/sheet1.xml').async('string')
      styleFile = styleFile.replace('{fills}', fills)
      styleFile = styleFile.replace('{fillsCount}', uniqueColors.length + 2)
      styleFile = styleFile.replace('{styles}', styles)
      styleFile = styleFile.replace('{stylesCount}', uniqueColors.length)
      sheetFile = sheetFile.replace('{cols}', cols)
      sheetFile = sheetFile.replace('{rows}', rows)

      await zip.file('xl/styles.xml', styleFile)
      await zip.file('xl/worksheets/sheet1.xml', sheetFile)

      const zippedFile = await zip.generateAsync({ type: 'blob' })
      if (download) saveAsBlob(zippedFile, 'image.xlsx')
      resolve(zippedFile)
    }
    img.src = image
    img.onerror = err => { throw err }
  })
}

export default imageToXlsx
