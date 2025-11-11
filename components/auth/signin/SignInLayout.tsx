"use client"

import { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import signin from "@/assets/signin.png"

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"

import Image from 'next/image'

import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from '@/utils/context/AuthContext'

import { toast } from 'sonner'

import { signInSchema, type SignInFormData } from '@/utils/validations/validations'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

export default function SignInLayout() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { signIn, user, loading, userRole } = useAuth()
    const router = useRouter()

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

    return (
        <section
            className={`flex h-screen transition-colors duration-300 bg-black text-white`}
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
                            <Label htmlFor="email" className={'text-gray-300'}>Email</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                autoComplete="email"
                                placeholder="Input email"
                                className={`bg-gray-800 border-gray-700 text-white`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password" className={'text-gray-300'}>Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="**********"
                                    className={`bg-gray-800 border-gray-700 text-white`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300`}
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
                                    className={'border-gray-700'}
                                />
                                <Label htmlFor="rememberMe" className={`text-sm text-gray-300`}>Remember me</Label>
                            </div>

                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
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
                </div>
            </div>
        </section>
    )
}