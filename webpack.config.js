const Encore = require("@symfony/webpack-encore");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")

  .addEntry("app", "./assets/react/index.js")
  .addStyleEntry("styles", [
    "./assets/react/containers/Cart/cart.styles.scss",
    "./assets/react/containers/Header/header.styles.scss",
    "./assets/react/containers/Logup/logup.styles.scss",
    "./assets/react/containers/Nav/nav.styles.scss",
    "./assets/react/components/Product/product.styles.scss",
    "./assets/react/containers/Products/productList.styles.scss",
    "./assets/react/containers/Profile/profile.styles.scss",
    "./assets/react/Store/features/posts/styles/emoji.styles.scss",
    "./assets/react/styles.scss",
  ])

  .splitEntryChunks()

  .enableReactPreset()

  .enableSingleRuntimeChunk()

  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.23";
  })

  .enableSassLoader() //enable SCSS file
  .configureCssLoader((options) => {
    options.modules = true;
  })
  .enablePostCssLoader();

module.exports = Encore.getWebpackConfig();
