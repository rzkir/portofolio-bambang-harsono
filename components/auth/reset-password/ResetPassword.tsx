"use client"

import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import { resetPasswordSchema, type ResetPasswordFormData } from '@/utils/validations/validations'

import Link from 'next/link'

import { ArrowLeft, Eye, EyeOff, Github, Instagram, Linkedin } from 'lucide-react'

import { IconBrandTiktok } from "@tabler/icons-react"

import { useAuth } from '@/utils/context/AuthContext'

export default function ResetPassword() {
    const { finalizeResetPassword } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        setIsSubmitting(true)
        try {
            await finalizeResetPassword(data.newPassword)
        } finally {
            setIsSubmitting(false)
        }
    }

    const [showNew, setShowNew] = useState(false)

    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <section className={"min-h-screen w-full flex items-center justify-center p-4 bg-black text-white"}>
            <div className={"w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border border-gray-800 shadow-sm"}>
                {/* Left form panel */}
                <div className="w-full p-6 sm:p-10 flex items-center">
                    <div className="w-full max-w-xl mx-auto">
                        <Link href="/verification" className={"inline-flex items-center gap-2 mb-8 text-gray-300"}>
                            <ArrowLeft className="h-5 w-5" /> Back
                        </Link>

                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Set a new password</h1>
                        <p className={"mb-8 text-gray-300"}>
                            Create a strong password to keep your account safe and secure.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNew ? 'text' : 'password'}
                                        placeholder="Create strong password"
                                        className={"bg-gray-900 border-gray-800 pr-10"}
                                        {...register('newPassword')}
                                    />
                                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="Re-enter your new password"
                                        className={"bg-gray-900 border-gray-800 pr-10"}
                                        {...register('confirmPassword')}
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className={"w-full rounded-full px-6 py-6 text-base font-medium bg-white text-black hover:bg-gray-100"}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create New Password'}
                            </Button>

                            <p className={"text-gray-400"}>
                                Remembered it?{' '}
                                <Link href="/signin" className="underline">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right decorative panel */}
                <div className={"relative hidden md:block p-8 sm:p-12 bg-linear-to-br from-zinc-900 via-indigo-950 to-zinc-900"}>
                    {/* progress dots (dynamic) */}
                    {(() => {
                        const newPassword = watch('newPassword') || ''
                        const confirmPassword = watch('confirmPassword') || ''
                        const filledCount = (newPassword ? 1 : 0)
                            + (confirmPassword ? 1 : 0)
                            + (newPassword && confirmPassword && newPassword === confirmPassword ? 1 : 0)
                        return (
                            <div className="flex items-center gap-3 mb-10 justify-center" aria-label="Password progress">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-1.5 w-16 rounded-full ${i < filledCount ? 'bg-blue-600' : 'bg-gray-700'}`}
                                    />
                                ))}
                            </div>
                        )
                    })()}
                    <div className="max-w-lg mx-auto text-center">
                        <h3 className={"text-2xl sm:text-3xl font-semibold mb-3 text-white"}>Perkuat Keamanan Akun</h3>
                        <p className={"text-gray-300 mb-8"}>
                            Gunakan kata sandi yang unik, panjang, dan sulit ditebak. Hindari memakai ulang kata sandi di layanan lain.
                        </p>
                        <div className={"rounded-2xl border border-white/10 bg-white/5 shadow-lg p-6"}>
                            <p className="text-sm font-medium">Kata sandi harus unik, panjang, dan sulit ditebak.</p>
                            <p className={"text-xs text-gray-300"}>Hindari memakai ulang kata sandi di layanan lain.</p>
                        </div>

                        <div className="mt-10">
                            <p className="text-sm text-gray-300 mb-4">Ikuti saya di media sosial</p>
                            <div className="flex items-center justify-center gap-4 text-gray-300">
                                <a href="https://github.com/rzkir" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                                    <Github className="h-5 w-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/rizki-ramadhan12" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a href="https://www.instagram.com/rzkir.20" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="https://www.tiktok.com/@rzkir.20" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="TikTok">
                                    <IconBrandTiktok className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}