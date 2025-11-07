"use client"

import { useRouter } from 'next/navigation'

import { ShieldAlert } from 'lucide-react'

export default function AccessDenied() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-6">
                    <ShieldAlert className="w-16 h-16 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Access Denied
                </h1>
                <p className="text-gray-600 mb-8">
                    Sorry, you don&apos;t have permission to access this page. Please contact your administrator if you believe this is a mistake.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-2 bg-[#FF8C4B] text-white rounded-md hover:bg-[#FF7B3A] transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    )
} 