export default {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    //"sourceType": "module" - тогда module.exports = и без ""
  },
  "rules": {
    "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  }
};
