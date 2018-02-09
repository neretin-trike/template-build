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
                }
            ]
        }
    };
};