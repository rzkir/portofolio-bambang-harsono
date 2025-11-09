import Image from 'next/image'

import Link from 'next/link'

import { SlashIcon } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { IconArrowElbowRight } from '@tabler/icons-react';

import { Button } from '@/components/ui/button'

export default function ProjectsLayout(_props: {
    slug: string;
    productsData: ProjectDetails;
}) {
    return (
        <section className="py-16 xl:py-20">
            <div className="container space-y-8 px-4 xl:px-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className='capitalize'>{_props.productsData.category}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{_props.productsData.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid grid-cols-1 gap-6">
                    <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-muted/30">
                        <Image
                            src={_props.productsData.thumbnail}
                            alt={_props.productsData.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {Array.isArray(_props.productsData.imageUrl) && _props.productsData.imageUrl.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {_props.productsData.imageUrl.map((img, idx) => (
                                <div key={img + idx} className="relative w-full aspect-video overflow-hidden rounded-lg bg-muted/30">
                                    <Image src={img} alt={`${_props.productsData.title} ${idx + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {(_props.productsData.frameworks || []).map((fw, idx) => (
                        <div key={fw.title + idx} className="inline-flex items-center gap-2 bg-muted/30 px-3 py-2 rounded-md">
                            <div className="relative w-5 h-5">
                                <Image src={fw.imageUrl} alt={fw.title} fill className="object-contain" />
                            </div>
                            <span className="text-sm">{fw.title}</span>
                        </div>
                    ))}
                </div>

                <article className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: _props.productsData.content }} className="prose prose-invert max-w-none text-sm md:text-base
                                            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3 md:[&_p]:mb-4 [&_p:last-child]:mb-0 
                                            [&_span]:text-muted-foreground [&_span]:leading-relaxed
                                            [&_strong]:text-foreground [&_strong]:font-semibold
                                            [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-4 md:[&_h3]:mt-6 [&_h3]:mb-3 md:[&_h3]:mb-4
                                            [&_ol]:list-decimal [&_ol]:pl-4 md:[&_ol]:pl-6 [&_ol]:space-y-1.5 md:[&_ol]:space-y-2 [&_ol]:mb-3 md:[&_ol]:mb-4
                                            [&_li]:text-muted-foreground [&_li]:leading-relaxed
                                            [&_.ql-ui]:hidden
                                            prose-headings:text-foreground
                                            prose-strong:text-foreground
                                            prose-p:text-muted-foreground
                                            prose-li:text-muted-foreground" />
                </article>

                <div className="space-y-4 pt-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Related Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-8">
                        {_props.productsData.relatedProjects.map((rp) => (
                            <div key={rp._id} className="bg-muted/30 p-4 rounded-lg flex flex-col gap-3">
                                <div className="relative w-full aspect-video overflow-hidden rounded-md group hover:cursor-pointer">
                                    <Image src={rp.thumbnail} alt={rp.title} fill className="object-cover" />

                                    <div className='absolute inset-0 flex items-center justify-center gap-2 p-2 backdrop-blur-sm rounded-lg opacity-0 transition-opacity group-hover:opacity-100 group-hover:bg-background/50 hover:cursor-pointer'>
                                        <Link href={rp.slug} className='cursor-pointer'>
                                            <Button variant="ghost" className='cursor-pointer'>
                                                <IconArrowElbowRight className='size-5' />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">{rp.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{rp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
