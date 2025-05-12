# @getankushtyagi/simple-logger

A simple, customizable logger for Node.js applications built on top of Winston. This library offers a clean interface for logging to console and files with support for text or JSON formats and configurable log levels.

## Installation

Install the package via npm:

```bash
npm install @getankushtyagi/simple-logger
```

Or using yarn:

```bash
yarn add @getankushtyagi/simple-logger
```

## Features

- 📝 Multiple output formats (text, JSON)
- 🔍 Configurable log levels
- 💾 Console and file logging
- ⚙️ Customizable Winston transports
- 🚀 TypeScript support

## Usage

### Basic Logging

```typescript
import { SimpleLogger } from '@getankushtyagi/simple-logger';

const logger = new SimpleLogger({
  level: 'debug',
  format: 'text',
  filePath: 'app.log',
});

logger.info('This is an info message');
logger.error('This is an error message');
logger.debug('This is a debug message');
logger.warn('This is a warning message');
```

**Output in `app.log`**:
```
2025-05-12 13:34:11 [INFO]: This is an info message
2025-05-12 13:34:11 [ERROR]: This is an error message
2025-05-12 13:34:11 [DEBUG]: This is a debug message
2025-05-12 13:34:11 [WARN]: This is a warning message
```

### JSON Format with Log Level Filtering

```typescript
import { SimpleLogger } from '@getankushtyagi/simple-logger';

const logger = new SimpleLogger({
  level: 'error',
  format: 'json',
  filePath: 'error.json.log',
});

logger.info('This info should not appear');
logger.debug('This debug should not appear');
logger.error('This error should appear');
```

**Output in `error.json.log`**:
```json
{"timestamp":"2025-05-12 13:34:11","level":"error","message":"This error should appear"}
```

### Console-only Logging

```typescript
import { SimpleLogger } from '@getankushtyagi/simple-logger';

const logger = new SimpleLogger({
  level: 'info',
  format: 'text',
});

logger.info('This will only log to console');
```

## Configuration

The `SimpleLogger` constructor accepts an optional configuration object with the following properties:

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `level` | `string` | Log level (`error`, `warn`, `info`, `debug`) | `info` (production), `debug` (development) |
| `format` | `'text' \| 'json'` | Output format for logs | `text` |
| `filePath` | `string` | Path to the log file (optional). If omitted, logs only to console | `undefined` |
| `transports` | `winston.transport[]` | Custom Winston transports (optional). Overrides default console/file | `undefined` |

## Log Levels

The logger supports the following Winston log levels (in order of priority):

- `error`: 0
- `warn`: 1
- `info`: 2
- `debug`: 3

Logs with a lower priority than the configured `level` are ignored. For example, setting `level: 'error'` only logs `error` messages.

## Advanced Usage

### Custom Winston Transports

```typescript
import { SimpleLogger } from '@getankushtyagi/simple-logger';
import winston from 'winston';

const customTransport = new winston.transports.Http({
  host: 'logging-service.example.com',
  path: '/logs',
  ssl: true
});

const logger = new SimpleLogger({
  transports: [customTransport]
});

logger.info('This message will be sent to the HTTP endpoint');
```

## Testing

The package includes Jest tests to verify logging functionality. To run tests:

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Ankush Tyagi

---

Made with ❤️ for the Node.js community