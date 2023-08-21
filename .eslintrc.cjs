module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [ "airbnb-base" ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "rules": {
      "indent": [ "error", 2 ],
      "qoutes": [ "error", "double" ],
      "semi": [ "error", "always" ],
      "curly": ["error", "multi", "consistent"]
  }
}