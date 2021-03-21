import fs from 'fs';
import winston from 'winston';

const logDir = 'src/log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.simple(),
      ),
      level: 'info',
    }),
    /* eslint-disable global-require */
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-results.log`,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    /* eslint-enable global-require */
    new winston.transports.File({
      filename: 'src/log/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
    }),
  ],
});

export { logger as default };
