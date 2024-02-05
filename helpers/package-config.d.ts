export interface PackageConfig {
    author?: string;
    brotliFiles: boolean;
    certificates?: Certificates;
    combinedJson: boolean;
    cssTsFiles: boolean;
    css_folder: string;
    default: PackageConfig;
    dependencies: Dependencies;
    description?: string;
    devDependencies: Dependencies;
    es6Modules?: string[];
    getPackageConfig: () => PackageConfig;
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
    [name: string]: string;
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
/**
 * Helper function to get the results of `packageConfig`.
 *
 * - Allows mocking the results of `packageConfig` for testing.
 * - Allows getting the config through a callback instead of an import.
 *
 * @since 10.3.0
 */
export declare function getPackageConfig(): PackageConfig;
