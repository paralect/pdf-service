#!/usr/bin/env node
const PdfService = require('./index');
const commandLineArgs = require('command-line-args');
const path = require('path');

const optionDefinitions = [
  { name: 'pagePath', type: String, alias: 'p', defaultOption: `${__dirname}/index.html` },
  { name: 'serverUrl', alias: 'u', type: String },
  { name: 'templateParams', alias: 't', type: String },
  { name: 'templateHelpers', alias: 'h', type: String },
];

const options = commandLineArgs(optionDefinitions);

options.templateSystem = {};

if (options.templateParams) {
  options.templateSystem.params = require(path.resolve(options.templateParams)); // eslint-disable-line
}

if (options.templateHelpers) {
  options.templateSystem.helpers = require(path.resolve(options.templateHelpers)); // eslint-disable-line
}

const pdfService = new PdfService(options);

pdfService.watch(options.pagePath, options);
