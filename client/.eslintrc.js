module.exports = {
  "extends": "airbnb",
  "env": {
    browser: true,
    commonjs: true,
    es6: true
  },
  "plugins": ["react"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0, { "forbid": ["array", "any", "object"] }],
    "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
    "import/no-unresolved": [0, {commonjs: true, amd: true}],
    "linebreak-style": [0, "windows"],
    "no-param-reassign": [0, { "props": false }],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
  }
};