import { jwt } from '@elysiajs/jwt'
import { t, Elysia } from 'elysia'
import { verify } from 'argon2'

import { db } from '@/providers'
import { env } from 'env'

import { createUser, findUserByEmail } from './utils'
import { PASSWORD_REQUIREMENTS } from './constants'

export const auth = new Elysia({ prefix: '/auth' })
  .decorate({ db })
  .use(jwt({ secret: env.JWT_SECRET }))
  .post(
    '/register',
    async ({ db, body, error, set }) => {
      const user = await findUserByEmail({ db, email: body.email })

      if (user) {
        return error('Conflict', 'User already exists')
      }

      await createUser({ db, user: body })

      set.status = 'Created'
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        password: PASSWORD_REQUIREMENTS,
        surname: t.String(),
        phone: t.String(),
        name: t.String(),
      }),
    },
  )
  .post(
    '/login',
    async ({ body, error, set, jwt }) => {
      const user = await findUserByEmail({ db, email: body.email })

      if (!user) {
        return error('Unauthorized', 'Authentication failed')
      }

      const { password, ...userData } = user

      const isPasswordCorrect = await verify(password, body.password)

      if (!isPasswordCorrect) {
        return error('Unauthorized', 'Authentication failed')
      }

      set.status = 'OK'

      return { token: await jwt.sign(userData) }
    },
    {
      body: t.Object({
        email: t.String({ format: 'email' }),
        password: PASSWORD_REQUIREMENTS,
      }),
    },
  )
