import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: ['./src/database/schema.ts'],
  dialect: 'sqlite',
  dbCredentials: { url: process.env.DB_URL! },
})
