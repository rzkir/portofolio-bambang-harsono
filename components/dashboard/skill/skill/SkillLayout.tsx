"use client"

import { ChevronRight, Pencil, Trash2, FileQuestion } from "lucide-react"

import { Button } from '@/components/ui/button'

import { useStateSkill } from '@/components/dashboard/skill/skill/lib/useStateSkill'

import { FormModal } from '@/components/dashboard/skill/skill/modal/FormModal'

import { DeleteModal } from '@/components/dashboard/skill/skill/modal/DeleteModal'

export default function SkillLayout() {
    const {
        contents,
        selectedContent,
        isSubmitting,
        isOpen,
        setIsOpen,
        isDeleteOpen,
        setIsDeleteOpen,
        isLoading,
        formData,
        setFormData,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSubmit,
        handleDeleteConfirm,
    } = useStateSkill()

    return (
        <section className="p-4 sm:p-6 bg-muted/30 rounded-2xl">
            <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border rounded-2xl border-border bg-card shadow-sm gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-2 sm:gap-3'>
                        <h3 className='text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
                            Skills
                        </h3>

                        <ol className='flex flex-wrap gap-2 items-center text-sm text-muted-foreground'>
                            <li className='flex items-center hover:text-primary transition-colors'>
                                <span>Dashboard</span>
                                <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                            </li>
                            <li className='flex items-center text-primary font-medium'>
                                <span>Skills</span>
                            </li>

                        </ol>
                    </div>

                    <FormModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        selectedContent={selectedContent}
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
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
                        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                            <FileQuestion className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Loading...</h3>
                        </div>
                    ) : contents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                            <FileQuestion className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Skills Found</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4">Start by adding your first skill section using the button above.</p>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {contents.map((section) => (
                                <div
                                    key={section._id}
                                    className="flex flex-col gap-4 sm:gap-8 p-4 sm:p-8 rounded-2xl shadow-lg"
                                >
                                    {/* Left: Headline */}
                                    <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                                        <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                                            {section.title}
                                        </h1>
                                        <div className="text-lg sm:text-xl text-muted-foreground mt-2">
                                            {section.text}
                                        </div>
                                        <div className="mt-4 sm:mt-6 space-y-2">
                                            {section.skills?.map((s, idx) => (
                                                <div key={idx} className="flex flex-col gap-2">
                                                    <span className="font-medium">{s.title}</span>
                                                    <span className="text-sm text-muted-foreground">{s.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex-1 mt-4 md:mt-0">
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