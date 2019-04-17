module.exports = {
  presets: [
    [
      "@vue/app",
      {
        polyfills: ["es6.promise", "es6.symbol"],
        decoratorsLegacy: true
      }
    ]
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
