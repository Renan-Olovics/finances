import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

import * as schema from '@/db/schemas'
import { env } from 'env'

const client = new Client({ connectionString: env.DB_URL })
await client.connect()

export const db = drizzle(client, { schema, logger: true })
