"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "sonner";

type GalleryFormState = Pick<Gallery, "_id" | "imageUrl" | "title">;

const emptyFormState: GalleryFormState = {
  imageUrl: "",
  title: "",
};

const formatTitleFromFilename = (fileName: string) =>
  fileName
    .split(".")[0]
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const useGalleryState = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<GalleryFormState>(emptyFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const resetForm = () => {
    setFormData(emptyFormState);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFilterOptions = () => {
    const options = new Set(
      galleries.map((galleryItem) => {
        const parts = galleryItem.title.split(" - ");
        return parts[0].trim();
      })
    );
    return Array.from(options).sort();
  };

  const filteredGalleries = galleries.filter((galleryItem) => {
    if (selectedFilter === "all") return true;
    const parts = galleryItem.title.split(" - ");
    return parts[0].trim() === selectedFilter;
  });

  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGalleries = filteredGalleries.slice(startIndex, endIndex);

  const fetchGalleries = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/gallery", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch gallery");
      }

      const data = (await response.json()) as Gallery[];
      setGalleries(data);
    } catch (error) {
      console.error("Fetch gallery error:", error);
      toast.error("Failed to fetch gallery items");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchGalleries();
  }, [fetchGalleries]);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const payload = new FormData();
      payload.append("file", file);

      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data: { url: string } = await response.json();

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
        title: prev.title || formatTitleFromFilename(file.name),
      }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload gallery image error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (!formData.imageUrl || !formData.title.trim()) {
        toast.error("Image and title are required");
        return;
      }

      setIsSubmitting(true);
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing
        ? `/api/gallery?id=${formData._id}`
        : "/api/gallery";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: formData.imageUrl,
          title: formData.title,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to save gallery");
      }

      toast.success(
        isEditing
          ? "Gallery item updated successfully"
          : "Gallery item created successfully"
      );

      setIsDialogOpen(false);
      setIsEditing(false);
      resetForm();
      await fetchGalleries();
    } catch (error) {
      console.error("Submit gallery error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save gallery"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to delete gallery");
      }

      toast.success("Gallery item deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
      await fetchGalleries();
    } catch (error) {
      console.error("Delete gallery error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete gallery"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (data: Gallery) => {
    setFormData({
      _id: data._id,
      imageUrl: data.imageUrl,
      title: data.title,
    });
    setIsEditing(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const openFormDialog = () => {
    if (!isEditing) {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const closeFormDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    resetForm();
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  return {
    // State
    galleries,
    isEditing,
    isUploading,
    isDialogOpen,
    isDeleteDialogOpen,
    deleteId,
    selectedFilter,
    fileInputRef,
    formData,
    isLoading,
    isDeleting,
    isSubmitting,
    currentPage,
    itemsPerPage,
    currentGalleries,
    totalPages,
    getFilterOptions,

    // Actions
    setSelectedFilter,
    setFormData,
    setCurrentPage,
    handleImageUpload,
    handleSubmit,
    handleDelete,
    handleEdit,
    openDeleteDialog,
    openFormDialog,
    closeFormDialog,
    closeDeleteDialog,
    fetchGalleries,
  };
};

export type UseGalleryStateReturn = ReturnType<typeof useGalleryState>;
