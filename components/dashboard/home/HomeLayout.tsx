"use client"

import { ChevronRight, Pencil, Trash2, FileQuestion, ArrowRight } from "lucide-react"

import { HomeSkeleton } from "@/components/dashboard/home/HomeSkeleton"

import { Button } from '@/components/ui/button'

import Image from 'next/image'

import { useStateHome } from '@/components/dashboard/home/lib/useStateHome'

import { FormModal } from '@/components/dashboard/home/modal/FormModal'

import { DeleteModal } from '@/components/dashboard/home/modal/DeleteModal'

export default function HomeLayout() {
    const {
        contents,
        selectedContent,
        isSubmitting,
        isOpen,
        setIsOpen,
        isDeleteOpen,
        setIsDeleteOpen,
        isLoading,
        setSelectedImage,
        imagePreview,
        setImagePreview,
        isUploadingImage,
        formData,
        setFormData,
        handleCreate,
        handleEdit,
        handleDelete,
        handleImageChange,
        handleSubmit,
        handleDeleteConfirm,
    } = useStateHome()

    return (
        <section className="p-4 sm:p-6 bg-muted/30 rounded-2xl">
            <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border rounded-2xl border-border bg-card shadow-sm gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-2 sm:gap-3'>
                        <h3 className='text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
                            Home
                        </h3>

                        <ol className='flex flex-wrap gap-2 items-center text-sm text-muted-foreground'>
                            <li className='flex items-center hover:text-primary transition-colors'>
                                <span>Dashboard</span>
                                <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                            </li>
                            <li className='flex items-center text-primary font-medium'>
                                <span>Home</span>
                            </li>
                        </ol>
                    </div>

                    <FormModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        selectedContent={selectedContent}
                        formData={formData}
                        setFormData={setFormData}
                        imagePreview={imagePreview}
                        setSelectedImage={setSelectedImage}
                        setImagePreview={setImagePreview}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isUploadingImage={isUploadingImage}
                        triggerButton={
                            <Button
                                className="px-6 py-2.5 font-medium shadow-sm hover:shadow-md transition-all"
                                onClick={handleCreate}
                            >
                                Add Section
                            </Button>
                        }
                    />
                </div>

                {/* Delete Modal */}
                <DeleteModal
                    isOpen={isDeleteOpen}
                    setIsOpen={setIsDeleteOpen}
                    handleDeleteConfirm={handleDeleteConfirm}
                    isSubmitting={isSubmitting}
                />

                {/* Sections List */}
                <div className='p-4 sm:p-6 border rounded-2xl border-border bg-card shadow-sm'>
                    {isLoading ? (
                        <HomeSkeleton />
                    ) : contents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                            <FileQuestion className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Sections Found</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4">Start by adding your first section using the button above.</p>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {contents.map((section) => (
                                <div
                                    key={section._id}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-8 p-4 sm:p-8 rounded-2xl shadow-lg"
                                >
                                    {/* Kiri: Headline */}
                                    <div className="flex-1 flex flex-col gap-3 sm:gap-4">

                                        <div className="text-lg sm:text-xl text-muted-foreground mt-2">
                                            {section.text}
                                        </div>

                                        <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                                            {section.title}
                                        </h1>

                                        <div className='block text-3xl sm:text-5xl font-extrabold leading-tight'>
                                            <span className='mr-2'>{section.name}</span>
                                        </div>

                                        <div className="text-lg sm:text-xl text-primary font-semibold mt-2">
                                            <span className="text-primary hover:underline">{section.email}</span>
                                        </div>

                                        <p className="text-base sm:text-lg text-gray-500 mt-4">{section.description}</p>

                                        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3">
                                            {section.links?.map((link, index) => (
                                                <Button
                                                    key={index}
                                                    className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold shadow-md"
                                                    onClick={() => link.href && window.open(link.href, '_blank')}
                                                >
                                                    {link.label} <ArrowRight className='w-4 h-4 ml-1' />
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Kanan: Deskripsi */}
                                    <div className="flex-1 mt-4 md:mt-0">
                                        {section.image && (
                                            <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                                                <Image
                                                    src={section.image}
                                                    width={500}
                                                    height={500}
                                                    alt={section.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                        <div className="flex gap-2 mt-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(section)}
                                            >
                                                <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(section)}
                                            >
                                                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}