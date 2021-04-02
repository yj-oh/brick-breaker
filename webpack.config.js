const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './js/intro.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname + '/build'),
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.png/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({ template: './index.html' }),
	],
};
