import { getUnixTimestamp } from '@/lib'

const cache = new Map<string, { expiresAt: number, data: unknown }>()

export function getCache<T>(key: string): T | undefined {
  const entry = cache.get(key)
  if (!entry)
    return undefined

  if (entry.expiresAt < getUnixTimestamp()) {
    cache.delete(key)
    return undefined
  }

  return entry.data as T
}

export function setCache<T>(key: string, value: T, ttl: number) {
  cache.set(key, {
    expiresAt: getUnixTimestamp(Date.now() + ttl * 1000),
    data: value,
  })
}

export async function withCache<T>(
  key: string,
  loader: () => Promise<T> | T,
  ttl: number,
): Promise<T> {
  const cached = getCache<T>(key)
  if (cached !== undefined)
    return cached

  const data = await loader()
  setCache(key, data, ttl)
  return data
}
