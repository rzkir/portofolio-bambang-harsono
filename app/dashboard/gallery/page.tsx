import GalleryLayout from '@/components/dashboard/gallery/GalleryLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Gallery | Dashboard',
    description: 'Gallery page',
}

export default function page() {
    return (
        <GalleryLayout />
    )
}