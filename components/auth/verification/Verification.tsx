"use client"

import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

import { otpSchema, type OtpFormData } from '@/utils/validations/validations'

import Image from 'next/image'

import signin from '@/assets/signin.png'

import { ArrowRight, Box } from 'lucide-react'
import { useAuth } from '@/utils/context/AuthContext'

export default function Verification() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [otp, setOtp] = useState('')
  const { verifyOtp } = useAuth()

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp },
    setValue,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  })

  const onVerifyOtp = async (data: OtpFormData) => {
    setIsVerifying(true)
    try {
      await verifyOtp(data.token)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <section className={`min-h-screen w-full flex items-center justify-center p-4 bg-black text-white`}>
      <div className={`w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border border-gray-800 bg-zinc-900 shadow-sm`}>
        {/* Left image */}
        <div className="relative hidden md:block">
          <Image src={signin} alt="background" fill className="object-cover" priority />
          <div className="absolute bottom-6 left-6 right-6 text-white/90">
            <p className="text-sm mb-2">Verification OTP</p>
            <p className="text-xs opacity-80">Copy right &copy; 2025 by <Link href={"https://rizkiramadhan.web.id"} className='underline'>Rizki Ramadhan</Link></p>
          </div>
        </div>

        {/* Right card */}
        <div className="w-full p-6 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Progress dots reflect OTP length */}
            <div className="flex items-center gap-3 mb-8" aria-label="OTP progress">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-16 rounded-full ${i < otp.length ? 'bg-blue-600' : 'bg-gray-700'}`}
                />
              ))}
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Box className="h-6 w-6" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-center text-xl sm:text-2xl font-semibold mb-2">Enter the 6 digit code sent to</h2>
            <p className={`text-center mb-6 text-gray-300`}>your email address</p>

            {/* Form */}
            <form onSubmit={handleSubmitOtp(onVerifyOtp)} className="space-y-6">
              {/* Hidden input registered for validation */}
              <input type="hidden" value={otp} {...registerOtp('token')} />

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    const v = (value || '').replace(/\D/g, '')
                    setOtp(v)
                    setValue('token', v, { shouldValidate: true })
                  }}
                  containerClassName="justify-center"
                  className="mx-auto"
                  disabled={isVerifying}
                  aria-invalid={!!errorsOtp.token}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg mr-2" />
                    <InputOTPSlot index={1} className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg mr-2" />
                    <InputOTPSlot index={2} className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg mr-2" />
                    <InputOTPSlot index={3} className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg mr-2" />
                    <InputOTPSlot index={4} className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg mr-2" />
                    <InputOTPSlot index={5} className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {errorsOtp.token && (
                <p className="text-red-500 text-sm mt-1 text-center">{errorsOtp.token.message}</p>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-medium transition-colors"
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Next'}
                {!isVerifying && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className={`text-center text-sm text-gray-400`}>
                Didn’t receive OTP?{' '}
                <Link href="/forgot-password" className="text-blue-600 hover:underline">Resend OTP</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
