import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forget Password',
    description: 'Forget Password',
}

import ForgetPassword from "@/components/auth/forget-password/ForgetPassword"

export default function ForgetPasswordPage() {
    return (
        <ForgetPassword />
    )
}