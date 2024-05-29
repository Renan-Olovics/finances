import { hash } from 'argon2'

import { userTable } from '@/db/schemas'
import { Db } from '@/providers'

type CheckUserExists = {
  db: Db
  email: string
}

export const findUserByEmail = async ({ db, email }: CheckUserExists) => {
  return await db.query.userTable.findFirst({
    where: ({ email: userEmail }, { eq }) => eq(userEmail, email),
  })
}

type User = {
  email: string
  password: string
  surname: string
  phone: string
  name: string
}

type CreateUser = {
  db: Db
  user: User
}

export const createUser = async ({ db, user }: CreateUser) => {
  const { password, ...userData } = user

  const passwordHash = await hash(password)

  const response = await db
    .insert(userTable)
    .values({ ...userData, password: passwordHash })
    .returning()

  return response[0]
}
