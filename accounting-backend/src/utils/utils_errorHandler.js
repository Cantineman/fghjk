const logger = require('./logger');

module.exports = (err, req, res, next) {
  logger.error(`${err.message} - ${req.path} - ${req.ip}`);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    code: status,
  });
};