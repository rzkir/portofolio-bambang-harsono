import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reset Password',
    description: 'Reset Password',
}

import ResetPassword from "@/components/auth/reset-password/ResetPassword"

export default function ResetPasswordPage() {
    return (
        <ResetPassword />
    )
}