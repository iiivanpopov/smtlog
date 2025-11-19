import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  stylistic: true,
  imports: true,
  yaml: true,
  formatters: true,
  ignores: ['**/drizzle'],
  rules: { 'antfu/no-top-level-await': 'off', 'unicorn/throw-new-error': 'off' },
})
