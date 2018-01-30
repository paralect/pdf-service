const fs = require('./promiseFs');
const path = require('path');
const fetchService = require('./fetchService');
const PassThrough = require('stream').PassThrough;
const logger = require('./logger');
const Handlebars = require('handlebars');

const compileHtml = (html, templateSystem) => {
  const {
    params = {},
    helpers = {},
    partials = {},
  } = templateSystem;

  Object.keys(helpers).forEach((helperName) => {
    Handlebars.registerHelper(helperName, helpers[helperName](Handlebars));
  });

  Object.keys(partials).forEach((partialName) => {
    Handlebars.registerPartial(partialName, partials[partialName]);
  });

  const compiledHtml = Handlebars.compile(html);
  return compiledHtml(params);
};

const readFile = async (filePath, templateSystem) => {
  try {
    const html = (await fs.readFile(filePath)).toString('binary');

    return compileHtml(html, templateSystem);
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When read file');
    throw err;
  }
};

const getPdf = (html, pdfOptions, headers, serverUrl) => {
  try {
    return fetchService.fetchPdf(html, pdfOptions, headers, serverUrl);
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When get pdf file');
    throw err;
  }
};

const getImg = (html, pdfOptions, headers, serverUrl) => {
  try {
    return fetchService.fetchImage(html, pdfOptions, headers, serverUrl);
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When get pdf file');
    throw err;
  }
};


const writePdf = async (outPdf, pdfStream) => {
  try {
    return new Promise((resolve, reject) => {
      return pdfStream
        .pipe(fs.__fs.createWriteStream(path.resolve(outPdf)))
        .on('finish', resolve)
        .on('error', reject);
    });
  } catch (err) {
    logger.error('Something irreparable happened !!!\n', 'When write pdf to file');
    throw err;
  }
};

const isProdHtmlExists = (htmlPath) => {
  return fs.exists(htmlPath);
};

const getStaticFileFromHtml = async ({
  outPaths,
  options,
  headers,
  templateSystem,
  serverUrl,
  type,
  mode = 'development',
  watch,
}) => {
  const { htmlPath, staticFilePath } = outPaths;
  const html = await readFile(htmlPath, templateSystem);

  if (options.headerTemplate) {
    Object.assign(options, { headerTemplate: compileHtml(options.headerTemplate, templateSystem) });
  }

  if (options.footerTemplate) {
    Object.assign(options, { footerTemplate: compileHtml(options.footerTemplate, templateSystem) });
  }

  if (watch) {
    await fs.writeFile(htmlPath, html);
  }

  logger.debug('HTML BODY', html);
  logger.debug('HTML OPTIONS', options);

  let pdfStream = type === 'pdf'
    ? getPdf(html, options, headers, serverUrl)
    : getImg(html, options, headers, serverUrl);

  if (mode === 'development') {
    await writePdf(staticFilePath, pdfStream);
    pdfStream = fs.__fs.createReadStream(staticFilePath);

    return pdfStream;
  }

  return pdfStream.pipe((PassThrough()));
};


const getStaticFileByContent = async ({
  content,
  options,
  headers,
  templateSystem,
  serverUrl,
  type,
}) => {
  const html = compileHtml(content, templateSystem);

  if (options.headerTemplate) {
    Object.assign(options, { headerTemplate: compileHtml(options.headerTemplate, templateSystem) });
  }

  if (options.footerTemplate) {
    Object.assign(options, { footerTemplate: compileHtml(options.footerTemplate, templateSystem) });
  }

  logger.debug('HTML BODY', html);
  logger.debug('HTML OPTIONS', options);

  const pdfStream = type === 'pdf'
    ? getPdf(html, options, headers, serverUrl)
    : getImg(html, options, headers, serverUrl);

  return pdfStream.pipe((PassThrough()));
};

module.exports = { getStaticFileFromHtml, isProdHtmlExists, getStaticFileByContent };
