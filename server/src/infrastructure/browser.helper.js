const puppeteer = require('puppeteer');

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

const goToPage = async ({browser, url, headers}) => {
  const page = await browser.newPage();

  if (headers && Object.keys(headers).length) {
    await page.setExtraHTTPHeaders(headers);
  }

  await page.goto(url, {
    waitUntil: 'networkidle',
    timeout: 100000,
  });
  await page.emulateMedia('screen');

  return page
};

module.exports = {
  getBrowser,
  closeBrowser,
  goToPage
};