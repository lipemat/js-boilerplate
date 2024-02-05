/**
 * @todo convert the source to TS.
 */

import type {BabelConfig} from '../src/babel.config';

export function getBrowsersList(): readonly string[];

export function getConfig( fileName: 'babel.config' ): BabelConfig;
export function getConfig<T extends object>( fileName: string ): T;
