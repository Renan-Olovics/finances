import { serverTiming } from '@elysiajs/server-timing';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';

import { env } from '@/index';
import { db } from '@/providers';

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(serverTiming())
  .decorate('db', db)
  .listen(env.PORT);

export type App = typeof app;

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
