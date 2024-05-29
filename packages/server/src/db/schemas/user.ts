import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core'

export const userTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  phone: text('phone').notNull(),
  password: text('password').notNull(),
})
