import { defineConfig } from 'drizzle-kit';
import { env } from './env';

export default defineConfig({
  schema: './src/db/tables/*',
  out: './src/db/schemas',
  dialect: 'postgresql',
  dbCredentials: { url: env.DB_URL }
});
