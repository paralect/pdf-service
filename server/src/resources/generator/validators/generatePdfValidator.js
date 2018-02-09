const Joi = require('joi');
const baseValidator = require('resources/base.validator');

const schema = Joi.object().keys({
  url: Joi.string().uri(),
  html: Joi.string(),
  options: Joi.object().keys({
    path: Joi.string(),
    scale: Joi.number(),
    displayHeaderFooter: Joi.boolean(),
    headerTemplate: Joi.string(),
    footerTemplate: Joi.string(),
    printBackground: Joi.boolean(),
    landscape: Joi.boolean(),
    pageRanges: Joi.string(),
    format: Joi.string(),
    width: Joi.string(),
    height: Joi.string(),
    margin: Joi.object().keys({
      top: Joi.string(),
      right: Joi.string(),
      bottom: Joi.string(),
      left: Joi.string(),
    }),
  }),
  headers: Joi.object().pattern(/(.*)+/, Joi.string()),
}).or('url', 'html');

module.exports.validate = ctx => baseValidator(ctx, schema, data => data);
