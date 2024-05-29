import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { db, mail, sms, whatsapp } from '@/providers'
import { auth, health } from '@/modules'

import { env } from '.'

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(serverTiming())
  // .onError(({ error }) => new Response(error.toString()))

  .decorate({ db, mail, sms, whatsapp })
  .use(health)
  .use(auth)
  .listen(env.PORT)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
