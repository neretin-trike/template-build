module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test : /\.styl$/, 
                    loader: 'style-loader!css-loader!stylus-loader',
                    exclude: /node_modules/
                }
            ]
        }
    };
};