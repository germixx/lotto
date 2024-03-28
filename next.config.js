module.exports = function (webpackEnv) {
    // ...
    return {
        // ...
        resolve: {
            // ...
            fallback: {
                "net": false,
            }
        }
    }
}