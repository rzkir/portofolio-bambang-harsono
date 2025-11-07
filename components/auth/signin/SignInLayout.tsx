"use client"

import { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import signin from "@/assets/signin.jpg"

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"

import Image from 'next/image'

import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from '@/utils/context/AuthContext'

import { toast } from 'sonner'

import { signInSchema, type SignInFormData } from '@/utils/validations/validations'

import { useTheme } from 'next-themes'

import { useRouter } from 'next/navigation'

export default function SignInLayout() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { signIn, user, loading, userRole } = useAuth()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!loading && user) {
            if (userRole === 'admins') {
                router.replace('/dashboard')
            } else {
                router.replace('/')
            }
        }
    }, [loading, user, userRole, router])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            rememberMe: false
        }
    })

    const onSubmit = async (data: SignInFormData) => {
        try {
            setIsLoading(true)
            await signIn(data.email, data.password)
        } catch (error: unknown) {
            console.error('Sign in error:', error)
            toast.error((error as Error).message || 'An error occurred during sign in')
        } finally {
            setIsLoading(false)
        }
    }

    if (!mounted) {
        return null; // or a loading skeleton
    }

    return (
        <section
            className={`flex h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}
        >
            {/* Left Section */}
            <div className="relative hidden lg:block w-1/2">
                <Image
                    src={signin}
                    alt='background'
                    fill
                    className="object-cover brightness-90"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/30 flex items-end justify-center p-12">
                    <p className="text-white text-center text-3xl font-bold leading-relaxed tracking-wide">
                        WELCOME TO MY CREATIVE SPACE WHERE INNOVATION
                        MEETS DESIGN, AND IDEAS TRANSFORM INTO
                        EXCEPTIONAL DIGITAL EXPERIENCES.
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-4">WELCOME TO MY<br />DIGITAL PORTFOLIO</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>Email</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                autoComplete="email"
                                placeholder="Input email"
                                className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}>Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="**********"
                                    className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    {...register("rememberMe")}
                                    className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                                />
                                <Label htmlFor="rememberMe" className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Remember me</Label>
                            </div>

                            <div className="text-sm">
                                <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-800 hover:bg-green-900 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In - Access My Portfolio'}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className={`px-2 ${theme === 'dark' ? 'bg-black text-gray-400' : 'bg-white text-gray-500'}`}>Or</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button variant="outline" className={`w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'}`}>
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Sign in with Google
                        </Button>

                        <Button className={`w-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-black hover:bg-gray-800'} text-white`}>
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Sign in with Github
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        New to my portfolio?{' '}
                        <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Create an Account
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}