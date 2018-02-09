module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg)$/,
                    use: [
                        'file-loader?name=images/[name].[ext]',
                    ],
                }
            ]
        }
    };
};