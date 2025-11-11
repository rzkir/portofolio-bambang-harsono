"use client"

import React from 'react'

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'

import Image from 'next/image'

import { Pagination } from '@/hooks/pagination'
import { motion } from 'framer-motion'

export default function Gallery({ galleryData }: { galleryData: Gallery[] }) {

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(galleryData.length / itemsPerPage);
    const currentItems = galleryData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const [selectedImage, setSelectedImage] = React.useState<Gallery | null>(null);

    return (
        <section className='py-5 md:py-10' id='gallery'>
            <div className='container space-y-10 px-4 xl:px-10'>
                <div className='flex flex-col gap-2 items-start justify-start'>
                    <motion.h3
                        className='text-[10px] md:text-xs text-muted-foreground/80 tracking-widest mb-1 uppercase font-medium'
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4 }}
                    >
                        My Gallery
                    </motion.h3>
                    <motion.h1
                        className='text-4xl md:text-6xl font-bold tracking-tight leading-snug'
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                    >
                        Gallery
                    </motion.h1>
                </div>

                <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
                    {currentItems.map((data) => {
                        return (
                            <Dialog key={data._id}>
                                <DialogTrigger asChild>
                                    <motion.div
                                        className="break-inside-avoid mb-3 sm:mb-4 cursor-pointer"
                                        onClick={() => setSelectedImage(data)}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <Image
                                            src={data.imageUrl}
                                            alt={"image"}
                                            width={800}
                                            height={600}
                                            loading='eager'
                                            className="w-full h-auto rounded-lg"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                        />
                                    </motion.div>
                                </DialogTrigger>

                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-300">
                                    <DialogTitle className="sr-only">Gallery Image View</DialogTitle>
                                    {selectedImage && (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={selectedImage.imageUrl}
                                                alt="Selected image"
                                                width={1200}
                                                loading='eager'
                                                height={800}
                                                className="w-full h-auto object-contain rounded-lg"
                                                style={{ maxHeight: '80vh' }}
                                            />
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        );
                    })}
                </div>
                {totalPages > 1 && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}
