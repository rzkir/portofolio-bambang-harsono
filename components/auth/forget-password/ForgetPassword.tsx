"use client"

import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/utils/context/AuthContext'

import { Label } from '@/components/ui/label'

import { Input } from '@/components/ui/input'

import { forgotPasswordEmailSchema, type ForgotPasswordFormData } from '@/utils/validations/validations'

import Image from 'next/image'

import Link from 'next/link'

import signin from '@/assets/signin.png'

import { ArrowRight, Box } from 'lucide-react'

export default function ForgetPassword() {
    const { resetPassword } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordEmailSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        try {
            await resetPassword(data.email)
            router.push('/verification')
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Failed to send OTP'
            setError('email', { type: 'server', message: msg })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border shadow-sm">
                {/* Left image */}
                <div className="relative hidden md:block">
                    <Image src={signin} alt="background" fill className="object-cover" priority />
                    <div className="absolute bottom-6 left-6 right-6 text-white/90">
                        <p className="text-sm mb-2">Forgot Password</p>
                        <p className="text-xs opacity-80">Copy right &copy; 2025 by <Link href={"https://rizkiramadhan.web.id"} className='underline'>Rizki Ramadhan</Link></p>
                    </div>
                </div>

                {/* Right card */}
                <div className="w-full p-6 sm:p-10 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                <Box className="h-6 w-6" />
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-center text-2xl font-semibold mb-2">Forgot your password?</h1>
                        <p className={`text-center mb-6`}>
                            Enter your email address and we will send you a 6-digit code to reset your password.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className={`bg-white border-gray-300`}
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-medium transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Next'}
                                {!isLoading && <ArrowRight className="h-4 w-4" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
