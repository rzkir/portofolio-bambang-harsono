import Image from 'next/image'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { IconBrandInstagram, IconBrandTiktokFilled, IconBrandLinkedinFilled, IconBrandGithub } from "@tabler/icons-react"

const socialLink = [
    {
        href: "https://www.instagram.com/",
        icon: IconBrandInstagram,
    },
    {
        href: "https://www.tiktok.com/",
        icon: IconBrandTiktokFilled,
    },
    {
        href: "https://www.linkedin.com/",
        icon: IconBrandLinkedinFilled,
    },
    {
        href: "https://www.github.com/",
        icon: IconBrandGithub,
    },
]

export default function Home({ homeData }: { homeData: HomeContent[] }) {
    const content = homeData?.[0]
    return (
        <section className="relative min-h-screen flex items-center justify-center">
            <div className="container">
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 z-50">
                    <div className="pl-24 space-y-6">
                        <div className="leading-[0.9]">
                            <h1 className="text-4xl sm:text-6xl md:text-7xl max-w-[100px] font-extrabold tracking-tight">{content?.name}</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            {
                                content?.links?.map((link, idx) => (
                                    <Link key={link.href} href={link.href}>
                                        <Button size="lg" variant={idx === 1 ? "ghost" : "default"} className="gap-2">
                                            <span className="inline-flex items-center">{link.label}</span>
                                        </Button>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col justify-center pl-48">
                        <span className="mb-2 text-base uppercase tracking-wider opacity-60">*{content?.text}</span>
                        <h2 className="mb-3 text-2xl font-semibold md:text-4xl">{content?.title}</h2>
                        <p className="text-base opacity-80 max-w-[400px]">{content?.description}</p>
                    </div>
                </div>

                <div className='absolute bottom-10 max-w-7xl mx-auto left-0 right-0 flex justify-between z-50'>
                    <Link href={`mailto:${content?.email}`} className='hover:text-primary hover:underline transition-al'>{content?.email}</Link>

                    <div className='flex gap-2'>
                        {
                            socialLink.map((item, idx) => {
                                return (
                                    <Link key={idx} href={item.href}>
                                        <Button size="default" className="gap-2 bg-card text-card-foreground hover:bg-card/90">
                                            <item.icon className="w-10 h-10" />
                                        </Button>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 -z-10'>
                <div className="relative mx-auto w-[calc(100%-10rem)] overflow-hidden aspect-video">
                    <Image
                        src={content?.image}
                        alt={content?.name}
                        fill
                        sizes="100vw"
                        priority
                        className="object-contain object-center select-none pointer-events-none"
                    />
                </div>
            </div>
        </section>
    )
}

