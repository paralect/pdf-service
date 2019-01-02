const puppeteer = require('puppeteer');
const logger = require('logger');

let browserPromise;

const getBrowser = () => {
  if (browserPromise) {
    return browserPromise;
  }

  browserPromise = puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
    ],
  });

  return browserPromise;
};

const closeBrowser = (browser) => {
  if (!browser || !browserPromise) {
    return Promise.resolve();
  }

  browserPromise = null;
  return browser.close();
};

const goToPage = async ({ browser, url, headers }) => {
  const page = await browser.newPage();

  if (headers && Object.keys(headers).length) {
    await page.setExtraHTTPHeaders(headers);
  }

  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 100000,
  });
  await page.emulateMedia('screen');

  page.on('console', (...args) => logger.debug('PAGE LOG:', ...args));

  page.on('error', (err) => {
    logger.error(`Error event emitted: ${err}`);
    logger.error(err.stack);
    closeBrowser(browser);
  });

  return page;
};

module.exports = {
  getBrowser,
  closeBrowser,
  goToPage,
};
