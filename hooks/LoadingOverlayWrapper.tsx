'use client'

import React from 'react'

import { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { useLoading } from "@/utils/context/LoadingContext"

function MangcodingStyleSplash({
    isLoading,
    message = "Loading...",
    className = "",
}: MangcodingStyleSplashProps) {
    // This component now only renders the loading overlay (no split-exit here)
    if (!isLoading) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${className}`}
        >
            <div className="flex flex-col items-center space-y-8 max-w-md">
                {/* Logo/Brand Section */}
                <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
                    className="text-center"
                >
                    {/* Main Logo/Brand */}
                    <motion.div
                        className="text-4xl md:text-5xl font-bold mb-3 text-gray-300"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
                    >
                        RIZKI RAMADHAN
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        className="text-lg text-gray-500"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
                    >
                        Fullstack Developer
                    </motion.div>
                </motion.div>

                {/* Elegant Loading Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Outer Ring */}
                    <motion.div
                        className="w-20 h-20 border-2 border-gray-300 rounded-full"
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Middle Ring */}
                    <motion.div
                        className="absolute inset-1 w-18 h-18 border-2 border-transparent border-t-gray-400 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Inner Ring */}
                    <motion.div
                        className="absolute inset-2 w-16 h-16 border-2 border-transparent border-t-blue-500 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 1.7,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Center Dot */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </motion.div>
                </motion.div>

                {/* Loading Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.05, duration: 0.45, ease: "easeOut" }}
                    className="text-center text-gray-600 text-sm"
                >
                    {message}
                </motion.div>
            </div>
        </div>
    )
}

function MessageSequence({
    messages = ["HALLO", "PERKENALKAN SAYA"],
    messageDurationsMs = [1000, 1000],
    textEffect = "slide",
    className = "",
    transitionMs = 500,
    onComplete,
}: {
    messages?: string[];
    messageDurationsMs?: number | number[];
    textEffect?: "fade" | "typewriter" | "slide";
    className?: string;
    transitionMs?: number;
    onComplete?: () => void;
}) {
    const [index, setIndex] = useState(0)
    const durationsArray = Array.isArray(messageDurationsMs)
        ? messageDurationsMs
        : Array(messages.length).fill(messageDurationsMs)

    useEffect(() => {
        if (index >= messages.length) return
        const t = setTimeout(() => {
            if (index + 1 < messages.length) {
                setIndex(index + 1)
            } else {
                if (typeof onComplete === 'function') onComplete()
            }
        }, durationsArray[index] ?? 800)
        return () => clearTimeout(t)
    }, [index, messages.length, durationsArray, onComplete])

    const effectVariants = {
        fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        },
        slide: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 }
        },
        typewriter: {
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        }
    } as const

    const current = messages[Math.min(index, messages.length - 1)]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionMs / 1000, ease: "easeInOut" }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${className}`}
        >
            <motion.div
                key={index}
                initial={effectVariants[textEffect].initial}
                animate={effectVariants[textEffect].animate}
                exit={effectVariants[textEffect].exit}
                transition={{ duration: transitionMs / 1000, ease: "easeInOut" }}
                className="text-3xl md:text-4xl font-semibold text-foreground"
            >
                {current}
            </motion.div>
        </motion.div>
    )
}

function ControlledInitialLoader({
    loadingMessage,
    onDone,
}: {
    loadingMessage: string;
    onDone: () => void;
}) {
    const [messagesDone, setMessagesDone] = useState(false)
    const { isInitialLoading } = useLoading()

    useEffect(() => {
        if (!isInitialLoading && messagesDone) {
            onDone()
        }
    }, [isInitialLoading, messagesDone, onDone])

    if (!messagesDone) {
        return (
            <MessageSequence
                messages={["HALLO", "PERKENALKAN SAYA"]}
                messageDurationsMs={[1200, 1200]}
                textEffect="slide"
                transitionMs={550}
                onComplete={() => setMessagesDone(true)}
            />
        )
    }

    return (
        <MangcodingStyleSplash
            isLoading={isInitialLoading}
            message={loadingMessage}
        />
    )
}

export default function LoadingOverlayWrapper() {
    const { isLoading, loadingMessage } = useLoading()
    const [initialDone, setInitialDone] = React.useState(false)
    const [showInitialSplit, setShowInitialSplit] = React.useState(false)
    const INITIAL_SPLIT_DURATION_MS = 650
    const prevIsLoadingRef = React.useRef(isLoading)

    useEffect(() => {
        let openTimer: ReturnType<typeof setTimeout> | undefined
        let closeTimer: ReturnType<typeof setTimeout> | undefined
        if (initialDone && prevIsLoadingRef.current && !isLoading) {
            openTimer = setTimeout(() => {
                setShowInitialSplit(true)
                closeTimer = setTimeout(() => setShowInitialSplit(false), INITIAL_SPLIT_DURATION_MS)
            }, 0)
        }
        prevIsLoadingRef.current = isLoading
        return () => {
            if (openTimer) clearTimeout(openTimer)
            if (closeTimer) clearTimeout(closeTimer)
        }
    }, [isLoading, initialDone])

    return (
        <>
            <AnimatePresence mode="wait" initial={true}>
                {!initialDone && (
                    <motion.div key="initial-sequence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: 'linear' }}>
                        <ControlledInitialLoader
                            loadingMessage={loadingMessage}
                            onDone={() => {
                                if (!isLoading) {
                                    setShowInitialSplit(true)
                                    setTimeout(() => setShowInitialSplit(false), INITIAL_SPLIT_DURATION_MS)
                                }
                                setInitialDone(true)
                            }}
                        />
                    </motion.div>
                )}

                {initialDone && (
                    <motion.div key="loading-splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: 'linear' }}>
                        <MangcodingStyleSplash
                            isLoading={isLoading}
                            message={loadingMessage}
                        />
                    </motion.div>
                )}
                {showInitialSplit && (
                    <div className="fixed inset-0 z-60 pointer-events-none">
                        <motion.div
                            className="absolute top-0 left-0 h-full w-1/2 bg-foreground"
                            initial={{ x: 0 }}
                            animate={{ x: "-100%" }}
                            transition={{ duration: INITIAL_SPLIT_DURATION_MS / 1000, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        />
                        <motion.div
                            className="absolute top-0 right-0 h-full w-1/2 bg-foreground"
                            initial={{ x: 0 }}
                            animate={{ x: "100%" }}
                            transition={{ duration: INITIAL_SPLIT_DURATION_MS / 1000, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}