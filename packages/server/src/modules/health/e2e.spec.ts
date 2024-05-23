import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'

import { health } from './controller'
import { app } from '@/server'

const api = treaty(app)

describe('Health Module', () => {
  it('/health should returns "Hi!", if its runnning just fine', async () => {
    const { data } = await api.health.get()

    expect(data).toBe('Hi!')
  })
})
