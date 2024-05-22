import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { env } from '../env';

const client = new Client({ connectionString: env.DB_URL });
await client.connect();

const db = drizzle(client);

const app = new Elysia()
  .use(cors())
  .state('db', db)
  .get('/', ({ store: {} }) => 'Hello Elysia')
  .get('/banana', () => 'bananinha')
  .listen(3000);

export type App = typeof app;

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
