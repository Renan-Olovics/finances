import { db } from '@/providers'

import { faker } from '@faker-js/faker'
import { hash } from 'argon2'

import { userTable } from '@/db/schemas'

export const seedUsers = async () => {
  await db
    .insert(userTable)
    .values([
      {
        email: 'admin@finance.com',
        name: 'Main user',
        password: await hash('admin'),
        phone: faker.phone.number(),
        surname: faker.person.lastName(),
      },
    ])
    .onConflictDoNothing()
}

seedUsers()
