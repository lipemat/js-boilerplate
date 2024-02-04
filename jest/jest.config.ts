import config from '../config/jest.config';

// Custom snapshot resolver for the boilerplate.
config.snapshotResolver = require.resolve( './snapshot-resolver.ts' );

export default config;
