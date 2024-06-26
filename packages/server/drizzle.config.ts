import { defineConfig } from 'drizzle-kit'
import { env } from './env'

export default defineConfig({
  schema: './src/db/schemas/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DB_URL },
})
