const mount = require('koa-mount');
const generatorService = require('resources/generator');

module.exports = (app) => {
  app.use(mount('/', generatorService));
};
