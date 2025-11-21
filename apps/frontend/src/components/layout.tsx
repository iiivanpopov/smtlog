import type { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {children}
    </div>
  )
}
