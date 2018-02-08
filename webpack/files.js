module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg)$/,
                    use: [
                        'file-loader?name=images/[name].[ext]',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.(mp3|wav)$/,
                    loader: 'file-loader?name=music/[name].[ext]'
                }
            ]
        }
    };
};