exports.logger = {
	log(...args) {
		console.log('[JS Code Insights]', ...args);
	},
	error(...args) {
		console.error('[JS Code Insights]', ...args);
	},
};
