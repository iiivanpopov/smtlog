import type { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex py-10 flex-col justify-center items-center min-h-screen">
      {children}
    </div>
  )
}
