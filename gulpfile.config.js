var GulpConfig = (function () {
    function GulpConfig() {
        this.debug               = './debug/';
        this.dist                = './dist/';
        this.source              = './src/';
        this.testsDir            = './test/';
        this.scss = [
            this.source + "*.scss",
            this.source + "**/*.scss"
        ];
        this.javascript = [
            "!" + this.source + "source.js",
            "!" + this.source + '**/*.test.js',
            this.source + '*.js',
            this.source + '**/*.js'
        ];

    }
    return GulpConfig;
})();
module.exports = GulpConfig;