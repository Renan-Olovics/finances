import { describe, expect, it, afterEach } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { faker } from '@faker-js/faker'
import { StatusMap } from 'elysia'

import { app } from '@/server'
import { db } from '@/providers'
import { userTable } from '@/db/schemas'

afterEach(async () => {
  await db.delete(userTable)
})

describe('Auth Module', () => {
  const api = treaty(app)

  describe('POST /auth/register', () => {
    it('should return 209 status code if user can be created', async () => {
      const { status } = await api.auth.register.post({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        phone: faker.phone.number(),
      })

      expect(status).toBe(StatusMap.Created)
    })
    it('should return 409 status code if user already exists', async () => {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        phone: faker.phone.number(),
      }
      await api.auth.register.post(user)
      const { status } = await api.auth.register.post(user)

      expect(status).toBe(StatusMap.Conflict)
    })
    it('should return 422 when constraints are not met', async () => {
      const baseTestCase = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        phone: faker.phone.number(),
      }

      const properties = Object.keys(baseTestCase)

      for (const prop of properties) {
        const testCase = { ...baseTestCase, [prop]: undefined }
        const { status } = await api.auth.register.post(testCase)

        expect(status).toBe(StatusMap['Unprocessable Content'])
      }
    })
  })
})
