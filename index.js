const puppeteer = require('puppeteer')

const CONSTANTS = require('./src/constants')

// const platform = require('./src/platform')
const {URL, PHOTOS_CLASS}  = CONSTANTS


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();