Bun.build({
  entrypoints: ['./src/app/main.ts'],
  outdir: './dist',
  minify: true,
  sourcemap: import.meta.env.NODE_ENV === 'development' ? 'linked' : 'none',
  naming: 'index.js',
  define: {
    'process.env.NODE_ENV': `"${import.meta.env.NODE_ENV ?? 'production'}"`,
    'import.meta.env.NODE_ENV': `"${import.meta.env.NODE_ENV ?? 'production'}"`,
  },
})
