const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const config = {
	plugins: [
		autoprefixer,
		cssnano({
			preset: 'advanced'
		})
	]
};

module.exports = config;
