module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                    options:{
                        name: 'images/[name].[ext]'
                    },
                    loader: 'file-loader?name=app/assets/[name].[ext]'
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    options:{
                        name: 'fonts/[name].[ext]'
                    },
                    loader: 'file-loader?name=app/assets/[name].[ext]'
                },
                {
                    test: /\.(mp3|wav)$/,
                    options:{
                        name: 'music/[name].[ext]'
                    },
                    loader: 'file-loader?name=app/assets/[name].[ext]'
                }
            ]
        }
    };
};