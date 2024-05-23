import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

// Import types
import type { Linter } from 'eslint';

const config: Linter.Config = {
  languageOptions: {
    globals: { ...globals.browser, ...globals.node }
  },
  extends: [
    'plugin:@eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    '@repo/eslint-config/index.js'
  ],
  parser: tsEslintParser,
  plugins: [pluginJs, tseslint],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
};

export default config;
