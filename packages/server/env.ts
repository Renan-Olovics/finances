import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DB_URL: z
      .string()
      .optional()
      .default('postgresql://postgres:docker-postgres@localhost:5438/postgres'),
    POSTGRES_USER: z.string().optional().default('postgres'),
    POSTGRES_PASSWORD: z.string().optional().default('docker-postgres'),
    POSTGRES_DB: z.string().optional().default('postgres'),
    PORT: z.coerce.number().optional().default(3000),
  },
  runtimeEnv: process.env,
})
