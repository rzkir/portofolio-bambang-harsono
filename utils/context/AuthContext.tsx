"use client"

import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserSession | null>(null)
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState<UserRole | null>(null)
    const [resetToken, setResetToken] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Check for user in localStorage on initial load
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as UserSession
            setUser(parsedUser)
            setUserRole(parsedUser.role)
        }
        setLoading(false)
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to sign in')
            }

            // Create user session from account data
            const userSession: UserSession = {
                _id: data.user._id,
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                role: data.user.role
            }

            setUser(userSession)
            setUserRole(userSession.role)
            localStorage.setItem('user', JSON.stringify(userSession))

            // Show success message and navigate based on role
            if (userSession.role === 'admins') {
                toast.success('Welcome back, Admin!', {
                    duration: 2000,
                })
                router.push('/dashboard')
            } else {
                toast.success('Welcome back!', {
                    duration: 2000,
                })
                router.push('/')
            }

            return userSession
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
            toast.error(errorMessage)
            return
        }
    }

    const signOut = async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
                credentials: 'include' // Important: include credentials
            });

            if (!response.ok) {
                throw new Error('Failed to sign out');
            }

            // Clear local state
            setUser(null);
            setUserRole(null);
            localStorage.removeItem('user');

            toast.success('Logged out successfully!', {
                duration: 2000,
            });

            // Navigate to signin page immediately
            router.push('/signin');
        } catch (error) {
            console.error('Sign out error:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

    const resetPassword = async (email: string) => {
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send reset email')
            }

            toast.success('OTP has been sent to your email!', {
                duration: 3000,
            })

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
            toast.error(errorMessage)
            // Rethrow so callers (e.g., ForgetPassword) can stop navigation and show inline error
            throw new Error(errorMessage)
        }
    }

    const changePassword = async (newPassword: string) => {
        try {
            if (!user?._id) {
                toast.error('User not authenticated')
                return false
            }

            const response = await fetch('/api/auth/reset-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: user._id,
                    newPassword,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to change password')
            }

            toast.success('Password updated successfully!')
            return true
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
            toast.error(errorMessage)
            return false
        }
    }

    const verifyOtp = async (token: string) => {
        try {
            const res = await fetch('/api/auth/verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            })
            const json = await res.json()
            if (!res.ok) {
                throw new Error(json.error || 'Invalid OTP')
            }
            setResetToken(token)
            toast.success('OTP verified. Redirecting...')
            router.push('/reset-password')
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred'
            toast.error(message)
            throw new Error(message)
        }
    }

    const finalizeResetPassword = async (newPassword: string) => {
        try {
            if (!resetToken) {
                throw new Error('Missing token. Please verify OTP again.')
            }
            const res = await fetch('/api/auth/verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: resetToken, newPassword }),
            })
            const json = await res.json()
            if (!res.ok) {
                throw new Error(json.error || 'Reset password failed')
            }
            toast.success('Password reset successful. Redirecting...')
            setResetToken(null)
            router.push('/signin')
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred'
            toast.error(message)
            throw new Error(message)
        }
    }

    const value = {
        user,
        loading,
        userRole,
        signIn,
        signOut,
        resetPassword,
        changePassword,
        resetToken,
        setResetToken,
        verifyOtp,
        finalizeResetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
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