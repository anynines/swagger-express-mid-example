module.exports = {
  "extends": "airbnb-base",
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  "rules": {
    "max-len": [2, { "code": 120 }],
    // "camelcase": 0,
    "no-debugger": 1,
    "no-unused-vars": ["error", { "vars": "all", "args": "all", "ignoreRestSiblings": false, "argsIgnorePattern": "^_" }]
  }
};
