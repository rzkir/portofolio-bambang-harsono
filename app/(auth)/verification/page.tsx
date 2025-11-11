import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Verification',
    description: 'Verification',
}

import Verification from "@/components/auth/verification/Verification"

export default function VerificationPage() {
    return (
        <Verification />
    )
}