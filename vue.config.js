module.exports = {
  devServer: {
    webSocketServer: "ws",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Hydroflask";
      args[0].description =
        "Join the Pickleball Movement with Hydro Flask as the pickleball community in the Philippines continues to grow, more players are discovering the Hydro Flask advantage. It's not just about staying hydrated; it's about bringing premium performance to every aspect of your game.";
      args[0].keyword =
        "Join the Pickleball Movement with Hydro Flask as the pickleball community in the Philippines continues to grow, more players are discovering the Hydro Flask advantage. It's not just about staying hydrated; it's about bringing premium performance to every aspect of your game.";
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
    name: "Recreational Outdoor Exchange",
    iconPaths: {
      faviconSVG: "img/icons/hydro-favicon.ico",
      favicon32: "img/icons/hydro-favicon.ico",
      favicon16: "img/icons/hydro-favicon.ico",
      appleTouchIcon: "img/icons/hydro-favicon.ico",
      maskIcon: "img/icons/hydro-favicon.ico",
      msTileImage: "img/icons/hydro-favicon.ico",
    },
    manifestOptions: {
      icons: [
        {
          src: "img/icons/hydro-favicon.ico",
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
