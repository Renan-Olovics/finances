import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { db, mail } from '@/providers'
import { health } from '@/modules'

import { env } from '.'
import { whatsapp } from './providers/whatsapp'

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(serverTiming())
  .decorate('db', db)
  .decorate('mail', mail)
  .decorate('whatsapp', whatsapp)
  .get('/', () => 'Welcome to Elysia!')
  .get('/kkk', ({ mail }) => mail.send.example({ emails: ['renanolovics@gmail.com'] }))
  .use(health)
  .listen(env.PORT)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
