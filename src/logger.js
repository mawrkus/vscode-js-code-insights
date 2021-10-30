exports.logger = {
	log(...args) {
		console.log('[JS Word Counter]', ...args);
	},
	error(...args) {
		console.error('[JS Word Counter]', ...args);
	},
};
