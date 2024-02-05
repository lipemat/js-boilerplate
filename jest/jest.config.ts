import config from '../config/jest.config';
import type {Config} from 'jest';

const adjustedConfig: Config = {
	...config,
	// Custom snapshot resolver for the boilerplate.
	snapshotResolver: require.resolve( './snapshot-resolver.ts' ),
};

export default adjustedConfig;
