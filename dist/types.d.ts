import { transport } from 'winston';
export interface LoggerConfig {
    level?: string;
    format?: 'json' | 'text';
    filePath?: string;
    transports?: transport[];
}
