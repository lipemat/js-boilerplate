import crypto from 'node:crypto';
import {Compilation, type Compiler, WebpackPluginInstance} from 'webpack';
import type {AssetsStorage, WebpackAssetsManifest} from 'webpack-assets-manifest';

/**
 * Webpack plugin for injecting the content hash into
 * the manifest.json created by the `webpack-assets-manifest` plugin.
 */
class WebpackAssetsHash implements WebpackPluginInstance {
	private readonly manifest: WebpackAssetsManifest;
	private readonly assets: { [ key: string ]: string } = {};

	/**
	 * Pass the same constructed plugin provide to Webpack via
	 * the `webpack.dist` script.
	 */
	constructor( manifest: WebpackAssetsManifest ) {
		this.manifest = manifest;
	}

	/**
	 * WebPack plugin entrypoint.
	 *
	 * @link https://webpack.js.org/contribute/writing-a-plugin/
	 */
	apply( compiler: Compiler ) {
		this.manifest.hooks.transform.tap( 'WebpackAssetsHash', this.addHashToManifest.bind( this ) );

		compiler.hooks.thisCompilation.tap( 'WebpackAssetsHash', compilation => {
			compilation.hooks.processAssets.tap(
				{
					name: 'WebpackAssetsHash',
					stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
				},
				this.storeContentHash.bind( this, compilation ),
			);
		} );
	}

	/**
	 * Store the content hash of each asset in this class, so we
	 * can inject it into the manifest.json file.
	 *
	 * Hash matches Webpack [contenthash].
	 */
	storeContentHash( compilation: Compilation ) {
		for ( const asset of compilation.getAssets() ) {
			this.assets[ asset.name ] = crypto.createHash( 'md5' )
				.update( asset.source.source() )
				.digest( 'hex' )
				.substring( 0, 20 );
		}
	}

	/**
	 * Inject the `hash` of the content into the manifest.json
	 * file generated by webpack-assets-manifest.
	 *
	 * @param {Object} assets
	 */
	addHashToManifest( assets: AssetsStorage ): AssetsStorage {
		Object.keys( assets ).forEach( ( item: string ): void => {
			if ( item in this.assets && this.assets[ item ] !== '' ) {
				assets[ item ].hash = this.assets[ item ];
			} else if ( assets[ item ].src in this.assets && this.assets[ assets[ item ].src ] !== '' ) {
				// If the content hash was added to the asset name before storing.
				assets[ item ].hash = this.assets[ assets[ item ].src ];
			}
		} );
		return assets;
	}
}

module.exports = WebpackAssetsHash;
export default WebpackAssetsHash;
