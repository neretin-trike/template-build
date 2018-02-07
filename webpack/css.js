module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test : /\.css$/, 
                    loader: 'style-loader!css-loader'
                }
            ]
        }
    };
};