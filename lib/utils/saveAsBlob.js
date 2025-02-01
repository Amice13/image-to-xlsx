const downloadURL = (data, fileName) => {
  const a = document.createElement('a')
  a.href = data
  a.download = fileName
  a.style = 'display: none'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const downloadBlob = (data, fileName, mimeType) => {
  const blob = new Blob([data], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  downloadURL(url, fileName)
  setTimeout(() => { return window.URL.revokeObjectURL(url) }, 100)
}

export default downloadBlob
