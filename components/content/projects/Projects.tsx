import Image from 'next/image'

import Link from 'next/link'

import { IconCode, IconArrowElbowRight } from "@tabler/icons-react"

import { Button } from '@/components/ui/button'

export default function Projects({ projectsData }: { projectsData: projects[] }) {

    return (
        <section className='py-10 xl:py-20'>
            <div className="container space-y-10 xl:space-y-10 px-4 xl:px-10">
                <div className='flex flex-col gap-2 items-start justify-center'>
                    <h3 className='text-[10px] md:text-xs text-muted-foreground/80 tracking-widest mb-1 uppercase font-medium'>My Work</h3>
                    <h1 className='text-4xl md:text-6xl font-bold tracking-tight leading-snug'>Projects</h1>
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
                                    <span className='text-muted-foreground/80 capitalize'>{project.category}</span>
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
                                <h3 className='text-lg font-semibold'>{project.title}</h3>
                                <p className='text-muted-foreground/80 line-clamp-3'>{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
