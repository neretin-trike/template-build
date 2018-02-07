var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.styl$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            }, 
                            {
                                loader: 'stylus-loader'
                            }
                        ]
                    }),
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { 
                                loader: 'css-loader', 
                                options: { 
                                    minimize: true
                                } 
                            }
                        ],
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('css/[name].css'),
        ],
    };
};