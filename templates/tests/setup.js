import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Mock environmental variables
global.__TEST__ = true;
window.CORE_CONFIG = {
	endpoint: 'http://starting-point.loc/wp-json/'
};
