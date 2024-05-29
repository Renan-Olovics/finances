import { describe, expect } from 'bun:test'
import { faker } from '@faker-js/faker'

import { User } from '@/db/schemas'
import { db } from '@/providers'

import { createUser, findUserByEmail } from './utils'

describe('Auth utils', () => {
  describe('createUser', async () => {
    const user: Omit<User, 'id'> = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.firstName(),
      phone: faker.phone.number(),
      surname: faker.person.lastName(),
    }
    const createdUser = await createUser({ db, user })

    expect(createdUser).toBeDefined()
  })
  describe('createUser', async () => {
    const user: Omit<User, 'id'> = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.firstName(),
      phone: faker.phone.number(),
      surname: faker.person.lastName(),
    }
    await createUser({ db, user })

    const findedUser = findUserByEmail({ db, email: user.email })

    expect(findedUser).toBeDefined()
  })
})
