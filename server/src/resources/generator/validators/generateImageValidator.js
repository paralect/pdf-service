const Joi = require('joi');
const baseValidator = require('resources/base.validator');

const schema = Joi.object().keys({
  url: Joi.string().uri(),
  html: Joi.string(),
  options: Joi.object().keys({
    path: Joi.string(),
    type: Joi.string().allow('png', 'jpeg').default('png'),
    quality: Joi.number().min(0).max(100),
    fullPage: Joi.boolean(),
    omitBackground: Joi.boolean(),
    clip: Joi.object().keys({
      x: Joi.number(),
      y: Joi.number(),
      width: Joi.number(),
      height: Joi.number(),
    }),
  }),
  headers: Joi.object().pattern(/(.*)+/, Joi.string()),
}).or('url', 'html');

module.exports.validate = ctx => baseValidator(ctx, schema, data => data);
