const config = require( '../config/jest.config' );

// Custom snapshot resolver for the boilerplate.
config.snapshotResolver = './tests/snapshot-resolver.ts';

module.exports = config;
