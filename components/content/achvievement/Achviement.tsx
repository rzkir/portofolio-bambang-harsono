'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useState } from 'react'

import { Pagination } from '@/hooks/pagination'

export default function Achviement({ achievementData }: { achievementData: Achievement[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const totalPages = Math.ceil(achievementData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentAchievements = achievementData.slice(startIndex, startIndex + itemsPerPage)
    return (
        <section className='py-5 md:py-10 xl:py-20'>
            <div className='container space-y-10 xl:space-y-10 px-4 xl:px-10'>
                <div className='flex flex-col gap-2 items-start justify-start'>
                    <motion.h3
                        className='text-[10px] md:text-xs text-muted-foreground/80 tracking-widest mb-1 uppercase font-medium'
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4 }}
                    >
                        My Achievement
                    </motion.h3>
                    <motion.h1
                        className='text-4xl md:text-6xl font-bold tracking-tight leading-snug'
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                    >
                        Achievement
                    </motion.h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10'>
                    {currentAchievements.map((achievement, idx) => (
                        <Dialog key={achievement._id ?? idx}>
                            <DialogTrigger asChild>
                                <motion.div
                                    className='bg-muted/30 p-5 hover:bg-muted/50 flex flex-col gap-5 rounded-lg'
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <div className='relative w-full h-60 group overflow-hidden hover:cursor-pointer'>
                                        <Image
                                            src={achievement.imageUrl}
                                            alt={achievement.title}
                                            fill
                                            className='object-cover rounded-lg'
                                        />

                                        <div className='absolute inset-0 flex items-center justify-center gap-2 p-2 backdrop-blur-sm rounded-lg opacity-0 transition-opacity group-hover:opacity-100 text-center group-hover:bg-background/50 hover:cursor-pointer'>
                                            <motion.h3
                                                className='text-lg font-semibold'
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.5 }}
                                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                            >
                                                {achievement.title}
                                            </motion.h3>
                                        </div>
                                    </div>
                                </motion.div>
                            </DialogTrigger>

                            <DialogContent className='sm:max-w-2xl'>
                                <DialogHeader>
                                    <DialogTitle>{achievement.title}</DialogTitle>
                                </DialogHeader>

                                <div className='relative w-full  h-[30vh] md:h-[50vh]'>
                                    <Image
                                        src={achievement.imageUrl}
                                        alt={achievement.title}
                                        fill
                                        className='object-contain rounded-lg'
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </section>
    )
}

