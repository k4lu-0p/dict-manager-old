var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');


Encore

    .setOutputPath('public/build/')
    .setPublicPath('/build')
    //.setManifestKeyPrefix('build/')

    // Activer SASS
    .enableSassLoader()
    // Activer TS
    .enableTypeScriptLoader()
    // Activer Vue.Js
    // .enableVueLoader()
    // Activer jQuery
    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    })

    .addEntry('app', './assets/js/layout.js')

    .addPlugin(new CopyWebpackPlugin([{
        from: './assets/static',
        to: 'images'
    }]))

    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())



;

// Use polling instead of inotify
const config = Encore.getWebpackConfig();
config.watchOptions = {
    poll: true,
};

// Export the final configuration
module.exports = config;