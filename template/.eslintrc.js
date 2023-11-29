module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    protractor: true

  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'vue/html-self-closing': 'off'
  },
  "globals": {
    "google": true,
    "angular": true,
    "$": true,
    "jQuery": true,
    "moment": true,
    "window": true,
    "document": true,
    "Modernizr": true,
    "__TESTING__": true,
    "beforeEach": true,
    "expect": true,
    "describe": true,
    "it": true,
    "element": true,
    "by": true,
    "browser": true,
    "inject": true,
    "register": true,
    "sinon": true,
    "_": false
  }
}
