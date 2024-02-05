import type {TransformOptions} from '@babel/core';

export type BabelConfig = Pick<BabelFull, 'presets' | 'plugins' | 'cacheDirectory'>;
export type BabelFull = Partial<TransformOptions> & BabelLoader;
/**
 * @link https://webpack.js.org/loaders/babel-loader/#options
 */
export type BabelLoader = {
    cacheDirectory?: boolean | string;
    cacheIdentifier?: string;
    cacheCompression?: boolean;
    customize?: string;
    metadataSubscribers?: string[];
};
declare const babelConfig: BabelConfig;
export default babelConfig;
