module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2,
            { "SwitchCase": 1 }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
      "describe": true,
      "it": true,
      "expect": true,
      "app": true,
      "td": true,
      "beforeEach": true,
      "request": true,
      "Joi": true,
      "joiAssert": true
    }
};
