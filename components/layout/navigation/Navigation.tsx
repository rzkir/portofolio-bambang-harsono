"use client"

import Link from 'next/link'

import { motion } from 'framer-motion'

import { useStateHeader } from '@/components/layout/lib/useStateHeader'

import { mobileNav } from "@/components/layout/lib/Navigation"

export default function Navigation() {
    const { pathname, isBusy, hash, setHash } = useStateHeader()

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
            <motion.nav
                className="mx-auto max-w-full rounded-tl-2xl rounded-tr-2xl border border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-lg px-3 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isBusy ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <ul className="grid grid-cols-5 gap-4">
                    {mobileNav.map(({ href, label, Icon }, idx) => {
                        const isHashLink = href.startsWith('#')
                        const isHome = href === '/'
                        const active = isHashLink
                            ? (hash === href)
                            : isHome
                                ? (pathname === '/' && (!hash || hash === ''))
                                : (pathname === href || (href !== '/' && pathname?.startsWith(href)))
                        return (
                            <li key={idx} className="">
                                <Link
                                    href={href}
                                    onClick={() => { if (isHashLink) setHash(href); if (isHome) setHash('') }}
                                    className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-xs transition-colors ${active ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'}`}
                                >
                                    <Icon className={`h-5 w-5 ${active ? '' : 'opacity-70'}`} />
                                    <span className={`${active ? 'font-semibold' : ''}`}>{label.split(' ')[0]}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </motion.nav>
        </div>
    )
}