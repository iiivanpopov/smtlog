import type { User } from '@/database'
import { createFactory } from 'hono/factory'

interface Env {
  Variables: {
    user: User
  }
}

export const factory = createFactory<Env>()
