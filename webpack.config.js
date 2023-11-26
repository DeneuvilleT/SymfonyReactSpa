const Encore = require("@symfony/webpack-encore");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")

  .addEntry("app", "./assets/react/index.js")
  .addStyleEntry("styles", [
    "./assets/react/styles.scss",
    "./assets/react/containers/Header/header.styles.scss",
    "./assets/react/containers/Nav/nav.styles.scss",
    "./assets/react/components/PageNotFound/notFound.styles.scss",
    "./assets/react/containers/ProductList/productList.styles.scss",
    "./assets/react/components/Product/product.styles.scss",
    "./assets/react/components/Product/Zoom/zoom.styles.scss",
    "./assets/react/components/Pagination/pagination.styles.scss",
    "./assets/react/components/BtnAdd/btnAdd.styles.scss",
    "./assets/react/components/Stock/stock.styles.scss",
    "./assets/react/components/Comments/comments.styles.scss",
    "./assets/react/components/Comments/Comment/comment.styles.scss",
    "./assets/react/components/Comments/AddPostForm/addPostForm.styles.scss",
    "./assets/react/containers/Cart/cart.styles.scss",
    "./assets/react/components/Cart/CartLineItem/cartLineItem.styles.scss",
    "./assets/react/containers/Login/login.styles.scss",
    "./assets/react/containers/Logup/logup.styles.scss",
    "./assets/react/containers/Logout/logout.styles.scss",
    "./assets/react/containers/Profile/profile.styles.scss",
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
