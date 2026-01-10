import {getPackageConfig, type PackageConfig} from '@lipemat/js-boilerplate-shared/helpers/package-config.js';


export {
	/**
	 * @deprecated Use `@lipemat/js-boilerplate-shared` instead.
	 */
	getPackageConfig,
	type PackageConfig,
};

const packageConfig: PackageConfig = getPackageConfig();
export {
	packageConfig as default,
}
