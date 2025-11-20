import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  stylistic: true,
  imports: true,
  yaml: true,
  formatters: true,
  ignores: ['**/drizzle', '**/routeTree.gen.ts'],
  rules: {
    'antfu/no-top-level-await': 'off',
    'unicorn/throw-new-error': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unstable-context-value': 'off',
  },
})
