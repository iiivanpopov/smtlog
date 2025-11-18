import { config } from '@/config'

Bun.build({
  entrypoints: ['./src/app/main.ts'],
  outdir: './dist',
  minify: true,
  sourcemap: config.env.development ? 'linked' : 'none',
  naming: 'index.js',
  define: {
    'process.env.NODE_ENV': `"${config.env.node ?? 'production'}"`,
    'import.meta.env.NODE_ENV': `"${config.env.node ?? 'production'}"`,
  },
  target: 'bun',
  format: 'esm',
})
