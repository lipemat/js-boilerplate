import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

require( 'unfetch/polyfill' ); // So we can use window.fetch.

configure( {adapter: new Adapter()} );

// Mock environmental variables
global.__TEST__ = true;
window.CORE_CONFIG = {
	endpoint: 'http://starting-point.loc/wp-json/',
};
