'use strict';

const downloadImages = require('../download-images')
const { PHOTOS_CLASS } = require('../constants')

module.exports = class ImageCollector {
  constructor(props) {
    this.state = {
      page: props.page
    }
  }

  imgElements(el, PHOTOS_CLASS) {
    return el.querySelector(PHOTOS_CLASS)
  }

  async getImages() {
    const { page } = this.state
    try {
      const imgTagsHash = await page.$$eval(PHOTOS_CLASS, imgTags =>
        imgTags.map(img => img.parentNode.href)
      )
      console.log('imgTags', imgTagsHash)
      return imgTagsHash
    } catch (err) {
      console.error(err)
    }
  }
}
