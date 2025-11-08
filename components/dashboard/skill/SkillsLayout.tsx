"use client"

import React from 'react'

import { Button } from '@/components/ui/button'

import { ChevronRight } from "lucide-react"

import { Input } from '@/components/ui/input'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Pagination } from '@/hooks/pagination'

import { useStateSkills } from '@/components/dashboard/skill/lib/useStateSkills'

export default function SkillsLayout() {
    const {
        skills,
        isLoading,
        currentSkills,
        totalPages,
        currentPage,
        setCurrentPage,
        isDialogOpen,
        setIsDialogOpen,
        isEditing,
        setIsEditing,
        handleEdit,
        openDeleteDialog,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        deleteId,
        setDeleteId,
        isDeleting,
        handleDelete,
        isSubmitting,
        handleSubmit,
        dropZoneRef,
        fileInputRef,
        isDragging,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        pendingUploads,
        setPendingUploads,
        uploadProgress,
        setUploadProgress,
        isUploading,
        handleMultipleFileUpload,
    } = useStateSkills();

    return (
        <section className="p-4 sm:p-8 bg-muted/30 rounded-2xl">
            <div className='flex flex-col gap-8'>
                {/* Header Section */}
                <div className='flex flex-col gap-4 p-4 sm:p-8 border rounded-2xl border-border bg-card shadow-sm'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                                Skills
                            </h3>

                            <ol className='flex flex-wrap gap-2 items-center text-sm text-muted-foreground'>
                                <li className='flex items-center hover:text-primary transition-colors'>
                                    <span>Dashboard</span>
                                    <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                                </li>
                                <li className='flex items-center hover:text-primary transition-colors'>
                                    <span>Pages</span>
                                    <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                                </li>
                                <li className='flex items-center text-primary font-medium'>
                                    <span>Skills</span>
                                </li>
                            </ol>
                        </div>

                        <Button
                            variant="default"
                            className="px-8 py-3 font-medium shadow-sm hover:shadow-md transition-all bg-primary hover:bg-primary/90"
                            onClick={() => {
                                setIsEditing(false);
                                setIsDialogOpen(true);
                            }}

                        >
                            Create Content
                        </Button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="p-4 sm:p-6 border rounded-xl bg-card shadow-sm">
                                <div className="flex flex-col gap-4 sm:gap-6">
                                    <Skeleton className="w-full h-48 rounded-xl" />
                                    <div className="flex-1">
                                        <div className="flex flex-col justify-between items-start gap-4">
                                            <div className="space-y-3 w-full">
                                                <Skeleton className="h-7 w-40" />
                                            </div>
                                            <div className="flex gap-3 w-full">
                                                <Skeleton className="h-10 flex-1" />
                                                <Skeleton className="h-10 flex-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : skills.length === 0 ? (
                        <div className="col-span-full p-8 text-center border rounded-xl bg-card shadow-sm">
                            <div className="flex flex-col items-center gap-4">
                                <svg
                                    className="w-16 h-16 text-muted-foreground/50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                    <path d="M4 22h16" />
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Skills Found</h3>
                                <p className="text-muted-foreground">Start by creating your first skill using the &quot;Create Content&quot; button above.</p>
                            </div>
                        </div>
                    ) : (
                        currentSkills.map((skill) => (
                            <div key={skill._id} className="p-4 sm:p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
                                <div className="flex flex-col gap-4 sm:gap-6">
                                    <div className="relative w-full aspect-[4/3] flex-shrink-0">
                                        {skill.imageUrl ? (
                                            <Image
                                                src={skill.imageUrl}
                                                alt={skill.title}
                                                fill
                                                className="object-cover rounded-xl shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                                                <span className="text-muted-foreground text-sm">No image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col justify-between items-start gap-4">
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-lg sm:text-xl font-bold">{skill.title}</h4>
                                            </div>
                                            <div className="flex gap-3 w-full">
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    onClick={() => {
                                                        handleEdit(skill);
                                                        setIsDialogOpen(true);
                                                    }}
                                                    className="flex-1"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="lg"
                                                    onClick={() => skill._id && openDeleteDialog(skill._id)}
                                                    className="flex-1"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Section */}
                {!isLoading && skills.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="mb-4 sm:mb-6">
                        <DialogTitle className="text-xl sm:text-2xl font-bold">{isEditing ? 'Edit Skill' : 'Create Skill'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="space-y-4 sm:space-y-6">
                            <div
                                ref={dropZoneRef}
                                className={`relative w-full aspect-[4/3] border-2 border-dashed rounded-xl transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-border'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {pendingUploads.length > 0 ? (
                                    <div className="w-full h-full p-2 sm:p-4 overflow-y-auto">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                                            {pendingUploads.map((upload, index) => (
                                                <div key={index} className="relative aspect-square group">
                                                    <Image
                                                        src={upload.imageUrl}
                                                        alt={upload.title}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                    {!isEditing && (
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setPendingUploads(prev => prev.filter((_, i) => i !== index));
                                                                    setUploadProgress((prev: UploadProgress[]) => prev.filter((_: UploadProgress, i: number) => i !== index));
                                                                }}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                        <span className="text-muted-foreground text-sm">
                                            {isEditing ? 'Drag and drop new image or click to upload' : 'Drag and drop files here or click to upload'}
                                        </span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={(e) => {
                                                if (isEditing) {
                                                    if (e.target.files?.[0]) {
                                                        handleMultipleFileUpload([e.target.files[0]]);

                                                    }
                                                } else {
                                                    if (e.target.files) {
                                                        handleMultipleFileUpload(Array.from(e.target.files));

                                                    }
                                                }
                                            }}
                                            accept="image/*"
                                            multiple={!isEditing}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploading}
                                            className="px-6 py-3"
                                        >
                                            {isUploading ? 'Uploading...' : isEditing ? 'Select New Image' : 'Select Files'}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {uploadProgress.length > 0 && (
                                <div className="space-y-2 max-h-[120px] sm:max-h-40 overflow-y-auto">
                                    {uploadProgress.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{item.fileName}</div>
                                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all ${item.status === 'error' ? 'bg-destructive' :
                                                            item.status === 'success' ? 'bg-green-500' :
                                                                'bg-primary'
                                                            }`}
                                                        style={{ width: `${item.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.status === 'error' ? 'Failed' :
                                                    item.status === 'success' ? 'Complete' :
                                                        `${item.progress}%`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {pendingUploads.length > 0 && (
                                <div className="space-y-2 max-h-[120px] sm:max-h-40 overflow-y-auto">
                                    {pendingUploads.map((upload, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Input
                                                value={upload.title}
                                                onChange={(e) => {
                                                    const newUploads = [...pendingUploads];
                                                    newUploads[index].title = e.target.value;
                                                    setPendingUploads(newUploads);
                                                }}
                                                className="h-10"
                                                placeholder="Enter skill title"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-medium"
                            disabled={isSubmitting || pendingUploads.length === 0}
                        >
                            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-lg sm:text-xl font-bold">Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-muted-foreground">Are you sure you want to delete this skill?</p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setDeleteId(null);
                            }}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteId && handleDelete(deleteId)}
                            className="px-6"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}