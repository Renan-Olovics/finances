import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { Elysia } from 'elysia'

import { db, mail, sms, whatsapp } from '@/providers'
import { auth, health } from '@/modules'

import { env } from '.'

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(serverTiming())
  .use(jwt({ secret: env.JWT_SECRET, exp: '7d', name: 'jwt' }))
  .decorate({ db, mail, sms, whatsapp })
  .use(health)
  .use(auth)
  .listen(env.PORT)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
