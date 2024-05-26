import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { db, mail, sms, whatsapp } from '@/providers'
import { health } from '@/modules'

import { env } from '.'

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(serverTiming())
  .decorate('db', db)
  .decorate('mail', mail)
  .decorate('whatsapp', whatsapp)
  .decorate('sms', sms)
  .get('/', () => 'Welcome to Elysia!')
  .get('/kkk', ({ sms }) => sms.send.example({ to: ['renanolovics@gmail.com'] }))
  .use(health)
  .listen(env.PORT)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
