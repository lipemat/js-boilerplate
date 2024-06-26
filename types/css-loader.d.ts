/**
 * No public types available.
 *
 * @link https://webpack.js.org/loaders/css-loader/#options
 */
declare module 'css-loader' {
	import type {LoaderContext} from 'webpack';

	export type Mode = 'local' | 'global' | 'pure' | 'icss';

	export type ResourcePath = LoaderContext<{
		resourcePath: string
	}>;

	export type GetLocalIdent = ( context: ResourcePath, localIdentName: string, localName: string ) => string;

	export type Modules =
		| boolean
		| 'local'
		| 'global'
		| 'pure'
		| 'icss'
		| {
		auto: boolean | RegExp | ( ( resourcePath: string ) => boolean );
		mode: Mode | ( ( resourcePath: string ) => Mode );
		localIdentName: string;
		localIdentContext: string;
		localIdentHashSalt: string;
		localIdentHashFunction: string;
		localIdentHashDigest: string;
		localIdentRegExp: string | RegExp;
		getLocalIdent: GetLocalIdent;
		namedExport: boolean;
		exportGlobals: boolean;
		exportLocalsConvention:
			| 'asIs'
			| 'camelCase'
			| 'camelCaseOnly'
			| 'dashes'
			| 'dashesOnly'
			| ( ( name: string ) => string );
		exportOnlyLocals: boolean;
		getJSON: ( {
			resourcePath,
			imports,
			exports,
			replacements,
		}: {
			resourcePath: string;
			imports: object[];
			exports: object[];
			replacements: object[];
		} ) => Promise<void> | void;
	};

	type Base = {
		importLoaders?: number;
		sourceMap?: boolean;
		url?: boolean | {
			filter: ( url: string, resourcePath: string ) => boolean;
		};
		importFn?: boolean | {
			filter: (
				url: string,
				media: string,
				resourcePath: string,
				supports?: string,
				layer?: string,
			) => boolean;
		};
		esModule?: boolean;
	};


	type CssStyleSheetExport = Base & {
		exportType?: 'css-style-sheet' | 'string';
		modules?: Partial<Modules> & {
			exportLocalsConvention: 'camelCaseOnly' | 'dashesOnly'
		};
	};

	type ArrayExport = Base & {
		exportType?: 'array';
		modules: Partial<Modules>
	};

	export type Config = CssStyleSheetExport | ArrayExport;
}
