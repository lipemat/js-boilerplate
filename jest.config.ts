const config = require( './config/jest.config.ts' );
config.testEnvironment = 'node';

// Custom snapshot resolver for the boilerplate.
config.snapshotResolver = './tests/snapshot-resolver.ts';

module.exports = config;
