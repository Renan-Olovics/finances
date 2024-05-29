import Elysia, { t } from 'elysia'

import { db } from '@/providers'

import { createUser, findUserByEmail } from './utils'

export const auth = new Elysia({ prefix: '/auth' }).decorate({ db }).post(
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
      password: t.String({ minLength: 8 }),
      surname: t.String(),
      phone: t.String(),
      name: t.String(),
    }),
  },
)
