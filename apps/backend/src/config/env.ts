export const env = {
  development: import.meta.env.NODE_ENV === 'development',
  production: import.meta.env.NODE_ENV === 'production',
  node: import.meta.env.NODE_ENV,
} as const
