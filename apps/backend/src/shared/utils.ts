export function wrapSuccess(payload?: Record<string, unknown>, success = true) {
  return { ...payload, success }
}
