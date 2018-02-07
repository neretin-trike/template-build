module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                    options:{
                        name: 'dist/images/[name].[ext]'
                    },
                    loader: 'file-loader?name=app/assets/[name].[ext]'
                }
            ]
        }
    };
};