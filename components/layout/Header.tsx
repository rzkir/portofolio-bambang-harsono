"use client"

import Link from 'next/link'

import { motion, type Variants } from 'framer-motion'

import { useStateHeader } from '@/components/layout/lib/useStateHeader'

import Navigation from '@/components/layout/navigation/Navigation'

import { navLink } from "@/components/layout/lib/Navigation"

const navContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const navItem: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function Header() {
    const { pathname, isBusy, hash, setHash } = useStateHeader()

    return (
        <>
            <header className='hidden md:block sticky top-10 z-50 px-2 md:px-0'>
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur supports-backdrop-filter:bg-white/5 px-4 py-2 shadow-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={isBusy ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center gap-3">
                            <Link href="/" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black font-semibold dark:bg-zinc-100 dark:text-zinc-900">B</Link>
                        </div>

                        <motion.nav
                            className="flex items-center gap-5 md:gap-10 text-base md:text-lg"
                            variants={navContainer}
                            initial="hidden"
                            animate={isBusy ? "hidden" : "show"}
                        >
                            {
                                navLink.map((link, idx) => {
                                    const isHashLink = link.href.startsWith('#')
                                    const isHome = link.href === '/'
                                    const active = isHashLink
                                        ? (hash === link.href)
                                        : isHome
                                            ? (pathname === '/' && (!hash || hash === ''))
                                            : (pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href)))
                                    return (
                                        <motion.div key={idx} variants={navItem}>
                                            <Link
                                                href={link.href}
                                                onClick={() => { if (isHashLink) setHash(link.href); if (isHome) setHash('') }}
                                                className={`inline-flex items-center gap-2 transition-colors ${active ? 'font-semibold text-white' : 'text-zinc-400 hover:text-white'}`}
                                            >
                                                {active && <motion.span layoutId="active-dot" className="h-2 w-2 rounded-full bg-emerald-400" />}
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    )
                                })
                            }
                        </motion.nav>
                    </motion.div>
                </div>
            </header>

            <Navigation />
        </>
    )
}

