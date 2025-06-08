import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "warn",
      "no-undef": "error",
      semi: "error",
      eqeqeq: "warn",
      "no-invalid-this": "error",
      "no-return-assign": "error",
      "no-unused-expressions": ["warn", { allowTernary: true }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      indent: ["error", 2, { SwitchCase: 1 }],
      quotes: ["error", "double"],
      "no-implicit-coercion": ["warn"],
      "consistent-return": "error",
      "max-len": ["error", { code: 200 }],
      "prefer-const": "error",
      "prefer-template": "warn",
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
]);
