# Image to XLSX Converter

A lightweight browser library for converting JPG and PNG images into XLSX (Excel) files.

It takes an image in Base64-encoded format, resizes it, and creates an Excel file with a spreadsheet containing the image as styled cells.

## Features

* Convert JPG and PNG images to XLSX
* Customize cell size and resolution
* Works entirely in the browser (no server required)
* Supports automatic file download

## Installation

```bash
npm i --save image-to-xlsx
```

## Example

```js
import imageToXlsx from 'image-to-xlsx'

# Read a file from the input

const readFile = fileList => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => { resolve(reader.result) }
    reader.onerror = (error) => { reject(error) }
    reader.readAsDataURL(fileList[0])    
  })
}

const start = async () => {
  const fileList = document.querySelector("input[type=file]").files
  const file = await readFile(fileList)
  imageToXlsx({ image: file })
}

```

## Parameters

The `imageToXlsx` function returns an Excel file as a BLOB and supports the following options

* `image` - [string] Base64-encoded image (JPG or PNG)
* `maxSize` - [integer] Maximum number of cells used for rendering the image
* `pixelSize` - [integer] Approximate pixel size per cell
* `cellWidth` - [decimal] Custom cell width (overrides pixelSize)
* `cellHeight` - [decimal] Custom cell height (overrides pixelSize)
* `download` - [boolean] Whether the file should be automatically downloaded

**Note**. `cellWidth` and `cellHeight` must be set together to override `pixelSize`.

## Demo

Check out a live demo here:

https://image-to-xlsx.web.app/

## Why?

This library was created just for fun!
