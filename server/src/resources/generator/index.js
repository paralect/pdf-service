const router = require('koa-router')();
const controller = require('./generator.controller');

router.post('/pdf', controller.generatePdf);
router.post('/image', controller.generateImage);

module.exports = router.routes();
