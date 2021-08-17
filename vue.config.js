module.exports = {
  css: {
    extract: false
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.coto.soporte-digital",
        nsis: {
          allowToChangeInstallationDirectory: true,
          oneClick: false,
          createStartMenuShortcut : true
        },
        icon: "./src/assets/logo_cotoDigital.jpg",
        extraResources: [
          {
            "from": "./src/assets/",
            "filter": [
              "**/*"
            ]
          }
        ]
      },
    }
  },
  devServer: {
    host: 'localhost',
  }
}