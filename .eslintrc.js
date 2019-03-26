/* eslint-disable */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-alert": 1,
    "require-await": 1,
    "require-yield": 1,
    "no-var": 1,
    "arrow-spacing": 1,
    "space-in-parens": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "comma-spacing": ["error", { before: false, after: true }],
    "no-template-curly-in-string": 1,
    "array-callback-return": 1,
    "consistent-return": ["error", { treatUndefinedAsUnspecified: true }],
    "default-case": 1,
    "no-div-regex": 1,
    "no-else-return": 1,
    "no-eq-null": 1,
    "no-eval": 1,
    "no-multi-spaces": 1,
    "no-multi-str": 1,
    "no-magic-numbers": [
      1,
      {
        ignoreArrayIndexes: true,
        ignore: [-1, 0, 1]
      }
    ],
    "comma-dangle": 1,
    "space-before-blocks": 1
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      legacyDecorators: true
    }
  }
};
