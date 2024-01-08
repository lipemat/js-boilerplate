export interface PackageConfig {
	author?: string;
	brotliFiles: boolean;
	certificates?: Certificates;
	combinedJson: boolean;
	css_folder: string;
	cssTsFiles: boolean;
	dependencies: Dependencies;
	description?: string;
	devDependencies: Dependencies;
	es6Modules?: string[];
	jsPath: string;
	license?: string;
	name?: string;
	packageDirectory: string;
	packageManager?: string;
	resolutions?: Dependencies;
	scripts: Partial<Scripts>;
	shortCssClasses: boolean;
	url: string;
	version?: string;
	workingDirectory: string;
}

export interface Dependencies {
	[ name: string ]: string;
}

export interface Certificates {
	cert: string;
	key: string;
}

export interface Scripts {
	browserslist: string;
	dist: string;
	lint: string;
	postinstall: string;
	start: string;
	test: string;
}

declare const packageConfig: PackageConfig & {
	getPackageConfig: () => PackageConfig;
};
export default packageConfig;
