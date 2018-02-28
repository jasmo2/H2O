const puppeteer = require('puppeteer')
const ImageCollector = require('./src/ImageCollector')
const { URL }  = require('./src/constants')


async function main () {
  const browser = await puppeteer.launch({
    args: ['--disable-dev-shm-usage']
  })
  const page = await browser.newPage()
  await page.goto(URL)
  const imageCollector = new ImageCollector({page})
  // await imageCollector.getImages()
  await imageCollector.convertImages()
  await browser.close()
}

main()