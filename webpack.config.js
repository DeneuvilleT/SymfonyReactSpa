const Encore = require('@symfony/webpack-encore');


if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .addEntry('app', './assets/react/index.js')
    .addStyleEntry('styles', './assets/styles/styles.scss')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

   
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    .enableSassLoader()
    .enableReactPreset()
;

module.exports = Encore.getWebpackConfig();
