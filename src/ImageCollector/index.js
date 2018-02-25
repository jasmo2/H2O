'use strict';
const mkdirp = require('mkdirp-promise')
const downloadImages = require('../download-images')
const getPercentaje = require('../utils')

const {
  DESTINATION,
  PAGINATION_LINKS,
  PHOTOS_CLASS
} = require('../constants')

module.exports = class ImageCollector {
  constructor(props) {
    const { page } = props
    this.state = {
      imgsUrls: null,
      imgsTags: null,
      page,
      paginationLinks: this.getPages(page)
    }
  }

  async getPages(page) {
    const paginationLinks = await page.$$eval(PAGINATION_LINKS, links =>
      links.map(link => link.href)
    )
    return paginationLinks
  }

  async getImages() {
    const { page } = this.state
    try {
      console.log('Getting Images Nodes ...')
      this.state.imgsTags = await this.getImgTags()
      console.log('Got images Nodes', this.state.imgsTags.length)
      console.log('Getting Images Links ...')
      this.state.imgsUrls = await this.getImgLinks()
      console.log('Got images Links', this.state.imgsUrls.length)
      console.log('Saving images ...')
      await mkdirp(DESTINATION)
      await downloadImages(this.state.imgsUrls, DESTINATION)
      console.log('Done!!! Enjoy!!! 🏴‍☠️')
    } catch (err) {
      console.error(err)
    }
  }

  async getImgLinks() {
    const { imgsTags, page } = this.state
    try {
      let imgLinksHash = []
      const _imgsTags = await imgsTags
      let i = 0
      for (const imgsTagsLink of _imgsTags) {
        await page.goto(imgsTagsLink)
        const imgHandle = await page.$(PHOTOS_CLASS)
        const imgLink = await page.evaluate(imgTag => imgTag.src, imgHandle)
        imgLinksHash = imgLinksHash.concat(imgLink)
        console.log(getPercentaje(_imgsTags.length, ++i))
        await imgHandle.dispose()
      }

      return imgLinksHash

    } catch (err) {
      console.error(err)
    }
  }
  async getImgTags() {
    const { paginationLinks, page } = this.state
    try {
      let imgTagsHash = []
      for (const link of await paginationLinks) {
        await page.goto(link)
        const imgPageTags = await page.$$eval(PHOTOS_CLASS, imgTags =>
          imgTags.map(img => img.parentNode.href)
        )
        imgTagsHash = imgTagsHash.concat(imgPageTags)
      }

      return imgTagsHash

    } catch (error) {
      console.error(error)
    }
  }
}
