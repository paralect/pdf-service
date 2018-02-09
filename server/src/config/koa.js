const cors = require('kcors');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const requestLogger = require('koa-logger');
const validate = require('koa-validate');

const logger = global.logger;
const routes = require('./routes');

const getArray = (obj) => {
  if (!obj) {
    return [];
  }

  if (obj instanceof Array) {
    return obj;
  }

  return [obj];
};


module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(requestLogger());
  app.use(bodyParser({
    enableTypes: ['json', 'text'],
    jsonLimit: '2GB' },
  ));

  validate(app);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      if (ctx.status < 400 || ctx.status >= 500) {
        logger.error(err);
        ctx.body = {
          errors: [{ _global: 'An error has occurred' }],
        };
        ctx.app.emit('error', err, ctx);
      } else {
        const errors = getArray(ctx.errors);

        const { message } = err;
        const messages = Object.keys(err).map(key => ({ [key]: err[key] }));

        if (!ctx.body) {
          if (errors.length + messages.length) {
            ctx.body = {
              errors: [...errors, ...messages],
            };
          } else {
            ctx.body = message;
          }
        }

        logger.error(ctx.body);
      }
    }
  });

  routes(app);
};
