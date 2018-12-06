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
    }
};
