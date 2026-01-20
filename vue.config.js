module.exports = {
  devServer: {
    webSocketServer: "ws",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "The Travel Club";
      args[0].description =
        "The Travel Club goes to Japan with EtonHouse International School";
      args[0].keyword =
        "The Travel Club goes to Japan with EtonHouse International School";
      return args;
    });

    // Defining app version from package.json
    config.plugin("define").tap((args) => {
      let appVersion = JSON.stringify(require("./package.json").version);
      args[0]["process.env"]["VERSION"] = appVersion;
      return args;
    });
  },
  pwa: {
    themeColor: "#FFFFFF",
    name: "The Travel Club",
    iconPaths: {
      faviconSVG: "ttc-favicon/favicon.ico",
      favicon32: "ttc-favicon/favicon-32x32.png",
      favicon16: "ttc-favicon/favicon-16x16.png",
      appleTouchIcon: "ttc-favicon/apple-touch-icon.png",
      maskIcon: "ttc-favicon/favicon-32x32.png",
      msTileImage: "ttc-favicon/favicon-32x32.png",
    },
    manifestOptions: {
      icons: [
        {
          src: "ttc-favicon/favicon-32x32.png",
          sizes: "36x36",
          type: "image/png",
          density: "1",
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/base/_variables.scss";`,
      },
    },
  },
};
