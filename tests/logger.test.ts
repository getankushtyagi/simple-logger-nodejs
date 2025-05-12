import { SimpleLogger } from '../src';

describe('SimpleLogger', () => {
  let logger: SimpleLogger;

  beforeEach(() => {
    logger = new SimpleLogger({ level: 'debug', format: 'text' });
  });

  it('should log info messages', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.info('Test info message');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test info message'));
    spy.mockRestore();
  });

  it('should log error messages', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.error('Test error message');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test error message'));
    spy.mockRestore();
  });

  it('should respect log level', () => {
    logger = new SimpleLogger({ level: 'error' });
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.debug('Test debug message');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});