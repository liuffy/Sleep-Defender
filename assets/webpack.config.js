var webpack = require('webpack');
var path = require( 'path' );
module.exports = {
    entry: "./js/index.js",
    output: {
        filename: "./js/bundle.js"
    },
    node: {
		fs: 'empty'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				include: path.join(__dirname, 'node_modules', 'pixi.js'),
				loader: 'json',
			},
						{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader'
			}
		]
	}
};