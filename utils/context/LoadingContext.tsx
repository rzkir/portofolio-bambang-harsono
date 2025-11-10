'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export const LOADING_MIN_DURATION_MS = 5000

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('Loading...')
    const [loadingType, setLoadingType] = useState<LoadingType>('general')
    const [isInitialLoading, setIsInitialLoading] = useState(true) // Keep this true for styling

    useEffect(() => {
        // Tahan minimal ~3.6s: 2 pesan (≈2.0s) + progress splash (≈1.6s)
        const minLoadingTime = setTimeout(() => {
            // Check if page is already loaded
            if (document.readyState === 'complete') {
                // Transisi langsung setelah minimum waktu tercapai
                setIsInitialLoading(false)
                return
            }

            // Listen for page load completion
            const handleLoad = () => {
                // Transisi langsung setelah event load jika minimum waktu sudah lewat
                setIsInitialLoading(false)
            }

            window.addEventListener('load', handleLoad)

            return () => {
                window.removeEventListener('load', handleLoad)
            }
        }, LOADING_MIN_DURATION_MS)

        return () => {
            clearTimeout(minLoadingTime)
        }
    }, [])

    const showLoading = React.useCallback((message: string = 'Loading...', type: LoadingType = 'general') => {
        setLoadingMessage(message)
        setLoadingType(type)
        setIsLoading(true)
    }, [])

    const hideLoading = React.useCallback(() => {
        setIsLoading(false)
        setLoadingMessage('Loading...')
        setLoadingType('general')
    }, [])

    const contextValue = React.useMemo(() => ({
        isLoading: isLoading || isInitialLoading,
        loadingMessage: isInitialLoading ? '' : loadingMessage,
        loadingType: isInitialLoading ? 'general' : loadingType,
        showLoading,
        hideLoading,
        isInitialLoading
    }), [isLoading, isInitialLoading, loadingMessage, loadingType, showLoading, hideLoading])

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider')
    }
    return context
} 