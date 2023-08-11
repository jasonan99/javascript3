module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["dist/", "form.test.js"],
  rules: {
    "import/extensions": [2, "always"],
    "import/no-mutable-exports": ["off"],
    "import/no-cycle": ["off"],
    "no-param-reassign": ["off"]
  },
};
