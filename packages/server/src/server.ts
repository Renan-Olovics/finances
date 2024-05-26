import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { db } from '@/providers'
import { health } from '@/modules'

import { sendEmail } from './providers/mail'
import { env } from '.'

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(serverTiming())
  .decorate('db', db)
  .get('/', () => 'Welcome to Elysia!')
  .get('/kkk', () => sendEmail(['renanolovics@gmail.com']))
  .use(health)
  .listen(env.PORT)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
