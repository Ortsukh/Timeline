module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    quotes: [
      "error",
      "double",
    ],
    "react/prop-types": 0,
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "vuejs-accessibility/click-events-have-key-events": "off",
    "react/jsx-props-no-spreading": "off",
  },

};
