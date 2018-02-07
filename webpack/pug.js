module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(pug|jade)$/, 
                    exclude: /node_modules/,
                    options: {
                        pretty: true
                    },
                    loader: 'pug-loader'                    
                }
            ]
        }
    };
};