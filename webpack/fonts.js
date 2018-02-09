module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }
            ]
        }
    };
};