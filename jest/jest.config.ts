import config from '../config/jest.config';
import type {Config} from 'jest';

const adjustedConfig: Config = {
	...config,
	// Custom snapshot resolver for the boilerplate.
	snapshotResolver: require.resolve( './snapshot-resolver.ts' ),

	moduleNameMapper: {
		...config.moduleNameMapper,

		// A temporary workaround for the shared package being a symlink.
		// @todo remove once the shared package is published.
		'^@lipemat/js-boilerplate-shared$': '<rootDir>/../../js-boilerplate-shared/index.ts',
	},
};

export default adjustedConfig;
