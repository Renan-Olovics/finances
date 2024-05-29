import { describe, expect, it, afterEach } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { faker } from '@faker-js/faker'
import { StatusMap } from 'elysia'

import { userTable } from '@/db/schemas'
import { db } from '@/providers'
import { app } from '@/server'
import { createUser } from './utils'

const api = treaty(app)

describe('Auth Module', () => {
  describe('POST /auth/register', () => {
    afterEach(async () => {
      await db.delete(userTable)
    })

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
  describe('POST /auth/login', () => {
    it('should return token with status 209 if everything is ok', async () => {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        phone: faker.phone.number(),
      }
      await api.auth.register.post(user)
      const { data, status } = await api.auth.login.post({
        email: user.email,
        password: user.password,
      })

      expect(data?.token).toBeDefined()
      expect(status).toBe(StatusMap.OK)
    })
    it('should return status 401 if user is not found or password incorrect', async () => {
      const user = await createUser({
        db,
        user: {
          email: faker.internet.email(),
          password: faker.internet.password(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          phone: faker.phone.number(),
        },
      })

      const { status } = await api.auth.login.post({
        email: user.email,
        password: faker.internet.password(),
      })

      expect(status).toBe(StatusMap.Unauthorized)

      const { status: statuscode } = await api.auth.login.post({
        email: faker.internet.email(),
        password: user.password,
      })
      expect(statuscode).toBe(StatusMap.Unauthorized)
    })
  })
})
