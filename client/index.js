const webpackTask = require('./lib/webpackTask');

const validate = require('./lib/validate');
const { getStaticFileFromHtml, isProdHtmlExists } = require('./lib/api');
const logger = require('./lib/logger');

const opn = require('opn');

process.on('unhandledRejection', (err) => {
  logger.error(err);
});

module.exports = class PdfService {
  constructor({ serverUrl = 'http://localhost:3000', mode }) {
    this.serverUrl = serverUrl;
    this.mode = mode === 'production' ? 'production' : 'development';
  }

  async generatePdf(pagePath, params) {
    const {
      pdfOptions = {},
      headers = {},
      templateParams = {},
      templateHelpers = {},
    } = params;

    try {
      const paths = await validate({ pagePath });
      const { htmlPath, staticFilePath } = paths.resultOutput;

      if (this.mode === 'development' || !(await isProdHtmlExists(htmlPath))) {
        await webpackTask.build({ paths });
      }

      return getStaticFileFromHtml({
        outPaths: { htmlPath, staticFilePath: `${staticFilePath}.pdf` },
        pdfOptions,
        headers,
        type: 'pdf',
        templateParams,
        templateHelpers,
        serverUrl: this.serverUrl,
        mode: this.mode,
      });
    } catch (err) {
      logger.error(err.message, err.stack);
      logger.error('Fatal error happened => exit');

      return null;
    }
  }

  async generateImage(pagePath, params) {
    const {
      imgOptions = {},
      headers = {},
      templateParams = {},
      templateHelpers = {},
    } = params;

    try {
      const paths = await validate({ pagePath });
      const { htmlPath, staticFilePath } = paths.resultOutput;

      if (this.mode === 'development' || !(await isProdHtmlExists(htmlPath))) {
        await webpackTask.build({ paths });
      }

      return getStaticFileFromHtml({
        outPaths: { htmlPath, staticFilePath: `${staticFilePath}.${imgOptions.type || 'png'}` },
        imgOptions,
        headers,
        templateParams,
        templateHelpers,
        type: imgOptions.type || 'png',
        serverUrl: this.serverUrl,
        mode: this.mode,
      });
    } catch (err) {
      logger.error(err.message, err.stack);
      logger.error('Fatal error happened => exit');

      return null;
    }
  }

  async watch(pagePath, params) {
    const {
      templateParams = {},
      templateHelpers = {},
      pdfOptions = {},
    } = params;

    try {
      const paths = await validate({ pagePath });
      const watchParams = {
        paths,
        pdfOptions,
        templateParams,
        templateHelpers,
        serverUrl: this.serverUrl,
        mode: this.mode,
        buildPdf: getStaticFileFromHtml,
      };

      const { htmlPath } = await webpackTask.watch(watchParams);

      opn(htmlPath);
    } catch (err) {
      logger.error(err);
      logger.error('Fatal error happened => exit');
    }
  }
};
