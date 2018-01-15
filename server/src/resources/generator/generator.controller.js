const generateValidator = require('./validator/generateValidator');

const {getBrowser, closeBrowser, goToPage} = require('infrastructure/browser.helper');

module.exports.generatePdf = async (ctx) => {
  const data = await generateValidator(ctx);

  if (!data.isValid) {
    return;
  }

  ctx.type = 'application/pdf';
  ctx.attachment('out.pdf');

  const {url, html, options, headers} = data;

  const browser = await getBrowser();

  try {
    const page = await goToPage({
      browser,
      headers,
      url: url ? url : `data:text/html,${html}`
    });

    ctx.body = await page.pdf(
      Object.assign({
        printBackground: true,
        margin: {
          top: '0.4in',
          right: '0.4in',
          bottom: '0.4in',
          left: '0.4in',
        },
      }, options),
    );
    await page.close();
  } catch (e) {
    await closeBrowser(browser);
    throw e;
  }
};

module.exports.generateImage = async (ctx) => {
  const data = await generateValidator(ctx);

  if (!data.isValid) {
    return;
  }

  const {url, html, options, headers} = data;

  const imageType = options.type || 'png';

  ctx.type = `image/${imageType}`;
  ctx.attachment(`out.${imageType}`);

  const browser = await getBrowser();

  try {
    const page = await goToPage({
      browser,
      headers,
      url: url ? url : `data:text/html,${html}`
    });

    ctx.body = await page.screenshot({
      fullPage: true
    }, options);

    await page.close();
  } catch (e) {
    await closeBrowser(browser);
    throw e;
  }
};