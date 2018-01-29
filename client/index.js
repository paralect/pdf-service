const webpackTask = require('./lib/webpackTask');

const validate = require('./lib/validate');
const { getStaticFileFromHtml, isProdHtmlExists, getStaticFileByContent } = require('./lib/api');
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
      templateSystem = {},
    } = params;

    try {
      const paths = await validate({ pagePath });
      const { htmlPath, staticFilePath } = paths.resultOutput;

      if (this.mode === 'development' || !(await isProdHtmlExists(htmlPath))) {
        await webpackTask.build({ paths });
      }

      return getStaticFileFromHtml({
        outPaths: { htmlPath, staticFilePath: `${staticFilePath}.pdf` },
        options: pdfOptions,
        headers,
        type: 'pdf',
        templateSystem,
        serverUrl: this.serverUrl,
        mode: this.mode,
      });
    } catch (err) {
      logger.error(err.message, err.stack);
      logger.error('Fatal error happened => exit');

      return null;
    }
  }


  async generatePdfByContent(content, params) {
    const {
      pdfOptions = {},
      headers = {},
      templateSystem = {},
    } = params;

    try {
      return getStaticFileByContent({
        options: pdfOptions,
        headers,
        type: 'pdf',
        templateSystem,
        content,
        serverUrl: this.serverUrl,
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
      templateSystem = {},
    } = params;

    try {
      const paths = await validate({ pagePath });
      const { htmlPath, staticFilePath } = paths.resultOutput;

      if (this.mode === 'development' || !(await isProdHtmlExists(htmlPath))) {
        await webpackTask.build({ paths });
      }

      return getStaticFileFromHtml({
        outPaths: { htmlPath, staticFilePath: `${staticFilePath}.${imgOptions.type || 'png'}` },
        options: imgOptions,
        headers,
        templateSystem,
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


  async generateImageByContent(content, params) {
    const {
      imgOptions = {},
      headers = {},
      templateSystem = {},
    } = params;

    try {
      return getStaticFileByContent({
        options: imgOptions,
        headers,
        templateSystem,
        content,
        type: imgOptions.type || 'png',
        serverUrl: this.serverUrl,
      });
    } catch (err) {
      logger.error(err.message, err.stack);
      logger.error('Fatal error happened => exit');

      return null;
    }
  }

  async watch(pagePath, params) {
    const {
      templateSystem = {},
      pdfOptions = {},
    } = params;

    try {
      const paths = await validate({ pagePath });
      const watchParams = {
        paths,
        options: pdfOptions,
        templateSystem,
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
