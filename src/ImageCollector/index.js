'use strict';

const downloadImages = require('../download-images')
const { PHOTOS_CLASS } = require('../constants')

module.exports = class ImageCollector {
  constructor(props) {
    this.state = {
      page: props.page
    }
  }

  async getImages() {
    const { page } = this.state;
    try {
      const imgTags = await page.$$eval(PHOTOS_CLASS, imgTags => {
        return imgTags.length
      })

      console.log('imgTags', imgTags)
      return imgTags
    } catch (err) {
      console.error(err)
    }
  }
}
