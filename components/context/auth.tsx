'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface AuthContext {
  user: null
  loading: boolean
}

const AuthContext = createContext<AuthContext | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(null)
    setLoading(false)
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
