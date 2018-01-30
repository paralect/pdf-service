const createConsoleLogger = require('@paralect/common-logger').createConsoleLogger;

module.exports = createConsoleLogger({ isDev: process.env.DEBUG === 'true' });
