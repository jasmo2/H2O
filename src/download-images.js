const download = require('image-downloader')
const getPercentage = require('./utils')

function downloadImages(imagesUrls, dest) {
  let i = 0
  const imagesUrlsLength = imagesUrls.length
  const downloads = imagesUrls.map(url => {
    console.log('Image downloading', getPercentage(imagesUrlsLength, ++i))
    return download.image({ url, dest })
  })
  return Promise.all(downloads)
}

module.exports = downloadImages