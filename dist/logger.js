"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleLogger = void 0;
const winston_1 = require("winston");
class SimpleLogger {
    constructor(config = {}) {
        const { level = process.env.NODE_ENV === 'production' ? 'info' : 'debug', format: logFormat = 'text', filePath, transports: customTransports, } = config;
        console.log('Logger initialized with level:', level); // Debug output
        const logFormatters = logFormat === 'json'
            ? winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
            : winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`));
        const loggerTransports = customTransports || [new winston_1.transports.Console()];
        if (filePath && !customTransports) {
            loggerTransports.push(new winston_1.transports.File({ filename: filePath }));
        }
        this.logger = (0, winston_1.createLogger)({
            level,
            format: logFormatters,
            transports: loggerTransports,
        });
    }
    info(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    error(message) {
        this.logger.error(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
}
exports.SimpleLogger = SimpleLogger;
