import {getPackageConfig, type PackageConfig} from '@lipemat/js-boilerplate-shared';


export {
	/**
	 * @deprecated Use `@lipemat/js-boilerplate-shared` instead.
	 */
	getPackageConfig,
	type PackageConfig,
};

const packageConfig: PackageConfig = getPackageConfig();
packageConfig.getPackageConfig = getPackageConfig;

packageConfig.default = packageConfig;
module.exports = packageConfig;
