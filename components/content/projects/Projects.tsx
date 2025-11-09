'use client'

import Image from 'next/image'

import Link from 'next/link'

import { IconCode, IconArrowElbowRight } from "@tabler/icons-react"

import { Button } from '@/components/ui/button'

import { motion } from 'framer-motion'

export default function Projects({ projectsData }: { projectsData: projects[] }) {

    return (
        <section className='py-5 md:py-10 xl:py-20' id='projects'>
            <div className="container space-y-10 xl:space-y-10 px-4 xl:px-10">
                <div className='flex flex-col gap-2 items-end justify-end'>
                    <motion.h3
                        className='text-[10px] md:text-xs text-muted-foreground/80 tracking-widest mb-1 uppercase font-medium'
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4 }}
                    >
                        My Work
                    </motion.h3>
                    <motion.h1
                        className='text-4xl md:text-6xl font-bold tracking-tight leading-snug'
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                    >
                        Projects
                    </motion.h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10'>
                    {projectsData.map((project, idx) => (
                        <div key={project._id ?? idx} className='bg-muted/30 p-5 hover:bg-muted/50 flex flex-col gap-5 rounded-lg'>
                            <div className='relative w-full h-60 group overflow-hidden hover:cursor-pointer'>
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    className='object-cover rounded-lg'
                                />

                                <div className='absolute bottom-2 left-2 bg-background/50 p-2 backdrop-blur-sm rounded-lg'>
                                    <motion.span
                                        className='text-muted-foreground/80 capitalize'
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                                    >
                                        {project.category}
                                    </motion.span>
                                </div>

                                <div className='absolute inset-0 flex items-center justify-center gap-2 p-2 backdrop-blur-sm rounded-lg opacity-0 transition-opacity group-hover:opacity-100 group-hover:bg-background/50 hover:cursor-pointer'>
                                    <Link href={project.previewLink} className='cursor-pointer'>
                                        <Button variant="ghost" className='cursor-pointer'>
                                            <IconCode className='size-5' />
                                        </Button>
                                    </Link>

                                    <Link href={project.slug} className='cursor-pointer'>
                                        <Button variant="ghost" className='cursor-pointer'>
                                            <IconArrowElbowRight className='size-5' />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <motion.h3
                                    className='text-lg font-semibold'
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                                >
                                    {project.title}
                                </motion.h3>
                                <motion.p
                                    className='text-muted-foreground/80 line-clamp-3'
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                                >
                                    {project.description}
                                </motion.p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
