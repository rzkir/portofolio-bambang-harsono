import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Sign Up to your account',
}

import SigninLayout from "@/components/auth/signup/SignupLayout"

export default function SignInPage() {
    return (
        <SigninLayout />
    )
}