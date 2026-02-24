'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user session in localStorage
    const savedUser = localStorage.getItem('sportsdash_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
        localStorage.removeItem('sportsdash_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call - In production, replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('sportsdash_users') || '[]')
      const existingUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (existingUser) {
        const userData: User = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          avatar: existingUser.avatar,
          createdAt: new Date(existingUser.createdAt)
        }
        setUser(userData)
        localStorage.setItem('sportsdash_user', JSON.stringify(userData))
        setIsLoading(false)
        return true
      }
      
      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call - In production, replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('sportsdash_users') || '[]')
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        setIsLoading(false)
        return false
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password, // In production, this should be hashed on the server
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00e676&color=fff`,
        createdAt: new Date().toISOString()
      }
      
      // Save to localStorage
      users.push(newUser)
      localStorage.setItem('sportsdash_users', JSON.stringify(users))
      
      // Set current user
      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
        createdAt: new Date(newUser.createdAt)
      }
      setUser(userData)
      localStorage.setItem('sportsdash_user', JSON.stringify(userData))
      
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sportsdash_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
