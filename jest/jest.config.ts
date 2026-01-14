import config from '../config/jest.config.js';
import type {Config} from 'jest';
import {resolve} from 'path';

const adjustedConfig: Config = {
	...config,
	// Custom snapshot resolver for the boilerplate.
	snapshotResolver: resolve( './jest/snapshot-resolver.cjs' ),

	// Enable ESM support for TypeScript files.
	extensionsToTreatAsEsm: [ '.ts', '.tsx', '.mts' ],

	moduleNameMapper: {
		...config.moduleNameMapper,
	},
};

export default adjustedConfig;
