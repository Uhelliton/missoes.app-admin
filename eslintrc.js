module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier', // desativa regras conflitantes do ESLint e Prettier
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // suas regras personalizadas
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': 'error',
  },
};
