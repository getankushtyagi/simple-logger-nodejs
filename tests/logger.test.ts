import { SimpleLogger } from '../src';
import winston, { transport } from 'winston';
import Transport from 'winston-transport';
import path from 'path';

// Custom transport to capture logs for testing
class TestTransport extends Transport {
  public logs: { level: string; message: string }[] = [];

  constructor(opts?: any) {
    super(opts);
    this.level = opts?.level; // Respect the level passed to the transport
  }

  log(info: any, callback: () => void) {
    if (this.level && winston.config.npm.levels[info.level] > winston.config.npm.levels[this.level]) {
      return callback(); // Skip logs below the transport's level
    }
    this.logs.push({ level: info.level, message: info.message });
    callback();
  }
}

describe('SimpleLogger', () => {
  let logger: SimpleLogger;
  let testTransport: TestTransport;
  const logFilePath = path.join(__dirname, 'test.log');
  beforeEach(() => {
    testTransport = new TestTransport({ level: 'debug' });
    logger = new SimpleLogger({
      level: 'debug',
      format: 'text',
      filePath: logFilePath,
      transports: [testTransport],
    });
    testTransport.logs = []; // Clear logs
  });

  it('should log info messages', () => {
    logger.info('Test info message');
    expect(testTransport.logs).toContainEqual({
      level: 'info',
      message: 'Test info message',
    });
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(testTransport.logs).toContainEqual({
      level: 'error',
      message: 'Test error message',
    });
  });

  it('should respect log level', () => {
    testTransport = new TestTransport({ level: 'error' }); // Set transport level to error
    logger = new SimpleLogger({
      level: 'error',
      format: 'text',
      transports: [testTransport],
    });
    testTransport.logs = []; // Clear logs
    logger.debug('Test debug message');
    console.log('Logs after debug:', testTransport.logs); // Debug output
    expect(testTransport.logs).toEqual([]); // Expect no logs
  });
});