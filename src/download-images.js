const download = require('image-downloader')

function downloadImages(imagesUrls, dest) {
  const downloads = imagesUrls.map(url => download.image({ url, dest }))
  return Promise.all(downloads)
}

module.exports = downloadImages