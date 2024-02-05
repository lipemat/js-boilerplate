import type {Config} from 'jest';

export type JestConfig = Pick<Config, 'globals' | 'moduleNameMapper' | 'roots' | 'testEnvironment' | 'testEnvironmentOptions' | 'transform' | 'transformIgnorePatterns' | 'setupFilesAfterEnv'>;
declare const jestConfig: Config;
export default jestConfig;
