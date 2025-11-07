import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account',
}

import SigninLayout from "@/components/auth/signin/SignInLayout"

export default function SignInPage() {
    return (
        <SigninLayout />
    )
}