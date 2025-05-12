import { LoggerConfig } from './types';
export declare class SimpleLogger {
    private logger;
    constructor(config?: LoggerConfig);
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
}
