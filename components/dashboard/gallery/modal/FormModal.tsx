"use client"

import type { ChangeEvent } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { UseGalleryStateReturn } from "@/components/dashboard/gallery/lib/useGallery";

type GalleryFormData = UseGalleryStateReturn["formData"];
type SetGalleryFormData = UseGalleryStateReturn["setFormData"];
type FileInputRef = UseGalleryStateReturn["fileInputRef"];
type HandleImageUpload = UseGalleryStateReturn["handleImageUpload"];
type HandleSubmit = UseGalleryStateReturn["handleSubmit"];

export interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    formData: GalleryFormData;
    setFormData: SetGalleryFormData;
    fileInputRef: FileInputRef;
    isUploading: boolean;
    isSubmitting: boolean;
    handleImageUpload: HandleImageUpload;
    handleSubmit: HandleSubmit;
}

export default function FormModal({
    isOpen,
    onClose,
    isEditing,
    formData,
    setFormData,
    fileInputRef,
    isUploading,
    isSubmitting,
    handleImageUpload,
    handleSubmit,
}: FormModalProps) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormData((prev) => ({
            ...prev,
            title: value,
        }));
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            imageUrl: "",
        }));
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="sm:max-w-[600px] p-4 sm:p-6">
                <DialogHeader className="mb-4 sm:mb-6">
                    <DialogTitle className="text-xl sm:text-2xl font-bold">
                        {isEditing ? "Edit Gallery Item" : "Add Gallery Item"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-4 sm:space-y-6">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden">
                            {formData.imageUrl ? (
                                <>
                                    <Image
                                        src={formData.imageUrl}
                                        alt={formData.title || "Gallery preview"}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 600px"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="secondary"
                                            onClick={openFilePicker}
                                            disabled={isUploading}
                                        >
                                            {isUploading ? "Uploading..." : "Change Image"}
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={handleRemoveImage}
                                            disabled={isUploading}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={openFilePicker}
                                    className="w-full h-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border bg-muted/40 text-muted-foreground transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                                    disabled={isUploading}
                                >
                                    <span className="text-sm sm:text-base">
                                        {isUploading ? "Uploading..." : "Upload Image"}
                                    </span>
                                    <span className="text-xs text-muted-foreground/80">
                                        PNG, JPG, or WEBP up to 5MB
                                    </span>
                                </button>
                            )}
                        </div>
                        <Input
                            placeholder="Gallery title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="h-12"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Saving..."
                            : isEditing
                                ? "Update Item"
                                : "Create Item"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}