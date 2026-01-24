import { useState } from 'react'

export function useDisclosure(initialState = false) {
  const [opened, setOpened] = useState(initialState)

  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const toggle = (value?: boolean) => setOpened(current => value ?? !current)

  return { setOpened, toggle, open, close, opened }
}
