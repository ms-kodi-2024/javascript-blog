export default [
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "off"
      ],
      "quotes": [
          "error",
          "single",
          {"allowTemplateLiterals": true}
      ],
      "semi": [
          "error",
          "always"
      ],
      "no-console": [
          "off"
      ]
    }
  }
];