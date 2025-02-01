const getExcelColumnName = (index) => {
  let result = ''
  while (index > 0) {
    const remainder = (index - 1) % 26
    result = String.fromCharCode(65 + remainder) + result
    index = Math.floor((index - 1) / 26)
  }
  return result
}

export default getExcelColumnName
