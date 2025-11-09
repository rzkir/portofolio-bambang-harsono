import type { Metadata } from 'next'

import ProjectDetailsContent from '@/components/content/projects/details/ProjectsLayout'

import { generateMetadata as getProjectsMetadata } from '@/components/content/projects/details/meta/Metadata'

import { fetchProjectBySlug } from "@/utils/fetching/FetchProjects"

import ProductsSlugSkeleton from '@/components/content/projects/details/ProductsSlugSkeleton';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const metadata = await getProjectsMetadata({ params });
    return metadata;
}

export default async function Page({ params }: Props) {
    let resolvedParams: { slug: string };
    let projectData: Awaited<ReturnType<typeof fetchProjectBySlug>> | null = null;
    try {
        resolvedParams = await params;
        projectData = await fetchProjectBySlug(resolvedParams.slug);
    } catch (error: unknown) {
        console.error('Error fetching project data:', error);
        resolvedParams = await params;
    }

    if (!projectData) {
        return <ProductsSlugSkeleton />;
    }

    return (
        <ProjectDetailsContent
            slug={resolvedParams.slug}
            productsData={projectData}
        />
    );
}