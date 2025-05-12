import winston, { createLogger, format, transports } from 'winston';
import { LoggerConfig } from './types';

export class SimpleLogger {
  private logger: winston.Logger;

  constructor(config: LoggerConfig = {}) {
    const {
      level = process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: logFormat = 'text',
      filePath,
      transports: customTransports,
    } = config;

    console.log('Logger initialized with level:', level); // Debug output

    const logFormatters = logFormat === 'json'
      ? format.combine(format.timestamp(), format.json())
      : format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
        );

    const loggerTransports: winston.transport[] = customTransports || [new transports.Console()];
    if (filePath && !customTransports) {
      loggerTransports.push(new transports.File({ filename: filePath }));
    }

    this.logger = createLogger({
      level,
      format: logFormatters,
      transports: loggerTransports,
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}