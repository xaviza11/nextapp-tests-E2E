const puppeteer = require('puppeteer');
const { host, headless } = require('./scrape.config');

let browser;

async function startBrowser() {
  browser = await puppeteer.launch({headless: headless});
}

async function closeBrowser() {
  await browser.close();
}

async function openPage(pageUrl) {
  if (!browser) throw new Error('Browser is not initialized. Call startBrowser() first.');
  if (typeof pageUrl !== 'string') throw new Error('Page URL must be a string');

  const page = await browser.newPage();
  await page.goto(host + pageUrl);
  return page;
}

async function clickElement(id, page) {
  if (!browser) throw new Error('Browser is not initialized. Call startBrowser() first.');
  if (!(page instanceof puppeteer.Page)) throw new Error('Invalid page instance');
  if (typeof id !== 'string') throw new Error('Selector must be a string');

  await page.waitForSelector(id);
  await page.click(id);
  const htmlAfterClick = await page.content();
  return htmlAfterClick;
}

async function typeInInput(selector, text, page) {
  if (!browser) throw new Error('Browser is not initialized. Call startBrowser() first.');
  if (!(page instanceof puppeteer.Page)) throw new Error('Invalid page instance');
  if (typeof selector !== 'string') throw new Error('Selector must be a string');
  if (typeof text !== 'string') throw new Error('Text must be a string');

  await page.waitForSelector(selector);
  await page.type(selector, text);
  const inputValue = await page.$eval(selector, el => el.value);
  return inputValue;
}

async function extractElement(page, id) {
  const extractedElement = await page.$(id)
  const content = await extractedElement.evaluate(element => element.outerHTML);
  return content
}

module.exports = { startBrowser, openPage, closeBrowser, clickElement, typeInInput, extractElement };
